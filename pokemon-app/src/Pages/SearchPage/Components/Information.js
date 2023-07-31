import { formatGeneration } from "../../../utils/pokemonUtils";
import "../CSS/Information.css";
import useFetchPokemonInformation from "../Hooks/useFetchPokemonInformation";
import useChangeBackgroundColor from "../Hooks/useChangeBackgroundColor";
import { useContext } from "react";
import { PokemonsContext } from "../../../App";

export default function Information({ currentPokemon }) {
  const { pokemons } = useContext(PokemonsContext);
  const pokemonObject = useFetchPokemonInformation(currentPokemon, pokemons);

  useChangeBackgroundColor(pokemonObject);

  return (
    <>
      {pokemonObject && (
        <div className="info-container">
          <div className="info-div big-column" id="kindOfPokemon">
            <span>{pokemonObject.category}</span>
          </div>
          <div className="info-div" id="type1">
            <img
              src={require(`../../../Assets/Types/${pokemonObject.types[0]}.png`)}
              alt="Type1"
            />
          </div>
          <div className="info-div" id="type2">
            {pokemonObject?.types.length > 1 ? (
              <img
                src={require(`../../../Assets/Types/${pokemonObject.types[1]}.png`)}
                alt="Type1"
              />
            ) : (
              <img
                src={require(`../../../Assets/Types/${pokemonObject.types[0]}.png`)}
                alt="Type2"
              />
            )}
          </div>
          <div className="info-div" id="Height">
            <span>{pokemonObject.height} m</span>
          </div>
          <div className="info-div" id="Weight">
            <span>{pokemonObject.weight} kg</span>
          </div>
          <div className="info-div big-column" id="generation">
            <span>{formatGeneration(pokemonObject.generation.name)}</span>
          </div>
        </div>
      )}
    </>
  );
}
