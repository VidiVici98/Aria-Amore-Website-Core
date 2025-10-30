<?php
// cms/dashboard.php
require_once __DIR__ . '/config.php';

// Auth
if (empty($_SESSION['cms_logged_in'])) {
    header('Location: index.php');
    exit;
}

// Session timeout enforcement
if (!empty($_SESSION['cms_last_activity']) && (time() - $_SESSION['cms_last_activity']) > SESSION_LIFETIME) {
    header('Location: logout.php');
    exit;
}
$_SESSION['cms_last_activity'] = time();

// Load allowed JSON files into payload
$payload = [];
foreach ($ALLOWED_JSON_FILES as $fn) {
    $path = realpath(DATA_DIR . $fn);
    if ($path && file_exists($path)) {
        $json = file_get_contents($path);
        $payload[$fn] = json_decode($json, true);
    } else {
        $payload[$fn] = null;
    }
}

$csrf = $_SESSION['cms_csrf'] ?? '';
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Aria Amore — CMS</title>
  <link rel="stylesheet" href="css/cms.css">
</head>
<body class="cms-root">
  <aside class="sidebar" aria-label="Navigation">
    <div class="side-brand">
      <div class="side-mark">AA</div>
      <div class="side-name">Aria Amore</div>
    </div>

    <nav class="side-nav" role="navigation">
      <button class="side-item" data-file="homepage.json" aria-pressed="true">Home</button>
      <button class="side-item" data-file="services.json">Services</button>
      <button class="side-item" data-file="artists.json">Artists</button>
      <button class="side-item" data-file="about.json">About</button>
      <div class="side-sep"></div>
      <a class="side-item side-link" href="/index.html" target="_blank">View site</a>
      <a class="side-item side-logout" href="logout.php">Logout</a>
    </nav>
    <div class="sidebar-footer">v1 · Local</div>
  </aside>

  <header class="topbar">
    <div class="top-left">
      <h1 class="top-title">CMS Dashboard</h1>
      <div id="saveStatus" class="save-status">All changes saved ✓</div>
    </div>
    <div class="top-actions">
      <button id="btnSaveNow" class="btn small">Save</button>
    </div>
  </header>

  <main class="main-area">
    <div id="editorRoot" class="editor-root">
      <!-- Editor will be injected here -->
    </div>
  </main>

  <div id="toast" class="toast" role="status" aria-live="polite"></div>

  <script>
    window.CMS = {
      files: <?= json_encode(array_values($ALLOWED_JSON_FILES), JSON_UNESCAPED_SLASHES) ?>,
      data: <?= json_encode($payload, JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT) ?>,
      csrf: <?= json_encode($csrf) ?>,
      saveUrl: 'save.php',
      uploadUrl: 'upload.php'
    };
  </script>
  <script src="js/cms.js"></script>
</body>
</html>
