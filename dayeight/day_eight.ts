import * as fs from 'fs';


function ingestFile(): string[] {
    var total: number = 0;
    var input = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n/).filter(c => c);
    return input;
}

function findVisibleTrees(input: string[]) {
    var total = 0;
    var flag = false;
    //iterates top down
    for (var i = 1; i < input.length - 1; i++) {
        //iterates left to right
        for ( var j = 1; j < input[i].length - 1; j++) {
            //check up
            for (var k = i - 1; k >= 0; k--) {
                if (input[i][j] <= input[k][j]) {
                    break;
                }
                if (k == 0) {
                    total++;
                    flag = true;
                }
            }
            if (!flag) {
            //check down
                for (var k = i + 1; k < input.length; k++) {
                    if (input[i][j] <= input[k][j]) {
                        break;
                    }
                    if (k == input.length - 1) {
                        total++;
                        flag = true;
                    }
                }
            }
            if (!flag) {
            //check left
                for (var k = j - 1; k >= 0; k--) {
                    if (input[i][j] <= input[i][k]) {
                        break;
                    }
                    if (k == 0) {
                        total++;
                        flag = true;
                    }
                }
            }
            if (!flag) {
            //check right
                for (var k = j + 1; k < input[i].length; k++) {
                    if (input[i][j] <= input[i][k]) {
                        break;
                    }
                    if (k == input[i].length - 1) {
                        total++;
                        flag = true;
                    }
                }
            }
            if (flag) {
                flag = !flag;
            }
        }
    }
    total += ( 2 * input[0].length ) + ( 2 * input.length) - 4;
    console.log("The total number of visible trees is: " + total);

}

function findScenicScore(input: string[]) {
    var highest = 0;
    //iterates top down
    for (var i = 1; i < input.length - 1; i++) {
        //iterates left to right
        for ( var j = 1; j < input[i].length - 1; j++) {
            //check up
            var up = 0;
            for (var k = i - 1; k >= 0; k--) {
                up++;
                if (input[i][j] <= input[k][j]) {
                    break;
                }
            }
            //check down
            var down = 0;
            for (var k = i + 1; k < input.length; k++) {
                down++;
                if (input[i][j] <= input[k][j]) {
                    break;
                }
            }
            
            //check left
            var left = 0;
            for (var k = j - 1; k >= 0; k--) {
                left++;
                if (input[i][j] <= input[i][k]) {
                    break;
                }
            }
            
            //check right
            var right = 0;
            for (var k = j + 1; k < input[i].length; k++) {
                right++;
                if (input[i][j] <= input[i][k]) {
                    break;
                }
            }
            if (highest < (right * left * up * down)) {
                highest = (right * left * up * down);
            }
        }
    }
    console.log("The highest scenic score possible is: " + highest);
}


var input = ingestFile();
findVisibleTrees(input);
findScenicScore(input);