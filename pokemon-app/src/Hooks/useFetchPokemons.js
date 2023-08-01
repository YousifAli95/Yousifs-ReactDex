import { useEffect, useState } from "react";
import { formatPokemonName } from "../utils/pokemonUtils";
import axios from "axios";

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
  const abortController = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON_NUMBER}&offset=0`,
          { signal: abortController.signal }
        );
        const { data } = response;
        const newObject = Object.keys(data.results).reduce((result, index) => {
          const { name: pokemonName } = data.results[index];

          result[formatPokemonName(pokemonName)] = parseInt(index) + 1;
          return result;
        }, {});
        setPokemonsObject(newObject);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => {
      console.log("abortController.abort()");
      abortController.abort();
    };
  }, [MAX_POKEMON_NUMBER]);

  return pokemonsObject;
}
