//game constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameoverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const gameSound = new Audio("../music/music.mp3");
let speed = 8;
let lastPainttime = 0;
let snakeArr = [{ x: 10, y: 11 }];

let food = { x: 7, y: 6 };
let score = 0;

//game functions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPainttime) / 1000 < 1 / speed) {
    return;
  } else {
    lastPainttime = ctime;
    gameEngine();
  }
}
function iscollide(sarr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
      return true;
    }
  }

  if (
    sarr[0].x <= 0 || sarr[0].x >= 35   || sarr[0].y >= 25 || sarr[0].y <= 0) {
    return true;
  }
}
function gameEngine() {
  if (iscollide(snakeArr)) {
    gameoverSound.play();
    gameSound.pause();
    inputDir = { x: 0, y: 0 };

    alert("Game Over");
    snakeArr = [{ x: 10, y: 11 }];
    gameSound.play();
    score = 0;
    scoreBox.innerHTML= "Score: " + score;
  }
  if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
    foodSound.play();
    score +=1;
    scoreBox.innerHTML= "Score: " + score;
    if (score > 5 && score <10) {
        speed = 9;
        
    }
    else if (score > 10 && score <13) {
        speed = 13;
        
    }else if (score > 13 && score <15) {
        speed =17;
        
    }else if (score > 15) {
        speed=20;
        
    }
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 23;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  board.innerHTML = " ";
  snakeArr.forEach((element, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.y;
    snakeElement.style.gridColumnStart = element.x;

    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.append(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");

  board.append(foodElement);
}

//game logic
gameSound.play();
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      inputDir = { x: 0, y: 1 };
      break;
    case "ArrowRight":
      inputDir = { x: 1, y: 0 };
      break;
    case "ArrowLeft":
      inputDir = { x: -1, y: 0 };
      break;

    default:
      break;
  }
});
