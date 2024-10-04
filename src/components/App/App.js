import React, { useState, useMemo } from 'react';
import Game from '../Game';
import Header from '../Header';
import Panel from '../Panel';

import { roundToOneDecimal } from '../../utils';

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

  // Memoizing this prevents the need to calculate
  // the win percentage on each render;
  // probably overoptimization, but a good example
  // of how to save on unnecessary calculations
  const winPercentage = useMemo(() => {
    if (gamesPlayed === 0 || gamesWon === 0) {
      return 0;
    } else {
      return roundToOneDecimal((gamesWon / gamesPlayed) * 100);
    }
  }, [gamesPlayed, gamesWon]);
  const guessesPerWin = useMemo(() => {
    if (guessesMadeForWins === 0 || gamesWon === 0) {
      return 'n/a';
    } else {
      return roundToOneDecimal(guessesMadeForWins / gamesWon);
    }
  }, [guessesMadeForWins, gamesWon]);

  const statsForNerds = {
    'Games Played': gamesPlayed,
    'Games Won': gamesWon,
    'Win %': winPercentage,
    'Total Guesses': guessesMade,
    'Avg. Guesses Per Win': guessesPerWin,
  };

  return (
    <div className="wrapper">
      <Header />

      <div className="game-wrapper">
        <Game onGameOver={handleGameOver} onGuess={handleGuess} />
      </div>

      <Panel label="Stats For Nerds">
        <dl className="statList">
          {Object.keys(statsForNerds).map((label) => (
            <React.Fragment key={label}>
              <dt className="statTerm">{label}:</dt>
              <dd className="statDescription">{statsForNerds[label]}</dd>
            </React.Fragment>
          ))}
        </dl>
      </Panel>
    </div>
  );
}

export default App;
