<?php
require_once "config.php";

$login_error = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';

    if ($user === $ADMIN_USER && password_verify($pass, $ADMIN_PASS_HASH)) {
        $_SESSION['logged_in'] = true;
        header("Location: dashboard.php");
        exit;
    } else {
        $login_error = "Invalid username or password";
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CMS Login</title>
<link rel="stylesheet" href="css/cms.css">
</head>
<body class="cms-login">
<div class="login-container">
    <h1>Login</h1>
    <form method="POST">
        <input type="text" name="username" placeholder="Username" required autofocus>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
        <?php if ($login_error): ?>
        <div class="error-msg"><?= htmlspecialchars($login_error) ?></div>
        <?php endif; ?>
    </form>
</div>
</body>
</html>
