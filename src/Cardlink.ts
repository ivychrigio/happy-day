export interface CardData {
  name: string;
  message?: string;
  gradient?: string;
  lang?: string; // codice lingua: it, en, es, fr
  createdAt: number; // timestamp ms, impostato automaticamente
}

const EXPIRY_HOURS = 24;

/**
 * Codifica i dati del biglietto in una stringa base64 sicura per URL.
 * Il timestamp di creazione viene aggiunto automaticamente qui.
 */
export function encodeCardData(data: Omit<CardData, "createdAt">): string {
  const payload: CardData = { ...data, createdAt: Date.now() };
  const json = JSON.stringify(payload);
  // encodeURIComponent + unescape gestisce correttamente accenti/emoji nel nome/messaggio
  const base64 = btoa(unescape(encodeURIComponent(json)));
  // rende la stringa sicura per essere messa in un URL (- e _ al posto di + e /)
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Decodifica la stringa presa dall'URL. Ritorna null se il formato non è valido.
 */
export function decodeCardData(encoded: string): CardData | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(escape(atob(base64)));
    const data = JSON.parse(json);
    if (typeof data.name !== "string" || typeof data.createdAt !== "number") {
      return null;
    }
    return data as CardData;
  } catch {
    return null;
  }
}

/**
 * Vero se sono passate più di 24h (o il numero di ore passato) dalla creazione.
 */
export function isCardExpired(data: CardData, hours = EXPIRY_HOURS): boolean {
  const ageMs = Date.now() - data.createdAt;
  return ageMs > hours * 60 * 60 * 1000;
}

/**
 * Quante ore/minuti mancano alla scadenza (utile per mostrare un countdown).
 */
export function getTimeRemaining(data: CardData, hours = EXPIRY_HOURS) {
  const expiresAt = data.createdAt + hours * 60 * 60 * 1000;
  const remainingMs = Math.max(0, expiresAt - Date.now());
  return {
    remainingMs,
    hours: Math.floor(remainingMs / (60 * 60 * 1000)),
    minutes: Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000)),
  };
}

/**
 * Costruisce l'URL completo e condivisibile del biglietto.
 */
export function buildCardUrl(data: Omit<CardData, "createdAt">): string {
  const encoded = encodeCardData(data);
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("card", encoded);
  return url.toString();
}

/**
 * Legge il parametro "card" dall'URL corrente, se presente.
 */
export function readCardFromUrl(): CardData | null {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("card");
  if (!encoded) return null;
  return decodeCardData(encoded);
}
