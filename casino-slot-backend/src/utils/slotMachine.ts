const symbols = ['🍒', '🍋', '⭐', '💎'];
const weights = [0.4, 0.3, 0.2, 0.1]; // must sum to 1

export const spinReels = (): string[] => {
  const spin = [];
  for (let i = 0; i < 3; i++) {
    spin.push(getRandomSymbol());
  }
  return spin;
};

function getRandomSymbol(): string {
  const rand = Math.random();
  let cumulative = 0;

  for (let i = 0; i < symbols.length; i++) {
    cumulative += weights[i];
    if (rand <= cumulative) return symbols[i];
  }

  return symbols[symbols.length - 1]; // fallback
}

export const calculatePayout = (spin: string[], wager: number): number => {
  const [s1, s2, s3] = spin;
  if (s1 === s2 && s2 === s3) {
    switch (s1) {
      case '💎': return wager * 10;
      case '⭐': return wager * 5;
      case '🍋': return wager * 3;
      case '🍒': return wager * 2;
    }
  }

  return 0; // no win
};
