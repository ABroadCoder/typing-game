'use strict';

// HTML Element References
const outerContainer = document.querySelector('.outer-container');
const promptContainer = document.querySelector('.prompt-container');
const typingContainer = document.querySelector('.typing-container');
const promptLetterContainer = document.querySelector(
  '.prompt-letter-container'
);
const typingLetterContainer = document.querySelector(
  '.typing-letter-container'
);
const spotlight = document.querySelector('.spotlight');
const moving = document.querySelectorAll('.moving');

// Initial Variables
let wordBank = ['go', 'fight', 'win', 'glass', 'mystery', 'classical'];
let shuffledWordBank;
let wordQuantity = 100;

// API call to replace default wordBank with random word entries
// function populateWordBank() {
//   const request = new XMLHttpRequest();
//   request.open('GET', 'https://random-word-api.herokuapp.com/word?number=42');
//   request.send();
//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     console.log(data);
//   });
// }

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
  'Tab',
  'Space',
];

let firstLetterTyped = false;
let numberLettersTyped;
let currentWordIndex = 0;

// let letterArray = [];

// // Functions
// const makeLetterArray = function (i) {
//   let lastIndex = wordBank[i].length - 1;
//   let j = 0;
//   for (j = 0; j <= lastIndex; j++) {
//     letterArray.push(wordBank[i][j]);
//   }
//   return letterArray;
// };

async function populateWordBank(number) {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${number}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data);
    wordBank = data;
    console.log(wordBank);
    return wordBank;
  } catch (error) {
    console.error('Fetch operation unsuccessful. Error text:', error);
  }
}

const shuffleWords = function () {
  for (let i = wordBank.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * wordBank.length);
    [wordBank[j], wordBank[i]] = [wordBank[i], wordBank[j]];
  }
  shuffledWordBank = wordBank;
  return shuffledWordBank;
};

async function changeWordPosition() {
  // await populateWordBank();

  const randomHeightRatio = Math.random();
  const randomWidthRatio = Math.random();
  const boxHeight = outerContainer.getBoundingClientRect().height;
  const boxWidth = promptContainer.getBoundingClientRect().width;

  moving.forEach(el => {
    el.style.top = `${
      0.25 * boxWidth + (window.innerHeight - boxHeight - 0.5 * boxWidth) * 1
    }px`;
    el.style.left = `${(window.innerWidth - boxWidth) * randomWidthRatio}px`;
  });
  // moving.style.top = `${
  //   (window.innerHeight - moving.offsetHeight) * Math.random()
  // }px`;
  // moving.style.left = `${
  //   (window.innerWidth - moving.offsetWidth) * Math.random()
  // }px`;
}

const displayPrompt = function (i) {
  promptContainer.innerHTML = '';
  for (let j = 0; j <= wordBank[i].length - 1; j++) {
    let newPromptLetterContainer = document.createElement('div');
    newPromptLetterContainer.classList.add('prompt-letter-container');
    newPromptLetterContainer.classList.add(`prompt-letter-${j}`);
    promptContainer.insertAdjacentElement(
      'beforeend',
      newPromptLetterContainer
    );
    newPromptLetterContainer.textContent = `${wordBank[i][j]}`;
  }
};

const displayTyping = function (i) {
  typingContainer.innerHTML = '';
  for (let j = 0; j <= wordBank[i].length - 1; j++) {
    let newTypingLetterContainer = document.createElement('div');
    newTypingLetterContainer.classList.add('typing-letter-container');
    newTypingLetterContainer.classList.add(`typing-letter-${j}`);
    typingContainer.insertAdjacentElement(
      'beforeend',
      newTypingLetterContainer
    );
  }
};

const displaySpotlight = function () {
  const promptRect = promptContainer.getBoundingClientRect();
  const outerRect = outerContainer.getBoundingClientRect();
  const spotlightRect = spotlight.getBoundingClientRect();
  spotlight.style.width = `${promptRect.width}px`;
  spotlight.style.height = `${promptRect.width}px`;
  spotlight.style.top = `${outerRect.top}px`;
  console.log(outerRect, outerRect.left, outerRect.top);
  console.log(spotlightRect, spotlightRect.left, spotlightRect.top);
};

const compareLetters = function (index) {
  if (
    document.querySelector(`.prompt-letter-${index}`).textContent !==
    document.querySelector(`.typing-letter-${index}`).textContent
  ) {
    document
      .querySelector(`.typing-letter-${index}`)
      .classList.add('incorrect-letter');
  }
};

const generateWords = function () {
  changeWordPosition();

  numberLettersTyped = 0;

  displayPrompt(currentWordIndex);
  displayTyping(currentWordIndex);
  displaySpotlight();

  document.querySelector('.prompt-letter-0').classList.add('current-letter');

  window.addEventListener('keydown', function handleKeydown(e) {
    //Exempting non-letter keys
    if (exemptKeys.includes(e.key)) {
      return;
    }
    //Handling last-letter and last-word cases
    else if (numberLettersTyped === wordBank[currentWordIndex].length - 1) {
      this.document.querySelector(
        `.typing-letter-${numberLettersTyped}`
      ).textContent = e.key;
      compareLetters(numberLettersTyped);
      this.document
        .querySelector(`.prompt-letter-${numberLettersTyped}`)
        .classList.remove('current-letter');
      numberLettersTyped++;
      this.window.removeEventListener('keydown', handleKeydown);
      if (currentWordIndex === wordBank.length - 1) {
        this.setTimeout(() => {
          this.alert('Congratulations! All words completed.');
        }, 1000);
      }
      if (currentWordIndex < wordBank.length - 1) {
        currentWordIndex++;
        this.setTimeout(() => {
          generateWords(currentWordIndex);
        }, 1000);
      }
    }
    //Handling before-end cases
    else if (numberLettersTyped < wordBank[currentWordIndex].length) {
      this.document.querySelector(
        `.typing-letter-${numberLettersTyped}`
      ).textContent = e.key;
      document
        .querySelector(`.prompt-letter-${numberLettersTyped}`)
        .classList.remove('current-letter');
      compareLetters(numberLettersTyped);
      numberLettersTyped++;
      document
        .querySelector(`.prompt-letter-${numberLettersTyped}`)
        .classList.add('current-letter');
    }
  });
};

async function initializeLevel() {
  // await populateWordBank(wordQuantity);
  shuffleWords();
  generateWords();
}
// Function calls
initializeLevel();
console.log(wordBank);

// console.log(wordBank);
// console.log(shuffledWordBank);
// console.log(window.innerHeight);
// console.log(window.innerWidth);
// console.log(outerContainer.offsetHeight);
// console.log(outerContainer.offsetWidth);
