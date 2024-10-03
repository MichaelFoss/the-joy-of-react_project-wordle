import React from 'react';

function Guess({ value }) {
  const letters = value.split('').map((letter) => ({
    id: crypto.randomUUID(),
    letter,
  }));
  return (
    <p className="guess">
      {letters.map(({ id, letter }) => (
        <span key={id} className="cell">
          {letter}
        </span>
      ))}
    </p>
  );
}

export default Guess;
