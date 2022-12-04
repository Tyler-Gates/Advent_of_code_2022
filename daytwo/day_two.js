"use strict";
exports.__esModule = true;
var fs = require("fs");
function ingestFile() {
    var total = 0;
    var lines = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n| /).filter(function (c) { return c; });
    console.log(lines);
    return lines;
}
function calculateOutcome(lines) {
    var total = 0;
    for (var i = 0; i < lines.length; i = i + 2) {
        if (lines[i] === "A") {
            if (lines[i + 1] === "Y") {
                total += 6 + 2;
            }
            else if (lines[i + 1] === "X") {
                total += 3 + 1;
            }
            else {
                total += 0 + 3;
            }
        }
        else if (lines[i] === "B") {
            if (lines[i + 1] === "Y") {
                total += 3 + 2;
            }
            else if (lines[i + 1] === "X") {
                total += 0 + 1;
            }
            else {
                total += 6 + 3;
            }
        }
        else if (lines[i] === "C") {
            if (lines[i + 1] === "Y") {
                total += 0 + 2;
            }
            else if (lines[i + 1] === "X") {
                total += 6 + 1;
            }
            else {
                total += 3 + 3;
            }
        }
    }
    console.log("The total points of rock paper scissors is: " + total);
}
//A for Rock, B for Paper, and C for Scissors
//X for Rock, Y for Paper, and Z for Scissors
//1           2                3
function calculateOutcomePartTwo(lines) {
    var total = 0;
    for (var i = 0; i < lines.length; i = i + 2) {
        if (lines[i] === "A") {
            if (lines[i + 1] === "Y") {
                total += 3 + 1;
            }
            else if (lines[i + 1] === "X") {
                total += 0 + 3;
            }
            else {
                total += 6 + 2;
            }
        }
        else if (lines[i] === "B") {
            if (lines[i + 1] === "Y") {
                total += 3 + 2;
            }
            else if (lines[i + 1] === "X") {
                total += 0 + 1;
            }
            else {
                total += 6 + 3;
            }
        }
        else if (lines[i] === "C") {
            if (lines[i + 1] === "Y") {
                total += 3 + 3;
            }
            else if (lines[i + 1] === "X") {
                total += 0 + 2;
            }
            else {
                total += 6 + 1;
            }
        }
    }
    console.log("The total points of rock paper scissors is: " + total);
}
var input = ingestFile();
calculateOutcome(input);
calculateOutcomePartTwo(input);
