import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../style/dashboard.css";

export default function ProfilePage() {
    // ✅ Get user from localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (!user) {
            setMsg("🔒 Please log in to view your profile.");
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost/taskify/backend/api/getProfile.php?user_id=${user.id}`
                );
                if (data.status === "success") {
                    setForm({
                        name: data.user.name,
                        email: data.user.email,
                        password: ""
                    });
                } else {
                    setMsg(data.message || "⚠️ Failed to fetch profile");
                }
            } catch (err) {
                console.error(err);
                setMsg("⚠️ Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        try {
            const { data } = await axios.post(
                "http://localhost/taskify/backend/api/updateProfile.php",
                {
                    user_id: user.id,
                    name: form.name,
                    email: form.email,
                    password: form.password
                }
            );

            setMsg(data.message);

            if (data.status === "success") {
                const updatedUser = {
                    ...user,
                    name: form.name,
                    email: form.email
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setForm((f) => ({ ...f, password: "" }));
            }
        } catch (err) {
            console.error(err);
            setMsg("❌ Update failed");
        }
    };

    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 text-muted">
                Loading...
            </div>
        );

    // ✅ If no user, redirect to login
    if (!user)
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-gradient">
                <h2 className="mb-3 text-dark">{msg}</h2>
            </div>
        );

    return (
        <div className="dashboard card">
            <Sidebar />

            <main className="dashboard-main">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold text-primary">👤 My Profile</h1>
                </div>

                {/* Profile Card */}
                <div className="card p-4 shadow-sm">
                    {msg && (
                        <div
                            className={`alert ${msg.toLowerCase().includes("success")
                                ? "alert-success"
                                : "alert-info"
                                }`}
                        >
                            {msg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Name</label>
                            <input
                                className="form-control"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">
                                New Password (optional)
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            className="btn btn-primary w-100 shadow-sm"
                            type="submit"
                            style={{
                                borderRadius: "10px",
                                background: "linear-gradient(90deg,#667eea,#764ba2)"
                            }}
                        >
                            💾 Save Changes
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
