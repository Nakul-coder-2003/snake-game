const playBoard  = document.querySelector('.playBoard');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const controlElement = document.querySelectorAll('.controls i');

// some variable 
let foodX , foodY ;
let snakeX , snakeY;
let velocityX = 0 , velocityY = 0;
let snakeBody = [];
let gameOver = false;
let score = 0;

// getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High-Score : ${highScore}`;

// some function 
const foodPositionChange = ()=>{
    foodX = Math.floor(Math.random()*30+1);
    foodY = Math.floor(Math.random()*30+1);
}
const headPositionChange = ()=>{
    snakeX = Math.floor(Math.random()*30+1);
    snakeY = Math.floor(Math.random()*30+1);
}
const changeDirection = (e)=>{
 if(e.key == "ArrowUp" && velocityY != 1){
   velocityX = 0;
   velocityY = -1;
 }else if(e.key == "ArrowDown" && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
  }else if(e.key == "ArrowRight" && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
  }else if(e.key == "ArrowLeft" && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
  }
}
const handleGameOver = ()=>{
   clearInterval(clear);
   alert('game over and press ok')
   location.reload();
}

// controls elements
controlElement.forEach((key)=>{
  key.addEventListener('click',()=>{
    changeDirection({key: key.dataset.key})
  })
})

// game satrt
const startGame = ()=>{
  let position = `<div class="food" style = "grid-area : ${foodY} / ${foodX}"></div></div>`;

  if(snakeX === foodX && snakeY === foodY){
    foodPositionChange()
    snakeBody.push([foodX,foodY]);
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem('high-score',highScore);
    scoreElement.innerText = `score ${score}`
    highScoreElement.innerText = `High-score : ${highScore}`;
    
  }
  
 //  updating velocity
  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = snakeBody.length - 1; i >0 ; i--) {
    // shifting forward the valueof the element in the snakebody
    snakeBody[i] = snakeBody[i-1];
  }

  if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
    handleGameOver();
  }

  snakeBody[0] = [snakeX,snakeY];

  for(let i=0; i < snakeBody.length; i++){
    position += `<div class="head" style = "grid-area : ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div></div>`;
    // checking snake head hit the body , if hit then game over
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
         handleGameOver();
    }
  }

  

  playBoard.innerHTML = position;
}

foodPositionChange();
headPositionChange();
const clear =  setInterval(startGame,125);
document.addEventListener("keydown",changeDirection);