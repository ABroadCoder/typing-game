'use strict';

// HTML Element References

const outerContainer = document.querySelector('.outer-container');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const letterBox1 = document.querySelector('.letter-box-1');
const letterBox2 = document.querySelector('.letter-box-2');
const letterBox3 = document.querySelector('.letter-box-3');
const incomingContainer = document.querySelector('.incoming-container');
const commandLine = document.querySelector('.command-line');

// Variable Definitions

const letters = [
  ['F', 'J', 'R', 'U'],
  ['K', 'D', 'E', 'I', 'C'],
  ['G', 'H', 'T', 'Y'],
  ['V', 'B', 'N', 'M'],
  ['S', 'W', 'L', 'O', 'X'],
  ['A', 'Q', 'Z', 'P'],
];

let letterGroup = 0;

const dialogue = [
  {
    m: `Hey! Are you awake?`,
    answers: {
      first: { text: `Yes.`, next: 1 },
      second: { text: `No.`, next: 2 },
      third: { text: `(Remain silent.)`, next: 3 },
    },
  },
  {
    m: `Great! How are you feeling?`,
    answers: {
      first: { text: `Perfect.`, next: 4 },
      second: { text: `Alright.`, next: 5 },
      third: { text: `Terrible.`, next: 6 },
    },
  },
  {
    m: `Haha, I like your sense of humor. How are you feeling?`,
    answers: {
      first: { text: `Perfect.`, next: 4 },
      second: { text: `Alright.`, next: 5 },
      third: { text: `Terrible.`, next: 6 },
    },
  },
  {
    m: `Hello? Can you hear me?`,
    answers: {
      first: { text: `Yes, I'm awake.`, next: 1 },
      second: { text: `No, I'm not awake.`, next: 2 },
      third: { text: `(Remain silent.)`, next: 3 },
    },
  },
];

let currentStep = 0;

// Function Definitions

const displayText = function (i) {
  incomingContainer.textContent = dialogue[i].m;

  option1.textContent = dialogue[i].answers.first.text;
  option2.textContent = dialogue[i].answers.second.text;
  option3.textContent = dialogue[i].answers.third.text;

  letterBox1.textContent = letters[letterGroup][0];
  letterBox2.textContent = letters[letterGroup][1];
  letterBox3.textContent = letters[letterGroup][2];
};

const listenKeys = function () {
  console.log(
    `${letterBox1.textContent}, ${letterBox2.textContent}, ${letterBox3.textContent}`
  );
  window.addEventListener('keyup', function (e) {
    console.log(e.key);
    if (e.key === letterBox1.textContent.toLowerCase()) {
      currentStep = dialogue[currentStep].answers.first.next;
      displayText(currentStep);
    }

    if (e.key === letterBox2.textContent.toLowerCase()) {
      currentStep = dialogue[currentStep].answers.second.next;
      console.log(`currentStep value is ${currentStep}`);
      displayText(currentStep);
    }

    if (e.key === letterBox3.textContent.toLowerCase()) {
      currentStep = dialogue[currentStep].answers.third.next;
      displayText(currentStep);
    }
  });
};

// Event Listeners

// Initialization

displayText(0);
listenKeys();

//////////////////////////////////////////////////////////////////////////////////////////
// Tests

/*
console.log(
  `Actual display width of upper container: ${
    document.querySelector('.upper-container').offsetWidth
  }`
);

console.log(
  `Actual display width of upper option container: ${
    document.querySelector('.option2').offsetWidth
  }`
);

console.log(
  `Actual display width of middle container: ${
    document.querySelector('.middle-container').offsetWidth
  }`
);

console.log(
  `Actual display width of middle option containers: ${
    document.querySelector('.option1').offsetWidth
  } and ${document.querySelector('.option3').offsetWidth}`
);

console.log(
  `Actual display width of lower container: ${
    document.querySelector('.lower-container').offsetWidth
  }`
);

console.log(
  `Actual display width of incoming comm container: ${
    document.querySelector('.option1').offsetWidth
  }`
);

*/
