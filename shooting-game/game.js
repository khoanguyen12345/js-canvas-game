let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
canvas.style.left = "32%";
canvas.style.top = "25%";
canvas.style.position = "absolute";
canvas.style.marginBottom = "20px";
document.body.appendChild(canvas);

var snd = new Audio("audio/tindermatch.wav");
var snd1 = new Audio ("audio/wrongbuzzer.wav");
var snd2 = new Audio("audio/levelup.wav");

let bgReady, heroReady,lossAlertReady, isHitready, monsterReady, monster1Ready,monster2Ready,monster3Ready,monster4Ready,monster5Ready,monster6Ready, bulletReady,powerupReady;
let bgImage, heroImage, monsterImage, bulletImage,powerupImage;
let snd1ready;
let scoreStorage = window.localStorage;
let startTime;
const SECONDS_PER_ROUND = 15;
var SPEED = 5;
var BULLETSPEED = 20;
let elapsedTime = 0;
let playerName;
let scoreSheet = []
let isHit = false;
let round_passed = 0;
let monsterKill = 0
let level = 0;
let heroX = 240;
let heroY = 400;

let monsterX = getRndInteger(30,450);
let monsterY = -50;
let monsterX2 = getRndInteger(30,450);
let monsterY2 = -100;
let monsterX3 = getRndInteger(30,450);
let monsterY3 = -150;
let monsterX4 = getRndInteger(30,450);
let monsterY4 = -200;
let monsterX5 = getRndInteger(30,450);
let monsterY5 = -250;
let monsterX6 = getRndInteger(30,450);
let monsterY6 = -300;
let monsterX7 = getRndInteger(30,450);
let monsterY7 = -350;
let monsterX8 = getRndInteger(30,450);
let monsterY8 = -400;
let monsterX9 = getRndInteger(30,450);
let monsterY9 = -450;

let bulletX = -20;
let bulletY = 1;

let powerupX = getRndInteger(30,450);
let powerupY = -450


function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background.png";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/hero.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/monster.png";

  monster1Image = new Image();
  monster1Image.onload = function () {
    // show the monster image
    monster1Ready = true;
  };
  monster1Image.src = "images/monster1.png";

  monster2Image = new Image();
  monster2Image.onload = function () {
    // show the monster image
    monster2Ready = true;
  };
  monster2Image.src = "images/monster2.png";

  monster3Image = new Image();
  monster3Image.onload = function () {
    // show the monster image
    monster3Ready = true;
  };
  monster3Image.src = "images/monster3.png";

  monster4Image = new Image();
  monster4Image.onload = function () {
    // show the monster image
    monster4Ready = true;
  };
  monster4Image.src = "images/monster4.png";

  monster5Image = new Image();
  monster5Image.onload = function () {
    // show the monster image
    monster5Ready = true;
  };
  monster5Image.src = "images/monster5.png";

  monster6Image = new Image();
  monster6Image.onload = function () {
    // show the monster image
    monster6Ready = true;
  };
  monster6Image.src = "images/monster6.png";

  bulletImage = new Image();
  bulletImage.onload = function () {
    // show the monster image
    bulletReady = true;
  };
  bulletImage.src = "images/bullet.png";

  lossAlertImage = new Image();
  lossAlertImage.onload = function () {
    // show the monster image
    lossAlertReady = true;
  };
  lossAlertImage.src = "images/lossalert.png";

  isHitImage = new Image();
  isHitImage.onload = function () {
    // show the monster image
    isHitReady = true;
  };
  isHitImage.src = "images/isHit.png";

  powerupImage = new Image();
  powerupImage.onload = function () {
    // show the monster image
    powerupReady = true;
  };
  powerupImage.src = "images/powerup.png";
}
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    if (key.keyCode != 32){
    delete keysDown[key.keyCode];
    }else if (key.keyCode === 32 && isHit === false){
      bulletY = 400
      bulletX = heroX  
    }
    //OWO MADE A FUCKING GUN BAM BAM BAM BAM :D:D:D:D:D
  }, false);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
