// There is a 1-based binary matrix where 0 represents land and 1 represents water. You are given integers row and col representing the number of rows and columns in the matrix, respectively.

// Initially on day 0, the entire matrix is land. However, each day a new cell becomes flooded with water. You are given a 1-based 2D array cells, where cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row and cith column (1-based coordinates) will be covered with water (i.e., changed to 1).

// You want to find the last day that it is possible to walk from the top to the bottom by only walking on land cells. You can start from any cell in the top row and end at any cell in the bottom row. You can only travel in the four cardinal directions (left, right, up, and down).

// Return the last day where it is possible to walk from the top to the bottom by only walking on land cells.


class UnionFind {
    private parent: number[];
    private rank: number[];
    
    constructor(size: number) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
    }
    
    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); 
        }
        return this.parent[x];
    }
    
    union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
    
    isConnected(x: number, y: number): boolean {
        return this.find(x) === this.find(y);
    }
}

function latestDayToCross(row: number, col: number, cells: number[][]): number {
    const n = row * col;
    const uf = new UnionFind(n + 2);
    const topNode = n;
    const bottomNode = n + 1;
    
    const grid: boolean[][] = Array.from({ length: row }, () => Array(col).fill(false));
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    const getIndex = (r: number, c: number): number => r * col + c;
    for (let day = cells.length - 1; day >= 0; day--) {
        const [r, c] = cells[day];
        const currRow = r - 1;
        const currCol = c - 1;
        grid[currRow][currCol] = true;
        const currIndex = getIndex(currRow, currCol);
        if (currRow === 0) {
            uf.union(currIndex, topNode);
        }
        if (currRow === row - 1) {
            uf.union(currIndex, bottomNode);
        }
        for (const [dr, dc] of directions) {
            const newRow = currRow + dr;
            const newCol = currCol + dc;
            if (
                newRow >= 0 && newRow < row &&
                newCol >= 0 && newCol < col &&
                grid[newRow][newCol]
            ) {
                const neighborIndex = getIndex(newRow, newCol);
                uf.union(currIndex, neighborIndex);
            }
        }
        if (uf.isConnected(topNode, bottomNode)) {
            return day;
        }
    }
    return 0;
}

// 测试用例
console.log(latestDayToCross(2, 2, [[1,1],[2,1],[1,2],[2,2]])); // 输出: 2
console.log(latestDayToCross(2, 2, [[1,1],[1,2],[2,1],[2,2]])); // 输出: 1
console.log(latestDayToCross(3, 3, [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]])); // 输出: 3

// 测试用例
console.log(latestDayToCross(2, 2, [[1,1],[2,1],[1,2],[2,2]])); // 输出: 2
console.log(latestDayToCross(2, 2, [[1,1],[1,2],[2,1],[2,2]])); // 输出: 1
console.log(latestDayToCross(3, 3, [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]])); // 输出: 3