import TodoItemMain from "./TodoItemMain";

export default function TodoListmain (props) {
  console.log(props.todoItems)

  function createItem(item, index) {

    return(
      <TodoItemMain
        key={index}
        item={item}
        dispatch={props.dispatch}
      />
    )
  }

  return (
    <div>
      {props.todoItems.map(createItem)}
    </div>
  )
}
