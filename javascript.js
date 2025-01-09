const boardContainer = document.querySelector(".board");
const buttons = document.querySelectorAll(".cell");
const playButton = document.querySelector(".play");
const firstPlayerScore = document.querySelector("#player1");
const secondPlayerScore = document.querySelector("#player2");
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
            mark: "X",
            score: 0
        },
        {
            name: player2,
            token: 2,
            mark: "O",
            score: 0
        }
    ]



    return { players }
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
    const player1 = pl1;
    const player2 = pl2;
    
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
    const incrementScore = () => {
        activePlayer.score++
    }

    return {getActivePlayer, changeActivePlayer, resetPlayer, incrementScore}

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
function roundOver(player, players) {
    if (player === "tie") {
        alert("game is a tie");
        
    } else {
        alert(`${player.getActivePlayer().name} won`);
        if (player.getActivePlayer().name === players.players[0].name){
            console.log("test")
            firstPlayerScore.innerText = `Player 1 score: ${players.players[0].score}`
        } else {
            secondPlayerScore.innerText = `Player 2 score: ${players.players[1].score}`
        }
        if (player.getActivePlayer().score === 3){
            resetGame();
            winnerStatus = true;
            gameEnd(players);
            return;
        }
        
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
    activePlayer.changeActivePlayer();
     
}

function gameEnd(players) {
    players.players[0].score = 0;
    players.players[1].score = 0;
    firstPlayerScore.innerText = `Player 1 score: 0`;
    secondPlayerScore.innerText = `Player 2 score: 0`;
 

}

function gameControl() {
    if (winnerStatus) {
        resetGame();
        return;
    }
    board = gameBoard();
    const players = createPlayer();
    activePlayer = playersTurn(players.players[0], players.players[1]);
    let status = false;
    

    function playGame(e) {
        if (winnerStatus || !isMoveAvailable(board)) {
            return; 
        }

        let cell = idToRowColumn(parseInt(e.target.id));

        if (board[cell[0]][cell[1]] !== 0) {
            console.log(board)
            return; 
        }
        e.target.innerText = activePlayer.getActivePlayer().mark;

        

        playerMove(activePlayer.getActivePlayer().token, cell, board);

        winnerStatus = checkForWinner(board);
        
        if (winnerStatus) {
            activePlayer.incrementScore();
            status = roundOver(activePlayer, players);
        } else if (!isMoveAvailable(board)) {
            roundOver("tie", activePlayer); 
        } else {
            
            activePlayer.changeActivePlayer(); 
        }
       
    }
    

    buttons.forEach((button) => {
        button.addEventListener("click", playGame);
    });
}

playButton.addEventListener("click", gameControl);




