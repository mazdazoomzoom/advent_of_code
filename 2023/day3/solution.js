const fs = require('fs');

const part1 = (lines) => {
    try {
        const listOfSpecialChars = [];
        let sumOfValues = 0;

        // make a list of all the special characters, characters that are not numbers and . (dot)
        lines.map((line) => {
            return line.split('').map((char) => {
                if (!char.match(/[0-9]/) && char !== '.') {
                    if (!listOfSpecialChars.includes(char)) {
                        listOfSpecialChars.push(char);
                    }
                }
            });
        });

        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            let numberString = '';
            let numberStringIsConnectedToSpecialChar = false;

            for (let charIndex = 0; charIndex < lines[lineIndex].length; charIndex++) {
                let char = lines[lineIndex][charIndex];

                if (char.match(/[0-9]/)) {
                    numberString += char;

                    if (!numberStringIsConnectedToSpecialChar) {
                        numberStringIsConnectedToSpecialChar = checkIfCharacterIsAdjacentToSpecialCharacter(
                            lines,
                            [charIndex, lineIndex],
                            listOfSpecialChars
                        ).isConnected;
                    }
                } else {
                    if (numberString.length > 0 && numberStringIsConnectedToSpecialChar) {
                        sumOfValues += parseInt(numberString);
                        numberStringIsConnectedToSpecialChar = false;
                    }
                    numberString = '';
                }
            }

            if (numberString.length > 0 && numberStringIsConnectedToSpecialChar) {
                sumOfValues += parseInt(numberString);
            }
        }

        return sumOfValues;
    } catch (error) {
        console.log(error);
    }
};

const part2 = (lines) => {
    try {
        const specialChar = ['*'];
        let sumOfValues = 0;

        // create an array of the coordinates of all the special characters
        const specialCharCoordinates = [];
        lines.map((line, lineIndex) => {
            return line.split('').map((char, charIndex) => {
                if (specialChar.includes(char)) {
                    specialCharCoordinates.push({
                        coords: [charIndex, lineIndex],
                        connectedNumberStrings: [],
                    });
                }
            });
        });

        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            let numberString = '';
            let numberStringIsConnectedToSpecialChar = false;
            let numberStringSpecialCharCoordinates = [];

            for (let charIndex = 0; charIndex < lines[lineIndex].length; charIndex++) {
                let char = lines[lineIndex][charIndex];

                if (char.match(/[0-9]/)) {
                    numberString += char;

                    if (!numberStringIsConnectedToSpecialChar) {
                        const { isConnected, connectedCharCoordinates } = checkIfCharacterIsAdjacentToSpecialCharacter(
                            lines,
                            [charIndex, lineIndex],
                            [...specialChar]
                        );

                        if (isConnected) {
                            numberStringIsConnectedToSpecialChar = true;
                            numberStringSpecialCharCoordinates = connectedCharCoordinates;
                        }
                    }
                } else {
                    if (numberString.length > 0 && numberStringIsConnectedToSpecialChar) {
                        // find instance of specialCharCoordinates that matches numberStringSpecialCharCoordinates
                        const specialCharCoordinateIndex = specialCharCoordinates.findIndex((specialCharCoordinate) => {
                            return (
                                specialCharCoordinate.coords[0] === numberStringSpecialCharCoordinates[0] &&
                                specialCharCoordinate.coords[1] === numberStringSpecialCharCoordinates[1]
                            );
                        });

                        if (specialCharCoordinateIndex != -1) {
                            specialCharCoordinates[specialCharCoordinateIndex].connectedNumberStrings.push(numberString);
                        }

                        numberStringIsConnectedToSpecialChar = false;
                        numberStringSpecialCharCoordinates = [];
                    }
                    numberString = '';
                }
            }

            if (numberString.length > 0 && numberStringIsConnectedToSpecialChar) {
                const specialCharCoordinateIndex = specialCharCoordinates.findIndex((specialCharCoordinate) => {
                    return (
                        specialCharCoordinate.coords[0] === numberStringSpecialCharCoordinates[0] &&
                        specialCharCoordinate.coords[1] === numberStringSpecialCharCoordinates[1]
                    );
                });

                if (specialCharCoordinateIndex != -1) {
                    specialCharCoordinates[specialCharCoordinateIndex].connectedNumberStrings.push(numberString);
                }
            }
        }

        specialCharCoordinates.map((specialCharCoordinate) => {
            if (specialCharCoordinate.connectedNumberStrings.length == 2) {
                const [val1, val2] = specialCharCoordinate.connectedNumberStrings;
                sumOfValues += parseInt(val1) * parseInt(val2);
            }
        });

        return sumOfValues;
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

const checkIfCharacterIsAdjacentToSpecialCharacter = (lines, charCoordinates, specialCharacters) => {
    const [charIndex, lineIndex] = charCoordinates;

    // check left
    if (charIndex > 0) {
        if (specialCharacters.includes(lines[lineIndex][charIndex - 1])) {
            return {
                isConnected: true,
                connectedCharCoordinates: [charIndex - 1, lineIndex],
            };
        }
    }

    // check upper left
    if (charIndex > 0 && lineIndex > 0) {
        if (specialCharacters.includes(lines[lineIndex - 1][charIndex - 1])) {
            return {
                isConnected: true,
                connectedCharCoordinates: [charIndex - 1, lineIndex - 1],
            };
        }
    }

    // check top
    if (lineIndex > 0) {
        if (specialCharacters.includes(lines[lineIndex - 1][charIndex])) {
            return {
                isConnected: true,
                connectedCharCoordinates: [charIndex, lineIndex - 1],
            };
        }
    }

    // check upper right
    if (lineIndex > 0 && charIndex < lines[lineIndex].length - 1) {
        if (specialCharacters.includes(lines[lineIndex - 1][charIndex + 1])) {
            return {
                isConnected: true,
                connectedCharCoordinates: [charIndex + 1, lineIndex - 1],
            };
        }
    }

    // check right
    if (charIndex < lines[lineIndex].length - 1) {
        if (specialCharacters.includes(lines[lineIndex][charIndex + 1])) {
            return {
                isConnected: true,
                connectedCharCoordinates: [charIndex + 1, lineIndex],
            };
        }
    }

    // check lower right
    if (lineIndex < lines.length - 1 && charIndex < lines[lineIndex].length - 1) {
        if (specialCharacters.includes(lines[lineIndex + 1][charIndex + 1])) {
            return {
                isConnected: true,
                connectedCharCoordinates: [charIndex + 1, lineIndex + 1],
            };
        }
    }

    // check bottom
    if (lineIndex < lines.length - 1) {
        if (specialCharacters.includes(lines[lineIndex + 1][charIndex])) {
            return {
                isConnected: true,
                connectedCharCoordinates: [charIndex, lineIndex + 1],
            };
        }
    }

    // check lower left
    if (lineIndex < lines.length - 1 && charIndex > 0) {
        if (specialCharacters.includes(lines[lineIndex + 1][charIndex - 1])) {
            return {
                isConnected: true,
                connectedCharCoordinates: [charIndex - 1, lineIndex + 1],
            };
        }
    }

    return {
        isConnected: false,
        connectedCharCoordinates: [],
    };
};

main();
