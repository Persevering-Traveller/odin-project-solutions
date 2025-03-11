const gameBoard = (function () {
    const board = [];

    const isValidSpot = (spotAt) => (spotAt > -1 && spotAt < 9);

    const createGameBoard = function () {
        for(let i = 0; i < 9; i++)
            board.push(" "); // Spaces in 3x3 area
    }

    const getBoard = () => board;

    const getBoardSpotAt = function (spotAt) {
        if(isValidSpot(spotAt))
            return board[spotAt];
    }

    const makeSpotAt = function (sign, spotAt) {
        if(isValidSpot(spotAt))
            board[spotAt] = sign;
    }

    return { createGameBoard, getBoard, getBoardSpotAt, makeSpotAt };
})();

function createPlayer(sign) {
    let sign = sign;
    let score = 0;

    const getSign = () => sign;
    const assignNewSign = (newSign) => sign = newSign;
    
    const getScore = () => score;
    const givePoint = () => score++;

    return { getSign, assignNewSign, getScore, givePoint };
}