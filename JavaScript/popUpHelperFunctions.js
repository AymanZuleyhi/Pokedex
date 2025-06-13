// Open and close pop-up, and extract all of the data for each Pokemon.
const toggleVisibility = () => {
  blackScreen.style.display === "flex"
    ? (blackScreen.style.display = "none")
    : (blackScreen.style.display = "flex");
};
const getPokemonData = (pokemon, cache) => {
  const data = cache.get(pokemon);

  return data;
};

// Add to favorites, set the image and background color, set the name and id, and color the arrows.
const addToFavorites = (pokemon) => {
  // If the Pokemon already exists in the local storage array, set the heart to be outlined, if not set it to be full.
  const favouritePokemon = getArrayFromLocalStorage();

  heartIcon.className = favouritePokemon.includes(pokemon)
    ? "fa-solid fa-heart"
    : "fa-regular fa-heart";
};
const getPopUpBackgroundColor = (type) => {
  switch (type) {
    case "Normal":
      return "rgba(168,168,120)";
    case "Fire":
      return "rgba(234,171,126)";
    case "Water":
      return "rgba(207,229,236)";
    case "Electric":
      return "rgba(248,208,48)";
    case "Grass":
      return "rgba(137,185,137)";
    case "Ice":
      return "rgba(152,216,216)";
    case "Fighting":
      return "rgba(192,48,40)";
    case "Poison":
      return "rgba(160,64,160)";
    case "Ground":
      return "rgba(224,192,104)";
    case "Flying":
      return "rgba(168,144,240)";
    case "Psychic":
      return "rgba(248,88,136)";
    case "Bug":
      return "rgba(168,184,32)";
    case "Rock":
      return "rgba(184,160,56)";
    case "Ghost":
      return "rgba(112,88,152)";
    case "Dragon":
      return "rgba(112,56,248)";
    case "Dark":
      return "rgba(112,88,72)";
    case "Steel":
      return "rgba(184,184,208)";
    case "Fairy":
      return "rgba(238,153,172)";
    default:
      return "transparent";
  }
};
const setImageAndColorBackground = (artwork, types) => {
  pokemonImage.src = artwork;

  //Set the color of the pop up based on the element of the Pokemon.
  popUpTopHalf.style.background = `linear-gradient(to bottom, ${getPopUpBackgroundColor(
    types[0]
  )} 50%, white 100%)`;
};
const setNameAndId = (name, id) => {
  pokemonName.textContent = name;
  pokemonId.textContent = id;
};
const colorArrows = (types) => {
  const backgroundColor = formatTypeColor(types[0]);
  previousArrow.style.color = backgroundColor;
  nextArrow.style.color = backgroundColor;
};

// Set the active tab when the pop-up is activated.
const setActiveTab = () => {
  const nodeList = getNodeList(tabs, "a");
  const nodeListContent = getNodeList(tabsContent, "li");

  removeClasses(nodeList);
  removeClasses(nodeListContent);
  // Add class "active" to the button.
  let id = "";
  nodeList.forEach((item) => {
    if (item.id === "About") {
      item.classList.add("active");
      id = item.id;
    }
  });

  // Add class "active" to the content tab.
  addActiveToContentTab(nodeListContent, id);

  styleTabs(nodeList);
  styleContent(nodeListContent);
};

// About tab.
const getGenderProbability = (genderRatio, male, female) => {
  switch (genderRatio) {
    case -1:
      male.textContent = "Genderless";
      female.textContent = "Genderless";
      break;
    case 0:
      male.textContent = "0%";
      female.textContent = "100%";
      break;
    case 1:
      male.textContent = "12.5%";
      female.textContent = "87.5%";
      break;
    case 2:
      male.textContent = "25%";
      female.textContent = "75%";
      break;
    case 3:
      male.textContent = "37.5%";
      female.textContent = "62.5%";
      break;
    case 4:
      male.textContent = "50%";
      female.textContent = "50%";
      break;
    case 5:
      male.textContent = "62.5%";
      female.textContent = "37.5%";
      break;
    case 6:
      male.textContent = "75%";
      female.textContent = "25%";
      break;
    case 7:
      male.textContent = "87.5%";
      female.textContent = "12.5%";
      break;
    case 8:
      male.textContent = "100%";
      female.textContent = "0%";
      break;
    default:
      throw new Error("Sorry, something went wrong.");
  }
};
const setAboutTab = (about, weight, height) => {
  pokemonDescription.textContent = about;
  const weightKg = (weight * 0.1).toFixed(1);
  const weightLbs = ((weight * 0.1) / 0.4).toFixed(1);

  pokemonWeight.textContent = weightKg + "kg / " + weightLbs + "lbs";
  pokemonHeight.textContent = `${height * 10}cm / ${(
    (height * 10) /
    2.54
  ).toFixed(2)}in`;
};

