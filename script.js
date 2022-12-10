'use strict';

// Selecting the elemaents
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

const score = [];
let currentScore;
let activePlayer;

init();
// Starting condotions
function init() {
    score[0] = 0;
    score[1] = 0;
    currentScore = 0;
    activePlayer = 0;

    rollBtn.disabled = false;
    holdBtn.disabled = false;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    if (document.querySelector('.player--winner') != null)
        document
        .querySelector('.player--winner')
        .classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');
}

// Rolling dice functionality
rollBtn.addEventListener('click', function() {
    console.log('rolling');

    let randNum = Math.ceil(Math.random() * 6);
    diceEl.src = `dice-${randNum}.png`;
    diceEl.classList.remove('hidden');
    if (randNum != 1) {
        // Add dice to the current score
        currentScore += randNum;
        let currentPlayer = (document.querySelector(
            `#current--${activePlayer}`
        ).textContent = currentScore);
    } else {
        // switch to the next player
        switchPlayers();
    }
});

holdBtn.addEventListener('click', function() {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
        score[activePlayer];
    if (!(score[activePlayer] >= 100)) {
        switchPlayers();
    } else {
        // The player wins the game
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        rollBtn.disabled = true;
        holdBtn.disabled = true;
        diceEl.classList.add('hidden');
    }
});

newBtn.addEventListener('click', init);

function switchPlayers() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}