import SearchForm from "../Components/SearchForm";
import Information from "../Components/Information";
import Arrows from "../Components/Arrows";
import Star from "../Components/Star.js";
import { PokemonsContext } from "../App";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [pokemons] = useContext(PokemonsContext);
  const currentNumber = useRef("");
  const [inputValue, setInputValue] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState(
    params.get("current-pokemon")
  );
  const STANDARD_BODY_COLOR = "#87CEEB";

  // Updates the image on the search page
  useEffect(() => {
    if (currentPokemon !== "" && pokemons[currentPokemon]) {
      let pokemonNumber = pokemons[currentPokemon]["Number"].substring(1);
      setImageURL(
        `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`
      );
      setShowImage(true);
    }
  }, [currentPokemon, pokemons]);

  // Sets the body background color when component is mounted
  useEffect(() => {
    document.body.style.background = STANDARD_BODY_COLOR;
  }, []);

  return (
    <div className="search-container">
      <div className="input-div">
        <SearchForm
          setImage={setImageURL}
          setInputValue={setInputValue}
          inputValue={inputValue}
          setShowImage={setShowImage}
          setCurrentPokemon={setCurrentPokemon}
          currentPokemon={currentPokemon}
          currentNumber={currentNumber}
        />
      </div>

      <div className="arrows-info">
        <Arrows
          currentPokemon={currentPokemon}
          setCurrentPokemon={setCurrentPokemon}
          setInputValue={setInputValue}
          currentNumber={currentNumber}
          showImage={showImage}
          width={"40 rem"}
        />
      </div>
      {showImage && (
        <>
          <div className="img-and-info">
            <span className="pokemon-name">
              {pokemons[currentPokemon]["Name"]}{" "}
              {pokemons[currentPokemon]["Number"]}
            </span>
            <div className="img-div">
              <img src={imageURL} alt={"A Pokemon"} className="pokemon-img" />
              <Star currentPokemon={currentPokemon} />
              <Information
                currentPokemon={currentPokemon}
                pokemons={pokemons}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
