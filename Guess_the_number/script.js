let randomNumber = parseInt(Math.random() * 10 + 1);

let userInput = document.getElementById('guessField');
let button = document.getElementById('subt');
let guessSlot = document.querySelector('.guesses');
let remaining = document.querySelector('.lastResult');
let result = document.querySelector('.lowOrHi'); 
let startOver = document.querySelector('.resultParas');

let p = document.createElement('p');

let playGame = true;
let prevGuesses = [];
let numGuess = 1;

button.addEventListener("click", function(e) {
    e.preventDefault();
    if(playGame) {
        let guess = parseInt(userInput.value); 
        validateGuess(guess);
    }
});

function validateGuess(guess) {
    if(guess < 1 || guess > 10 || isNaN(guess)) {
        alert("Enter a valid number between 1 and 10.");
    } else {
        prevGuesses.push(guess);
        if(numGuess === 3 && randomNumber !== guess) {
            result.innerHTML = `<h2>Game over. The number was ${randomNumber}.</h2>`;
            endGame();
        } else {
            checkGuess(guess);
        }
        cleanGuess();
    }
}

function checkGuess(guess) {
    if(randomNumber === guess) {
        result.innerHTML = '<h2>You guessed it right!</h2>';
        endGame();
    } else if(randomNumber > guess) {
        result.innerHTML = 'Too low!';
    } else {
        result.innerHTML = 'Too high!';
    }
}

function cleanGuess() {
    userInput.value = '';
    numGuess++;
    guessSlot.innerHTML += `${prevGuesses[prevGuesses.length - 1]} `;
    remaining.innerHTML = `${4 - numGuess}`;
}

function endGame() {
    userInput.setAttribute('disabled', ''); 
    p.classList.add('button');
    p.innerHTML = '<h2 id="newGame">Start New Game</h2>';
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    p.addEventListener('click', function() {
        randomNumber = parseInt(Math.random() * 10 + 1);
        prevGuesses = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `3`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        result.innerHTML = '';
        playGame = true;
    });
}
