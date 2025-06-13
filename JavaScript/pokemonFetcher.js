const cachePokemon = new Map();
const cacheSpecies = new Map();
const cacheEvolutionChain = new Map();
const extractEvolutionChain = new Map();
const cachePokemonInfomation = new Map();

let error = false;

const fetchPokemonData = async (pokemon, URL, cache, nameKey, idKey) => {
  if (cache.has(pokemon)) {
    return cache.get(pokemon);
  }

  try {
    const response = await fetch(URL);

    if (!response.ok) {
      error = true;
      handleInvalidPokemon("invalid name or id", "rgb(241, 191, 193)");

      setTimeout(() => {
        handleInvalidPokemon("Search by name or id", "white");
      }, 2000);

      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();

    //Access the name and id of the Pokemon.
    const pokemonName = getNestedValue(json, nameKey);
    const pokemonId = getNestedValue(json, idKey);

    //Cache the Pokemon JSON 2 times, one with the name as the key, and one with the ID as the key.
    cache.set(pokemonName, json);
    cache.set(pokemonId, json);

    return json;
  } catch (error) {
    console.error(error);
  }
};

const getEvolutionChain = (pokemon, evolutionChain) => {
  const currentChain = evolutionChain.chain;
  const evolutionList = {};

  const traverseChain = (currentChain, parentPokemon) => {
    evolutionList[currentChain.species.name] = parentPokemon;

    currentChain.evolves_to.forEach((eachPokemon) => {
      traverseChain(eachPokemon, currentChain.species.name);
    });
  };
  traverseChain(currentChain, (parentPokemon = null));

  extractEvolutionChain.set(pokemon, evolutionList);
  return evolutionList;
};

const getPokemonInformation = (
  pokemon,
  fetchedPokemon,
  fetchedSpecies,
  extractEvolutionChain
) => {
  const types = [];
  for (const type of fetchedPokemon.types) {
    types.push(formatPokemonName(type.type.name));
  }

  const pokemonStats = {};
  for (const stat of fetchedPokemon.stats) {
    const key = stat.stat.name;
    const value = stat.base_stat;

    pokemonStats[key] = value;
  }

  const information = {
    name: formatPokemonName(fetchedPokemon.name),
    id: formatPokemonId(fetchedPokemon.id),
    idNumber: fetchedPokemon.id,
    types: types,
    artwork: fetchedPokemon.sprites.other["official-artwork"].front_default,
    stats: pokemonStats,
    height: fetchedPokemon.height,
    weight: fetchedPokemon.weight,
    about:
      fetchedSpecies.flavor_text_entries.length < 7
        ? fetchedSpecies.flavor_text_entries[0].flavor_text
        : fetchedSpecies.flavor_text_entries[7].flavor_text,
    gender: fetchedSpecies.gender_rate,
    evolutionChain: extractEvolutionChain.get(pokemon),
    sprites: fetchedPokemon.sprites,
  };

  cachePokemonInfomation.set(fetchedPokemon.name, information);
  cachePokemonInfomation.set(fetchedPokemon.id, information);
  return information;
};

const fetchPokemon = async (pokemonName) => {
  const minDisplayTime = 1000;
  toggleElement(loader, "flex");
  const startTime = Date.now();

  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  const fetchedPokemon = await fetchPokemonData(
    pokemonName,
    URL,
    cachePokemon,
    "name",
    "id"
  );

  // If a Pokemon with the provided name or id does not exist.
  if (!fetchedPokemon) {
    toggleElement(loader, "none");
  }

  const fetchedSpecies = await fetchPokemonData(
    pokemonName,
    fetchedPokemon.species.url,
    cacheSpecies,
    "name",
    "id"
  );

  const fetchedEvolutionChain = await fetchPokemonData(
    pokemonName,
    fetchedSpecies.evolution_chain.url,
    cacheEvolutionChain,
    "chain.species.name",
    "id"
  );

  getEvolutionChain(pokemonName, fetchedEvolutionChain);

  getPokemonInformation(
    pokemonName,
    fetchedPokemon,
    fetchedSpecies,
    extractEvolutionChain
  );

  const currentTime = Date.now() - startTime;
  const remainingTime = minDisplayTime - currentTime;

  if (remainingTime > 0) {
    setTimeout(() => {
      toggleElement(loader, "none");
    }, remainingTime);
  } else {
    toggleElement(loader, "none");
  }
};
