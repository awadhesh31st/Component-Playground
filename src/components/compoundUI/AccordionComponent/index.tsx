import { createContext, FC, useContext, useState } from 'react'

type AccordionType = {
  children: React.ReactNode
}

type AccordionItemType = {
  children: React.ReactNode
  index: number
}

type AccordionContextType = {
  activeAccordion: number | null
  handleAccordion: (key: number) => void
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

const Accordion: FC<AccordionType> & { Item: FC<AccordionItemType> } = ({ children }) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

  const handleAccordion = (key: number) => {
    setActiveAccordion(activeAccordion === key ? null : key)
  }

  return (
    <AccordionContext.Provider value={{ activeAccordion, handleAccordion }}>
      {children}
    </AccordionContext.Provider>
  )
}

const AccordionItem: FC<AccordionItemType> = ({ children, index }) => {
  const context = useContext(AccordionContext)

  if (!context) {
    throw new Error('AccordionItem must be used in Accordion')
  }

  const { activeAccordion, handleAccordion } = context

  return (
    <div>
      <button onClick={() => handleAccordion(index)}>{activeAccordion === index ? 'Hide' : 'Show'}</button>
      {activeAccordion === index && <p>{children}</p>}
    </div>
  )
}

Accordion.Item = AccordionItem

export default Accordion
