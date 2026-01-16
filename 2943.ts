// You are given the two integers, n and m and two integer arrays, hBars and vBars. The grid has n + 2 horizontal and m + 2 vertical bars, creating 1 x 1 unit cells. The bars are indexed starting from 1.

// You can remove some of the bars in hBars from horizontal bars and some of the bars in vBars from vertical bars. Note that other bars are fixed and cannot be removed.

// Return an integer denoting the maximum area of a square-shaped hole in the grid, after removing some bars (possibly none).

function maximizeSquareHoleArea(n: number, m: number, hBars: number[], vBars: number[]): number {
    hBars.sort((a, b) => a - b);
    vBars.sort((a, b) => a - b);
    let maxHlength = 1;
    let maxVlength = 1;
    let prevH = 0;
    let prevV = 0;
    let startH = 0;
    let startV = 0;
    for (let i = 0; i < hBars.length; i++) {
        if (hBars[i] !== prevH + 1) {
            startH = Math.max(hBars[i] - 1, 1);
        }
        maxHlength = Math.max(maxHlength, hBars[i] === prevH + 1 ? hBars[i] - startH + 1 : 2);
        prevH = hBars[i];
    }
    for (let i = 0; i < vBars.length; i++) {
        if (vBars[i] !== prevV + 1) {
            startV = Math.max(vBars[i] - 1, 1);
        }
        console.log(vBars[i], prevV, vBars[i] === prevV + 1);
        maxVlength = Math.max(maxVlength, vBars[i] === prevV + 1 ? vBars[i] - startV + 1 : 2);
        prevV = vBars[i];
    }
    const sideLength = Math.min(maxHlength, maxVlength);
    return sideLength * sideLength;
}
let n = 3;
let m = 2;
let hBars = [3, 2, 4];
let vBars = [3, 2];

console.log(maximizeSquareHoleArea(n, m, hBars, vBars));