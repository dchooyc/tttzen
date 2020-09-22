const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var array = [];
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
    rl.question("Choose a number from 3-9: ", function(number) {
        console.log(`Your tic tac toe grid will be a ${number} by ${number}`);
        gridBy = parseInt(number, 10);
        maxTurns = gridBy * gridBy;
        populateArray(gridBy);
        console.log(gridConstructor(gridBy));
        playerOneTurn();
    });
}

function playerOneTurn() {
    if (turn == maxTurns) {
        turnsOver();
    }
    rl.question(p1 + " please pick a position: ", function(position) {
        var xPos = parseInt(position, 10) - 1;
        array[xPos] = " x";
        console.log(gridConstructor(gridBy));
        turn ++;
        playerTwoTurn();
    });
}

function playerTwoTurn() {
    if (turn == maxTurns) {
        turnsOver();
    }
    rl.question(p2 + " please pick a position: ", function(position) {
        var oPos = parseInt(position, 10) - 1;
        array[oPos] = " o";
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
        arrayInput ="";
        numberInput = i + 1;
        if (i < 9) {
            arrayInput += " ";
        }
        //Can only do this in js I think
        arrayInput += numberInput;
        array.push(arrayInput);
    }
}

function gridConstructor(number) {   
    //Dash is the number of dashes needed
    var dash   = (number*5)-1;
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