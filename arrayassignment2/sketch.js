// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let board = [
  ['','',''],
  ['','',''],
  ['','',''],
];

let players = ['X','O'];
let currentPlayer;
let empty = [];

function setup() {
  createCanvas(800, 800);
  currentPlayer = random(players);
}

function draw() {
  background(0,0,45);
  symbols();
  drawBoard();
}

function symbols() {
  let w = width/3;
  let h = height/3; 
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      x = w * i + w/2;
      y = h * j + h/2;
      let spot = board[i][j];
      textSize(64);
      strokeWeight(10);
      if (spot === players[1]) {
        stroke(255);
        noFill();
        ellipse(x, y, w/2);
      }
      else if (spot === players[0]) {
        let xr = w/4;
        line(x-xr, y-xr, x+xr, y+xr);
        line(x+xr, y-xr, x-xr, y+xr);
      }
    }
  }
}

function drawBoard() {
  let w = width/3;
  let h = height/3; 
  stroke(255)
  line(w, 0, w, height);
  line(w*2, 0, w*2, height);
  line(0, h, width, h);
  line(0, h*2, width, h*2);
}