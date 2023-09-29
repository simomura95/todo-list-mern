import { createContext, useReducer } from 'react'

export const ItemsContext = createContext()

// STATE: previous values, ACTION: function input parameter
export const itemsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { 
        items: action.payload 
      }
    case 'ADD_ITEM':
      return { 
        items: [...state.items, action.payload] 
      }
    case 'DELETE_ITEM':
      return { 
        items: state.items.filter(i => i._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const ItemsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemsReducer, { 
    items: null
  })
  
  return (
    <ItemsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ItemsContext.Provider>
  )
}