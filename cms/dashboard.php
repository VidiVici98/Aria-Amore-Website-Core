<?php
require_once "config.php";
if (!is_logged_in()) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>CMS Dashboard</title>
<link rel="stylesheet" href="css/cms.css">
</head>
<body class="cms-dashboard">
<div class="cms-header">
    <h1>Content Management Dashboard</h1>
    <div class="cms-header-buttons">
        <a href="logout.php" class="logout-btn">Logout</a>
        <button id="save-all-btn">Save All</button>
    </div>
</div>

<div class="cms-tab-bar">
    <?php foreach ($JSON_FILES as $key => $file): ?>
        <button class="tab-btn" data-tab="<?= $key ?>"><?= ucfirst($key) ?></button>
    <?php endforeach; ?>
    <button class="tab-btn" data-tab="media">Media</button>
</div>

<div class="cms-main-wrapper">
  <!-- Sidebar -->
  <div class="cms-sidebar">
    <div class="sidebar-header">
      <span class="sidebar-heading">Editor</span><span> | </span>
      <span class="sidebar-node-title">Select A Node To Get Started.</span>
    </div>

    <!-- Toolbar -->
    <div class="sidebar-toolbar">
      <button class="bold-btn"><b>B</b></button>
      <button class="italic-btn"><i>I</i></button>
      <button class="underline-btn"><u>U</u></button>
      <button class="uppercase-btn">AA</button>
      <button class="lowercase-btn">aa</button>
      <button class="capitalize-btn">Cap</button>
      <button class="clear-btn">Clear</button>
      <button class="left-align-btn"><svg viewBox="0 0 16 16" width="24px" height="14px" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 1H5V3H15V1Z" fill="#000000"></path> <path d="M1 5H15V7H1V5Z" fill="#000000"></path> <path d="M15 9H5V11H15V9Z" fill="#000000"></path> <path d="M15 13H1V15H15V13Z" fill="#000000"></path> </g></svg></button>
      <button class="center-btn"><svg viewBox="0 0 16 16"  width="24px" height="14px"fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 1H3V3H13V1Z" fill="#000000"></path> <path d="M1 5H15V7H1V5Z" fill="#000000"></path> <path d="M13 9H3V11H13V9Z" fill="#000000"></path> <path d="M15 13H1V15H15V13Z" fill="#000000"></path> </g></svg></button>
      <button class="right-align-btn"><svg viewBox="0 0 16 16" width=24px" height="14px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 1H5V3H15V1Z" fill="#000000"></path> <path d="M1 5H15V7H1V5Z" fill="#000000"></path> <path d="M15 9H5V11H15V9Z" fill="#000000"></path> <path d="M15 13H1V15H15V13Z" fill="#000000"></path> </g></svg></button>
      <button class="justify-btn"><svg viewBox="0 0 16 16" width="24px" height="14px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 1H1V3H15V1Z" fill="#000000"></path> <path d="M1 5H15V7H1V5Z" fill="#000000"></path> <path d="M15 9H1V11H15V9Z" fill="#000000"></path> <path d="M11 13H1V15H11V13Z" fill="#000000"></path> </g></svg></button>
      <button class="undo-btn"><svg viewBox="0 0 24 24" width="24px" height="14px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53033 3.46967C7.82322 3.76256 7.82322 4.23744 7.53033 4.53033L5.81066 6.25H15C18.1756 6.25 20.75 8.82436 20.75 12C20.75 15.1756 18.1756 17.75 15 17.75H8.00001C7.58579 17.75 7.25001 17.4142 7.25001 17C7.25001 16.5858 7.58579 16.25 8.00001 16.25H15C17.3472 16.25 19.25 14.3472 19.25 12C19.25 9.65279 17.3472 7.75 15 7.75H5.81066L7.53033 9.46967C7.82322 9.76256 7.82322 10.2374 7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L3.46967 7.53033C3.17678 7.23744 3.17678 6.76256 3.46967 6.46967L6.46967 3.46967C6.76256 3.17678 7.23744 3.17678 7.53033 3.46967Z" fill="#000000"></path> </g></svg></button>
      <button class="redo-btn"><svg viewBox="0 0 24 24" width="24px" height="14px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.2" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53033 3.46967C7.82322 3.76256 7.82322 4.23744 7.53033 4.53033L5.81066 6.25H15C18.1756 6.25 20.75 8.82436 20.75 12C20.75 15.1756 18.1756 17.75 15 17.75H8.00001C7.58579 17.75 7.25001 17.4142 7.25001 17C7.25001 16.5858 7.58579 16.25 8.00001 16.25H15C17.3472 16.25 19.25 14.3472 19.25 12C19.25 9.65279 17.3472 7.75 15 7.75H5.81066L7.53033 9.46967C7.82322 9.76256 7.82322 10.2374 7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L3.46967 7.53033C3.17678 7.23744 3.17678 6.76256 3.46967 6.46967L6.46967 3.46967C6.76256 3.17678 7.23744 3.17678 7.53033 3.46967Z" fill="#000000"></path> </g></svg></button>


    </div>

    <div class="sidebar-fields">
      <!-- Populated dynamically -->
    </div>
  </div>

  <!-- Main content -->
  <div class="cms-main">
    <?php foreach ($JSON_FILES as $key => $file): 
        $data = load_json($key);
    ?>
    <div class="cms-tab-content" id="tab-<?= $key ?>">
        <div class="editor-container" data-json-key="<?= $key ?>">
            <div class="array-container">
                <?php if (is_array($data)) foreach ($data as $i => $item): ?>
                <div class="draggable-item" draggable="true" data-index="<?= $i ?>">
                    <div style="display:flex; align-items:center;">
                        <span class="drag-handle">
                            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#666">
                                <path d="M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-8a2 2 0 10-.001-4.001A2 2 0 0013 6zm0 2a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z" fill="#5C5F62"></path>
                            </svg>
                        </span>
                        <div class="field-input-container">
                            <?php foreach ($item as $field => $value): ?>
                            <div class="field-wrapper">
                                <label><?= ucfirst($field) ?></label>
                                <input type="text" value="<?= htmlspecialchars(is_array($value) ? json_encode($value) : $value) ?>" data-field="<?= $field ?>">
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div class="item-buttons">
                        <button class="duplicate-btn"><svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#666"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>duplicate</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-204.000000, -931.000000)" fill="#666"> <path d="M234,951 C234,952.104 233.104,953 232,953 L216,953 C214.896,953 214,952.104 214,951 L214,935 C214,933.896 214.896,933 216,933 L232,933 C233.104,933 234,933.896 234,935 L234,951 L234,951 Z M232,931 L216,931 C213.791,931 212,932.791 212,935 L212,951 C212,953.209 213.791,955 216,955 L232,955 C234.209,955 236,953.209 236,951 L236,935 C236,932.791 234.209,931 232,931 L232,931 Z M226,959 C226,960.104 225.104,961 224,961 L208,961 C206.896,961 206,960.104 206,959 L206,943 C206,941.896 206.896,941 208,941 L210,941 L210,939 L208,939 C205.791,939 204,940.791 204,943 L204,959 C204,961.209 205.791,963 208,963 L224,963 C226.209,963 228,961.209 228,959 L228,957 L226,957 L226,959 L226,959 Z" id="duplicate" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg></button>
                        <button class="delete-btn"><svg viewBox="0 -5 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#666"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-518.000000, -1146.000000)" fill="#666"> <path d="M540.647,1159.24 C541.039,1159.63 541.039,1160.27 540.647,1160.66 C540.257,1161.05 539.623,1161.05 539.232,1160.66 L536.993,1158.42 L534.725,1160.69 C534.331,1161.08 533.692,1161.08 533.298,1160.69 C532.904,1160.29 532.904,1159.65 533.298,1159.26 L535.566,1156.99 L533.327,1154.76 C532.936,1154.37 532.936,1153.73 533.327,1153.34 C533.718,1152.95 534.352,1152.95 534.742,1153.34 L536.981,1155.58 L539.281,1153.28 C539.676,1152.89 540.314,1152.89 540.708,1153.28 C541.103,1153.68 541.103,1154.31 540.708,1154.71 L538.408,1157.01 L540.647,1159.24 L540.647,1159.24 Z M545.996,1146 L528.051,1146 C527.771,1145.98 527.485,1146.07 527.271,1146.28 L518.285,1156.22 C518.074,1156.43 517.983,1156.71 517.998,1156.98 C517.983,1157.26 518.074,1157.54 518.285,1157.75 L527.271,1167.69 C527.467,1167.88 527.723,1167.98 527.979,1167.98 L527.979,1168 L545.996,1168 C548.207,1168 550,1166.21 550,1164 L550,1150 C550,1147.79 548.207,1146 545.996,1146 L545.996,1146 Z" id="delete" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg></button>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <button class="add-array-item">Add Item</button>
        </div>
    </div>
    <?php endforeach; ?>

    <div class="cms-tab-content" id="tab-media">
        <input type="file" id="media-upload" multiple>
        <div id="media-list"></div>
    </div>
  </div>
