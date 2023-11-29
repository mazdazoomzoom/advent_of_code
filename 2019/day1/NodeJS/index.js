const fs = require('fs');

// Part 1
const part1 = () => {
    try {
        const fileContents = fs.readFileSync('../input.txt', 'utf8');
        const lines = fileContents.split('\n');
        let sum = 0;

        for (const line of lines) {
            const change = parseInt(line);
            sum += change;
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
    } catch (error) {
        console.log(error);
    }
};

part1();
part2();
