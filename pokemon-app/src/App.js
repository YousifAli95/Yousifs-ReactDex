import "./App.css";
import React from "react";
import Sidebar from "./SharedComponents/Sidebar";
import SearchPage from "./Pages/SearchPage/SearchPage";
import { Route, Routes } from "react-router-dom";
import FavouritesPage from "./Pages/FavouritePage/FavouritesPage";
import useLocalStorage from "./Hooks/useLocalStorage";
import useFetchPokemons from "./Hooks/useFetchPokemons";

export const PokemonsContext = React.createContext();
const MAX_POKEMON_NUMBER = 1010;

export default function App() {
  const pokemons = useFetchPokemons(MAX_POKEMON_NUMBER);
  const [favouritePokemons, setFavouritePokemons] = useLocalStorage(
    "favouritePokemons",
    []
  );

  return (
    <div className="App">
      <PokemonsContext.Provider
        value={{
          pokemons,
          favouritePokemons,
          setFavouritePokemons,
          MAX_POKEMON_NUMBER,
        }}
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
