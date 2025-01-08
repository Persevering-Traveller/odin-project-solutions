console.log("Hello Odin Project!");

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

function getHumanChoice() {
    let choice = undefined; // Javascript doesn't like it when I try to make the variable in the while loop
    while(true) {
        choice = prompt("What do you choose?\n1 - Rock\n2 - Paper\n3 - Scissors");
        if(choice.toLowerCase() == "rock" || choice.toLowerCase() == "paper" || choice.toLowerCase() == "scissors") break;
        choice = Number(choice);
        if(!isNaN(choice) && choice > 0 && choice < 4) break;
        prompt("You need a choose a number between 1-3 or type the name of your choice!\nPress OK or Cancel.");
    }
    
    return choice;
}

function playRound(humanChoice, computerChoice) {
    const resultsDiv = document.querySelector(".results");
    console.log(resultsDiv);
    const gameResultsPara = document.createElement("p");

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
            console.log(tieText);
            gameResultsPara.textContent = tieText;
        }
        if(computerChoice.toLowerCase() == "paper") { // Rock vs Paper
            console.log(loseText);
            computerScore++;
            gameResultsPara.textContent = loseText;
        }
        if(computerChoice.toLowerCase() == "scissors") { // Rock vs Scissors
            console.log(winText);
            humanScore++;
            gameResultsPara.textContent = winText;
        }
    }
    else if (humanChoice.toLowerCase() == "paper") {
        if(computerChoice.toLowerCase() == "rock") { // Paper vs Rock
            console.log(winText);
            humanScore++;
            gameResultsPara.textContent = winText;
        }
        if(computerChoice.toLowerCase() == "paper") { // Paper vs Paper
            console.log(tieText);
            gameResultsPara.textContent = tieText;
        }
        if(computerChoice.toLowerCase() == "scissors") { // Paper vs Scissors
            console.log(loseText);
            computerScore++;
            gameResultsPara.textContent = loseText;
        }
    }
    else {
        if(computerChoice.toLowerCase() == "rock") { // Scissors vs Rock
            console.log(loseText);
            computerScore++;
            gameResultsPara.textContent = loseText;
        }
        if(computerChoice.toLowerCase() == "paper") { // Scissors vs Paper
            console.log(winText);
            humanScore++;
            gameResultsPara.textContent = winText;
        }
        if(computerChoice.toLowerCase() == "scissors") {// Scissors vs Scissors
            console.log(tieText);
            gameResultsPara.textContent = tieText;
        }
    }

    resultsDiv.appendChild(gameResultsPara);
}

function announceGameWinner() {
    const resultsDiv = document.querySelector(".results");
    const gameOverPara = document.createElement("h3");
    gameOverPara.style.color = "red";

    if(humanScore > computerScore) {
        console.log("You win the game! Congratulations!");
        gameOverPara.textContent = "You win the game! Congratulations!";
    }
    else if(humanScore < computerScore) {
        console.log("The computer wins this game! Refresh to try again!");
        gameOverPara.textContent = "The computer wins this game! Refresh to try again!";
    }
    else {
        console.log("A tie game between you and the computer! Refresh to do a tie breaker!!");
        gameOverPara.textContent = "A tie game between you and the computer! Refresh to do a tie breaker!!";
    }

    resultsDiv.appendChild(gameOverPara);
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
