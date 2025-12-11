// =========================================
// 1.3.3 Длина наибольшей общей подпоследовательности
// =========================================
/**
 * Finds the length of the longest common subsequence of two arrays of numbers.
 * Uses dynamic programming to build up a table of subproblems and then
 * returns the solution to the original problem.
 * @param {number[]} a - the first array of numbers.
 * @param {number[]} b - the second array of numbers.
 * @returns {number} the length of the longest common subsequence.
 */
export const longestCommonSubsequence = (a: number[], b: number[]): number => {
  const dp: number[][] = Array(a.length + 1)
    .fill(0)
    .map(() => Array(b.length + 1).fill(0));

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[a.length][b.length];
};
