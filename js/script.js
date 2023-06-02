'use strict';

/**
 * Global Variables
 *
 */
// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

/**
 * Helper Functions
 *
 */
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

/**
 * Main Functions
 *
 */
const rollingDice = function () {
  // 1. Generate a random dice roll
  const dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `assets/dice-${dice}.png`;

  // 3. Check for rolled 1
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    // current0El.textContent = currentScore;
  } else {
    // Set current score to zero & switch players
    switchPlayer();
  }
};

const holdScore = function () {
  // Add current score to total score & display it
  scores[activePlayer] += Number(
    document.getElementById(`current--${activePlayer}`).textContent
  );
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //Check if score >= 100
  if (scores[activePlayer] >= 10) {
    // Set a special style to the winner
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    // Disable the Roll & Hold buttons functionality
    btnRoll.removeEventListener('click', rollingDice);
    btnHold.removeEventListener('click', holdScore);
  } else {
    // Set current score to zero & switch players
    switchPlayer();
  }
};

// Rolling dice funtcionality
btnRoll.addEventListener('click', rollingDice);

// Hold button functionality
btnHold.addEventListener('click', holdScore);
