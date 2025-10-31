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
<html>
<head>
<meta charset="utf-8">
<title>CMS Login</title>
<link rel="stylesheet" href="css/cms.css">
</head>
<body class="cms-login">
<div class="login-container">
<h2>Login</h2>
<?php if (isset($error)) echo "<p class='error-msg'>$error</p>"; ?>
<form method="post">
<input type="text" name="username" placeholder="Username" required>
<input type="password" name="password" placeholder="Password" required>
<button type="submit">Login</button>
</form>
</div>
</body>
</html>
