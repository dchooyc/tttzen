console.log("Hello this is a tic tac toe game\n");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var array = [];

rl.question("Player 1 please enter your name: ", function(player1) {
    rl.question("Player 2 please enter your name: ", function(player2) {
        rl.question("Choose a number from 3-9: ", function(number) {
        console.log(`${player1} you will be using the 'x'\n${player2} you will be using the 'o'\n`);
        console.log(`Your tic tac toe grid will be a ${number} by ${number}`);
        console.log(gridConstructor(number));
        rl.close();
        });
    });
});

function gridConstructor(gridLength) {   
    //Dash is the number of dashes needed
    var number = parseInt(gridLength, 10);
    var dash   = (number*5)-1;
    var dashString = "";

    //Create the number of dashes
    for (let i = 0; i<dash; i++) {
        dashString += "-";
    }

    //Push the number of positions into the array
    for (let i = 0; i<(number)*(number); i ++) {
        array.push(i+1);
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
            //If the number to insert into the grid is single digit add an extra space
            if ((array[j+(i*(number))]) < 10) {
            string += " ";
            }
            string += " " + array[j+(i*(number))] + " ";
        }
    }

    return string;
}

rl.on("close", function() {
    process.exit(0);
});