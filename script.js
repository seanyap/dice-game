"use strict";

// grab all elements you need to change/update and save em in variables bc we need to use em multiple times throughout the code instead of selecting the over and over again
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// current score

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0; // 0 = player1; 1 = player2
let playing = true;

// function to switch player
const switchPlayer = function () {
  // switch to next player (both in user interface and our program)
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// event listener function to roll dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1; // number range 1 - 6

    // 2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for dice #1: if true, switch to new player
    if (dice !== 1) {
      // add generated dice number to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// event listener function to hold
btnHold.addEventListener("click", function () {
  if (playing) {
    // update total scores
    scores[activePlayer] += currentScore;
    // display scores
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // check if total scores is >= 100
    if (scores[activePlayer] >= 20) {
      // finish game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // update title to show winner
      document.getElementById(`name--${activePlayer}`).textContent = "WINNER!";

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // else switch player
      switchPlayer();
    }
  }
});

// function to reset game when player won / reset
btnNew.addEventListener("click", function () {
  // reset state: total scores for player 1 & 2 and current score
  playing = true;
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;

  // update user interface to reflect new scores
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];

  // reset player title
  document.getElementById("name--0").textContent = "Player 1";
  document.getElementById("name--1").textContent = "Player 2";

  // remove winner class if player won
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  // set default active player to player 1
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
});
