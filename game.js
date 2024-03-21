const checkerContainer = document.getElementById('checker_container');
const touchDisc = document.getElementById('click');
const cutDisc = document.getElementById('cutDisc');
const becomeKing = document.getElementById('king');
const turn1 = document.getElementById('turn1');
const turn2 = document.getElementById('turn2');
const player1Discs = document.getElementById('player1');
const player2Discs = document.getElementById('player2');
turn2.classList.add('turn');

const N = 8;

let gameStart = true;
let player1 = false;
let player2 = true;
let rotateDisc = null;
const firstPlayer = {
    discs: 12,
    wonCount: 0
}

const secondPlayer = {
    discs: 12,
    wonCount: 0
}
let currDisc = null;

function createBoard(N) {
    let isEven = false;
    const playerDiscColor = ['disc1', 'disc2'];
    // const subDisc = ['subDisc1','subDisc2'];
    // disc1 = black, disc2 = white;
    let index = 0;
    for (let i = 0; i < N; i++) {

        for (let j = 0; j < N; j++) {
            const span = document.createElement('span');
            let disc = undefined;
            span.id = `${i}${j}`;
            checkerContainer.appendChild(span);

            if (i === 3 || i === 4) {
                if (isEven && (j % 2) === 0)
                    span.classList.add('brown');
                else if (!isEven && (j % 2) !== 0)
                    span.classList.add('brown');
                else span.classList.add('white');
                continue;
            }
            if (isEven && (j % 2) === 0) {
                span.classList.add('brown');
                disc = document.createElement('span');
                span.appendChild(disc);
                disc.classList.add(playerDiscColor[index]);

            }
            else if (!isEven && (j % 2) !== 0) {
                span.classList.add('brown');
                disc = document.createElement('span');
                span.appendChild(disc);
                disc.classList.add(playerDiscColor[index]);


            }
            else span.classList.add('white');

            // Add the event on discs nodes.
            if (disc) {
                disc.addEventListener('click', (e) => {



                    if (e.target.classList[0] === 'disc1' && player1 && gameStart) { // black disc
                        const currNode = e.target.parentElement.id;
                        currDisc = e.target.parentElement;
                        let row = parseInt(currNode[0]);
                        let col = parseInt(currNode[1]);
                        touchDisc.play();
                        disc.classList.add('click_bounce');
                        cancleAnimation(disc, 'removeClass', 'click_bounce', 100);

                        removePreviousMarkedNodes();
                        markCurrParentSteps(row + 1, col - 1, col + 1);




                    } else if (e.target.classList[0] === 'disc2' && player2 && gameStart) { // white disc
                        const currNode = e.target.parentElement.id;
                        currDisc = e.target.parentElement;
                        let row = parseInt(currNode[0]);
                        let col = parseInt(currNode[1]);
                        touchDisc.play();

                        disc.classList.add('click_bounce');
                        cancleAnimation(disc, 'removeClass', 'click_bounce', 100);
                        removePreviousMarkedNodes();
                        markCurrParentSteps(row - 1, col - 1, col + 1);

                    } else if (e.target.classList[0] === 'king1' && player1 && gameStart) {
                        const currNode = e.target.parentElement.id;
                        currDisc = e.target.parentElement;
                        let row = parseInt(currNode[0]);
                        let col = parseInt(currNode[1]);
                        touchDisc.play();
                        disc.classList.add('click_bounce');
                        cancleAnimation(disc, 'removeClass', 'click_bounce', 100);

                        removePreviousMarkedNodes();
                        markKingSteps(row, col, 'king1');

                    } else if (e.target.classList[0] === 'king2' && player2 && gameStart) {
                        const currNode = e.target.parentElement.id;
                        currDisc = e.target.parentElement;
                        let row = parseInt(currNode[0]);
                        let col = parseInt(currNode[1]);
                        touchDisc.play();
                        disc.classList.add('click_bounce');
                        cancleAnimation(disc, 'removeClass', 'click_bounce', 100);

                        removePreviousMarkedNodes();
                        markKingSteps(row, col, 'king2');
                    }


                });
            }


        }
        if (i === 4) index = 1;
        isEven = !isEven;
    }
}

createBoard(N);

function removePreviousMarkedNodes() {
    let left = document.getElementById('left');
    let right = document.getElementById('right');
    let topLeft = document.getElementById('topLeft');
    let topRight = document.getElementById('topRight');
    let bottomLeft = document.getElementById('bottomLeft');
    let bottomRight = document.getElementById('bottomRight');


    if (left)
        left.parentElement.removeChild(left);
    if (right)
        right.parentElement.removeChild(right);
    if (topLeft)
        topLeft.parentElement.removeChild(topLeft);
    if (topRight)
        topRight.parentElement.removeChild(topRight);
    if (bottomLeft)
        bottomLeft.parentElement.removeChild(bottomLeft);
    if (bottomRight)
        bottomRight.parentElement.removeChild(bottomRight);

}

