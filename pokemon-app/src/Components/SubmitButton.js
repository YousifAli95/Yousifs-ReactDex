import { PokemonsContext } from "../App";
import "./../App.css";
import React, { useContext, useEffect, useRef } from "react";
import { getPokemonNumber } from "../utils/pokemonUtils";
import { useNavigate } from "react-router-dom";

export default function SubmitButton(props) {
  const inputValueRef = useRef(props.inputValue);
  const pokemons = useContext(PokemonsContext);
  const navigate = useNavigate();

  useEffect(() => {
    inputValueRef.current = props.inputValue;
  }, [props.inputValue]);

  const keyDownHandlerArrow = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (props.currentNumber.current < 898) {
        ChangePokemonWithArrowKeys(1);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (props.currentNumber.current > 0) {
        ChangePokemonWithArrowKeys(-1);
      }
    }
  };

  const keyDownHandlerInput = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      findPokemon();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandlerArrow);
    props.inputRef.current.addEventListener("keydown", keyDownHandlerInput);

    return () => {
      document.removeEventListener("keydown", keyDownHandlerArrow);
      if (props.inputRef.current) {
        props.inputRef.current.removeEventListener(
          "keydown",
          keyDownHandlerInput
        );
      }
      console.log("Removing EventListener");
    };
  }, [pokemons]);

  useEffect(() => {
    if (props.currentPokemon !== "" && pokemons[props.currentPokemon]) {
      document.body.style.background = getColor(
        pokemons[props.currentPokemon].Color
      );
    }
  }, [props.currentPokemon, pokemons]);

  useEffect(() => {
    findPokemon();
  }, [props.currentNumber.current]);

  function findPokemon() {
    let pokemonNameOrNumber = inputValueRef.current;
    console.log(pokemonNameOrNumber);
    let pokemonNumber = parseInt(pokemonNameOrNumber);
    if (pokemonNumber) {
      pokemonNumber = getPokemonNumber(pokemonNumber);
    }
    const pokemonNames = Object.keys(pokemons);
    let findIndex = pokemonNames.findIndex((element) => {
      return (
        element.toLowerCase() === pokemonNameOrNumber.toLowerCase() ||
        pokemons[element].Number === pokemonNumber
      );
    });
    if (findIndex > -1) {
      props.setInputValue("");
      let currentPokemon = pokemonNames[findIndex];
      props.setCurrentPokemon(currentPokemon);
      navigate(`/?current-pokemon=${currentPokemon}`);
      props.currentNumber.current = parseInt(
        pokemons[currentPokemon]["Number"].replace("#", "")
      );
    } else {
      if (pokemonNameOrNumber !== "") {
        if (
          parseInt(pokemonNameOrNumber) ||
          parseInt(pokemonNameOrNumber) === 0
        ) {
          alert(
            `there is no Pokemon with the number ${pokemonNameOrNumber}, try a number between 1-898!`
          );
        } else {
          alert(`there is no Pokémon with the name ${pokemonNameOrNumber}!`);
        }
      }
    }
  }

  function getColor(color) {
    switch (color) {
      case "Green":
        return "#8FBC8F";
      case "White":
        return "#FFF5EE";
      case "Brown":
        return "#DEB887";
      case "Red":
        return "#CD5C5C";
      case "Purple":
        return "#DDA0DD";
      case "Gray":
        return "#C0C0C0";
      case "Blue":
        return "#87CEEB";
      case "Pink":
        return "#FFC0CB";
      case "Yellow":
        return "#F5DEB3";
      case "Black":
        return "#708090";
      default:
        return "#87CEEB";
    }
  }

  function ChangePokemonWithArrowKeys(delta) {
    console.log(props.currentNumber.current);
    let newPokemon = Object.keys(pokemons).filter(
      (name) =>
        pokemons[name].Number ===
        getPokemonNumber(props.currentNumber.current + delta)
    )[0];
    let newNumber = pokemons[newPokemon].Number.replace("#", "");
    newNumber = parseInt(newNumber);
    props.currentNumber.current = newNumber;
    props.setInputValue(newPokemon);
  }

  return (
    <input
      id="submit-btn"
      value={"Submit"}
      type="button"
      onClick={findPokemon}
    ></input>
  );
}
