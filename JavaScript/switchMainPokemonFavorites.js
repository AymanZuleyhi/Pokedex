// All of the code for the switching the main Pokemon inside of the favorites page.
const setStyles = (element, status) => {
  const isVisible = status ? "visible" : "hidden";

  const container = element ? popUpNextPokemon : popUpPreviousPokemon;
  const id = element ? nextPokemonId : previousPokemonId;
  const image = element ? nextPokemonImage : previousPokemonImage;
  const name = element ? nextPokemonName : previousPokemonName;

  const values = {
    container: [container, isVisible],
    id: [id, isVisible],
    image: [image, isVisible],
    name: [name, isVisible],
  };

  for (const [key, value] of Object.entries(values)) {
    value[0].style.visibility = value[1];
  }
};
// Set the Pokemon in the previous or next box.
const setPreviousAndNextFavorites = (page) => {
  const previousPokemonData = cachePokemonInfomation.get(page[0]);
  const nextPokemonData = cachePokemonInfomation.get(page[1]);

  // popUpHelperFunctions.js, 272.
  previouseAndNextPokemonAttributes(
    previousPokemonData,
    previousPokemonId,
    previousPokemonImage,
    previousPokemonName
  );

  previouseAndNextPokemonAttributes(
    nextPokemonData,
    nextPokemonId,
    nextPokemonImage,
    nextPokemonName
  );
};
// Hide or show the previous and next Pokemon box.
const togglePreviousOrNextBoxes = (page) => {
  // If there is only one Pokemon in the Favorites page hide the left and right box.
  if (page[0] === page[1]) {
    setStyles(false, false);
    setStyles(true, false);
  }

  const childrenInFavorites = homePageFavorites.children.length;
  // If there are two Pokemon in the Favorites page hide the left previous box.
  if (childrenInFavorites === 2) {
    setStyles(false, false);
    setStyles(true, true);
  }

  // If there are more than 2 Pokemon in the Favorites page, show the previous and next box.
  if (childrenInFavorites > 2) {
    setStyles(false, true);
    setStyles(true, true);
  }
};

const getTheName = (e) => {
  const name = e.target.nextElementSibling.textContent.toLowerCase();

  return name;
};

// Takes a pokemon name from the favorites page and gives you back the previous and next Pokemon on the page.
const getPreviousAndNextPokemonNames = (clickedPokemon) => {
  const allPokemon = [];
  const result = [];

  // Gets all of the Pokemon in the Favorites page.
  for (const each of homePageFavorites.children) {
    allPokemon.push(each.children[2].textContent.toLowerCase());
  }

  for (let i = 0; i < allPokemon.length; i++) {
    if (allPokemon[i] === clickedPokemon) {
      // Get the previous Pokemon.
      result.push(
        allPokemon[i - 1] === undefined
          ? allPokemon[allPokemon.length - 1]
          : allPokemon[i - 1]
      );
      // Gets the next and next Pokemon.
      result.push(
        allPokemon[i + 1] === undefined ? allPokemon[0] : allPokemon[i + 1]
      );
    }
  }

  return result;
};

const switchByClick = (e) => {
  const pokemonName = getTheName(e);

  const previousAndNext = getPreviousAndNextPokemonNames(pokemonName);

  createPopUp(pokemonName, previousAndNext);
};

const switchPokemonArrows = (previousOrNextPokemon) => {
  const clickedPokemon =
    previousOrNextPokemon.children[2].textContent.toLowerCase();

  if (previousOrNextPokemon.children[2].style.display !== "none") {
    const previousAndNextPokemon =
      getPreviousAndNextPokemonNames(clickedPokemon);
    createPopUp(clickedPokemon, previousAndNextPokemon);
  }
};

const activatePopUpFavorites = async (e) => {
  const name =
    e.target.nextElementSibling.nextElementSibling.textContent.toLowerCase();

  const previousAndNext = getPreviousAndNextPokemonNames(name);

  createPopUp(name, previousAndNext);
  toggleVisibility();
};

////////////////////////// Event listeners. ///////////////////////////////////
previousArrow.addEventListener("click", function (e) {
  const favoritesDisplay = window.getComputedStyle(homePageFavorites).display;
  if (favoritesDisplay === "grid") {
    switchPokemonArrows(popUpPreviousPokemon);
  }
});

nextArrow.addEventListener("click", function (e) {
  const favoritesDisplay = window.getComputedStyle(homePageFavorites).display;
  if (favoritesDisplay === "grid") {
    switchPokemonArrows(popUpNextPokemon);
  }
});

// Event listeners.
popUpPreviousPokemon.addEventListener("click", function (e) {
  if (
    e.target.tagName === "IMG" &&
    homePageFavorites.style.display === "grid"
  ) {
    switchByClick(e);
  }
});

popUpNextPokemon.addEventListener("click", function (e) {
  if (
    e.target.tagName === "IMG" &&
    homePageFavorites.style.display === "grid"
  ) {
    switchByClick(e);
  }
});

homePageFavorites.addEventListener("click", function (e) {
  if (e.target.classList.contains("pokemonImage")) {
    activatePopUpFavorites(e);
  }
});
