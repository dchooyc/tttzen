const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var array = [];
var checkArray = [];
var gridBy = 0;
var turn = 0;
var maxTurns = 0;
var p1 = "";
var p2 = "";

main();

function main(){
    console.log("Hello this is a tic tac toe game\n");
    receiveNames();
}

function receiveNames() {
    rl.question("Player 1 please enter your name: ", function(player1) {
        rl.question("Player 2 please enter your name: ", function(player2) {
            p1 = player1;
            p2 = player2;
            console.log(`${player1} you will be using the 'x'\n${player2} you will be using the 'o'\n`);
            receiveNumber();
        });
    });
}

function receiveNumber() {
    rl.question("Choose a number from 3-25: ", function(number) {
        console.log("Your tic tac toe grid will be a " + number + " by " + number);
        gridBy = parseInt(number, 10);
        maxTurns = gridBy * gridBy;
        populateArray(gridBy);
        populateCheckArray(gridBy);
        console.log(gridConstructor(gridBy));
        playerOneTurn();
    });
}

//Give each column a number from 1-n
function updateColumnCheckArray(position) {
    //Position%gridby will give you 1,...,n-1 then 0
    var c = position % gridBy;
    //I make it such that its 1-n
    if (c == 0) {
        c = gridBy;
    }
    return c;
}

function updateCheckArray(position, piece) {
    var row = Math.ceil(position/gridBy) - 1;
    var column = updateColumnCheckArray(position) -1;

    checkArray[row][column] = piece;
}

function playerOneTurn() {
    //Testing here if previous player has already won
    checkWin(p2);
    rl.question(p1 + " please pick a position: ", function(position) {
        var xPos = parseInt(position, 10);
        var text = "";
        if (gridBy > 9) {
            text += " ";
        }
        array[xPos-1] = text + " x";
        updateCheckArray(xPos, "x");
        console.log(gridConstructor(gridBy));
        turn ++;
        playerTwoTurn();
    });
}

function playerTwoTurn() {
    checkWin(p1);
    rl.question(p2 + " please pick a position: ", function(position) {
        var oPos = parseInt(position, 10);
        var text = "";
        if (gridBy > 9) {
            text += " ";
        }
        array[oPos-1] = text + " o";
        updateCheckArray(oPos, "o");
        console.log(gridConstructor(gridBy));
        turn ++;
        playerOneTurn();
    });
}

function turnsOver() {
    console.log("All turns used up, game over!");
    rl.close();
}

function populateArray(number) {
    //Push the number of positions into the array
    for (let i = 0; i<(number)*(number); i ++) {
        arrayInput = "";
        numberInput = i + 1;
        if (i < 9) {
            arrayInput += " ";
        }
        //If displaying three digit numbers add an extra space for two digit numbers
        if (number > 9) {
            if (i < 99) {
                arrayInput += " ";
            }
        }
        //Can only do this in js I think
        arrayInput += numberInput;
        array.push(arrayInput);
    }
}

function populateCheckArray(number) {
    for (let i = 0; i < number; i++) {
        var tempArray = [];
        for (let j = 0; j < number; j++) {
            tempArray.push("n");
        }
        checkArray.push(tempArray);
    }
}

//To add extra dash when displaying 3 digits
function dashPerNum(number) {
    var dpn = 5;
    if (number > 9) {
        dpn ++;
    }
    return dpn;
}

function gridConstructor(number) {   
    //Dash is the number of dashes needed
    var dpn = dashPerNum(number);
    var dash   = (number*dpn)-1;
    var dashString = "";

    //Create the number of dashes
    for (let i = 0; i<dash; i++) {
        dashString += "-";
    }

    var string = "";

    //Create the grid
    for (let i = 0; i<(number); i++) {
        //Only first line doesn't have dotted dashes above it
        if (i > 0) {
            string += "\n" + dashString + "\n";
        }
        for (let j = 0; j<(number); j++) {
            //Only the first digit doesn't have a | before it
            if (j > 0) {
                string += "|";
            }
            string += " " + array[j+(i*(number))] + " ";
        }
    }

    return string;
}

rl.on("close", function() {
    process.exit(0);
});

function win(player) {
    console.log(player + " has won the game!");
    rl.close();
}

function checkWin(player) {
    checkHorizontalWin(player);
    if (turn == maxTurns) {
        console.log("Game over, all positions filled!");
        rl.close();
    }
}

function checkHorizontalWin(player) {
    var chwArray = [];
    var superString = "";
    var regularExp = false;

    //First I combine each array into a string
    for (i = 0; i < gridBy; i++) {
        var tempArray = checkArray[i].join("");
        chwArray.push(tempArray);
    }

    //Then all the arrays are converted into a string seperated by n
    //Then tested as a regular expression for a consecutive x or o
    superString = chwArray.join("n");
    regularExp = /(x{3,3})|(o{3,3})/.test(superString);

    if (regularExp) {
        win(player);
    }
}