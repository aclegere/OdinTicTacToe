const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];



let board;
let turn = 'X';


const squares = Array.from(document.querySelectorAll('#gameboard div'));

document.getElementById('gameboard').addEventListener('click', handleTurn);
let messages = document.querySelector('#turnIndicator');
document.getElementById('restart').addEventListener('click', init);

function gameMessages() {
    messages.innerHTML = "It's player X's turn!"
    if(turn === 'X'){
        messages.innerHTML = "It's player X's turn!"
    } else {
        messages.innerHTML = "It's player O's turn!"
    }
}

function handleTurn() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    render();
    gameMessages();
};

function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    render();
    gameMessages();
};

function render() {
    board.forEach(function(mark, index) {
    squares[index].textContent = mark;
    });
    };

init();