let update = function () {
  checkHit()
  checkAndKillMonster()
  checkLevelUp()
  shoot()
  if (isHit === true){
    timeOut()
    setHighScore(monsterKill)
    document.getElementById("reset").style.visibility = "visible"
  }else{
    monsterY = monsterDrop()
    powerupDrop()
  if (38 in keysDown) { // Player is holding up key
    heroY = heroY-SPEED
    if (heroY <350){  
      heroY = 350
    }
  }
  if (40 in keysDown) { // Player is holding down key
    heroY = heroY +SPEED
    if (heroY>450){
        heroY = 450
    }
  }
  if (37 in keysDown) { // Player is holding left key
    heroX = heroX -SPEED;
    if (heroX <30){  
      heroX=30
    }
  }
  if (39 in keysDown) { // Player is holding right key
    heroX = heroX +SPEED;
    if (heroX >450){  
      heroX=450
    }
  }
}
};
/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monster1Image, monsterX, monsterY);
    ctx.drawImage(monster2Image, monsterX2, monsterY2);
    ctx.drawImage(monster3Image, monsterX3, monsterY3);
    ctx.drawImage(monster4Image, monsterX4, monsterY4);
    ctx.drawImage(monster5Image, monsterX5, monsterY5);
    ctx.drawImage(monster6Image, monsterX6, monsterY6);
    ctx.drawImage(monster3Image, monsterX7, monsterY7);
    ctx.drawImage(monsterImage, monsterX8, monsterY8);
    ctx.drawImage(monster2Image, monsterX9, monsterY9);
  }
  if (powerupReady){
    ctx.drawImage(powerupImage, powerupX, powerupY);
  }
  if (bulletReady) {
    ctx.drawImage(bulletImage, bulletX, bulletY);
  }
  if (lossAlertReady){
    if (isHit){
    monsterX = -200
    monsterX2 = -200
    monsterX3 = -200
    monsterX4 = -200
    monsterX5 = -200
    monsterX6 = -200
    monsterX7 = -200
    monsterX8 = -200
    monsterX9 = -200
    powerupX = -200
    ctx.drawImage(lossAlertImage, 30, 190);
  }
  }
  ctx.font = "bold 20px Arial";
  ctx.fillText(`${playerName}`, 400,30);
  ctx.fillText(`Left Swipes: ${monsterKill}`, 20, 30);
  var highScoreTemp = localStorage.getItem("highScore");
  ctx.fillText(`High Score: ${highScoreTemp}`,330,50)
  ctx.fillText(`Thumb Power Level: ${level+1}`,20,50)
  if (16 in keysDown){
    ctx.fillText(`Score History: ${scoreSheet}`,10,100)
  }
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update(); 
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

function launch(){
playerName  = document.getElementById("playerName").value;
document.getElementById("start").style.display = "none";
document.getElementById("playerName").style.display = "none";
document.getElementsByClassName("instructions").innerHTML = "";
loadImages();
setupKeyboardListeners();
main();
monsterDrop();
timeCounting();
}

function reset(){
  document.getElementById("reset").style.visibility = "hidden"
  timeCounting();
  updateScoreSheet()
  startTime  = Date.now();
  heroX = 240;
  heroY = 400;
  resetMonster();
  resetPowerup();
  elapsedTime = 0;
  isHit = false;
  monsterKill = 0;
  round_passed = 0;
  level = 0;
  SPEED = 5;
  BULLETSPEED = 20;
  snd.pause();
  snd.currentTime = 0;
  render();
}

function setHighScore(score){
  var highScore = localStorage.getItem("highScore");
if(highScore !== null){
    if (score > highScore) {
        localStorage.setItem("highScore", score);      
    }
}
else{
    localStorage.setItem("highScore", score);
}
}

function updateScoreSheet(){
  if (elapsedTime >0){
  scoreSheet.push(elapsedTime)
  }
}
function timeCounting() {
  myTime = setInterval(() => {
      elapsedTime += 1
  }, 1000)// every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
  return monsterY;
}

function timeOut() {
  clearInterval(myTime);
}

function monsterDrop(){
  if (monsterY9 == -450 || monsterY3 == -450 || monsterY4 == -450){
    round_passed = round_passed+1
  }
  if (monsterY9 > 500){
    monsterY9 = getRndInteger(-200,0)
    monsterX9 = getRndInteger(30,450);}
  if (monsterY8 > 500){
      monsterY8 = getRndInteger(-200,0)
      monsterX8 = getRndInteger(30,450);}
  if (monsterY7 > 500){
      monsterY7 = getRndInteger(-200,0)
      monsterX7 = getRndInteger(30,450);}
  if (monsterY6 > 500){
      monsterY6 = getRndInteger(-200,0)
      monsterX6 = getRndInteger(30,450);}
  if (monsterY5 > 500){
      monsterY5 = getRndInteger(-200,0)
      monsterX5 = getRndInteger(30,450);}
  if (monsterY4 > 500){
      monsterY4 = getRndInteger(-200,0)
      monsterX4 = getRndInteger(30,450);}
  if (monsterY3 > 500){
      monsterY3 = getRndInteger(-200,0)
      monsterXe = getRndInteger(30,450);}
  if (monsterY2 > 500){
      monsterY2 = getRndInteger(-200,0)
      monsterX2 = getRndInteger(30,450);}
  if (monsterY > 500){
      monsterY = getRndInteger(-200,0)
      monsterX = getRndInteger(30,450);}

    monsterY = monsterY+2 + round_passed
    monsterY2 = monsterY2 +2 + round_passed
    monsterY3 = monsterY3 +2 + round_passed
    monsterY4 = monsterY4 +2 + round_passed
    monsterY5 = monsterY5 +2 + round_passed
    monsterY6 = monsterY6 +2 + round_passed
    monsterY7 = monsterY7 +2 + round_passed
    monsterY8 = monsterY8 +2 + round_passed
    monsterY9 = monsterY9 +2 + round_passed
  return monsterY;
  }

