// Given two arrays nums1 and nums2.

// Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.

// A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).

function maxDotProduct(nums1: number[], nums2: number[]): number {
    const m = nums1.length;
    const n = nums2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Number.NEGATIVE_INFINITY));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const product = nums1[i] * nums2[j];
            dp[i + 1][j + 1] = Math.max(
                product,
                dp[i][j] + product,
                dp[i + 1][j],
                dp[i][j + 1]
            );
        }
    }

    return dp[m][n];
}