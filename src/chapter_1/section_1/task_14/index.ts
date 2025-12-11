// ==========================================
// 1.1.14. Модифицированный алгоритм Евклида
// ==========================================
type props = {
  a: number;
  b: number;
};
/**
 * Calculate the greatest common divisor (GCD) of two numbers using the Euclidean algorithm with a twist.
 * The twist is to use the modulo operator instead of subtraction.
 * @param {{ a: number, b: number }} an object with two properties: 'a' and 'b'.
 * @param {number} a - the first number.
 * @param {number} b - the second number.
 * @returns {number} the GCD of a and b.
 */
export const gcdEuclidMod = ({ a, b }: props): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
};
