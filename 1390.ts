// Given an integer array nums, return the sum of divisors of the integers in that array that have exactly four divisors. If there is no such integer in the array, return 0

function sumFourDivisors(nums: number[]): number {
    const max = Math.max(...nums);
    
    // 埃拉托斯特尼筛法筛选素数
    const isPrime = new Array(max + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= max; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= max; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    const primes: number[] = [];
    for (let i = 2; i <= max; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }
    
    let totalSum = 0;
    
    for (const num of nums) {
        let divisorSum = 0;
        let divisorCount = 0;
        
        const cubeRoot = Math.round(num ** (1/3));
        if (cubeRoot <= max && isPrime[cubeRoot] && cubeRoot * cubeRoot * cubeRoot === num) {
            divisorSum = 1 + cubeRoot + cubeRoot * cubeRoot + num;
            divisorCount = 4;
        } else {
            for (const p of primes) {
                if (p * p > num) break;
                
                if (num % p === 0) {
                    const q = num / p;
                    if (q !== p && q <= max && isPrime[q]) {
                        divisorSum = 1 + p + q + num;
                        divisorCount = 4;
                        break;
                    }
                }
            }
        }
        
        if (divisorCount === 4) {
            totalSum += divisorSum;
        }
    }
    
    return totalSum;
}

const nums = [21, 4, 7];
console.log(sumFourDivisors(nums));