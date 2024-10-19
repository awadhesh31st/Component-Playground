import { FC } from 'react'

export type CenterDivType = {
  children: React.ReactNode
}

const CenterDiv: FC<CenterDivType> = ({ children }) => {
  return <div className="flex justify-center items-center">{children}</div>
}

export default CenterDiv
