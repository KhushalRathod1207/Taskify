import React, { useState } from "react";
import "../style/modal.css";

export default function AddTask({ show, onClose, onSave, categories }) {
    const [task, setTask] = useState({ title: "", summary: "", category: categories[0] });

    const handleSave = () => {
        if (!task.title || !task.summary) return alert("Please fill all fields");
        onSave(task);
        setTask({ title: "", summary: "", category: categories[0] });
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h4 className="modal-title">Add New Task</h4>

                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={task.title}
                        onChange={e => setTask({ ...task, title: e.target.value })}
                        placeholder="Enter task title"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Summary</label>
                    <textarea
                        className="form-control"
                        value={task.summary}
                        onChange={e => setTask({ ...task, summary: e.target.value })}
                        placeholder="Enter task details"
                        rows={3}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        value={task.category}
                        onChange={e => setTask({ ...task, category: e.target.value })}
                    >
                        {categories.map((c, idx) => (
                            <option key={idx} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary me-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        Save Task
                    </button>
                </div>
            </div>
        </div>
    );
}
