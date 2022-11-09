    // API
const pokeApi = {}


function generation (gameVersion) {
    return gameVersion
}



function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon ()
    
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map ((typeSlot) => typeSlot.type.name )
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.gen = generation(pokeDetail.game_indices[0].version.name)
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {

    return fetch(pokemon.url) 
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0,limit = 5) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch (url)          //Por padrão GET - Requisição
     .then((response) => response.json())  
     .then((jsonBody) => jsonBody.results)
     .then((pokemons) => pokemons.map (pokeApi.getPokemonDetail) )
     .then((detailRequests) => Promise.all(detailRequests))
     .then ((pokemonsDetails) => pokemonsDetails )
}
