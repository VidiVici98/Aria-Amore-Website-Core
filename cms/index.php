<?php
// cms/index.php
require_once __DIR__ . '/config.php';

// If already logged in, go to dashboard
if (!empty($_SESSION['cms_logged_in'])) {
    header('Location: dashboard.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pw = $_POST['password'] ?? '';
    if (password_verify($pw, $PASSWORD_HASH)) {
        session_regenerate_id(true);
        $_SESSION['cms_logged_in'] = true;
        $_SESSION['cms_csrf'] = bin2hex(random_bytes(16));
        $_SESSION['cms_last_activity'] = time();
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Incorrect password.';
    }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Aria Amore — CMS Login</title>
  <link rel="stylesheet" href="css/cms.css">
</head>
<body class="login-page">
  <main class="login-card">
    <div class="brand">
      <div class="brand-mark">AA</div>
      <div class="brand-text">Aria Amore — CMS</div>
    </div>

    <?php if ($error): ?>
      <div class="alert error"><?=htmlspecialchars($error)?></div>
    <?php endif; ?>

    <form method="POST" class="login-form" autocomplete="off" novalidate>
      <label class="field">
        <span class="field-label">Password</span>
        <input name="password" type="password" required autocomplete="current-password" />
      </label>

      <div class="actions">
        <button class="btn primary" type="submit">Sign in</button>
      </div>

      <p class="hint">Local test password: <strong>changeme</strong> (replace hash in config.php for production)</p>
    </form>
  </main>
</body>
</html>
