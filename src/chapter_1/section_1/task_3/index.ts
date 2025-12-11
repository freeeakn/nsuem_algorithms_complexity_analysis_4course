// ==========================================
// 1.1.3. Вычислить a^n за O(n)
// ==========================================
type props = {
  a: number;
  n: number;
};
/**
 * Calculate a^n in O(n) time complexity.
 * @param {props} an object with two properties: 'a' and 'n'.
 * @param {number} props.a - the base number.
 * @param {number} props.n - the power to which the base number should be raised.
 * @returns {number} the result of a^n.
 */
export const powerLinear = ({ a, n }: props): number => {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= a;
  }
  return result;
};
