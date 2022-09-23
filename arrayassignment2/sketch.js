// An array of arrays that designates a spot for each square on the board
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// Assigns the symbols to the computer and human player and assigns the first player as the human
let cpu = 'X';
let human = 'O';

// State variable to determine whose turn it is.
let currentPlayer = human;

// Variables to that are later defined when drawing the board and the symbols
let w; 
let h; 

// Creates the canvas, sets the stroke weight and defines the w and h variables, also allows the CPU to make the first move
function setup() {
  createCanvas(800, 800);
  strokeWeight(10);
  w = width / 3;
  h = height / 3;
  cpuTurn();
}

// Function that is used in another function to determine if three consecutive symbols have been drawn on the board
function triple(a, b, c) {
  return a == b && b == c && a != '';
}

// Function to check rows, columns, and diagonals using the triple() function to determine a winner
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

  //Checks other diagonal
  if (triple(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  // Variable created to detect open spots and the board when a specific element in the board array is empty. Decreases as the player/CPU places their symbols.
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        openSpots++;
      }
    }
  }

  // Determines tie if there are no open spots and winner variable has not changed from null after checking the patterns. Otherwise returns the winner
  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

// Calls other functions and draws the background
function draw() {
  background(0, 0, 45);
  drawBoard();
  symbols();
  results();
}

// Draws the Tic Tace Toe board
function drawBoard() {
  stroke(255)
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
}

// Nested for loop that checks every slot of the board and assigns the variable 'spot' to each element of the board array. If the spot of the board is human, draws 'O'
// if CPU, draws 'X'
function symbols() {
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
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

// Announces the winner or tie at the end of every game 
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

// Lets the player click the slot of the board they want to put their symbol and then calls the cpuTurn() function to let the CPU make its move
function mousePressed() {
  if (currentPlayer === human) {
    // player's move
    let i = floor(mouseX/w);
    let j = floor(mouseY/h);
    
    // If move works, assigns slot of board to human and lets the CPU do its turn
    if (board[i][j] === '') {
      board[i][j] = human;
      currentPlayer = cpu;
      cpuTurn();
    }
  }
}


function cpuTurn() {
  // AI move
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = cpu;
        let score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = {i, j};
        }
      }
    }
  }
  board[move.i][move.j] = cpu;
  currentPlayer = human;
}
let scores = {
  X : 1,
  O : -1,
  tie : 0
}

// Function that determines the best move for the CPU by assigning a score to each action the player makes the player makes
// -1 is the worst scenario for the CPU, +1 is the best, and 0 is a tie. Always attempts for the maximizing value or tries to prevent the minimizing value. 
function minimax(board, depth, maximizing) {
  let result = checkWin();
  if (result !== null) {
    return scores[result];
  }

  if (maximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = cpu;
          let score = minimax(board, depth + 1 , false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  }
  else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = min(score, bestScore); 
        }
      }
    }
    return bestScore;
  }
}