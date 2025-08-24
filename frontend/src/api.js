// src/api.js
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost/Taskify/backend/api",
    withCredentials: true, // send/receive PHP session cookie
});

export default API;
