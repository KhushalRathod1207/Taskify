import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light px-3">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="fw-bold text-dark mb-3">Page Not Found</h2>
            <p className="lead mb-4 text-muted">
                Sorry, the page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary btn-lg shadow rounded-pill px-4">
                ⬅ Go Back Home
            </Link>
        </div>
    );
}
