import { useEffect, useState } from "react";
import { formatPokemonName } from "../utils/pokemonUtils";

/**
 * A custom hook that fetches a list of Pokemons and returns an object mapping
 * the formatted Pokemon names to their respective pokedex numbers.
 *
 * @param {number} MAX_POKEMON_NUMBER - The maximum number of Pokemons to fetch.
 * @returns {object} - An object mapping formatted Pokemon names to their
 * pokedex numbers.
 */

export default function useFetchPokemons(MAX_POKEMON_NUMBER) {
  const [pokemonsObject, setPokemonsObject] = useState({});

  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON_NUMBER}&offset=0`
    )
      .then((response) => response.json())
      .then((json) => {
        const newObject = Object.keys(json.results).reduce((result, index) => {
          const { name } = json.results[index];

          result[formatPokemonName(name)] = parseInt(index) + 1;
          return result;
        }, {});
        setPokemonsObject(newObject);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [MAX_POKEMON_NUMBER]);

  return pokemonsObject;
}
