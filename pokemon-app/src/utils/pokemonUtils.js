// Returns a string representation of the input number with a "#" symbol and leading zeros if necessary.
export function getPokemonNumber(number) {
  return "#" + String(number).padStart(3, "0");
}
