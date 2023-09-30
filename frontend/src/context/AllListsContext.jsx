import { createContext, useReducer } from 'react'

export const AllListsContext = createContext()

function allListsReducer(state, action) {
  switch (action.type) {
    // actions on list
    case 'SET_LISTS':
      return {
        allLists: action.payload
      }
    case 'ADD_LIST':
      return {
        allLists: [...state.allLists, action.payload]
      }
    case 'DELETE_LIST':
      return {
        allLists: state.allLists.filter(list => list._id !== action.payload._id) 
      }
    case 'EDIT_LIST':
      return {
        allLists:
          state.allLists.map(list => {
            if (list._id === action.payload._id) {
              return action.payload
            } else {
              return list
            }
          })
    }
    default:
      return state
  }
}


  export const AllListsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(allListsReducer, {
      allLists: [],
    })
  
  return (
    <AllListsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AllListsContext.Provider>
  )
}

