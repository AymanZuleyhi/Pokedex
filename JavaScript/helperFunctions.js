// General helper functions.
const createElements = (elements) => {
  const createdElements = {};

  for (const [key, value] of Object.entries(elements)) {
    const element = document.createElement(value);
    createdElements[key] = element;
  }

  return createdElements;
};
const selectElements = (elements) => {
  const selectedElements = {};

  for (const [key, value] of Object.entries(elements)) {
    selectedElements[key] = document.querySelector(value);
  }

  return selectedElements;
};
const appendElements = (array) => {
  for (const [perent, child] of array) {
    perent.appendChild(child);
  }
};
const toggleElement = (element, displayStatus) => {
  element.style.display = displayStatus;
};
const clearContent = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
const getNestedValue = (json, path) => {
  const key = path.split(".");

  return key.reduce((acc, part) => {
    return acc && acc[part];
  }, json);
};

// Helper functions for formating the Pokemon name and id, and the background color.
const formatPokemonName = (name) => {
  // string => String.
  let pokemonName = "";

  for (let i = 0; i < name.length; i++) {
    i === 0 ? (pokemonName += name[i].toUpperCase()) : (pokemonName += name[i]);
  }

  return pokemonName;
};
const formatPokemonId = (id) => {
  // 10 => #0010
  const toString = String(id);
  switch (toString.length) {
    case 1:
      return "#000" + id;
    case 2:
      return "#00" + id;
    case 3:
      return "#0" + id;
    case 4:
      return "#" + id;
    default:
      throw new Error("Invalid number!");
  }
};
const getBackgroundColor = (type) => {
  switch (type) {
    case "Normal":
      return "rgba(168,168,120,0.5)";
    case "Fire":
      return "rgba(234,171,126,0.8)";
    case "Water":
      return "rgba(207,229,236,0.5)";
    case "Electric":
      return "rgba(248,208,48,0.5)";
    case "Grass":
      return "rgba(137,185,137,0.5)";
    case "Ice":
      return "rgba(152,216,216,0.5)";
    case "Fighting":
      return "rgba(192,48,40,0.5)";
    case "Poison":
      return "rgba(160,64,160,0.5)";
    case "Ground":
      return "rgba(224,192,104,0.5)";
    case "Flying":
      return "rgba(168,144,240,0.5)";
    case "Psychic":
      return "rgba(248,88,136,0.5)";
    case "Bug":
      return "rgba(168,184,32,0.5)";
    case "Rock":
      return "rgba(184,160,56,0.5)";
    case "Ghost":
      return "rgba(112,88,152,0.5)";
    case "Dragon":
      return "rgba(112,56,248,0.5)";
    case "Dark":
      return "rgba(112,88,72,0.5)";
    case "Steel":
      return "rgba(184,184,208,0.5)";
    case "Fairy":
      return "rgba(238,153,172,0.5)";
    default:
      return "transparent";
  }
};

// Helper functions for the type buttons.
const formatTypeColor = (type) => {
  switch (type) {
    case "Normal":
      return "rgba(118,118,80,0.5)";
    case "Fire":
      return "rgb(238, 162, 100, 0.8)";
    case "Water":
      return "rgb(140, 197, 210, 0.8)";
    case "Electric":
      return "rgb(225, 191, 111)";
    case "Grass":
      return "rgb(136, 183, 136, 0.8)";
    case "Ice":
      return "rgba(102,166,166,0.5)";
    case "Fighting":
      return "rgba(142,0,0,0.5)";
    case "Poison":
      return "rgb(160, 134, 185)";
    case "Ground":
      return "rgba(174,142,54,0.5)";
    case "Flying":
      return "rgba(118,94,190,0.5)";
    case "Psychic":
      return "rgba(198,38,86,0.5)";
    case "Bug":
      return "rgba(118,134,0,0.5)";
    case "Rock":
      return "rgba(134,110,6,0.5)";
    case "Ghost":
      return "rgba(62,38,102,0.5)";
    case "Dragon":
      return "rgba(62,6,198,0.5)";
    case "Dark":
      return "rgba(62,38,22,0.5)";
    case "Steel":
      return "rgba(134,134,158,0.5)";
    case "Fairy":
      return "rgba(188,103,122,0.5)";
  }
};
const setTypeImage = (img, type) => {
  switch (type) {
    case "Normal":
      img.src = "/Pokedex/Images/Type/paws.png";
      break;
    case "Fire":
      img.src = "/Pokedex/Images/Type/flame.png";
      break;
    case "Water":
      img.src = "/Pokedex/Images/Type/drop.png";
      break;
    case "Electric":
      img.src = "/Pokedex/Images/Type/flash.png";
      break;
    case "Grass":
      img.src = "/Pokedex/Images/Type/leaf.png";
      break;
    case "Ice":
      img.src = "/Pokedex/Images/Type/snowflake.png";
      break;
    case "Fighting":
      img.src = "/Pokedex/Images/Type/boxing-gloves.png";
      break;
    case "Poison":
      img.src = "/Pokedex/Images/Type/danger.png";
      break;
    case "Ground":
      img.src = "/Pokedex/Images/Type/ground.png";
      break;
    case "Flying":
      img.src = "/Pokedex/Images/Type/wings.png";
      break;
    case "Psychic":
      img.src = "/Pokedex/Images/Type/eye.png";
      break;
    case "Bug":
      img.src = "/Pokedex/Images/Type/bug.png";
      break;
    case "Rock":
      img.src = "/Pokedex/Images/Type/stone.png";
      break;
    case "Ghost":
      img.src = "/Pokedex/Images/Type/ghost.png";
      break;
    case "Dragon":
      img.src = "/Pokedex/Images/Type/dragon.png";
      break;
    case "Dark":
      img.src = "/Pokedex/Images/Type/moon.png";
      break;
    case "Steel":
      img.src = "/Pokedex/Images/Type/beam.png";
      break;
    case "Fairy":
      img.src = "/Pokedex/Images/Type/fairy.png";
      break;
  }
};
const setTypeProperties = (type, pokemonType, image, text) => {
  /* 1. If the Pokemon type is undefined, hide the button.
     2. If it exists set the background color, image, and text. */
  if (type === undefined) {
    pokemonType.style.display = "none";
  } else {
    pokemonType.style.display = "flex";
    pokemonType.style.backgroundColor = formatTypeColor(type);
    setTypeImage(image, type);
    text.textContent = type;
  }
};
const setTypes = (
  types,
  firstPokemonType,
  firstPokemonTypeImage,
  firstPokemonTypeText,
  secondPokemonType,
  secondPokemonTypeImage,
  secondPokemonTypeText
) => {
  // Destructure the types.
  const [firstType, secondType] = types;

  //Set the background color, image, and text based on the type.
  setTypeProperties(
    firstType,
    firstPokemonType,
    firstPokemonTypeImage,
    firstPokemonTypeText
  );

  setTypeProperties(
    secondType,
    secondPokemonType,
    secondPokemonTypeImage,
    secondPokemonTypeText
  );
};

// Helper function for the home page. It takes an array of id's and fetches and displayes the Pokemon on the Home page.
const toggleElements = (
  ascending,
  descending,
  favorites,
  searchResults,
  showMore,
  message
) => {
  toggleElement(container, ascending);
  toggleElement(homePageDescending, descending);
  toggleElement(homePageFavorites, favorites);
  toggleElement(homePageSearchResults, searchResults);
  toggleElement(showMoreButton, showMore);
  toggleElement(favouritePokemonMessage, message);
  window.scrollTo(0, 0);
};