function checkHit(){
  if(heroX <= (monsterX + 20)
  && monsterX <= (heroX + 20)
  && heroY <= (monsterY + 60)
  && monsterY <= (heroY + 60))  {
    isHit = true
    playEndingSound();
  }
  if( heroX <= (monsterX2 + 20)
  && monsterX2 <= (heroX + 20)
  && heroY <= (monsterY2 + 60)
  && monsterY2 <= (heroY + 60)){
      isHit = true
      playEndingSound();
  }
  if(heroX <= (monsterX3 + 20)
  && monsterX3 <= (heroX + 20)
  && heroY <= (monsterY3 + 60)
  && monsterY3 <= (heroY + 60)){
      isHit = true
      playEndingSound();
  }
  if(heroX <= (monsterX4 + 20)
  && monsterX4 <= (heroX + 20)
  && heroY <= (monsterY4 + 60)
  && monsterY4 <= (heroY + 60))
  {
    let x = (monsterX4+heroX)/2
    let y = (monsterY4+heroY)/2
      isHit = true
      playEndingSound();
  }
  if(heroX <= (monsterX5 + 20)
  && monsterX5 <= (heroX + 20)
  && heroY <= (monsterY5 + 60)
  && monsterY5 <= (heroY + 60)){
      isHit = true
      playEndingSound();
  }
  if(heroX <= (monsterX6 + 20)
  && monsterX6 <= (heroX + 20)
  && heroY <= (monsterY6 + 60)
  && monsterY6 <= (heroY + 60)){
      isHit = true
      playEndingSound();
  }
  if(heroX <= (monsterX7 + 20)
  && monsterX7 <= (heroX + 20)
  && heroY <= (monsterY7 + 60)
  && monsterY7 <= (heroY + 60)){
      isHit = true
      playEndingSound();
  }
  if(heroX <= (monsterX8 + 20)
  && monsterX8 <= (heroX + 20)
  && heroY <= (monsterY8 + 60)
  && monsterY8 <= (heroY + 60)){
      isHit = true
      playEndingSound();
  }
  if(heroX <= (monsterX9 + 20)
  && monsterX9 <= (heroX + 20)
  && heroY <= (monsterY9 + 60)
  && monsterY9 <= (heroY + 60)){
      isHit = true
      playEndingSound();
  }
}

function resetMonster(){
  monsterY = getRndInteger(-200,0)
  monsterY2 = getRndInteger(-200,0)
  monsterY3 = getRndInteger(-200,0)
  monsterY4 = getRndInteger(-200,0)
  monsterY5 = getRndInteger(-200,0)
  monsterY6 = getRndInteger(-200,0)
  monsterY7 = getRndInteger(-200,0)
  monsterY8 = getRndInteger(-200,0)
  monsterY9 = getRndInteger(-200,0)
  monsterX = getRndInteger(30,450);
  monsterX2 = getRndInteger(30,450);
  monsterX3 = getRndInteger(30,450);
  monsterX4 = getRndInteger(30,450);
  monsterX5 = getRndInteger(30,450);
  monsterX6 = getRndInteger(30,450);
  monsterX7 = getRndInteger(30,450);
  monsterX8 = getRndInteger(30,450);
  monsterX9 = getRndInteger(30,450);
}

