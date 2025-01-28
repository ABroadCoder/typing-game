'use strict';

//HTML Element References

const popupContainer = document.querySelector('.popup-container:not(.hidden)');
const closePopupContainer = document.querySelector('.close-popup-container');
const popupTextContainer = document.querySelector('.popup-text-container');
const nameInputField = document.querySelector('.name-input-field');
const topContainer = document.querySelector('.top-container');
const timerContainer = document.querySelector('.timer-container');
const instructionsContainer = document.querySelector('.instructions-container');
const mainContainer = document.querySelector('.main-container');
const dataContainer = document.querySelector('.data-container');
const scoreOverallContainer = document.querySelector(
  '.score-overall-container'
);
const scoreTitleContainer = document.querySelector('.score-data-container');
const scoreContainer = document.querySelector('.score-container');
const overlay = document.querySelector('.overlay');
const startButton = document.querySelector('.start-button');
const loadingContainer = document.querySelector('.loading-container');

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

const pointsTargets = [30, 60, 90, 120, 150, 180];

let levelLength = [15, 20, 25, 30, 35];

const timerValues = [
  [0, 30],
  [1, 0],
  [1, 30],
  [2, 0],
  [2, 30],
  [3, 0],
];

let currentLetter = '';
let currentPoints = 0;
let currentTarget = pointsTargets[0];
let numberCorrect = 0;
let numberIncorrect = 0;
let firstCorrectKeyPressed = false;
let typingDisabled = false;
let nameInputFieldClicked = false;

const messages = {
  welcome: 'Welcome to the game!<br>To start, type your name and click Start.',
  outOfTime: "You're out of time!<br>Try again!",
  levelComplete: () =>
    `Level complete!<br>You typed ${numberCorrect}/${
      numberCorrect + numberIncorrect
    } keys correctly on the first try.`,
};

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
  if (currentPoints >= currentTarget) {
    currentPoints = currentTarget;
    typingDisabled = true;
  }
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
    `${currentPoints}/${currentTarget}`
  );
};

const correctType = function () {
  if (!typingDisabled) {
    addPoints();
    numberCorrect++;
    displayPoints();
    correctSound.play();
  }
};

const incorrectType = function () {
  if (!typingDisabled) {
    subtractPoints();
    numberIncorrect++;
    displayPoints();
    incorrectSound.play();
  }
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
        outOfTime();
      } else {
        minutes--;
        seconds = 59;
        updateTimerDisplay(minutes, seconds);
        checkBeatLevel(timerInterval);
      }
    } else {
      seconds--;
      updateTimerDisplay(minutes, seconds);
      checkBeatLevel(timerInterval);
    }
  }, 1000);
};

const showPopup = function (text) {
  overlay.style.display = 'block';
  popupContainer.style.display = 'flex';
  popupTextContainer.innerHTML = text;
  typingDisabled = true;
};

const escapePopup = function () {
  popupContainer.style.display = 'none';
  overlay.style.display = 'none';
};

// const displayLoadingIcon = function () {
//   window.insertAdjacentHTML(
//     'afterbegin',
//     `<div class="loading-container">Loading...</div>`
//   );
// };

const initializeGame = function () {
  updateTimerDisplay(0, 0);
  showPopup(messages.welcome);
  currentPoints = 0;
  displayPoints();

  if (startButton && document.readyState === 'complete') {
    startButton.addEventListener('click', function () {
      escapePopup();
      typingDisabled = false;
    });
  }
  if (
    !nameInputFieldClicked &&
    nameInputField &&
    document.readyState === 'complete'
  ) {
    nameInputField.addEventListener('focus', function () {
      nameInputFieldClicked = true;
      nameInputField.value = '';
    });
  }
};

const outOfTime = function () {
  showPopup(messages.outOfTime);
};

const checkBeatLevel = function (timerName) {
  if (currentPoints >= currentTarget) {
    showPopup(messages.levelComplete());
    victorySound.play();
    clearInterval(timerName);
  }
};

// Event Listeners

window.addEventListener('load', function () {
  addBox();
  displayPoints();
});

window.addEventListener('keyup', function (e) {
  console.log(e.key);
  if (exemptKeys.includes(e.key)) {
    return;
  } else if (
    e.key.toUpperCase() === currentLetter &&
    !typingDisabled &&
    currentPoints < currentTarget
  ) {
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

closePopupContainer.addEventListener('click', function (e) {
  const popup = e.target.parentElement;
  if (popup) {
    popup.style.display = 'none';
    overlay.style.display = 'none';
  }
});

window.addEventListener('keyup', function (e) {
  if (e.key === 'Escape' && popupContainer.style.display !== 'none') {
    escapePopup();
  }
});

console.log(nameInputField);

// Window Initialization
document.addEventListener('DOMContentLoaded', function () {
  initializeGame();
});
