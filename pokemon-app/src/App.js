import "./App.css";
import React from "react";
import TextFileWithPokemonInfo from "./Assets/PokemonList.txt";
import Sidebar from "./SharedComponents/Sidebar";
import SearchPage from "./Pages/SearchPage/SearchPage";
import { Route, Routes } from "react-router-dom";
import FavouritesPage from "./Pages/FavouritePage/FavouritesPage";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import { useFetchPokemons } from "./Hooks/useFetchPokemons";

export const PokemonsContext = React.createContext();

export default function App() {
  const pokemons = useFetchPokemons(TextFileWithPokemonInfo);
  const [favouritePokemons, setFavouritePokemons] = useLocalStorage(
    "favouritePokemons",
    []
  );

  return (
    <div className="App">
      <PokemonsContext.Provider
        value={{ pokemons, favouritePokemons, setFavouritePokemons }}
      >
        <Sidebar />
        <div className="dummy-sidebar"></div>
        <div className="route-container">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/Favourites" element={<FavouritesPage />} />
          </Routes>
        </div>
      </PokemonsContext.Provider>
    </div>
  );
}
