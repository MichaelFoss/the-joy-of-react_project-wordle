import React, { useState } from 'react';
import GuessResults from '../GuessResults';
import GuessInput from '../GuessInput';
import Banner from '../Banner';
import WinnerBanner from '../WinnerBanner';
import LoserBanner from '../LoserBanner';

import { sample } from '../../utils';
import { getInitialKeyStates, getUpdatedKeyStates } from '../../game-helpers';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

const getNewAnswer = () => {
  const answer = sample(WORDS);
  // To make debugging easier, we'll log the solution in the console.
  console.info({ answer });
  return answer;
};

const initialAnswer = getNewAnswer();
const initialKeyStates = getInitialKeyStates();

// In lieu of Typescript, we can fake an enumeration this way
const GameState = {
  WON: 'happy',
  LOST: 'sad',
  PLAYING: '',
};

const Game = ({ onGameOver, onGuess }) => {
  const [answer, setAnswer] = useState(initialAnswer);
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState(GameState.PLAYING);
  const [keyStates, setKeyStates] = useState(initialKeyStates);
  const [isResetting, setIsResetting] = useState(false);

  const handleGuess = (guess) => {
    // Dispatch a guess event
    onGuess();

    // Update the key states
    const nextKeyStates = getUpdatedKeyStates(keyStates, guess, answer);
    setKeyStates(nextKeyStates);

    // Update the guesses
    const nextGuesses = [...guesses];
    nextGuesses.push({ id: crypto.randomUUID(), value: guess });
    setGuesses(nextGuesses);

    // Determine if game has ended
    const isWinner = nextGuesses[nextGuesses.length - 1]?.value === answer;
    if (isWinner) {
      onGameOver(true, nextGuesses.length);
      setGameState(GameState.WON);
      return;
    }
    const hasNoMoreGuesses = nextGuesses.length === NUM_OF_GUESSES_ALLOWED;
    if (hasNoMoreGuesses) {
      onGameOver(false);
      setGameState(GameState.LOST);
    }
  };

  const handlePlayAgain = () => {
    setIsResetting(true);
    setTimeout(() => {
      // Only reset the game
      // after the banner slides out of view
      setGuesses([]);
      setGameState(GameState.PLAYING);
      setAnswer(getNewAnswer());
      setKeyStates(initialKeyStates);
      setIsResetting(false);
    }, 750);
  };

  const isGameOver = gameState !== GameState.PLAYING;

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessInput
        keyStates={keyStates}
        disabled={isGameOver}
        onGuess={handleGuess}
      />
      {isGameOver && (
        <Banner
          isHiding={isResetting}
          status={gameState}
          buttonText="Play Again"
          onButtonClick={handlePlayAgain}
        >
          {gameState === GameState.WON ? (
            <WinnerBanner totalGuesses={guesses.length} />
          ) : (
            <LoserBanner answer={answer} />
          )}
        </Banner>
      )}
    </>
  );
};

export default Game;
