import React from 'react';
import Guess from '../Guess';

function GuessResults({ guesses }) {
  console.log(guesses);
  return (
    <div className="guess-results">
      {guesses.map(({ id, value }) => (
        <Guess key={id} value={value} />
      ))}
    </div>
  );
}

export default GuessResults;
