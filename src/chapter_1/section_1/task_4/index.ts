// 1.1.4. Вычислить a^n за O(log n)
// ==========================================
type props = {
  a: number;
  n: number;
};
/**
 * Calculate a^n in O(log n) time complexity.
 * @param {{ a: number, n: number }} an object with two properties: 'a' and 'n'.
 * @param {number} a - the base number.
 * @param {number} n - the power to which the base number should be raised.
 * @returns {number} the result of a^n.
 */
export const powerLogN = ({ a, n }: props): number => {
  let result = 1;
  let base = a;
  let exp = n;

  while (exp > 0) {
    if (exp % 2 === 1) {
      result *= base;
    }
    base *= base;
    exp = Math.floor(exp / 2);
  }
  return result;
};
