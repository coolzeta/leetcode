// You are given a 2D integer array squares. Each squares[i] = [xi, yi, li] represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.

// Find the minimum y-coordinate value of a horizontal line such that the total area covered by squares above the line equals the total area covered by squares below the line.

// Answers within 10-5 of the actual answer will be accepted.

// Note: Squares may overlap. Overlapping areas should be counted only once in this version.

function separateSquares(squares: number[][], margin = 1 / 1e5) {
    const { min, max } = Math;
    let bot = 0, top = 0, totalArea = 0;
    const events: [number, number, number, number][] = []; // [y, type, x1, x2], type: 1=start, -1=end

    for (const [x, y, l] of squares) {
        totalArea += l * l;
        top = max(top, y + l);
        events.push([y, 1, x, x + l]);
        events.push([y + l, -1, x, x + l]);
    }

    totalArea /= 2;

    const calculateCoveredLength = (activeIntervals: [number, number][]) => {
        activeIntervals.sort((a, b) => a[0] - b[0]);
        let coveredLength = 0;
        let currentStart = -Infinity;
        let currentEnd = -Infinity;

        for (const [start, end] of activeIntervals) {
            if (start > currentEnd) {
                coveredLength += currentEnd - currentStart;
                currentStart = start;
                currentEnd = end;
            } else {
                currentEnd = max(currentEnd, end);
            }
        }
        coveredLength += currentEnd - currentStart;
        return coveredLength;
    };

    for (; top - bot > margin;) {
        const m = (top + bot) / 2;
        let botArea = 0;
        let lastY = 0;
        const activeIntervals: [number, number][] = [];

        events.sort((a, b) => a[0] - b[0]);
        for (const [y, type, x1, x2] of events) {
            if (y > m) break;
            const coveredLength = calculateCoveredLength(activeIntervals);
            botArea += coveredLength * (y - lastY);
            lastY = y;

            if (type === 1) {
                activeIntervals.push([x1, x2]);
            } else {
                const index = activeIntervals.findIndex(interval => interval[0] === x1 && interval[1] === x2);
                if (index !== -1) activeIntervals.splice(index, 1);
            }
        }

        const coveredLength = calculateCoveredLength(activeIntervals);
        botArea += coveredLength * (m - lastY);

        botArea >= totalArea ? top = m : bot = m;
    }
    return top; // or return bot, even though top != bot
}