const createPlayer = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {

    let board = [
        '','','',
        '','','',
        '','',''
    ];
    
    let squares = document.querySelector('#gameboard');
    
    Array.from(squares.children).forEach((square, index) => {
        square.addEventListener('click', () => {
            // display active player marker
            square.innerHTML = game.activePlayer.marker;
            // update array value to be that of active player
            board[index] = game.activePlayer.marker;
            // remove event listener from the marked index
            square.style.pointerEvents = 'none';
            // update remainingSpots
            game.remainingSpots -= 1;
            // check winner
            game.checkWinner();
            // check remaining spots
            if (game.winnerDeclared == false) {
                if (game.remainingSpots > 0) {
                    game.alertNextPlayer();
                    game.nextPlayer();
                } else if (game.remainingSpots == 0) {
                    game.declareTie();
                }
            } 
        })
    });

    return {
        board
    };
})();

// game object
const game = (() => {

    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');

    let activePlayer = playerOne;
    let winnerDeclared = false;
    let remainingSpots = 9;

    let subtext = document.querySelector('#messageText'); // display winner/tie
    let playerName = document.querySelector('#turnIndicator'); // purpose: alert player turn

    // winning conditions
    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    // check winner
    function checkWinner() {
        winningAxes.forEach((item, index) => { // [0, 1, 2, 3, 4, 5, 6, 7]
            if (gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
                subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`;
                playerName.innerHTML = '';
                this.winnerDeclared = true;
            }
            if(game.winnerDeclared === true) {
                this.activePlayer.marker = '';
            }
        })
    }


    // alert next player
    function alertNextPlayer() {
        this.activePlayer === playerOne ? playerName.textContent = 'Player 2, it is your turn!' : playerName.textContent = 'Player 1, it is your turn!';
    }

    // next player
    function nextPlayer() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
    }

    // declare tie
    function declareTie() {
        subtext.innerHTML = "<b>Tie game!</b>";
    }

    return {
        activePlayer,
        remainingSpots,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
        winnerDeclared
    };
})();