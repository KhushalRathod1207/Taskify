<?php

session_start();
// Load .env variables

header("Access-Control-Allow-Origin: http://localhost:5173"); // Vite UR
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$dotenv = parse_ini_file(__DIR__ . '/../.env');

$host = $dotenv['DB_HOST'];
$user = $dotenv['DB_USER'];
$pass = $dotenv['DB_PASS'];
$db_name = $dotenv['DB_NAME'];

// Create connection
$conn = new mysqli($host, $user, $pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>