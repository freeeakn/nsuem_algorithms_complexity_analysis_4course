// ==========================================
// 1.1.9. Числа Фибоначчи (O(n))
// ==========================================
/**
 * Calculate the nth Fibonacci number.
 * This function uses a loop to calculate the Fibonacci number.
 * The first two Fibonacci numbers are 0 and 1, and each subsequent number is the sum of the previous two.
 * @param {number} n - the index of the Fibonacci number to calculate.
 * @returns {number} the nth Fibonacci number.
 */
export const fibonacci = (n: number): number => {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    let next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
};
