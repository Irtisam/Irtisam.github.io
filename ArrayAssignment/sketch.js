// Array Assignment - Pong
// Irtisam Islam
// April 20, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let dots = [];
let dSize = 10;


function setup() {
  createCanvas(1200, 750);

  // For loop used to determine the spacing of the squares that create the midline
  for (let y = dSize/2; y<height; y+=dSize*2) {
    dots.push(createVector([width/2-dSize/2], [y]))
  }
}

// Sets up the background and calls the drawSquare() function
function draw() {
  background(0,0, 45);

  noStroke();
  fill(255);
  drawSquares();
}

// Function that creates the individual square that is used to make a "dotted" midline in the game window
function drawSquares() {
  for (let i = 0; i < dots.length; i++) {
    let x = dots[i].x;
    let y = dots[i].y;

    rect(x, y, dSize, dSize);

  }
}
