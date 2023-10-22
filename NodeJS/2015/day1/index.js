const fs = require('fs');

// Part 1
const part1 = () => {
    try {
        const fileContents = fs.readFileSync('./input.txt', 'utf8');
        let floor = 0;

        fileContents.split('').forEach((character) => {
            if (character === '(') {
                floor++;
            } else if (character === ')') {
                floor--;
            }
        });

        console.log(floor);
    } catch (error) {
        console.log(error);
    }
};

// Part 2
const part2 = () => {
    try {
        const fileContents = fs.readFileSync('./input.txt', 'utf8');
        let floor = 0;

        for (const [index, character] of fileContents.split('').entries()) {
            if (character === '(') {
                floor++;
            } else if (character === ')') {
                floor--;
            }

            if (floor === -1) {
                console.log(index + 1);
                break;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

part1();
part2();
