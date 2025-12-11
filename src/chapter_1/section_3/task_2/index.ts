// =========================================
// 1.3.2 Проверка подпоследовательности
// =========================================
/**
 * Checks if a given array is a subsequence of another array.
 * A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.
 * A subsequence of an array is a sequence of zero or more elements that can be derived from an array without changing the order of the elements,
 * without inserting any elements, and without removing any elements.
 * @param {number[]} sub - the subsequence to check.
 * @param {number[]} arr - the array to check against.
 * @returns {boolean} true if the subsequence is found, false otherwise.
 */
export const isSubsequence = (sub: number[], arr: number[]): boolean => {
  let i = 0,
    j = 0;
  while (i < sub.length && j < arr.length) {
    if (sub[i] === arr[j]) {
      i++;
    }
    j++;
  }
  return i === sub.length;
};
