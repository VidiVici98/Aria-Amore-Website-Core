<?php
// cms/upload.php
session_start();
require __DIR__ . '/config.php';

header('Content-Type: application/json');

// Auth
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

if (empty($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'No file uploaded']);
    exit;
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Upload error code: ' . $file['error']]);
    exit;
}
if ($file['size'] > MAX_UPLOAD_BYTES) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'File too large']);
    exit;
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

global $ALLOWED_IMAGE_MIMES;
if (!in_array($mime, $ALLOWED_IMAGE_MIMES)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Unsupported file type: ' . $mime]);
    exit;
}

// sanitize filename
$orig = pathinfo($file['name'], PATHINFO_FILENAME);
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$base = preg_replace('/[^a-zA-Z0-9-_\.]/', '-', $orig);
$slug = strtolower(substr($base, 0, 60));
$final = $slug . '-' . time() . '.' . $ext;

$destDir = realpath(UPLOAD_DIR);
if (!$destDir) {
    // try to create it
    if (!mkdir(UPLOAD_DIR, 0755, true)) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Upload directory missing and could not be created.']);
        exit;
    }
    $destDir = realpath(UPLOAD_DIR);
}

$targetPath = $destDir . DIRECTORY_SEPARATOR . $final;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed moving uploaded file.']);
    exit;
}

// Return the public URL relative to site root
$publicUrl = str_replace($_SERVER['DOCUMENT_ROOT'], '', $targetPath);
if ($publicUrl === $targetPath) {
    // Fallback - attempt safe path
    $publicUrl = '/assets/media/images/' . $final;
}

echo json_encode(['ok' => true, 'url' => $publicUrl]);
exit;
