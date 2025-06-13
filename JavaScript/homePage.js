/* Functions that takes a name/id , and the cached information of a Pokemon 
and displayed that information on the Home page. */
const createPokemonDiv = (pokemon, cache, parentElement) => {
  let originalName = pokemon;

  if (!cache.has(originalName)) {
    originalName = parseInt(pokemon);
  }

  const data = cache.get(originalName);

  // Get all of the information for the Pokemon.
  const { name, id, types, artwork } = data;

  // Create elements => div, img, p, etc.
  const {
    containerDiv,
    pokemonImage,
    pokemonName,
    pokemonId,
    //Types.
    typesContainer,
    firstType,
    firstTypeImage,
    firstTypeText,
    secondType,
    secondTypeImage,
    secondTypeText,
  } = createElements({
    containerDiv: "div",
    pokemonImage: "img",
    pokemonName: "p",
    pokemonId: "p",
    //Types.
    typesContainer: "div",
    firstType: "div",
    firstTypeImage: "img",
    firstTypeText: "p",
    secondType: "div",
    secondTypeImage: "img",
    secondTypeText: "p",
  });

  // Set the src to the image, the background color, the Pokemon name, and the id.
  pokemonImage.src = artwork;

  pokemonImage.style.backgroundColor = getBackgroundColor(types[0]);

  pokemonImage.classList.add("pokemonImage");
  pokemonName.textContent = name;
  pokemonId.textContent = id;

  //Set the type background color, image, and text.
  setTypes(
    types,
    firstType,
    firstTypeImage,
    firstTypeText,
    secondType,
    secondTypeImage,
    secondTypeText
  );

  firstTypeText.classList.add("first-type-text");
  secondTypeText.classList.add("second-type-text");

  // Append elements to the DOM => [parent, child].
  appendElements([
    [containerDiv, pokemonImage],
    [containerDiv, pokemonId],
    [containerDiv, pokemonName],
    [containerDiv, typesContainer],
    //Types.
    [firstType, firstTypeImage],
    [firstType, firstTypeText],
    [typesContainer, firstType],
    [secondType, secondTypeImage],
    [secondType, secondTypeText],
    [typesContainer, secondType],
    [containerDiv, typesContainer],
    [parentElement, containerDiv],
  ]);
};
const removePokemonDiv = (container, pokemon) => {
  const content = container.children;

  for (div of content) {
    const name = div.children[2].textContent.toLowerCase().trim();

    if (pokemon === name) {
      div.remove();
    }
  }
};

// Functions that generate Pokemon id's in ascending or descending order. => 1, 2, 3 / 1025, 1024.
const TOTAL_POKEMON = 1025;
const batchSize = 10;
let getPokemonByAscendingOrder = true;
let currentAscendingIndex = 1;
let currentDescendingIndex = 0;

const getPokemonAscending = async (batchSize) => {
  const pokemonIds = [];

  for (let i = 1; i <= batchSize; i++) {
    pokemonIds.push(currentAscendingIndex);
    currentAscendingIndex++;
  }

  for (const id of pokemonIds) {
    await fetchPokemon(id);
    createPokemonDiv(id, cachePokemonInfomation, container);
  }

  toggleElement(showMoreButton, "block");
};

const getPokemonDescending = async (batchSize) => {
  const pokemonIds = [];

  for (let i = 1; i <= batchSize; i++) {
    pokemonIds.push(TOTAL_POKEMON - currentDescendingIndex);
    currentDescendingIndex++;
  }

  for (const id of pokemonIds) {
    await fetchPokemon(id);
    createPokemonDiv(id, cachePokemonInfomation, homePageDescending);
  }
  toggleElement(showMoreButton, "block");
};

// Function that sorts the Pokemon by ascending or descending order.
const toggleSort = () => {
  if (getPokemonByAscendingOrder === true) {
    getPokemonByAscendingOrder = false;
    // ascending, descending, favorites, search results, "Show more" button, favorite msg.
    toggleElements("none", "grid", "none", "none", "block", "none");
  } else {
    getPokemonByAscendingOrder = true;
    toggleElements("grid", "none", "none", "none", "block", "none");
  }
};

const showMorePokemon = () => {
  getPokemonByAscendingOrder === true
    ? getPokemonAscending(batchSize)
    : getPokemonDescending(batchSize);
};

// Get 6 Pokemon to display on the Home page when it loads.
getPokemonAscending(batchSize);
getPokemonDescending(batchSize);
toggleElement(homePageDescending, "none");

showMoreButton.addEventListener("click", showMorePokemon);
