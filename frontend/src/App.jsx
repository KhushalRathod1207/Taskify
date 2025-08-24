import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import Login from "./Pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./components/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
