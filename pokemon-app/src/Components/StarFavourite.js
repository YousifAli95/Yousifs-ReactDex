import React, { useEffect, useState } from "react";
import "./../App.css";

function StarFavourite(props) {
  function changeColor() {
    if (props.favouritePokemons.length === 1) {
      props.setFavouritePokemons([]);
      localStorage.removeItem("favouritePokemons");
    } else {
      let newFavouritePokemons = props.favouritePokemons.filter((p) => {
        return p !== props.starPokemon;
      });
      console.log(newFavouritePokemons);
      props.setFavouritePokemons(newFavouritePokemons);
    }
  }

  useEffect(() => {
    localStorage.setItem(
      "favouritePokemons",
      JSON.stringify(props.favouritePokemons)
    );
    console.log("Favourites");
    console.log(props.favouritePokemons);
  }, [props.favouritePokemons]);
  return (
    <svg
      viewBox="0 0 300 275"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="star"
      onClick={changeColor}
      style={{ fill: "yellow", left: props.starLeft }}
    >
      <polygon
        stroke="#00008b"
        strokeWidth="15"
        points="150,25  179,111 269,111 197,165
                    223,251  150,200 77,251  103,165
                    31,111 121,111"
      />
    </svg>
  );
}

export default StarFavourite;
