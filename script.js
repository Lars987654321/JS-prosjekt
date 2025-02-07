const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let paddleWidth = canvas.width / 4
let paddleHeight = 10
let paddleX = (canvas.width - paddleWidth) / 2
let paddleY = canvas.height - paddleHeight - 5
let paddlespeed = 3
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

function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle()
    updatePaddle()
    requestAnimationFrame(gameloop)
}

gameloop()