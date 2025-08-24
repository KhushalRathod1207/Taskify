import React from "react";

export default function TaskCard({ task, onToggleDone, onDelete }) {
    const isCompleted = task.status.toLowerCase() === "completed";
    const statusColor = isCompleted ? "success" : "warning";

    // Category color mapping
    const categoryColors = {
        Work: "primary",
        Personal: "info",
        Shopping: "secondary",
        Other: "dark"
    };
    const categoryColor = categoryColors[task.category] || "primary";

    return (
        <div
            className="card task-card mb-3 shadow-sm border-0"
            style={{ borderRadius: "16px", overflow: "hidden" }}
        >
            {/* Header */}
            <div className="card-header bg-light d-flex justify-content-between align-items-center flex-wrap">
                <h5
                    className="mb-0 text-truncate"
                    style={{ maxWidth: "70%", wordBreak: "break-word" }}
                >
                    {task.title}
                </h5>
                <span
                    className={`badge rounded-pill bg-${statusColor} px-3 py-2 mt-2 mt-md-0`}
                    style={{ fontSize: "0.8rem" }}
                >
                    {task.status}
                </span>
            </div>

            {/* Body */}
            <div className="card-body">
                <p className="card-text text-muted">{task.summary}</p>

                {/* Category */}
                <p className="mb-2">
                    <strong>Category:</strong>{" "}
                    <span
                        className={`badge bg-${categoryColor} text-white px-3 py-1`}
                        style={{ borderRadius: "20px" }}
                    >
                        {task.category}
                    </span>
                </p>

                {/* Actions */}
                <div className="d-flex flex-wrap justify-content-end gap-2 mt-3">
                    <button
                        className={`btn btn-sm btn-${isCompleted ? "warning" : "success"}`}
                        onClick={onToggleDone}
                    >
                        {isCompleted ? "Mark Pending" : "Mark Completed"}
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
