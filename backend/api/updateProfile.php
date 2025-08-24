<?php
require_once "../config/config.php";
require_once "./_cors.php";

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$name = trim($data['name'] ?? "");
$email = trim($data['email'] ?? "");

if (!$user_id || $name === "" || $email === "") {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

$stmt = $conn->prepare("UPDATE users SET name=?, email=? WHERE id=?");
$stmt->bind_param("ssi", $name, $email, $user_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Profile updated"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update profile"]);
}


?>