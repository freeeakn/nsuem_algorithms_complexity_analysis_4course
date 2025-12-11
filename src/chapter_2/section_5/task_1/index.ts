// ===============================================
// 2.5.1 Код Грея
// ===============================================
/**
 * Generate Gray code sequence.
 * The Gray code is a sequence of numbers in which each number differs from the previous number in exactly one bit.
 * The sequence starts from 0 and each subsequent number is calculated by flipping the most significant bit of the previous number.
 * @param {number} n - the length of the sequence to generate.
 * @returns {number[]} an array of Gray code sequence of length n.
 */
export const grayCode = (n: number): number[] => {
  const result: number[] = [0];
  for (let i = 0; i < n; i++) {
    const add = 1 << i;
    for (let j = result.length - 1; j >= 0; j--) {
      result.push(result[j] | add);
    }
  }
  return result;
};
