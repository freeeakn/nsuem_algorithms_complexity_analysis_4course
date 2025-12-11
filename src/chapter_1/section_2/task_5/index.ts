// ===============================================
// 1.2.5 Количество различных в отсортированном массиве
// ===============================================
/**
 * Returns the number of distinct elements in a sorted array.
 * This function uses a loop to compare adjacent elements in the array.
 * If the elements are not equal, the count is incremented.
 * @param {number[]} arr - the sorted array to count distinct elements in.
 * @returns {number} the number of distinct elements in the array.
 */
export const countDistinctSorted = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  let count = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) count++;
  }
  return count;
};
