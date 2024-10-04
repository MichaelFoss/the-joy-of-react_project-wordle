import React, { useEffect, useState } from 'react';
import Keyboard from '../Keyboard';

import {
  KEY_ENTER,
  KEY_BACKSPACE,
  KEY_ESCAPE,
  isKeyValidLetter,
} from '../../game-helpers';

function GuessInput({ keyStates, disabled = false, onGuess }) {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e = {}) => {
    e.preventDefault?.();
    if (guess.length !== 5) {
      return;
    }
    onGuess?.(guess);
    setGuess('');
  };

  const handleKeyDown = (e) => {
    if (disabled) {
      return;
    }
    const keyPressed = e.key.toLocaleUpperCase();
    // Do nothing if holding down a modifier key
    if (e.altKey || e.metaKey || e.controlKey) {
      return;
    }
    if (isKeyValidLetter(keyPressed)) {
      e.preventDefault?.();
      if (guess.length >= 5) {
        return;
      }
      const newGuess = guess + keyPressed;
      setGuess(newGuess);
    } else if (keyPressed === KEY_ENTER) {
      e.preventDefault?.();
      handleSubmit();
    } else if (keyPressed === KEY_BACKSPACE) {
      if (!guess) {
        return;
      }
      const newGuess = guess.substring(0, guess.length - 1);
      setGuess(newGuess);
    } else if (keyPressed === KEY_ESCAPE) {
      e.preventDefault?.();
      setGuess('');
    }
  };

  // Listen to all keypresses and capture them as game inputs
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      <Keyboard keyStates={keyStates} onKeyDown={handleKeyDown} />
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
          readonly={true}
        />
      </form>
    </div>
  );
}

export default GuessInput;
