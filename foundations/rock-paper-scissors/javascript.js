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

getComputerChoice();
getHumanChoice();