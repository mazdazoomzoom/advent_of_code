const fs = require('fs');

const getDirectionCoordinates = (fileContents) => {
    const headings = ['N', 'E', 'S', 'W'];
    // (x, y, heading)
    const positions = [[0, 0, 0]];

    fileContents.split(',').map((direction) => {
        direction = direction.trim();
        const directionToGo = direction.charAt(0);
        const distance = parseInt(direction.substring(1));

        let [x, y, heading] = positions[positions.length - 1];

        heading = (heading + (directionToGo == 'R' ? 1 : 3)) % 4;
        switch (headings[heading]) {
            case 'N':
                y += distance;
                break;
            case 'E':
                x += distance;
                break;
            case 'S':
                y -= distance;
                break;
            case 'W':
                x -= distance;
                break;
        }

        positions.push([x, y, heading]);
    });

    return positions;
};

const getTravelPath = (positions) => {
    let pathPoints = [[0, 0]];

    for (const position of positions) {
        const [x, y, heading] = position;

        let [lastX, lastY] = pathPoints[pathPoints.length - 1];
        while (x !== lastX || y !== lastY) {
            if (x !== lastX) {
                if (x > lastX) {
                    pathPoints.push([lastX + 1, lastY]);
                } else {
                    pathPoints.push([lastX - 1, lastY]);
                }
            }

            if (y !== lastY) {
                if (y > lastY) {
                    pathPoints.push([lastX, lastY + 1]);
                } else {
                    pathPoints.push([lastX, lastY - 1]);
                }
            }

            lastX = pathPoints[pathPoints.length - 1][0];
            lastY = pathPoints[pathPoints.length - 1][1];
        }
    }

    return pathPoints;
};

// Part 1
const part1 = () => {
    try {
        const fileContents = fs.readFileSync('./input.txt', 'utf8');
        const positions = getDirectionCoordinates(fileContents);

        console.log('Blocks away: ' + (Math.abs(positions[positions.length - 1][0]) + Math.abs(positions[positions.length - 1][1])));
    } catch (error) {
        console.log(error);
    }
};

// Part 2
const part2 = () => {
    try {
        const fileContents = fs.readFileSync('./input.txt', 'utf8');
        const positions = getDirectionCoordinates(fileContents);
        const pathPoints = getTravelPath(positions);
        let intersectionPoint = null;

        // Look for intersections
        for (const [index, point] of pathPoints.entries()) {
            for (let i = index + 1; i < pathPoints.length; i++) {
                if (point[0] === pathPoints[i][0] && point[1] === pathPoints[i][1]) {
                    intersectionPoint = point;
                    break;
                }
            }

            if (intersectionPoint !== null) {
                break;
            }
        }

        console.log('Blocks away: ' + (Math.abs(intersectionPoint[0]) + Math.abs(intersectionPoint[1])));
    } catch (error) {
        console.log(error);
    }
};

part1();
part2();
