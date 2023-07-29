import "./CSS/Favourites.css";
import { PokemonsContext } from "../../App";
import { useContext } from "react";
import FavouritePokemonCard from "./Components/FavouritePokemonCard";
import { useSortFavouritePokemons } from "./Hooks/useSortFavouritePokemons";

export default function FavouritesPage() {
  const { pokemons, favouritePokemons } = useContext(PokemonsContext);
  const sortedFavouritePokemons = useSortFavouritePokemons(
    pokemons,
    favouritePokemons
  );

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
          {sortedFavouritePokemons?.length > 0 ? (
            sortedFavouritePokemons.map((pokemonName, key) => (
              <FavouritePokemonCard key={key} pokemonName={pokemonName} />
            ))
          ) : (
            <>
              <span className="info-span">
                You don't have any favourite Pokémons :(
              </span>
              <span className="info-span">
                When browsing Pokémons, press the star button to add Pokémons to
                your favourites list.
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}
