/**
 * A custom hook that fetches information about a Pokemon and returns the data.
 * It encapsulates a useEffect hook that listens for changes to the current Pokemon,
 * fetches the species and details of the Pokemon from the PokeAPI,
 * and returns the processed Pokemon data.
 *
 * @param {string} currentPokemon - The name of the current Pokemon.
 * @param {Object} pokemons - An object mapping formatted Pokemon names to their
 * pokedex numbers.
 * @returns {object} - An object containing information about the current Pokemon.
 */

import { useEffect, useState } from "react";

function useFetchPokemonInformation(currentPokemon, pokemons) {
  const [pokemonObject, setPokemonObject] = useState(null);

  const fetchPokemonInformation = async () => {
    try {
      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemons[currentPokemon]}`
      );
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemons[currentPokemon]}`
      );

      const [speciesData, pokemonDetails] = await Promise.all([
        speciesResponse.json(),
        pokemonResponse.json(),
      ]);

      const types = pokemonDetails.types.map((typeData) => typeData.type.name);

      const category = speciesData.genera.find(
        (genus) => genus.language.name === "en"
      );

      speciesData["category"] = category.genus;
      speciesData["types"] = types;

      speciesData["height"] = (parseFloat(pokemonDetails.height) / 10).toFixed(
        1
      );

      speciesData["weight"] = (parseFloat(pokemonDetails.weight) / 10).toFixed(
        1
      );

      setPokemonObject(speciesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPokemonInformation();
  }, [currentPokemon]);

  return pokemonObject;
}

export default useFetchPokemonInformation;
