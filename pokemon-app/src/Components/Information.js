import "./../App.css";
import React, { useEffect, useState } from "react";
import "./CSS/Information.css";

function Information(props) {
  return (
    <div className="super-info-container">
      <div className="info-div" id="kindOfPokemon">
        <span>{props.pokemons[props.currentPokemon]["KindOfPokemon"]}</span>
      </div>
      <div className="info-container">
        <div className="info-div" id="type1">
          <img
            src={require(`./../Types/${
              props.pokemons[props.currentPokemon]["Type1"]
            }.png`)}
            alt="Type1"
          />
        </div>
        <div className="info-div" id="type2">
          {props.pokemons[props.currentPokemon]["Type2"] === "N/A" ? (
            <img
              src={require(`./../Types/${
                props.pokemons[props.currentPokemon]["Type1"]
              }.png`)}
              alt="Type1"
            />
          ) : (
            <img
              src={require(`./../Types/${
                props.pokemons[props.currentPokemon]["Type2"]
              }.png`)}
              alt="Type2"
            />
          )}
        </div>
        <div className="info-div" id="Height">
          <span>{props.pokemons[props.currentPokemon]["Height"]}</span>
        </div>
        <div className="info-div" id="Weight">
          <span>{props.pokemons[props.currentPokemon]["Weight"]}</span>
        </div>
      </div>
      <div className="info-div" id="generation">
        <span>{props.pokemons[props.currentPokemon]["Generation"]}</span>
      </div>
    </div>
  );
}

export default Information;
