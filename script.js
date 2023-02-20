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
    return boardWithCellValues;
  }

  const changeCell = (row, column, player) => {
    if (board[row][column].getValue() === "X" || board[row][column].getValue() === "O") {
      return "taken"
    }
    board[row][column].addToken(player);
    console.log(board[row][column].getValue())
  }

  return {
    printBoard,
    changeCell,
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
    addToken,
  }

}

function gameControl () {
  const board = gameBoard();

  const players = [
    {
      name: "playerOneName",
      token: "X",
      position: [],
    },
    {
      name: "playerTwoName",
      token: "O",
      position: [],
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

  const winningCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [7, 5, 3],
  ]
  
  const addPosition = (row, column) => {
    if(row === 0 && column === 0) {
      activePlayer.position.push(1)
    }
    if(row === 0 && column === 1) {
      activePlayer.position.push(2)
    }
    if(row === 0 && column === 2) {
      activePlayer.position.push(3)
    }
    if(row === 1 && column === 0) {
      activePlayer.position.push(4)
    }
    if(row === 1 && column === 1) {
      activePlayer.position.push(5)
    }
    if(row === 1 && column === 2) {
      activePlayer.position.push(6)
    }
    if(row === 2 && column === 0) {
      activePlayer.position.push(7)
    }
    if(row === 2 && column === 1) {
      activePlayer.position.push(8)
    }
    if(row === 2 && column === 2) {
      activePlayer.position.push(9)
    }
    console.log(activePlayer.position)
  }

  const checkWin = (player) => {
    if (player.length < 2) {
      return "wow"
    }

    winningCombination.forEach(array => {
      for (let i = 0; i < player.length; i++) {
        if (array[i] === player[i]) {
          console.log("nice")
        }
        
      }
    })
  }

  const playGame = (row, column) => {
     const change = board.changeCell(row, column, getActivePlayer().token)
     if (change === "taken") {
      return "This place is already occupied"
     }
     console.log(activePlayer)
     addPosition(row, column)
     checkWin(activePlayer.position)
     switchPlayerTurn()
     showResult()
  }

  return {
    playGame
  }
}

const game = gameControl();