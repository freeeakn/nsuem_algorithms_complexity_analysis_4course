// ==============================
// 3.1.1 Задача о ферзях Перечислите все способы расстановки 𝑛 ферзей на шахматной доске 𝑛 ×𝑛, при которых они не бьют друг друга.
// ===============================
/**
 * Solve the N-Queens problem.
 * The N-Queens problem is the problem of placing n queens on an n x n chessboard
 * such that none of the queens attacks any of the others.
 * @param {number} n - the size of the chessboard.
 * @returns {number[][][]} an array of arrays, where each subarray represents a solution to the N-Queens problem.
 * Each subarray contains the positions of the queens on the chessboard, where the position of each queen is represented
 * by an array of two numbers: the row and column of the queen.
 */
export const solveNQueens = (n: number): number[][][] => {
  const solutions: number[][][] = [];
  const board: number[] = new Array(n).fill(-1);

  function isSafe(row: number, col: number): boolean {
    for (let i = 0; i < row; i++) {
      if (board[i] === col || Math.abs(board[i] - col) === Math.abs(i - row)) {
        return false;
      }
    }
    return true;
  }

  function backtrack(row: number) {
    if (row === n) {
      const solution = board.map((col, row) => [row, col]);
      solutions.push(solution);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row] = col;
        backtrack(row + 1);
        board[row] = -1;
      }
    }
  }

  backtrack(0);
  return solutions;
};
