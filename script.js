const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId)
    alert("Game over! Press OK to restart.");
    location.reload();
}

const changeDirection = (e) => {
    if((e.key === "ArrowUp" || e.key === "w") && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if((e.key === "ArrowDown" || e.key === "s") && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if((e.key === "ArrowLeft" || e.key === "a") && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if((e.key === "ArrowRight" || e.key === "d") && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class ="food" style="grid-area: ${foodY} / ${foodX}" ></div>`;
    
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        scoreElement.innerText = `Score: ${score}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (i === 0) {
            htmlMarkup += `<div class ="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}" ></div>`;

        } else {
            htmlMarkup += `<div class ="body" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}" ></div>`;

        }
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    // htmlMarkup += `<div class ="head" style="grid-area: ${snakeY} / ${snakeX}" ></div>`;
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 125)

document.addEventListener("keydown", changeDirection);