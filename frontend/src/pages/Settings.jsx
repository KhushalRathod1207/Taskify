import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";
import "../style/Dashboard.css";

export default function SettingsPage() {
    const navigate = useNavigate();
    const { theme, setTheme, fontSize, setFontSize } = useContext(ThemeContext);

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const defaultSettings = {
        fontSize: "16px",
        theme: "light",
        emailNotifications: true,
        pushNotifications: true,
        defaultTaskView: "list",
        sortOrder: "due_date",
    };

    const [settings, setSettings] = useState(defaultSettings);
    const [tasks, setTasks] = useState([]);

    // Load saved settings
    useEffect(() => {
        const saved = localStorage.getItem("settings");
        if (saved) {
            const parsed = JSON.parse(saved);
            setSettings(parsed);

            // Only sync with ThemeContext if saved theme exists
            if (parsed.theme) setTheme(parsed.theme);
            if (parsed.fontSize) setFontSize(parsed.fontSize);
        }
        // Do NOT setTheme(defaultSettings.theme) here
    }, [setTheme, setFontSize]);



    // Update local settings + context
    const handleChange = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);

        if (key === "theme") {
            setTheme(value);
            localStorage.setItem("theme", value); // persist
        }
        if (key === "fontSize") {
            setFontSize(value);
            localStorage.setItem("fontSize", value); // persist
        }
    };


    const handleSave = () => {
        localStorage.setItem("settings", JSON.stringify(settings));
        alert("✅ Settings saved!");
    };

    const handleDeleteAccount = () => {
        if (
            window.confirm(
                "⚠️ Are you sure you want to delete your account? This cannot be undone."
            )
        ) {
            localStorage.clear();
            alert("Your account has been deleted.");
            window.location.replace("/login"); // Force logout
        }
    };

    const handleExport = () => {
        if (!user) return;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const data = {
            username: user?.name || "Guest",
            tasks: tasks,
        };

        const fileName = `${user?.name || "guest"}_tasks.json`;

        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    };

    // ✅ User check
    if (!user) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-gradient">
                <h2 className="mb-3 text-dark">🔒 Please log in</h2>
            </div>
        );
    }

    return (
        <div className="dashboard card">
            <Sidebar />

            <main className="dashboard-main">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold text-primary">⚙️ Settings</h1>
                </div>

                {/* Theme & Appearance */}
                <div className="card p-4 shadow-sm mb-4">
                    <h5 className="mb-3">Theme & Appearance</h5>

                    <div className="mb-3">
                        <label className="fw-bold">Theme</label>
                        <select
                            className="form-select"
                            value={theme}
                            onChange={(e) => handleChange("theme", e.target.value)}
                        >
                            <option value="light">🌞 Light</option>
                            <option value="dark">🌙 Dark</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="fw-bold">Font Size</label>
                        <select
                            className="form-select"
                            value={fontSize}
                            onChange={(e) => handleChange("fontSize", e.target.value)}
                        >
                            <option value="14px">Small</option>
                            <option value="16px">Medium</option>
                            <option value="18px">Large</option>
                            <option value="20px">Extra Large</option>
                        </select>
                    </div>
                </div>

                {/* Account Management */}
                <div className="card p-4 shadow-sm mb-4">
                    <h5 className="mb-3">Account Management</h5>
                    <button
                        className="btn btn-danger w-100 mb-2"
                        onClick={handleDeleteAccount}
                    >
                        🗑 Delete Account
                    </button>
                    <button
                        className="btn btn-secondary w-100"
                        onClick={handleExport}
                    >
                        📁 Export My Tasks
                    </button>
                </div>

                {/* Help & Support */}
                <div className="card p-4 shadow-sm mb-4">
                    <h5 className="mb-3">Help & Support</h5>
                    <p className="mb-2">
                        💡 Visit our{" "}
                        <a href="/help" className="text-primary">
                            Help Center
                        </a>{" "}
                        for guides and FAQs.
                    </p>
                    <p className="mb-2">
                        📧 Email Support:{" "}
                        <a
                            href="mailto:support@example.com"
                            className="text-primary"
                        >
                            khushalr010@gmail.com
                        </a>
                    </p>
                    <p className="mb-0">📞 Call us: +91 8200567118</p>
                </div>

                {/* Save Button */}
                <div className="mt-4">
                    <button
                        className="btn btn-primary w-100"
                        onClick={handleSave}
                        style={{
                            borderRadius: "10px",
                            background: "linear-gradient(90deg,#667eea,#764ba2)",
                        }}
                    >
                        💾 Save Settings
                    </button>
                </div>
            </main>
        </div>
    );
}
