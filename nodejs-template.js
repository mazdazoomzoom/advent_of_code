const fs = require('fs');

const part1 = (lines) => {
    try {
        return 0;
    } catch (error) {
        console.log(error);
    }
};

const part2 = (lines) => {
    try {
        return 0;
    } catch (error) {
        console.log(error);
    }
};

const main = () => {
    const fileContents = fs.readFileSync('./input.txt', 'utf8');
    const lines = fileContents.split('\n');

    part1Solution = part1(lines);
    console.log(`Part 1 solution: ${part1Solution}`);

    part2Solution = part2(lines);
    console.log(`Part 2 solution: ${part2Solution}`);
};

main();
