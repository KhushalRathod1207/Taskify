import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import axios from "axios";
import { ThemeContext } from "../components/ThemeContext";
import { useNavigate } from "react-router-dom";
import "../style/Dashboard.css";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [categories] = useState(["All", "Work", "Personal", "Shopping", "Others"]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showAddTask, setShowAddTask] = useState(false);
    const [loading, setLoading] = useState(false);

    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    // ✅ Read user safely
    const storedUser = localStorage.getItem("user");
    let user = null;
    try {
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch {
        localStorage.removeItem("user");
    }

    // ✅ Redirect if no user
    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
            return;
        }
        fetchTasks();
    }, [selectedCategory]);

    const fetchTasks = async () => {
        if (!user) return;
        setLoading(true);
        try {
            let url = `http://localhost/taskify/backend/api/getTasks.php?user_id=${user.id}`;
            if (selectedCategory !== "All") {
                url += `&category=${encodeURIComponent(selectedCategory)}`;
            }
            const res = await axios.get(url);
            const fetchedTasks = res.data || [];
            setTasks(fetchedTasks);

            // ✅ Save in localStorage for export
            localStorage.setItem("tasks", JSON.stringify(fetchedTasks));
        } catch (err) {
            console.error("Failed to fetch tasks", err);
        }
        setLoading(false);
    };

    const handleAddTask = async (task) => {
        if (!user) return;
        try {
            await axios.post("http://localhost/taskify/backend/api/addTask.php", {
                user_id: user.id,
                title: task.title,
                summary: task.summary,
                category: task.category,
            });
            fetchTasks();
            setShowAddTask(false);
        } catch (err) {
            console.error("Failed to add task", err);
        }
    };

    const toggleDone = async (task) => {
        if (!user) return;
        try {
            const newStatus = task.status === "completed" ? "pending" : "completed";
            await axios.post("http://localhost/taskify/backend/api/updateTask.php", {
                id: task.id,
                status: newStatus,
            });
            fetchTasks();
        } catch (err) {
            console.error("Failed to update task", err);
        }
    };

    const deleteTask = async (id) => {
        if (!user) return;
        try {
            await axios.post("http://localhost/taskify/backend/api/deleteTask.php", { id });
            fetchTasks();
        } catch (err) {
            console.error("Failed to delete task", err);
        }
    };

    return (
        <div className={`dashboard card ${theme}`}>
            <Sidebar />

            <main className="dashboard-main">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold text-primary">📋 My Tasks</h1>
                    <button
                        className="btn btn-primary shadow-sm px-4"
                        onClick={() => setShowAddTask(true)}
                        style={{
                            borderRadius: "10px",
                            background: "linear-gradient(90deg,#667eea,#764ba2)"
                        }}
                    >
                        <i className="fas fa-plus me-2"></i> Add Task
                    </button>
                </div>

                {/* Category Filter */}
                <div className="mb-4 d-flex flex-wrap gap-2">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            className={`btn ${selectedCategory === cat ? "btn-primary" : "btn-outline-secondary"} shadow-sm`}
                            style={{ borderRadius: "20px", fontWeight: "500" }}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Tasks */}
                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2 text-muted">Loading tasks...</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center text-muted fst-italic mt-5">
                        🚀 No tasks found in <strong>{selectedCategory}</strong>.
                    </div>
                ) : (
                    <div className="row">
                        {tasks.map((task) => (
                            <div key={task.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                                <TaskCard
                                    task={task}
                                    onToggleDone={() => toggleDone(task)}
                                    onDelete={() => deleteTask(task.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Add Task Modal */}
            <AddTask
                show={showAddTask}
                categories={categories}
                onClose={() => setShowAddTask(false)}
                onSave={handleAddTask}
            />
        </div>
    );
}
