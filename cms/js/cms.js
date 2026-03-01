document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".cms-tab-content");
  const saveAllBtn = document.getElementById("save-all-btn");
  const toast = document.getElementById("toast");
  const sidebarFields = document.querySelector(".sidebar-fields");
  const sidebarTitle = document.querySelector(".sidebar-node-title");

  let activeTab = null;
  let selectedNode = null;

  // ======================
  // TAB SWITCHING
  // ======================
  function switchTab(tabKey) {
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    const btn = document.querySelector(`.tab-btn[data-tab="${tabKey}"]`);
    const content = document.getElementById(`tab-${tabKey}`);
    if (btn && content) {
      btn.classList.add("active");
      content.classList.add("active");
      activeTab = tabKey;
      attachPreviewListeners(content);
    }
  }
  tabs.forEach(tab => tab.addEventListener("click", () => switchTab(tab.dataset.tab)));
  if (tabs.length > 0) switchTab(tabs[0].dataset.tab);

  // ======================
  // TOAST
  // ======================
  function showToast(msg, duration = 3000) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), duration);
  }

  // ======================
  // DETECT FIELD TYPE
  // ======================
  function isImageField(nameOrValue) {
    if (!nameOrValue) return false;
    const str = nameOrValue.toLowerCase();
    return (
      str.includes("image") ||
      str.includes("img") ||
      str.includes("photo") ||
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(str)
    );
  }

  function isIconField(nameOrValue) {
    if (!nameOrValue) return false;
    const str = nameOrValue.toLowerCase();
    return (
      str.includes("icon") ||
      str.includes("fa-") ||
      str.includes("material-icons")
    );
  }

  // ======================
  // BUILD INLINE & SIDEBAR PREVIEW
  // ======================
  function buildPreview(input) {
    if (!input) return;
    const wrapper = input.closest(".field-wrapper");
    if (!wrapper) return;

    // Remove old previews
    wrapper.querySelectorAll(".inline-preview, .sidebar-image-preview").forEach(p => p.remove());

    const fieldName = input.dataset.field || "";
    const value = input.value.trim();

    // Inline preview
    if (isImageField(fieldName) || isImageField(value)) {
      const img = document.createElement("img");
      img.className = "inline-preview";
      img.src = value;
      img.alt = "image preview";
      img.onerror = () => (img.style.display = "none");
      img.addEventListener("click", () => openImageModal(input));
      wrapper.appendChild(img);
    } else if (isIconField(fieldName) || isIconField(value)) {
      const i = document.createElement("i");
      i.className = `inline-preview ${value}`;
      wrapper.appendChild(i);
    }

    // Sidebar preview
    if (selectedNode && wrapper.closest(".sidebar-fields")) {
      if (isImageField(fieldName) || isImageField(value)) {
        const sidebarPreview = document.createElement("img");
        sidebarPreview.className = "sidebar-image-preview";
        sidebarPreview.src = value;
        sidebarPreview.alt = "preview";
        sidebarPreview.onerror = () => (sidebarPreview.style.display = "none");
        sidebarPreview.addEventListener("click", () => openImageModal(input));
        wrapper.appendChild(sidebarPreview);
      }
    }
  }

  // ======================
  // APPLY PREVIEW LISTENERS
  // ======================
  function attachPreviewListeners(container = document) {
    container.querySelectorAll("input").forEach(input => {
      buildPreview(input);
      input.addEventListener("input", () => buildPreview(input));
    });
  }

  // ======================
  // DRAG & DROP
  // ======================
  function makeDraggable(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container => {
      let dragItem = null;
      container.addEventListener("dragstart", e => {
        if (!e.target.classList.contains("draggable-item")) return;
        dragItem = e.target;
        e.dataTransfer.effectAllowed = "move";
        e.target.classList.add("dragging");
      });
      container.addEventListener("dragend", () => {
        if (dragItem) dragItem.classList.remove("dragging");
        dragItem = null;
      });
      container.addEventListener("dragover", e => {
        e.preventDefault();
        const target = e.target.closest(".draggable-item");
        if (!target || target === dragItem) return;
        const rect = target.getBoundingClientRect();
        const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
        container.insertBefore(dragItem, next ? target.nextSibling : target);
      });
    });
  }

  // ======================
  // SIDEBAR SELECTION
  // ======================
  function selectNode(node) {
    if (selectedNode) selectedNode.classList.remove("selected");
    selectedNode = node;
    if (!node) {
      sidebarTitle.textContent = "Select A Node To Get Started.";
      sidebarFields.innerHTML = "";
      return;
    }
    node.classList.add("selected");
    sidebarTitle.textContent = "Editing:" + node.dataset.index;
    renderSidebar();
  }

  function renderSidebar() {
    if (!selectedNode) return;
    sidebarFields.innerHTML = "";
    const inputs = selectedNode.querySelectorAll("input");
    inputs.forEach(input => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("field-wrapper");

      const label = document.createElement("label");
      label.textContent = input.dataset.field || "Field";

      const fieldInput = document.createElement("input");
      fieldInput.value = input.value;
      fieldInput.dataset.field = input.dataset.field;
      fieldInput.addEventListener("input", () => {
        input.value = fieldInput.value;
        buildPreview(input);
      });

      wrapper.appendChild(label);
      wrapper.appendChild(fieldInput);
      sidebarFields.appendChild(wrapper);
      buildPreview(fieldInput);
    });
  }

  // ======================
  // ADD / DUPLICATE / REMOVE ITEMS
  // ======================
  function setupArrayButtons() {
    document.querySelectorAll(".add-array-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const container = btn.previousElementSibling;
        const template = container.querySelector(".draggable-item");
        if (!template) return;
        const newItem = template.cloneNode(true);
        newItem.querySelectorAll("input").forEach(i => (i.value = ""));
        container.insertBefore(newItem, btn);
        attachPreviewListeners(newItem);
        makeDraggable(".array-container");
        attachItemEvents(newItem);
      });
    });
  }

  function attachItemEvents(item) {
    item.querySelectorAll(".draggable-item, input").forEach(el => {
      el.addEventListener("click", e => {
        e.stopPropagation();
        selectNode(item);
      });
    });
    item.querySelector(".duplicate-btn")?.addEventListener("click", e => {
      e.stopPropagation();
      const clone = item.cloneNode(true);
      item.parentNode.insertBefore(clone, item.nextSibling);
      attachPreviewListeners(clone);
      attachItemEvents(clone);
    });
    item.querySelector(".delete-btn")?.addEventListener("click", e => {
      e.stopPropagation();
      item.remove();
      if (selectedNode === item) selectNode(null);
    });
  }
