// first create the board. it is a 3x3 cells, each cell hast a row number and a column number

const boardContainer = document.querySelector(".container");
const buttons = document.querySelectorAll("button");

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

// function to create a player
function createPlayer(player1 = "player1", player2 = "player2"){
    const players = [
        {
            name: player1,
            token: "X"
        },
        {
            name: player2,
            token: "O"
        }
    ]

    const getName = (i) => {return players[i].name};

    const getToken = (i) => {return players[i].token};

    return { players, getToken, getName}
};



// update players moves to the board
function playerMove(token, choice, board){
    if(board[choice[0]][choice[1]] === 0){
        board[choice[0]].splice(choice[1], 1, token)
        return board;
    }
    else {
        return; //implement code for not allowing same spot choice
    }

}

// function to check for a winner

function checkForWinner(board) {
    let winner;
    for(let i = 0; i < board.length; i++){
        console.log(board[i]);
        if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] != 0){
            winner = true;
            break;
        } else if(board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] != 0){
            winner = true;
            break;
        } else if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] != 0){
            winner = true;
            break;
        } else if(board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[0][2] != 0){
            winner = true;
            break;
        } 
        else {
            winner = false;
            
        }
    }
    return winner;
}


// this function is responsible for changings turns and get which players has to play
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

    return {getActivePlayer, changeActivePlayer}

}



function gameControl() {
    let board = gameBoard();
   
    const players = createPlayer()
    
    activePlayer = playersTurn(players.players[0], players.players[1]);
    console.log(board);


    buttons.forEach((e) => {e.addEventListener("click", (e) => 
        {
        e.target.innerText = activePlayer.getActivePlayer().token;
        
        let cell = idToRowColumn(parseInt(e.target.id));
        
        playerMove(activePlayer.getActivePlayer().token, cell, board);
        
        console.log(board);

        if(checkForWinner(board)){
            gameOver(activePlayer.getActivePlayer().name, board);;
        } else if (!isMoveAvailable(board)){
            gameOver("tie", board);
        }

        activePlayer.changeActivePlayer();
        
        })})
        
};
gameControl();


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

function gameOver(player = "tie", board) {
    if(player != "tie"){
        alert(`${player} won`);
        clearBoard()
        
    } else {
        alert("game is a tie");
        clearBoard()  
    }
    return board;

}

function isMoveAvailable(board) {
    for (let i = 0; i < board.length; i++){
        if (board[i].includes(0))
        return true;
    }

}

function clearBoard() {
    const newBoard = gameBoard();
    board = newBoard;
    buttons.forEach((button) => {
        button.innerText = "";
    })
}




