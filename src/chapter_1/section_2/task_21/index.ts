// =========================================
// 1.2.21 Пересечение двух отсортированных массивов
// =========================================
/**
 * Returns an array of elements which are present in both input arrays.
 * The input arrays must be sorted.
 * The function uses a two-pointer technique to iterate over both arrays simultaneously.
 * If the elements at the current positions are equal, the element is added to the result array and both pointers are incremented.
 * If the element at the current position in the first array is less than the element at the current position in the second array, the first pointer is incremented.
 * If the element at the current position in the second array is less than the element at the current position in the first array, the second pointer is incremented.
 * @param {number[]} arr1 - the first sorted array.
 * @param {number[]} arr2 - the second sorted array.
 * @returns {number[]} an array of elements which are present in both input arrays.
 */
export const intersectionSorted = (
  arr1: number[],
  arr2: number[]
): number[] => {
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
  const result: number[] = [];
  let i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] === arr2[j]) {
      result.push(arr1[i]);
      i++;
      j++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else {
      j++;
    }
  }
  return result;
};
