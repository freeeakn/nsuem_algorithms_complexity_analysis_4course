// =========================================
// 1.2.4 Максимум в массиве
// =========================================
/**
 * Find the maximum element in an array.
 * @param {number[]} arr - the array to find the maximum element in.
 * @throws {Error} if the array is empty.
 * @returns {number} the maximum element in the array.
 */
export const findMax = (arr: number[]): number => {
  if (arr.length === 0) throw new Error("Array is empty");
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
};
