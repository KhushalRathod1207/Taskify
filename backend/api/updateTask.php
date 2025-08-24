<?php
require_once "../config/config.php";
require_once "./_cors.php";

$data = json_decode(file_get_contents("php://input"), true);

$task_id = $data['id'] ?? null;
$status = $data['status'] ?? null;

if (!$task_id || !$status) {
    echo json_encode(["status" => "error", "message" => "Missing task ID or status"]);
    exit;
}

$stmt = $conn->prepare("UPDATE tasks SET status=? WHERE id=?");
$stmt->bind_param("si", $status, $task_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Task updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update task"]);
}
?>