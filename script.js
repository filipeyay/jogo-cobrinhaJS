// TODO: Restart System and Highscore System

let blockSize = 30;
let totalRow = 18;
let totalCol = 18;
let board;
let context;
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let speedX = 0;
let speedY = 0;
let foodX;
let foodY;
let snakeBody = [];

let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = totalRow * blockSize;
  board.width = totalCol * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1200 / 10); // snake speed
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "#23201a";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "#792639";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  // snake body grow
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "#868645";
  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  if (
    snakeX < 0 ||
    snakeX > totalCol * blockSize ||
    snakeY < 0 ||
    snakeY > totalRow * blockSize
  ) {
    gameOver = true;
    alert("Game Over");
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && speedY != 1) {
    speedX = 0;
    speedY = -1;
  } else if (e.code == "ArrowDown" && speedY != -1) {
    speedX = 0;
    speedY = 1;
  } else if (e.code == "ArrowLeft" && speedX != 1) {
    speedX = -1;
    speedY = 0;
  } else if (e.code == "ArrowRight" && speedX != -1) {
    speedX = 1;
    speedY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * totalCol) * blockSize;
  foodY = Math.floor(Math.random() * totalRow) * blockSize;
}
