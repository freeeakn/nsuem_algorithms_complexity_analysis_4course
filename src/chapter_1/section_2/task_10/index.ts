// =========================================
// 1.2.10 Перевернуть массив
// =========================================
/**
 * Reverses an array in place.
 * This function creates a new array by spreading the input array, and then uses a loop to swap the elements.
 * The loop iterates over half of the array length, swapping the elements at the current index and the index from the end of the array.
 * @param {T[]} arr - the array to reverse.
 * @template T - the type of elements in the array.
 * @returns {T[]} the reversed array.
 */
export const reverseArray = <T>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    [result[i], result[arr.length - 1 - i]] = [
      result[arr.length - 1 - i],
      result[i],
    ];
  }
  return result;
};
