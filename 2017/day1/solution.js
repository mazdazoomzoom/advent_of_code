const fs = require('fs');

// Part 1
const part1 = () => {
    try {
        const fileContents = fs.readFileSync('../input.txt', 'utf8');
        const digits = fileContents.split('');
        let sum = 0;

        digits.push(digits[0]); // Add the first digit to the end to make it circular

        for (let i = 0; i < digits.length; i++) {
            if (digits[i] === digits[i + 1]) {
                sum += parseInt(digits[i]);
            }
        }

        console.log(sum);
    } catch (error) {
        console.log(error);
    }
};

// Part 2
const part2 = () => {
    try {
        const fileContents = fs.readFileSync('../input.txt', 'utf8');
        const digits = fileContents.split('');
        let sum = 0;
        const halfway = digits.length / 2;

        for (let i = 0; i < digits.length; i++) {
            if (digits[i] === digits[(i + halfway) % digits.length]) {
                sum += parseInt(digits[i]);
            }
        }

        console.log(sum);
    } catch (error) {
        console.log(error);
    }
};

part1();
part2();
