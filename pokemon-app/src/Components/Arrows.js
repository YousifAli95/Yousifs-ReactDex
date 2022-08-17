import React, { useEffect, useState } from "react";
import "./CSS/arrows.css";

function Arrows(props) {
  function changePokemon(event) {
    let currentNumber = parseInt(
      props.pokemons[props.currentPokemon]["Number"].substring(1)
    );
    let newNumber = currentNumber + parseInt(event.target.dataset.tag);
    let tmp = [];
    for (const key in props.pokemons) {
      if (key !== "") {
        tmp = [...tmp, [key, props.pokemons[key]["Number"]]];
      }
    }
    console.log(newNumber);
    let newPokemon = tmp.filter(
      (o) => o[1] === "#" + String(newNumber).padStart(3, "0")
    );
    props.setInputValue(newPokemon[0][0]);
    props.setCurrentNumber(newNumber);
  }
  function randomPokemon() {
    const randomNumber = Math.floor(Math.random() * (898 - 1)) + 1;
    let tmp = [];
    for (const key in props.pokemons) {
      if (key !== "") {
        tmp = [...tmp, [key, props.pokemons[key]["Number"]]];
      }
    }
    let tmpPoke = tmp.filter(
      (o) => o[1] === "#" + String(randomNumber).padStart(3, "0")
    );
    console.log(randomNumber);
    console.log(tmpPoke);
    props.setInputValue(tmpPoke[0][0]);
    props.setCurrentNumber(randomNumber);
  }
  return (
    <div className="two-arrows">
      {props.showImage ? (
        <>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Small_arrow_pointing_left.svg"
            alt=""
            id="left-arrow"
            className="arrows"
            data-tag={-1}
            onClick={changePokemon}
          />
          <button onClick={randomPokemon} className="Random-Button">
            Random Pokemon
          </button>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Small_arrow_pointing_left.svg"
            alt=""
            id="right-arrow"
            className="arrows"
            data-tag={1}
            onClick={changePokemon}
          />
        </>
      ) : (
        <button
          onClick={randomPokemon}
          id="startpage-random-btn"
          className="Random-Button"
        >
          Random Pokemon
        </button>
      )}
    </div>
  );
}

export default Arrows;
