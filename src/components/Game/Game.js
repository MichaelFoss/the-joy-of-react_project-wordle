import React, { useState } from 'react';
import GuessResults from '../GuessResults/GuessResults';
import GuessInput from '../GuessInput';
import ResultsBanner from '../ResultsBanner';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

// In lieu of Typescript, we can fake an enumeration this way
const GameState = {
  WON: 'WON',
  LOST: 'LOST',
  PLAYING: 'PLAYING',
};

function Game() {
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState(GameState.PLAYING);

  const handleGuess = (guess) => {
    const nextGuesses = [...guesses];
    nextGuesses.push({ id: crypto.randomUUID(), value: guess });
    setGuesses(nextGuesses);
    const isWinner = nextGuesses[nextGuesses.length - 1]?.value === answer;
    if (isWinner) {
      setGameState(GameState.WON);
      return;
    }
    const hasNoMoreGuesses = nextGuesses.length === NUM_OF_GUESSES_ALLOWED;
    if (hasNoMoreGuesses) {
      setGameState(GameState.LOST);
    }
  };

  const isGameOver = gameState !== GameState.PLAYING;

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessInput disabled={isGameOver} onGuess={handleGuess} />
      {isGameOver && (
        <ResultsBanner
          answer={answer}
          isWinner={gameState === GameState.WON}
          totalGuesses={guesses.length}
        />
      )}
    </>
  );
}

export default Game;
