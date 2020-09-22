console.log("Hello this is a tic tac toe game\n");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var array = [];
var gridBy = 0;

rl.question("Player 1 please enter your name: ", function(player1) {
    rl.question("Player 2 please enter your name: ", function(player2) {
        rl.question("Choose a number from 3-9: ", function(number) {
        console.log(`${player1} you will be using the 'x'\n${player2} you will be using the 'o'\n`);
        console.log(`Your tic tac toe grid will be a ${number} by ${number}`);
        gridBy = parseInt(number, 10);
        populateArray(gridBy);
        console.log(gridConstructor(gridBy));
        playerOneTurn();
        });
    });
});

function playerOneTurn() {
    rl.question("Player 1 please pick a position: ", function(position) {
        var xPos = parseInt(position, 10) - 1;
        array[xPos] = " x";
        console.log(gridConstructor(gridBy));
        rl.close();
    });
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