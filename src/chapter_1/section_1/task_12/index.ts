// =========================================
// 1.1.12. Сумма 1/k! за O(n)
// =========================================
/**
 * Calculate the sum of 1/k! for k from 1 to n.
 * This function uses a loop to calculate the sum of 1/k! for k from 1 to n.
 * The last calculated factorial is stored in the 'last' variable and divided by k in each iteration.
 * @param {number} n - the upper bound of the sum.
 * @returns {number} the sum of 1/k! for k from 1 to n.
 */
export const sumInverseFactorialsOptimized = (n: number): number => {
  let sum = 1; // 1/0!
  let last = 1; // 1/0!

  for (let k = 1; k <= n; k++) {
    last = last / k;
    sum += last;
  }

  return sum;
};
