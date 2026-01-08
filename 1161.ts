// Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

// Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

function maxLevelSum(root: TreeNode | null): number {
    if (!root) return 0;

    let maxSum = -Infinity;
    let maxLevel = 1;
    let currentLevel = 1;

    const queue: (TreeNode | null)[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        let currentLevelSum = 0;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevelSum += node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        if (currentLevelSum > maxSum) {
            maxSum = currentLevelSum;
            maxLevel = currentLevel;
        }

        currentLevel++;
    }

    return maxLevel;
}