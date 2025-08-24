<?php
require_once "../config/config.php";
require_once "./_cors.php";

header("Content-Type: application/json");

$user_id = $_GET['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(["status" => "error", "message" => "User ID required"]);
    exit;
}

$stmt = $conn->prepare("SELECT id, name, email FROM users WHERE id=?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$res = $stmt->get_result();

if ($user = $res->fetch_assoc()) {
    echo json_encode(["status" => "success", "user" => $user]);
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}
?>