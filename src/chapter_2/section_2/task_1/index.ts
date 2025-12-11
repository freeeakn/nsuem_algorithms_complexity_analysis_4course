// ==============================================
// 2.2.1 Все перестановки
// ===============================================
/**
 * Generates all permutations of an array of length n.
 * This function uses a helper function 'backtrack' to generate all permutations recursively.
 * The helper function takes a start index as a parameter and swaps the elements at the start index and all subsequent indices to generate all permutations.
 * The function then calls the helper function with the start index set to 0.
 * @param {number} n - the length of the array.
 * @returns {number[][]} an array of all permutations of the array.
 */
export const permutations = (n: number): number[][] => {
  const result: number[][] = [];
  const arr: number[] = Array.from({ length: n }, (_, i) => i + 1);

  function backtrack(start: number) {
    if (start === n) {
      result.push([...arr]);
      return;
    }
    for (let i = start; i < n; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      backtrack(start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  backtrack(0);
  return result;
};
