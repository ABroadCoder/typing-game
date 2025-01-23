'use strict';

//HTML Element References

const popupContainer = document.querySelector('.popup-container');
const closePopupContainer = document.querySelector('.close-popup-container');
const popupTextContainer = document.querySelector('.popup-text-container');
const topContainer = document.querySelector('.top-container');
const timerContainer = document.querySelector('.timer-container');
const instructionsContainer = document.querySelector('.instructions-container');
const mainContainer = document.querySelector('.main-container');
const textBox = document.querySelector('.text-box');
const dataContainer = document.querySelector('.data-container');
const scoreOverallContainer = document.querySelector(
  '.score-overall-container'
);
const scoreTitleContainer = document.querySelector('.score-data-container');
const scoreContainer = document.querySelector('.score-container');
const overlay = document.querySelector('.overlay');

// Sound File References

const correctSound = new Audio('lipsclick.wav');
const incorrectSound = new Audio('pc-game-ui-error.wav');
const victorySound = new Audio('succeeded-game-jingle.wav');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sound Volume

correctSound.volume = 0.2;
incorrectSound.volume = 0.2;
victorySound.volume = 0.2;

// Variable Initializations

const letterArray = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const exemptKeys = [
  'Meta',
  'Shift',
  'CapsLock',
  'Control',
  'Alt',
  'Enter',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Backspace',
  'Escape',
];

let currentLetter = '';
let currentPoints = 0;
let currentTarget = 16;
let levelLength = [15, 20, 25, 30, 35];
let numberCorrect = 0;
let numberIncorrect = 0;
let firstCorrectKeyPressed = false;

const timerValues = [
  [0, 30],
  [1, 0],
  [1, 30],
  [2, 0],
  [2, 30],
  [3, 0],
];

const pointsTargets = [30, 60, 90, 120, 150, 180];

const messages = [
  'Welcome to the game! To start, close this popup.',
  "You're out of time! Try again!",
  "Congratulations! You've won the game!",
];

// Function Definitions

let generateLetter = function () {
  return letterArray[Math.round(Math.random() * 25)];
};

const addBox = function () {
  currentLetter = generateLetter();
  const html = `<div class="text-box">${currentLetter}</div>`;
  mainContainer.innerHTML = '';
  mainContainer.insertAdjacentHTML('afterbegin', html);
};

let addPoints = function () {
  currentPoints = currentPoints + 5;
};

let subtractPoints = function () {
  if (currentPoints > 0) {
    currentPoints--;
  } else {
    return;
  }
};

const displayPoints = function () {
  scoreContainer.innerHTML = '';
  scoreContainer.insertAdjacentHTML(
    'afterbegin',
    `${currentPoints}/${pointsTargets[5]}`
  );
};

const correctType = function () {
  addPoints();
  numberCorrect++;
  displayPoints();
  correctSound.play();
};

const incorrectType = function () {
  subtractPoints();
  numberIncorrect++;
  displayPoints();
  incorrectSound.play();
};

const updateTimerDisplay = function (minutes, seconds) {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  timerContainer.textContent = `${formattedMinutes}:${formattedSeconds}`;
};

const runTimer = function (minutes, seconds) {
  updateTimerDisplay(minutes, seconds);
  const timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timerInterval);
        showPopup(messages[1]);
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    // if (currentPoints >= currentTarget) {
    //   // beatLevel();
    //   currentPoints = 0;
    //   clearInterval(timerInterval);
    // }
    updateTimerDisplay(minutes, seconds);
  }, 1000);
};

const hidePopup = function () {
  popupContainer.style.opacity = '0';
  popupContainer.style.display = 'none';
  overlay.style.display = 'none';
};

const showPopup = function (text) {
  popupContainer.style.opacity = '1';
  popupContainer.style.display = 'flex';
  popupTextContainer.textContent = text;
  overlay.style.display = 'block';
};

const initializeGame = function () {
  updateTimerDisplay(0, 0);
  showPopup(messages[0]);
};

// const beatLevel = function () {
//   showPopup(messages[2]);
//   clearInterval(timerInterval);
//   victorySound.play();
// };

// Event Listeners

window.addEventListener('load', function () {
  addBox();
  displayPoints();
});

window.addEventListener('keyup', function (e) {
  console.log(e.key);
  if (exemptKeys.includes(e.key)) {
    return;
  } else if (e.key.toUpperCase() === currentLetter) {
    addBox();
    correctType();
    if (firstCorrectKeyPressed === false) {
      firstCorrectKeyPressed = !firstCorrectKeyPressed;
      runTimer(...timerValues[1]);
      console.log(...timerValues[1]);
    }
  } else {
    incorrectType();
  }
});

closePopupContainer.addEventListener('click', hidePopup);
window.addEventListener('keyup', function (e) {
  if (e.key === 'Escape') {
    initializeGame();
    hidePopup();
  }
});

// Window Initialization

initializeGame();
