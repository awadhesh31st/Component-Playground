import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import PokemonList from '.'

beforeEach(() => {
  const mockApiData = {
    results: [{ name: 'one' }, { name: 'two' }, { name: 'three' }, { name: 'four' }, { name: 'five' }],
  }
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockApiData),
    })
  ) as jest.Mock
})

describe('Product component', () => {
  it('fetch and find name', async () => {
    render(<PokemonList />)
    await waitFor(() => {
      expect(screen.getByText('one')).toBeInTheDocument()
    })
  })

  it('sort list', async () => {
    render(<PokemonList />)
    await waitFor(() => {
      const itemLit = screen.getAllByRole('listitem')
      expect(itemLit[1].textContent).toBe('four')
    })

    fireEvent.change(screen.getByLabelText('Sort by Name:'), {
      target: { value: 'desc' },
    })

    await waitFor(() => {
      const itemLit = screen.getAllByRole('listitem')
      expect(itemLit[0].textContent).toBe('two')
    })
  })
})
