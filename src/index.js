'use strict';

import './index.css';
import dice1 from './images/dice-1.png';
import dice2 from './images/dice-2.png';
import dice3 from './images/dice-3.png';
import dice4 from './images/dice-4.png';
import dice5 from './images/dice-5.png';
import dice6 from './images/dice-6.png';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');

const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

const dices = new Array(dice1, dice2, dice3, dice4, dice5, dice6);

let scores, currentScore, activePlayer, game;

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    game = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');
};

init();

function switchPlayerHandler() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

function rollDiceHandler() {
    if (game) {
        const dice = Math.trunc(Math.random() * dices.length);
        diceEl.classList.remove('hidden');
        diceEl.src = dices[dice];

        if (dice !== 0) {
            currentScore = currentScore + dice + 1;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayerHandler();
        }
    }
};

function holdScoreHandler() {
    if (game) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            game = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            switchPlayerHandler();
        }
    }
};

buttonRoll.addEventListener('click', rollDiceHandler);
buttonHold.addEventListener('click', holdScoreHandler);
buttonNew.addEventListener('click', init);