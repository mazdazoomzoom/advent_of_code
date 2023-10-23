const fs = require('fs');

// Part 1
const part1 = () => {
    try {
        const fileContents = fs.readFileSync('./input.txt', 'utf8');
        const lines = fileContents.split('\n');
        let freq = 0;

        for (const line of lines) {
            const change = parseInt(line);
            freq += change;
        }

        console.log(freq);
    } catch (error) {
        console.log(error);
    }
};

// Part 2
const part2 = () => {
    try {
        const fileContents = fs.readFileSync('./input.txt', 'utf8');
        const lines = fileContents.split('\n');
        let freq = 0;

        const frequencies = new Set();
        let i = 0;
        while (true) {
            const change = parseInt(lines[i]);
            freq += change;

            if (frequencies.has(freq)) {
                break;
            }

            frequencies.add(freq);
            i = (i + 1) % lines.length;
        }

        console.log(freq);
    } catch (error) {
        console.log(error);
    }
};

part1();
part2();
