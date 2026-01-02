// You are given an integer array nums with the following properties:

// nums.length == 2 * n.
// nums contains n + 1 unique elements.
// Exactly one element of nums is repeated n times.
// Return the element that is repeated n times.

function repeatedNTimes(nums: number[]): number {
    const n = nums.length / 2;
    for (let i = 0; i < n; i++) {
        if(nums[i] === nums[i + n - 1] || nums[i] === nums[i + n]) {
            return nums[i];
        }
    }
    return nums[0] === nums[1] ? nums[0] : nums[n];
}