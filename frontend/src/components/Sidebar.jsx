import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext"; // Import Theme Context
import "../style/sidebar.css";

export default function Sidebar() {
    const location = useLocation();
    const { theme } = useContext(ThemeContext); // Get theme (light/dark)

    const handleLogout = () => {
        try {
            // ✅ Clear all stored data
            localStorage.removeItem("user");
            localStorage.removeItem("tasks");
            localStorage.removeItem("settings");

            // ✅ Use React Router navigation instead of reload
            window.location.replace("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className={`sidebar ${theme}`}>
            <div className="logo">
                <i className="icon">
                    <img
                        src="src/assets/images/Login_Logo.png"
                        alt="logo"
                        width="40px"
                    />
                </i>
                <span className="logo-text">Taskify</span>
            </div>

            <nav className="menu">
                <Link
                    to="/dashboard"
                    className={location.pathname === "/dashboard" ? "active" : ""}
                >
                    <i className="fas fa-home"></i>
                    <span className="text">Dashboard</span>
                </Link>
                <Link
                    to="/profile"
                    className={location.pathname === "/profile" ? "active" : ""}
                >
                    <i className="fas fa-user"></i>
                    <span className="text">Profile</span>
                </Link>
                <Link
                    to="/settings"
                    className={location.pathname === "/settings" ? "active" : ""}
                >
                    <i className="fas fa-cog"></i>
                    <span className="text">Settings</span>
                </Link>
            </nav>

            <button className="logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span className="text">Logout</span>
            </button>
        </div>
    );
}
