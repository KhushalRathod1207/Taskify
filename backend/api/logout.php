<?php
session_start(); // ✅ Must start session before destroying it

require_once "../config/config.php";
require_once "./_cors.php";

// Clear all session data
$_SESSION = [];

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        "",
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Destroy the session
session_destroy();

echo json_encode([
    "status" => "success",
    "message" => "Logged out"
]);
