// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let scalar = 1.0;
let angle = 0;
let bgColor = 0;
let rectColor = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = random(255);
  rectColor = random(255);
}


function draw() {
  background(220);
  drawRect()
}

function drawRect() {
  noStroke();
  fill(rectColor);
  rect(mouseX, mouseY, scalar*100, scalar*100,);
  if (keyIsPressed) {
    rectColor = color(random(255), random(255), random(255));
  }
}

function keyPressed()

function mouseWheel(event) {
  if (event.delta < 0) {
    scalar *= 1.1;

  }
  else {
    scalar *= 0.9;
 }
}
