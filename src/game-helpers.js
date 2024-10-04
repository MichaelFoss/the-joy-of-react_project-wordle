/**
 * Thanks to Github user dylano for supplying a more-accurate
 * solving algorithm!
 */

import { range } from './utils';

const GuessStates = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  MISPLACED: 'misplaced',
};

const LetterGuessStates = {
  CORRECT: 'correct',
  MISPLACED: 'misplaced',
  INCORRECT: 'incorrect',
  UNGUESSED: 'unguessed',
};

export function checkGuess(guess, answer) {
  // This constant is a placeholder that indicates we've successfully
  // dealt with this character (it's correct, or misplaced).
  const SOLVED_CHAR = '✓';

  if (!guess) {
    return null;
  }

  const guessChars = guess.toUpperCase().split('');
  const answerChars = answer.split('');

  const result = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: GuessStates.CORRECT,
      };
      answerChars[i] = SOLVED_CHAR;
      guessChars[i] = SOLVED_CHAR;
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === SOLVED_CHAR) {
      continue;
    }

    let status = GuessStates.INCORRECT;
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    );
    if (misplacedIndex >= 0) {
      status = GuessStates.MISPLACED;
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      letter: guessChars[i],
      status,
    };
  }

  return result;
}

const ASCII_FOR_A = 'A'.charCodeAt(0);
export const getInitialKeyStates = () => {
  const initialStates = range(0, 26)
    .map((letterNumberOffset) => {
      const offsetLetter = String.fromCharCode(
        ASCII_FOR_A + letterNumberOffset
      );
      return offsetLetter;
    })
    .reduce((keyStates, letter) => {
      keyStates[letter] = LetterGuessStates.UNGUESSED;
      return keyStates;
    }, {});
  return initialStates;
};

export const getUpdatedKeyStates = (keyStates, guess, answer) => {
  // TODO We're calling checkGuess again here,
  //   when it's already being called elsewhere in the code;
  //   optimize this so that we only call it once for each guess
  const result = checkGuess(guess, answer);
  const newKeyStates = {
    ...keyStates,
  };
  // Promote any letter that had a positive net effect
  // on the overall solution
  result?.forEach(({ letter, status }) => {
    if (status === GuessStates.CORRECT) {
      newKeyStates[letter] = LetterGuessStates.CORRECT;
    } else if (
      status === GuessStates.MISPLACED &&
      newKeyStates[letter] !== LetterGuessStates.CORRECT
    ) {
      newKeyStates[letter] = LetterGuessStates.MISPLACED;
    } else if (newKeyStates[letter] === LetterGuessStates.UNGUESSED) {
      newKeyStates[letter] = LetterGuessStates.INCORRECT;
    }
  });
  return newKeyStates;
};

export const isKeyValidLetter = (key) => /^[A-Z]{1}$/.test(key);

export const KEY_ENTER = 'ENTER';
export const KEY_BACKSPACE = 'BACKSPACE';
export const KEY_ESCAPE = 'ESCAPE';
