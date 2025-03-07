import React from 'react';
import Guess from '../Guess';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { uuid } from '../../utils';

function GuessResults({ guesses, answer }) {
  const renderedGuesses = range(1, NUM_OF_GUESSES_ALLOWED + 1).map(
    (_, renderedGuessIndex) =>
      renderedGuessIndex < guesses.length
        ? guesses[renderedGuessIndex]
        : { id: uuid(), value: '     ' }
  );
  return (
    <div className="guess-results">
      {renderedGuesses.map(({ id, value }) => (
        <Guess key={id} value={value} answer={answer} />
      ))}
    </div>
  );
}

export default GuessResults;
