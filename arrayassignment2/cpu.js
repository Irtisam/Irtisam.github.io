function cpuTurn() {
  // AI move
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = cpu;
        let score = minimax(board, 0);
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

function minimax(board, depth, maximizing) {
  return 1;
}