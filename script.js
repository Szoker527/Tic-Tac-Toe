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
let playerOneName = "Player X"
let playerTwoName = "Player O"
let gameState;

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
        const playerOneLength = players[0].position.length;
        const playerTwoLength = players[1].position.length;
        const newArray = this.position.filter(num => array.includes(num));
        if (newArray.length === 3) {
          return "win"
        } 
        if ((playerOneLength === 4 && playerTwoLength === 5) || (playerTwoLength === 4 && playerOneLength === 5)) {
          return "draw"
        }
      }
    },
    {
      name: "playerTwoName",
      token: "O",
      position: [],
      checkArray: function(array) {
        const playerOneLength = players[0].position.length;
        const playerTwoLength = players[1].position.length;
        const newArray = this.position.filter(num => array.includes(num));
        if (newArray.length === 3) {
          return "win"
        } 
        if ((playerOneLength === 4 && playerTwoLength === 5) || (playerTwoLength === 4 && playerOneLength === 5)) {
          return "draw"
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
  
  const resetGame = (gameState) => {
    if (gameState === "reset") {
      removeAllChildNodes(container);
      const newGameBoard = document.createElement("div");
      newGameBoard.classList.add("game-board");
      container.appendChild(newGameBoard)
    }
  }

  const endGame = (result, name) => {
    console.log(result)
    removeAllChildNodes(container);
    const displayContainer = document.createElement("div");
    const gameDisplayResult = document.createElement("div");

    displayContainer.classList.add("game-result");
    gameDisplayResult.classList.add("result-text");
    container.appendChild(displayContainer)
    displayContainer.appendChild(gameDisplayResult);

    if (result === "win") {
      gameDisplayResult.textContent = `The Winner is ${name}`
    }
    else if (result === "draw") {
      gameDisplayResult.textContent = "DRAW"
    }
  }

  const checkResult = (player) => {
    for (let i = 0; i < winningCombination.length; i++) {
      const result = player.checkArray(winningCombination[i])
      if (result === "win") {
        endGame("win", player.name)
        break;
      }
      if (result === "draw") {
        endGame("draw")
        break;
      }
    }
  }
  

  const playGame = (row, column, player) => {
     const change = board.changeCell(row, column, getActivePlayer().token)
     if (change === "taken") {
      return "This place is already occupied"
     }
     addPosition(row, column)
     checkResult(player)
     switchPlayerTurn()
     showResult()
  }

  return {
    playGame,
    getActivePlayer,
    getBoard: board.getBoard,
    changePlayerName,
    resetGame
  }
}

function ScreenController(buttonReset) {
  const game = gameControl();
  if (buttonReset === "reset") {
    game.resetGame(buttonReset)
  }

  const boardDiv = document.querySelector('.game-board');
  const playerTurnDiv = document.querySelector('.text-display');
  
  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";
    // get the newest version of the board and player turn
    const board = game.getBoard();
    game.changePlayerName(playerOneName, playerTwoName);
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

  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();
}

btnStart.addEventListener("click", function() {
  btnStart.style.display = "none";
  btnReset.style.display = "inline-block"
  btnName.style.display = "inline-block";
  if (!gameState) {
    gameState = "started"
    ScreenController();
  }
})

btnReset.addEventListener("click", function(e) {
  if (gameState === "started") {
    console.log(e.target.id)
    ScreenController(e.target.id);
  }
})

form.addEventListener("submit", (event) => {
  event.preventDefault();
  modal.style.display = "none";
  playerOneName = playerOne.value
  playerTwoName = playerTwo.value
  if (!playerOne.value) {
    playerOneName = "Player X"
  }
  if (!playerTwo.value) {
    playerTwoName = "Player O"
  }
});


