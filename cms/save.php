<?php
// cms/save.php
session_start();
require __DIR__ . '/config.php';

header('Content-Type: application/json');

// Basic auth check
if (empty($_SESSION['cms_logged_in'])) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Not authenticated']);
    exit;
}

// CSRF
$sent = $_POST['csrf'] ?? '';
if (empty($sent) || empty($_SESSION['cms_csrf']) || !hash_equals($_SESSION['cms_csrf'], $sent)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Invalid CSRF token']);
    exit;
}

$filename = basename($_POST['filename'] ?? '');
$jsonText = $_POST['json'] ?? '';

global $ALLOWED_JSON_FILES;
if (!in_array($filename, $ALLOWED_JSON_FILES, true)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid filename']);
    exit;
}

$target = realpath(DATA_DIR . $filename);
if ($target === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Target file not found']);
    exit;
}

// Validate JSON
$decoded = json_decode($jsonText, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON: ' . json_last_error_msg()]);
    exit;
}

// Backup old file (timestamped)
$backupDir = DATA_DIR . 'backups/';
if (!is_dir($backupDir)) {
    @mkdir($backupDir, 0755, true);
}
$timestamp = date('Ymd-Hi');
$backupPath = $backupDir . $filename . '.' . $timestamp . '.bak';
@copy($target, $backupPath);

// Atomic write: write to temp file then rename
$tmp = $target . '.tmp';
if (file_put_contents($tmp, json_encode($decoded, JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT)) === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed writing tmp file']);
    exit;
}
if (!rename($tmp, $target)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed saving file (rename)']);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Saved', 'backup' => $backupPath]);
exit;
