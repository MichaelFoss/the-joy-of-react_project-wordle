import React from 'react';
import { checkGuess } from '../../game-helpers';

function Guess({ value, answer }) {
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
}

export default Guess;
