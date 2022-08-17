import FakeDataList from "./../Components/FakeDataList";
import Information from "./../Components/Information";
import Arrows from "./../Components/Arrows";
import Star from "./../Components/Star.js";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Search({ pokemons, favouritePokemons, setFavouritePokemons }) {
  const [currentNumber, setCurrentNumber] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [picture, setPicture] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState("");

  useEffect(() => {
    if (currentPokemon !== "") {
      let pokemonNumber = pokemons[currentPokemon]["Number"].substring(1);
      setPicture(
        `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`
      );
      setShowImage(true);
    }
  }, [currentPokemon]);

  return (
    <div className="search-container">
      <div className="input-div">
        <FakeDataList
          setPicture={setPicture}
          setInputValue={setInputValue}
          inputValue={inputValue}
          pokemons={pokemons}
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
          pokemons={pokemons}
          setInputValue={setInputValue}
          setCurrentNumber={setCurrentNumber}
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
              <img src={picture} alt={"A Pokemon"} className="pokemon-img" />
              <Star
                currentPokemon={currentPokemon}
                setFavouritePokemons={setFavouritePokemons}
                favouritePokemons={favouritePokemons}
                starLeft={"92%"}
              />

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
export default Search;
