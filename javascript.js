const boardContainer = document.querySelector(".container");
const buttons = document.querySelectorAll("button");
let winnerStatus = false;
let board;
let activePlayer;

// create a new board
function gameBoard() {
    const size = 3
    const board =[];
    const row =[];

    for(let i = 0; i < size; i++) {
    board[i] = [];
        for (let j = 0; j < size; j++){
            board[i].push(0);
        }
    }
    return board
};

//function to create a player
function createPlayer(player1 = "player1", player2 = "player2"){
    const players = [
        {
            name: player1,
            token: 1,
            mark: "X"
        },
        {
            name: player2,
            token: 2,
            mark: "O"
        }
    ]

    const getName = (i) => {return players[i].name};

    const getToken = (i) => {return players[i].token};

    return { players, getToken, getName}
};



//update players moves to the board
function playerMove(token, choice, board){
    if(board[choice[0]][choice[1]] === 0){
        board[choice[0]][choice[1]] = token;
    }
    return board   
}

//function to check for a winner

function checkForWinner(board) {
    for(let i = 0; i < board.length; i++){
        if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] != 0){
            return true;
        } else if(board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] != 0){
            return true;
        } 
    }
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] != 0){
            return true;
    } 
    if (board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[0][2] != 0){
        return true;
    } 
        
    return false;                  
}


//this function is responsible for changings turns and get which players has to play
function playersTurn(pl1, pl2){
    let activePlayer = pl1;
    let player1 = pl1;
    let player2 = pl2;
    
    const changeActivePlayer = () => {
        if(activePlayer === player1) {
            activePlayer = player2;
        }
        else {
            activePlayer = player1
        }
    }
    const getActivePlayer = () => {
        return activePlayer;
    };
    const resetPlayer = () => {
        activePlayer = pl1;
    }

    return {getActivePlayer, changeActivePlayer, resetPlayer}

}
// get the id of the button clicked and transform it to a cell array with values of row and column
function idToRowColumn(num) {
    let row = 0;
    let column = 0;
    let cell = [];
    if(num <= 2) {
        row = 0;
        column = num; 
    } else if (num <= 5){
        row = 1;
        column = num - 3;

    } else {
        row = 2;
        column = num - 6;
    }                             
    
    cell.push(row);
    cell.push(column);

    return cell;
}

// when game is over pop a message and reset game
function gameOver(player = "tie") {
    if(player != "tie"){
        alert(`${player} won`);
           
    } else {
        alert("game is a tie");
           
    }
    resetGame();
    
}

// check if a move is avaiable to prevent same spot placing this still has to be implemented better
function isMoveAvailable(board) {
    for (let i = 0; i < board.length; i++){
        if (board[i].includes(0)){
            return true;
        }
    }
}


function resetGame(){
    buttons.forEach((button) => {
        button.innerText = "";
    })
    winnerStatus = false;
    board = gameBoard();
    activePlayer.resetPlayer();

}

function gameControl() {
    board = gameBoard();
    const players = createPlayer();
    activePlayer = playersTurn(players.players[0], players.players[1]);

    function playGame(e) {
        if (winnerStatus || !isMoveAvailable(board)) {
            return; 
        }
        e.target.innerText = activePlayer.getActivePlayer().mark;

        let cell = idToRowColumn(parseInt(e.target.id));

        if (board[cell[0]][cell[1]] !== 0) {
            return; 
        }

        playerMove(activePlayer.getActivePlayer().token, cell, board);

        winnerStatus = checkForWinner(board);
        
        if (winnerStatus) {
            gameOver(activePlayer.getActivePlayer().name, board);
            resetGame();
        } else if (!isMoveAvailable(board)) {
            gameOver("tie", board);
            resetGame();
        } else {
            activePlayer.changeActivePlayer();
        }
    }

    // Attach event listeners to buttons
    buttons.forEach((button) => {
        button.addEventListener("click", playGame);
    });
}

gameControl()



