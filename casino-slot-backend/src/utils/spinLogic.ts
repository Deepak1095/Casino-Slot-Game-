const symbols = ['🍒', '🍋', '⭐', '💎'];

const weights: Record<string, number> = {
  '🍒': 0.4,
  '🍋': 0.3,
  '⭐': 0.2,
  '💎': 0.1,
};

const payouts: Record<string, number> = {
  '🍒': 2,
  '🍋': 3,
  '⭐': 5,
  '💎': 10,
};

export const spinReels = (): string[] => {
  const getSymbol = () => {
    const rand = Math.random();
    let sum = 0;
    for (const sym of symbols) {
      sum += weights[sym];
      if (rand <= sum) return sym;
    }
    return symbols[symbols.length - 1];
  };

  return [getSymbol(), getSymbol(), getSymbol()];
};

export const calculatePayout = (result: string[], wager: number): number => {
  const [a, b, c] = result;

  if (a === b && b === c) {
    return wager * payouts[a];
  }

  if (a === b || b === c || a === c) {
    const match = a === b ? a : c;
    return wager * (payouts[match] * 0.5);
  }

  return 0;
};
