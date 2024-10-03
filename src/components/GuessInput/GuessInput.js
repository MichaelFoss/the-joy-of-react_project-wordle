import React, { useState } from 'react';

function GuessInput({ disabled = false, onGuess }) {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.length !== 5) {
      return;
    }
    onGuess?.(guess);
    setGuess('');
  };

  const handleGuessChange = (e) => {
    const newGuess = e.target.value.toLocaleUpperCase();
    setGuess(newGuess);
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        autoFocus
        disabled={disabled}
        maxLength={5}
        pattern="[A-Za-z]{5}"
        title="Exactly 5 characters with letters only"
        value={guess}
        onChange={handleGuessChange}
      />
    </form>
  );
}

export default GuessInput;
