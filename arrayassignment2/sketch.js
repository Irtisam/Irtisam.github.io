// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let cpu = 'X';
let human = 'O';

let currentPlayer = human;

let w; //= width / 3;
let h; //= height / 3;


function setup() {
  createCanvas(800, 800);
   w = width / 3;
   h = height / 3;
}

function triple(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWin() {
  let winner = null;

  //Check rows
  for (let i = 0; i < 3; i++) {
    if (triple(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  //Checks columns
  for (let i = 0; i < 3; i++) {
    if (triple(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  //Checks diagonal
  if (triple(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }

  //Checks diagonal
  if (triple(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

// function isEmpty() {
//   let index = floor(random(empty.length));
//   let spot = empty.splice(index, 1)[0];
//   let i = spot[0];
//   let j = spot[1];
//   board[i][j] = players[currentPlayer];
//   currentPlayer = (currentPlayer + 1) % players.length;
// }


function draw() {
  background(0, 0, 45);
  drawBoard();
  symbols();
  results();
}

function drawBoard() {
  strokeWeight(10);
  stroke(255)
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
}

function symbols() {
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(64);
      strokeWeight(10);
      if (spot === human) {
        stroke(255);
        noFill();
        ellipse(x, y, w / 2);
      } else if (spot === cpu) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
    }
  }
}

function results() {
  let result = checkWin();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}

function mousePressed() {
  if (currentPlayer === human) {
    // player's move
    let i = floor(mouseX/w);
    let j = floor(mouseY/h);
    
    // If move works
    if (board[i][j] === '') {
      board[i][j] = human;
      currentPlayer = cpu;
      // AI move
      let empty = [];
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          if (board[k][l] === '') {
            empty.push({k, l});
          }
        }
      }
      let move = random(empty);
      board[move.k][move.l] = cpu;
      currentPlayer = human;
    }
  }
}