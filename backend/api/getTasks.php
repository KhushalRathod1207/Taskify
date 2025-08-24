<?php
require_once "../config/config.php";
require_once "./_cors.php";

$user_id = $_GET['user_id'] ?? null;
$category = $_GET['category'] ?? null;

if (!$user_id) {
    echo json_encode([]);
    exit;
}

if ($category && $category != "All") {
    $stmt = $conn->prepare("SELECT * FROM tasks WHERE user_id=? AND category=? ORDER BY created_at DESC");
    $stmt->bind_param("is", $user_id, $category);
} else {
    $stmt = $conn->prepare("SELECT * FROM tasks WHERE user_id=? ORDER BY created_at DESC");
    $stmt->bind_param("i", $user_id);
}

$stmt->execute();
$res = $stmt->get_result();
$tasks = $res->fetch_all(MYSQLI_ASSOC);

echo json_encode($tasks);
?>