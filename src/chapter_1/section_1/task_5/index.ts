// ==========================================
// 1.1.5. Умножение через сложение
// ==========================================
type props = {
  a: number;
  b: number;
};
/**
 * Multiply two numbers using addition.
 * This function uses a loop to add the value of 'a' to 'result' 'b' times.
 * @param {{ a: number, b: number }} an object with two properties: 'a' and 'b'.
 * @param {number} a - the base number.
 * @param {number} b - the number of times to add 'a' to 'result'.
 * @returns {number} the result of 'a' multiplied by 'b'.
 */
export const multiplyByAddition = ({ a, b }: props): number => {
  let result = 0;
  for (let i = 0; i < b; i++) {
    result += a;
  }
  return result;
};
