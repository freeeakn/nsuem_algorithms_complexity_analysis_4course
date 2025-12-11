// ========================================
// 1.2.27 Двоичный поиск
// =========================================
/**
 * Searches for a target element in a sorted array using binary search.
 * @param {number[]} arr - the sorted array to search in.
 * @param {number} target - the element to search for.
 * @returns {number} the index of the target element if it is found, -1 otherwise.
 */
export const binarySearch = (arr: number[], target: number): number => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};
