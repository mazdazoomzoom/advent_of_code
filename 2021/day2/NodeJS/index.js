const fs = require('fs');

// Part 1
const part1 = () => {
    try {
        const fileContents = fs.readFileSync('../input.txt', 'utf8');
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
