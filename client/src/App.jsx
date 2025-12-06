import { useEffect, useState, useMemo } from "react";

const API_BASE = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | completed

  // derived stats
  const { total, pendingCount, completedCount } = useMemo(() => {
    const pending = tasks.filter((t) => t.status === "pending").length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    return {
      total: tasks.length,
      pendingCount: pending,
      completedCount: completed
    };
  }, [tasks]);

  // filtered tasks to show
  const filteredTasks = useMemo(() => {
    if (filter === "pending") {
      return tasks.filter((t) => t.status === "pending");
    }
    if (filter === "completed") {
      return tasks.filter((t) => t.status === "completed");
    }
    return tasks;
  }, [tasks, filter]);

  // Fetch tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(API_BASE);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError("Could not load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError("");

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      const newTask = await res.json();
      if (res.ok) {
        setTasks((prev) => [newTask, ...prev]);
        setTitle("");
      } else {
        setError(newTask.message || "Could not create task");
      }
    } catch (err) {
      console.error("Create task error:", err);
      setError("Network error while creating task");
    }
  };

const toggleStatus = async (taskId, currentStatus) => {
  setError("");

  const newStatus = currentStatus === "pending" ? "completed" : "pending";

  try {
    const res = await fetch(`${API_BASE}/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    const updated = await res.json();
    if (res.ok) {
      setTasks((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );
      setError("");
    } else {
      setError(updated.message || "Could not update task");
    }
  } catch (err) {
    console.error("Update task error:", err);
    setError("Network error while updating task");
  }
};


  const deleteTask = async (taskId) => {
    // small confirmation to avoid accidental deletes
    const sure = window.confirm("Delete this task?");
    if (!sure) return;

    setError("");
    try {
      const res = await fetch(`${API_BASE}/${taskId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
      } else {
        setError(data.message || "Could not delete task");
      }
    } catch (err) {
      console.error("Delete task error:", err);
      setError("Network error while deleting task");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Daily Task Tracker</h1>
        <p className="subtitle">Tiny assistant, big productivity.</p>

        <form onSubmit={handleCreate} className="task-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {/* Stats + filters row */}
        <div className="top-row">
          <div className="summary">
            {total === 0 && <span>Nothing on your plate yet. Add a task!</span>}
            {total > 0 && (
              <>
                <span>Total: {total}</span>
                <span>Pending: {pendingCount}</span>
                <span>Done: {completedCount}</span>
              </>
            )}
          </div>

          <div className="filters">
            <button
              type="button"
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              type="button"
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {loading && <p>Loading tasks...</p>}

        <div className="task-list">
          {filteredTasks.length === 0 && !loading && total > 0 && (
            <p className="empty">No tasks in this view.</p>
          )}

          {total === 0 && !loading && (
            <p className="empty">No tasks yet. Add one and conquer the day.</p>
          )}

          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className={`task-item ${
                task.status === "completed" ? "completed" : ""
              }`}
            >
              <span>{task.title}</span>
<div className="task-actions">
  <span className="status-pill">
    {task.status === "pending" ? "Pending" : "Done"}
  </span>
  <button
    className="toggle-btn"
    type="button"
    onClick={() => toggleStatus(task._id, task.status)}
  >
    {task.status === "pending" ? "Mark done" : "Undo"}
  </button>
  <button type="button" onClick={() => deleteTask(task._id)}>✕</button>
</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
