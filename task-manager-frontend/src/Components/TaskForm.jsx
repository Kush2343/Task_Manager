import { useState } from "react"

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title && description) {
      onAddTask(title, description)
      setTitle("")
      setDescription("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title"  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description" className="w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Add Task</button>
    </form>
  )
}

export default TaskForm;