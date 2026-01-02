// You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

// Increment the large integer by one and return the resulting array of digits.

function plusOne(digits: number[]): number[] {
 function addOne(index: number): void {
    if (index < 0) {
        digits.unshift(1)           ;
        return;
    }else if (digits[index] === 9) {
        digits[index] = 0;
        addOne(index - 1);
    } else {
        digits[index]++;
        return;
    }
}
    return addOne(digits.length - 1), digits;
};

const digits =
[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3];

console.log(plusOne(digits));