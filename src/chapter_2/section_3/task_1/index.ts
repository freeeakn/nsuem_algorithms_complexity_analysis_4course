// ==================================
// 2.3.1 Все k-элементные подмножества
// ==================================
/**
 * Generates all k-element subsets of a set of n elements.
 * This function uses a helper function 'backtrack' to generate all subsets recursively.
 * The helper function takes a start index as a parameter and adds all elements from the start index to n
 * to the current subset. It then calls itself with the start index incremented by 1, and
 * removes the last element from the subset after the recursive call.
 * The function then calls the helper function with the start index set to 1.
 * @param {number} n - the size of the set.
 * @param {number} k - the size of the subsets.
 * @returns {number[][]} an array of all k-element subsets of the set.
 */
export const kSubsets = (n: number, k: number): number[][] => {
  const result: number[][] = [];
  const subset: number[] = [];

  function backtrack(start: number) {
    if (subset.length === k) {
      result.push([...subset]);
      return;
    }
    for (let i = start; i <= n; i++) {
      subset.push(i);
      backtrack(i + 1);
      subset.pop();
    }
  }

  backtrack(1);
  return result;
};
