<?php
/**
 * Autoloader for Aria Amore Website
 * This file loads the PHPMailer library that's bundled with the project
 */

// Load PHPMailer classes
require_once __DIR__ . '/../PHPMailer/src/Exception.php';
require_once __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/src/SMTP.php';

// Optional: Load OAuth if needed
if (file_exists(__DIR__ . '/../PHPMailer/src/OAuth.php')) {
    require_once __DIR__ . '/../PHPMailer/src/OAuth.php';
}

// Optional: Load POP3 if needed
if (file_exists(__DIR__ . '/../PHPMailer/src/POP3.php')) {
    require_once __DIR__ . '/../PHPMailer/src/POP3.php';
}

// Optional: Load OAuthTokenProvider if needed
if (file_exists(__DIR__ . '/../PHPMailer/src/OAuthTokenProvider.php')) {
    require_once __DIR__ . '/../PHPMailer/src/OAuthTokenProvider.php';
}

// Optional: Load DSNConfigurator if needed
if (file_exists(__DIR__ . '/../PHPMailer/src/DSNConfigurator.php')) {
    require_once __DIR__ . '/../PHPMailer/src/DSNConfigurator.php';
}
