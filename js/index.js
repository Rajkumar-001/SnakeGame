let Inputdirection = { x: 0, y: 0 };
let foodSound = new Audio('music/food.mp3');
let gameOverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');

let speed = 5;
let lastPaintTime = 0;
let score = 0;

let snakeArr = [
    { x: 13, y: 15 }
];

let food = { x: 6, y: 7 };

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine() {

    // Checking for collision
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        Inputdirection = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // If snake eats the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score+=1;
        if(score>highScoreVal){
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScore.innerHTML = "High Score: " + highScoreVal;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + Inputdirection.x, y: snakeArr[0].y + Inputdirection.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += Inputdirection.x;
    snakeArr[0].y += Inputdirection.y;

    // Display the snake and food
    board.innerHTML = "";

    // Rendering the snake
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    // Rendering the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; // Using food coordinates
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

function isCollide(snake) {

   for(let i=1; i<snake.length; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true
    }

}


    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true
    }

    
    return false;
}

let hiScore= localStorage.getItem("hiscore");
if(hiScore === null){
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));

}else{
    highScoreVal = JSON.parse(hiScore);
    highScore.innerHTML="High Score: "+hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (Inputdirection.y !== 1) { // Prevent moving in the opposite direction
                Inputdirection.x = 0;
                Inputdirection.y = -1;
            }
            break;
        case "ArrowDown":
            if (Inputdirection.y !== -1) {
                Inputdirection.x = 0;
                Inputdirection.y = 1;
            }
            break;
        case "ArrowLeft":
            if (Inputdirection.x !== 1) {
                Inputdirection.x = -1;
                Inputdirection.y = 0;
            }
            break;
        case "ArrowRight":
            if (Inputdirection.x !== -1) {
                Inputdirection.x = 1;
                Inputdirection.y = 0;
            }
            break;
        default:
            break;
    }
});
