
const pokemonList = document.getElementById('pokemonList')  //Pegando a lista do HTML
const loadMoreButton = document.getElementById ('loadMoreButton')
const limit = 10
let offset = 0;

const maxRecords = 151

function convertPokemonToLi (pokemon) {

    return `
        <li class="pokemon ${pokemon.type}" >
                    <span class="number">#00${pokemon.number}</span> 
                    <span class="name">${pokemon.name}</span>
    
                    <div class="detail">
                        <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}" >${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                    </div>
                    </li>
        `

    }




function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener ('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

if (qtdRecordNextPage >= maxRecords ) {
    const newLimit = maxRecords - offset
    loadPokemonItens (offset, newLimit)

    loadMoreButton.parentElement.removeChild (loadMoreButton)
}
    else {
        loadPokemonItens (offset, limit)
    }


    
})


