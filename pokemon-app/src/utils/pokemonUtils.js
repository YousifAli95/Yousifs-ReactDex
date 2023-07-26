// Returns a string representation of the input number with a "#" symbol and leading zeros if necessary.
export function convertPokemonNumberToString(number) {
  return "#" + String(number).padStart(3, "0");
}

// Returns an int representation of a string in this format "#DDD"
export function ConvertPokemonNumberToInt(numberAsString) {
  return parseInt(numberAsString.replace("#", ""));
}

export function getColorAsHexadecimal(color) {
  switch (color) {
    case "Green":
      return "#8FBC8F";
    case "White":
      return "#FFF5EE";
    case "Brown":
      return "#DEB887";
    case "Red":
      return "#CD5C5C";
    case "Purple":
      return "#DDA0DD";
    case "Gray":
      return "#C0C0C0";
    case "Blue":
      return "#87CEEB";
    case "Pink":
      return "#FFC0CB";
    case "Yellow":
      return "#F5DEB3";
    case "Black":
      return "#708090";
    default:
      return "#87CEEB";
  }
}
