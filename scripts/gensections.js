/**
 * Takes in the sections straight from the wiki and converts them into json format
 *
 * https://minecraft.fandom.com/wiki/Module:InvSprite
 */

const fs = require("fs");
const path = require("path");

// Paths for input and output files
const inputFilePath = path.join(__dirname, "../data/wiki/sections.txt");
const outputFilePath = path.join(__dirname, "../data/wiki/sections.json");

// Function to convert input to JavaScript object
const convertToJSObject = (input) => {
    const items = {}; // Store data as an object

    input
        .trim()
        .split(/\n/)
        .forEach((line) => {
            const match = line.match(/\{\s*name\s*=\s*'(.+?)',\s*id\s*=\s*(\d+)\s*\}/);
            if (match) {
                const name = match[1];
                const id = Number(match[2]);
                items[name] = id;
            } else {
                console.warn("Skipping invalid line:", line);
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

    let items = convertToJSObject(data);

    // Check if output is empty
    if (Object.keys(items).length === 0) {
        console.error("No valid entries found! Check input format.");
        return;
    }

    // Save to JSON file
    fs.writeFile(outputFilePath, JSON.stringify(items, null, 2), "utf8", (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log(`Successfully saved output to ${outputFilePath}`);
        }
    });
});