// =========================================
// 2.1.1 Все последовательности длины k
// =========================================
/**
 * Generates all sequences of length k where elements are from 1 to n.
 * @param {number} k - the length of the sequence.
 * @param {number} n - the upper bound of the sequence.
 * @returns {number[][]} an array of all sequences of length k.
 */
export const allSequences = (k: number, n: number): number[][] => {
  const result: number[][] = [];
  const sequence: number[] = new Array(k).fill(1);

  while (true) {
    result.push([...sequence]);

    // Найти позицию для увеличения
    let i = k - 1;
    while (i >= 0 && sequence[i] === n) {
      sequence[i] = 1;
      i--;
    }

    if (i < 0) break;
    sequence[i]++;
  }

  return result;
};
