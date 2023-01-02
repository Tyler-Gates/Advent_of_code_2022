"use strict";
exports.__esModule = true;
var fs = require("fs");
function ingestFile() {
    var total = 0;
    var input = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n/).filter(function (c) { return c; });
    return input;
}
function findIndices(input) {
    var total = 0;
    var current = 1;
    for (var i = 0; i < input.length; i += 2) {
        var left = input[i];
        var L_count = 0;
        var right = input[i + 1];
        var R_count = 0;
        console.log(left);
        console.log(right);
        //Idea: Iterate and compare through both using the opening and closing brackets.
        //If bracket is open increase counter by one, if closed, decrease by one.
        //use this as basis for logic of list comparisons.
        //create two while loops that each run within another while loop
        //each inner while loop changes the L&Rcounters and stops at the first , or ]
        var L_saved = 0;
        var L_val = -1;
        var R_saved = 0;
        var R_val = -1;
        while (true) {
            R_val = -1;
            L_val = -1;
            for (var L_iter = L_saved; L_iter < left.length; L_iter++) {
                if (left[L_iter] == ']') {
                    L_count--;
                }
                else if (left[L_iter] == '[') {
                }
                else if (left[L_iter] == '1') {
                    if (left[L_iter + 1] == '0') {
                        L_val = 10;
                        L_saved = L_iter + 2;
                    }
                    else {
                        L_val = 1;
                        L_saved = L_iter + 1;
                    }
                    break;
                }
                else if (left[L_iter] != ',') {
                    L_val = +left[L_iter];
                    L_saved = L_iter + 1;
                    break;
                }
            }
            for (var R_iter = R_saved; R_iter < right.length; R_iter++) {
                if (right[R_iter] == ']') {
                    R_count--;
                }
                else if (right[R_iter] == '[') {
                }
                else if (right[R_iter] == '1') {
                    if (right[R_iter + 1] == '0') {
                        R_val = 10;
                        R_saved = R_iter + 2;
                    }
                    else {
                        R_val = 1;
                        R_saved = R_iter + 1;
                    }
                    break;
                }
                else if (right[R_iter] != ',') {
                    R_val = +right[R_iter];
                    R_saved = R_iter + 1;
                    break;
                }
            }
            if (R_count < L_count) {
                break;
            }
            if (R_count > L_count) {
                total += current;
                console.log('a');
                console.log(current);
                break;
            }
            if (R_val < L_val) {
                break;
            }
            if (R_val > L_val) {
                total += current;
                console.log('b');
                console.log(current);
                break;
            }
            //console.log(L_saved);
            //console.log(R_saved);
        }
        current++;
    }
    return total;
}
var input = ingestFile();
console.log(findIndices(input));
