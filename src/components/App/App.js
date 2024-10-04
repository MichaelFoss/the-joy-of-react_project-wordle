import React, { useState } from 'react';
import Game from '../Game';
import Header from '../Header';

function App() {
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [guessesMade, setGuessesMade] = useState(0);
  const [guessesMadeForWins, setGuessesMadeForWins] = useState(0);

  const handleGameOver = (isWinner, totalGuesses = 0) => {
    setGamesPlayed(gamesPlayed + 1);
    if (isWinner) {
      setGamesWon(gamesWon + 1);
      setGuessesMadeForWins(guessesMadeForWins + totalGuesses);
    }
  };

  const handleGuess = () => {
    setGuessesMade(guessesMade + 1);
  };

  return (
    <div className="wrapper">
      <Header />

      <div className="game-wrapper">
        <Game />
      </div>
    </div>
  );
}

export default App;
