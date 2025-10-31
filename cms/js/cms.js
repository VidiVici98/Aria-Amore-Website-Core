document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".cms-tab-content");
  const saveAllBtn = document.getElementById("save-all-btn");
  const toast = document.getElementById("toast");
  const sidebarFields = document.querySelector(".sidebar-fields");
  const sidebarTitle = document.querySelector(".sidebar-node-title");

  let activeTab = null;
  let selectedNode = null;

  // -----------------------
  // Tab switching
  // -----------------------
  function switchTab(tabKey) {
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    const btn = document.querySelector(`.tab-btn[data-tab="${tabKey}"]`);
    const content = document.getElementById(`tab-${tabKey}`);
    if (btn && content) {
      btn.classList.add("active");
      content.classList.add("active");
      activeTab = tabKey;
    }
  }
  tabs.forEach(tab => tab.addEventListener("click", () => switchTab(tab.dataset.tab)));
  if (tabs.length > 0) switchTab(tabs[0].dataset.tab);

  // -----------------------
  // Toast Notifications
  // -----------------------
  function showToast(msg, duration = 3000) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), duration);
  }

  // -----------------------
  // Drag & Drop
  // -----------------------
  function makeDraggable(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container => {
      let dragItem = null;
      container.addEventListener("dragstart", e => {
        if (!e.target.classList.contains("draggable-item")) return;
        dragItem = e.target;
        e.target.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });
      container.addEventListener("dragend", e => {
        if (dragItem) dragItem.classList.remove("dragging");
        dragItem = null;
        renderSidebar(); // update sidebar after reorder
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

  // -----------------------
  // Sidebar Node Selection
  // -----------------------
  function selectNode(node) {
    if (selectedNode) selectedNode.classList.remove("selected");
    selectedNode = node;
    if (!node) {
      sidebarTitle.textContent = "Select a node...";
      sidebarFields.innerHTML = "";
      return;
    }
    node.classList.add("selected");
    sidebarTitle.textContent = "Editing Node #" + node.dataset.index;
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
      label.textContent = input.dataset.field;
      const fieldInput = document.createElement("input");
      fieldInput.value = input.value;
      fieldInput.addEventListener("input", () => {
        input.value = fieldInput.value; // sync with main tree
      });
      wrapper.appendChild(label);
      wrapper.appendChild(fieldInput);
      sidebarFields.appendChild(wrapper);
    });
  }

  document.querySelectorAll(".draggable-item").forEach(node => {
    node.addEventListener("click", e => {
      e.stopPropagation();
      selectNode(node);
    });
  });

  // -----------------------
  // Toolbar Formatting
  // -----------------------
  function applyFormat(wrapperFunc) {
    if (!selectedNode) return;
    const inputs = selectedNode.querySelectorAll("input");
    inputs.forEach(input => input.value = wrapperFunc(input.value));
    renderSidebar(); // sync sidebar inputs
  }

  document.querySelector(".bold-btn").addEventListener("click", () => applyFormat(v => `**${v}**`));
  document.querySelector(".italic-btn").addEventListener("click", () => applyFormat(v => `*${v}*`));
  document.querySelector(".underline-btn").addEventListener("click", () => applyFormat(v => `__${v}__`));

  // -----------------------
  // Add / Remove Array Items
  // -----------------------
  function setupArrayButtons() {
    document.querySelectorAll(".add-array-item").forEach(btn => {
      btn.addEventListener("click", e => {
        const container = btn.parentElement;
        const arrayContainer = btn.parentElement.querySelector(".array-container") || container;
        const newItem = container.querySelector(".draggable-item").cloneNode(true);
        newItem.querySelectorAll("input").forEach(i => i.value = "");
        arrayContainer.insertBefore(newItem, btn);
        makeDraggable(".array-container");
        newItem.addEventListener("click", ev => {
          ev.stopPropagation();
          selectNode(newItem);
        });
      });
    });
  }

  setupArrayButtons();
  makeDraggable(".array-container");

  // -----------------------
  // Save All
  // -----------------------
  saveAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".editor-container").forEach(container => {
      const key = container.dataset.jsonKey;
      const data = [];
      container.querySelectorAll(".draggable-item").forEach(item => {
        const obj = {};
        item.querySelectorAll("input").forEach(input => {
          obj[input.dataset.field] = input.value;
        });
        data.push(obj);
      });

      fetch(`save.php?file=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => res.success ? showToast(`Saved ${key} ✓`) : showToast(`Error saving ${key}`))
      .catch(() => showToast(`Error saving ${key}`));
    });
  });
});
