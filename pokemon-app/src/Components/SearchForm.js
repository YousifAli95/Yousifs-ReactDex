import "./../App.css";
import { PokemonsContext } from "../App";
import React, { useEffect, useState, useContext, useRef } from "react";
import SubmitButton from "./SubmitButton";
import "./CSS/SearchForm.css";

export default function SearchForm(props) {
  const [datalistOptions, setDatalistOptions] = useState([]);
  const inputRef = useRef();
  const [pokemons] = useContext(PokemonsContext);

  //sets the datalist options when pokemons changes
  useEffect(() => {
    const optionsMap = Object.keys(pokemons).map((name, index) => (
      <option key={index} value={pokemons[name].Name} />
    ));
    setDatalistOptions(optionsMap);
  }, [pokemons]);

  function DataListOnChange(event) {
    props.setInputValue(event.target.value);
  }

  return (
    <div className="Fake-DataList">
      <label htmlFor="pokemon-input">Select a Pokémon from the list</label>
      <div>
        <input
          ref={inputRef}
          value={props.inputValue}
          onChange={DataListOnChange}
          autoComplete="off"
          list="pokemon-datalist"
          name="Pokemons"
          id="pokemon-input"
        />

        <datalist id="pokemon-datalist">{datalistOptions}</datalist>
        <SubmitButton
          inputRef={inputRef}
          setImage={props.setImage}
          setInputValue={props.setInputValue}
          inputValue={props.inputValue}
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
