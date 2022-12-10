"use strict";
exports.__esModule = true;
var fs = require("fs");
function ingestFile() {
    var total = 0;
    var input = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n/).filter(function (c) { return c; });
    return input;
}
function getTailPositionCount(input) {
    var positions = new Set;
    var x_tail = 0;
    var y_tail = 0;
    var x_head = 0;
    var y_head = 0;
    for (var i = 0; i < input.length; i++) {
        var temp = input[i].split(' ').filter(function (c) { return c; });
        for (var j = 0; j < +temp[1]; j++) {
            if (temp[0] == "L") {
                x_head -= 1;
                if (!(x_tail + 1 >= x_head && x_tail - 1 <= x_head)) {
                    x_tail = x_head + 1;
                    y_tail = y_head;
                }
            }
            if (temp[0] == "R") {
                x_head += 1;
                if (!(x_tail + 1 >= x_head && x_tail - 1 <= x_head)) {
                    x_tail = x_head - 1;
                    y_tail = y_head;
                }
            }
            if (temp[0] == "U") {
                y_head += 1;
                if (!(y_tail + 1 >= y_head && y_tail - 1 <= y_head)) {
                    x_tail = x_head;
                    y_tail = y_head - 1;
                }
            }
            if (temp[0] == "D") {
                y_head -= 1;
                if (!(y_tail + 1 >= y_head && y_tail - 1 <= y_head)) {
                    x_tail = x_head;
                    y_tail = y_head + 1;
                }
            }
            positions.add(x_tail + "," + y_tail);
        }
    }
    console.log("The number of unique positions is: " + positions.size);
}
function getTailPositionCountPartTwo(input) {
    var positions = new Set;
    var all_positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < input.length; i++) {
        var temp = input[i].split(' ').filter(function (c) { return c; });
        for (var j = 0; j < +temp[1]; j++) {
            for (var k = 0; k < all_positions.length - 3; k += 2) {
                if (k == 0) {
                    if (temp[0] == "L") {
                        all_positions[k] -= 1;
                    }
                    if (temp[0] == "R") {
                        all_positions[k] += 1;
                    }
                    if (temp[0] == "U") {
                        all_positions[k + 1] += 1;
                    }
                    if (temp[0] == "D") {
                        all_positions[k + 1] -= 1;
                    }
                }
                var compute = helper(temp[0], all_positions[k], all_positions[k + 1], all_positions[k + 2], all_positions[k + 3]);
                all_positions[k + 2] = compute[0];
                all_positions[k + 3] = compute[1];
                if (k == 16) {
                    positions.add(all_positions[k + 2] + "," + all_positions[k + 3]);
                    // console.log(all_positions[k+2] + "," + all_positions[k+3] + " current command: " + (i + 1) + " Command: "+ temp[0] + +temp[1]);
                    // console.log(all_positions);
                }
            }
        }
    }
    console.log("The number of unique positions is: " + positions.size);
}
function helper(temp, x_head, y_head, x_tail, y_tail) {
    if (!(x_tail + 1 >= x_head && x_tail - 1 <= x_head) && !(y_tail + 1 >= y_head && y_tail - 1 <= y_head)) {
        if (x_tail + 1 < x_head && y_tail + 1 < y_head) {
            x_tail = x_head - 1;
            y_tail = y_head - 1;
        }
        else if (x_tail + 1 < x_head && y_tail - 1 > y_head) {
            x_tail = x_head - 1;
            y_tail = y_head + 1;
        }
        else if (x_tail - 1 > x_head && y_tail + 1 < y_head) {
            x_tail = x_head + 1;
            y_tail = y_head - 1;
        }
        else if (x_tail - 1 > x_head && y_tail - 1 > y_head) {
            x_tail = x_head + 1;
            y_tail = y_head + 1;
        }
    }
    else if (!(x_tail + 1 >= x_head && x_tail - 1 <= x_head)) {
        if (x_tail + 1 < x_head) {
            x_tail = x_head - 1;
            y_tail = y_head;
        }
        else {
            x_tail = x_head + 1;
            y_tail = y_head;
        }
    }
    if (!(y_tail + 1 >= y_head && y_tail - 1 <= y_head)) {
        if (y_tail + 1 < y_head) {
            y_tail = y_head - 1;
            x_tail = x_head;
        }
        else {
            y_tail = y_head + 1;
            x_tail = x_head;
        }
    }
    return [x_tail, y_tail];
}
var input = ingestFile();
getTailPositionCount(input);
getTailPositionCountPartTwo(input);
