import "./../App.css";
import "./CSS/Favourites.css";
import { PokemonsContext } from "../App";
import { useEffect, useContext } from "react";
import FavouritePokemonCard from "../Components/FavouritePokemonCard";

export default function FavouritesPage() {
  const [pokemons, favouritePokemons, setFavouritePokemons] =
    useContext(PokemonsContext);

  // Sort the favourite pokemons based on their number
  useEffect(() => {
    console.log(favouritePokemons);
    const sortedFavouritePokemons = sortFavouritePokemons(
      pokemons,
      favouritePokemons
    );
    setFavouritePokemons(sortedFavouritePokemons);
  }, [pokemons, favouritePokemons.length]);

  function sortFavouritePokemons(pokemons, favouritePokemons) {
    if (Object.keys(pokemons).length > 0) {
      const newFavouritePokemons = [...favouritePokemons];
      newFavouritePokemons.sort((a, b) => {
        return pokemons[a]?.Number.localeCompare(pokemons[b]?.Number);
      });

      return newFavouritePokemons;
    }

    return favouritePokemons;
  }

  return (
    <>
      <div className="main-container">
        {favouritePokemons?.length > 0 && (
          <h1 className="h1-favourite">
            You have {favouritePokemons?.length} Favourite Pokémon
            {favouritePokemons?.length > 1 && "s"}
          </h1>
        )}
        <div className="all-favourites">
          {favouritePokemons?.length > 0 ? (
            favouritePokemons.map((pokemonName, key) => (
              <FavouritePokemonCard key={key} pokemonName={pokemonName} />
            ))
          ) : (
            <span id="info-span">
              You don't have any favourite Pokémons :(
              <br /> When browsing Pokémons, press the star button to add
              Pokémons to your favourites list.
            </span>
          )}
        </div>
      </div>
    </>
  );
}
