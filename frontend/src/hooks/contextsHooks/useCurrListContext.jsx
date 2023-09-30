import { CurrListContext } from "../../context/CurrListContext.jsx"
import { useContext } from "react"

export const useCurrListContext = () => {
  const context = useContext(CurrListContext)

  if(!context) {
    throw Error('useCurrListContext must be used inside a CurrListContextProvider')
  }

  return context
}