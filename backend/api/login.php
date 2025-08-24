<?php
require_once "../config/config.php";
require_once "./_cors.php";

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if ($email === "" || $password === "") {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

$stmt = $conn->prepare("SELECT id,name,email,password FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();

if ($user = $res->fetch_assoc()) {
    if (password_verify($password, $user["password"])) {
        $_SESSION["user_id"] = $user["id"];
        echo json_encode([
            "status" => "success",
            "message" => "Login successful",
            "user" => [
                "id" => $user["id"],
                "name" => $user["name"],
                "email" => $user["email"]
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}
?>