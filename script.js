'use strict';

//HTML Element References

const popupContainer = document.querySelector('.popup-container');
const welcomePopup = document.querySelector('.welcome-popup');
const outOfTimePopup = document.querySelector('.out-of-time-popup');
const levelCompletePopup = document.querySelector('.level-complete-popup');
const closePopupContainer = document.querySelector('.close-popup-container');
const popupTextContainer = document.querySelector('.popup-text-container');
const nameInputField = document.querySelector('.name-input-field');
const topContainer = document.querySelector('.top-container');
const timerContainer = document.querySelector('.timer-container');
const instructionsContainer = document.querySelector('.instructions-container');
const mainContainer = document.querySelector('.main-container');
const dataContainer = document.querySelector('.data-container');
const playerNameContainer = document.querySelector('.player-name-container');
const scoreOverallContainer = document.querySelector(
  '.score-overall-container'
);
const scoreTitleContainer = document.querySelector('.score-data-container');
const scoreContainer = document.querySelector('.score-container');
const overlay = document.querySelector('.overlay');
const submitButton = document.querySelector('.submit-button');
const retryButton = document.querySelector('.retry-button');
const continueButton = document.querySelector('.continue-button');
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

let levelIndex = 0;
let currentLetter = '';
let currentPoints = 0;
let currentTarget = pointsTargets[levelIndex];
let numberCorrect = 0;
let numberIncorrect = 0;
let firstCorrectKeyPressed = false;
let typingDisabled = false;
let nameInputFieldFocused = false;
let playerName = '';

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

const showPopup = function (popupName) {
  const popupElement = document.querySelector(popupName);
  if (popupElement) {
    popupElement.classList.remove('hidden');
    typingDisabled = true;
  }
};

const escapePopup = function (popupName) {
  console.log('Escaping popup!');
  const popupElement = document.querySelector(popupName);
  console.log('Before:', popupElement.classList, overlay.classList);
  popupElement.classList.add('hidden');
  overlay.classList.add('hidden');
  console.log('After:', popupElement.classList, overlay.classList);
};

const initializeGame = function () {
  updateTimerDisplay(0, 0);
  showPopup('.welcome-popup');
  currentPoints = 0;
  displayPoints();

  if (!welcomePopup.classList.contains('hidden')) {
    submitButton.addEventListener('click', updateNameInputField);
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        updateNameInputField();
      }
    });
  }
  if (!nameInputFieldFocused && nameInputField) {
    nameInputField.addEventListener('focus', function () {
      nameInputFieldFocused = true;
      nameInputField.value = '';
    });
  }
};

const updateNameInputField = function () {
  if (nameInputField.value.trim() === '' || !nameInputFieldFocused) {
    alert('Please enter your name');
  } else {
    playerName = nameInputField.value;
    playerNameContainer.textContent = `${playerName}`;
    escapePopup('.welcome-popup');
    typingDisabled = false;
  }
};

const outOfTime = function () {
  showPopup('.out-of-time-popup');
};

const checkBeatLevel = function (timerName) {
  if (currentPoints >= currentTarget) {
    clearInterval(timerName);
    showPopup('.level-complete-popup');
    levelCompletePopup.querySelector(
      '.popup-text-container'
    ).innerHTML = `Level ${levelIndex} complete!`;
    typingDisabled = true;
    victorySound.play();
    continueButton.addEventListener('click', function () {
      escapePopup('.level-complete-popup');
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        escapePopup('.level-complete-popup');
      }
    });
    levelIndex++;
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
  } else if (!typingDisabled) {
    incorrectType();
  }
});

closePopupContainer.addEventListener('click', function (e) {
  const popup = e.target.parentElement;
  if (popup) {
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
  }
});

window.addEventListener('keyup', function (e) {
  if (e.key === 'Escape') {
    escapePopup('.popup-container');
  }
});

// Window Initialization
initializeGame();
