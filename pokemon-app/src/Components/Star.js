import React, { useEffect, useState, useRef } from "react";
import "./../App.css";

function Star(props) {
  const [isYellow, setIsYellow] = useState(false);
  const starRef = useRef();

  // Adds the pokemon to the favourites list. Removes the pokemon if it is already there. Also changes the star color accordingly
  function changeColor() {
    setIsYellow((prevState) => !prevState);
    if (isYellow) {
      let newFavouritePokemons = props.favouritePokemons.filter(
        (p) => p !== props.currentPokemon
      );
      props.setFavouritePokemons(newFavouritePokemons);
    } else {
      props.setFavouritePokemons((p) => [...p, props.currentPokemon]);
    }
  }

  // Sets the star color of current pokemon
  useEffect(() => {
    if (props.favouritePokemons.includes(props.currentPokemon)) {
      setIsYellow(true);
    } else {
      setIsYellow(false);
    }
  }, [props.currentPokemon]);

  // Updates the favoruites pokemon list on the browser's memory
  useEffect(() => {
    localStorage.setItem(
      "favouritePokemons",
      JSON.stringify(props.favouritePokemons)
    );
    console.log("Favourites list");
    console.log(props.favouritePokemons);
  }, [props.favouritePokemons]);

  useEffect(() => {
    if (starRef.current) {
      const svgElement = starRef.current;

      // Remove all existing classes from the SVG element
      svgElement.classList = "";
      if (props.extraClasses) {
        props.extraClasses.split(" ").forEach((extraClass) => {
          svgElement.classList.add(extraClass);
        });
      }
      svgElement.classList.add("star");

      if (isYellow) {
        svgElement.classList.add("star-is-yellow");
      } else {
        svgElement.classList.add("star-is-not-yellow");
      }
    }
  }, [props.extraClasses, isYellow]);

  return (
    <svg
      ref={starRef}
      viewBox="0 0 300 275"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="star"
      onClick={changeColor}
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
