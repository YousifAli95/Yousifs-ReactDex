import { PokemonsContext } from "../../../App";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/SearchForm.css";

export default function SearchForm(props) {
  const [datalistOptions, setDatalistOptions] = useState([]);
  const inputRef = useRef();
  const { pokemons, MAX_POKEMON_NUMBER } = useContext(PokemonsContext);
  const navigate = useNavigate();

  //sets the datalist options when the pokemons variable changes
  useEffect(() => {
    console.log(pokemons);
    const optionsMap = Object.keys(pokemons).map((name, index) => (
      <option key={index} value={name} />
    ));
    setDatalistOptions(optionsMap);
  }, [pokemons]);

  // Shows the user an error message if the submitted input value is not valid.
  function displayErrorMessage() {
    if (inputRef.current.value !== "") {
      let errorMessage =
        parseInt(inputRef.current.value) ||
        parseInt(inputRef.current.value) === 0
          ? `there is no Pokemon with the number ${inputRef.current.value}, try a number between 1-${MAX_POKEMON_NUMBER}!`
          : `there is no Pokémon with the name ${inputRef.current.value}!`;
      alert(errorMessage);
    }
  }

  // Gets the index of the new pokemon from an array of pokemon names.
  function getIndexOfNewPokemon(pokemonNames) {
    let pokemonNumber = parseInt(inputRef.current.value);

    let findIndex = pokemonNames?.findIndex((name) => {
      return (
        name.toLowerCase() === inputRef.current.value?.toLowerCase() ||
        pokemons[name] === pokemonNumber
      );
    });
    return findIndex;
  }

  // Updates all the neccessary variables so a new pokemon can be shown.
  function updateCurrentPokemon(pokemonNames, findIndex) {
    props.setInputValue("");

    let currentPokemon = pokemonNames[findIndex];
    console.log(currentPokemon);
    props.setCurrentPokemon(currentPokemon);
    navigate(`/`);
    console.log(pokemons[currentPokemon]);

    props.currentNumber.current = pokemons[currentPokemon];
  }

  // Calls showNewPokemon() when the variable currentNumber has been updated.
  useEffect(() => {
    showNewPokemon();
  }, [props.currentNumber.current]);

  // Shows a new pokemon if the input from the form is valid. Displays error message otherwise.
  function showNewPokemon(event) {
    event?.preventDefault();

    const pokemonNames = Object.keys(pokemons);
    let findIndex = getIndexOfNewPokemon(pokemonNames);

    if (findIndex > -1) {
      updateCurrentPokemon(pokemonNames, findIndex);
    } else {
      displayErrorMessage();
    }
  }

  return (
    <div className="Fake-DataList">
      <form onSubmit={showNewPokemon}>
        <label htmlFor="pokemon-input">Select a Pokémon from the list</label>
        <input
          ref={inputRef}
          value={props.inputValue}
          onChange={(event) => props.setInputValue(event.target.value)}
          autoComplete="off"
          list="pokemon-datalist"
          name="Pokemons"
          id="pokemon-input"
        />

        <datalist id="pokemon-datalist">{datalistOptions}</datalist>
        <input id="submit-btn" value={"Submit"} type="submit"></input>
      </form>
    </div>
  );
}