// Stats tab.
const setProgressBars = (stats) => {
  const statNames = [hp, attack, defence, specialAttack, specialDefence, speed];
  const progressBars = [
    hpProgress,
    attackProgress,
    defenceProgress,
    specialAttackProgress,
    specialDefenceProgress,
    speedProgress,
  ];
  const pokemonStatColors = [
    "rgb(255, 99, 71)", // HP (Tomato)
    "rgb(255, 215, 0)", // Attack (Gold)
    "rgb(70, 130, 180)", // Defense (Steel Blue)
    "rgb(147, 112, 219)", // Special Attack (Medium Purple)
    "rgb(60, 179, 113)", // Special Defense (Medium Sea Green)
    "rgb(255, 160, 122)", // Speed (Light Salmon)
  ];

  for (let i = 0; i < statNames.length; i++) {
    let statValue = Object.entries(stats)[i][1];

    // Check if the value is more than 100, if it is return 100.
    statNames[i].textContent = `${
      statValue > 100 ? (statValue = 100) : (statValue = statValue)
    }`;
  }

  //Set the progress bars colors and width.
  for (let i = 0; i < progressBars.length; i++) {
    progressBars[i].style.backgroundColor = pokemonStatColors[i];

    progressBars[i].style.width = `${
      Object.entries(stats)[i][1] > 100 ? 100 : Object.entries(stats)[i][1]
    }%`;
  }
};

// Evolution tab.
const setEvolutionChainPokemonAttributes = (image, name, pokemonName) => {
  image.src = cachePokemonInfomation.get(pokemonName).artwork;
  name.textContent = cachePokemonInfomation.get(pokemonName).name;
};
const createEvolutionTab = async (evolutionChain) => {
  // The evolution chain is an object, the key is the "evolvesTo" Pokemon, and the value is the "evolvesFrom".

  for (const [evolvesTo, evolvesFrom] of Object.entries(evolutionChain)) {
    //Fetch the Pokemon if it's not in the cache.
    if (!cachePokemonInfomation.has(evolvesTo)) {
      await fetchPokemon(evolvesTo);
    }

    //Create elements => div, img, p, etc.
    const {
      leftContainer,
      leftImage,
      leftName,
      arrowContainer,
      arrow,
      rightContainer,
      rightImage,
      rightName,
    } = createElements({
      leftContainer: "div",
      leftImage: "img",
      leftName: "p",

      arrowContainer: "div",
      arrow: "i",

      rightContainer: "div",
      rightImage: "img",
      rightName: "p",
    });

    const evolutionChainLength = Object.keys(evolutionChain).length;

    // If the evolution chain is only one Pokemon => display one Pokemon.
    if (evolutionChainLength === 1) {
      setEvolutionChainPokemonAttributes(leftImage, leftName, evolvesTo);
    } else {
      /* If it's more than one => on each row show the "evolvesFrom" an arrow and "evolvesTo"*/
      if (evolvesTo === null || evolvesFrom === null) {
        continue;
      }
      setEvolutionChainPokemonAttributes(leftImage, leftName, evolvesFrom);
      arrow.classList.add("fa-solid", "fa-arrow-right-long");
      setEvolutionChainPokemonAttributes(rightImage, rightName, evolvesTo);
    }

    // Append to the DOM.
    appendElements([
      [leftContainer, leftImage],
      [leftContainer, leftName],
      [evolutionTab, leftContainer],

      [arrowContainer, arrow],
      [evolutionTab, arrowContainer],

      [rightContainer, rightImage],
      [rightContainer, rightName],
      [evolutionTab, rightContainer],
    ]);
  }
};

// Set the id, picture, and name for the previous and next Pokemon.
const previouseAndNextPokemonAttributes = (
  data,
  idElement,
  pictureElement,
  nameElement
) => {
  const { idNumber, artwork, name } = data;

  idElement.textContent = formatPokemonId(idNumber);
  pictureElement.src = artwork;
  nameElement.textContent = name;
};
const setPreviousAndNextPokemon = async (idNumber) => {
  const previousId = idNumber === 1 ? 1025 : idNumber - 1;
  const calculateNextId = idNumber === 1025 ? 1 : idNumber + 1;

  if (!cachePokemonInfomation.has(previousId)) {
    await fetchPokemon(previousId);
  }

  if (!cachePokemonInfomation.has(calculateNextId)) {
    await fetchPokemon(calculateNextId);
  }

  const previousPokemonData = cachePokemonInfomation.get(previousId);
  const nextPokemonData = cachePokemonInfomation.get(calculateNextId);

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

// Helper functions for the "Downloads" tab. First one sets the images, second one formats the downloads.
const setDownloadTabImages = (artwork, sprites) => {
  officialArtwork.src = artwork;
  spriteImage.src = sprites.front_default;
};

const downloads = {};
const formatDownloads = (name, artwork, stats, sprites) => {
  let formatStats = "";
  for (const [key, value] of Object.entries(stats)) {
    formatStats += `${key} => ${value}\n`;
  }

  const formatSprites = {};
  // Remove all of the null sprites.
  for (const [key, value] of Object.entries(sprites)) {
    if (value !== null && typeof value !== "object") {
      formatSprites[key] = value;
    }
  }

  downloads["name"] = name;
  downloads["artwork"] = artwork;
  downloads["stats"] = formatStats;
  downloads["sprites"] = formatSprites;
};
