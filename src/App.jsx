import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [warning, setWarning] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    const trimmedInput = input.trim()
    if (!trimmedInput) return
    const exists = todos.some(
      (todo) => todo.text.trim().toLowerCase() === trimmedInput.toLowerCase()
    )
    if (exists) {
      setWarning('Task already exists!')
      return
    }
    setTodos([
      ...todos,
      { text: trimmedInput, completed: false, id: Date.now() },
    ])
    setInput('')
    setWarning('')
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
    if (warning) setWarning('')
  }

  return (
    <div className="todo-app">
      <h1>To-Do App</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>
      {warning && <div className="warning">{warning}</div>}
      <ul className="todo-list">
        {todos.length === 0 && <li className="empty">No tasks yet!</li>}
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)} className="todo-text">
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)} className="remove-btn">✕</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
