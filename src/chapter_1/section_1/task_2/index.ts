// ==========================================
// 1.1.2. Поменять значения без доп. переменной (произвольные числа)
// ==========================================
type props = {
  a: number;
  b: number;
};
/**
 * Swap two numbers using the XOR operator.
 * This function uses bitwise operations to swap the values of a and b.
 * @param {{ a: number, b: number }}
 * @returns {Array<number>} [a, b] with the values swapped.
 */
export const swapXOR = ({ a, b }: props): [number, number] => {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  return [a, b];
};
