const getPokemonName = (e) => {
  const name = e.target.parentNode.children[2].textContent.trim().toLowerCase();

  return name;
};

// If the pop-up is used in the "Favorites" page it will take a second parameter.
const createPopUp = async (pokemon, page) => {
  //Get the Pokemon information.
  const {
    about,
    artwork,
    evolutionChain,
    gender,
    height,
    id,
    idNumber,
    name,
    stats,
    types,
    weight,
    sprites,
  } = getPokemonData(pokemon, cachePokemonInfomation);

  // Set the id, image, name, types.
  addToFavorites(pokemon);
  setImageAndColorBackground(artwork, types);
  setNameAndId(name, id);
  colorArrows(types);
  // helperFunctions.js, 113 - 249.
  setTypes(
    types,
    firstPokemonType,
    firstPokemonTypeImage,
    firstPokemonTypeText,
    secondPokemonType,
    secondPokemonTypeImage,
    secondPokemonTypeText
  );

  // Tabs
  setActiveTab();

  // About tab.
  getGenderProbability(gender, male, female);
  setAboutTab(about, weight, height);
  // Stats tab.
  setProgressBars(stats);

  //Evolution tab.
  clearContent(evolutionTab);
  createEvolutionTab(evolutionChain);

  //Download tab.
  setDownloadTabImages(artwork, sprites);
  formatDownloads(name, artwork, stats, sprites);

  /* 
  1. If the pop-up is activated outside of the "Favorites" page we want to show the previous and next 
    Pokemon based on id. For example if the current pokemon's id is 2, we want to show 1 and 3.
  2. If the pop-up is activated from the "Favorites" page we want to show the previous and next Pokemon
    from the "Favorites" page. For example, if there are 3 Pokemon in the Favorites page id's number 
    5,2, and 9, if we click on 2 we want to see 5 as previous, and 9 as next. 
  */

  // If we're calling the pop-up from outside of the Favorites page we want to show the previous and next boxes.
  if (page === undefined) {
    setPreviousAndNextPokemon(idNumber);
    /* Show the previous and next boxes. 
    If the first parameter is false it targets the previous containers. 
    If the second parameter is false it hides the container.
    */
    setStyles(false, true);
    setStyles(true, true);
  }

  // If we're calling the pop-up from the Favorites page.
  if (page) {
    togglePreviousOrNextBoxes(page); // switchMainPokemonFavorites.js, 49.
    setPreviousAndNextFavorites(page); // switchMainPokemonFavorites.js, 29.
  }
};

const activatePopUp = (e) => {
  const pokemonName = getPokemonName(e);

  toggleVisibility();
  createPopUp(pokemonName);
};

//Make the pop-up open only when a Pokemon image is clicked.
container.addEventListener("click", function (e) {
  if (e.target.classList.contains("pokemonImage")) {
    activatePopUp(e);
  }
});

homePageDescending.addEventListener("click", function (e) {
  if (e.target.classList.contains("pokemonImage")) {
    activatePopUp(e);
  }
});

homePageSearchResults.addEventListener("click", function (e) {
  if (e.target.classList.contains("pokemonImage")) {
    activatePopUp(e);
  }
});

//Button that closes the pop-up.
closeButton.addEventListener("click", toggleVisibility);
