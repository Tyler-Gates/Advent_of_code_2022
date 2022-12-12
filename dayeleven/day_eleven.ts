import * as fs from 'fs';


function ingestFile(): string[] {
    var total: number = 0;
    var input = fs.readFileSync(".\\input.txt", 'utf-8').split(/\r\n/).filter(c => c);
    return input;
}

function calculateMonkeyBusiness(input: string[]) {
    var monkeyCounts: Array<number> = [];
    var monkeyHoldings: Array<Array<number>> = [];
    var monkeyFunctions: Array<Array<string>> = [];
    var monkeyTests: Array<Array<number>> = [];
    for (var i = 1; i < input.length; i += 6) {
        var startingItems = input[i].split(/ |,/).filter(c => c);
        var currentMonkeyHolding: Array<number> = [];
        for (var j = 2; j < startingItems.length;j++){
            currentMonkeyHolding.push(+startingItems[j]);
        }
        monkeyHoldings.push(currentMonkeyHolding);

        var currentMonkeyFunction: Array<string> = input[i+1].split(/ /).filter(c => c);
        monkeyFunctions.push(currentMonkeyFunction);

        monkeyCounts.push(0);

        var currMonkeytests: Array<number> = [];
        var currentMonkeyTest: Array<string> = input[i+2].split(/ /).filter(c => c); 
        var currentMonkeyTrue: Array<string> = input[i+3].split(/ /).filter(c => c); 
        var currentMonkeyFalse: Array<string> = input[i+4].split(/ /).filter(c => c); 
        currMonkeytests.push(+currentMonkeyTest[3]);
        currMonkeytests.push(+currentMonkeyTrue[5]);
        currMonkeytests.push(+currentMonkeyFalse[5]);
        monkeyTests.push(currMonkeytests);
    }

    for (var i = 0; i < 10000; i++) {
        for (var j = 0; j < monkeyCounts.length;j++) {
            while (monkeyHoldings[j].length != 0) {
                var temp = monkeyHoldings[j].shift();
                var current = temp;
                if (current != undefined)  {
                    if (monkeyFunctions[j][4] == "*") {
                        if(monkeyFunctions[j][5] != "old") {
                            current = current * +monkeyFunctions[j][5];
                        }
                        else{
                            current = current * current;
                        }
                    }
                    else {
                        if(monkeyFunctions[j][5] != "old") {
                            current = current + +monkeyFunctions[j][5];
                        }
                        else{
                            current = current + current;
                        }
                    }
                    
                    monkeyCounts[j]++;
                    var product = 1;
                    for (var g= 0; g < monkeyTests.length; g++){
                        product *= monkeyTests[g][0];
                    }
                    current %= product;

                    if ( current % monkeyTests[j][0] == 0) {
                        monkeyHoldings[monkeyTests[j][1]].push(current);
                    }
                    else {
                        monkeyHoldings[monkeyTests[j][2]].push(current);
                    }
                }
                else {
                    console.log("OMG");
                }
            }
        }
    }
    console.log(monkeyCounts);
}
var input = ingestFile();
calculateMonkeyBusiness(input);