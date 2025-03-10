const gameBoard = (function () {
    const board = [];

    const isValidSpot = (spotAt) => (spotAt > -1 && spotAt < 9);

    const createGameBoard = function () {
        for(let i = 0; i < 9; i++)
            board.push(" "); // Spaces in 3x3 area
    }

    const getBoard = () => board.slice(); // Return a copy, not direct access to the board

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

gameBoard.createGameBoard();