function markCurrParentSteps(row, left, right) {

    if (row >= 0 && row < N) {

        if (left >= 0) {
            const leftStep = document.getElementById(`${row}${left}`);
            const marker = document.createElement('span');

            marker.classList.add('marker');
            marker.id = 'left';
            marker.addEventListener('click', (e) => {

                const parent = e.target.parentElement; // span box
                parent.removeChild(e.target); // remove the marker disc.
                parent.appendChild(currDisc.children[0]); // append the cuting disc which cut the another disc.
                removePreviousMarkedNodes();

                if (parent.children[0].classList.contains('disc1')) {
                    if (row === N - 1) {
                        const whiteCrown = document.createElement('img');
                        whiteCrown.src = 'whiteCrown.jpg';
                        parent.children[0].appendChild(whiteCrown);
                        if (parent.children[0].classList.contains('disc1')) parent.children[0].classList.remove('disc1');
                        parent.children[0].classList.add('king1');
                        becomeKing.play();
                    }
                    player1 = false;
                    player2 = true;
                    turn1.classList.remove('turn');
                    turn2.classList.add('turn');
                    parent.children[0].classList.remove('turn');
                    if (rotateDisc && rotateDisc.classList.contains('rotate')) {
                        rotateDisc.classList.remove('rotate');

                    }

                } else {
                    if (row === 0) {
                        const blackCrown = document.createElement('img');
                        blackCrown.src = 'blackCrown.jpg';
                        parent.children[0].appendChild(blackCrown);

                        if (parent.children[0].classList.contains('disc2')) parent.children[0].classList.remove('disc2');
                        parent.children[0].classList.add('king2');

                        becomeKing.play();
                    }

                    player1 = true;
                    player2 = false;
                    turn2.classList?.remove('turn');
                    turn1.classList.add('turn');
                    if (rotateDisc && rotateDisc.classList.contains('rotate')) {
                        rotateDisc.classList.remove('rotate');

                    }

                }
                isGameWon();

            });

            // It checks only if disc can move ahead.
            if (leftStep.children[0] === undefined) {
                leftStep.appendChild(marker);
                visitedLeft = leftStep;

            } else if ((currDisc.children[0].classList.contains('disc1') || currDisc.children[0].classList.contains('king1')) &&
                leftStep.children[0].classList.contains('disc2') || leftStep.children[0].classList.contains('king2')) {
                // It checks if the disc can be cut of the opponent and mark the marker.
                validateCutDisc(row + 1, left - 1, leftStep, 'left');

            } else if ((currDisc.children[0].classList.contains('disc2') || currDisc.children[0].classList.contains('king2')) &&
                leftStep.children[0].classList.contains('disc1') || leftStep.children[0].classList.contains('king1')) {
                // It checks if the disc can be cut of the opponent and mark the marker.
                validateCutDisc(row - 1, left - 1, leftStep, 'left');




            }



        }
        if (right < N) {
            const rightStep = document.getElementById(`${row}${right}`);
            const marker = document.createElement('span');
            marker.classList.add('marker');
            marker.id = 'right';
            marker.addEventListener('click', (e) => {

                const parent = e.target.parentElement;
                parent.removeChild(e.target);
                parent.appendChild(currDisc.children[0]);
                removePreviousMarkedNodes();



                if (parent.children[0].classList.contains('disc1')) {
                    if (row === N - 1) {
                        const whiteCrown = document.createElement('img');
                        whiteCrown.src = 'whiteCrown.jpg';

                        parent.children[0].appendChild(whiteCrown);
                        becomeKing.play();
                        if (parent.children[0].classList.contains('disc1')) parent.children[0].classList.remove('disc1');
                        parent.children[0].classList.add('king1');
                    }

                    player1 = false;
                    player2 = true;
                    turn1.classList.remove('turn');
                    turn2.classList.add('turn');
                    if (rotateDisc && rotateDisc.classList.contains('rotate')) {
                        rotateDisc.classList.remove('rotate');

                    }

                } else {
                    if (row === 0) {
                        const blackCrown = document.createElement('img');
                        blackCrown.src = 'blackCrown.jpg';
                        parent.children[0].appendChild(blackCrown);
                        becomeKing.play();
                        if (parent.children[0].classList.contains('disc2')) parent.children[0].classList.remove('disc2');
                        parent.children[0].classList.add('king2');
                    }
                    player1 = true;
                    player2 = false;
                    turn2.classList?.remove('turn');
                    turn1.classList.add('turn');
                    if (rotateDisc && rotateDisc.classList.contains('rotate')) {
                        rotateDisc.classList.remove('rotate');

                    }
                    if (rotateDisc && rotateDisc.classList.contains('rotate')) {
                        rotateDisc.classList.remove('rotate');

                    }

                }

                isGameWon();

            });
            // It checks only if disc can move ahead.
            if (rightStep.children[0] === undefined) {
                rightStep.appendChild(marker);
                visitedRight = rightStep;

            } else if ((currDisc.children[0].classList.contains('disc1') || currDisc.children[0].classList.contains('king1')) &&
                rightStep.children[0].classList.contains('disc2') || rightStep.children[0].classList.contains('king2')) {
                // It checks if the disc can be cut of the opponent and mark the marker.
                validateCutDisc(row + 1, right + 1, rightStep, 'right');


            } else if ((currDisc.children[0].classList.contains('disc2') || currDisc.children[0].classList.contains('king2')) &&
                rightStep.children[0].classList.contains('disc1') || rightStep.children[0].classList.contains('king1')) {
                // It checks if the disc can be cut of the opponent and mark the marker.
                validateCutDisc(row - 1, right + 1, rightStep, 'right');

            }
        }
    }

}

