console.log("Hello Odin Project!");

function getComputerChoice() {
    let choice = Math.floor((Math.random() * 3) + 1);
    //console.log(choice);

    switch(choice) {
        case 1: return "Rock";
        case 2: return "Paper";
        case 3: return "Scissors";
    }
}

getComputerChoice();