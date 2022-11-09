const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeftDisplay = document.querySelector('#time-left');
const scoreDisplay = document.querySelector('#score');
const gameOverDisplay = document.querySelector('.game-over');
const scoreContainer = document.querySelector('.score-container')
const timeContainer = document.querySelector('.time-container')

// Score when the game begins
let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

// Get a random square to put the mole in 
function randomSquare () {
    squares.forEach(square => {
        // Remove the mole if it already exists on any of the squares so we have a clean slate to begin with
        square.classList.remove('mole');
    });
    // Get a random number/square from 0 to 8 (1 to 9)
    let getRandomSquare = squares[Math.floor(Math.random() * 9)];
    // Add the mole class to each randomly generated number (one at a time)
    getRandomSquare.classList.add('mole');

    hitPosition = getRandomSquare.id
};

// Add to score each time mole is hit
squares.forEach(square =>  {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++;
            console.log(result)
            scoreDisplay.textContent = result;
            hitPosition = null;
        }
    })
})

// Optional: attach this function to a timer button
function moveMole() {
    timerId = setInterval(randomSquare, 500)
}

moveMole();

// Eventually would like to add a pop-up animation to the mole so that When mole is moved to a new square, it slides up "out of the ground"
function countDown() {
    currentTime--
    timeLeftDisplay.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        gameOverDisplay.classList.remove('hide');
        gameOverDisplay.textContent = `GAME OVER! Your final score is ${result}`;
        scoreContainer.innerHTML = ""
        timeContainer.innerHTML = ""
    }
}

let countDownTimerId = setInterval(countDown, 1000);