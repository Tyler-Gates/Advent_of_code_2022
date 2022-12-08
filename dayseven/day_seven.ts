import * as fs from 'fs';


function ingestFile(): string[] {
    var total: number = 0;
    var input = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n/).filter(c => c);
    return input;
}


//when going up a level, check current directories value and add to total if less thank 100k
//add value from inner directory to total for current level

// create an array that stores based on directory levels.
// when running ls on every level, create a counter for every dir, and only add to total when you have iterated through every dir for a given level
// as you add up into previous levels and remove the deeper levels add to total if less than 100k
// continue until you reach the end.
function gatherDirectories(input: string[]) {
    var total = 0;
    var dirCount = 0;
    var currentLevelSize = 0;
    var levelHolder: Array<number> = [];
    var directoryCountPerLevel: Array<number> = [];
    var flag = false;
    for (var i = 0; i < input.length; i++) {
        var command = input[i].split(' ').filter(c => c);
        console.log(command);
        if (command[0] == '$') {
            if (command[1] == "cd") {
                if (command[2] == "..") {
                    var currLevelValue = levelHolder.pop();
                    var currDirectoriesLeft = directoryCountPerLevel.pop();
                    if (currLevelValue !== undefined && currDirectoriesLeft !== undefined) {
                        if( currentLevelSize <= 100000 && !flag){
                            total += currentLevelSize;
                            console.log("added:" + currentLevelSize+ " to total: " + total);
                            flag = true;
                        }
                        console.log(".. currentLevelValue: " + currLevelValue + " + currentLevelSize: " + currentLevelSize + " = " + (currentLevelSize + currLevelValue));
                        currentLevelSize += currLevelValue;
                        currDirectoriesLeft -= 1;
                        if (currDirectoriesLeft == 0) {
                            if (currentLevelSize <= 100000) {
                                total += currentLevelSize;
                                console.log("added:" + currentLevelSize+ " to total: " + total);
                            }
                        }
                        else {
                            dirCount = currDirectoriesLeft;
                        }
                    }
                }
                else {
                    levelHolder.push(currentLevelSize);
                    currentLevelSize = 0;
                    directoryCountPerLevel.push(dirCount);
                    dirCount = 0;
                    console.log(levelHolder);
                    console.log(directoryCountPerLevel);
                    flag = false;
                }
            }
        }
        else if (command[0] == "dir") {
            dirCount++;
            console.log("dirCount++: " + dirCount);
            flag = false;
        }
        else {
            var command = input[i].split(' ').filter(c => c);
            currentLevelSize += +command[0];
            console.log("added to currentLevelSize: " + +command[0] + " total: "+ currentLevelSize);
            flag = false;
        }
        if (i == input.length - 1) {
            levelHolder.push(currentLevelSize);
        }
    }
    for (var i = levelHolder.length - 1; i >= 0; i--){
        if (levelHolder[i] <= 100000) {
            total += levelHolder[i];
            if ( i != 0) {
                levelHolder[i-1] += levelHolder[i];
            }
        }
        else {
            break;
        }
    }
    console.log("The total is: " + total);
}

function gatherRootSize(input: string[]) {
    var total = 0;
    for (var i = 0; i < input.length; i++) {
        var command = input[i].split(' ').filter(c => c);
        console.log(command);
        if (command[0] != "dir" && command[0] != '$') {
            total += +command[0];
        }
    }
    console.log("total is: " + total);
}

function gatherDirectoriesPartTwo(input: string[]) {
    var total = 0;
    var dirCount = 0;
    var currentLevelSize = 0;
    var levelHolder: Array<number> = [];
    var directoryCountPerLevel: Array<number> = [];
    var list: Array<number> = [];
    var flag = false;
    for (var i = 0; i < input.length; i++) {
        var command = input[i].split(' ').filter(c => c);
        console.log(command);
        if (command[0] == '$') {
            if (command[1] == "cd") {
                if (command[2] == "..") {
                    var currLevelValue = levelHolder.pop();
                    var currDirectoriesLeft = directoryCountPerLevel.pop();
                    if (currLevelValue !== undefined && currDirectoriesLeft !== undefined) {
                        if( currentLevelSize >= 4965705 && !flag){
                            list.push(currentLevelSize);
                            flag = true;
                        }
                        console.log(".. currentLevelValue: " + currLevelValue + " + currentLevelSize: " + currentLevelSize + " = " + (currentLevelSize + currLevelValue));
                        currentLevelSize += currLevelValue;
                        currDirectoriesLeft -= 1;
                        if (currDirectoriesLeft == 0) {
                            if (currentLevelSize >= 4965705) {
                                list.push(currentLevelSize);
                            }
                        }
                        else {
                            dirCount = currDirectoriesLeft;
                        }
                    }
                }
                else {
                    levelHolder.push(currentLevelSize);
                    currentLevelSize = 0;
                    directoryCountPerLevel.push(dirCount);
                    dirCount = 0;
                    console.log(levelHolder);
                    console.log(directoryCountPerLevel);
                    flag = false;
                }
            }
        }
        else if (command[0] == "dir") {
            dirCount++;
            console.log("dirCount++: " + dirCount);
            flag = false;
        }
        else {
            var command = input[i].split(' ').filter(c => c);
            currentLevelSize += +command[0];
            console.log("added to currentLevelSize: " + +command[0] + " total: "+ currentLevelSize);
            flag = false;
        }
        if (i == input.length - 1) {
            levelHolder.push(currentLevelSize);
        }
    }
    for (var i = levelHolder.length - 1; i >= 0; i--){
        if (levelHolder[i] >= 4965705) {
            list.push(currentLevelSize);
            if ( i != 0) {
                levelHolder[i-1] += levelHolder[i];
            }
        }
        else {
            break;
        }
    }
    list.sort((n1,n2) => n1 - n2)
    console.log("The total is: " + list[0]);
}

var input = ingestFile();
gatherDirectories(input);
gatherRootSize(input);
gatherDirectoriesPartTwo(input);