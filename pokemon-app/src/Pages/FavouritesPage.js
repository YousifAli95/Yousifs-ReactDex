import "./../App.css";
import "./CSS/Favourites.css";
import { PokemonsContext } from "../App";
import { useEffect, useContext } from "react";
import Star from "../Components/Star";

export default function FavouritesPage({
  favouritePokemons,
  setFavouritePokemons,
}) {
  const pokemons = useContext(PokemonsContext);
  let favouriteElement;

  // Sort the favourite pokemons based on their number
  useEffect(() => {
    console.log(favouritePokemons);
    if (Object.keys(pokemons).length > 0) {
      let sortedFavouritesPokemon = favouritePokemons.sort(function (a, b) {
        return pokemons[a].Number.localeCompare(pokemons[b].Number);
      });
      setFavouritePokemons(sortedFavouritesPokemon);
    }
  }, [pokemons, favouritePokemons]);

  // Conditional rendering and mapping of favourite Pokemons to generate variable favouriteElement if there are valid data present.
  if (favouritePokemons.length > 0 && Object.keys(pokemons).length > 0) {
    console.log(favouritePokemons.length);
    favouriteElement = favouritePokemons.map((currentPokemon, key) => {
      let pokemonNumber = pokemons[currentPokemon].Number.substring(1);
      let image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`;
      return (
        <div className="one-favourite" key={key}>
          <div className="poke-name">
            <span id="Favourite-name" className="pokemon-name">
              {pokemons[currentPokemon].Name} {pokemons[currentPokemon].Number}
            </span>
            <span id="Favourite-type" className="pokemon-name">
              {pokemons[currentPokemon].KindOfPokemon}
            </span>
          </div>

          <div id="img-div-id" className="img-div">
            <img
              id="Favourite-img"
              src={image}
              alt={"A Pokemon"}
              className={"pokemon-img"}
            />
            <Star
              currentPokemon={currentPokemon}
              setFavouritePokemons={setFavouritePokemons}
              favouritePokemons={favouritePokemons}
              extraClasses={"starleft-87 white-hover"}
            />
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="main-container">
        {favouritePokemons.length > 0 && (
          <h1 className="h1-favourite">
            You have {favouritePokemons.length} Favourite Pokémons
          </h1>
        )}
        <div className="all-favourites">
          {favouritePokemons.length > 0 ? (
            favouriteElement
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
