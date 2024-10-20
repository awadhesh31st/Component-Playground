import { ComponentType, FC } from 'react'
import { useFetch, UseFetchRetrunType } from '../customHooks'

const apiCallWrapper = <T extends object>(WrapperComponent: ComponentType<T>, url: string) => {
  return (props: T) => {
    const { isLaoding, isError, data }: UseFetchRetrunType = useFetch({
      url,
    })

    if (isLaoding) {
      return <div>Loading ...</div>
    }

    if (isError) {
      return <div>Something went wrong</div>
    }
    return <WrapperComponent {...props} data={data} />
  }
}

const ComponentWithData: FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      {data?.map((item: any, key: number) => {
        return <div key={key}>{item.name}</div>
      })}
    </div>
  )
}
export default apiCallWrapper(ComponentWithData, 'https://jsonplaceholder.typicode.com/users')
