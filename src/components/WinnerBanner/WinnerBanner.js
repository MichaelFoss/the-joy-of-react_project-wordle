import React from 'react';

function WinnerBanner({ totalGuesses }) {
  return (
    <p>
      <strong>Congratulations!</strong> Got it in{' '}
      <strong>
        {totalGuesses} {totalGuesses !== 1 ? 'guesses' : 'guess'}
      </strong>
      .
    </p>
  );
}

export default WinnerBanner;
