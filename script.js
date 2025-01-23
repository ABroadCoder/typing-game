'use strict';

//HTML Element References

const mainContainer = document.querySelector('.main-container');
const textBox = document.querySelector('.text-box');
const dataContainer = document.querySelector('.data-container');
const scoreOverallContainer = document.querySelector(
  '.score-overall-container'
);
const scoreTitleContainer = document.querySelector('.score-data-container');
const scoreContainer = document.querySelector('.score-container');

// Sound File References

const correctSound = new Audio('/Typing Game/4 hours/lipsclick.wav');
const incorrectSound = new Audio('/Typing Game/4 hours/pc-game-ui-error.wav');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sound Volume

correctSound.volume = 1.0;
incorrectSound.volume = 1.0;

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
];

let currentLetter = '';
let currentScore = 0;
let levelLength = [15, 20, 25, 30, 35];
let numberCorrect = 0;
let numberIncorrect = 0;

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
  currentScore = currentScore + 5;
};

let subtractPoints = function () {
  if (currentScore > 0) {
    currentScore--;
  } else {
    return;
  }
};

const displayScore = function () {
  scoreContainer.innerHTML = '';
  scoreContainer.insertAdjacentHTML('afterbegin', `${currentScore}`);
};

const correctType = function () {
  addPoints();
  numberCorrect++;
  displayScore();
  correctSound.play();
};

const incorrectType = function () {
  subtractPoints();
  numberIncorrect++;
  displayScore();
  incorrectSound.play();
};

// Event Listeners

window.addEventListener('load', function () {
  addBox();
  displayScore();
});

window.addEventListener('keyup', function (e) {
  console.log(e.key);
  if (exemptKeys.includes(e.key)) {
    return;
  } else if (e.key.toUpperCase() === currentLetter) {
    addBox();
    correctType();
  } else {
    incorrectType();
  }
});
