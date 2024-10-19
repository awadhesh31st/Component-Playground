import { useMemo, useState } from 'react'
import CharacterComponents from './components/character'
import CenterDiv from './components/character/common/centerDiv'
import Form from './components/form'
import Timer from './components/timer'

type ShowComponentType = 'character' | 'form' | 'timer'

const App = () => {
  const [showComponent, setShowComponent] = useState<ShowComponentType>('character')

  const renderComponent = useMemo(() => {
    switch (showComponent) {
      case 'character':
        return <CharacterComponents />
      case 'form':
        return <Form />
      case 'timer':
        return <Timer />
      default:
        return null
    }
  }, [showComponent])

  return (
    <div className="h-screen">
      <CenterDiv>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center items-center gap-2">
            <span className="cursor-pointer" onClick={() => setShowComponent('character')}>
              Character
            </span>
            <span className="cursor-pointer" onClick={() => setShowComponent('form')}>
              Form
            </span>
            <span className="cursor-pointer" onClick={() => setShowComponent('timer')}>
              Timer
            </span>
          </div>
          {renderComponent}
        </div>
      </CenterDiv>
    </div>
  )
}

export default App
