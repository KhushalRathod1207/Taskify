import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/auth.css";
import { ThemeContext } from '../components/ThemeContext';

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost/Taskify/backend/api/signup.php", {
                name, email, password
            });

            if (res.data.status === "success") {
                // Save user in localStorage
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/dashboard");
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError("Server error");
            console.error(err);
        }
    };

    return (
        <div className="auth-container">
            {/* Left Illustration */}
            <div className="auth-illustration">
                <div className="overlay">
                    <h1>Taskify</h1>
                    <p>Create. Manage. Complete.</p>
                </div>
            </div>

            {/* Right Form */}
            <div className="auth-form-wrapper">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2 className="auth-title">Create Account ✨</h2>
                    <p className="auth-subtitle">Join Taskify and start organizing your work</p>

                    {error && <div className="alert">{error}</div>}

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="username"
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
                            autoComplete="new-password"
                            placeholder="Enter a strong password"
                        />
                    </div>

                    <button type="submit" className="btn-primary">Signup</button>

                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
