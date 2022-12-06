import * as fs from 'fs';


function ingestFile(): string {
    var total: number = 0;
    var input = fs.readFileSync(".\\input.txt", 'utf-8');
    return input;
}

function findMarker(input: string) {
    for ( var i = 0; i + 3 < input.length; i++) {
        if ( input[i] != input[i+1] && input[i] != input[i+2] && input[i] != input[i+3] && input[i+1] != input[i+2] && input[i+2] != input[i+3] && input[i+1] != input[i+3]){
            console.log("The Marker is after " + (i + 4) + " characters, with "+ input[i] + input[i+1] + input[i+2] + input[i+3]);
            break;
        }
    }
}


function findMessage(input: string): string {
    var current: string = "";
    var flag = false;
    for ( var i = 0; i < input.length; i++) {
        if (current.length != 14) {
            current = current.concat(input[i]);
        }
        else if ( current.length == 14 ){
            current = current.slice(1);
            current = current.concat(input[i]);
            console.log(current);
            for (var j = 0; j < current.length - 1 ; j++) {
                for (var k = j + 1; k < current.length; k++) {
                    if (current[j] == current[k]) {
                        flag = true;
                        break;
                    }
                    if (j == current.length - 2 && k == current.length - 1) {
                        console.log("The number of characters that need to be processed are: " + (i + 1));
                        return current;
                    }
                }
                if (flag) {
                    flag = !flag;
                    break;
                }
            }
        }
    }
    return "failure";
}

var input = ingestFile();
findMarker(input);
console.log(findMessage(input));