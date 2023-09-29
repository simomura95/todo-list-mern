import { useState } from "react"
import { v1 as uuidv1 } from "uuid"

export default function NewItemMain(props) {
  const [newTodo, setnewTodo] = useState("")
  // const [submitError, setsubmitError] = useState("")

  function addItem(event) {
    // if (!newTodo) {
    //   setsubmitError("Please type something")
    // // check: each item text can only be inserted one time -> NOT NEEDED
    // } else if (todoItems.some((item) => item.text === newTodo )) {
    //   setsubmitError("Item already in list")
    // } else {
      // add item to list (it's a state, so the list re-renders when it changes)
      const newItem = {"id": uuidv1(), "text": newTodo, "isChecked": false}
      props.dispatch({type: "ADD_ITEM", payload: newItem})
      // props.settodoItems([...props.todoItems, {"id": uuidv1(), "text": newTodo, "isChecked": false}])
      // clear input
      setnewTodo("")
      // setsubmitError("")
    // }
    event.preventDefault();
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
        <button type="submit" className="btn rounded-circle btn-add ms-2 fw-bold">+</button>
      </div>
      {/* {submitError && <p className="text-danger ms-1">{submitError}</p>} */}
    </form>

  )

}