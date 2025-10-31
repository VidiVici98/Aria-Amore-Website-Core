<?php
session_start();
$SESSION_TIMEOUT = 3600; // 1 hour

if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > $SESSION_TIMEOUT)) {
    session_unset();
    session_destroy();
}
$_SESSION['LAST_ACTIVITY'] = time();

// CMS Admin Credentials
$ADMIN_USER = "admin";
$ADMIN_PASS = "changeme"; // plain text for demo, hash in production

// JSON data files (relative to cms folder)
$JSON_FILES = [
    "homepage" => __DIR__ . "/../data/homepage.json",
    "services" => __DIR__ . "/../data/services.json",
    "artists"  => __DIR__ . "/../data/artists.json",
    "about"    => __DIR__ . "/../data/about.json"
];

// Media upload directory
$IMAGE_DIR = __DIR__ . "/../assets/media/images/";

// Helper functions
function is_logged_in() {
    return isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
}

function load_json($key) {
    global $JSON_FILES;
    if (!isset($JSON_FILES[$key])) return null;
    $file = $JSON_FILES[$key];
    if (!file_exists($file)) return null;
    return json_decode(file_get_contents($file), true);
}

function save_json($key, $data) {
    global $JSON_FILES;
    if (!isset($JSON_FILES[$key])) return false;
    $file = $JSON_FILES[$key];
    return file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT)) !== false;
}
?>
