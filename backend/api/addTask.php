<?php
require_once "../config/config.php";
require_once "./_cors.php";

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$title = $data['title'] ?? '';
$summary = $data['summary'] ?? '';
$category = $data['category'] ?? 'Others';

if (!$user_id || !$title || !$summary) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO tasks (user_id, title, summary, category, status, created_at) VALUES (?, ?, ?, ?, 'pending', NOW())");
$stmt->bind_param("isss", $user_id, $title, $summary, $category);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Task added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to add task"]);
}
?>