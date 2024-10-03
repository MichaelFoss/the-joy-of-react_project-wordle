import React from 'react';

function LoserBanner({ answer }) {
  return (
    <p>
      Sorry, the correct answer is <strong>{answer}</strong>.
    </p>
  );
}

export default LoserBanner;
