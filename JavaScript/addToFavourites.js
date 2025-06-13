// ------------------------- Add to favorites -------------------------

// Create array to store favorites in local storage.
const setArrayInLocalStorage = () => {
  const storeFavoritePokemon = [];

  if (!localStorage.getItem("storeFavoritePokemon")) {
    localStorage.setItem(
      "storeFavoritePokemon",
      JSON.stringify(storeFavoritePokemon)
    );
  }
};
setArrayInLocalStorage();

// Function that gets the array from local storage.
const getArrayFromLocalStorage = () => {
  let storedArrayString = localStorage.getItem("storeFavoritePokemon");
  let storedArray = JSON.parse(storedArrayString);

  return storedArray;
};

// Add a Pokemon to the favorites array.
const addPokemonToFavorites = (pokemonName) => {
  const storedArray = getArrayFromLocalStorage();

  storedArray.push(pokemonName);

  let updatedArrayString = JSON.stringify(storedArray);

  localStorage.setItem("storeFavoritePokemon", updatedArrayString);
};

// Remove a Pokemon from the favorites array.
const removePokemonFromFavorites = (pokemonName) => {
  const storedArray = getArrayFromLocalStorage();

  const index = storedArray.indexOf(pokemonName);

  storedArray.splice(index, 1);

  let updatedArrayString = JSON.stringify(storedArray);

  localStorage.setItem("storeFavoritePokemon", updatedArrayString);
};

const handleFavorites = () => {
  const name =
    heartIcon.parentNode.parentNode.children[3].children[1].textContent
      .trim()
      .toLowerCase(); // Get the Pokemon name.

  /* Toggle the heart icon based on it's class.
    The function that changed the class => popUpHelperFunction.js, line 13. */
  if (heartIcon.classList.contains("fa-regular", "fa-heart")) {
    heartIcon.className = "fa-solid fa-heart";
    addPokemonToFavorites(name);
  } else {
    heartIcon.className = "fa-regular fa-heart";
    removePokemonFromFavorites(name);

    // If the user removes the Pokemon from favorites remove it's content from the favorites page.
    removePokemonDiv(homePageFavorites, name);

    /* If there's only one Pokemon in favorites and the user removes it from favorites, close the pop-up
     and display the "Empty favorites message". */
    if (
      homePageFavorites.children.length === 0 &&
      homePageFavorites.style.display === "grid"
    ) {
      toggleVisibility();
      toggleElement(favouritePokemonMessage, "flex");
    }
  }
};

heartIcon.addEventListener("click", handleFavorites);
