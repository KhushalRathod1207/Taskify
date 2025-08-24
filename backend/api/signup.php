<?php
require_once "../config/config.php";
require_once "./_cors.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (!$name || !$email || !$password) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

// Check if email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already registered"]);
    exit;
}

// Hash password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (name,email,password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $hashed_password);

if ($stmt->execute()) {
    $user_id = $stmt->insert_id;
    echo json_encode([
        "status" => "success",
        "message" => "Signup successful",
        "user" => [
            "id" => $user_id,
            "name" => $name,
            "email" => $email
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to create account"]);
}
?>