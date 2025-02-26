/**
 * Takes in the ids straight from the wiki and converts them into json format
 *
 * https://minecraft.fandom.com/wiki/Module:InvSprite
 */

const fs = require("fs");
const path = require("path");

// Paths to input and output files
const inputFilePath = path.join(__dirname, "../data/wiki/ids.txt");
const outputFilePath = path.join(__dirname, "../data/wiki/ids.json");

// Function to convert input to an array-like object
const convertToJSArrayObject = (input) => {
    const items = {};

    const remap = {
        '3D': '_3d',
        '???': 'qqq'
    };

    input
        .trim()
        .split(/\n/)
        .forEach((line) => {
            const match = line.match(/\s*(?:\['(.+?)'\]|(\w+))\s*=\s*\{\s*pos\s*=\s*(\d+),\s*section\s*=\s*(\d+)\s*\},?/);
            if (match) {
                const key = match[1] || match[2]; // Use bracketed key if present, otherwise use plain key

                console.log(key, remap[key])

                if (remap.hasOwnProperty(key)) {
                    items[remap[key]] = {pos: Number(match[3]), section: Number(match[4])};
                    console.log(`Setting key ${remap[key]}`);
                } else {
                    items[key] = {pos: Number(match[3]), section: Number(match[4])};
                }
            }
        });

    return items;
};

// Read the file, process it, and save output
fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    let items = convertToJSArrayObject(data);

    // Save to JSON file
    fs.writeFile(outputFilePath, JSON.stringify(items, null, 2), "utf8", (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log(`Successfully saved output to ${outputFilePath}`);
        }
    });
});