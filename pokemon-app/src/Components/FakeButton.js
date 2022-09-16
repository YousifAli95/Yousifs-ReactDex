import "./../App.css";
import React, { useEffect, useState } from "react";

function FakeButton(props) {
  const [pokemonNames, setPokemonNames] = useState([]);
  useEffect(() => {
    let tmp = [];
    for (const key in props.pokemons) {
      if (key !== "") {
        tmp = [...tmp, key];
      }
    }
    setPokemonNames(tmp);
  }, [props.pokemons]);

  function findPokemon() {
    let pokemonName = props.inputValue;
    let findIndex = pokemonNames.findIndex((element) => {
      return element.toLowerCase() === pokemonName.toLowerCase();
    });
    if (findIndex > -1) {
      props.setInputValue("");
      props.setCurrentPokemon(pokemonName.toLowerCase());
    } else {
      if (pokemonName !== "") {
        alert(`${pokemonName} is not a pokémon!`);
      }
    }
  }

  useEffect(() => {
    if (props.currentPokemon !== "") {
      document.body.style.background = getColor(
        props.pokemons[props.currentPokemon].Color
      );
    }
  }, [props.currentPokemon]);

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(props.inputValue);
      findPokemon();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

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

  useEffect(() => {
    findPokemon();
  }, [props.currentNumber]);
  return (
    <input
      id="submit-btn"
      value={"Submit"}
      type="button"
      onClick={findPokemon}
    ></input>
  );
}

export default FakeButton;
