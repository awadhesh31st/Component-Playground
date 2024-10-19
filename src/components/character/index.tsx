import { useEffect, useState } from 'react'
import CenterDiv from './common/centerDiv'
import { TD, TH } from './common/styleHtmlTags'

type CharacterListType = {
  name: string
  films: string[]
  vehicles: string[]
}

const CharacterComponents = () => {
  const [characterList, setCharacterList] = useState<CharacterListType[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const getDataFromaApi = async () => {
      try {
        const response = await fetch('https://swapi.py4e.com/api/people/')
        const data = await response.json()
        const peopleList = data.results

        const formatedData = await Promise.all(
          peopleList?.map(async (people: any) => {
            const filmsList = await Promise.all(
              people?.films?.map(async (film: any) => {
                const filmResponse = await fetch(film)
                const filmData = await filmResponse.json()
                return filmData.title
              })
            )
            const vehicleList = await Promise.all(
              people?.vehicles?.map(async (film: any) => {
                const vehicleResponse = await fetch(film)
                const vehicleData = await vehicleResponse.json()
                return vehicleData.name
              })
            )
            return {
              name: people?.name,
              films: filmsList,
              vehicles: vehicleList,
            }
          })
        )
        setCharacterList(formatedData)
        setIsLoading(false)
      } catch (error: any) {
        setIsError(true)
      }
    }
    getDataFromaApi()
  }, [])

  if (isLoading) {
    return (
      <CenterDiv>
        <h1>Loading ...</h1>
      </CenterDiv>
    )
  }

  if (isError) {
    return (
      <CenterDiv>
        <h1>Something went wrong!</h1>
      </CenterDiv>
    )
  }

  return (
    <CenterDiv>
      <table>
        <thead>
          <tr>
            <TH>S.No</TH>
            <TH>Character</TH>
            <TH>Film</TH>
            <TH>Vehicle</TH>
          </tr>
        </thead>
        <tbody>
          {characterList?.map((character: CharacterListType, characterKey: number) => {
            return (
              <tr key={`character-${characterKey}`}>
                <TD>{characterKey + 1}</TD>
                <TD>{character?.name}</TD>
                <TD>{character?.films?.length === 0 ? '-' : character?.films?.join(', ')}</TD>
                <TD>{character?.vehicles?.length === 0 ? '-' : character?.vehicles?.join(', ')}</TD>
              </tr>
            )
          })}
        </tbody>
      </table>
    </CenterDiv>
  )
}

export default CharacterComponents
