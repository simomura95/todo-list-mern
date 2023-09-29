import { createContext, useReducer } from 'react'

export const CurrListContext = createContext()

  function currListReducer(state, action) {
    switch (action.type) {
      // actions on list
      case 'SET_LIST':
        return {
          ...action.payload
        }
      // case 'ADD_LIST': {
      //   const {_id, title} = action.payload
      //   return {
      //     _id: _id,
      //     title: title,
      //     items: []
      //   }
      // }
      // case 'DELETE_LIST':
      // uso SET_LIST per impostare una lista diversa
      case 'EDIT_LIST':
        return {
          ...state,
          title: action.payload.title
        }
      // actions on items
      case 'SET_ITEMS':
        return {
          ...state, 
          items: action.payload 
        }
      case 'ADD_ITEM':
        return {
          ...state,
          items: [...state.items, action.payload] 
        }
      case 'DELETE_ITEM':
        return {
          ...state,
          items: state.items.filter(i => i._id !== action.payload._id) 
        }
      case 'EDIT_ITEM':
        return {
          ...state,
          items: action.payload
        }
      case 'CHECK_ITEM':
        return {
          ...state,
          items: action.payload
        }
      default:
        return state
    }
  }


  export const CurrListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(currListReducer, {
      _id: '',
      title: '',
      items: []
    })
  
  return (
    <CurrListContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CurrListContext.Provider>
  )
}

