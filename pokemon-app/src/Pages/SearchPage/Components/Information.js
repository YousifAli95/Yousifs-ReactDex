import { PokemonsContext } from "../../../App";
import React, { useContext } from "react";
import "../CSS/Information.css";

export default function Information(props) {
  const { pokemons } = useContext(PokemonsContext);

  return (
    <div className="super-info-container">
      <div className="info-div" id="kindOfPokemon">
        <span>{pokemons[props.currentPokemon]["KindOfPokemon"]}</span>
      </div>
      <div className="info-container">
        <div className="info-div" id="type1">
          <img
            src={require(`./../../../Assets/Types/${
              pokemons[props.currentPokemon]["Type1"]
            }.png`)}
            alt="Type1"
          />
        </div>
        <div className="info-div" id="type2">
          {pokemons[props.currentPokemon]["Type2"] === "N/A" ? (
            <img
              src={require(`./../../../Assets/Types/${
                pokemons[props.currentPokemon]["Type1"]
              }.png`)}
              alt="Type1"
            />
          ) : (
            <img
              src={require(`./../../../Assets/Types/${
                pokemons[props.currentPokemon]["Type2"]
              }.png`)}
              alt="Type2"
            />
          )}
        </div>
        <div className="info-div" id="Height">
          <span>{pokemons[props.currentPokemon]["Height"]}</span>
        </div>
        <div className="info-div" id="Weight">
          <span>{pokemons[props.currentPokemon]["Weight"]}</span>
        </div>
      </div>
      <div className="info-div" id="generation">
        <span>{pokemons[props.currentPokemon]["Generation"]}</span>
      </div>
    </div>
  );
}
