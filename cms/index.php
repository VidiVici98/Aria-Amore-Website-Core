<?php
require_once "config.php";

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';

    global $ADMIN_USER, $ADMIN_PASS;
    if ($user === $ADMIN_USER && $pass === $ADMIN_PASS) {
        $_SESSION['logged_in'] = true;
        header("Location: dashboard.php");
        exit;
    } else {
        $error = "Invalid username or password";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CMS Login</title>
<link rel="stylesheet" href="css/login.css">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body class="cms-login">
<div class="curtain-wrapper">
  <div class="curtain left">
    <div class="fold fold1"></div>
    <div class="fold fold2"></div>
    <div class="fold fold3"></div>
    <div class="fold fold4"></div>
    <div class="fold fold5"></div>
    <div class="fold fold6"></div>
    <div class="fold fold7"></div>
    <div class="fold fold8"></div>
    <div class="fold fold9"></div>
  </div>
  <div class="curtain right">
    <div class="fold fold1"></div>
    <div class="fold fold2"></div>
    <div class="fold fold3"></div>
    <div class="fold fold4"></div>
    <div class="fold fold5"></div>
    <div class="fold fold6"></div>
    <div class="fold fold7"></div>
    <div class="fold fold8"></div>
    <div class="fold fold9"></div>
  </div>
</div>
<div class="login-split">
  <div class="login-left">
    <div class="branding">
      <img src="/assets/media/images/floral-background.png" alt="Logo" class="logo">
      <h1>Aria Amore</h1>
      <p>Content Management At Your Fingertips</p>
      <div class="music-notes" aria-hidden="true">
        <span class="note layer1">♪</span>
        <span class="note layer2">♩</span>
        <span class="note layer2">♫</span>
        <span class="note layer1">♬</span>
        <span class="note layer1">♭</span>
        <span class="note layer2">♮</span>
        <span class="note layer2">𝄤</span>
        <span class="note layer1">♫</span>
        <span class="note layer2">𝄞</span>
        <span class="note layer1">♭</span>
      </div>
    </div>
  </div>

  <div class="login-right">
    <div class="login-container">
      <h2>Login Using Your Admin Credentials</h2>
      <form method="POST">
        <input type="text" name="username" placeholder="Username" required autofocus>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
        <?php if ($login_error): ?>
          <div class="error-msg"><?= htmlspecialchars($login_error) ?></div>
        <?php endif; ?>
      </form>
    </div>
  </div>
</div>
  <script src="/assets/js/main.js" defer></script>
</body>
</html>
