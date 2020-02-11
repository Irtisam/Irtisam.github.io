// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let eye;

function preload() {
  eye = loadImage('assets/sharingan.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill("red");
  // rect(mouseX, mouseY, 75, 75);
  image(eye, mouseX, mouseY);
}

