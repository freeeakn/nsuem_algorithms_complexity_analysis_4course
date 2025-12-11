// ===============================================
// 4.1.2 Сортировка вставками
// ===============================================
/**
 * Sorts an array of numbers in ascending order using the insertion sort algorithm.
 * The algorithm works by iterating over the array and inserting each element into its correct position in the sorted part of the array.
 * The time complexity of this algorithm is O(n^2).
 * @param {number[]} arr - the array to be sorted.
 * @returns {number[]} the sorted array.
 */
export const insertionSort = (arr: number[]): number[] => {
  const result = [...arr];
  for (let i = 1; i < result.length; i++) {
    const key = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = key;
  }
  return result;
};
