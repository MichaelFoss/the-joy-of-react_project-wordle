import React, { useState } from 'react';
import GuessResults from '../GuessResults/GuessResults';
import GuessInput from '../GuessInput';

import { sample } from '../../utils';
import { WORDS } from '../../data';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = useState([]);

  const handleGuess = (guess) => {
    console.log({ guess });
    const nextGuesses = [...guesses];
    nextGuesses.push({ id: crypto.randomUUID(), value: guess });
    setGuesses(nextGuesses);
  };

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessInput onGuess={handleGuess} />
    </>
  );
}

export default Game;
