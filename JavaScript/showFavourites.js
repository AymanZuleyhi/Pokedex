const displayedPokemon = [];

const showFavourites = async () => {
  const favoritePokemon = getArrayFromLocalStorage(); // ["pikachu", "raichu"]
  toggleElements("none", "none", "grid", "none", "none", "none");

  // If there are no Pokemon added to favourites.
  if (favoritePokemon.length === 0) {
    toggleElement(favouritePokemonMessage, "flex");
  }

  for (const pokemon of favoritePokemon) {
    if (displayedPokemon.includes(pokemon)) {
      continue;
    } else {
      if (!cachePokemonInfomation.has(pokemon)) {
        await fetchPokemon(pokemon);
      }

      createPokemonDiv(pokemon, cachePokemonInfomation, homePageFavorites);
      displayedPokemon.push(pokemon);
    }
  }

  // If a Pokemon has been removed from favorites.
  for (const pokemon of displayedPokemon) {
    if (!favoritePokemon.includes(pokemon)) {
      removePokemonDiv(homePageFavorites, pokemon);
    }
  }
};

const clickedExploreButton = () => {
  const nodeList = getNodeList(mobileMenu, "li");
  removeClasses(nodeList);
  defaultMobileButton();
  homePage();
};

favouritesButton.addEventListener("click", showFavourites);
exploreButton.addEventListener("click", clickedExploreButton);
