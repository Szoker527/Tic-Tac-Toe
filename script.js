function gameBoard () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }

  }

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  }

  const changeCell = (row, column, player) => {
    if (board[row][column].getValue() === "X" || board[row][column].getValue() === "O") {
      return "taken"
    }
    board[row][column].addToken(player)
    console.log(board[row][column].getValue())
  }
  return {
    printBoard,
    changeCell
  }

}

function Cell () {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    getValue,
    addToken
  }

}

function gameControl () {
  const board = gameBoard();

  const players = [
    {
      name: "playerOneName",
      token: "X"
    },
    {
      name: "playerTwoName",
      token: "O"
    }
  ];

  let activePlayer = players[0];
  
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;
  
  const showResult = () => {
    board.printBoard()
  }

  const playGame = (row, column) => {
     const change = board.changeCell(row, column, getActivePlayer().token)
     console.log(change);
     console.log(getActivePlayer().token)
     if (change === "taken") {
      return "This place is already occupied"
     }
     switchPlayerTurn()
     showResult()
  }

  return {
    playGame
  }
}

const game = gameControl();