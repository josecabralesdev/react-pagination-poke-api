import { useState, useEffect } from "react"
import { fetchAllPokemons } from "../helpers/fetchAllPokemons"
import { Pokemon } from "../interfaces/fetchAllPokemonsResponse"

const usePokemon = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    // cargar los pokemons
    fetchAllPokemons()
      .then(pokemons => {
        setPokemons(pokemons)
        setIsLoading(false)
      })
  }, [])

  return {
    isLoading,
    pokemons
  }
}

export default usePokemon