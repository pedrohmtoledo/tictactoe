// first create the board. it is a 3x3 cells, each cell hast a row number and a column number

function gameBoard() {
    const size = 3;
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
function createPlayer(name, token){
    const getName = () => {return name};

    const getToken = () => {return token};

    return { getName, getToken}
};

// update players moves to the board
function playerMove(token, choice, board){
    if(board[choice[0]][choice[1]] === 0){
        board[choice[0]].splice(choice[1], 1, token)
        console.log(board)
        return board;
    }
    else {
        return; //implement code for not allowing same spot choice
    }

}

// function to check for a winner
function checkForWinner(board) {
    for(let i = 0; i < board.length; i++){
        if(board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] != 0){
            return board[i][0];
        }
        else if(board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] != 0){
            return board[0][i];
        }
        else if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] != 0){
            return board[0][0];
        }
        else if(board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[0][2] != 0){
            return board[0][0];
        }
        else {
            return false
        }

    }

}

function choice(row, column) {
    let cell = [];
    cell.push(row);
    cell.push(column);
    return cell;
}

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




const ticTacToe = (function gameControl() {
    let board = gameBoard();
    console.log(board)
    let player1 = createPlayer(prompt("first player will be X"), "X");
    let player2 = createPlayer(prompt("second player will be O"), "O");
    

    const players = [
        {
            name: player1.getName(),
            token: player1.getToken()
        },
        {
            name: player2.getName(),
            token: player2.getToken()
        }
    ]

    activePlayer = playersTurn(players[0], players[1]);
    console.log(activePlayer.getActivePlayer());
    console.log(activePlayer.getActivePlayer().token)
    while(!checkForWinner(board)){
        let row;
        let column;
        row = parseInt(prompt(`${activePlayer.getActivePlayer().name} chose a row`));
        column = parseInt(prompt(`${activePlayer.getActivePlayer().name} chose a columns`));

        cell = choice(row, column);

        playerMove(activePlayer.getActivePlayer().token, cell, board);

        checkForWinner(board);

        activePlayer.changeActivePlayer();


    }


})();


