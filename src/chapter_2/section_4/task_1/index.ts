// =================================
// 2.4.1 Все разбиения числа
// =================================
/**
 * Generates all partitions of a given number.
 * A partition of a number is a way of writing it as a sum of positive integers.
 * @param {number} n - the number to generate partitions for.
 * @returns {number[][]} an array of all partitions of the given number.
 * @example
 * partitions(5) // [[5], [4, 1], [3, 2], [3, 1, 1], [2, 2, 1], [2, 1, 1, 1], [1, 1, 1, 1, 1]]
 */
export const partitions = (n: number): number[][] => {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(remaining: number, min: number) {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }
    for (let i = min; i <= remaining; i++) {
      current.push(i);
      backtrack(remaining - i, i);
      current.pop();
    }
  }

  backtrack(n, 1);
  return result;
};
