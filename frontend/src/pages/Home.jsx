import { useEffect, useReducer } from "react"
import TodoListMain from "../components/TodoListMain"
import NewItemMain from "../components/NewItemMain"

export default function Home() {
  function todoReducer(state, action) {
    console.log(state)
    switch (action.type) {
      // case 'SET_ITEMS':
      //   return { 
      //     items: action.payload 
      //   }
      case 'ADD_ITEM':
        return { 
          items: [...state.items, action.payload] 
        }
      case 'DELETE_ITEM':
        return { 
          items: state.items.filter(i => i.id !== action.payload.id) 
        }
      case 'EDIT_ITEM': {
        const {id, newText} = action.payload;
        return {
          items:
            state.items.map(item => {
              if (item.id === id) {
                return { ...item, text: newText}
              } else {
                return item
              }
            })
        }
      }
      case 'CHECK_ITEM': {
        const {id, isChecked} = action.payload;
        return {
          items:
            state.items.map(item => {
              if (item.id === id) {
                return { ...item, isChecked: !isChecked}
              } else {
                return item
              }
            })
        }
      }
      default:
        return state
    }
  }

  const todoItemsStored = JSON.parse(localStorage.getItem("todoItems"))
  const [todoItems, dispatch] = useReducer(todoReducer, {items: todoItemsStored ? todoItemsStored : []})

  useEffect(() => {
    // Aggiorna localStorage solo quando todoItems cambia (dentro le function non si aggiornava per tempo)
    if (todoItems) {
      localStorage.setItem("todoItems", JSON.stringify(todoItems.items))
    }
  }, [todoItems]);

  // function addTodo
  return (
    <div className="container py-5">
      <h1>To-do list</h1>
      <p>Click on an item to edit it<br />
      Click on its checkbox to mark it as done<br />
      Click on the red button to delete it</p>
      <TodoListMain
        todoItems={todoItems.items}
        dispatch={dispatch}
      />
      <NewItemMain
        dispatch={dispatch}
      />
    </div>
  )
}