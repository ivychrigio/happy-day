# Happy Day 🎂

Progetto personale dedicato alla creazione di biglietti d'auguri digitali interattivi.

## Stack Tecnologico

- **Framework**: React + TypeScript + Vite[cite: 16]
- **3D**: @react-three/fiber & @react-three/drei
- **Stili**: CSS puro con variabili personalizzate centralizzate in `:root`[cite: 12, 15]
- **Internazionalizzazione**: i18next

## Struttura e Design

- **Layout**: Struttura reattiva basata su Flexbox, ottimizzata per mobile e desktop.
- **Componenti**: Utilizzo di un componente `Divider` riutilizzabile per mantenere la coerenza visiva nel footer[cite: 14].
- **Gestione Stili**: Tutte le proprietà riutilizzabili (colori, font, padding) sono definite nel `:root` in `index.css` per una manutenzione rapida[cite: 15].

## Note Tecniche per lo Sviluppo

- **Variabili CSS in React**: Quando si passano variabili CSS in linea nel `style` di un componente React, usare sempre il cast:
  `style={{ "--bg-color": person.gradient } as React.CSSProperties}`[cite: 13]
- **Footer**: Il layout del footer utilizza `handshakeContainer` per le linee divisorie e `Divider` per separare le sezioni[cite: 10, 14].
- **Multilingua**: I testi sono gestiti tramite file di traduzione (`it.ts`, `en.ts`, ecc.) con chiavi dedicate per `copyright`, `craftedWith` e `devCredit`[cite: 4, 5, 6, 7].

## TODO / Promemoria

- [ ] Verificare che tutti i file di traduzione abbiano le nuove chiavi footer.
- [ ] Mantenere pulito `index.css` centralizzando ogni nuova classe in `:root`.

---

_Creato per rendere ogni giorno speciale._
