// Tic Tac Toe game with AI
// Irtisam Islam
// April 20, 2020
//
// Extra for Experts:
// I incorporated the use of basic AI where the computer player chooses the best move based on the human player's
// move. This is done by using the minimax algorithm. This algorithm works like a flow chart and assigns values of -1, +1, or 0 to each action the player or CPU makes. The flow chart's 
// depth starts from one value and then the CPU chooses the largest value that branches off from the inital value making it the maximizing player. the minimizing value is determined
// by the player who will most likely make a move that is in favor of them. Each time a value is chosen by CPU or player, it branches off into multiple new outcomes and depending on 
// who's turn it is, the maximizing or minizing value is chosen. 

// An array of arrays that designates a spot for each square on the board
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// Assigns the symbols to the computer and human player and assigns the first player as the human
let cpu = 'X';
let human = 'O';
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