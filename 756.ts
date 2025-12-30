// You are stacking blocks to form a pyramid. Each block has a color, which is represented by a single letter. Each row of blocks contains one less block than the row beneath it and is centered on top.

// To make the pyramid aesthetically pleasing, there are only specific triangular patterns that are allowed. A triangular pattern consists of a single block stacked on top of two blocks. The patterns are given as a list of three-letter strings allowed, where the first two characters of a pattern represent the left and right bottom blocks respectively, and the third character is the top block.

// For example, "ABC" represents a triangular pattern with a 'C' block stacked on top of an 'A' (left) and 'B' (right) block. Note that this is different from "BAC" where 'B' is on the left bottom and 'A' is on the right bottom.
// You start with a bottom row of blocks bottom, given as a single string, that you must use as the base of the pyramid.

// Given bottom and allowed, return true if you can build the pyramid all the way to the top such that every triangular pattern in the pyramid is in allowed, or false otherwise.


function pyramidTransition(bottom: string, allowed: string[]): boolean {
    const map: Map<string, string[]> = new Map();
    for (const pattern of allowed) {
        const key = pattern.slice(0, 2);
        const value = pattern[2];
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(value);
    }

    const canBuild = (current: string, next: string[][]): boolean => {
        if (current.length === 1 && next.length === 0) {
            return true;
        }
        if(next.length === 0) {
            let newNext: string[][] = [];
            for (let i = 0; i < current.length - 1; i++) {
                const key = current[i] + current[i + 1];
                if (map.has(key)) {
                    newNext[i] = map.get(key)!;
                } else {
                    return false;  
                }
            }
            return canBuild("", newNext);
        }
        const first = next[0];
        const rest = next.slice(1);
        for (const c of first) {
            if (canBuild(current + c, rest)) {
                return true;
            }
        }
        return false;
    }
    let initNext: string[][] = [];
    for (let i = 0; i < bottom.length - 1; i++) {
        const key = bottom[i] + bottom[i + 1];
        if (map.has(key)) {
            initNext[i] = map.get(key)!;
        } else {
            return false;  
        }
    }
    return canBuild(bottom, []);
};

const answer = pyramidTransition("AAAA", ["AAB","AAC","BCD","BBE","DEF"]);