const uploadWrapper = document.querySelector(".media-upload-wrapper");

uploadWrapper.addEventListener("dragover", e => {
  e.preventDefault();
  uploadWrapper.classList.add("dragover");
});

uploadWrapper.addEventListener("dragleave", () => {
  uploadWrapper.classList.remove("dragover");
});

uploadWrapper.addEventListener("drop", e => {
  e.preventDefault();
  uploadWrapper.classList.remove("dragover");

  const file = e.dataTransfer.files[0];
  if (!file) return;
  uploadInput.files = e.dataTransfer.files;

  const event = new Event("change");
  uploadInput.dispatchEvent(event);
});
document.addEventListener("DOMContentLoaded", () => {
  const folders = document.querySelectorAll(".folder-name");
  const files = document.querySelectorAll(".file");
  const currentPathInput = document.getElementById("current-path");

  // Expand/collapse folders
  folders.forEach(folder => {
    folder.addEventListener("click", e => {
      const parent = folder.parentElement;
      parent.classList.toggle("expanded");
      e.stopPropagation();
    });
  });

  // Drag start / end
  files.forEach(file => {
    file.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", file.dataset.path);
      e.target.classList.add("dragging");
    });

    file.addEventListener("dragend", e => {
      e.target.classList.remove("dragging");
    });
  });

  // Drag over / drop into folders
  document.querySelectorAll(".folder-name").forEach(folder => {
    folder.addEventListener("dragover", e => {
      e.preventDefault();
      folder.classList.add("drop-target");
    });

    folder.addEventListener("dragleave", e => {
      folder.classList.remove("drop-target");
    });

    folder.addEventListener("drop", e => {
      e.preventDefault();
      folder.classList.remove("drop-target");
      const newFolder = folder.textContent.trim();
      const file = document.querySelector(".dragging");
      if (file) {
        const oldPath = file.dataset.path;
        const parts = oldPath.split("/");
        parts[parts.length - 2] = newFolder; // quick simulated move
        const newPath = parts.join("/");
        file.dataset.path = newPath;
        currentPathInput.value = newPath;
      }
    });
  });
});

  // ======================
  // TOOLBAR FORMATTING
  // ======================
  function applyFormat(wrapperFunc) {
    if (!selectedNode) return;
    selectedNode.querySelectorAll("input").forEach(input => {
      input.value = wrapperFunc(input.value);
      buildPreview(input);
    });
    renderSidebar();
  }

  document.querySelector(".bold-btn")?.addEventListener("click", () => applyFormat(v => `**${v}**`));
  document.querySelector(".italic-btn")?.addEventListener("click", () => applyFormat(v => `*${v}*`));
  document.querySelector(".underline-btn")?.addEventListener("click", () => applyFormat(v => `__${v}__`));

  // ======================
  // SAVE
  // ======================
  saveAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".editor-container").forEach(container => {
      const key = container.dataset.jsonKey;
      const data = Array.from(container.querySelectorAll(".draggable-item")).map(item => {
        const obj = {};
        item.querySelectorAll("input").forEach(input => (obj[input.dataset.field] = input.value));
        return obj;
      });

      fetch(`save.php?file=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => showToast(res.success ? `Saved ${key} ✓` : `Error saving ${key}`))
        .catch(() => showToast(`Error saving ${key}`));
    });
  });

  // ======================
  // MODAL FOR IMAGE EDIT
  // ======================
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "cms-modal-overlay";
  modalOverlay.innerHTML = `
    <div class="cms-modal">
      <h3>Edit Image</h3>
      <img class="cms-modal-preview" src="" alt="preview">
      <input type="text" class="cms-modal-input" placeholder="Image URL or path">
      <div class="cms-modal-actions">
        <button class="cms-modal-save">Save</button>
        <button class="cms-modal-cancel">Cancel</button>
      </div>
    </div>`;
  document.body.appendChild(modalOverlay);

  const modalImg = modalOverlay.querySelector(".cms-modal-preview");
  const modalInput = modalOverlay.querySelector(".cms-modal-input");
  const modalSave = modalOverlay.querySelector(".cms-modal-save");
  const modalCancel = modalOverlay.querySelector(".cms-modal-cancel");

  let currentImgInput = null;

  function openImageModal(input) {
    currentImgInput = input;
    modalInput.value = input.value;
    modalImg.src = input.value;
    modalOverlay.classList.add("show");
  }

  function closeImageModal() {
    modalOverlay.classList.remove("show");
    currentImgInput = null;
  }

  modalInput.addEventListener("input", () => {
    modalImg.src = modalInput.value;
  });
  modalSave.addEventListener("click", () => {
    if (currentImgInput) {
      currentImgInput.value = modalInput.value;
      currentImgInput.dispatchEvent(new Event("input"));
    }
    closeImageModal();
  });
  modalCancel.addEventListener("click", closeImageModal);

  // ======================
  // INITIALIZE
  // ======================
  makeDraggable(".array-container");
  setupArrayButtons();
  attachPreviewListeners(document);
});
