import React, { useEffect, useState, useRef, useContext } from "react";
import "./CSS/star.css";
import { PokemonsContext } from "../App";

export default function Star(props) {
  const [isYellow, setIsYellow] = useState(false);
  const [, favouritePokemons, setFavouritePokemons] =
    useContext(PokemonsContext);
  const starRef = useRef();

  // Adds the pokemon to the favourites list. Removes the pokemon if it is already there. Also changes the star color accordingly
  function changeColor(event) {
    event.preventDefault(); //prevents a link redirection that would otherwise happen
    setIsYellow((prevState) => !prevState);
    if (isYellow) {
      let newFavouritePokemons = favouritePokemons?.filter(
        (p) => p !== props.pokemonName
      );
      setFavouritePokemons(newFavouritePokemons);
    } else {
      setFavouritePokemons((p) => [...p, props.pokemonName]);
    }
  }

  // Sets the star color of current pokemon
  useEffect(() => {
    if (favouritePokemons?.includes(props.pokemonName)) {
      setIsYellow(true);
    } else {
      setIsYellow(false);
    }
  }, [props.pokemonName, favouritePokemons]);

  // Updates the favoruites pokemon list on the browser's memory
  useEffect(() => {
    localStorage.setItem(
      "favouritePokemons",
      JSON.stringify(favouritePokemons)
    );
  }, [favouritePokemons]);

  // Adds the correct classes to the svg element when props changes.
  useEffect(() => {
    if (starRef.current) {
      const svgElement = starRef.current;
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
