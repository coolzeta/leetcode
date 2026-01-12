// Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

function maximalRectangle(matrix: string[][]): number {
    if (matrix.length === 0 || matrix[0].length === 0) return 0;
    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights: number[] = Array(cols).fill(0);
    let maxArea = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            heights[c] = matrix[r][c] === '1' ? heights[c] + 1 : 0;
        }
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
}

function largestRectangleArea(heights: number[]): number {
    const stack: number[] = [];
    let maxArea = 0;
    heights.push(0); // Sentinel to pop all remaining bars

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()!];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }

    heights.pop(); // Remove the sentinel
    return maxArea;
}