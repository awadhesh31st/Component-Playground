import { useEffect, useState } from 'react'

type UseFetchType = {
  url: string
}

type UseFetchRetrunType = {
  isLaoding: boolean
  isError: boolean
  data: any | null
}

const useFetch = ({ url }: UseFetchType): UseFetchRetrunType => {
  const [isLaoding, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const resp = await fetch(url)
        if (!resp.ok) {
          throw new Error('Not able to get data')
        }
        const result = await resp.json()
        setData(result)
        setIsLoading(false)
      } catch (error: unknown) {
        setIsError(true)
      }
    }
    fetchData()
  }, [url])

  return { isLaoding, isError, data }
}

export const FetchData = () => {
  const { isLaoding, isError, data } = useFetch({ url: 'https://jsonplaceholder.typicode.com/users' })

  if (isLaoding) {
    return <div>Loading ...</div>
  }

  if (isError) {
    return <div>Something went wrong</div>
  }

  return (
    <div>
      {data?.map((item: any, key: number) => {
        return <div key={key}>{item.name}</div>
      })}
    </div>
  )
}
