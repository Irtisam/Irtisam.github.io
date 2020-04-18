
// Function that carries out the CPU's turn using the minimax() function to determine the best spot, then allows the human to make their move
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