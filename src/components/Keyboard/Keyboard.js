import React from 'react';
import { KEY_BACKSPACE, KEY_ENTER } from '../../game-helpers';

const SYMBOL_BACKSPACE = '⌫';
const SYMBOL_ENTER = '↵';

const keyboardKeys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  [SYMBOL_ENTER, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', SYMBOL_BACKSPACE],
];

const KeyboardKey = ({
  value,
  status = 'unguessed',
  isExtraWide,
  onClick,
  onSubmit,
}) => {
  const classNames = ['keyboardKey', status];
  if (isExtraWide) {
    classNames.push('wide');
  }

  return (
    <button onClick={onClick} className={classNames.join(' ')}>
      {value}
    </button>
  );
};

const Keyboard = ({ keyStates, onKeyDown }) => {
  const handleClick = (keyboardKey) => {
    // Simulate a KeyDown event
    let key;
    if (keyboardKey === SYMBOL_BACKSPACE) {
      key = KEY_BACKSPACE;
    } else if (keyboardKey === SYMBOL_ENTER) {
      key = KEY_ENTER;
    } else {
      key = keyboardKey;
    }
    onKeyDown({ key });
  };

  return (
    <div className="keyboard">
      {keyboardKeys.map((keyboardKeyRow, keyboardKeyRowIndex) => (
        <div className="keyboardKeyRow" key={keyboardKeyRowIndex}>
          {keyboardKeyRow.map((keyboardKey) => (
            <KeyboardKey
              key={keyboardKey}
              value={keyboardKey}
              isExtraWide={keyStates[keyboardKey] === undefined}
              status={keyStates[keyboardKey] || 'unguessed'}
              onClick={() => handleClick(keyboardKey)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
