// Given a m x n matrix mat and an integer threshold, return the maximum side-length of a square with a sum less than or equal to threshold or return 0 if there is no such square.
function maxSideLength(mat: number[][], threshold: number): number {
    const m = mat.length;
    const n = mat[0].length;
    
    // Build prefix sum array
    // prefixSum[i][j] represents sum of rectangle from (0,0) to (i-1,j-1)
    const prefixSum: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            prefixSum[i][j] = mat[i-1][j-1] 
                            + prefixSum[i-1][j] 
                            + prefixSum[i][j-1] 
                            - prefixSum[i-1][j-1];
        }
    }
    
    // Helper function to get sum of square with top-left at (row, col) and side length k
    const getSquareSum = (row: number, col: number, k: number): number => {
        const r2 = row + k;
        const c2 = col + k;
        return prefixSum[r2][c2] 
             - prefixSum[row][c2] 
             - prefixSum[r2][col] 
             + prefixSum[row][col];
    };
    
    let maxSide = 0;
    
    // Try all possible square sizes and positions
    for (let k = 1; k <= Math.min(m, n); k++) {
        let found = false;
        for (let i = 0; i <= m - k; i++) {
            for (let j = 0; j <= n - k; j++) {
                if (getSquareSum(i, j, k) <= threshold) {
                    maxSide = k;
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
    }
    
    return maxSide;
};