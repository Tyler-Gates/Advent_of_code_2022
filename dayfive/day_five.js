"use strict";
exports.__esModule = true;
var fs = require("fs");
function ingestFile() {
    var total = 0;
    var lines = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n/).filter(function (c) { return c; });
    return lines;
}
//dynamically getting all the starting positions for each section!
//assumes at least 1 section exists
function getStartingPosition(input) {
    var sections = [];
    for (var i = 1; i < input[0].length; i += 4) {
        sections.push([]);
    }
    for (var i = 0; i < input.length; i++) {
        if (input[i][1] == "1") {
            break;
        }
        var temp = 0;
        for (var j = 1; j < input[i].length; j += 4) {
            if (input[i][j] != " ") {
                sections[temp].push(input[i][j]);
            }
            temp++;
        }
    }
    for (var i = 0; i < sections.length; i++) {
        sections[i].reverse();
    }
    return sections;
}
function doMoves(input, startingPosition) {
    for (var i = 0; i < input.length; i++) {
        if (input[i][0] == "m") {
            for (var j = i; j < input.length; j++) {
                var current = input[j].replace("move ", "").replace("from ", "").replace("to ", "").split(" ").filter(function (c) { return c; });
                var temp = [];
                for (var k = 0; k < +current[0]; k++) {
                    var pop = startingPosition[+current[1] - 1].pop();
                    if (pop !== undefined) {
                        temp.push(pop);
                    }
                }
                for (var k = 0; k < +current[0]; k++) {
                    var pop = temp.pop();
                    if (pop !== undefined) {
                        startingPosition[+current[2] - 1].push(pop);
                    }
                }
            }
            break;
        }
    }
    return startingPosition;
}
function getTopCrates(startingPosition) {
    var answer = "";
    for (var i = 0; i < startingPosition.length; i++) {
        answer += startingPosition[i].pop();
    }
    console.log("The answer is: " + answer);
}
var input = ingestFile();
var startingPositions = getStartingPosition(input);
startingPositions = doMoves(input, startingPositions);
getTopCrates(startingPositions);
