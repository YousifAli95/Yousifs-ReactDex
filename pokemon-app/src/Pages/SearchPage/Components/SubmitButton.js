import { PokemonsContext } from "../../../App";
import React, { useContext, useEffect, useRef } from "react";
import {
  ConvertPokemonNumberToInt,
  convertPokemonNumberToString,
  getColorAsHexadecimal,
} from "../../../utils/pokemonUtils";
import { useNavigate, useLocation } from "react-router-dom";

export default function SubmitButton(props) {
  const inputValueRef = useRef(props.inputValue);
  const [pokemons] = useContext(PokemonsContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentPokemonFromUrlRef = useRef(params.get("current-pokemon"));
  const navigate = useNavigate();

  useEffect(() => {
    inputValueRef.current = props.inputValue;
  }, [props.inputValue]);

  const keyDownHandlerArrow = (event) => {
    if (!currentPokemonFromUrlRef.current && !props.currentNumber.current) {
      return;
    }

    const currentNumber = props.currentNumber.current
      ? props.currentNumber.current
      : ConvertPokemonNumberToInt(
          pokemons[currentPokemonFromUrlRef.current]?.Number
        );

    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (currentNumber < 898) {
        ChangePokemonWithArrowKeys(1, currentNumber);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (currentNumber > 0) {
        ChangePokemonWithArrowKeys(-1, currentNumber);
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
    console.log("Adding EventListener");
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
  }, [pokemons, props.inputRef]);

  useEffect(() => {
    if (props.currentPokemon !== "" && pokemons[props.currentPokemon]) {
      document.body.style.background = getColorAsHexadecimal(
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
      pokemonNumber = convertPokemonNumberToString(pokemonNumber);
    }
    const pokemonNames = Object.keys(pokemons);
    let findIndex = pokemonNames?.findIndex((element) => {
      return (
        element.toLowerCase() === pokemonNameOrNumber?.toLowerCase() ||
        pokemons[element]?.Number === pokemonNumber
      );
    });
    if (findIndex > -1) {
      props.setInputValue("");
      let currentPokemon = pokemonNames[findIndex];
      props.setCurrentPokemon(currentPokemon);
      navigate(`/`);
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

  function ChangePokemonWithArrowKeys(delta, currentNumber) {
    console.log(currentNumber);
    let newPokemon = Object.keys(pokemons).filter(
      (name) =>
        pokemons[name].Number ===
        convertPokemonNumberToString(currentNumber + delta)
    )[0];
    if (newPokemon) {
      const newNumber = ConvertPokemonNumberToInt(pokemons[newPokemon]?.Number);
      props.currentNumber.current = newNumber;
      props.setInputValue(newPokemon);
    }
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
