// ==========================================
// 1.1.7. Деление с остатком без div/mod
// =========================================
type props = {
  a: number;
  b: number;
};
type result = {
  quotient: number;
  remainder: number;
};
/**
 * Divide two numbers without using the div or mod operators.
 * This function uses a while loop to subtract 'b' from 'a' until 'a' is less than 'b'.
 * @param {{ a: number, b: number }} an object with two properties: 'a' and 'b'.
 * @param {number} a - the dividend.
 * @param {number} b - the divisor.
 * @returns {result} an object with two properties: 'quotient' and 'remainder'.
 */
export const divideWithRemainder = ({ a, b }: props): result => {
  let quotient = 0;
  let remainder = a;

  while (remainder >= b) {
    remainder -= b;
    quotient++;
  }

  return { quotient, remainder };
};
