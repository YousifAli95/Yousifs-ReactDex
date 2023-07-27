import { useState, useEffect } from "react";

/**
 * A custom hook that fetches Pokemon data from a given text file,
 * parses the data into a useful format, and provides the data as state.
 *
 * @param {string} TextFileWithPokemonInfo - The URL of the text file containing the Pokemon data
 * @return {object} The parsed Pokemon data as an object
 */
export default function useFetchPokemons(TextFileWithPokemonInfo) {
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    fetch(TextFileWithPokemonInfo)
      .then((r) => r.text())
      .then((text) => {
        const parsedPokemons = parsePokemonString(text);
        setPokemons(parsedPokemons);
      });
  }, [TextFileWithPokemonInfo]);

  return pokemons;
}

function parsePokemonString(pokemonString) {
  let pokemons = {};
  let pokemonArray = pokemonString.split("\n");

  for (let i = 0; i < pokemonArray.length; i++) {
    let pokemon = pokemonArray[i].split(", ");
    let tmpPokemon = {
      Name: pokemon[0],
      Number: pokemon[1],
      Generation: pokemon[2],
      Height: pokemon[3],
      Weight: pokemon[4],
      KindOfPokemon: pokemon[5],
      Color: pokemon[6],
      Type1: pokemon[7],
      Type2: pokemon[8],
      Special: pokemon[9],
    };
    if (pokemon[0] !== "" && pokemon[0] !== "\r") {
      pokemons[pokemon[0].toLowerCase()] = tmpPokemon;
    }
  }
  return pokemons;
}
