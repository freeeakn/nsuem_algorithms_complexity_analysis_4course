// =========================================
// 1.1.6. Сложение через инкремент
// =========================================
type props = {
  a: number;
  b: number;
};
/**
 * Add two numbers using only increment and +1 operations.
 * This function uses a loop to add 'b' to 'result' 'a' times.
 * @param {{ a: number, b: number }} an object with two properties: 'a' and 'b'.
 * @param {number} a - the base number.
 * @param {number} b - the number of times to add 'a' to 'result'.
 * @returns {number} the result of 'a' incremented by 'b'.
 */
export const addByIncrement = ({ a, b }: props): number => {
  // Используем только присваивание и +1
  let result = a;
  for (let i = 0; i < b; i++) {
    result = result + 1;
  }
  return result;
};