</div>

<div id="toast" class="toast"></div>

<script src="js/dragdrop.js"></script>
<script src="js/media.js"></script>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".cms-tab-content");
  const saveAllBtn = document.getElementById("save-all-btn");
  const toast = document.getElementById("toast");
  const sidebarFields = document.querySelector(".sidebar-fields");
  const sidebarTitle = document.querySelector(".sidebar-node-title");
  let selectedNode = null;

  function showToast(msg, duration=3000){
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"), duration);
  }

  function isImageField(str){
    if(!str) return false;
    str = str.toLowerCase();
    return str.includes("image") || str.includes("img") || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(str);
  }

  function buildPreview(input, inSidebar=false){
    const wrapper = input.closest(".field-wrapper");
    if(!wrapper) return;
    wrapper.querySelectorAll(".inline-preview, .sidebar-image-preview").forEach(p=>p.remove());
    const field = input.dataset.field || "";
    const val = input.value.trim();
    if(isImageField(field) || isImageField(val)){
      const img = document.createElement("img");
      img.src = val;
      img.alt = "preview";
      if(inSidebar){
        img.className = "sidebar-image-preview";
      } else {
        img.className = "inline-preview";
      }
      img.onerror = ()=>img.style.display="none";
      img.addEventListener("click", ()=>openImageModal(input));
      wrapper.appendChild(img);
    }
  }

  function attachPreviewListeners(container=document){
    container.querySelectorAll("input").forEach(input=>{
      buildPreview(input);
      input.addEventListener("input", ()=>buildPreview(input));
    });
  }

  function selectNode(node){
    if(selectedNode) selectedNode.classList.remove("selected");
    selectedNode = node;
    if(!node){
      sidebarTitle.textContent = "Select A Node To Get Started.";
      sidebarFields.innerHTML = "";
      return;
    }
    node.classList.add("selected");
    sidebarTitle.textContent = "Editing Node #" + node.dataset.index;
    renderSidebar();
  }

  function renderSidebar(){
    if(!selectedNode) return;
    sidebarFields.innerHTML = "";
    const inputs = selectedNode.querySelectorAll("input");
    inputs.forEach(input=>{
      const wrapper = document.createElement("div");
      wrapper.classList.add("field-wrapper");
      const label = document.createElement("label");
      label.textContent = input.dataset.field || "Field";
      const fieldInput = document.createElement("input");
      fieldInput.value = input.value;
      fieldInput.dataset.field = input.dataset.field;
      fieldInput.addEventListener("input", ()=>{
        input.value = fieldInput.value;
        buildPreview(input);
        buildPreview(fieldInput, true);
      });
      wrapper.appendChild(label);
      wrapper.appendChild(fieldInput);
      sidebarFields.appendChild(wrapper);
      buildPreview(fieldInput, true);
    });
  }

  document.querySelectorAll(".draggable-item").forEach(node=>{
    node.addEventListener("click", e=>{
      e.stopPropagation();
      selectNode(node);
    });
  });

  document.querySelectorAll(".add-array-item").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const container = btn.previousElementSibling;
      const template = container.querySelector(".draggable-item");
      if(!template) return;
      const clone = template.cloneNode(true);
      clone.querySelectorAll("input").forEach(i=>i.value="");
      container.insertBefore(clone, btn);
      attachPreviewListeners(clone);
      clone.addEventListener("click", e=>{
        e.stopPropagation();
        selectNode(clone);
      });
    });
  });

  const formatButtons = {
    "bold-btn": v => `**${v}**`,
    "italic-btn": v => `*${v}*`,
    "underline-btn": v => `__${v}__`,
    "uppercase-btn": v => v.toUpperCase(),
    "lowercase-btn": v => v.toLowerCase(),
    "capitalize-btn": v => v.replace(/\b\w/g, c => c.toUpperCase()),
    "clear-btn": () => ""
  };
  Object.entries(formatButtons).forEach(([cls, fn])=>{
    document.querySelector(`.${cls}`)?.addEventListener("click", ()=>{
      if(!selectedNode) return;
      selectedNode.querySelectorAll("input").forEach((input, i)=>{
        input.value = fn(input.value);
        const sidebarInput = sidebarFields.querySelectorAll("input")[i];
        sidebarInput.value = input.value;
        buildPreview(input);
        buildPreview(sidebarInput, true);
      });
    });
  });

  function switchTab(tabKey){
    tabs.forEach(t=>t.classList.remove("active"));
    tabContents.forEach(c=>c.classList.remove("active"));
    const btn = document.querySelector(`.tab-btn[data-tab="${tabKey}"]`);
    const content = document.getElementById(`tab-${tabKey}`);
    if(btn && content){
      btn.classList.add("active");
      content.classList.add("active");
      attachPreviewListeners(content);
    }
  }
  tabs.forEach(tab=>tab.addEventListener("click", ()=>switchTab(tab.dataset.tab)));
  if(tabs.length) switchTab(tabs[0].dataset.tab);

  saveAllBtn.addEventListener("click", ()=>{
    document.querySelectorAll(".editor-container").forEach(container=>{
      const key = container.dataset.jsonKey;
      const data = [];
      container.querySelectorAll(".draggable-item").forEach(item=>{
        const obj = {};
        item.querySelectorAll("input").forEach(input=>{
          obj[input.dataset.field] = input.value;
        });
        data.push(obj);
      });
      fetch(`save.php?file=${key}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      .then(r=>r.json())
      .then(r=>showToast(r.success ? `Saved ${key} ✓` : `Error saving ${key}`))
      .catch(()=>showToast(`Error saving ${key}`));
    });
  });

  // ===== Modal for image editing =====
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
    </div>
  `;
  document.body.appendChild(modalOverlay);
  const modalImg = modalOverlay.querySelector(".cms-modal-preview");
  const modalInput = modalOverlay.querySelector(".cms-modal-input");
  const modalSave = modalOverlay.querySelector(".cms-modal-save");
  const modalCancel = modalOverlay.querySelector(".cms-modal-cancel");
  let currentImgInput = null;

  function openImageModal(input){
    currentImgInput = input;
    modalInput.value = input.value;
    modalImg.src = input.value;
    modalOverlay.classList.add("show");
  }
  function closeImageModal(){
    modalOverlay.classList.remove("show");
    currentImgInput = null;
  }
  modalInput.addEventListener("input", ()=>modalImg.src = modalInput.value);
  modalSave.addEventListener("click", ()=>{
    if(currentImgInput){
      currentImgInput.value = modalInput.value;
      currentImgInput.dispatchEvent(new Event("input"));
    }
    closeImageModal();
  });
  modalCancel.addEventListener("click", closeImageModal);

  attachPreviewListeners(document);
});
</script>
</body>
</html>
