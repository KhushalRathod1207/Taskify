// components/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "16px");

    useEffect(() => {
        // Save theme + fontSize
        localStorage.setItem("theme", theme);
        localStorage.setItem("fontSize", fontSize);

        // Apply theme to <html> so it affects whole app
        document.documentElement.setAttribute("data-theme", theme);
        document.body.style.fontSize = fontSize;
    }, [theme, fontSize]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
            {children}
        </ThemeContext.Provider>
    );
};
