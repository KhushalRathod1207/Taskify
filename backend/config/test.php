<?php
$conn = new mysqli("localhost", "root", "", "taskify_db");

if ($conn->connect_error) {
    die("Failed: " . $conn->connect_error);
} else {
    echo "Database connected successfully!";
}
?>