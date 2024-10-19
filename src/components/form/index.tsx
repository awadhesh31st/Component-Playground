import React, { useState } from 'react'

const Form = () => {
  const [name, setName] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isError, setIsError] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (name === null) {
        throw new Error('Enter name')
      }
      setIsSaved('Saved')
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      if (error instanceof Error) {
        setIsError(error.message)
      } else {
        setIsError('An unknown error occurred')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-2">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value.length > 0 ? e.target.value : null)
          }}
          onFocus={() => setIsError(null)}
          className="border border-blue-600 px-2 py-1 focus:outline-none text-base"
        />
        {isError && <span className="text-xs text-red-600">{isError}</span>}
        {isSaved && <span className="text-xs text-green-600">{isSaved}</span>}
      </fieldset>
      <button
        type="submit"
        className="mt-4 px-4 py-1 bg-purple-700 text-white hover:bg-purple-800 rounded-lg"
      >
        {isSubmitting ? 'Saving ... ' : 'Save'}
      </button>
    </form>
  )
}

export default Form
