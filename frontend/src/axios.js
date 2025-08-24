// src/axios.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/taskify/backend/api", // Path to your PHP backend folder
    withCredentials: true, // Allow session cookies from backend
});

export default api;
