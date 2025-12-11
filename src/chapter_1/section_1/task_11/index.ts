// ========================================
// 1.1.11. Сумма 1/k!
// =========================================
/**
 * Calculate the sum of 1/k! for k from 1 to n.
 * @param {number} n - the upper bound of the sum.
 * @returns {number} the sum of 1/k! for k from 1 to n.
 */
export const sumInverseFactorials = (n: number): number => {
  let sum = 1; // 1/0! = 1
  let factorial = 1;

  for (let k = 1; k <= n; k++) {
    factorial *= k;
    sum += 1 / factorial;
  }

  return sum;
};
