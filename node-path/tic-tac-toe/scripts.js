const gameBoard = (function () {
    const board = [];

    const isValidSpot = (spotAt) => (spotAt > -1 && spotAt < 9);

    const createGameBoard = function () {
        for(let i = 0; i < 9; i++)
            board.push(" "); // Spaces in 3x3 area
    }

    const getBoard = () => board;

    const resetBoard = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = " ";
        }
    }

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

    return { createGameBoard, getBoard, resetBoard, showBoard, getBoardSpotAt, makeSpotAt };
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

    const isGameOver = () => gameOver === true;

    const startGame = () => {
        gameBoard.createGameBoard();
        cpu = createPlayer("O");
        gameBoard.showBoard();
        domManager.setup();
    }

    const restartGame = () => {
        gameBoard.resetBoard();
        gameOver = false;
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
            if(winningSign === player.getSign()) {
                const playerWinText =  `${domManager.getPlayerName()} wins!!`;
                console.log(playerWinText);
                domManager.putWinningText(playerWinText);
            }
            else if (winningSign === cpu.getSign()) {
                const cpuWinText = "The CPU wins this round!";
                console.log(cpuWinText);
                domManager.putWinningText(cpuWinText);
            }

            domManager.createRestartButton();
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
        let count = 0;

        // Lazy decision making at its finest :)
        while(gameBoard.getBoardSpotAt(chosenSpot) === cpu.getSign() ||
        gameBoard.getBoardSpotAt(chosenSpot) === player.getSign()) {
            chosenSpot = Math.floor(Math.random() * 9);
            count++;
            // If the CPU has looked for a chosen spot up to 9 times in one move,
            // then that means there are no more empty spaces to play,
            // which means a tie game
            if(count === 9) {
                gameOver = true;
                let tieGameText = "Looks like a tie game!"
                console.log(tieGameText);
                domManager.putWinningText(tieGameText);
                domManager.createRestartButton();
                return;
            }
        }

        playerMakeMove(cpu, chosenSpot);
        domManager.showCPUMove(cpu.getSign(), chosenSpot);
    }

    return { startGame, restartGame, checkWinner, playerMakeMove, isGameOver };
})();

const domManager = (function () {
    let playerName = "";
    
    const spots = document.querySelectorAll(".spot");
    
    const setup = () => {
        spots.forEach((spot, i) => {
            spot.addEventListener("click", () => {
                if(spot.textContent === "" && !gameManager.isGameOver()) {
                    gameManager.playerMakeMove(player, i);
                    spot.textContent = player.getSign();
                }
            });
        });

        playerName = document.querySelector(".name").value;
    }

    const restartGame = () =>  {
        spots.forEach((spot) => spot.textContent = "");
        const resultsText = document.querySelector(".results");
        resultsText.textContent = "";
        gameManager.restartGame();
    }

    const setPlayerName = (newName) => playerName = newName; 
    const getPlayerName = () => playerName;

    const showCPUMove = (cpuSign, chosenSpot) => {
        spots[chosenSpot].innerText = cpuSign;
    }

    const putWinningText = (winningText) => {
        const resultsText = document.querySelector(".results");
        resultsText.textContent = winningText;
    }

    const createRestartButton = () => {
        let restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.addEventListener("click", () => {
            restartGame();
            restartButton.remove();
        });

        const resultsContainer = document.querySelector(".results-container");
        resultsContainer.appendChild(restartButton);
    }

    return { setup, getPlayerName, setPlayerName, showCPUMove, putWinningText, createRestartButton };
})();

const player = createPlayer("X");

gameManager.startGame();

const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const nameEntry = document.querySelector(".name").value;
    domManager.setPlayerName(nameEntry);
});