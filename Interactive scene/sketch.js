// Colorful Rotating Square
// Irtisam Islam
// March 9th, 2020
//
// Extra for Experts: Utilization of the mouse wheel
// - describe what you did to take this project "above and beyond"

let scalar = 1.0;
let angle = 0;
let bgColor = 0;
let rectColor = 0;
let rot = 0;
let changeColor = false;
let rotSpeedUp = false;
let rotSpeedDown = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = random(255);
  rectColor = random(255);
  rectMode(CENTER);
}


function draw() {
  background(bgColor);
  drawRect()
}

function keyPressed() {
  if (key === "w") {
    changeColor = true;
  }
  if (key === "d") {
    rotSpeedUp = true;
  }
  if (key === "a") {
    rotSpeedDown = true;
  }
}

function keyReleased() {
  if (key === 'w') {
    changeColor = false;
  }
  if (key === 'd') {
    rotSpeedUp = false;
  }
  if (key === "a") {
    rotSpeedDown = false;
  }
}

function drawRect() {
  noStroke();
  rot += 0.04;
  translate(mouseX, mouseY);
  rotate(rot);
  fill(rectColor);
  rect(0, 0, scalar*100, scalar*100);
  
 
  if (changeColor) {
    rectColor = color(random(255), random(255), random(255));
    bgColor = color(random(255), random(255), random(255));
  }
  if (rotSpeedUp) {
    rot += 0.1;
  }
  if (rotSpeedDown) {
    rot -= 0.03;
  }
}



function mouseWheel(event) {
  if (event.delta < 0) {
    scalar *= 1.1;

  }
  else {
    scalar *= 0.9;
 }
}
