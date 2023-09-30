import { AllListsContext } from "../../context/AllListsContext.jsx"
import { useContext } from "react"

export const useAllListsContext = () => {
  const context = useContext(AllListsContext)

  if(!context) {
    throw Error('useAllListsContext must be used inside a AllListsContextProvider')
  }

  return context
}