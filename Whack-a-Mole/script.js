
let moles = document.querySelectorAll(".mole");
let holes = document.querySelectorAll(".hole");
let difficulty_buttons = document.querySelectorAll(".diff-button");
let scoreBoard = document.querySelector(".score");
let high = document.querySelector(".high-score");
let stop_button = document.querySelector("#stop");

let playTime = 10 * 1000;
let score = 0;
let last = -1;
let isTimeout = false;
let playTimeOut = null;
let minTime = 400,
  maxTime = 800;
let highest = parseInt(localStorage.getItem("highest")) || 0;
high.textContent = `${highest}`;

function randomHole() {
  let index = Math.floor(Math.random() * holes.length);
  if (index != last) {
    last = index;
    return holes[index];
  } else return randomHole();
}

function randomTime(min = minTime, max = maxTime) {
  let time = Math.round(Math.random() * (max - min) + min);
  return time;
}

function peepMoles() {
  let hole = randomHole();
  let time = randomTime();
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!isTimeout) peepMoles();
    else {
      displayHighest();
    }
  }, time);
}

function updateScore(eventObj) {
  if (!eventObj.isTrusted) return;
  score++;
  scoreBoard.textContent = `${score < 10 ? "0" : ""}${score}`;
  this.classList.remove("up");
}

function startGame() {
  isTimeout = false;
  score = 0;
  last = -1;
  scoreBoard.textContent = `00`;
  displayHighest();
  playTimeOut = setTimeout(() => (isTimeout = true), playTime);
  peepMoles();
}

function displayHighest() {
  if (!(score > highest)) return;
  highest = score;
  localStorage.setItem("highest", `${highest}`);
  high.textContent = `${highest}`;
}

function stopGame() {
  isTimeout = true;
  clearTimeout(playTimeOut);
}

function setDifficulty(event) {
  console.log(this);
  minTime = parseInt(this.dataset.min);
  maxTime = parseInt(this.dataset.max);
  document.querySelector(".active").classList.remove("active");
  this.classList.add("active");
  stopGame();
}

moles.forEach((mole) => mole.addEventListener("click", updateScore));
difficulty_buttons.forEach((button) => button.addEventListener("click", setDifficulty));
