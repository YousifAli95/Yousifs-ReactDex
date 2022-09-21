import "./../App.css";
import StarFavourite from "../Components/StarFavourite";
import "./CSS/Favourites.css";
import { useEffect } from "react";

function Favourites({ pokemons, favouritePokemons, setFavouritePokemons }) {
  useEffect(() => {
    let tmp = favouritePokemons.sort(function(a, b) {
      return pokemons[a]["Number"].localeCompare(pokemons[b]["Number"]);
    });
    setFavouritePokemons(tmp);
    console.log("When is this happening?");
  }, [pokemons, favouritePokemons, setFavouritePokemons]);

  let favouriteElement;
  if (favouritePokemons.length > 0) {
    console.log(favouritePokemons.length);
    favouriteElement = favouritePokemons.map((currentPokemon, key) => {
      let pokemonNumber = pokemons[currentPokemon]["Number"].substring(1);
      let picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`;
      return (
        <div className="one-favourite" key={key}>
          <div className="poke-name">
            <span id="Favourite-name" className="pokemon-name">
              {pokemons[currentPokemon]["Name"]}{" "}
              {pokemons[currentPokemon]["Number"]}
            </span>
            <span id="Favourite-type" className="pokemon-name">
              {pokemons[currentPokemon]["KindOfPokemon"]}
            </span>
          </div>

          <div id="img-div-id" className="img-div">
            <img
              id="Favourite-img"
              src={picture}
              alt={"A Pokemon"}
              className={"pokemon-img"}
            />
            <StarFavourite
              starPokemon={currentPokemon}
              setFavouritePokemons={setFavouritePokemons}
              favouritePokemons={favouritePokemons}
              starLeft={"87%"}
            />
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      {favouritePokemons.length > 0 && (
        <h1 className="h1-favourite">Your favourite Pokémons</h1>
      )}
      <div className="all-favourites">
        {favouritePokemons.length > 0 ? (
          favouriteElement
        ) : (
          <span id="info-span">
            You don't have any favourite Pokémons :(
            <br /> When browsing Pokémons, press the star button to add Pokémons
            to your favourites list.
          </span>
        )}
      </div>
    </div>
  );
}
export default Favourites;
