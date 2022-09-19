import "./../App.css";
import React, { useEffect, useState } from "react";

function SubmitButton(props) {
  const [pokemonNames, setPokemonNames] = useState([]);
  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(props.inputValue);
      findPokemon();
    } else if (event.key === "ArrowRight") {
      if (props.currentNumber < 898) {
        ChangePokemonWithArrowKeys(1);
      }
    } else if (event.key === "ArrowLeft") {
      if (props.currentNumber > 0) {
        ChangePokemonWithArrowKeys(-1);
      }
    }
  };
  useEffect(() => {
    let tmp = [];
    for (const key in props.pokemons) {
      if (key !== "") {
        tmp = [...tmp, key];
      }
    }
    setPokemonNames(tmp);
  }, [props.pokemons]);

  useEffect(() => {
    if (props.currentPokemon !== "") {
      document.body.style.background = getColor(
        props.pokemons[props.currentPokemon].Color
      );
    }
  }, [props.currentPokemon]);

  useEffect(() => {
    findPokemon();
  }, [props.currentNumber]);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  function findPokemon() {
    let pokemonName = props.inputValue;
    let pokemonNumber = parseInt(pokemonName);
    if (pokemonNumber) {
      pokemonNumber = "#" + String(pokemonNumber).padStart(3, "0");
    }
    let findIndex = pokemonNames.findIndex((element) => {
      return (
        element.toLowerCase() === pokemonName.toLowerCase() ||
        props.pokemons[element].Number === pokemonNumber
      );
    });
    if (findIndex > -1) {
      props.setInputValue("");
      let currentPokemon = pokemonNames[findIndex];
      props.setCurrentPokemon(currentPokemon);
      props.setCurrentNumber(
        parseInt(props.pokemons[currentPokemon]["Number"].replace("#", ""))
      );
    } else {
      if (pokemonName !== "") {
        if (parseInt(pokemonName) || parseInt(pokemonName) == 0) {
          alert(
            `there is no Pokemon with the number ${pokemonName}, try a number between 1-898!`
          );
        } else {
          alert(`there is no Pokémon with the name ${pokemonName}!`);
        }
      }
    }
  }

  function getColor(color) {
    if (color === "Green") {
      return "#8FBC8F";
    } else if (color === "White") {
      return "#FFF5EE";
    } else if (color === "Brown") {
      return "#DEB887";
    } else if (color === "Red") {
      return "#CD5C5C";
    } else if (color === "Purple") {
      return "#DDA0DD";
    } else if (color === "Gray") {
      return "#C0C0C0";
    } else if (color === "Blue") {
      return "#87CEEB";
    } else if (color === "Pink") {
      return "#FFC0CB";
    } else if (color === "Yellow") {
      return "#F5DEB3";
    } else if (color === "black") {
      return "#708090";
    } else {
      return "#87CEEB";
    }
  }

  function ChangePokemonWithArrowKeys(delta) {
    let newPokemon = pokemonNames.filter(
      (name) =>
        props.pokemons[name].Number ===
        "#" + String(props.currentNumber + delta).padStart(3, "0")
    );
    props.setCurrentPokemon(newPokemon);
    let newNumber = props.pokemons[newPokemon].Number.replace("#", "");
    newNumber = parseInt(newNumber);
    props.setCurrentNumber(newNumber);
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

export default SubmitButton;
