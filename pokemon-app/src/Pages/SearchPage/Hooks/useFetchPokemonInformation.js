import { useEffect, useState } from "react";
import {
  formatFlavorText,
  formatGeneration,
  formatCatchRate,
} from "../../../utils/pokemonUtils";
import axios from "axios";

function useFetchPokemonInformation(currentPokemon, pokemons) {
  const [pokemonObject, setPokemonObject] = useState(null);
  const abortController = new AbortController();

  useEffect(() => {
    const fetchPokemonInformation = async () => {
      try {
        const newPokemonObject = {};

        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemons[currentPokemon]}`,
          { signal: abortController.signal }
        );
        const pokemonResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemons[currentPokemon]}`,
          { signal: abortController.signal }
        );

        const [speciesData, pokemonDetails] = await Promise.all([
          speciesResponse.data,
          pokemonResponse.data,
        ]);

        newPokemonObject["name"] = pokemonDetails.name;

        newPokemonObject["generation"] = formatGeneration(
          speciesData.generation.name
        );

        const types = pokemonDetails.types.map(
          (typeData) => typeData.type.name
        );
        newPokemonObject["types"] = types;

        const category = speciesData.genera.find(
          (genus) => genus.language.name === "en"
        );
        newPokemonObject["category"] = category.genus;

        const flavorText = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        newPokemonObject["flavorText"] = formatFlavorText(
          flavorText.flavor_text
        );

        newPokemonObject["catchRate"] = formatCatchRate(
          speciesData.capture_rate
        );

        newPokemonObject["color"] = speciesData.color.name;

        newPokemonObject["height"] = (
          parseFloat(pokemonDetails.height) / 10
        ).toFixed(1);

        newPokemonObject["weight"] = (
          parseFloat(pokemonDetails.weight) / 10
        ).toFixed(1);

        setPokemonObject(newPokemonObject);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (pokemons[currentPokemon]) fetchPokemonInformation();

    return () => {
      abortController.abort();
    };
  }, [currentPokemon, pokemons]);

  return pokemonObject;
}

export default useFetchPokemonInformation;
