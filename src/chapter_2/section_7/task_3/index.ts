// ================================
// 2.7.3 Вычисление числа Каталана
// =================================
/**
 * Calculate the nth Catalan number.
 * The Catalan numbers are a sequence of natural numbers that occur in various counting
 * problems, often involving recursive structures. They are named after the mathematician
 * Eug`ne Charles Catalan.
 * @param {number} n - the index of the Catalan number to calculate.
 * @returns {number} the nth Catalan number.
 */
export const catalanNumber = (n: number): number => {
  let C = 1;
  for (let i = 0; i < n; i++) {
    C = (C * 2 * (2 * i + 1)) / (i + 2);
  }
  return Math.round(C);
};
