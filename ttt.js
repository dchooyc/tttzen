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
        checkNumber(number);
    });
}

//Checks for proper input for grid size
//Grid can go more than 25 depending on screen size
function checkNumber(number) {
    if (isNaN(number)) {
        console.log("Please enter a number!!");
        receiveNumber();
    } else if (number < 3) {
        console.log("Please pick a number larger than 3!!!");
        receiveNumber();
    } else {
    useNumber(number);
    }
}

function useNumber(number) {
    console.log("Your tic tac toe grid will be a " + number + " by " + number);
    gridBy = parseInt(number, 10);
    maxTurns = gridBy * gridBy;
    populateArray(gridBy);
    populateCheckArray(gridBy);
    console.log(gridConstructor(gridBy));
    playerOneTurn();
}

//Give each column a number from 1-n
function findColumnCheckArray(position) {
    //Position%gridby will give you 1,...,n-1 then 0
    var c = position % gridBy;
    //I make it such that its 1-n
    if (c == 0) {
        c = gridBy;
    }
    return c;
}

//Find the position in checkArray and change it to the piece
function updateCheckArray(position, piece) {
    var row = Math.ceil(position/gridBy) - 1;
    var column = findColumnCheckArray(position) -1;

    checkArray[row][column] = piece;
}

//Check if the position in checkArray already has a piece
function testCheckArray(position) {
    var row = Math.ceil(position/gridBy) - 1;
    var column = findColumnCheckArray(position) -1;

    return (checkArray[row][column] == "x" || checkArray[row][column] == "o");
}

//Testing if position is valid
function testPosition(position, turnAgain, usePosition) {
    if (isNaN(position)) {
        console.log("Please enter a number!!");
        turnAgain();
    } else if (position < 1) {
        console.log("Please pick a valid position!");
        turnAgain();
    } else if (position > maxTurns) {
        console.log("Please pick a valid position!");
        turnAgain();
    } else if (testCheckArray(position)) {
        console.log("That position has already been taken!");
        turnAgain();
    } else {
        usePosition(position);
    }
}

function playerOneTurn() {
    //Testing here if previous player has already won
    checkWin(p2);
    rl.question(p1 + " please pick a position: ", function(position) {
        testPosition(position, playerOneTurn, playerOneUsePosition);
    });
}

function playerOneUsePosition(position) {
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
}

function playerTwoTurn() {
    checkWin(p1);
    rl.question(p2 + " please pick a position: ", function(position) {
        testPosition(position, playerTwoTurn, playerTwoUsePosition);
    });
}

function playerTwoUsePosition(position) {
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
}

//This array is just for display purposes
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

//Created this array for performing checking algorithms
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
    checkHorizontalWin(player, checkArray);
    checkVerticalWin(player);
    checkDiagonalWin(player, checkArray);
    checkOtherDiagonalWin(player);
    if (turn == maxTurns) {
        console.log("Game over, all positions filled!");
        rl.close();
    }
}

function checkHorizontalWin(player, array) {
    var chwArray = [];
    var superString = "";
    var regularExp = false;

    //First I combine each array into a string
    for (let i = 0; i < gridBy; i++) {
        var tempArray = array[i].join("");
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

//Preparing an array for checkHorizontalWin to do the same thing
function checkVerticalWin(player) {
    var cvwArray = [];

    for (let i = 0; i < gridBy; i++) {
        var tempArray = [];
        //Push each element from the i position in each array into tempArray
        for (let j = 0; j < gridBy; j++) {
            tempArray.push(checkArray[j][i]);
        }
        cvwArray.push(tempArray);
    }
    checkHorizontalWin(player, cvwArray);
}

function checkDiagonalWin(player, array) {
    var cdwArray = [];
    var newArray = [];
    var superString = "";
    var regularExp = false;

    //This takes the 45 degrees to the right arrays
    //For the bigger half of a triangle
    for (let i = 0; i < gridBy; i++) {
        var tempArray = [];
        for (let j = 0; j <= i; j++) {
            tempArray.push(array[j][i-j]);
        }
        cdwArray.push(tempArray);
    }

    //This takes the lower half
    for (let i = 1; i < gridBy; i ++) {
        var tempArray = [];
        let k = i;
        for (let j = gridBy-1; j >= i; j--) {
            tempArray.push(array[k][j]);
            k++;
        }
        cdwArray.push(tempArray);
    }

    //This joins the arrays like the horizontal check
    for (let i = 0; i < cdwArray.length; i ++) {
        var tempArray = cdwArray[i].join("");
        newArray.push(tempArray);
    }

    superString = newArray.join("n");
    regularExp = /(x{3,3})|(o{3,3})/.test(superString);

    if (regularExp) {
        win(player);
    }
}

//This flips the values as if by 90 degrees to the right
//Then checks for diagonal win
function checkOtherDiagonalWin(player) {
    var codwArray = [];

    for (let i = 0; i < gridBy; i++) {
        var tempArray = [];
        for (let j = gridBy; j > 0; j--) {
            tempArray.push(checkArray[j-1][i]);
        }
        codwArray.push(tempArray);
    }
    checkDiagonalWin(player, codwArray);
}