import type { CardData } from "../interfaces/cardData";

const EXPIRY_HOURS = 24;

export function encodeCardData(data: Omit<CardData, "createdAt">): string {
  const payload: CardData = { ...data, createdAt: Date.now() };
  const json = JSON.stringify(payload);
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

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

export function isCardExpired(data: CardData, hours = EXPIRY_HOURS): boolean {
  const ageMs = Date.now() - data.createdAt;
  return ageMs > hours * 60 * 60 * 1000;
}

export function getTimeRemaining(data: CardData, hours = EXPIRY_HOURS) {
  const expiresAt = data.createdAt + hours * 60 * 60 * 1000;
  const remainingMs = Math.max(0, expiresAt - Date.now());
  return {
    remainingMs,
    hours: Math.floor(remainingMs / (60 * 60 * 1000)),
    minutes: Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000)),
  };
}

export function buildCardUrl(data: Omit<CardData, "createdAt">): string {
  const encoded = encodeCardData(data);
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("card", encoded);
  return url.toString();
}

export function readCardFromUrl(): CardData | null {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("card");
  if (!encoded) return null;
  return decodeCardData(encoded);
}
