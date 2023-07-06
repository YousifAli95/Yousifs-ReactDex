import "./CSS/arrows.css";
import {
  ConvertPokemonNumberToInt,
  convertPokemonNumberToString,
} from "../utils/pokemonUtils";
import { PokemonsContext } from "../App";
import { useContext } from "react";

export default function Arrows(props) {
  const [pokemons] = useContext(PokemonsContext);

  // Will change the current shown pokemon to a new one which has plus/minus 1 diffrence in number
  function changePokemon(event) {
    const newNumber =
      ConvertPokemonNumberToInt(pokemons[props.currentPokemon].Number) +
      parseInt(event.target.dataset.delta);

    if (newNumber > 0 && newNumber <= 898) {
      const newPokemon = getNewPokemon(newNumber);
      props.setInputValue(newPokemon);
      //This will trigger an useEffect that will trigger the changing of current shown pokemon
      props.currentNumber.current = newNumber;

      console.log("changePokemon();", newNumber, newPokemon);
    } else {
      alert("There are only Pokémon with numbers 1-898");
    }
  }

  // Will change the current shown pokemon to a new random pokemon
  function randomPokemon() {
    const randomNumber = Math.floor(Math.random() * (898 - 1)) + 1;
    const newPokemon = getNewPokemon(randomNumber);
    props.setInputValue(newPokemon);
    //This will trigger an useEffect that will trigger the changing of current shown pokemon
    props.currentNumber.current = randomNumber;

    console.log("RandomPokemon():", randomNumber, newPokemon);
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
