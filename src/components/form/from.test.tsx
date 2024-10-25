/* eslint-disable jest/valid-expect */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from '.'

describe('From component', () => {
  it('Check form', () => {
    render(<Form />)
    expect(screen.getByLabelText('Name:')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('enter name')).toBeInTheDocument()

    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('enter email')).toBeInTheDocument()

    expect(screen.queryByRole('alert')).toBeNull()

    expect(screen.getByRole('button', { name: /Submit/i }))
  })

  it('check error', async () => {
    render(<Form />)
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('All fields are required.')
    })
  })

  it('check no error', async () => {
    render(<Form />)
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('All fields are required.')
    })

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Helloe' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'awa@sss.ss' } })

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeNull()
    })
  })

  it('verify log data', async () => {
    const spy = jest.spyOn(console, 'log')
    render(<Form />)
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Helloe' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'awa@sss.ss' } })

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('Form submitted:', {
        name: 'Helloe',
        email: 'awa@sss.ss',
      })
    })
  })
})
