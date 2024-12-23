import { useState, ChangeEvent } from 'react'
import usePokemon from '../hooks/usePokemon'
import Loading from './Loading'
import { Pokemon } from '../interfaces/fetchAllPokemonsResponse'

const HomePage = () => {
  const { isLoading, pokemons } = usePokemon()
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')

  const filteredPokemons = (): Pokemon[] => {
    if (search.length === 0) return pokemons.slice(currentPage, currentPage + 5)

    // si hay algo en la caja de texto
    const filtered = pokemons.filter(poke => poke.name.toLowerCase().includes(search.toLowerCase()))
    return filtered.slice(currentPage, currentPage + 5)

  }

  const nextPage = () => {
    if (pokemons.filter(poke => poke.name.toLowerCase().includes(search.toLowerCase())).length > currentPage + 5) setCurrentPage(currentPage + 5)
  }

  const previousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 5)
  }

  const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0)
    setSearch(target.value)
  }

  return (
    <div className='max-w-full min-h-screen grid place-items-center bg-slate-100 p-2'>
      <h1 className='font-serif font-semibold text-4xl text-center border-b border-b-slate-400 pb-4'>Listado de Pokemons</h1>
      <br />

      <input
        className='border-none outline-blue-400 p-2 rounded-md'
        placeholder='Buscar Pokemon'
        value={search}
        onChange={onSearchChange}
      />

      <div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={previousPage}>Anteriores</button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2' onClick={nextPage}>Siguientes</button>
      </div>

      <table className='table-auto'>
        <thead className='text-left'>
          <tr className='border-b border-slate-800'>
            <th className='p-2' style={{ width: 100 }}>ID</th>
            <th className='p-2' style={{ width: 100 }}>Nombre</th>
            <th className='p-2' style={{ width: 100 }}>Imagen</th>
          </tr>
        </thead>
        <tbody className='text-left'>
          {
            filteredPokemons().map(({ id, name, pic }) => (
              <tr className='border-b border-slate-300' key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                  <img
                    src={pic}
                    alt={name}
                    style={{ height: 75 }}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {isLoading && <Loading />}
    </div>
  )
}

export default HomePage