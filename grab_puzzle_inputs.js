require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

(async () => {
    try {
        // Get today's year and month
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;

        // Create the year directory if it doesn't exist
        if (!fs.existsSync(`./${year}`)) {
            fs.mkdirSync(`./${year}`);
        }

        const directories = fs.readdirSync('./');
        for (const file of directories) {
            // Check if file is a directory and a year
            if (fs.lstatSync(file).isDirectory() && file.match(/^\d{4}$/)) {
                // Get the year of the directory
                const fileYear = file;

                // Grab input file for the 25 days of Christmas on the Advent of Code website
                for (let day = 1; day <= 25; day++) {
                    if (!fs.existsSync(`./${fileYear}/day${day}`)) {
                        fs.mkdirSync(`./${fileYear}/day${day}`);
                    }

                    if (!fs.existsSync(`./${fileYear}/day${day}/NodeJS`)) {
                        fs.mkdirSync(`./${fileYear}/day${day}/NodeJS`);
                    }

                    if (!fs.existsSync(`./${fileYear}/day${day}/NodeJS/index.js`)) {
                        fs.writeFileSync(`./${fileYear}/day${day}/NodeJS/index.js`, fs.readFileSync('./index-template.js', 'utf8'));
                    }

                    if (!fs.existsSync(`./${fileYear}/day${day}/Go`)) {
                        fs.mkdirSync(`./${fileYear}/day${day}/Go`);
                    }

                    if (fileYear == year) {
                        if (month == 12) {
                            const date1 = new Date(`${fileYear}-${month}-${day}`);
                            const Difference_In_Time = today.getTime() - date1.getTime();
                            if (Difference_In_Time < 0) {
                                continue;
                            }
                        }
                        continue;
                    }

                    if (!fs.existsSync(`./${fileYear}/day${day}/input.txt`)) {
                        // pause for 5 seconds to not overload the server
                        await new Promise((resolve) => setTimeout(resolve, 5000));

                        // grab the input file from the website and save it to the directory
                        console.log(`Grabbing input for ${fileYear} day ${day}`);
                        const input = await axios.get(`https://adventofcode.com/${fileYear}/day/${day}/input`, {
                            headers: {
                                Cookie: `session=${process.env.SESSION_COOKIE}`,
                            },
                        });

                        if (input.status !== 200) {
                            console.log(`Error getting input for ${fileYear} day ${day}`);
                            console.log(input);
                            return;
                        }

                        console.log(`Saving input for ${fileYear} day ${day}`);

                        if (typeof input.data == 'object') {
                            input.data = JSON.stringify(input.data, null, 4);
                        } else {
                            input.data = input.data.toString();
                            input.data = input.data.trim();
                        }

                        fs.writeFileSync(`./${fileYear}/day${day}/input.txt`, input.data);
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
})();
