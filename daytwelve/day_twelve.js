"use strict";
exports.__esModule = true;
var fs = require("fs");
function ingestFile() {
    var total = 0;
    var input = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n/).filter(function (c) { return c; });
    return input;
}
//Created a DFS algorithm by mistake...
//need to create a  BFS instead.. !
function findShortestPathDFS(input, recordedMoves, currLocation) {
    var newRecord = JSON.parse(JSON.stringify(recordedMoves));
    var newLocation = [currLocation[0], currLocation[1]];
    newRecord.push(newLocation[0] + "," + newLocation[1]);
    //console.log(newRecord);
    var pathSize = newRecord.length;
    var pathUp = 10000000000;
    var pathDown = 10000000000;
    var pathLeft = 10000000000;
    var pathRight = 10000000000;
    //move right
    if (newLocation[1] != input[0].length - 1 && newRecord.indexOf(newLocation[0] + "," + (newLocation[1] + 1)) == -1) {
        if ((input[newLocation[0]][newLocation[1]].charCodeAt(0) >= input[newLocation[0]][newLocation[1] + 1].charCodeAt(0) - 1 && (input[newLocation[0]][newLocation[1] + 1] != "E")) || input[newLocation[0]][newLocation[1]] == "S" || (input[newLocation[0]][newLocation[1] + 1] == "E" && input[newLocation[0]][newLocation[1]] == "z")) {
            if (input[newLocation[0]][newLocation[1] + 1] == "E") {
                console.log("end reached, steps: " + pathSize);
                return pathSize;
            }
            else {
                newLocation[1] += 1;
                //console.log("right " + "(" + newLocation[0] + "," + newLocation[1] + ") " +input[newLocation[0]][newLocation[1]]);
                //console.log(newRecord);
                pathRight = findShortestPathDFS(input, newRecord, newLocation);
                newLocation[1] -= 1;
            }
        }
    }
    //move up
    if (newLocation[0] != 0 && newRecord.indexOf((newLocation[0] - 1) + "," + newLocation[1]) == -1) {
        if ((input[newLocation[0]][newLocation[1]].charCodeAt(0) >= input[newLocation[0] - 1][newLocation[1]].charCodeAt(0) - 1 && (input[newLocation[0] - 1][newLocation[1]] != "E")) || input[newLocation[0]][newLocation[1]] == "S" || (input[newLocation[0] - 1][newLocation[1]] == "E" && input[newLocation[0]][newLocation[1]] == "z")) {
            if (input[newLocation[0] - 1][newLocation[1]] == "E") {
                console.log("end reached, steps: " + pathSize);
                return pathSize;
            }
            else {
                newLocation[0] -= 1;
                //console.log("up " + "(" + newLocation[0] + "," + newLocation[1] + ") " +input[newLocation[0]][newLocation[1]]);
                //console.log(newRecord);
                pathUp = findShortestPathDFS(input, newRecord, newLocation);
                newLocation[0] += 1;
            }
        }
    }
    //move down
    if (newLocation[0] != input.length - 1 && newRecord.indexOf((newLocation[0] + 1) + "," + newLocation[1]) == -1) {
        if ((input[newLocation[0]][newLocation[1]].charCodeAt(0) >= input[newLocation[0] + 1][newLocation[1]].charCodeAt(0) - 1 && (input[newLocation[0] + 1][newLocation[1]] != "E")) || input[newLocation[0]][newLocation[1]] == "S" || (input[newLocation[0] + 1][newLocation[1]] == "E" && input[newLocation[0]][newLocation[1]] == "z")) {
            if (input[newLocation[0] + 1][newLocation[1]] == "E") {
                console.log("end reached, steps: " + pathSize);
                return pathSize;
            }
            else {
                newLocation[0] += 1;
                //console.log("down " + "(" + newLocation[0] + "," + newLocation[1] + ") " +input[newLocation[0]][newLocation[1]]);
                //console.log(newRecord);
                pathDown = findShortestPathDFS(input, newRecord, newLocation);
                newLocation[0] -= 1;
            }
        }
    }
    //move left
    if (newLocation[1] != 0 && newRecord.indexOf(newLocation[0] + "," + (newLocation[1] - 1)) == -1) {
        if ((input[newLocation[0]][newLocation[1]].charCodeAt(0) >= input[newLocation[0]][newLocation[1] - 1].charCodeAt(0) - 1 && (input[newLocation[0]][newLocation[1] - 1] != "E")) || input[newLocation[0]][newLocation[1]] == "S" || (input[newLocation[0]][newLocation[1] - 1] == "E" && input[newLocation[0]][newLocation[1]] == "z")) {
            if (input[newLocation[0]][newLocation[1] - 1] == "E") {
                console.log("end reached, steps: " + pathSize);
                return pathSize;
            }
            else {
                newLocation[1] -= 1;
                //console.log("left " + "(" + newLocation[0] + "," + newLocation[1] + ") " +input[newLocation[0]][newLocation[1]]);
                //console.log(newRecord);
                pathLeft = findShortestPathDFS(input, newRecord, newLocation);
                newLocation[1] += 1;
            }
        }
    }
    if (pathUp <= pathDown && pathUp <= pathRight && pathUp <= pathLeft) {
        pathSize = pathUp;
    }
    else if (pathLeft <= pathDown && pathLeft <= pathRight && pathLeft <= pathUp) {
        pathSize = pathLeft;
    }
    else if (pathDown <= pathLeft && pathDown <= pathRight && pathDown <= pathUp) {
        pathSize = pathDown;
    }
    else {
        pathSize = pathRight;
    }
    return pathSize;
}
//BFS version of the code
function findShortestPath(input, currLocation) {
    var queue = [];
    queue.push(currLocation);
    var closed = new Set();
    var added = new Set();
    while (queue.length != 0) {
        currLocation[0] = queue[0][0]; //y coord
        currLocation[1] = queue[0][1]; //x coord
        currLocation[2] = queue[0][2]; //length
        //console.log("currLocation: " + currLocation);
        //move right
        if (currLocation[1] != input[0].length - 1 && !closed.has(currLocation[0] + "," + (currLocation[1] + 1))) {
            if ((input[currLocation[0]][currLocation[1]].charCodeAt(0) >= input[currLocation[0]][currLocation[1] + 1].charCodeAt(0) - 1 && (input[currLocation[0]][currLocation[1] + 1] != "E"))
                || input[currLocation[0]][currLocation[1]] == "S"
                || (input[currLocation[0]][currLocation[1] + 1] == "E" && input[currLocation[0]][currLocation[1]] == "z")) {
                if (input[currLocation[0]][currLocation[1] + 1] == "E") {
                    return currLocation[2] + 1;
                }
                else {
                    if (!added.has((currLocation[0]) + "," + (currLocation[1] + 1))) {
                        queue.push([currLocation[0], currLocation[1] + 1, currLocation[2] + 1]);
                        added.add((currLocation[0]) + "," + (currLocation[1] + 1));
                    }
                }
            }
        }
        //move up
        if (currLocation[0] != 0 && !closed.has((currLocation[0] - 1) + "," + currLocation[1])) {
            if ((input[currLocation[0]][currLocation[1]].charCodeAt(0) >= input[currLocation[0] - 1][currLocation[1]].charCodeAt(0) - 1 && (input[currLocation[0] - 1][currLocation[1]] != "E"))
                || input[currLocation[0]][currLocation[1]] == "S"
                || (input[currLocation[0] - 1][currLocation[1]] == "E" && input[currLocation[0]][currLocation[1]] == "z")) {
                if (input[currLocation[0] - 1][currLocation[1]] == "E") {
                    return currLocation[2] + 1;
                }
                else {
                    if (!added.has((currLocation[0] - 1) + "," + (currLocation[1]))) {
                        queue.push([currLocation[0] - 1, currLocation[1], currLocation[2] + 1]);
                        added.add((currLocation[0] - 1) + "," + (currLocation[1]));
                    }
                }
            }
        }
        //move down
        if (currLocation[0] != input.length - 1 && !closed.has((currLocation[0] + 1) + "," + currLocation[1])) {
            if ((input[currLocation[0]][currLocation[1]].charCodeAt(0) >= input[currLocation[0] + 1][currLocation[1]].charCodeAt(0) - 1 && (input[currLocation[0] + 1][currLocation[1]] != "E"))
                || input[currLocation[0]][currLocation[1]] == "S"
                || (input[currLocation[0] + 1][currLocation[1]] == "E" && input[currLocation[0]][currLocation[1]] == "z")) {
                if (input[currLocation[0] + 1][currLocation[1]] == "E") {
                    return currLocation[2] + 1;
                }
                else {
                    if (!added.has((currLocation[0] + 1) + "," + (currLocation[1]))) {
                        queue.push([currLocation[0] + 1, currLocation[1], currLocation[2] + 1]);
                        added.add((currLocation[0] + 1) + "," + (currLocation[1]));
                    }
                }
            }
        }
        //move left
        if (currLocation[1] != 0 && !closed.has(currLocation[0] + "," + (currLocation[1] - 1))) {
            if ((input[currLocation[0]][currLocation[1]].charCodeAt(0) >= input[currLocation[0]][currLocation[1] - 1].charCodeAt(0) - 1 && (input[currLocation[0]][currLocation[1] - 1] != "E"))
                || input[currLocation[0]][currLocation[1]] == "S"
                || (input[currLocation[0]][currLocation[1] - 1] == "E" && input[currLocation[0]][currLocation[1]] == "z")) {
                if (input[currLocation[0]][currLocation[1] - 1] == "E") {
                    return currLocation[2] + 1;
                }
                else {
                    if (!added.has((currLocation[0]) + "," + (currLocation[1] - 1))) {
                        queue.push([currLocation[0], currLocation[1] - 1, currLocation[2] + 1]);
                        added.add((currLocation[0]) + "," + (currLocation[1] - 1));
                    }
                }
            }
        }
        if (!closed.has(currLocation[0] + "," + (currLocation[1]))) {
            closed.add(currLocation[0] + "," + currLocation[1]);
        }
        queue.shift();
        //console.log("queue"); console.log(queue);
        //console.log("closed"); console.log(closed);
    }
    return 1000;
}
function anyA(input) {
    var smallest = 1000;
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < input[0].length; j++) {
            if (input[i][j] == 'a') {
                var temp = findShortestPath(input, [i, j, 0]);
                if (temp < smallest) {
                    smallest = temp;
                }
            }
        }
    }
    return smallest;
}
var input = ingestFile();
console.log(findShortestPath(input, [20, 0, 0]));
console.log(anyA(input));
