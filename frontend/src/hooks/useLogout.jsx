import { useAuthContext } from "./contextsHooks/useAuthContext.jsx"
import { useCurrListContext } from "./contextsHooks/useCurrListContext.jsx"
import { useAllListsContext } from "./contextsHooks/useAllListsContext.jsx"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: currListDispatch } = useCurrListContext()
  const { dispatch: allListsDispatch } = useAllListsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action, empty all contexts
    dispatch({ type: 'LOGOUT' })
    currListDispatch({type: 'SET_LIST', payload: null})
    allListsDispatch({type: 'SET_LISTS', payload: null})
  }

  return {logout}
}