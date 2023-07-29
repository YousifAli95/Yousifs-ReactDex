import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Star from "../../../SharedComponents/Star";
import { PokemonsContext } from "../../../App";
import {
  convertPokemonNumberToString,
  padWithLeadingZeros,
} from "../../../utils/pokemonUtils";

export default function FavouritePokemonCard({ pokemonName }) {
  const { pokemons } = useContext(PokemonsContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    const pokeDexNumber = padWithLeadingZeros(pokemons[pokemonName], 3);
    setImage(
      `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeDexNumber}.png`
    );
  }, [pokemons, pokemonName]);

  return (
    <Link className="ahref-card" to={`/?current-pokemon=${pokemonName}`}>
      <div className="one-favourite">
        <div className="poke-name">
          <span className="favourite-name pokemon-name">
            {`${pokemonName} ${convertPokemonNumberToString(
              pokemons[pokemonName]
            )}`}
          </span>
        </div>
        <div id="img-div-id" className="img-div">
          <img
            id="favourite-img"
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