// This function mark the marked disc for cut the opponent disc.
// It is used for cut the disc.
function validateCutDisc(row, col, cuttingDisc, side) {

    if (row >= 0 && row < N) {

        if (col >= 0 && col < N) {

            const jumpPlace = document.getElementById(`${row}${col}`);

            if (jumpPlace.children[0] === undefined) {

                const marker = document.createElement('span');
                marker.classList.add('marker');
                marker.id = side;
                marker.addEventListener('click', (e) => {

                    const parent = e.target.parentElement;
                    parent.appendChild(currDisc.children[0]);
                    parent.removeChild(e.target);
                    removePreviousMarkedNodes();

                    if (parent.children[0].classList.contains('disc1')) {
                        if (row === N - 1) {
                            const whiteCrown = document.createElement('img');
                            whiteCrown.src = 'whiteCrown.jpg';
                            parent.children[0].appendChild(whiteCrown);

                            if (parent.children[0].classList.contains('disc1')) parent.children[0].classList.remove('disc1');
                            parent.children[0].classList.add('king1');

                            becomeKing.play();
                        }
                        else cutDisc.play();
                        if (!checkMoreDiscCut(parent, 'disc1')) {

                            player1 = false;
                            player2 = true;
                            turn1.classList.remove('turn');
                            turn2.classList.add('turn');
                            if (parent.children[0].classList.contains('rotate')) {
                                parent.children[0].classList.remove('rotate');
                            }
                            if (rotateDisc && rotateDisc.classList.contains('rotate')) {
                                rotateDisc.classList.remove('rotate');

                            }
                        }
                    } else {
                        if (row === 0) {
                            const blackCrown = document.createElement('img');
                            blackCrown.src = 'blackCrown.jpg';
                            parent.children[0].appendChild(blackCrown);
                            if (parent.children[0].classList.contains('disc2')) parent.children[0].classList.remove('disc2');
                            parent.children[0].classList.add('king2');
                            becomeKing.play();

                        }
                        else cutDisc.play();
                        if (!checkMoreDiscCut(parent, 'disc2')) {
                            player1 = true;
                            player2 = false;
                            turn2.classList?.remove('turn');
                            turn1.classList.add('turn');
                            if (parent.children[0].classList.contains('rotate')) {
                                parent.children[0].classList.remove('rotate');
                            }
                            if (rotateDisc && rotateDisc.classList.contains('rotate')) {
                                rotateDisc.classList.remove('rotate');

                            }

                        }
                    }

                    const cutedDiscType = cuttingDisc.children[0].classList[0]; // disc1 || dics2;
                    if (cutedDiscType === 'disc1' || cutedDiscType === 'king1') {

                        decreasePlayerDiscs(1);

                    } else if (cutedDiscType === 'disc2' || cutedDiscType === 'king2') {
                        decreasePlayerDiscs(2);
                    }
                    cuttingDisc.removeChild(cuttingDisc.children[0]);

                    isGameWon();


                });

                jumpPlace.appendChild(marker);



            }
        }
    }
}

