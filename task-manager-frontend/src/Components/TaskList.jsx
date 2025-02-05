import { useState } from "react"

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")

  const handleEdit = (task) => {
    setEditingId(task._id)
    setEditTitle(task.title)
    setEditDescription(task.description)
  }

  const handleUpdate = () => {
    if (editingId && editTitle && editDescription) {
      onUpdateTask(editingId, editTitle, editDescription)
      setEditingId(null)
    }
  }

  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <li key={task._id} className="p-4 hover:bg-gray-50">
          {editingId === task._id ? (
            <div className="space-y-4">
              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="flex space-x-2">
              <button onClick={handleUpdate} className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Update</button>
              <button onClick={() => setEditingId(null)}  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
              <p className="mt-1 text-gray-600">{task.description}</p>
              <div className="mt-4 flex space-x-2">
              <button onClick={() => handleEdit(task)} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Edit</button>
              <button onClick={() => onDeleteTask(task._id)} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default TaskList;