import { useState } from "react"
import { useCurrListContext } from "../hooks/contextsHooks/useCurrListContext.jsx"
import { useAuthContext } from "../hooks/contextsHooks/useAuthContext.jsx"

export default function NewItem() {
  const { _id, dispatch} = useCurrListContext()
  const { user } = useAuthContext()
  const [newTodo, setnewTodo] = useState("")
  const [submitError, setsubmitError] = useState("")

  async function addItem(event) {
    event.preventDefault();
    if (!newTodo) {
      setsubmitError("Please type something")
      return
    }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo/${_id}`, {
      method: 'POST',
      body: JSON.stringify({newTodo}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setsubmitError(json.error)
    }
    if (response.ok) {
      setsubmitError("")
      setnewTodo("")
      dispatch({type: 'ADD_ITEM', payload: json})
    }
    // dispatch({type: "ADD_ITEM", payload: newItem})
  }

  function handleTyping (event) {
    setnewTodo(event.target.value)
  }

  return(
    <form onSubmit={addItem} className="mt-5">
      <div className="d-flex">
        <input 
          className="form-control new-item"
          type="text"
          placeholder="New to-do:"
          aria-label="New to-do"
          id="new-todo"
          value={newTodo}
          onChange={handleTyping} 
          // required
        />
        <button type="submit" className="btn rounded-circle btn-main ms-2 fw-bold">+</button>
      </div>
      {submitError && <p className="text-danger ms-1">{submitError}</p>}
    </form>

  )

}