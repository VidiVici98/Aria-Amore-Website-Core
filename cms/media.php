<?php
require_once "config.php";
if (!is_logged_in()) { http_response_code(403); exit; }

$files = glob($IMAGE_DIR."*.{jpg,jpeg,png,webp,svg}", GLOB_BRACE);
$urls = array_map(fn($f) => str_replace(__DIR__ . "/../", "/", $f), $files);
echo json_encode($urls);
?>
