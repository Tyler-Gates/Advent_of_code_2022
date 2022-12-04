"use strict";
exports.__esModule = true;
var fs = require("fs");
function ingestFile() {
    var list = [];
    var temp = 0;
    var lines = fs.readFileSync(".\\input.txt", 'utf-8').split('\r\n');
    for (var i = 0; i < lines.length; i++) {
        if (lines[i] !== "") {
            temp += +lines[i];
        }
        else {
            list.push(temp);
            temp = 0;
        }
    }
    list.push(temp);
    return list;
}
function mostCaloriesLocator(input) {
    var high = 0;
    var position = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] > high) {
            high = input[i];
            position = i;
        }
    }
    console.log("The elf with the most is " + (position + 1) + " with a total of " + high + " calories!");
}
function mostCaloriesTotal(input) {
    var sortedList = input.sort(function (n1, n2) { return n2 - n1; });
    console.log("The top three elves have " + (sortedList[0] + sortedList[1] + sortedList[2]) + " total calories!");
}
var ingested = ingestFile();
mostCaloriesLocator(ingested);
mostCaloriesTotal(ingested);
