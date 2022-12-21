
// using canvas

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const btn = document.querySelector("#button");
let shouldChange = false;
let firstTimeAlert = true;
let keyShouldWork = false;
let onceWon = true;

//clicking start button and calling the function
btn.addEventListener("click", clickingStart);

var ball = { x: 10, y: canvas.height / 2, v: 25, a: 45 }
var animationSpeed = 500;
var g = 0.0005;
ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.moveTo(30, 200);
ctx.lineTo(30, 600);
ctx.lineWidth = 2;
ctx.stroke();
ctx.closePath()




document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      keyLeft();
      break;
    case 38:
      keyUp();
      break;
    case 39:
      keyRight();
      break;
    case 40:
      keyDown();
      break;
  }
};


let keyDownInterval, keyUpInterval, keyLeftInterval, keyRightInterval;

function keyDown() {
  if(keyShouldWork) {
    posYCircle += 15

  }
}
function keyUp() {
  if(keyShouldWork) posYCircle -= 15;
}
function keyLeft() {
  if(keyShouldWork)  posXCircle -= 15
}

function keyRight() {
  if(keyShouldWork)  posXCircle += 10
}

//red line left
ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.moveTo(window.innerWidth - 30, 400);
ctx.lineTo(window.innerWidth - 30, 600);
ctx.lineWidth = 2;
ctx.stroke();
ctx.closePath()


//white ball positions

let posXCircle = 60;
let posYCircle = window.innerHeight / 2;
let tempPosXCircle = 60;
let tempPosYCircle = window.innerHeight / 2;
let posXInt;
let temp

//when we click start
function clickingStart() {
  if (posXInt) clearInterval(posXInt);
  //calling posRightFunc eevery 30ms to move the circle from one position to another
  posXInt = setInterval(posRightFunc, 30);
  shouldChange = true;
  keyShouldWork = true;
  posXCircle = 60;
  posYCircle = window.innerHeight / 2;
}

function posRightFunc() {
  ctx.clearRect(tempPosXCircle - 20, tempPosYCircle - 20, 20 * 2 + 2, 20 * 2 + 2);
  if (posXCircle < window.innerWidth - 40 || (posYCircle < 200 || posYCircle > 600 && posXCircle > 1170)) {
    posXCircle += 2;
  }


  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(posXCircle, posYCircle, 20, 0, 2 * Math.PI);
  ctx.fill();
  tempPosXCircle = posXCircle;
  tempPosYCircle = posYCircle;

    if(((posYCircle > 200 && posYCircle < 600) && posXCircle > window.innerWidth - 40) && onceWon) {
      onceWon = false;
      keyShouldWork = false;
      alert('Horray, You have won the game');
    }
}


//red line right
ctx.beginPath();
ctx.fillStyle = 'red';
ctx.arc(posXCircle, posYCircle, 20, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath()

const DefendersArray = [];

//other balls randomly roaming
class Defenders {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.size = 20;
    this.speedX = Math.random() * 8 - 1.5;
    this.speedY = Math.random() * 8 - 1.5;
  }

  //updating defenders positions
  update() {
    this.x += +this.speedX;
    this.y += +this.speedY;

    if (this.x + this.speedX > canvas.width - this.size || this.x + this.speedX < this.size) {
      this.speedX = -this.speedX
    }
    if (this.y + this.speedY > canvas.height - this.size || this.y + this.speedY < this.size) {
      this.speedY = -this.speedY
    }

    this.newCollision(this.x, this.y, this.size, posXCircle, posYCircle, this.size)
  }

  //if a collision happens between the white ball and a red ball
  newCollision(x1, y1, size1, x2, y2, size2) {
    var bottom1, bottom2, left1, left2, right1, right2, top1, top2;
    left1 = x1 - size1;
    right1 = x1 + size1;
    top1 = y1 - size1;
    bottom1 = y1 + size1;
    left2 = x2 - size2;
    right2 = x2 + size2;
    top2 = y2 - size2;
    bottom2 = y2 + size2;

    if (!(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1) && shouldChange && x1 > x2 && posXCircle < 1174) {
      if (firstTimeAlert) {
        alert('Please use Right, Left, Up, and Down Keys to move the white ball');
        firstTimeAlert = false;
      }
      posXCircle = posXCircle + (posXCircle - this.x);
      posYCircle = posYCircle + (posYCircle - this.y);
    }
    return !(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1) && x1 > x2;
  };

  //drawing balls
  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(posXCircle, posYCircle, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(30, 200);
    ctx.lineTo(30, 600);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath()

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(window.innerWidth - 30, 200);
    ctx.lineTo(window.innerWidth - 30, 600);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath()

    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

//need 11 balls so, looping with 11 , making a new instance of the defender class 11 times for 11 diffrent balls
function inite() {
  for (let i = 0; i < 11; i++) {
    DefendersArray.push(new Defenders())
  }
}
inite();

function handle() {
  DefendersArray.forEach(data => {
    data.draw();
    data.update();
  });
}
// animate function keeps calling it self
function animate() {
  //clearing previous positions of a ball
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handle();
  requestAnimationFrame(animate);
}
animate()
