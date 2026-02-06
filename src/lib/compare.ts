export interface CompareData {
  puzzleNum: number;
  guessCount: number;
  won: boolean;
}

// Encode: e.g. {puzzleNum: 5, guessCount: 3, won: true} → "NS4zLjE"
export function encodeCompareData(data: CompareData): string {
  const raw = `${data.puzzleNum}.${data.guessCount}.${data.won ? 1 : 0}`;
  return btoa(raw).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// Decode back
export function decodeCompareData(encoded: string): CompareData | null {
  try {
    let padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (padded.length % 4) padded += '=';
    const raw = atob(padded);
    const parts = raw.split('.');
    if (parts.length !== 3) return null;
    return {
      puzzleNum: parseInt(parts[0], 10),
      guessCount: parseInt(parts[1], 10),
      won: parts[2] === '1',
    };
  } catch {
    return null;
  }
}
