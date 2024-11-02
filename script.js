const canvas = document.getElementById('gameCanvas');
const pen = canvas.getContext('2d');

// Make the game responsive
const cell = 30;
let canvasWidth = window.innerWidth > 600 ? 600 : window.innerWidth - 20;
let canvasHeight = window.innerHeight > 600 ? 600 : window.innerHeight - 20;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let snakeCells = [[0, 0]];
let gameOver = false;
let direction = 'right';
let score = 0;
let snakeHeadImage = new Image();
snakeHeadImage.src = 'https://png.pngtree.com/element_our/20190601/ourmid/pngtree-cartoon-green-snake-head-free-buckle-illustration-image_1370836.jpg'; // Replace with your image path
let generateRandomCell = randomPosition();

const id = setInterval(() => {
    if (!gameOver) {
        draw();
        update();
    } else {
        clearInterval(id);
    }
}, 200);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    else if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    else if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    else if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

function draw() {
    pen.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snakeCells.length; i++) {
        const [x, y] = snakeCells[i];
        if (i === snakeCells.length - 1) {
            // Draw snake head
            pen.drawImage(snakeHeadImage, x, y, cell, cell);
        } else {
            pen.fillStyle = 'limegreen';
            pen.fillRect(x, y, cell, cell);
            pen.strokeStyle = '#222';
            pen.strokeRect(x, y, cell, cell);
        }
    }

    // Draw food
    pen.fillStyle = 'orange';
    pen.beginPath();
    pen.arc(generateRandomCell[0] + cell / 2, generateRandomCell[1] + cell / 2, cell / 2, 0, Math.PI * 2);
    pen.fill();

    // Display score
    pen.fillStyle = '#fff';
    pen.font = '20px Arial';
    pen.fillText(`Score: ${score}`, 20, 30);
}

function update() {
    const headX = snakeCells[snakeCells.length - 1][0];
    const headY = snakeCells[snakeCells.length - 1][1];

    let newX, newY;
    if (direction === 'right') {
        newX = headX + cell;
        newY = headY;
        if (newX >= canvas.width) gameOver = true;
    } else if (direction === 'left') {
        newX = headX - cell;
        newY = headY;
        if (newX < 0) gameOver = true;
    } else if (direction === 'up') {
        newX = headX;
        newY = headY - cell;
        if (newY < 0) gameOver = true;
    } else if (direction === 'down') {
        newX = headX;
        newY = headY + cell;
        if (newY >= canvas.height) gameOver = true;
    }

    if (newX === generateRandomCell[0] && newY === generateRandomCell[1]) {
        generateRandomCell = randomPosition();
        score += 10;
    } else {
        snakeCells.shift();
    }

    snakeCells.push([newX, newY]);
}

function randomPosition() {
    const x = Math.floor(Math.random() * (canvas.width / cell)) * cell;
    const y = Math.floor(Math.random() * (canvas.height / cell)) * cell;
    return [x, y];
}