// This function check if a disc can cut another disc of opponent after cut one disc;
// return true and also set the rotate class of that disc.
function checkMoreDiscCut(parent, disc) {


    if (disc === 'disc1') {

        const row = parseInt(parent.id[0]);
        const col = parseInt(parent.id[1]);

        if (row + 1 < N) {

            if (col - 1 >= 0) {
                let newRow = row + 1;
                let newCol = col - 1;

                const leftStep = document.getElementById(`${newRow}${newCol}`).children[0];
                if (leftStep && (leftStep.classList.contains('disc2') || leftStep.classList.contains('king2'))) {
                    let newRow2 = newRow + 1;
                    let newCol2 = newCol - 1;
                    if (newRow2 < N && newCol2 >= 0) {
                        const nextLeftStep = document.getElementById(`${newRow2}${newCol2}`).children[0];
                        if (nextLeftStep === undefined) {
                            parent.children[0].classList.add('rotate');
                            rotateDisc = parent.children[0];
                            return true;
                        }
                    }
                }
            }

            if (col + 1 < N) {
                let newRow = row + 1;
                let newCol = col + 1;

                const rightStep = document.getElementById(`${newRow}${newCol}`).children[0];

                if (rightStep && (rightStep.classList.contains('disc2') || rightStep.classList.contains('king2'))) {
                    let newRow2 = newRow + 1;
                    let newCol2 = newCol + 1;

                    if (newRow2 < N && newCol2 < N) {
                        const nextRightStep = document.getElementById(`${newRow2}${newCol2}`).children[0];
                        if (nextRightStep === undefined) {
                            parent.children[0].classList.add('rotate');
                            rotateDisc = parent.children[0];
                            return true;
                        }
                    }
                }
            }
        }
    }
    else if (disc === 'disc2') {

        const row = parseInt(parent.id[0]);
        const col = parseInt(parent.id[1]);

        if (row - 1 >= 0) {

            if (col - 1 >= 0) {
                let newRow = row - 1;
                let newCol = col - 1;

                const leftStep = document.getElementById(`${newRow}${newCol}`).children[0];
                if (leftStep && (leftStep.classList.contains('disc1') || leftStep.classList.contains('king1'))) {
                    let newRow2 = newRow - 1;
                    let newCol2 = newCol - 1;
                    if (newRow2 >= 0 && newCol2 >= 0) {
                        const nextLeftStep = document.getElementById(`${newRow2}${newCol2}`).children[0];
                        if (nextLeftStep === undefined) {
                            parent.children[0].classList.add('rotate');
                            rotateDisc = parent.children[0];
                            return true;
                        }
                    }
                }
            }

            if (col + 1 < N) {
                let newRow = row - 1;
                let newCol = col + 1;

                const rightStep = document.getElementById(`${newRow}${newCol}`).children[0];

                if (rightStep && (rightStep.classList.contains('disc1') || rightStep.classList.contains('king1'))) {
                    let newRow2 = newRow - 1;
                    let newCol2 = newCol + 1;

                    if (newRow2 >= 0 && newCol2 < N) {
                        const nextRightStep = document.getElementById(`${newRow2}${newCol2}`).children[0];
                        if (nextRightStep === undefined) {
                            parent.children[0].classList.add('rotate');
                            rotateDisc = parent.children[0];
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
}

function isGameWon() {
    if (firstPlayer.discs === 0) {
        gameStart = false;
        alert('Player2 won');
    } else if (secondPlayer.discs === 0) {
        gameStart = false;
        alert('Player1 won');
    }
    const disc1 = [...document.getElementsByClassName('disc1')];
    const disc2 = [...document.getElementsByClassName('disc2')];
    const king1 = [...document.getElementsByClassName('king1')];
    const king2 = [...document.getElementsByClassName('king2')];

    let count1 = 0, count2 = 0;

    disc1.forEach(disc => {
        const row = parseInt(disc.parentElement.id[0]);
        const col = parseInt(disc.parentElement.id[1]);
        if (verifyDiscCanMove(row, col, 'disc1')) {
            count1++;
        }

    });

    king1.forEach(disc => {
        const row = parseInt(disc.parentElement.id[0]);
        const col = parseInt(disc.parentElement.id[1]);
        if (verifyDiscCanMove(row, col, 'king1')) {
            count1++;
        }
    })

    disc2.forEach(disc => {
        const row = parseInt(disc.parentElement.id[0]);
        const col = parseInt(disc.parentElement.id[1]);
        if (verifyDiscCanMove(row, col, 'disc2')) {
            count2++;
        }
    });

    king2.forEach(disc => {
        const row = parseInt(disc.parentElement.id[0]);
        const col = parseInt(disc.parentElement.id[1]);
        if (verifyDiscCanMove(row, col, 'king2')) {
            count2++;
        }
    })

    if (count1 === 0) {
        gameStart = false;
        alert("Player 2 won the game");
    } else if (count2 === 0) {
        gameStart = false;
        alert("Player 1 won the game");
    }
}


// It verifies if disc can move.
// Is there are possible way to move a disk.
function verifyDiscCanMove(row, col, type) {


    if (isSafe(row, col)) {

        if (type === 'disc1' || type === 'king1' || type === 'king2') {

            if (isSafe(row + 1, col - 1)) { // It checks for next row and left col =  left column.

                let nextRow = row + 1;
                let leftCol = col - 1;
                const leftStep = document.getElementById(`${nextRow}${leftCol}`).children[0];

                if (leftStep === undefined) {

                    return true;
                } else if (isSafe(nextRow + 1, leftCol - 1)) { // It checks for further row and further col -1 .
                    let finalRow = nextRow + 1;
                    let finalCol = leftCol - 1;
                    const finalLeftStep = document.getElementById(`${finalRow}${finalCol}`).children[0];
                    if (finalLeftStep === undefined) return true;
                    else return false;
                }

            }
            if (isSafe(row + 1, col + 1)) { // for right column. type = disc1;
                let nextRow = row + 1;
                let rightCol = col + 1;
                const rightStep = document.getElementById(`${nextRow}${rightCol}`).children[0];

                if (rightStep === undefined) {

                    return true;

                } else if (isSafe(nextRow + 1, rightCol + 1)) { // It checks for further row and further col -1 .

                    let finalRow = nextRow + 1;
                    let finalCol = rightCol + 1;
                    const finalRightStep = document.getElementById(`${finalRow}${finalCol}`).children[0];
                    if (finalRightStep === undefined) return true;
                    else return false;
                }
            }
        }
        if (type === 'disc2' || type === 'king1' || type === 'king2') {

            if (isSafe(row - 1, col - 1)) { // It checks for next row and left col.

                let nextRow = row - 1;
                let leftCol = col - 1;
                const leftStep = document.getElementById(`${nextRow}${leftCol}`).children[0];

                if (leftStep === undefined) {

                    return true;

                } else if (isSafe(nextRow - 1, leftCol - 1)) { // It checks for further row and further col -1 .

                    let finalRow = nextRow - 1;
                    let finalCol = leftCol - 1;
                    const finalLeftStep = document.getElementById(`${finalRow}${finalCol}`).children[0];

                    if (finalLeftStep === undefined) return true;
                    else return false;
                }

            }
            if (isSafe(row - 1, col + 1)) { // It checks for next row and left col.

                let nextRow = row - 1;
                let rightCol = col + 1;
                const rightStep = document.getElementById(`${nextRow}${rightCol}`).children[0];

                if (rightStep === undefined) {

                    return true;

                } else if (isSafe(nextRow - 1, rightCol + 1)) { // It checks for further row and further col -1 .

                    let finalRow = nextRow - 1;
                    let finalCol = rightCol + 1;

                    const finalRightStep = document.getElementById(`${finalRow}${finalCol}`).children[0];

                    if (finalRightStep === undefined) return true;
                    else return false;
                }

            }
        }
    }

    return false;

}

function isSafe(row, col) {
    if (row >= 0 && row < N && col >= 0 && col < N) return true;

    return false;
}


function cancleAnimation(target, action, classList = undefined, time) {
    if (action === 'removeClass' && classList) {
        setTimeout(() => {
            target.classList.remove(classList);
        }, time);
    }
}

function decreasePlayerDiscs(player) {

    if (player === 1) { // if first player
        const currCount = --player1Discs.textContent;
        player1Discs.textContent = currCount;
        firstPlayer.discs = currCount;
        cutDisc.play();
    } else if (player === 2) {
        const currCount = --player2Discs.textContent;
        player2Discs.textContent = currCount;
        secondPlayer.discs = currCount;
        cutDisc.play();
    }
}

// ############################## KING DISCS FUNCTIONS ########################################
// It marks the King disc steps.
// topLeft, topRight, bottomLeft, bottomRight;
function markKingSteps(row, col, disc) {
    if (isSafe(row, col)) {

        // topLeft column checking.
        if (isSafe(row - 1, col - 1)) {
            let topLeft = `${row - 1}${col - 1}`;
            const topLeftBox = document.getElementById(topLeft);

            if (topLeftBox.children[0] === undefined) { // if nextTopLeft column is empty;

                const marker = document.createElement('span');
                marker.classList.add('marker');
                marker.id = 'topLeft';
                topLeftBox.appendChild(marker);

                marker.addEventListener('click', (e) => {
                    const parent = e.target.parentElement;
                    parent.removeChild(e.target);
                    parent.appendChild(currDisc.children[0]);
                    removePreviousMarkedNodes();

                    // Changing the turn
                    if (disc === 'king1') {
                        player1 = false;
                        player2 = true;
                        turn1.classList.remove('turn');
                        turn2.classList.add('turn');
                    } else {
                        player1 = true;
                        player2 = false;
                        turn2.classList?.remove('turn');
                        turn1.classList.add('turn');
                    }

                });
            } else { // if it has a disc then.

                if (disc === 'king1') {// if curr disc which has to be move.

                    if (isSafe(row - 2, col - 2)) {
                        const finalTopLeft = `${row - 2}${col - 2}`;
                        const finalTopLeftBox = document.getElementById(finalTopLeft);

                        if (finalTopLeftBox.children[0] === undefined && (topLeftBox.children[0].classList.contains('disc2') ||
                            topLeftBox.children[0].classList.contains('king2'))) {

                            const marker = document.createElement('span');
                            marker.classList.add('marker');
                            marker.id = 'topLeft';
                            finalTopLeftBox.appendChild(marker);

                            marker.addEventListener('click', (e) => {
                                const parent = e.target.parentElement;
                                parent.removeChild(e.target);
                                parent.appendChild(currDisc.children[0]);
                                topLeftBox.removeChild(topLeftBox.children[0]);
                                decreasePlayerDiscs(2); // disc decrease by 1 of king2 || disc2.
                                removePreviousMarkedNodes();


                                if (!canKingDiscCutMore(parent, 'king1', 'disc2', 'king2')) {
                                    player1 = false;
                                    player2 = true;
                                    turn1.classList.remove('turn');
                                    turn2.classList.add('turn');
                                    if (parent.children[0].classList.contains('rotate'))
                                        parent.children[0].classList.remove('rotate');
                                    if (rotateDisc && rotateDisc.classList.contains('rotate'))
                                        rotateDisc.classList.remove('rotate')
                                } else {
                                    rotateDisc = e.target;
                                    e.target.classList.add('rotate');
                                    turn1.classList.add('turn');
                                    turn2.classList.remove('turn');


                                }

                                isGameWon();
                            });


                        }
                    }

                } else { // For king2 
                    if (isSafe(row - 2, col - 2)) {

                        const finalTopLeft = `${row - 2}${col - 2}`;
                        const finalTopLeftBox = document.getElementById(finalTopLeft);

                        if (finalTopLeftBox.children[0] === undefined && (topLeftBox.children[0].classList.contains('disc1') ||
                            topLeftBox.children[0].classList.contains('king1'))) {

                            const marker = document.createElement('span');
                            marker.classList.add('marker');
                            marker.id = 'topLeft';
                            finalTopLeftBox.appendChild(marker);

                            marker.addEventListener('click', (e) => {
                                const parent = e.target.parentElement;
                                parent.removeChild(e.target);
                                parent.appendChild(currDisc.children[0]);
                                topLeftBox.removeChild(topLeftBox.children[0]);
                                decreasePlayerDiscs(1);
                                removePreviousMarkedNodes();
                                if (!canKingDiscCutMore(parent, 'king2', 'disc1', 'king1')) {
                                    player1 = true;
                                    player2 = false;
                                    turn1.classList.add('turn');
                                    turn2.classList.remove('turn');

                                    if (parent.children[0].classList.contains('rotate'))
                                        parent.children[0].classList.remove('rotate');
                                    if (rotateDisc && rotateDisc.classList.contains('rotate'))
                                        rotateDisc.classList.remove('rotate')

                                } else {
                                    rotateDisc = e.target;
                                    e.target.classList.add('rotate');
                                    turn1.classList.remove('turn');
                                    turn2.classList.add('turn');

                                }

                                isGameWon();
                            });
                        }
                    }

                }
            }
        } // TopLeft column end here.

        // topRight column checking.
        if (isSafe(row - 1, col + 1)) {
            let topRight = `${row - 1}${col + 1}`;
            const topRightBox = document.getElementById(topRight);

            if (topRightBox.children[0] === undefined) { // if nextTopLeft column is empty;

                const marker = document.createElement('span');
                marker.classList.add('marker');
                marker.id = 'topRight';
                topRightBox.appendChild(marker);

                marker.addEventListener('click', (e) => {
                    const parent = e.target.parentElement;
                    parent.removeChild(e.target);
                    parent.appendChild(currDisc.children[0]);
                    removePreviousMarkedNodes();

                    // Changing the turn
                    if (disc === 'king1') {
                        player1 = false;
                        player2 = true;
                        turn1.classList.remove('turn');
                        turn2.classList.add('turn');
                    } else {
                        player1 = true;
                        player2 = false;
                        turn2.classList?.remove('turn');
                        turn1.classList.add('turn');
                    }

                });
            } else { // check topRight
                if (disc === 'king1') {
                    if (isSafe(row - 2, col + 2)) {
                        const finalTopRight = `${row - 2}${col + 2}`;
                        const finalTopRightBox = document.getElementById(finalTopRight);

                        if (finalTopRightBox.children[0] === undefined && (topRightBox.children[0].classList.contains('disc2') ||
                            topRightBox.children[0].classList.contains('king2'))) {

                            const marker = document.createElement('span');
                            marker.classList.add('marker');
                            marker.id = 'topRight';
                            finalTopRightBox.appendChild(marker);

                            marker.addEventListener('click', (e) => {
                                const parent = e.target.parentElement;
                                parent.removeChild(e.target);
                                parent.appendChild(currDisc.children[0]);
                                topRightBox.removeChild(topRightBox.children[0]);
                                decreasePlayerDiscs(2);
                                removePreviousMarkedNodes();
                                if (!canKingDiscCutMore(parent, 'king1', 'disc2', 'king2')) {
                                    player1 = false;
                                    player2 = true;

                                    turn1.classList.remove('turn');
                                    turn2.classList.add('turn');
                                    if (parent.children[0].classList.contains('rotate'))
                                        parent.children[0].classList.remove('rotate');
                                    if (rotateDisc && rotateDisc.classList.contains('rotate'))
                                        rotateDisc.classList.remove('rotate')

                                } else {
                                    rotateDisc = e.target;
                                    e.target.classList.add('rotate');
                                    turn1.classList.add('turn');
                                    turn2.classList.remove('turn');
                                }

                                isGameWon();
                            });
                        }
                    }
                } else { // topRight for king2.
                    if (isSafe(row - 2, col + 2)) {
                        const finalTopRight = `${row - 2}${col + 2}`;
                        const finalTopRightBox = document.getElementById(finalTopRight);

                        if (finalTopRightBox.children[0] === undefined && (topRightBox.children[0].classList.contains('disc1') ||
                            topRightBox.children[0].classList.contains('king1'))) {

                            const marker = document.createElement('span');
                            marker.classList.add('marker');
                            marker.id = 'topRight';
                            finalTopRightBox.appendChild(marker);

                            marker.addEventListener('click', (e) => {
                                const parent = e.target.parentElement;
                                parent.removeChild(e.target);
                                parent.appendChild(currDisc.children[0]);
                                topRightBox.removeChild(topRightBox.children[0]);
                                decreasePlayerDiscs(1);
                                removePreviousMarkedNodes();
                                if (!canKingDiscCutMore(parent, 'king2', 'disc1', 'king1')) {
                                    player1 = false;
                                    player2 = true;

                                    turn1.classList.add('turn');
                                    turn2.classList.remove('turn');
                                    if (parent.children[0].classList.contains('rotate'))
                                        parent.children[0].classList.remove('rotate');
                                    if (rotateDisc && rotateDisc.classList.contains('rotate'))
                                        rotateDisc.classList.remove('rotate')
                                } else {
                                    rotateDisc = e.target;
                                    e.target.classList.add('rotate');
                                    turn1.classList.remove('turn');
                                    turn2.classList.add('turn');
                                }
                                isGameWon();
                            });
                        }
                    }
                }
            }
        } // END topRight column here.

        // bottomLeft column checking.
        if (isSafe(row + 1, col - 1)) {
            let bottomLeft = `${row + 1}${col - 1}`;
            const bottomLeftBox = document.getElementById(bottomLeft);

            if (bottomLeftBox.children[0] === undefined) { // if nextTopLeft column is empty;

                const marker = document.createElement('span');
                marker.classList.add('marker');
                marker.id = 'bottomLeft';
                bottomLeftBox.appendChild(marker);

                marker.addEventListener('click', (e) => {
                    const parent = e.target.parentElement;
                    parent.removeChild(e.target);
                    parent.appendChild(currDisc.children[0]);
                    removePreviousMarkedNodes();

                    // Changing the turn
                    if (disc === 'king1') {
                        player1 = false;
                        player2 = true;
                        turn1.classList.remove('turn');
                        turn2.classList.add('turn');
                    } else {
                        player1 = true;
                        player2 = false;
                        turn2.classList?.remove('turn');
                        turn1.classList.add('turn');
                    }

                });
            } else { // check if bottomLeft is not undefined.
                if (disc === 'king1') {
                    if (isSafe(row + 2, col - 2)) {
                        const finalBottomLeft = `${row + 2}${col - 2}`;
                        const finalBottomLeftBox = document.getElementById(finalBottomLeft);

                        if (finalBottomLeftBox.children[0] === undefined && (bottomLeftBox.children[0].classList.contains('disc2') ||
                            bottomLeftBox.children[0].classList.contains('king2'))) {

                            const marker = document.createElement('span');
                            marker.classList.add('marker');
                            marker.id = 'bottomLeft';
                            finalBottomLeftBox.appendChild(marker);

                            marker.addEventListener('click', (e) => {
                                const parent = e.target.parentElement;
                                parent.removeChild(e.target);
                                parent.appendChild(currDisc.children[0]);
                                bottomLeftBox.removeChild(bottomLeftBox.children[0]);
                                decreasePlayerDiscs(2);
                                removePreviousMarkedNodes();
                                if (!canKingDiscCutMore(parent, 'king1', 'disc2', 'king2')) {
                                    player1 = false;
                                    player2 = true;

                                    turn1.classList.remove('turn');
                                    turn2.classList.add('turn');
                                    if (parent.children[0].classList.contains('rotate'))
                                        parent.children[0].classList.remove('rotate');
                                    if (rotateDisc && rotateDisc.classList.contains('rotate'))
                                        rotateDisc.classList.remove('rotate');

                                } else {
                                    rotateDisc = e.target;
                                    e.target.classList.add('rotate');
                                    turn1.classList.add('turn');
                                    turn2.classList.remove('turn');
                                }
                                isGameWon();
                            });
                        }
                    }
                } else {// disc king2.
                    if (isSafe(row + 2, col - 2)) {
                        const finalBottomLeft = `${row + 2}${col - 2}`;
                        const finalBottomLeftBox = document.getElementById(finalBottomLeft);

                        if (finalBottomLeftBox.children[0] === undefined && (bottomLeftBox.children[0].classList.contains('disc1') ||
                            bottomLeftBox.children[0].classList.contains('king1'))) {

                            const marker = document.createElement('span');
                            marker.classList.add('marker');
                            marker.id = 'bottomLeft';
                            finalBottomLeftBox.appendChild(marker);

                            marker.addEventListener('click', (e) => {
                                const parent = e.target.parentElement;
                                parent.removeChild(e.target);
                                parent.appendChild(currDisc.children[0]);
                                bottomLeftBox.removeChild(bottomLeftBox.children[0]);
                                decreasePlayerDiscs(1);
                                removePreviousMarkedNodes();
                                if (!canKingDiscCutMore(parent, 'king2', 'disc1', 'king1')) {
                                    player1 = true;
                                    player2 = false;

                                    turn1.classList.add('turn');
                                    turn2.classList.remove('turn');
                                    if (parent.children[0].classList.contains('rotate'))
                                        parent.children[0].classList.remove('rotate');
                                    if (rotateDisc && rotateDisc.classList.contains('rotate'))
                                        rotateDisc.classList.remove('rotate')

                                } else {
                                    rotateDisc = e.target;
                                    e.target.classList.add('rotate');
                                    turn1.classList.remove('turn');
                                    turn2.classList.add('turn');
                                }
                                isGameWon();
                            });
                        }
                    }

                }
            }
        } // END bottomLeft column is here..

        // bottomRight column checking.
        if (isSafe(row + 1, col + 1)) {
            let bottomRight = `${row + 1}${col + 1}`;
            const bottomRightBox = document.getElementById(bottomRight);

            if (bottomRightBox.children[0] === undefined) {

                const marker = document.createElement('span');
                marker.classList.add('marker');
                marker.id = 'bottomRight';
                bottomRightBox.appendChild(marker);

                marker.addEventListener('click', (e) => {
                    const parent = e.target.parentElement;
                    parent.removeChild(e.target);
                    parent.appendChild(currDisc.children[0]);
                    removePreviousMarkedNodes();

                    // Changing the turn
                    if (disc === 'king1') {
                        player1 = false;
                        player2 = true;
                        turn1.classList.remove('turn');
                        turn2.classList.add('turn');
                    } else {
                        player1 = true;
                        player2 = false;
                        turn2.classList?.remove('turn');
                        turn1.classList.add('turn');
                    }

                });
            } else {
                if (disc === 'king1') {
                    if (isSafe(row + 2, col + 2)) {
                        const finalBottomRight = `${row + 2}${col + 2}`;
                        const finalBottomRightBox = document.getElementById(finalBottomRight);

                        if (finalBottomRightBox.children[0] === undefined && (bottomRightBox.children[0].classList.contains('disc2') ||
                            bottomRightBox.children[0].classList.contains('king2'))) {

                            const marker = document.createElement('span');
                            marker.classList.add('marker');
                            marker.id = 'bottomRight';
                            finalBottomRightBox.appendChild(marker);

                            marker.addEventListener('click', (e) => {
                                const parent = e.target.parentElement;
                                parent.removeChild(e.target);
                                parent.appendChild(currDisc.children[0]);
                                bottomRightBox.removeChild(bottomRightBox.children[0]);
                                decreasePlayerDiscs(2);
                                removePreviousMarkedNodes();
                                if (!canKingDiscCutMore(parent, 'king1', 'disc2', 'king2')) {
                                    player1 = false;
                                    player2 = true;

                                    turn1.classList.remove('turn');
                                    turn2.classList.add('turn');
                                    if (parent.children[0].classList.contains('rotate'))
                                        parent.children[0].classList.remove('rotate');
                                    if (rotateDisc && rotateDisc.classList.contains('rotate'))
                                        rotateDisc.classList.remove('rotate')

                                } else {
                                    rotateDisc = e.target;
                                    e.target.classList.add('rotate');
                                    turn1.classList.add('turn');
                                    turn2.classList.remove('turn');
                                }
                                isGameWon();
                            });
                        }
                    }
                } else { // for king2.
                    if (isSafe(row + 2, col + 2)) {
                        const finalBottomRight = `${row + 2}${col + 2}`;
                        const finalBottomRightBox = document.getElementById(finalBottomRight);

                        if (finalBottomRightBox.children[0] === undefined && (bottomRightBox.children[0].classList.contains('disc1') ||
                            bottomRightBox.children[0].classList.contains('king1'))) {

                            const marker = document.createElement('span');
                            marker.classList.add('marker');
                            marker.id = 'bottomRight';
                            finalBottomRightBox.appendChild(marker);

                            marker.addEventListener('click', (e) => {
                                const parent = e.target.parentElement;
                                parent.removeChild(e.target);
                                parent.appendChild(currDisc.children[0]);
                                bottomRightBox.removeChild(bottomRightBox.children[0]);
                                decreasePlayerDiscs(1);
                                removePreviousMarkedNodes();
                                if (!canKingDiscCutMore(parent, 'king2', 'disc1', 'king1')) {
                                    player1 = true;
                                    player2 = false;

                                    turn1.classList.add('turn');
                                    turn2.classList.remove('turn');
                                    if (parent.children[0].classList.contains('rotate'))
                                        parent.children[0].classList.remove('rotate');
                                    if (rotateDisc && rotateDisc.classList.contains('rotate'))
                                        rotateDisc.classList.remove('rotate')

                                } else {
                                    rotateDisc = e.target;
                                    e.target.classList.add('rotate');
                                    turn1.classList.remove('turn');
                                    turn2.classList.add('turn');
                                }
                                isGameWon();
                            });
                        }
                    }
                }
            }
        }
    }
}


function canKingDiscCutMore(parent, discToMove, type1, type2) {
    //Current disc place row and col.
    const row = parseInt(parent.id[0]);
    const col = parseInt(parent.id[1]);

    //topLeft column checking
    if (isSafe(row - 1, col - 1)) {

        const topLeft = `${row - 1}${col - 1}`;
        const topLeftColumn = document.getElementById(topLeft).children[0];

        if (topLeftColumn && (topLeftColumn.classList.contains(type1) || topLeftColumn.classList.contains(type2))) {

            // Check for finalTopLeft column
            if (isSafe(row - 2, col - 2)) {
                const finalTopLeft = `${row - 2}${col - 2}`;
                const finalTopLeftColumn = document.getElementById(finalTopLeft);

                if (finalTopLeftColumn.children[0] === undefined) {

                    rotateDisc = parent.children[0];
                    rotateDisc.classList.add('rotate');
                    return true;
                }
                else return false;

            }
        }
    }

    //topRight column checking
    if (isSafe(row - 1, col + 1)) {

        const topRight = `${row - 1}${col + 1}`;
        const topRightColumn = document.getElementById(topRight).children[0];

        if (topRightColumn && (topRightColumn.classList.contains(type1) || topRightColumn.classList.contains(type2))) {
            if (isSafe(row - 2, col + 2)) {
                const finalTopRight = `${row - 2}${col + 2}`;
                const finalTopRightColumn = document.getElementById(finalTopRight).children[0];
                if (finalTopRightColumn === undefined) {

                    rotateDisc = parent.children[0];
                    rotateDisc.classList.add('rotate');
                    return true;
                }
                else return false;
            }
        }

    }

    //bottomLeft column checking..
    if (isSafe(row + 1, col - 1)) {

        const bottomLeft = `${row + 1}${col - 1}`;
        const bottomLeftColumn = document.getElementById(bottomLeft).children[0];

        if (bottomLeftColumn && (bottomLeftColumn.classList.contains(type1) || bottomLeftColumn.classList.contains(type2))) {

            if (isSafe(row + 2, col + 2)) {

                const finalBottomLeft = `${row + 2}${col - 2}`;
                const finalBottomLeftColumn = document.getElementById(finalBottomLeft).children[0];
                if (finalBottomLeftColumn === undefined) {

                    rotateDisc = parent.children[0];
                    rotateDisc.classList.add('rotate');
                    return true;
                }
                else return false;

            }
        }

    }

    //bottomRight column checking..
    if (isSafe(row + 1, col + 1)) {

        const bottomRight = `${row + 1}${col + 1}`;
        const bottomRightColumn = document.getElementById(bottomRight).children[0];

        if (bottomRightColumn && (bottomRightColumn.classList.contains(type1) || bottomRightColumn.classList.contains(type2))) {

            if (isSafe(row + 2, col + 2)) {

                const finalBottomRight = `${row + 2}${col + 2}`;
                const finalBottomRightColumn = document.getElementById(finalBottomRight).children[0];
                if (finalBottomRightColumn === undefined) {
                    rotateDisc = parent.children[0];
                    rotateDisc.classList.add('rotate');
                    return true;
                }
                else return false;

            }
        }

    }

    return false;

}