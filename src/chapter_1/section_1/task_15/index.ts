// =========================================
// 1.1.15. Расширенный алгоритм Евклида
// =========================================
type props = {
  a: number;
  b: number;
};
type result = {
  gcd: number;
  x: number;
  y: number;
};
/**
 * Calculate the greatest common divisor (GCD) of two numbers using the extended Euclidean algorithm.
 * This function returns an object with three properties: 'gcd', 'x', and 'y'. 'gcd' is the GCD of 'a' and 'b'. 'x' and 'y' are the coefficients of Bézout's identity: gcd(a, b) = ax + by.
 * @param {{a: number, b: number }} an object with two properties: 'a' and 'b'.
 * @param {number} a - the first number.
 * @param {number} b - the second number.
 * @returns {result} an object with three properties: 'gcd', 'x', and 'y'.
 */
export const extendedEuclid = ({ a, b }: props): result => {
  if (a === 0) {
    return { gcd: b, x: 0, y: 1 };
  }

  const result = extendedEuclid({ a: b % a, b: a });
  return {
    gcd: result.gcd,
    x: result.y - Math.floor(b / a) * result.x,
    y: result.x,
  };
};
