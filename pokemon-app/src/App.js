import "./App.css";
import React, { useEffect, useState } from "react";
import TextFileWithPokemonInfo from "./PokemonList.txt";
import Sidebar from "./Components/Sidebar";
import Search from "./Pages/Search";
import { Route, Routes } from "react-router-dom";
import Favourites from "./Pages/Favourites";

function App() {
  const [pokemons, setPokemons] = useState({});
  const [pokemonString, setPokemonString] = useState("");
  const [favouritePokemons, setFavouritePokemons] = useState([]);

  useEffect(() => {
    let favouritePokemonFromLocalStorage =
      localStorage.getItem("favouritePokemons");
    //checks if variable is null, and if not then adding it to the list (check for truthy value)
    if (favouritePokemonFromLocalStorage) {
      setFavouritePokemons(JSON.parse(favouritePokemonFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    fetch(TextFileWithPokemonInfo)
      .then((r) => r.text())
      .then((text) => {
        setPokemonString(text);
      });
    let pokemonArray = pokemonString.split("\n");
    for (let i = 0; i < pokemonArray.length; i++) {
      let onePokemon = pokemonArray[i].split(", ");
      //console.log(onePokemon);
      let tmp = {};
      tmp = {
        Name: onePokemon[0],
        Number: onePokemon[1],
        Generation: onePokemon[2],
        Height: onePokemon[3],
        Weight: onePokemon[4],
        KindOfPokemon: onePokemon[5],
        Color: onePokemon[6],
        Type1: onePokemon[7],
        Type2: onePokemon[8],
        Special: onePokemon[9],
      };
      setPokemons((prevState) => ({
        ...prevState,
        [onePokemon[0].toLowerCase()]: tmp,
      }));
    }
  }, [pokemonString]);

  let PokemonSearch = (
    <Search
      pokemons={pokemons}
      setFavouritePokemons={setFavouritePokemons}
      favouritePokemons={favouritePokemons}
    />
  );

  let FavouritesPage = (
    <Favourites
      favouritePokemons={favouritePokemons}
      setFavouritePokemons={setFavouritePokemons}
      pokemons={pokemons}
    />
  );

  return (
    <div className="App">
      <Sidebar />
      <div className="route-container">
        <Routes>
          <Route path="/" element={PokemonSearch} />
          <Route path="/Favourites" element={FavouritesPage} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
