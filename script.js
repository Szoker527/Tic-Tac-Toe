const btnStart = document.getElementById("start");
const btnReset = document.getElementById("reset");
const btnName = document.getElementById("name-change");
const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("myModal");
const form = document.querySelector("#myForm");
const playerOne = document.querySelector("#first-player");
const playerTwo = document.querySelector("#second-player");
const gameContainer = document.querySelector(".game-board");
const container = document.querySelector(".container");

// Modal start
btnName.onclick = function () {
  modal.style.display = "flex";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
// Modal end

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function gameBoard () {
  const rows = 3;
  const columns = 3;
  let board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

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
    getBoard,
    printBoard,
    changeCell
  }

}

function Cell () {
  let value

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    getValue,
    addToken,
  }

}

function gameControl() {
  const board = gameBoard();

  const players = [
    {
      name: "playerOneName",
      token: "X",
      position: [],
      checkArray: function(array) {
        const newArray = this.position.filter(num => array.includes(num));
        if (newArray.length === 3) {
          console.log("Winner!")
        }
      }
    },
    {
      name: "playerTwoName",
      token: "O",
      position: [],
      checkArray: function(array) {
        const newArray = this.position.filter(num => array.includes(num));
        if (newArray.length === 3) {
          console.log("Winner!")
        }
      }
    }
  ];

  let activePlayer = players[0];
  
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  
  const getActivePlayer = () => activePlayer;

  const changePlayerName = (playerX, playerO) => {
    if (!playerX) {
      playerX = "Player X"
    }
    if (!playerO) {
      playerO = "Player O"
    }
    players[0].name = playerX
    players[1].name = playerO
    console.log(players[0].name)
    console.log(players[1].name)
  }
  
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
    if(row == 0 && column == 0) {
      activePlayer.position.push(1)
    }
    if(row == 0 && column == 1) {
      activePlayer.position.push(2)
    }
    if(row == 0 && column == 2) {
      activePlayer.position.push(3)
    }
    if(row == 1 && column == 0) {
      activePlayer.position.push(4)
    }
    if(row == 1 && column == 1) {
      activePlayer.position.push(5)
    }
    if(row == 1 && column == 2) {
      activePlayer.position.push(6)
    }
    if(row == 2 && column == 0) {
      activePlayer.position.push(7)
    }
    if(row == 2 && column == 1) {
      activePlayer.position.push(8)
    }
    if(row == 2 && column == 2) {
      activePlayer.position.push(9)
    }
  }

  const checkWin = (player) => {
    console.log(player)
    winningCombination.forEach(array => {
        player.checkArray(array)
    })
  }
  
  const resetGame = () => {
    players[0].position = []
    players[1].position = []
  }

  const playGame = (row, column, player) => {
     const change = board.changeCell(row, column, getActivePlayer().token)
     if (change === "taken") {
      return "This place is already occupied"
     }
     addPosition(row, column)
     checkWin(player)
     switchPlayerTurn()
     showResult()
  }

  return {
    playGame,
    getActivePlayer,
    getBoard: board.getBoard,
    clearBoard: board.clearBoard,
    resetGame,
    changePlayerName
  }
}

function ScreenController(gameState) {

  if (gameState === "reset") {
    removeAllChildNodes(container);
    const newGameBoard = document.createElement("div");
    newGameBoard.classList.add("game-board");
    container.appendChild(newGameBoard)
  }
  
  const game = gameControl();
  const boardDiv = document.querySelector('.game-board');
  const playerTurnDiv = document.querySelector('.text-display');
  
  
  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";
    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    // Render board squares
    board.forEach((row, indexRow) => {
      row.forEach((cell, indexColumn) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("game");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function 
        cellButton.dataset.column = indexColumn
        cellButton.dataset.row = indexRow
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      })
    })
  }

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const activePlayer = game.getActivePlayer();
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn && !selectedRow) return;
    
    game.playGame(selectedRow, selectedColumn, activePlayer);
    updateScreen();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerX = playerOne.value;
    const playerO = playerTwo.value;
    game.changePlayerName(playerX, playerO);
  });

  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();
}

btnStart.addEventListener("click", function() {
  ScreenController();
})

btnReset.addEventListener("click", function(e) {
  console.log(e.target.id)
  ScreenController(e.target.id);
})


