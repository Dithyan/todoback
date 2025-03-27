import { useState, useEffect } from "react";
import { Check, Trash2, Plus, Edit2, Save } from "lucide-react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim() === "") return;

    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTask, completed: false }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const newTaskData = await response.json();
      setTasks([...tasks, newTaskData]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (index, id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/toggle/${id}`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedData = await response.json();
      setTasks(tasks.map((task, i) => (i === index ? updatedData : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async (index, id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const saveEdit = async (index, id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editedTask }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedData = await response.json();
      setTasks(tasks.map((task, i) => (i === index ? updatedData : task)));
      setEditingIndex(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List ✅</h1>

        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border rounded-md outline-none"
          />
          <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded-md">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet. Add one! 🚀</p>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task._id}
                className="flex items-center justify-between border p-2 rounded-md"
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    className="flex-1 p-1 border rounded-md outline-none"
                  />
                ) : (
                  <span
                    className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                    onClick={() => toggleTask(index, task._id)}
                  >
                    {task.text}
                  </span>
                )}

                <div className="flex gap-2">
                  {editingIndex === index ? (
                    <button onClick={() => saveEdit(index, task._id)} className="text-green-500">
                      <Save className="w-5 h-5" />
                    </button>
                  ) : (
                    <>
                      <button onClick={() => startEditing(index)} className="text-blue-500">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => removeTask(index, task._id)} className="text-red-500">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
