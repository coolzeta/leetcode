// You are given a 2D integer array squares. Each squares[i] = [xi, yi, li] represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.

// Find the minimum y-coordinate value of a horizontal line such that the total area of the squares above the line equals the total area of the squares below the line.

// Answers within 10-5 of the actual answer will be accepted.

// Note: Squares may overlap. Overlapping areas should be counted multiple times.

function separateSquares(squares: number[][], margin = 1 / 1e5) {
    const { min, max } = Math;
    let bot = 0, top = 0, totalArea = 0;
    for (const [, y, l] of squares) totalArea += l * l, top = max(top, y + l);
    for (const halfArea = totalArea /= 2; top - bot > margin;) {
        const m = (top + bot) / 2;
        const botArea = squares.reduce((a, [, y, l]) => a + max(0, min(m - y, l)) * l, 0);
        botArea >= halfArea ? top = m : bot = m;
    }
    return top; // or return bot, even though top != bot
}