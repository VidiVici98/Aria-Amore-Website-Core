<?php
require_once "config.php";

if (!is_logged_in()) {
    http_response_code(403);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(["error" => "No file uploaded"]);
    exit;
}

$file = $_FILES['file'];
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowed = ['jpg','jpeg','png','webp','svg'];

if (!in_array($ext, $allowed)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid file type"]);
    exit;
}

$target = $IMAGE_DIR . uniqid() . "." . $ext;
if (move_uploaded_file($file['tmp_name'], $target)) {
    echo json_encode(["success" => true, "url" => str_replace(__DIR__."/../", "/", $target)]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to upload"]);
}
?>
