export const SPREADS = {
  yesno: { cards: 1 },
  yesno_three: { cards: 3 },
  classic: { cards: 3 },
  celtic: { cards: 10 }
} as const;

export type SpreadKey = keyof typeof SPREADS; 