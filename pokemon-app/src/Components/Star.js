import React, { useEffect, useState } from "react";
import "./../App.css";

function Star(props) {
  const [isYellow, setIsYellow] = useState(false);
  function changeColor() {
    setIsYellow((prevState) => !prevState);
    if (isYellow) {
      let newFavouritePokemons = props.favouritePokemons.filter((p) => {
        return p !== props.currentPokemon;
      });
      props.setFavouritePokemons(newFavouritePokemons);
    } else {
      props.setFavouritePokemons((p) => [...p, props.currentPokemon]);
    }
  }
  useEffect(() => {
    console.log("(props.currentPokemon use effect");
    console.log(props.currentPokemon);
    if (props.favouritePokemons.includes(props.currentPokemon)) {
      setIsYellow(true);
    } else {
      setIsYellow(false);
    }
  }, [props.currentPokemon]);

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
      style={
        isYellow
          ? { fill: "yellow", left: props.starLeft }
          : { fill: "white", left: props.starLeft }
      }
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

export default Star;
