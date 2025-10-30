<?php
// --------------------
// cms/config.php
// --------------------
// Basic configuration for the CMS
// --------------------

// Start session for login/logout
session_start();

// Path to your JSON data folder (relative to the site root)
define('DATA_DIR', realpath(__DIR__ . '/../data/') . '/');

// Where uploaded images should go (relative to the site root)
define('UPLOAD_DIR', realpath(__DIR__ . '/../assets/media/images/') . '/');

// Allowed JSON files the CMS may edit (filenames only)
$ALLOWED_JSON_FILES = [
    'homepage.json',
    'services.json',
    'artists.json',
    'about.json'
];

// Single-user password hash (change immediately for production)
// Default password: "changeme"
// To generate a new hash: echo password_hash('YourNewPassword', PASSWORD_DEFAULT);
$PASSWORD_HASH = '$2y$10$HU2WMtCebVLn71FzUZQpceE8XAivkM8VV2B5da9k1swI6Ft7qUmWW'; // changeme

// Minimum upload settings
define('MAX_UPLOAD_BYTES', 4 * 1024 * 1024); // 4MB
$ALLOWED_IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

// Session lifetime (seconds)
define('SESSION_LIFETIME', 60*60*4); // 4 hours
ini_set('session.gc_maxlifetime', SESSION_LIFETIME);
session_set_cookie_params(SESSION_LIFETIME);
