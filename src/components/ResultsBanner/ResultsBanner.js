import React from 'react';

const WinnerBanner = ({ totalGuesses }) => (
  <p>
    <strong>Congratulations!</strong> Got it in{' '}
    <strong>
      {totalGuesses} {totalGuesses !== 1 ? 'guesses' : 'guess'}
    </strong>
    .
  </p>
);

const LoserBanner = ({ answer }) => (
  <p>
    Sorry, the correct answer is <strong>{answer}</strong>.
  </p>
);

function ResultsBanner({ answer, isWinner, totalGuesses }) {
  const resultClassName = isWinner ? 'happy' : 'sad';
  return (
    <div className={`${resultClassName} banner`}>
      {isWinner ? (
        <WinnerBanner totalGuesses={totalGuesses} />
      ) : (
        <LoserBanner answer={answer} />
      )}
    </div>
  );
}

export default ResultsBanner;
