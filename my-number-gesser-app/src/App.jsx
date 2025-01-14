import React, { useState } from 'react';
import "./App.css";


function Game() {
    const [secretNumber, setSecretNumber] = useState(null);
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState("");

    const [guessButtonDisabled, setGuessButtonDisabled] = useState(true);
    const [inputReadOnly, setInputReadOnly] = useState(true);
    const [newGameButtonDisabled, setNewGameButtonDisabled] = useState(false);
    const [numTrials, setNumTrials] = useState(0);
    const [numTrialsMaximum, setNumTrialsMaximum] = useState(0);

    function generateRandomNumber(highRange) {
        return Math.floor(Math.random() * (highRange + 1));
    }

    function handleNewGame() {
        setGuessButtonDisabled(false);
        setInputReadOnly(false);
        setNewGameButtonDisabled(true);
        setSecretNumber(generateRandomNumber(100))
        setNumTrialsMaximum(10);
        setNumTrials(0);
        setFeedback("");
        setGuess("");
    }

    function punishPlayer() {
        setNumTrialsMaximum(numTrialsMaximum-1);
        setNumTrials(numTrials+1);

        if (numTrialsMaximum === 1) {
            setFeedback(`Vous avez perdu au bout de " ${numTrials} " tentative(s) ! Le nombre secret était " ${secretNumber} " ! Votre score ${numTrialsMaximum*10}%`);
            setInputReadOnly(true);
            setGuessButtonDisabled(true);
            setNewGameButtonDisabled(false);
        }
    }

    function handleSubmit() {
        setNumTrials(numTrials+1);
        if (+guess === secretNumber) {
            setInputReadOnly(true);
            setGuessButtonDisabled(true);
            setNewGameButtonDisabled(false);
            setFeedback(`Vous avez gagné au bout de " ${numTrials} " tentative(s) ! Le nombre secret était " ${secretNumber } " ! Votre score ${numTrialsMaximum * 10}%`);
        } else if (+guess > secretNumber) {
            setNumTrialsMaximum(numTrialsMaximum-1);
            setFeedback(`${guess} est très grand ! Essayez à nouveau.`);
        } else if (+guess < secretNumber){
            setFeedback(`${guess} est très petit !  Essayez à nouveau.`);
            punishPlayer();
        }
    }

    return (
        <div className="game-area">
            <header className="game-header">
                <h2 className="game-header-title">Choisir un nombre entre 1 et 100</h2>
            </header>
            <p> Cliquer sur une nouvelle partie </p>
            <button
                className="new-partie" onClick={handleNewGame} disabled={newGameButtonDisabled}> Nouvelle partie
            </button>

            <section className="game-body">
                <h2 className="u-center">
                    {numTrialsMaximum > 0 && `${numTrialsMaximum} : nombre d'essai maximum.`}
                </h2>

                <form className="game-form">
                    <div className="form-input-wrapper">
                        <input className="game-input" type="number" placeholder="00" readOnly={inputReadOnly}
                               value={guess} onChange={(e) => setGuess(e.target.value)}/>
                    </div>
                </form>
                <h2 className="u-marg-bt">{feedback}</h2>
                <button disabled={guessButtonDisabled} onClick={handleSubmit}>Guess</button>
            </section>
        </div>
    );
}

export default Game;