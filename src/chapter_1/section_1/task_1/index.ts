// ==========================================
// 1.1.1. Поменять значения двух переменных
// ==========================================
type props = {
  a: number;
  b: number;
};
/**
 * Swap two numbers using a temporary variable.
 * @param {{ a: number, b: number }}
 * @returns {Array<number>} [a, b] with the values swapped.
 */
export const swapWithTemp = ({ a, b }: props): [number, number] => {
  let temp = a;
  a = b;
  b = temp;
  return [a, b];
};
// ==========================================
// Без временной переменной (для целых чисел)
// ==========================================
/**
 * Swap two numbers without using a temporary variable.
 * This function uses arithmetic operations to swap the values of a and b.
 * @param {{ a: number, b: number }}
 * @returns {Array<number>} [a, b] with the values swapped.
 */
export const swapWithoutTemp = ({ a, b }: props): [number, number] => {
  a = a + b;
  b = a - b;
  a = a - b;
  return [a, b];
};
