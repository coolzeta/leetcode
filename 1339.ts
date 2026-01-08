// Given the root of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized.

// Return the maximum product of the sums of the two subtrees. Since the answer may be too large, return it modulo 109 + 7.

// Note that you need to maximize the answer before taking the mod and not after taking it.

 function maxProduct(root: TreeNode | null): number {
    const MOD = 1e9 + 7;
    let totalSum = 0;
    let maxProduct = 0;

    function calculateTotalSum(node: TreeNode | null): number {
        if (!node) return 0;
        totalSum += node.val;
        return node.val + calculateTotalSum(node.left) + calculateTotalSum(node.right);
    }

    function findMaxProduct(node: TreeNode | null): number {
        if (!node) return 0;
        const subTreeSum = node.val + findMaxProduct(node.left) + findMaxProduct(node.right);
        const product = subTreeSum * (totalSum - subTreeSum);
        maxProduct = Math.max(maxProduct, product);
        return subTreeSum;
    }

    calculateTotalSum(root);
    findMaxProduct(root);

    return maxProduct % MOD;
}