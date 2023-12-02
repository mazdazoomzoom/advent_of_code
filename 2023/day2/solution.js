const fs = require('fs');

// Part 1
const part1 = () => {
    try {
        const fileContents = fs.readFileSync('../input.txt', 'utf8');
        const lines = fileContents.split('\n');
        let sumID = 0;

        for (let line of lines) {
            let validGame = true;
            line = line.split(':');
            gameIndex = line[0].split(' ')[1];

            for (let group of line[1].split('; ')) {
                group = group.trim();
                gameMap = { red: 0, green: 0, blue: 0 };
                for (let block of group.split(', ')) {
                    const [value, color] = block.split(' ');
                    gameMap[color] = parseInt(value);
                }

                if (gameMap['red'] > 12 || gameMap['green'] > 13 || gameMap['blue'] > 14) {
                    validGame = false;
                    break;
                }
            }

            if (validGame) {
                sumID += parseInt(gameIndex);
            }
        }

        console.log(sumID);
    } catch (error) {
        console.log(error);
    }
};

// Part 2
const part2 = () => {
    try {
        const fileContents = fs.readFileSync('../input.txt', 'utf8');
        const lines = fileContents.split('\n');
        let total = 0;

        for (let line of lines) {
            line = line.split(':');
            totalGameMap = { red: 0, green: 0, blue: 0 };

            for (let group of line[1].split('; ')) {
                group = group.trim();
                gameMap = { red: 0, green: 0, blue: 0 };
                for (let block of group.split(', ')) {
                    const [value, color] = block.split(' ');
                    gameMap[color] = parseInt(value);
                }

                for (let color of Object.keys(gameMap)) {
                    totalGameMap[color] = Math.max(gameMap[color], totalGameMap[color]);
                }
            }

            total += totalGameMap['red'] * totalGameMap['green'] * totalGameMap['blue'];
        }

        console.log(total);
    } catch (error) {
        console.log(error);
    }
};

part1();
part2();
