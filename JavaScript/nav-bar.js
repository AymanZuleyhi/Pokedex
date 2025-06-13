// Make the blue light go on and off.
const blueLightFlash = () => {
  const computedStyle = getComputedStyle(blueLightContainer);
  const currentColor = computedStyle.backgroundColor;

  switch (currentColor) {
    case "rgb(97, 157, 218)": {
      blueLightContainer.style.backgroundColor = "rgb(132, 250, 233)";
      blueLightContainer.style.boxShadow =
        "0 0 20px 5px rgb(132,250,233), 0 0 50px 5px rgb(132,250,233), 0 0 100px 5px rgb(132,250,233)";
      break;
    }
    case "rgb(132, 250, 233)": {
      blueLightContainer.style.backgroundColor = "rgb(97, 157, 218)";
      blueLightContainer.style.boxShadow = "none";
      break;
    }
  }
};
setInterval(blueLightFlash, 1000);

//Search for a spesific Pokemon.
let pokemon = "";
const chosenPokemon = (e) => {
  pokemon = e.target.value.replace(/\s+/g, " ").toLowerCase();
};

const handleInvalidPokemon = (placeholder, backgroundColor) => {
  userInput.value = "";
  userInput.placeholder = placeholder;
  userInput.style.backgroundColor = backgroundColor;
};

const searchForPokemon = async () => {
  if (!cachePokemon.has(pokemon)) {
    await fetchPokemon(pokemon);
  }

  // ascending, descending, favorites, search results, "Show more" button, favorite msg.
  toggleElements("none", "none", "none", "grid", "none", "none");

  clearContent(homePageSearchResults);
  createPokemonDiv(pokemon, cachePokemonInfomation, homePageSearchResults);

  userInput.value = "";
};

const homePage = () => {
  getPokemonByAscendingOrder = true;
  // ascending, descending, favorites, search results, "Show more" button, favorite msg.
  toggleElements("grid", "none", "none", "none", "block", "none");
};

// Event listeners for the search box.
userInput.addEventListener("input", chosenPokemon);
searchButton.addEventListener("click", searchForPokemon);

// Event listeners for the Sort and Home buttons.
homeButton.addEventListener("click", homePage);
sortButton.addEventListener("click", toggleSort);
