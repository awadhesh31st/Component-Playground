import React, { useState, FormEvent, ChangeEvent } from 'react'

interface FormData {
  name: string
  email: string
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' })
  const [error, setError] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      setError('All fields are required.')
    } else {
      setError('')
      console.log('Form submitted:', formData)
      // Reset form fields
      setFormData({ name: '', email: '' })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="enter name"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="enter email"
        />
      </div>
      {error && (
        <p role="alert" style={{ color: 'red' }}>
          {error}
        </p>
      )}
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
