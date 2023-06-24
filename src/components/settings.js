import styled from "styled-components";
const Checkbox = styled.input`
`;
const SettingsWrapper = styled.div`
  display: flex;
  box-shadow: 0px 5px 10px grey;
  border-radius: 10px;
  width: 800px;
  height: 450px;
  margin-top: 200px;
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  padding: 10px;
`;
export function Settings({
  allowedWordLengths,
  setAllowedWordLengths,
  currentTheme,
  setCurrentTheme,
}) {
  const handleOnChange = (number) => {
    allowedWordLengths.includes(number)
      ? setAllowedWordLengths(
          allowedWordLengths.filter((current) => current !== number)
        )
      : setAllowedWordLengths([...allowedWordLengths, number]);
  };
  const handleThemeChange = (event) => {
    setCurrentTheme(event.target.value);
  };
  const addWordToDictoniary = (word) =>{

  };
  return (
    <SettingsWrapper>
      <TextWrapper>
      Wybierz ilość liter z jakich będą składać się słowa
      <div className="checkboxes">
        {[6, 7, 8, 9, 10].map((number) => (
          <label>
            {number}
            <Checkbox
              type="checkbox"
              name={number}
              checked={allowedWordLengths.includes(number) ? "checked" : ""}
              onChange={() => handleOnChange(number)}
            />
          </label>
        ))}
      </div>
      Poziom trudności:
      <div className="radios">
        <label>
          <input
            type="radio"
            value="hangman"
            name="theme"
            checked={currentTheme === "hangman" ? "checked" : ""}
            onChange={handleThemeChange}
          />
          Wisielec(9 żyć)
        </label>
        <label>
          <input
            type="radio"
            value="pizza"
            name="theme"
            checked={currentTheme === "pizza" ? "checked" : ""}
            onChange={handleThemeChange}
          />
          Pizza(6 żyć)
        </label>
        <div>
          <label>Dodaj słowo do słownika</label>
          <input type="text" value="word" placeholder="słowo"></input>
        </div>
      </div>
      </TextWrapper>
    </SettingsWrapper>
  );
}
