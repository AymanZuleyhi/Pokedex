const getEvolutionPokemon = async (e) => {
  const pokemonName = e.target.parentNode.children[1].textContent
    .toLowerCase()
    .trim();

  if (!cachePokemon.has(pokemonName)) {
    await fetchPokemon(pokemonName);
  }

  createPopUp(pokemonName);
};

evolutionTab.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    getEvolutionPokemon(e);
  }
});
