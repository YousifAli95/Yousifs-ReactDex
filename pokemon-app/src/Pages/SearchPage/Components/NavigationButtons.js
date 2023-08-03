import "../CSS/Arrows.css";
import { PokemonsContext } from "../../../App";
import { useContext, useRef, useEffect } from "react";

const MIN_POKEMON_NUMBER = 1;

export default function NavigationButtons(props) {
  const { MAX_POKEMON_NUMBER, pokemons } = useContext(PokemonsContext);
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
    if (props.showImage && Object.keys(pokemons).length > 0) {
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
    props.setInputValue("");
    console.log("UpdatePokemon():", newNumber, newPokemon);

    props.setCurrentPokemon(newPokemon);
  }

  // Will change the current shown pokemon to a new one which has plus/minus 1 diffrence in number
  function changePokemon(event) {
    const newNumber =
      pokemons[props.currentPokemon] + parseInt(event.target.dataset.delta);

    if (newNumber >= MIN_POKEMON_NUMBER && newNumber <= MAX_POKEMON_NUMBER) {
      updatePokemon(newNumber);
    } else {
      alert(`There are only Pokémon with numbers 1-${MAX_POKEMON_NUMBER}`);
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
      return pokemons[pokemonName] === newNumber;
    });

    return newPokemon;
  }

  return (
    <div className="navigation-buttons-container">
      {props.showImage ? (
        <>
          <button
            className="arrow-button"
            data-delta={-1}
            onClick={changePokemon}
            ref={leftArrowButton}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Small_arrow_pointing_left.svg"
              data-delta={-1}
              alt="left arrow button"
              id="left-arrow"
              className="arrows"
            />
          </button>
          <button onClick={randomPokemon} className="random-button">
            Random Pokemon
          </button>
          <button
            className="arrow-button"
            data-delta={1}
            onClick={changePokemon}
            ref={rightArrowButton}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Small_arrow_pointing_left.svg"
              data-delta={1}
              alt="right arrow button"
              id="right-arrow"
              className="arrows"
            />
          </button>
        </>
      ) : (
        <button
          onClick={randomPokemon}
          id="startpage-random-btn"
          className="random-button"
        >
          Random Pokemon
        </button>
      )}
    </div>
  );
}
