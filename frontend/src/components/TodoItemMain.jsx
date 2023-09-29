export default function TodoItemMain(props) {

  function handleEdit(event) {
    props.dispatch({type: 'EDIT_ITEM', payload: {id: props.item.id, newText: event.target.value}})
  }

  function handleCheck() {
    props.dispatch({type: 'CHECK_ITEM', payload: {id: props.item.id, isChecked: props.item.isChecked}})
  }

  function handleDelete() {
    props.dispatch({type: 'DELETE_ITEM', payload: {id: props.item.id}})
  }

  return(
    <div className="d-flex my-4 align-items-center">
      <input className="form-check-input item-checkbox py-3 px-sm-3 px-2 rounded-3 mt-0" checked={props.item.isChecked} type="checkbox" onChange={handleCheck}/>
      <textarea
        className={`fs-6 form-control rounded-3 p-1 mx-2 ${props.item.isChecked ? "item-checked" : "item-unchecked"}`}
        rows={1}
        type="text"
        aria-label="To-do text"
        value={props.item.text}
        onChange={handleEdit}
        />
      <button className="btn btn-sm btn-del p-sm-2 p-1 rounded-3" onClick={handleDelete}>X</button>
    </div>
  )
}