import { useEffect } from "react";
import { getColorAsHexadecimal } from "../../../utils/pokemonUtils";

/**
 * A custom hook that changes the background color of the body based on the current Pokemon.
 * It encapsulates a useEffect hook that listens for changes to the current Pokemon,
 * and updates the background color to match the color of the current Pokemon.
 *
 * @param {string} currentPokemon - The name of the current Pokemon
 */
export default function useChangeBackgroundColor(pokemonObject) {
  useEffect(() => {
    console.log(pokemonObject);
    if (pokemonObject) {
      document.body.style.background = getColorAsHexadecimal(
        pokemonObject.color.name
      );
    }
  }, [pokemonObject]);
}
