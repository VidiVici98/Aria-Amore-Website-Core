// ================================
// Media Library JS (Visual Enhanced)
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("media-upload");
  const mediaList = document.getElementById("media-list");
  const toast = document.getElementById("toast");

  // ===== Existing toast =====
  function showToast(msg, duration = 3000) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), duration);
  }

  // ===== Existing refreshMedia (slightly enhanced) =====
  function refreshMedia() {
    fetch("media.php")
      .then(res => res.json())
      .then(files => {
        mediaList.innerHTML = "";
        files.forEach((url, i) => {
          const img = document.createElement("img");
          img.src = url;
          img.alt = url.split("/").pop();
          img.classList.add("media-thumb");
          img.dataset.index = i;

          // NEW: click opens modal
          img.addEventListener("click", () => openModal(i, files));

          mediaList.appendChild(img);
        });
      });
  }

  // ===== Existing upload handling =====
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

  // ====== New: Modal system (visual only) ======
  const modal = document.getElementById("media-modal");
  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name");
  const modalPath = document.getElementById("modal-path");
  const modalAlt = document.getElementById("modal-alt");
  const modalTags = document.getElementById("modal-tags");

  const closeBtn = document.getElementById("modal-close");
  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");
  const saveBtn = document.getElementById("modal-save");
  const deleteBtn = document.getElementById("modal-delete");
  const downloadBtn = document.getElementById("modal-download");
  const replaceBtn = document.getElementById("modal-replace");

  let currentFiles = [];
  let currentIndex = 0;

  function openModal(index, files) {
    currentFiles = files;
    currentIndex = index;
    const url = files[index];
    modalImg.src = url;
    modalName.value = url.split("/").pop();
    modalPath.value = url;
    modalAlt.value = "";
    modalTags.value = "";
    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  function showPrev() {
    if (currentIndex > 0) openModal(currentIndex - 1, currentFiles);
  }

  function showNext() {
    if (currentIndex < currentFiles.length - 1) openModal(currentIndex + 1, currentFiles);
  }

  // ====== Modal event listeners ======
  closeBtn?.addEventListener("click", closeModal);
  prevBtn?.addEventListener("click", showPrev);
  nextBtn?.addEventListener("click", showNext);
  modal?.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  // ====== Visual-only button effects ======
  saveBtn?.addEventListener("click", () => showToast("Saved changes (visual only)"));
  deleteBtn?.addEventListener("click", () => showToast("Deleted (visual only)"));
  downloadBtn?.addEventListener("click", () => showToast("Download started (visual only)"));
  replaceBtn?.addEventListener("click", () => showToast("Replace image (visual only)"));

  // ===== Initial load =====
  refreshMedia();
});
