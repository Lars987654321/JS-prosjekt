const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 550
canvas.height = 450

let paddleWidth = canvas.width / 4
let paddleHeight = 20
let paddleX = (canvas.width - paddleWidth) / 2
let paddleY = canvas.height - paddleHeight - 5
let paddlespeed = 8
let rightPressed = false
let leftPressed = false

function drawPaddle() {
    ctx.fillStyle = "blue"
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight)
}

function updatePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += paddlespeed
    } else if (leftPressed && paddleX > 0){
        paddleX -= paddlespeed
    }
}

document.addEventListener("keydown", keydown)
document.addEventListener("keyup", keyup)

function keydown(event){
    if (event.key === "ArrowRight" || event.key ==="d"){
        rightPressed = true
    } else if (event.key ==="ArrowLeft" || event.key ==="a"){
        leftPressed = true
    }
}

function keyup(event){
    if (event.key === "ArrowRight" || event.key ==="d"){
        rightPressed = false
    } else if (event.key ==="ArrowLeft" || event.key ==="a"){
        leftPressed = false
    }
}

let ball = {
    x: 40,
    y: 200,
    radius: 20,
    dx: 4,
    dy: 4,
    color: "green"
}

function drawBall(){
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'blue'
    ctx.fill()
}

function updateBall(){
    ball.x +=ball.dx
    ball.y +=ball.dy

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width){
        ball.dx *=-1
    } else if (ball.y - ball.radius < 0){
        ball.dy *=-1
    } else if (ball.y + ball.radius > canvas.height){
        document.location.reload()
    }

   
}

function collisionDetection() {
    if (ball.x + ball.radius > paddleX &&
        ball.x - ball.radius < paddleX + paddleWidth &&
        ball.y + ball.radius > paddleY) {
        let hitPoint = (ball.x - paddleX) / paddleWidth
        let angle = (hitPoint - 0.5) * Math.PI / 2

        ball.dy = -Math.abs(ball.dy)
        ball.dx = Math.sin(angle) * 6
    }
}

let brickConfig = { 
    rows: 4,
    columns: 6,
    width: 70,
    height: 20,
    padding: 10,
    offsetTop: 40,
    offsetLeft: 0
}

brickConfig.offsetLeft = (canvas.width - (brickConfig.columns * (brickConfig.width + brickConfig.padding) - brickConfig.padding)) / 2

let bricks = []
let score = 0

function createBricks() {
    for (let r = 0; r < brickConfig.rows; r++) {
        bricks[r] = []
        for (let c = 0; c < brickConfig.columns; c++) {
            bricks[r][c] = { 
                x: c * (brickConfig.width + brickConfig.padding) + brickConfig.offsetLeft, 
                y: r * (brickConfig.height + brickConfig.padding) + brickConfig.offsetTop, 
                status: true 
            }
        }
    }
}

function drawBricks() {
    for (let row of bricks) {
        for (let brick of row) {
            if (brick.status) {
                ctx.fillStyle = "blue"
                ctx.fillRect(brick.x, brick.y, brickConfig.width, brickConfig.height)
            }
        }
    }
}

function checkBrickCollision() {
    for (let row of bricks) {
        for (let brick of row) {
            if (brick.status && ball.x > brick.x && ball.x < brick.x + brickConfig.width && ball.y > brick.y && ball.y < brick.y + brickConfig.height) {
                ball.dy *= -1
                brick.status = false
                score++

                if (score === brickConfig.rows * brickConfig.columns) {
                    alert("You Win!")
                    document.location.reload()
                }
            }
        }
    }
}

let gameRunning = false
let animationFrameId

document.getElementById("replayButton").addEventListener("click", resetGame)

function resetGame() {
    cancelAnimationFrame(animationFrameId)
    gameRunning = false

    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball.dx = 4
    ball.dy = 4

    paddleX = (canvas.width - paddleWidth) / 2

    createBricks()

    score = 0

    startGame()
}

function gameloop() {
    if (!gameRunning) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBricks()
    collisionDetection()
    drawPaddle()
    updatePaddle()
    drawBall()
    updateBall()
    checkBrickCollision()

    animationFrameId = requestAnimationFrame(gameloop)
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true
        gameloop()
    }
}

createBricks()
startGame()