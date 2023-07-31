let meteorElement1 = document.getElementById("meteor1");
let meteorElement2 = document.getElementById("meteor2");
let meteorElement3 = document.getElementById("meteor3");
let meteorElement4 = document.getElementById("meteor4");
let meteorElement5 = document.getElementById("meteor5");
let meteorElement6 = document.getElementById("meteor6");
let meteorElement7 = document.getElementById("meteor7");
let starElement1 = document.getElementById("star1");
let starElement2 = document.getElementById("star2");
let starElement3 = document.getElementById("star3");
let rocketElement = document.getElementById("rocket");
let gameElement = document.getElementById("game");
let pointsElement = document.getElementById("points");
let fuelElement = document.getElementById("fuel");
let points = 0;
let fuel = 500;
function restartGame() {
  alert("LOST");
  // console.log("LOST");
  points = 0;
  fuel = 500;
  startMeteors();
}
function calculateFeul() {
  if (fuel < 0) {
    restartGame();
  }
  fuelElement.innerText = fuel;
  fuel = fuel - 1;
}
function calculatePoints() {
  points += 1;
  pointsElement.innerText = points;
}
rocketElement.style.left = "120px";
setInterval(() => {
  calculateFeul();
}, 100);
function respawn(meteorElement) {
  let randomNumber = Math.floor(Math.random() * 750);
  meteorElement.style.left = randomNumber + "px";
  randomNumber = Math.floor(Math.random() * 200);

  meteorElement.style.top = randomNumber + "px";
}
function startMeteors() {
  respawn(meteorElement1);
  respawn(meteorElement2);
  respawn(meteorElement3);
  respawn(meteorElement4);
  respawn(meteorElement5);
  respawn(meteorElement6);
  respawn(meteorElement7);
  respawn(starElement1);
  respawn(starElement2);
  respawn(starElement3);
}
function moveRocket(e) {
  let key = e.key;
  if (key == "ArrowLeft") {
    //move left
    console.log("Moving left");
    rocketElement.style.left =
      +rocketElement.style.left.split("p")[0] - 20 + "px";
  }
  if (key == "ArrowRight") {
    console.log("Moving right");
    rocketElement.style.left =
      +rocketElement.style.left.split("p")[0] + 20 + "px";
    console.log(rocketElement.style.left);
  }
}
function moveRocketByMouse(e) {
  if (e.clientX - 650 > 0 && e.clientX - 600 < 850) {
    rocketElement.style.left = e.clientX - 650 + "px";
  }
}
window.addEventListener("keydown", moveRocket);
window.addEventListener("mousemove", moveRocketByMouse);
function moveMeteor(meteorElement) {
  meteorElement.style.top = +meteorElement.style.top.split("p")[0] + 10 + "px";
  let meteorPosition = +meteorElement.style.top.split("p")[0];
  if (isColliding(meteorElement)) {
    restartGame();
  }
  if (meteorPosition > 1060) {
    respawn(meteorElement);
  }
}

function moveStar(starElement) {
  starElement.style.top = +starElement.style.top.split("p")[0] + 10 + "px";
  let starPosition = +starElement.style.top.split("p")[0];
  if (isColliding(starElement)) {
    fuel += 20;
    respawn(starElement);
  }
  if (starPosition > 1060) {
    respawn(starElement);
  }
}

function isColliding(meteorElement) {
  a = rocketElement.getBoundingClientRect();
  b = meteorElement.getBoundingClientRect();
  if (
    a.x < b.x + b.width - 10 &&
    a.x + a.width - 10 > b.x &&
    a.y < b.y + b.height - 10 &&
    a.y + a.height - 10 > b.y
  ) {
    return true;
  }
}

startMeteors();

setInterval(() => moveMeteor(meteorElement1), 50);
setInterval(() => moveMeteor(meteorElement2), 50);
setInterval(() => moveMeteor(meteorElement3), 50);
setInterval(() => moveMeteor(meteorElement4), 50);
setInterval(() => moveMeteor(meteorElement5), 50);
setInterval(() => moveMeteor(meteorElement6), 50);
setInterval(() => moveMeteor(meteorElement7), 50);
setInterval(() => moveStar(starElement1), 50);
setInterval(() => moveStar(starElement2), 50);
setInterval(() => moveStar(starElement3), 50);

setInterval(calculatePoints, 500);
