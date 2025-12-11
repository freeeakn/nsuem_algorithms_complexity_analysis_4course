// =============================================
// 2.6.1 Числа Каталана (последовательности)
// =============================================
/**
 * Generates all valid sequences of length 2n, using the characters '1' and '-1', such that
 * the absolute difference between the count of '1's and the count of '-1's is at most 1.
 * @param {number} n - the length of the sequence to generate.
 * @returns {string[]} an array of all valid sequences of length 2n.
 */
export const generateCatalanSequences = (n: number): string[] => {
  const result: string[] = [];

  function backtrack(s: string, open: number, close: number) {
    if (s.length === 2 * n) {
      result.push(s);
      return;
    }
    if (open < n) {
      backtrack(s + "1", open + 1, close);
    }
    if (close < open) {
      backtrack(s + "-1", open, close + 1);
    }
  }

  backtrack("", 0, 0);
  return result;
};
