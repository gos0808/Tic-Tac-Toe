function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverelement.firstElementChild.innerHTML = 
    'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverelement.style.display = 'none';

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {  
        for (let j = 0; j<3; j++) { //looping gameData to reset it to 0
            gameData[i][j] = 0;
            const gameBoardItemElement = gameFieldElements[gameBoardIndex];
            gameBoardItemElement.textContent = '';
            gameBoardItemElement.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
if (players[0].name === '' || players[1].name === '') {
    alert('Please, set player names for both players!');
    return;
}

    resetGameStatus();

    gameAreaElement.style.display = 'block';

    activePlayerNameElement.textContent = players[activePlayer].name;
}



function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}



function selectGameField(event) {
    if (gameIsOver === true) {
        return;
    }

    const selectedColumn = event.target.dataset.col - 1;
    const selectedRow = event.target.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('Please, select an empty field!');
        return;
    }

    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled'); 

   

    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    const winnerId = checkForGameOver();

    if (winnerId !== 0) {
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}



function checkForGameOver() {
    //checking the rows in the tic tac toe
    for (let i = 0; i < 3; i++) {
        if(
            gameData[i][0] >0 && 
            gameData[i][0] === gameData[i][1] && 
            gameData[i][1] === gameData[i][2]
            ){
            return gameData[i][0];
        }
    }

    //checking the columns in the tic tac toe
    for (let i = 0; i < 3; i++) {
        if(
            gameData[0][i] >0 && 
            gameData[0][i] === gameData[1][i] && 
            gameData[0][i] === gameData[2][i]
            ){
            return gameData[0][i];
        }
    }

    //checking the diagonal: top left to bottom right, in the tic tac toe
    if(
        gameData[0][0] >0 && 
        gameData[0][0] === gameData[1][1] && 
        gameData[1][1] === gameData[2][2]
        ){
        return gameData[0][0];
    }

    //checking the diagonal: top right to bottom left, in the tic tac toe
    if(
        gameData[2][0] >0 && 
        gameData[2][0] === gameData[1][1] && 
        gameData[1][1] === gameData[0][2]
        ){
        return gameData[2][0];
    }

    if(currentRound === 9) {
        return - 1; // value for a draw
    }

    return 0; //still have a round left and don`t have a winner yet
}

function endGame(winnerId) {
    gameIsOver = true;
    gameOverelement.style.display = 'block';

    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverelement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverelement.firstElementChild.textContent = 'It`s a draw';
    }
 
}