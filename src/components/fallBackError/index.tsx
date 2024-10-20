export const FallBackError = () => {
  const throwError = () => {
    throw new Error('I crashed!')
  }

  return (
    <div className="flex px-4 py-2 text-sm bg-purple-700 text-white cursor-pointer" onClick={throwError}>
      Check Error
    </div>
  )
}
