const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// Define Variables
let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Let's create a function to initialise the game.
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // update UI that each boxes is empty and all are clickables 
    boxes.forEach((box, index) => {
        // each box is empty
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Initialise boxes with css properties again.
        box.classList = `box box${index + 1}`;

    });
    newGameBtn.classList.remove("active");
    // I have to render the currentPlayer wali value in UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

// Swap the turn
function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }

    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // All 3 boxes should be non-empty and exactly same in value.
        // For [0,1,2]
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // Check whether winner is X or O.
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            // Jeetne k baad bhi game on hi hai so we have to close the pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Now we know the winner is X/O.
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // It means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer} 😊`;
        newGameBtn.classList.add("active");
        return;
    }

    // Let's check whether there is a tied match.
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });

    // Board is filled , game is tied.
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied 🥺 !";
        newGameBtn.classList.add("active");
    }


};

function handleClick(index) {
    if (gameGrid[index] === "") {

        // Ye wali line UI m change krti hai
        boxes[index].innerText = currentPlayer;

        // Ye wali line jo humne grid bnaaya hai usme change krti hai
        gameGrid[index] = currentPlayer;

        // Box m "X"/"O" jahan bhi ho wahan pointer event none krdo
        boxes[index].style.pointerEvents = "none";

        // Swap kro turn ko
        swapTurn();

        // Check kro kahi koi jeet toh nahi gya
        checkGameOver();
    }
}

// Adding the click and displaying 'X' or 'O' in the boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});
newGameBtn.addEventListener("click", initGame);