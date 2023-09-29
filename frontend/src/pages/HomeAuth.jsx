import TodoList from "../components/TodoList.jsx"
import ListPanel from "../components/ListPanel.jsx"

export default function HomeAuth() {


  // function addTodo
  return (
    <div className="container py-5">
      <ListPanel />
      <TodoList />
    </div>
  )
}