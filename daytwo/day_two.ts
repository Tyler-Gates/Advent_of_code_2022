
import * as fs from 'fs';

function ingestFile(): string[] {
    var total: number = 0;
    var lines = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n| /).filter(c => c);
    console.log(lines);
    return lines;
}

function calculateOutcome(lines: string[]) {
    var total = 0;
    for (var i = 0; i < lines.length; i = i+2) {
        if (lines[i] === "A") {
            if (lines[i+1] === "Y") {
                total += 6 + 2;
            }
            else if (lines[i+1] === "X") {
                total += 3 + 1;
            }
            else {
                total += 0 + 3;
            }
        }
        else if (lines[i] === "B") {
            if (lines[i+1] === "Y") {
                total += 3 + 2;
            }
            else if (lines[i+1] === "X") {
                total += 0 + 1;
            }
            else {
                total += 6 + 3;
            }
        }
        else if (lines[i] === "C") {
            if (lines[i+1] === "Y") {
                total += 0 + 2;
            }
            else if (lines[i+1] === "X") {
                total += 6 + 1;
            }
            else {
                total += 3 + 3;
            }
        }
    }
    console.log("The total points of rock paper scissors is: " + total);
}

function calculateOutcomePartTwo(lines: string[]) {
    var total = 0;
    for (var i = 0; i < lines.length; i = i+2) {
        if (lines[i] === "A") {
            if (lines[i+1] === "Y") {
                total += 3 + 1;
            }
            else if (lines[i+1] === "X") {
                total += 0 + 3;
            }
            else {
                total += 6 + 2;
            }
        }
        else if (lines[i] === "B") {
            if (lines[i+1] === "Y") {
                total += 3 + 2;
            }
            else if (lines[i+1] === "X") {
                total += 0 + 1;
            }
            else {
                total += 6 + 3;
            }
        }
        else if (lines[i] === "C") {
            if (lines[i+1] === "Y") {
                total += 3 + 3;
            }
            else if (lines[i+1] === "X") {
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