'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
  return solution
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let correctLetterLocations = 0;
  let correctLetters = 0;
  // split the solution word and guessed word into single-letter arrays
  let solutionArray = solution.split('');
  let guessArray = guess.split('');
  // This variable will record how many correct "letter-locations" were guessed
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] == guessArray[i]) {
      correctLetterLocations++
      // null the already counted correctLetterLocations
      solutionArray[i] = null
    }
  }
  // see if the guessArray contains any correctLetters that were not in the correct location
  for (let j = 0; j < solutionArray.length; j++) {
    // determine if the item at the current index in guessArray appears inside of solutionArray
    let targetIndex = solutionArray.indexOf(guessArray[j])
    // if targetIndex is greater than -1, it exists in the array
    if (targetIndex > -1) {
      correctLetters ++
      solutionArray[targetIndex] = null
    }
  }
  // return hint string
  return `${correctLetterLocations}-${correctLetters}`
}

const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (solution == '') {
    solution = generateSolution()
  }
  // Detect a correct solution
  if (guess == solution) {
    return "You guessed it!"
  }
  // Generate a hint
  else {
    let hint = generateHint(guess)
    let combined = guess + hint
    board.push(combined)
  }
  if (board.length >= 10) {
    return 'You ran out of turns! The solution was ' + solution
  }
  else {
    return 'Guess again.'
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}