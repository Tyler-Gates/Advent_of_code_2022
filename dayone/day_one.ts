
import * as fs from 'fs';

function ingestFile(): number[] {
    var list: Array<number> = [];
    var temp: number = 0;
    var lines = fs.readFileSync(".\\input.txt", 'utf-8').split('\r\n');
    for( var i = 0; i < lines.length; i++) {
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

//this gets the location and the count of the calories of the largest calorie holding elf
function mostCaloriesLocator(input: number[]) {
    var high = 0;
    var position = 0;
    for (var i = 0; i < input.length; i++) {
       if (input[i] > high) {
            high = input[i];
            position = i;
        }
    }

    console.log("The elf with the most is " + (position+1) + " with a total of " + high + " calories!");
}


//Sorts the list of calories by elf, (this disrupts the natural order of the elves but that is unnecessary for the puzzle)
//logs the total of the top three calorie holding elves
function mostCaloriesTotal(input: number[]) {
    var sortedList: number[] = input.sort((n1,n2) => n2 - n1);
    console.log("The top three elves have " + (sortedList[0] + sortedList[1] + sortedList[2]) + " total calories!");
}


//execute functions
var ingested = ingestFile();
mostCaloriesLocator(ingested);
mostCaloriesTotal(ingested)

//in retrospect in the ingestFile method I could have sorted the array from the get go, so I can easily grab what I needed
//for both parts of the puzzle as the position wasn't necessary for either. 