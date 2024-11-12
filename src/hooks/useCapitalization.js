// useCapitalization.js
function useCapitalization(str) {
  const capitalizeFirstLetter = (inputString) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  };

  const capitalizedString = capitalizeFirstLetter(str);

  return capitalizedString;
}

export default useCapitalization;
