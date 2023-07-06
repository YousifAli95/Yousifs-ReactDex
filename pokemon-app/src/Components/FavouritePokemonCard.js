import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Star from "./Star";
import { PokemonsContext } from "../App";

export default function FavouritePokemonCard({ pokemonName }) {
  const [pokemons] = useContext(PokemonsContext);
  const [pokemon, setPokemon] = useState();
  const [image, setImage] = useState("");

  useEffect(() => {
    setPokemon(pokemons[pokemonName]);
    const number = pokemons[pokemonName]?.Number.substring(1);
    setImage(
      `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`
    );
  }, [pokemons, pokemonName]);

  return (
    <Link className="ahref-card" to={`/?current-pokemon=${pokemonName}`}>
      <div className="one-favourite">
        <div className="poke-name">
          <span id="Favourite-name" className="pokemon-name">
            {pokemon?.Name} {pokemon?.Number}
          </span>
          <span id="Favourite-type" className="pokemon-name">
            {pokemon?.KindOfPokemon}
          </span>
        </div>
        <div id="img-div-id" className="img-div">
          <img
            id="Favourite-img"
            src={image}
            alt="A Pokemon"
            className="pokemon-img"
          />
          <Star
            pokemonName={pokemonName}
            extraClasses="starleft-87 white-hover"
          />
        </div>
      </div>
    </Link>
  );
}
