import * as fs from 'fs';


function ingestFile(): string[] {
    var total: number = 0;
    var lines = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n/).filter(c => c);
    return lines;
}

function getTotal(input: string[]) {
    var total = 0;
    var flag = false;
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < input[i].length/2; j++){
            for (var k = input[i].length/2; k < input[i].length; k++) {
                if (input[i][j] === input[i][k]) {
                    if(input[i][k] === input[i][k].toUpperCase()){
                        total += input[i].charCodeAt(k) - 38;
                        flag = true;
                    }
                    else {
                        total += input[i].charCodeAt(k) - 96;
                        flag = true;
                    }
                    break;
                }
            }
            if (flag) {
                flag = !flag;
                break;
            }
        }
    }
    console.log("PART 1: The sum of the priorities of these items is: " + total);

}

function getTotalforThreeElves(input: string[]) {
    var total = 0;
    var flag = false;
    for (var i = 0; i < input.length; i = i + 3) {
        for (var j = 0; j < input[i].length; j++){
            for (var k = 0; k < input[i+1].length; k++) {
                if (input[i][j] === input[i+1][k]) {
                    for (var f = 0; f < input[i+2].length; f++) {
                        if (input[i][j] === input[i+2][f]) {
                            if(input[i][j] === input[i][j].toUpperCase()){
                                total += input[i].charCodeAt(j) - 38;
                                flag = true;
                            }
                            else {
                                total += input[i].charCodeAt(j) - 96;
                                flag = true;
                            }
                            break;
                        }
                    }
                }
                if (flag) {
                    break;
                }
            }
            if (flag) {
                flag = !flag;
                break;
            }
        }
    }
    console.log("PART 2: The sum of the priorities of these items is: " + total);

}


var input = ingestFile();
getTotal(input);
getTotalforThreeElves(input)