// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let scalar = 1.0;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
}


function draw() {
  background(220);
  drawRect()
}

function drawRect() {
  noStroke();
  fill("red");
  rect(mouseX-10, mouseY-10, scalar*100, scalar*100,);
}

function mouseWheel(event) {
  if (event.delta < 0) {
    scalar *= 1.1;

  }
  else {
    scalar *= 0.9;
  }
}
