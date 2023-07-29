import { useEffect, useState } from "react";

/**
 * A custom hook that sorts the favorite Pokemon based on their numbers in the Pokedex.
 * It listens for changes in the `pokemons2` and `favouritePokemons` dependencies,
 * and returns a new array of favorite Pokemon sorted by their Pokedex numbers.
 *
 * @param {Object} pokemons - An object mapping formatted Pokemon names to their
 * Pokedex numbers.
 * @param {string[]} favouritePokemons - An array of formatted Pokemon names representing
 * the user's favorite Pokemon.
 * @returns {string[]} - A new array containing the favorite Pokemon sorted by their Pokedex numbers.
 */

function sortFavouritePokemons(pokemons, favouritePokemons) {
  if (Object.keys(pokemons).length > 0) {
    const newFavouritePokemons = [...favouritePokemons];

    newFavouritePokemons.sort((a, b) => {
      return pokemons[a] - pokemons[b];
    });

    return newFavouritePokemons;
  }

  return favouritePokemons;
}

export function useSortFavouritePokemons(pokemons, favouritePokemons) {
  const [sortedFavouritePokemons, setSortedFavouritePokemons] = useState([]);

  useEffect(() => {
    console.log(favouritePokemons);
    const sortedPokemons = sortFavouritePokemons(pokemons, favouritePokemons);
    setSortedFavouritePokemons(sortedPokemons);
  }, [pokemons, favouritePokemons]);

  return sortedFavouritePokemons;
}
