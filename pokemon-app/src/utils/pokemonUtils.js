// Returns a string representation of the input number with a "#" symbol and leading zeros if necessary.
export function convertPokemonNumberToString(number) {
  return "#" + String(number).padStart(3, "0");
}

// Returns an int representation of a string in this format "#DDD".
export function ConvertPokemonNumberToInt(numberAsString) {
  return parseInt(numberAsString.replace("#", ""));
}

// Converts a string of format "generation-vii" to "Generation VII".
export function formatGeneration(generationString) {
  let [generation, romanNumber] = generationString.split("-");
  generation =
    generation.charAt(0).toUpperCase() + generation.slice(1).toLowerCase();
  romanNumber = romanNumber.toUpperCase();

  return `${generation} ${romanNumber}`;
}

// Capitalizes the first letter of a string.
export function formatPokemonName(pokemonName) {
  return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}

// Capitalizes the first letter in each sentence and makes all other letters lower case.
// Removes also all new lines and "form feeds".
export function formatFlavorText(text) {
  return text
    .replace("\n", " ")
    .replace("\f", " ")
    .toLowerCase()
    .replace(/(?<=(?:^|[.?!])\W*)[a-z]/g, (i) => i.toUpperCase());
}

//Converts an "number" to a "width" long string that is zero padded. 7 Becomes 007 if "width" is 3 for example.
export function padWithLeadingZeros(number, width) {
  return number.toString().padStart(width, "0");
}

// Returns the hexadecimalformat of a color.
export function getColorAsHexadecimal(color) {
  switch (color) {
    case "green":
      return "#8FBC8F";
    case "white":
      return "#FFF5EE";
    case "brown":
      return "#DEB887";
    case "red":
      return "#CD5C5C";
    case "purple":
      return "#DDA0DD";
    case "gray":
      return "#C0C0C0";
    case "blue":
      return "#87CEEB";
    case "pink":
      return "#FFC0CB";
    case "yellow":
      return "#F5DEB3";
    case "black":
      return "#708090";
    default:
      return "#87CEEB";
  }
}
