import "./App.css";
import React, { useEffect, useState } from "react";
import TextFileWithPokemonInfo from "./PokemonList.txt";
import Sidebar from "./Components/Sidebar";
import SearchPage from "./Pages/SearchPage";
import { Route, Routes } from "react-router-dom";
import FavouritesPage from "./Pages/FavouritesPage";

export const PokemonsContext = React.createContext();

export default function App() {
  const [pokemons, setPokemons] = useState({});
  const [favouritePokemons, setFavouritePokemons] = useState([]);

  // Gets the stored list of the favourite pokemons saved on the browser
  useEffect(() => {
    let favouritePokemonFromLocalStorage =
      localStorage.getItem("favouritePokemons");
    // checks if variable is null, and if not then adding it to the list
    if (favouritePokemonFromLocalStorage) {
      setFavouritePokemons(JSON.parse(favouritePokemonFromLocalStorage));
    }
  }, []);

  // Fetches the information about the Pokémons from a text file and store it in the pokemons object
  useEffect(() => {
    let pokemonString;
    fetch(TextFileWithPokemonInfo)
      .then((r) => r.text())
      .then((text) => {
        pokemonString = text;
        const parsedPokemons = parsePokemonString(pokemonString);
        setPokemons(parsedPokemons);
      });
  }, []);

  // Populates the given 'pokemons' object with pokemon data from the provided 'pokemonString'
  function parsePokemonString(pokemonString) {
    let pokemons = {};
    // Split the pokemonString into an array of individual pokemon entries
    let pokemonArray = pokemonString.split("\n");

    for (let i = 0; i < pokemonArray.length; i++) {
      // Split the pokemon entry into its individual properties
      let pokemon = pokemonArray[i].split(", ");

      // Create a temporary pokemon object
      let tmpPokemon = {
        Name: pokemon[0],
        Number: pokemon[1],
        Generation: pokemon[2],
        Height: pokemon[3],
        Weight: pokemon[4],
        KindOfPokemon: pokemon[5],
        Color: pokemon[6],
        Type1: pokemon[7],
        Type2: pokemon[8],
        Special: pokemon[9],
      };
      if (pokemon[0] !== "") {
        // Add the pokemon to the pokemons object, using the lowercase name as the key
        pokemons[pokemon[0].toLowerCase()] = tmpPokemon;
      }
    }
    return pokemons;
  }

  let pokemonSearchPage = (
    <SearchPage
      pokemons={pokemons}
      setFavouritePokemons={setFavouritePokemons}
      favouritePokemons={favouritePokemons}
    />
  );

  let favouritesPage = (
    <FavouritesPage
      favouritePokemons={favouritePokemons}
      setFavouritePokemons={setFavouritePokemons}
      pokemons={pokemons}
    />
  );

  return (
    <div className="App">
      <PokemonsContext.Provider value={pokemons}>
        <Sidebar />
        <div className="route-container">
          <Routes>
            <Route path="/" element={pokemonSearchPage} />
            <Route path="/Favourites" element={favouritesPage} />
          </Routes>
        </div>
      </PokemonsContext.Provider>
    </div>
  );
}
