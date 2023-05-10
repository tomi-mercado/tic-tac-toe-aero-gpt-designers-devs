var squares = document.querySelectorAll(".square");
var restartBtn = document.querySelector("#restart");
var currentPlayer = "x";
var gameOver = false;

// Load the sounds
var winSound = new Audio(
  "http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Coin_Sound_Effect.mp3"
);
var selectSound = new Audio(
  "http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Coin_Sound_Effect.mp3"
);

function handleClick(event) {
  if (gameOver) {
    return;
  }
  if (
    !event.target.classList.contains("x") &&
    !event.target.classList.contains("o")
  ) {
    event.target.classList.add(currentPlayer);
    checkWin();
    changePlayer();
    // Play the select sound
    selectSound.play();
  }
}

function checkWin() {
  var winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (var i = 0; i < winCombinations.length; i++) {
    if (
      squares[winCombinations[i][0]].classList.contains(currentPlayer) &&
      squares[winCombinations[i][1]].classList.contains(currentPlayer) &&
      squares[winCombinations[i][2]].classList.contains(currentPlayer)
    ) {
      alert((currentPlayer === "x" ? "Star" : "Mushroom") + " wins!");
      // Play the win sound
      winSound.play();
      gameOver = true;
      return;
    }
  }

  var isTie = true;
  for (var i = 0; i < squares.length; i++) {
    if (
      !squares[i].classList.contains("x") &&
      !squares[i].classList.contains("o")
    ) {
      isTie = false;
      break;
    }
  }
  if (isTie) {
    alert("It's a tie!");
    gameOver = true;
    return;
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
}

function restartGame() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].classList.remove("x", "o");
  }
  currentPlayer = "x";
  gameOver = false;
}

restartBtn.addEventListener("click", restartGame);
for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", handleClick);
}
