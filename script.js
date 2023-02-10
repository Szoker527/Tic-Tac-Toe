//
const gameBoard = {
  gameArray: ["X", "O", "X", "O", "X", "O", "X", "O", "X"],
};

const newPlayer = function (name, weapon) {
  return {
    name,
    weapon,
  };
};

const playerO = newPlayer("playerOne", "O");
const playerX = newPlayer("player   Two", "X");

const displayAction= (() => {
    let marker 
    const page = document.querySelectorAll(".game");
    const buttons = document.querySelectorAll(".btn");
    const showArray = (array) => {
      for (let index = 0; index < page.length; index++) {
        page[index].addEventListener("click", function () {
          console.log(array[index])
        });
        page[index].innerHTML = array[index];
      }
    };
    const newMakrer = () => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                marker = buttons[i].id
              console.log(marker);
            })
        }
    }
    return {
      showArray,
      newMakrer

    };
  })();

displayAction.showArray(gameBoard.gameArray);
displayAction.newMakrer()
