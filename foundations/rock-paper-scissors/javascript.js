//console.log("Hello Odin Project!");

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let choice = Math.floor((Math.random() * 3) + 1);

    switch(choice) {
        case 1: return "Rock";
        case 2: return "Paper";
        case 3: return "Scissors";
    }
}

function playRound(humanChoice, computerChoice) {
    const resultsDiv = document.querySelector(".results");
    const gameResultsPara = document.createElement("p");
    const playerScore = document.querySelector(".player");
    const cpuScore = document.querySelector(".cpu");
    let oldPlayerScore = humanScore;
    let oldCPUScore = computerScore;

    if(!isNaN(humanChoice)) {
        switch(humanChoice) {
            case 1:
                humanChoice = "Rock";
                break;
            case 2:
                humanChoice = "Paper";
                break;
            case 3:
                humanChoice = "Scissors";
                break;
        }
    }

    const winText = `You win! Your: ${humanChoice} beats CPU: ${computerChoice}.`;
    const loseText = `You lose! CPU: ${computerChoice} beats Your: ${humanChoice}.`;
    const tieText = `A tie of ${computerChoice} and ${humanChoice}...`;

    if(humanChoice.toLowerCase() == "rock") {
        if(computerChoice.toLowerCase() == "rock") { // Rock vs Rock
            gameResultsPara.textContent = tieText;
        }
        if(computerChoice.toLowerCase() == "paper") { // Rock vs Paper
            computerScore++;
            gameResultsPara.textContent = loseText;
        }
        if(computerChoice.toLowerCase() == "scissors") { // Rock vs Scissors
            humanScore++;
            gameResultsPara.textContent = winText;
        }
    }
    else if (humanChoice.toLowerCase() == "paper") {
        if(computerChoice.toLowerCase() == "rock") { // Paper vs Rock
            humanScore++;
            gameResultsPara.textContent = winText;
        }
        if(computerChoice.toLowerCase() == "paper") { // Paper vs Paper
            gameResultsPara.textContent = tieText;
        }
        if(computerChoice.toLowerCase() == "scissors") { // Paper vs Scissors
            computerScore++;
            gameResultsPara.textContent = loseText;
        }
    }
    else {
        if(computerChoice.toLowerCase() == "rock") { // Scissors vs Rock
            computerScore++;
            gameResultsPara.textContent = loseText;
        }
        if(computerChoice.toLowerCase() == "paper") { // Scissors vs Paper
            humanScore++;
            gameResultsPara.textContent = winText;
        }
        if(computerChoice.toLowerCase() == "scissors") {// Scissors vs Scissors
            gameResultsPara.textContent = tieText;
        }
    }

    resultsDiv.appendChild(gameResultsPara);

    if(oldPlayerScore != humanScore) playerScore.innerText = humanScore;
    if(oldCPUScore != computerScore) cpuScore.innerText = computerScore;

    if(humanScore >= 5 || computerScore >= 5)
        announceGameWinner();
}

function announceGameWinner() {
    const resultsDiv = document.querySelector(".results");
    const gameOverHeader = document.createElement("h3");
    gameOverHeader.style.color = "red";

    if(humanScore > computerScore) {
        gameOverHeader.textContent = "You win the game! Congratulations!";
    }
    else if(humanScore < computerScore) {
        gameOverHeader.textContent = "The computer wins this game! Refresh to try again!";
    }
    else {
        gameOverHeader.textContent = "A tie game between you and the computer! Refresh to do a tie breaker!!";
    }

    resultsDiv.appendChild(gameOverHeader);
}

// Need to create an arrow function that calls the playRound function or it will
// run the function as it adds an event listener
document.querySelector("#rock").addEventListener("click", () => {
    playRound("Rock", getComputerChoice());
});
document.querySelector("#paper").addEventListener("click", () => {
    playRound("Paper", getComputerChoice());
});
document.querySelector("#scissors").addEventListener("click", () => {
    playRound("Scissors", getComputerChoice());
});
