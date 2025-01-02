console.log("Hello Odin Project!");

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let choice = Math.floor((Math.random() * 3) + 1);
    //console.log(choice);

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
    console.log(choice);
    return choice;
}

function playRound(humanChoice, computerChoice) {
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

    if(humanChoice.toLowerCase() == "rock") {
        if(computerChoice.toLowerCase() == "rock") // Rock vs Rock
            console.log(`A tie of ${computerChoice} and ${humanChoice}...`);
        if(computerChoice.toLowerCase() == "paper") { // Rock vs Paper
            console.log(`You lose! CPU: ${computerChoice} beats Your: ${humanChoice}.`);
            computerScore++;
        }
        if(computerChoice.toLowerCase() == "scissors") { // Rock vs Scissors
            console.log(`You win! Your: ${humanChoice} beats CPU: ${computerChoice}.`);
            humanScore++;
        }
    }
    else if (humanChoice.toLowerCase() == "paper") {
        if(computerChoice.toLowerCase() == "rock") { // Paper vs Rock
            console.log(`You win! Your: ${humanChoice} beats CPU: ${computerChoice}.`);
            humanScore++;
        }
        if(computerChoice.toLowerCase() == "paper") // Paper vs Paper
            console.log(`A tie of ${computerChoice} and ${humanChoice}...`);
        if(computerChoice.toLowerCase() == "scissors") { // Paper vs Scissors
            console.log(`You lose! CPU: ${computerChoice} beats Your: ${humanChoice}.`);
            computerScore++;
        }
    }
    else {
        if(computerChoice.toLowerCase() == "rock") { // Scissors vs Rock
            console.log(`You lose! CPU: ${computerChoice} beats Your: ${humanChoice}.`);
            computerScore++;
        }
        if(computerChoice.toLowerCase() == "paper") { // Scissors vs Paper
            console.log(`You win! Your: ${humanChoice} beats CPU: ${computerChoice}.`);
            humanScore++;
        }
        if(computerChoice.toLowerCase() == "scissors") // Scissors vs Scissors
            console.log(`A tie of ${computerChoice} and ${humanChoice}...`);
    }
        
}

playRound(getHumanChoice(), getComputerChoice());
