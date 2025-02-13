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

// Initial Variables
const wordBank = ['go', 'fight', 'win', 'glass', 'mystery', 'classical'];
let shuffledWordBank;

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

const shuffleWords = function () {
  for (let i = wordBank.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * wordBank.length);
    [wordBank[j], wordBank[i]] = [wordBank[i], wordBank[j]];
  }
  shuffledWordBank = wordBank;
  return shuffledWordBank;
};

const displayPrompt = function (i) {
  promptContainer.innerHTML = '';
  for (let j = 0; j <= wordBank[i].length - 1; j++) {
    let newPromptLetterContainer = document.createElement('div');
    newPromptLetterContainer.classList.add('prompt-letter-container');
    newPromptLetterContainer.classList.add(`prompt-letter-${j + 1}`);
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
    newTypingLetterContainer.classList.add(`typing-letter-${j + 1}`);
    typingContainer.insertAdjacentElement(
      'beforeend',
      newTypingLetterContainer
    );
  }
};

const generateWords = function () {
  console.log(currentWordIndex);
  numberLettersTyped = 0;
  displayPrompt(currentWordIndex);
  displayTyping(currentWordIndex);
  window.addEventListener('keydown', function handleKeydown(e) {
    if (exemptKeys.includes(e.key)) {
      return;
    } else if (numberLettersTyped === wordBank[currentWordIndex].length - 1) {
      this.document.querySelector(
        `.typing-letter-${numberLettersTyped + 1}`
      ).textContent = e.key;
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
    } else if (numberLettersTyped < wordBank[currentWordIndex].length) {
      this.document.querySelector(
        `.typing-letter-${numberLettersTyped + 1}`
      ).textContent = e.key;
      numberLettersTyped++;
    }
  });
};

const initializeLevel = function () {
  shuffleWords();
  generateWords();
};
// Function calls
console.log(wordBank);
initializeLevel();
console.log(shuffledWordBank);
