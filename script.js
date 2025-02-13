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
    x: 200,
    y: 200,
    radius: 20,
    dx: 6,
    dy: 6,
    color: "green"
}

function drawBall(){
    ctx.beginPath()
    ctx.arc(ball.x, ball.y , ball.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'blue'
    ctx.fill()
}

function updateBall(){
    ball.x +=ball.dx
    ball.y +=ball.dy

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width){
        ball.dx *=-1
    } if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.dy *=-1
    }

   
}

function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle()
    updatePaddle()
    drawBall()
    updateBall()
    requestAnimationFrame(gameloop)
}
gameloop()
