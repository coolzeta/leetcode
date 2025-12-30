// A 3 x 3 magic square is a 3 x 3 grid filled with distinct numbers from 1 to 9 such that each row, column, and both diagonals all have the same sum.

// Given a row x col grid of integers, how many 3 x 3 magic square subgrids are there?

// Note: while a magic square can only contain numbers from 1 to 9, grid may contain numbers up to 15.
function numMagicSquaresInside(grid: number[][]): number {
    const isMagicSquare = (r: number, c: number): boolean => {
        const nums = new Set<number>();
        for (let i = r; i < r + 3; i++) {
            for (let j = c; j < c + 3; j++) {
                const num = grid[i][j];
                if (num < 1 || num > 9 || nums.has(num)) {
                    return false;
                }
                nums.add(num);
            }
        }
        const targetSum = grid[r][c] + grid[r][c + 1] + grid[r][c + 2];
        for (let i = r; i < r + 3; i++) {
            let rowSum = 0;
            for (let j = c; j < c + 3; j++) {
                rowSum += grid[i][j];
            }
            if (rowSum !== targetSum) {
                return false;
            }
        }
        for (let j = c; j < c + 3; j++) {
            let colSum = 0;
            for (let i = r; i < r + 3; i++) {
                colSum += grid[i][j];
            }
            if (colSum !== targetSum) {
                return false;
            }
        }
        let diag1Sum = 0;
        let diag2Sum = 0;
        for (let i = 0; i < 3; i++) {
            diag1Sum += grid[r + i][c + i];
            diag2Sum += grid[r + i][c + 2 - i];
        }
        if (diag1Sum !== targetSum || diag2Sum !== targetSum) {
            return false;
        }
        return true;
    }

    let count = 0;
    for (let i = 0; i <= grid.length - 3; i++) {
        for (let j = 0; j <= grid[0].length - 3; j++) {
            if (grid[i+1][j+1] === 5 && isMagicSquare(i, j)) {
                count++;
            }
        }
    }
    return count;
}