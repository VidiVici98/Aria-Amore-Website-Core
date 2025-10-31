<?php
require_once "config.php";
if (!is_logged_in()) { http_response_code(403); exit; }

$key = $_GET['file'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

if (!$key || !$data) {
    echo json_encode(["success"=>false,"error"=>"Missing data"]);
    exit;
}

if (save_json($key, $data)) {
    echo json_encode(["success"=>true]);
} else {
    echo json_encode(["success"=>false,"error"=>"Unable to save"]);
}
?>
