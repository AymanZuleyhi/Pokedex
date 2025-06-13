// Query select all of the elements.
const {
  container,
  homePageDescending,
  homePageFavorites,
  homePageSearchResults,

  // Loader.
  loader,

  showMoreButton,
  // ------------------ Pop-up ---------------------
  blackScreen,

  // ------------------ Pop-up Previous Pokemon ---------------------
  popUpPreviousPokemon,
  previousPokemonId,
  previousPokemonImage,
  previousPokemonName,
  previousArrow,

  // ------------------ Pop-up Current Pokemon ---------------------
  popUpTopHalf,
  popUpBackground,
  popUpCurrentPokemon,
  heartIcon,
  pokemonId,
  closeButton,
  imageContainer,
  pokemonImage,
  leftArrow,
  pokemonName,
  rightArrow,

  // Types.
  typesContainer,
  firstPokemonType,
  firstPokemonTypeImage,
  firstPokemonTypeText,
  secondPokemonType,
  secondPokemonTypeImage,
  secondPokemonTypeText,

  // ------------------ Pop-up Next Pokemon ---------------------
  popUpNextPokemon,
  nextPokemonId,
  nextPokemonImage,
  nextPokemonName,
  nextArrow,

  // ------------------ Tabs ---------------------
  aboutButton,
  statsButton,
  evolutionButton,

  tabs,
  tabsContent,

  // ------------------ About tab ---------------------
  pokemonDescription,
  pokemonWeight,
  pokemonHeight,
  male,
  female,

  // ------------------ Stats tab ---------------------
  hp,
  attack,
  defence,
  specialAttack,
  specialDefence,
  speed,
  hpProgress,
  attackProgress,
  defenceProgress,
  specialAttackProgress,
  specialDefenceProgress,
  speedProgress,

  // ------------------ Evolution tab ---------------------
  evolutionTab,

  // ------------------ Download tab ---------------------
  downloadArtwork,
  downloadSprites,
  downloadStats,
  // Pictures.
  officialArtwork,
  spriteImage,

  // ------------------ Favourite Pokemon ---------------------
  favouritePokemonMessage,
  exploreButton,

  // ------------------ Nav bar ---------------------
  blueLight,
  blueLightContainer,
  userInput,
  searchButton,
  sortButton,
  homeButton,
  favouritesButton,

  // ------------------ Mobile menu ---------------------
  mobileMenu,
} = selectElements({
  // ------------------ Home page ---------------------
  container: ".container",
  homePageDescending: ".home-page-descending",
  homePageFavorites: ".home-page-favorites",
  homePageSearchResults: ".home-page-search-results",
  showMoreButton: ".show-more-button",

  // ------------------ Loader ---------------------
  loader: ".loader-container",

  // ------------------ Pop-up background ---------------------
  blackScreen: ".black-screen",

  // ------------------ Pop-up Previous Pokemon ---------------------
  popUpPreviousPokemon: ".pop-up-previous-pokemon",
  previousPokemonId: ".previousPokemonId",
  previousPokemonImage: ".previousPokemonImage",
  previousPokemonName: ".previousPokemonName",
  previousArrow: ".fa-circle-arrow-left",

  // ------------------ Pop-up Current Pokemon ---------------------
  popUpTopHalf: ".pop-up-top-half",
  popUpBackground: ".pop-up-background",
  popUpCurrentPokemon: ".pop-up-current-pokemon",
  heartIcon: "i.fa-regular.fa-heart",
  pokemonId: ".pokemon-id",
  closeButton: ".close-button",

  imageContainer: ".image-container",
  pokemonImage: ".pokemon-official-artwork",

  leftArrow: ".fa-solid.fa-circle-arrow-left",
  pokemonName: ".pokemon-name",
  rightArrow: ".fa-solid.fa-circle-arrow-right",

  typesContainer: ".types-container",
  firstPokemonType: ".firstPokemonType",
  firstPokemonTypeImage: ".firstPokemonType-image",
  firstPokemonTypeText: ".firstPokemonType-text",
  secondPokemonType: ".secondPokemonType",
  secondPokemonTypeImage: ".secondPokemonType-image",
  secondPokemonTypeText: ".secondPokemonType-text",

  // ------------------ Pop-up Next Pokemon ---------------------
  popUpNextPokemon: ".pop-up-next-pokemon",
  nextPokemonId: ".nextPokemonId",
  nextPokemonImage: ".nextPokemonImage",
  nextPokemonName: ".nextPokemonName",
  nextArrow: ".fa-circle-arrow-right",

  // ------------------ Tabs ---------------------
  aboutButton: "#About",
  statsButton: "#Stats",
  evolutionButton: "#Evolution",

  tabs: ".tabs",
  tabsContent: ".tabs-content",

  // ------------------ About tab ---------------------
  pokemonDescription: ".pokemon-description",
  pokemonWeight: ".pokemon-weight",
  pokemonHeight: ".pokemon-height",
  male: ".male",
  female: ".female",

  // ------------------ Stats tab ---------------------
  hp: ".hp-value",
  attack: ".attack-value",
  defence: ".defence-value",
  specialAttack: ".special-attack-value",
  specialDefence: ".special-defence-value",
  speed: ".speed-value",
  hpProgress: ".hp-progress",
  attackProgress: ".attack-progress",
  defenceProgress: ".defence-progress",
  specialAttackProgress: ".special-attack-progress",
  specialDefenceProgress: ".special-defence-progress",
  speedProgress: ".speed-progress",

  // ------------------ Evolution tab ---------------------
  evolutionTab: ".evolution-tab",

  // ------------------ Download tab ---------------------
  downloadArtwork: ".download-artwork",
  downloadSprites: ".download-sprites",
  downloadStats: ".download-stats",
  officialArtwork: ".official-artwork-image",
  spriteImage: ".sprite",

  // ------------------ Favourite Pokemon ---------------------
  favouritePokemonMessage: ".container-favourite-pokemon",
  exploreButton: ".explore-button",

  // ------------------ Nav bar ---------------------
  blueLight: ".blue-light",
  blueLightContainer: ".blue-light-container",

  userInput: ".user-input",
  searchButton: ".search",
  sortButton: "#sort",

  homeButton: ".home-button",
  favouritesButton: ".favourites-button",

  // ------------------ Mobile menu ---------------------
  mobileMenu: ".mobile-menu",
});
