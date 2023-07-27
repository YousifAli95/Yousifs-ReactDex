import "../CSS/arrows.css";
import {
  ConvertPokemonNumberToInt,
  convertPokemonNumberToString,
} from "../../../utils/pokemonUtils";
import { PokemonsContext } from "../../../App";
import { useContext, useRef, useEffect } from "react";

const MIN_POKEMON_NUMBER = 1;
const MAX_POKEMON_NUMBER = 898;

export default function NavigationButtons(props) {
  const { pokemons } = useContext(PokemonsContext);
  const leftArrowButton = useRef();
  const rightArrowButton = useRef();

  const keyDownHandlerArrow = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      if (event.key === "ArrowRight") {
        rightArrowButton.current.click();
      } else {
        leftArrowButton.current.click();
      }
    }
  };

  useEffect(() => {
    if (props.showImage) {
      console.log("Adding EventListener");
      document.addEventListener("keydown", keyDownHandlerArrow);

      return () => {
        document.removeEventListener("keydown", keyDownHandlerArrow);
        console.log("Removing EventListener");
      };
    }
  }, [pokemons, props.showImage]);

  function updatePokemon(newNumber) {
    const newPokemon = getNewPokemon(newNumber);
    console.log("UpdatePokemon():", newNumber, newPokemon);
    props.setInputValue(newPokemon);

    //This will trigger an useEffect that will trigger the changing of current shown pokemon
    props.currentNumber.current = newNumber;
  }

  // Will change the current shown pokemon to a new one which has plus/minus 1 diffrence in number
  function changePokemon(event) {
    const newNumber =
      ConvertPokemonNumberToInt(pokemons[props.currentPokemon].Number) +
      parseInt(event.target.dataset.delta);

    if (newNumber >= MIN_POKEMON_NUMBER && newNumber <= MAX_POKEMON_NUMBER) {
      updatePokemon(newNumber);
    } else {
      alert("There are only Pokémon with numbers 1-898");
    }
  }

  // Will change the current shown pokemon to a new random pokemon
  function randomPokemon() {
    const randomNumber =
      Math.floor(Math.random() * (MAX_POKEMON_NUMBER - MIN_POKEMON_NUMBER)) +
      MIN_POKEMON_NUMBER;

    updatePokemon(randomNumber);
  }

  //Retrieves the name of a new Pokémon based on the provided newNumber
  function getNewPokemon(newNumber) {
    const [newPokemon] = Object.keys(pokemons).filter((pokemonName) => {
      return (
        pokemons[pokemonName].Number === convertPokemonNumberToString(newNumber)
      );
    });

    return newPokemon;
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
            data-delta={-1}
            onClick={changePokemon}
            ref={leftArrowButton}
          />
          <button onClick={randomPokemon} className="Random-Button">
            Random Pokemon
          </button>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Small_arrow_pointing_left.svg"
            alt=""
            id="right-arrow"
            className="arrows"
            data-delta={1}
            onClick={changePokemon}
            ref={rightArrowButton}
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