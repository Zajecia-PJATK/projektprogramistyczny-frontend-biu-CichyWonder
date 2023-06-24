import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import getRandomWord from "./components/words.js";
import { Spaces } from "./components/wordSpaces.js";
import { MistakeCountDisplay } from "./components/mistakeDisplay.js";
import { Settings } from "./components/settings.js";
import styled from "styled-components";
const firstHalfLetters = [
  "A",
  "Ą",
  "B",
  "C",
  "Ć",
  "D",
  "E",
  "Ę",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "Ł"
];
const secondHalfLetters = [
  "M",
  "N",
  "Ń",
  "O",
  "Ó",
  "P",
  "R",
  "S",
  "Ś",
  "T",
  "U",
  "W",
  "Y",
  "Z",
  "Ż",
  "Ź"
];
const Hangman = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 5px 10px grey;
  border-radius: 10px;
  width: 800px;
  height: 450px;
  align-content: center;
  margin-top: 200px;
`;
const Upper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Lower = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;
const SpacesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Buttons1 = styled.div`
  display: flex;
  gap: 5px;
  border: none;
`;
const Buttons2 = styled.div`
  display: flex;
  border: none;
  gap: 5px;
`;
const Reload = styled.button`
  margin: 10px;
  font-size: 25px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 5px 5px grey;
  background: white;
`;
const LetterInput = styled.button`
  font-size: 25px;
  width: 40px;
  height: 40px;
  border: none;
  box-shadow: 0px 5px 5px grey;
  background-color: ${(props) =>
    !props.revealedLetters.includes(props.letter)
      ? "white"
      : props.revealedLetters.includes(props.letter) &&
        props.splitCurrentWord.includes(props.letter)
      ? "rgba(0,255,0,0.3)"
      : "rgba(255,0,0,0.3)"};
`;
const Menu = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
  font-size: 20px;
  box-shadow: 0px 5px 5px grey;
  
`;
const linkStyle = {
  textDecoration: "none",
  color: "black",
  margin: "5px",
  gap: "50px",
  display: "inline-flex",
  flex_direction: "row-reverse",
  justifyContent:"space-between",
};
function Game({
  allowedWordLengths,
  currentTheme,
  gameFinished,
  setGameFinished,
}) {
  const [currentWord, setCurrentWord] = useState(
    getRandomWord(allowedWordLengths)
  );
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [numMistakes, setNumMistakes] = useState(0);
  let splitCurrentWord = currentWord.split("");
  const handleClick = (letter) => {
    if (revealedLetters.includes(letter) === false) {
      setRevealedLetters([...revealedLetters, letter]);
      if (splitCurrentWord.includes(letter) === false) {
        setNumMistakes((n) => n + 1);
      }
    }
  };
  function reload() {
    setNumMistakes(0);
    setRevealedLetters([]);
    setCurrentWord(getRandomWord(allowedWordLengths));
    setGameFinished(false);
  }
  return (
    <Hangman>
      <Upper>
        <div>
          <Reload onClick={reload}>Nowa Gra</Reload>
          <SpacesContainer>
            <Spaces
              revealedLetters={revealedLetters}
              splitCurrentWord={splitCurrentWord}
            />
          </SpacesContainer>
        </div>
        <MistakeCountDisplay
          numMistakes={numMistakes}
          splitCurrentWord={splitCurrentWord}
          revealedLetters={revealedLetters}
          currentTheme={currentTheme}
          setGameFinished={setGameFinished}
        />
      </Upper>
      <Lower>
        <Buttons1>
          {firstHalfLetters.map((letter, idx) => (
            <LetterInput
              key={idx}
              onClick={() => handleClick(letter)}
              revealedLetters={revealedLetters}
              splitCurrentWord={splitCurrentWord}
              letter={letter}
              disabled={gameFinished || revealedLetters.includes(letter)}
            >
              {letter}
            </LetterInput>
          ))}
        </Buttons1>
        <Buttons2>
          {secondHalfLetters.map((letter, idx) => (
            <LetterInput
              key={idx}
              onClick={() => handleClick(letter)}
              revealedLetters={revealedLetters}
              splitCurrentWord={splitCurrentWord}
              letter={letter}
              disabled={gameFinished || revealedLetters.includes(letter)}
            >
              {letter}
            </LetterInput>
          ))}
        </Buttons2>
      </Lower>
    </Hangman>
  );
}

function App() {
  const [allowedWordLengths, setAllowedWordLengths] = useState([
    6, 7, 8, 9, 10,
  ]);
  const [currentTheme, setCurrentTheme] = useState("hangman");
  const [gameFinished, setGameFinished] = useState(false);
  return (
    <>
      <Router>
        <Menu>
          <Link to="/settings" style={linkStyle}>
            Ustawienia
          </Link>
          <Link to="/" style={linkStyle}>
            Rozpocznij grę
          </Link>
        </Menu>
        <Routes>
          <Route
            exact
            path="/settings"
            element={
              <Settings
                allowedWordLengths={allowedWordLengths}
                setAllowedWordLengths={setAllowedWordLengths}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              />
            }
          ></Route>
          <Route
            exact
            path="/"
            element={
              <Game
                allowedWordLengths={allowedWordLengths}
                currentTheme={currentTheme}
                gameFinished={gameFinished}
                setGameFinished={setGameFinished}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
