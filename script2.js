'use strict';

const wordBank = {
  0: 'glass',
  1: 'move',
  2: 'win',
};

let letterArray = [];

const makeLetterArray = function (i) {
  let lastIndex = wordBank[i].length - 1;
  let j = 0;
  for (j = 0; j <= lastIndex; j++) {
    letterArray.push(wordBank[i][j]);
  }
  return letterArray;
};

console.log(makeLetterArray(1));
