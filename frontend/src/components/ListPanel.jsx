import { useEffect, useState } from 'react'
import {useAuthContext} from '../hooks/contextsHooks/useAuthContext.jsx'
import { useAllListsContext} from '../hooks/contextsHooks/useAllListsContext.jsx'
import {useCurrListContext} from '../hooks/contextsHooks/useCurrListContext.jsx'

const ListPanel = () => {
  const { user } = useAuthContext()
  const { allLists, dispatch } = useAllListsContext()
  const { _id: currList_id, title, items, dispatch: currlistDispatch} = useCurrListContext()
  const [isLoading, setIsLoading] = useState(false)

  // eslint-disable-next-line
  useEffect(() => {
    if (currList_id) {
      dispatch({type: 'EDIT_LIST', payload: {_id: currList_id, title, items}})
    }
  }, [title, items])

  // la prima volta, carica tutte le liste dell'utente nel contesto
  // eslint-disable-next-line
  useEffect(() => {
    async function findAllLists() {
      setIsLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
  
      if (!response.ok) {
        setIsLoading(false)
        console.log(json.error)
      }
      if (response.ok) {
        dispatch({type: 'SET_LISTS', payload: json})
        if (json.length > 0) {
          currlistDispatch({type: 'SET_LIST', payload: json[json.length-1]})
        }
        setIsLoading(false)
      }
    }
  
    if (user) {
      findAllLists()
    }
  }, [])

  async function addNewList() {
    const newListTitle = 'New list'
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo`, {
      method: 'POST',
      body: JSON.stringify({newListTitle}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      console.log(json.error)
    }
    if (response.ok) {
      dispatch({type: 'ADD_LIST', payload: json})
      currlistDispatch({type: 'SET_LIST', payload: json})
    }
  }

  function listEntry(list, index) {
    function changeCurrList() {
      currlistDispatch({type: 'SET_LIST', payload: list})
    }
  
    return (
      <button
        className={`btn btn-list ${list._id === currList_id ? "btn-list-active" : "btn-list"}`}
        onClick={changeCurrList}
        key={index}>
          {list.title}
      </button>
    )
  }

  return (
    <div>
      {isLoading && <span>Loading lists could take a couple of minutes the first time</span>}
      {allLists && <div className="d-flex flex-wrap gap-1 mb-2">{allLists.map(listEntry)}
        <button className="btn btn-main fw-bold" onClick={addNewList} disabled={isLoading}>Add list</button>
      </div>}
    </div>
  )
}

export default ListPanel