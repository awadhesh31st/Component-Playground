import React, { useState, useEffect, ChangeEvent } from 'react'

interface Pokemon {
  name: string
}

const PokemonList: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        const data = await response.json()
        setPokemonData(data.results)
      } catch (error) {
        console.error('Error fetching Pokémon data:', error)
      }
    }
    fetchPokemonData()
  }, [])

  const sortedData = [...pokemonData].sort((a, b) => {
    return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  })

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc')
  }

  return (
    <div>
      <label htmlFor="sortOrder">Sort by Name:</label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <ul>
        {sortedData.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
