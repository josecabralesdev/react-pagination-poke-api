import { pokemonApi } from "../api/pokemonApi"
import { FetchAllPokemonsResponse, Pokemon, SmallPokemon } from "../interfaces/fetchAllPokemonsResponse"

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  const resp = await pokemonApi.get<FetchAllPokemonsResponse>('/pokemon?limit=1500')
  const smallPokemonList = resp.data.results

  return transformSmallPokemonIntoPokemon(smallPokemonList)
}

const transformSmallPokemonIntoPokemon = (smallPokemonList: SmallPokemon[]): Pokemon[] => {
  const pokemonArr: Pokemon[] = smallPokemonList.map(poke => {
    const pokeArr = poke.url.split('/')
    const id = pokeArr[6]
    const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    return {
      id,
      name: poke.name,
      pic
    }
  })

  return pokemonArr
}