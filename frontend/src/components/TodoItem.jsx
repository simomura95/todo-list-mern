import { useState, useEffect } from "react"

import { useCurrListContext } from "../hooks/contextsHooks/useCurrListContext.jsx"
import { useAuthContext } from "../hooks/contextsHooks/useAuthContext.jsx"

export default function TodoItem(props) {
  const { _id: listId, dispatch } = useCurrListContext()
  const { user } = useAuthContext()
  const [text, setText] = useState(props.text)

  useEffect(() => {
    setText(props.text)
  }, [props.text])

  async function handleEdit() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo/${listId}/${props._id}`, {
      method: 'PATCH',
      body: JSON.stringify({newText: text}),
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
      dispatch({type: 'EDIT_ITEM', payload: json})
    }
  }

  async function handleCheck() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo/${listId}/${props._id}/check`, {
      method: 'PATCH',
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
      dispatch({type: 'CHECK_ITEM', payload: json})
    }
  }

  async function handleDelete() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo/${listId}/${props._id}`, {
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
      dispatch({type: 'DELETE_ITEM', payload: json})
    }
  }

  return(
    <div className="d-flex my-4 align-items-center">
      <input className="form-check-input item-checkbox py-3 px-sm-3 px-2 rounded-3 mt-0" checked={props.isChecked} type="checkbox" onChange={handleCheck}/>
      <textarea
        className={`fs-6 form-control rounded-3 p-1 mx-2 ${props.isChecked ? "item-checked" : "item-unchecked"}`}
        rows={1}
        type="text"
        aria-label="To-do text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleEdit}
        />
      <button className="btn btn-sm btn-del p-sm-2 p-1 rounded-3" onClick={handleDelete}>X</button>
    </div>
  )
}