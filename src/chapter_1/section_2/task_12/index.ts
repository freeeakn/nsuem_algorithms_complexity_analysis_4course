// ==============================================
// 1.2.12 Схема Горнера
// ===============================================
type props = {
  coeffs: number[];
  x: number;
};
/**
 * Evaluate a polynomial at x using Horner's method.
 * @param {{coeffs: number[], x: number}} props - an object with two properties: 'coeffs' and 'x'.
 * @param {number[]} props.coeffs - an array of coefficients of the polynomial.
 * @param {number} props.x - the value at which to evaluate the polynomial.
 * @returns {number} the result of evaluating the polynomial at x.
 */
export const horner = ({ coeffs, x }: props): number => {
  let result = 0;
  for (let i = 0; i < coeffs.length; i++) {
    result = result * x + coeffs[i];
  }
  return result;
};
