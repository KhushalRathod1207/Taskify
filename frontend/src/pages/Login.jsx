import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/auth.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost/taskify/backend/api/login.php", { email, password });
            if (res.data.status === "success" && res.data.user) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/dashboard", { replace: true });
            } else {
                setError(res.data.message || "Invalid login");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div className="auth-container">
            {/* Left Image / Branding */}
            <div className="auth-illustration">
                <div className="overlay">
                    <h1>Taskify</h1>
                    <p>Organize. Track. Achieve.</p>
                </div>
            </div>

            {/* Right Form */}
            <div className="auth-form-wrapper">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2 className="auth-title">Welcome Back 👋</h2>
                    <p className="auth-subtitle">Login to continue managing your tasks</p>

                    {error && <div className="alert">{error}</div>}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="btn-primary">Login</button>

                    <p className="auth-footer">
                        Don’t have an account? <Link to="/signup">Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
