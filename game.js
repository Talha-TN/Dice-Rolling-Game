'use strict';

// selecting the elements;
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

let playerOne = document.querySelector('#name--0');
let playerTwo = document.querySelector('#name--1');

let score; // array that store the initial scores  // or total score of the player
let currentScore; // initially current score will be 0
let activePlayer;
let playing;

const startGame = function () {
  score = [0, 0]; // array that store the initial scores  // or total score of the player
  currentScore = 0; // initially current score will be 0
  activePlayer = 0;
  playing = true;
  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

startGame(); // caling the start game function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // set the current score 0 when player switch
  currentScore = 0;
  player0El.classList.toggle('player--active'); // changing the class to show color on the active class
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// starting conditions;
score0El.textContent = 0; // set the initial score of the player = 0
score1El.textContent = 0;
diceEl.classList.add('hidden'); // initially remove the dice by applying the hidden class to it

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // change the dice image according to the dice roll

    // check for roll 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to the active player
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // check if a player has a score >= 100
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // set thee winners name;
      if (activePlayer === 0) {
        playerOne.textContent = 'Player 1 wins';
        playerTwo.textContent = 'player 2';
      } else {
        playerOne.textContent = 'Player 1 ';
        playerTwo.textContent = 'player 2 wins';
      }
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', startGame); // caling the start game function
