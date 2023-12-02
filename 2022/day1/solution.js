const fs = require('fs');

// Part 1
const part1 = () => {
    try {
        const fileContents = fs.readFileSync('../input.txt', 'utf8');
        const lines = fileContents.split('\n');

        let elfArray = [0];
        lines.map((line) => {
            if (line == '') {
                elfArray.push(0);
                return;
            }

            elfArray[elfArray.length - 1] += parseInt(line);
        });

        // Sort High to Lowest
        elfArray.sort((a, b) => b - a);
        console.log(elfArray[0]);
    } catch (error) {
        console.log(error);
    }
};

// Part 2
const part2 = () => {
    try {
        const fileContents = fs.readFileSync('../input.txt', 'utf8');
        const lines = fileContents.split('\n');

        let elfArray = [0];
        lines.map((line) => {
            if (line == '') {
                elfArray.push(0);
                return;
            }

            elfArray[elfArray.length - 1] += parseInt(line);
        });

        // Sort High to Lowest
        elfArray.sort((a, b) => b - a);
        console.log(elfArray[0] + elfArray[1] + elfArray[2]);
    } catch (error) {
        console.log(error);
    }
};

part1();
part2();
