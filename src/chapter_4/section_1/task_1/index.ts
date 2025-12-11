// ===============================================
// 4.1.1 Сортировка выбором
// ===============================================
/**
 * Sorts an array of numbers in ascending order using the selection sort algorithm.
 * The algorithm works by repeatedly finding the minimum element from the unsorted part of the array and swapping it with the first element of the unsorted part.
 * The algorithm has a time complexity of O(n^2) and is suitable for small arrays.
 * @param {number[]} arr - the array to be sorted.
 * @returns {number[]} the sorted array.
 */
export const selectionSort = (arr: number[]): number[] => {
  const result = [...arr];
  for (let i = 0; i < result.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }
    [result[i], result[minIndex]] = [result[minIndex], result[i]];
  }
  return result;
};
