const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");

let player = "X";
let gameActive = true;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(function(cell) {

  cell.addEventListener("click", function() {

    if (cell.textContent !== "" || !gameActive) {
      return;
    }

    cell.textContent = player;

    checkWinner();

    if (gameActive) {
      player = player === "X" ? "O" : "X";
      status.textContent = "Player " + player + "'s Turn";
    }

  });

});

function checkWinner() {

  for (let pattern of winningPatterns) {

    let a = pattern[0];
    let b = pattern[1];
    let c = pattern[2];

    if (
      cells[a].textContent !== "" &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    ) {

      status.textContent = "Player " + player + " Wins! 🎉";

      gameActive = false;

      return;
    }
  }

  let draw = [...cells].every(function(cell) {
    return cell.textContent !== "";
  });

  if (draw) {
    status.textContent = "It's a Draw! 🤝";
    gameActive = false;
  }
}

restart.addEventListener("click", function() {

  cells.forEach(function(cell) {
    cell.textContent = "";
  });

  player = "X";
  gameActive = true;

  status.textContent = "Player X's Turn";
});