function checkAndKillMonster(){
  if(bulletX <= (monsterX + 32)
  && monsterX <= (bulletX + 32)
  && bulletY <= (monsterY + 32)
  && monsterY <= (bulletY + 32))  {
    playMonsterDeathSound();
    monsterX = getRndInteger(30,450);
    monsterY = getRndInteger(-50,0);;
    resetBullet()
  }
  if( bulletX <= (monsterX2 + 32)
  && monsterX2 <= (bulletX + 32)
  && bulletY <= (monsterY2 + 32)
  && monsterY2 <= (bulletY + 32)){
    playMonsterDeathSound();
    monsterX2 = getRndInteger(30,450);
    monsterY2 = getRndInteger(-50,0);;
    resetBullet()
  }
  if(bulletX <= (monsterX3 + 32)
  && monsterX3 <= (bulletX + 32)
  && bulletY <= (monsterY3 + 32)
  && monsterY3 <= (bulletY + 32)){
    playMonsterDeathSound();
    monsterX3 = getRndInteger(30,450);
    monsterY3 = getRndInteger(-50,0);;
    resetBullet()
  }
  if(bulletX <= (monsterX4 + 32)
  && monsterX4 <= (bulletX + 32)
  && bulletY <= (monsterY4 + 32)
  && monsterY4 <= (bulletY + 32))
  {
    playMonsterDeathSound();
    monsterX4 = getRndInteger(30,450);
    monsterY4 = getRndInteger(-50,0);;
    resetBullet()
  }
  if(bulletX <= (monsterX5 + 32)
  && monsterX5 <= (bulletX + 32)
  && bulletY <= (monsterY5 + 32)
  && monsterY5 <= (bulletY + 32)){
    playMonsterDeathSound();
    monsterX5 = getRndInteger(30,450);
    monsterY5 = getRndInteger(-50,0);;
    resetBullet()
  }
  if(bulletX <= (monsterX6 + 32)
  && monsterX6 <= (bulletX + 32)
  && bulletY <= (monsterY6 + 32)
  && monsterY6 <= (bulletY + 32)){
    playMonsterDeathSound();
    monsterX6 = getRndInteger(30,450);
    monsterY6 = getRndInteger(-50,0);;
    resetBullet()
  }
  if(bulletX <= (monsterX7 + 32)
  && monsterX7 <= (bulletX + 32)
  && bulletY <= (monsterY7 + 32)
  && monsterY7 <= (bulletY + 32)){
    playMonsterDeathSound();
    monsterX7 = getRndInteger(30,450);
    monsterY7 = getRndInteger(-50,0);
    resetBullet()
  }
  if(bulletX <= (monsterX8 + 32)
  && monsterX8 <= (bulletX + 32)
  && bulletY <= (monsterY8 + 32)
  && monsterY8 <= (bulletY + 32)){
    playMonsterDeathSound();
    monsterX8 = getRndInteger(30,450);
    monsterY8 = getRndInteger(-50,0);;
    resetBullet()
  }
  if(bulletX <= (monsterX9 + 32)
  && monsterX9 <= (bulletX + 32)
  && bulletY <= (monsterY9 + 32)
  && monsterY9 <= (bulletY + 32)){
    playMonsterDeathSound();
    monsterX9 = getRndInteger(30,450);
    monsterY9 = getRndInteger(-50,0);;
    resetBullet()
  }
}

function resetBullet(){
  bulletX = -20
  bulletY = -50
  monsterKill = monsterKill +1
}

function shoot(){
  if (bulletY >= -20){
    bulletY = bulletY -BULLETSPEED
    }else if(bulletY == 0){
      bulletX = -20
      bulletY = -20
  } 
}

function powerupDrop(){
  if (powerupY > 500){
    resetPowerup()
  }
  powerupY = powerupY + 2
  if(heroX <= (powerupX + 32)
  && powerupX <= (heroX + 32)
  && heroY <= (powerupY + 32)
  && powerupY <= (heroY + 32))  {
    levelUp()
    resetPowerup()
  }
}

function resetPowerup(){
  powerupY = -600
  powerupX = getRndInteger(30,450)  
}

function levelUp(){
  level = level +1
  SPEED +=1
  BULLETSPEED +=10
  playLevelUpSound();
}
 function checkLevelUp(){
  if (monsterKill % 20 == 0 && monsterKill >=20){
    levelUp()
    monsterKill = monsterKill +1
  }
}

function playEndingSound(){
setTimeout(function(){
  snd.play();
  setTimeout(function(){
      snd.pause();
      snd.currentTime = 0;
  }, 4000);
}, 1000);
}

function playLevelUpSound(){
  setTimeout(function(){
    snd2.play();
    setTimeout(function(){
        snd2.pause();
        snd2.currentTime = 0;
    }, 1000);
  }, 500);
  }

function playMonsterDeathSound(){
  setTimeout(function(){
    snd1.play();
    setTimeout(function(){
        snd1.pause();
        snd1.currentTime = 0;
    }, 370);
  }, 100);
  }