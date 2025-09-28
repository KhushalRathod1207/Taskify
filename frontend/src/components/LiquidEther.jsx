import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import "./liquidEther.css";

export default function LiquidEther() {
    const { theme } = useContext(ThemeContext);

    // Different backgrounds per theme
    const backgroundStyle =
        theme === "dark"
            ? "radial-gradient(circle at 10% 20%, #020617 0%, #0b1020 30%, #0b1020 100%)"
            : "radial-gradient(circle at 10% 20%, #f0f9ff 0%, #e0f2fe 30%, #f0f9ff 100%)";

    return (
        <div
            className="liquid-ether"
            aria-hidden="true"
            style={{ background: backgroundStyle }}
        >
            {/* SVG filter (gooey) - kept invisible but available to the DOM */}
            <svg className="liquid-ether__svg" width="0" height="0" aria-hidden="true">
                <defs>
                    <filter id="liquid-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            {/* blobs container */}
            <div className="liquid-ether__blobs" style={{ filter: "url(#liquid-goo)" }}>
                <span
                    className="blob b1"
                    style={{
                        background:
                            theme === "dark"
                                ? "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.95), rgba(6, 182, 212, 0.85) 60%)"
                                : "radial-gradient(circle at 30% 30%, rgba(255, 182, 193, 0.9), rgba(255, 140, 0, 0.85) 60%)",
                    }}
                />
                <span
                    className="blob b2"
                    style={{
                        background:
                            theme === "dark"
                                ? "radial-gradient(circle at 70% 70%, rgba(167, 139, 250, 0.92), rgba(59, 130, 246, 0.9) 60%)"
                                : "radial-gradient(circle at 70% 70%, rgba(135, 206, 250, 0.92), rgba(60, 179, 113, 0.9) 60%)",
                    }}
                />
                <span
                    className="blob b3"
                    style={{
                        background:
                            theme === "dark"
                                ? "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.92), rgba(124, 58, 237, 0.9) 60%)"
                                : "radial-gradient(circle at 50% 50%, rgba(173, 216, 230, 0.92), rgba(221, 160, 221, 0.9) 60%)",
                    }}
                />
            </div>

            {/* subtle moving overlay */}
            <div className="liquid-ether__overlay" />
        </div>
    );
}
