"use strict";
exports.__esModule = true;
var fs = require("fs");
function ingestFile() {
    var total = 0;
    var input = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n/).filter(function (c) { return c; });
    return input;
}
function getSignalSum(input) {
    var total = 0;
    var x = 1;
    var ticks = 0;
    for (var i = 0; i < input.length; i++) {
        var temp = input[i].split(' ').filter(function (c) { return c; });
        if (temp[0] == "noop") {
            ticks++;
            if ((ticks - 20) % 40 == 0 && ticks <= 220) {
                total += x * ticks;
            }
        }
        else {
            ticks++;
            if ((ticks - 20) % 40 == 0 && ticks <= 220) {
                total += x * ticks;
            }
            ticks++;
            if ((ticks - 20) % 40 == 0 && ticks <= 220) {
                total += x * ticks;
            }
            x += +temp[1];
        }
    }
    console.log("The total is: " + total);
}
function createImage(input) {
    var mystery = [];
    var currentLine = "";
    var ticks = 0;
    var sprite = 2;
    for (var i = 0; i < input.length; i++) {
        var temp = input[i].split(' ').filter(function (c) { return c; });
        if (temp[0] == "noop") {
            ticks++;
            //check
            if (ticks >= sprite - 1 && ticks <= sprite + 1) {
                currentLine += "#";
            }
            else {
                currentLine += '.';
            }
            if (ticks % 40 == 0) {
                mystery.push(currentLine);
                currentLine = "";
                ticks = 0;
            }
        }
        else {
            ticks++;
            //check
            if (ticks >= sprite - 1 && ticks <= sprite + 1) {
                currentLine += "#";
            }
            else {
                currentLine += '.';
            }
            if (ticks % 40 == 0) {
                mystery.push(currentLine);
                currentLine = "";
                ticks = 0;
            }
            ticks++;
            //check
            if (ticks >= sprite - 1 && ticks <= sprite + 1) {
                currentLine += "#";
            }
            else {
                currentLine += '.';
            }
            if (ticks % 40 == 0) {
                mystery.push(currentLine);
                currentLine = "";
                ticks = 0;
            }
            sprite += +temp[1];
        }
    }
    console.log(mystery);
}
var input = ingestFile();
getSignalSum(input);
createImage(input);
