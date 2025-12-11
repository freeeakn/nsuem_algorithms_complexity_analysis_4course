// ===============================================
// 4.2.1 Сортировка слиянием
// ===============================================

/**
 * Merge two sorted arrays into a single sorted array.
 * The time complexity of this algorithm is O(n + m), where n and m are the lengths of the input arrays.
 * @param {number[]} left - the first sorted array.
 * @param {number[]} right - the second sorted array.
 * @returns {number[]} the merged sorted array.
 */
const merge = (left: number[], right: number[]): number[] => {
  const result: number[] = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
};

/**
 * Sorts an array of numbers in ascending order using the merge sort algorithm.
 * The algorithm works by dividing the array into two halves, recursively sorting each half, and then merging the sorted halves.
 * The time complexity of this algorithm is O(n log n).
 * @param {number[]} arr - the array to be sorted.
 * @returns {number[]} the sorted array.
 */
export const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
};

// ===============================================
// 4.2.1 (вариант 2) Пирамидальная сортировка (HeapSort)
// ===============================================

/**
 * Builds a heap in the given array.
 * The function works by repeatedly checking if the left and right children of the given node are greater than the node itself.
 * If a child is greater, the function swaps the node with the child and recursively calls itself on the child.
 * The time complexity of this algorithm is O(log n).
 * @param {number[]} arr - the array to build the heap in.
 * @param {number} n - the length of the array.
 * @param {number} i - the index of the node to build the heap from.
 */
const heapify = (arr: number[], n: number, i: number): void => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
};

/**
 * Sorts an array of numbers in ascending order using the heap sort algorithm.
 * The algorithm works by first building a heap, then repeatedly removing the root element from the heap and placing it at the end of the array.
 * The time complexity of this algorithm is O(n log n).
 * @param {number[]} arr - the array to be sorted.
 * @returns {number[]} the sorted array.
 */
export const heapSort = (arr: number[]): number[] => {
  const result = [...arr];

  // Построение кучи
  for (let i = Math.floor(result.length / 2) - 1; i >= 0; i--) {
    heapify(result, result.length, i);
  }

  // Извлечение элементов из кучи
  for (let i = result.length - 1; i > 0; i--) {
    [result[0], result[i]] = [result[i], result[0]];
    heapify(result, i, 0);
  }

  return result;
};
