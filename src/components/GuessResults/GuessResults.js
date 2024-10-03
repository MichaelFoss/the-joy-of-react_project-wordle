import React from 'react';
import Guess from '../Guess';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

function GuessResults({ guesses }) {
  const renderedGuesses = range(1, NUM_OF_GUESSES_ALLOWED + 1).map(
    (_, renderedGuessIndex) =>
      renderedGuessIndex < guesses.length
        ? guesses[renderedGuessIndex]
        : { id: crypto.randomUUID(), value: '     ' }
  );
  return (
    <div className="guess-results">
      {renderedGuesses.map(({ id, value }) => (
        <Guess key={id} value={value} />
      ))}
    </div>
  );
}

export default GuessResults;
