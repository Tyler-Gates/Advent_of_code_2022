import * as fs from 'fs';


function ingestFile(): string[] {
    var total: number = 0;
    var lines = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n|,|-/).filter(c => c);
    return lines;
}

function getPairInsideAnotherCount(input: string[]) {
    var count = 0;
    for (var i = 0; i < input.length; i = i+4) {
        var x1 = +input[i];
        var y1 = +input[i+1];
        var x2 = +input[i+2];
        var y2 = +input[i+3];
        if ( x1 <= x2 && y1 >= y2 ) {
            count++;
        }
        else if ( x1 >= x2 && y1 <= y2 ) {
            count++;
        }
    }

    console.log("The number of pairs inside another pair is: " + count);
}

function getOverlapCount(input: string[]) {
    var count = 0;
    for (var i = 0; i < input.length; i = i+4) {
        var x1 = +input[i];
        var y1 = +input[i+1];
        var x2 = +input[i+2];
        var y2 = +input[i+3];
        if ( (y1 >= x2 && y2 >=y1) || (y2 >= x1 && x2 <= x1) ) {
            count++;
        }
        else if ( (x1 <= x2 && y1 >= y2) || (x1 >= x2 && y1 <= y2)) {
            count++;
        }
    }
    console.log("The overlap count is: " + count);
}

var input = ingestFile();
console.log(input);
getPairInsideAnotherCount(input);
getOverlapCount(input);