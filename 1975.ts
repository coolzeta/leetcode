// You are given an n x n integer matrix. You can do the following operation any number of times:

// Choose any two adjacent elements of matrix and multiply each of them by -1.
// Two elements are considered adjacent if and only if they share a border.

// Your goal is to maximize the summation of the matrix's elements. Return the maximum sum of the matrix's elements using the operation mentioned above.

function maxMatrixSum(matrix: number[][]): number {
    const negtiveNumberCounts: number = matrix.reduce((count, row) =>
        count + row.reduce((rowCount, val) => rowCount + (val < 0 ? 1 : 0), 0), 0);
    
    let totalSum: number = 0;
    let minAbsValue: number = Infinity;
    
    for (const row of matrix) {
        for (const val of row) {
            totalSum += Math.abs(val);
            minAbsValue = Math.min(minAbsValue, Math.abs(val));
        }
    }
    
    if (negtiveNumberCounts % 2 === 0) {
        return totalSum;
    } else {
        return totalSum - 2 * minAbsValue;
    }
};