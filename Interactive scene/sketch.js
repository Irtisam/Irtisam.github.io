// Colorful Rotating Square
// Irtisam Islam
// March 9th, 2020
//
// Extra for Experts:
// Utilization of the mouse wheel to change the size of the square
// Use of rotate and translate to continuously rotate the square where the user's cursor is.

// variables used to control the properties of the square and background such as color, size and rotation speed. 
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
  
  // Chooses the background and square color to a random shade white, grey or black. 
  bgColor = random(255);
  rectColor = random(255);
  
  // Draws the rectangle from its center, rather than from a corner. 
  rectMode(CENTER);
}

// Sets the random background color and calls the drawRect() function. 
function draw() {
  background(bgColor);
  drawRect()
}

// Changes the global boolean variables that control the square's rotation speed and color to true when a specific key is pressed
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

// Changes global boolean variables back to their original state of false when their corresponding keys are released. 
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

// Function that creates the initial rotating square, and also changes its properties when the boolean variables become true. 
function drawRect() {
  noStroke();
  
  // inital rotation speed of square, translates on coordinates of mouse. 
  rot += 0.04;
  translate(mouseX, mouseY);
  rotate(rot);
  
  // fills the square color with the variable rectColor which randomly chooses 3 RGB values when it is true. 
  fill(rectColor);
  
  // draws the square and changes its size depending on the value of the variable scalar.
  rect(0, 0, scalar*100, scalar*100);
  
  // Changes the square's color and rotation speed when the conditions are true. 
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

// Function that changes the value of scalar when the mouse wheel is scrolled, which is used in determining the size of the square. 
function mouseWheel(event) {
  if (event.delta < 0) {
    scalar *= 1.1;

  }
  else {
    scalar *= 0.9;
 }
}
