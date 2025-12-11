// ==========================================
// 1.1.10. Числа Фибоначчи за O(log n)
// ==========================================
/**
 * Calculate the nth Fibonacci number using matrix exponentiation.
 * @param {number} n - the index of the Fibonacci number to calculate.
 * @returns {number} the nth Fibonacci number.
 */
export const fibonacciLogN = (n: number): number => {
  if (n === 0) return 0;
  // Умножение матриц 2x2
  const multiply = (a: number[][], b: number[][]): number[][] => {
    return [
      [
        a[0][0] * b[0][0] + a[0][1] * b[1][0],
        a[0][0] * b[0][1] + a[0][1] * b[1][1],
      ],
      [
        a[1][0] * b[0][0] + a[1][1] * b[1][0],
        a[1][0] * b[0][1] + a[1][1] * b[1][1],
      ],
    ];
  };

  const power = (matrix: number[][], n: number): number[][] => {
    if (n === 1) return matrix;
    if (n % 2 === 0) {
      const half = power(matrix, n / 2);
      return multiply(half, half);
    } else {
      return multiply(matrix, power(matrix, n - 1));
    }
  };

  const base: number[][] = [
    [1, 1],
    [1, 0],
  ];
  const result: number[][] = power(base, n);
  return result[1][0];
};
