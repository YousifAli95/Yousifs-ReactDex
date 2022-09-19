import "./../App.css";
import React, { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";
import "./CSS/FakeDataList.css";

function FakeDataList(props) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    let tmp = [];
    for (const key in props.pokemons) {
      if (key !== "") {
        tmp = [...tmp, key];
      }
    }
    let optionsMap = tmp.map((name, index) => {
      return <option key={index} value={props.pokemons[name]["Name"]} />;
    });
    setOptions(optionsMap);
  }, [props.pokemons]);

  function DataListOnChange(event) {
    props.setInputValue(event.target.value);
  }

  return (
    <div className="Fake-DataList">
      <label htmlFor="pokemon-input">Select a Pokémon from the list</label>
      <div>
        <input
          value={props.inputValue}
          onChange={DataListOnChange}
          autoComplete="off"
          list="pokemon-datalist"
          name="Pokemons"
          id="pokemon-input"
        />

        <datalist id="pokemon-datalist">{options}</datalist>
        <SubmitButton
          setPicture={props.setPicture}
          setInputValue={props.setInputValue}
          inputValue={props.inputValue}
          pokemons={props.pokemons}
          setShowImage={props.setShowImage}
          setCurrentPokemon={props.setCurrentPokemon}
          currentPokemon={props.currentPokemon}
          currentNumber={props.currentNumber}
          setCurrentNumber={props.setCurrentNumber}
        />
      </div>
    </div>
  );
}

export default FakeDataList;
