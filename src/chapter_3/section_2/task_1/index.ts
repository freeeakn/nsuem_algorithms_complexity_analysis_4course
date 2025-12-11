// ===============================================
// 3.2.1 Задача о рюкзаке (проверка суммы)
// ===============================================
/**
 * Checks if a subset of a given array sums up to a target value.
 * Uses a helper function 'backtrack' to recursively generate all subsets and check if their sum equals the target value.
 * @param {number[]} arr - the array to find a subset of.
 * @param {number} target - the target value to sum up to.
 * @returns {boolean} true if a subset is found, false otherwise.
 */
export const subsetSum = (arr: number[], target: number): boolean => {
  function backtrack(index: number, currentSum: number): boolean {
    if (currentSum === target) return true;
    if (index >= arr.length || currentSum > target) return false;
    return (
      backtrack(index + 1, currentSum + arr[index]) ||
      backtrack(index + 1, currentSum)
    );
  }
  return backtrack(0, 0);
};
