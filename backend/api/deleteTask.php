<?php
require_once "../config/config.php";
require_once "./_cors.php";

$data = json_decode(file_get_contents("php://input"), true);
$task_id = $data['id'] ?? null;

if (!$task_id) {
    echo json_encode(["status" => "error", "message" => "Missing task ID"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM tasks WHERE id=?");
$stmt->bind_param("i", $task_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Task deleted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to delete task"]);
}
?>