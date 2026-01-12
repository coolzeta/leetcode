// Given the root of a binary tree, the depth of each node is the shortest distance to the root.

// Return the smallest subtree such that it contains all the deepest nodes in the original tree.

// A node is called the deepest if it has the largest depth possible among any node in the entire tree.

// The subtree of a node is a tree consisting of that node, plus the set of all descendants of that node.

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val);
        this.left = (left===undefined ? null : left);
        this.right = (right===undefined ? null : right);
    }
}

function subtreeWithAllDeepest(root: TreeNode | null): TreeNode | null {
    function dfs(node: TreeNode | null): [TreeNode | null, number] {
        if (!node) return [null, 0];

        const [leftNode, leftDepth] = dfs(node.left);       
        const [rightNode, rightDepth] = dfs(node.right);
        if (leftDepth > rightDepth) {
            return [leftNode, leftDepth + 1];
        } else if (rightDepth > leftDepth) {
            return [rightNode, rightDepth + 1];
        } else {
            return [node, leftDepth + 1];
        }
    }

    return dfs(root)[0];
}