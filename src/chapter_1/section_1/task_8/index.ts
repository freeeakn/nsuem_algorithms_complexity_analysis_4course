// =========================================
// 1.1.8. Вычислить факториал
// =========================================
/**
 * Calculate the factorial of a given number.
 * @param {number} n - the number to calculate the factorial of.
 * @returns {number} the result of the factorial calculation.
 */
export const factorial = (n: number): number => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};
