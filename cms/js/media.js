// ================================
// Media Library JS
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("media-upload");
  const mediaList = document.getElementById("media-list");
  const toast = document.getElementById("toast");

  function showToast(msg, duration = 3000) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), duration);
  }

  function refreshMedia() {
    fetch("media.php")
      .then(res => res.json())
      .then(files => {
        mediaList.innerHTML = "";
        files.forEach(url => {
          const img = document.createElement("img");
          img.src = url;
          mediaList.appendChild(img);
        });
      });
  }

  uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    fetch("upload.php", { method: "POST", body: formData })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          showToast("Upload successful ✓");
          refreshMedia();
        } else {
          showToast(res.error || "Upload failed");
        }
      })
      .catch(() => showToast("Upload failed"));
  });

  // Initial load
  refreshMedia();
});
