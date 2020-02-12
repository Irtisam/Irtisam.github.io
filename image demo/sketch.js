// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let eye;
let scalar = 1.0;

function preload() {
  eye = loadImage('assets/sharingan.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill("red");
  // rect(mouseX, mouseY, w, h);
  image(eye, mouseX, mouseY, scalar*eye.width, scalar*eye.height);
}

function mouseWheel(event) {
  if (event.delta < 0) {
    scalar *= 1.1;

  }
  else {
    scalar *= 0.9;
  }
}

