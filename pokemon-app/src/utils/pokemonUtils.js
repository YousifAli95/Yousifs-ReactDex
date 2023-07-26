// Returns a string representation of the input number with a "#" symbol and leading zeros if necessary.
export function convertPokemonNumberToString(number) {
  return "#" + String(number).padStart(3, "0");
}

// Returns an int representation of a string in this format "#DDD"
export function ConvertPokemonNumberToInt(numberAsString) {
  return parseInt(numberAsString.replace("#", ""));
}
