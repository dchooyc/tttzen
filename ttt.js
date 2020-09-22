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

        var number = parseInt(`${number}`, 10);

        for (i = 0; i<(number)*(number); i ++) {
            array.push((i+1).toString());
        }
        
        var string = "";

        for (i = 0; i<(number); i++) {
            if (i > 0) {
                string += "\n-----------\n";
            }
            for (j = 0; j<(number); j++) {
                if (j > 0) {
                    string += "|";
                }
                string += " " + array[j+(i*(number))] + " ";
            }
        }

        console.log(string);

        console.log(array);
        rl.close();
        });
    });
});



rl.on("close", function() {
    process.exit(0);
});