//Switch current Pokemon by clicking the arrows.
const switchCurrentPokemonArrows = (element) => {
  // This function takes an element, in this case the div's to the sides of the main pop-up, and it gets the Pokemon names.
  const pokemonName = element.children[2].textContent.trim().toLowerCase();

  createPopUp(pokemonName);
};

//Switch current Pokemon by clicking on the image of the previous or next Pokemon.
const changeMainPokemon = async (e) => {
  const pokemonName = getPokemonName(e);

  createPopUp(pokemonName);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/* All of the event listeners will activate if the container for the ascending and descening Pokemon
 is set to display = grid, this is done to prevent them from activating on the favorites page.*/

//Change the current Pokemon when you click the previous or next arrows.
previousArrow.addEventListener("click", function () {
  const favorites = window.getComputedStyle(homePageFavorites).display;
  if (favorites === "none") {
    switchCurrentPokemonArrows(popUpPreviousPokemon);
  }
});
nextArrow.addEventListener("click", function () {
  const favorites = window.getComputedStyle(homePageFavorites).display;
  if (favorites === "none") {
    switchCurrentPokemonArrows(popUpNextPokemon);
  }
});

//Change the pop-up current Pokemon, to the previous or next Pokemon, by clicing on their images.
popUpPreviousPokemon.addEventListener("click", function (e) {
  const favorites = window.getComputedStyle(homePageFavorites).display;
  if (favorites === "none") {
    changeMainPokemon(e);
  }
});
popUpNextPokemon.addEventListener("click", function (e) {
  const favorites = window.getComputedStyle(homePageFavorites).display;
  if (favorites === "none") {
    changeMainPokemon(e);
  }
});
