array = [];

populateArray(5);
console.log(array);
// checkDiagonalWin(6, array);
checkOtherDiagonalWin(5, array);

function populateArray(number) {
    counter = 1;
    for (let i = 0; i < number; i++) {
        var tempArray = [];
        for (let j = 0; j < number; j++) {
            tempArray.push(counter);
            counter++;
        }
        array.push(tempArray);
    }
}

function checkOtherDiagonalWin(n, array) {
    var codwArray = [];

    for (let i = 0; i < n; i++) {
        var tempArray = [];
        for (let j = n; j > 0; j--) {
            tempArray.push(array[j-1][i]);
        }
        codwArray.push(tempArray);
    }
    console.log(codwArray);
}

// function checkDiagonalWin(n, array) {
//     var cdwArray = [];
//     for (let i = 0; i < n; i++) {
//         var tempArray = [];
//         for (let j = 0; j <= i; j++) {
//             tempArray.push(array[j][i-j]);
//         }
//         cdwArray.push(tempArray);
//     }
//     for (let i = 1; i < n; i ++) {
//         var tempArray = [];
//         let k = i;
//         for (let j = n-1; j >= i; j--) {
//             tempArray.push(array[k][j]);
//             k++;
//         }
//         cdwArray.push(tempArray);
//     }
//     console.log(cdwArray);
// }