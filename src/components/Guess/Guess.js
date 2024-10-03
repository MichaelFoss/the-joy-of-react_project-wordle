import React, { memo } from 'react';
import { checkGuess } from '../../game-helpers';

const Guess = memo(({ value, answer }) => {
  const letters = checkGuess(value, answer).map(({ letter, status }) => ({
    id: crypto.randomUUID(),
    letter: letter !== ' ' ? letter : ' ',
    status: letter !== ' ' ? status : '',
  }));
  return (
    <p className="guess">
      {letters.map(({ id, letter, status }) => (
        <span key={id} className={`cell ${status}`}>
          {letter}
        </span>
      ))}
    </p>
  );
});

export default Guess;
