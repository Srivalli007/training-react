import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Todo() {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // 🟢 Load saved todos from localStorage when component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // 🟢 Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ➕ Add a task
  const handleAdd = () => {
    if (task.trim() !== "") {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  // ❌ Delete a task
  const handleDelete = (indexToDelete) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // 🔓 Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            My Todo App
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        {/* Add Task Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
          <div className="flex gap-3">
            <input
              className="flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80"
              placeholder="What needs to be done?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">No tasks yet. Add one above!</p>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your Tasks ({todos.length})
              </h3>
              {todos.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/50 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium flex-1 mr-4">{item}</span>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-gradient-to-r from-red-400 to-pink-400 text-white px-4 py-2 rounded-lg hover:from-red-500 hover:to-pink-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
