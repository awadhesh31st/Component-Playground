import { FC } from 'react'

export type CenterDivType = {
  children: React.ReactNode
}

const CenterDiv: FC<CenterDivType> = ({ children }) => {
  return <div className="flex justify-center items-center h-screen">{children}</div>
}

export default CenterDiv
