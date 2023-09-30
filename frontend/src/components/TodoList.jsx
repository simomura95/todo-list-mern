import { useEffect, useState } from "react"

import NewItem from "./NewItem"
import TodoItem from "./TodoItem";
import { useAuthContext } from "../hooks/contextsHooks/useAuthContext.jsx"
import { useCurrListContext } from "../hooks/contextsHooks/useCurrListContext.jsx"
import { useAllListsContext } from "../hooks/contextsHooks/useAllListsContext.jsx"

export default function TodoList () {
  const { user } = useAuthContext()
  const { _id, title: listTitle, items, dispatch } = useCurrListContext()
  const { allLists, dispatch: allListsDispatch } = useAllListsContext()
  const [title, setTitle] = useState('listTitle')
  const [error, setError] = useState('')

  useEffect(() => {
    setTitle(listTitle)
  }, [listTitle])

  async function handleEdit() {
    setError("");
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({newText: title}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      console.log(json.error)
      setError(json.error)
    }
    if (response.ok) {
      dispatch({type: 'EDIT_LIST', payload: json})
      allListsDispatch({type: 'EDIT_LIST', payload: json})
    }
  }

  async function handleDelete() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo/${_id}`, {
      method: 'DELETE',
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
      const delIndex = allLists.findIndex(list => list._id === _id)
      const newIndex = (delIndex < allLists.length-1) ? delIndex+1 : delIndex-1
      const newCurrList = allLists[newIndex]
      console.log(allLists)
      dispatch({type: 'SET_LIST', payload: newCurrList})
      allListsDispatch({type: 'DELETE_LIST', payload: json})
    }
  }
  
  function createItem(item, index) {
    return(
      <TodoItem
        key={index}
        _id={item._id}
        text={item.text}
        isChecked={item.isChecked}
      />
    )
  }

  return (
    _id && <div>
      <input
        type="text"
        className={`h1 border d-block ${error ? "border-danger" : "border-0"}`}
        id="list-title"
        value={title}
        aria-label="List title"
        // size={title.length}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleEdit}
        />
      <button className="btn btn-sm btn-del mt-1" onClick={handleDelete}>Delete List</button>
      {error && <p className="text-danger">{error}</p>}
      {items.map(createItem)}
      <NewItem />
    </div>
  )
}
