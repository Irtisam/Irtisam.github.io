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
          let score = minimax(board, depth +1 , false);
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