const gameBoard = (function () {
    const board = [];

    const isValidSpot = (spotAt) => (spotAt > -1 && spotAt < 9);

    const createGameBoard = function () {
        for(let i = 0; i < 9; i++)
            board.push(" "); // Spaces in 3x3 area
    }

    const getBoard = () => board;

    const showBoard = function () {
        let count = 1;
        let boardString = "";
        for(const spot of board) {
            switch(count) {
                case 1:
                case 2: 
                    boardString += ` ${spot} |`;
                    count++;
                    break;
                case 3: 
                    boardString += ` ${spot} \n`;
                    count = 1;
                    break;
            }
        }
        console.log(boardString);
    }

    const getBoardSpotAt = function (spotAt) {
        if(isValidSpot(spotAt))
            return board[spotAt];
    }

    const makeSpotAt = function (sign, spotAt) {
        if(isValidSpot(spotAt))
            board[spotAt] = sign;
    }

    return { createGameBoard, getBoard, showBoard, getBoardSpotAt, makeSpotAt };
})();

function createPlayer(sign) {
    let score = 0;

    const getSign = () => sign;
    const assignNewSign = (newSign) => sign = newSign;
    
    const getScore = () => score;
    const givePoint = () => score++;

    return { getSign, assignNewSign, getScore, givePoint };
}

const gameManager = (function () {
    let cpu; // The CPU player
    let gameOver = false;

    const startGame = () => {
        gameBoard.createGameBoard();
        cpu = createPlayer("O");
        gameBoard.showBoard();
    }

    const checkWinner = function () {
        if(gameOver) return;

        const currentBoard = gameBoard.getBoard();
        // Check for all possible horizontal wins, all vertical wins, and the cross wins
        /* 0 | 1 | 2
         * 3 | 4 | 5
         * 6 | 7 | 8 */
        let winningSign = "";
        // Horizontal Checks
        for(let i = 0; i < 9; i += 3) {
            let sign = currentBoard[i];
            if(sign === " ")
                continue;
            if(sign === currentBoard[i+1] && sign === currentBoard[i+2]) {
                winningSign = sign;
                break;
            }
        }
        // Vertical Checks
        for(let i = 0; i < 3; i++) {
            let sign = currentBoard[i];
            if(sign === " ")
                continue;
            if(sign === currentBoard[i+3] && sign === currentBoard[i+6]) {
                winningSign = sign;
                break;
            }
        }
        // Cross Checks
        sign = currentBoard[0]; // The \ cross win
        if(sign !== " " && sign === currentBoard[4] && sign === currentBoard[8])
            winningSign = sign;
        sign = currentBoard[2] // The / cross win
        if(sign !== " " && sign === currentBoard[4] && sign === currentBoard[6])
            winningSign = sign;

        // Declare winner
        if(winningSign !== "") {
            if(winningSign === player.getSign()) 
                console.log("You win!!");
            else if (winningSign === cpu.getSign())
                console.log("The CPU wins this round!");

            gameOver = true;
        }
    }

    const playerMakeMove = function(moveMaker, spot) {
        if(gameOver) return;

        if(spot < 0 || spot > 8) {
            console.log("Not a valid spot");
            return;
        }
        else if (gameBoard.getBoard()[spot] !== " ") {
            console.log("That spot has been played");
            return;
        }
        gameBoard.makeSpotAt(moveMaker.getSign(), spot);
        gameBoard.showBoard();
        checkWinner();
        if(moveMaker.getSign() === player.getSign()) {
            cpuDecideMove();
            checkWinner();
        }
    }

    const cpuDecideMove = function() {
        if(gameOver) return;
        console.log("CPU's Turn:");
        let chosenSpot = Math.floor(Math.random() * 9);

        // Lazy decision making at its finest :)
        while(gameBoard.getBoardSpotAt(chosenSpot) === cpu.getSign() ||
        gameBoard.getBoardSpotAt(chosenSpot) === player.getSign())
            chosenSpot = Math.random() * 9;

        playerMakeMove(cpu, chosenSpot);
    }

    return { startGame, checkWinner, playerMakeMove };
})();

const player = createPlayer("X");

gameManager.startGame();