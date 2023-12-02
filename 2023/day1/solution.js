const fs = require('fs');
const { parse } = require('path');

// Part 1
const part1 = () => {
    try {
        const fileContents = fs.readFileSync('../input.txt', 'utf8');
        const lines = fileContents.split('\n');
        let values = [];

        lines.forEach((line) => {
            chars = line.split('');
            let val1 = chars.find((char) => !isNaN(char));
            chars.reverse();
            let val2 = chars.find((char) => !isNaN(char));
            values.push(parseInt(val1 + val2));
        });

        solution1 = values.reduce((a, b) => a + b, 0);
        console.log(solution1);
    } catch (error) {
        console.log(error);
    }
};

// Part 2
const part2 = () => {
    try {
        const fileContents = fs.readFileSync('../input.txt', 'utf8');
        const lines = fileContents.split('\n');

        let values = [];
        const valuesSpelledOut = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const regexString = new RegExp('(?=(' + valuesSpelledOut.join('|') + '|\\d))', 'g');

        lines.forEach((line) => {
            let digits = [...line.matchAll(regexString)];

            digits = digits.map((digit) => {
                if (valuesSpelledOut.includes(digit[1])) {
                    return (valuesSpelledOut.indexOf(digit[1]) + 1).toString();
                }
                return digit[1].toString();
            });

            let val1 = digits[0];
            let val2 = digits[digits.length - 1];
            values.push(parseInt(val1 + val2));
        });

        solution2 = values.reduce((a, b) => a + b, 0);
        console.log(solution2);
    } catch (error) {
        console.log(error);
    }
};

part1();
part2();
