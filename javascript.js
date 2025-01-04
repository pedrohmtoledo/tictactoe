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

function player(name, token){
    const getName = () => {return name};

    const getToken = () => {return token};

    return { getName, getToken}
};

function playerMove(token, choice, board){
    if(board[choice[0]][choice[1]] === 0){
        board[choice[0]].splice(choice[1], 1, token)
        console.log(board)
    }
    else {
        return //implement code for not allowing same spot choice
    }

}
let board = gameBoard();
 
console.log(board.length)


function checkForWinner(board) {
    for(let i = 0; i < board.length; i++){
        if(board[i][0] === board[i][1] && board[i][0] === board[i][2]){
            return board[i][0];
        }
        if(board[0][i] === board[i][1] === board[i][2]){
            return board[i][0];
        }
    }
}

