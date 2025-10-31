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
    <h1>Aria Amore CMS</h1>
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
      <span class="sidebar-heading">Editor</span><span> | </span><span class="sidebar-node-title">Select A Node To Get Started.</span>
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
    </div>
    <div class="sidebar-fields">
      <!-- Inputs populated dynamically -->
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
                        <span class="drag-handle"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-8a2 2 0 10-.001-4.001A2 2 0 0013 6zm0 2a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z" fill="#5C5F62"></path></g></svg></span>
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
                        <button class="duplicate-btn"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#000000" stroke-linejoin="round" stroke-width="2" d="M6 16H5a1 1 0 01-1-1V5a1 1 0 011-1h10a1 1 0 011 1v1M9 20h10a1 1 0 001-1V9a1 1 0 00-1-1H9a1 1 0 00-1 1v10a1 1 0 001 1z"></path> </g></svg></button>
                        <button class="delete-btn"><svg viewBox="0 -5 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-518.000000, -1146.000000)" fill="#000000"> <path d="M540.647,1159.24 C541.039,1159.63 541.039,1160.27 540.647,1160.66 C540.257,1161.05 539.623,1161.05 539.232,1160.66 L536.993,1158.42 L534.725,1160.69 C534.331,1161.08 533.692,1161.08 533.298,1160.69 C532.904,1160.29 532.904,1159.65 533.298,1159.26 L535.566,1156.99 L533.327,1154.76 C532.936,1154.37 532.936,1153.73 533.327,1153.34 C533.718,1152.95 534.352,1152.95 534.742,1153.34 L536.981,1155.58 L539.281,1153.28 C539.676,1152.89 540.314,1152.89 540.708,1153.28 C541.103,1153.68 541.103,1154.31 540.708,1154.71 L538.408,1157.01 L540.647,1159.24 L540.647,1159.24 Z M545.996,1146 L528.051,1146 C527.771,1145.98 527.485,1146.07 527.271,1146.28 L518.285,1156.22 C518.074,1156.43 517.983,1156.71 517.998,1156.98 C517.983,1157.26 518.074,1157.54 518.285,1157.75 L527.271,1167.69 C527.467,1167.88 527.723,1167.98 527.979,1167.98 L527.979,1168 L545.996,1168 C548.207,1168 550,1166.21 550,1164 L550,1150 C550,1147.79 548.207,1146 545.996,1146 L545.996,1146 Z" id="delete" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg></button>
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
<script src="js/cms.js"></script>
<script>
document.addEventListener("DOMContentLoaded", () => {
  const sidebarFields = document.querySelector(".sidebar-fields");
  const sidebarTitle = document.querySelector(".sidebar-node-title");
  let selectedNode = null;
  function selectNode(node) {
    if(selectedNode) selectedNode.classList.remove("selected");
    selectedNode = node;
    if(!node) {
      sidebarTitle.textContent = "Select a node...";
      sidebarFields.innerHTML = "";
      return;
    }
    node.classList.add("selected");
    sidebarTitle.textContent = "Editing Node #" + node.dataset.index;
    sidebarFields.innerHTML = "";
    const inputs = node.querySelectorAll("input");
    inputs.forEach(input => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("field-wrapper");
      const label = document.createElement("label");
      label.textContent = input.dataset.field;
      const fieldInput = document.createElement("input");
      fieldInput.value = input.value;
      fieldInput.addEventListener("input", () => {
        input.value = fieldInput.value;
      });
      wrapper.appendChild(label);
      wrapper.appendChild(fieldInput);
      sidebarFields.appendChild(wrapper);
    });
  }
  // Click node to select
  document.querySelectorAll(".draggable-item").forEach(node => {
    node.addEventListener("click", e => {
      e.stopPropagation();
      selectNode(node);
    });
  });
  // Toolbar actions
  const formatButtons = {
    "bold-btn": val => `**${val}**`,
    "italic-btn": val => `*${val}*`,
    "underline-btn": val => `__${val}__`,
    "uppercase-btn": val => val.toUpperCase(),
    "lowercase-btn": val => val.toLowerCase(),
    "capitalize-btn": val => val.replace(/\b\w/g, c=>c.toUpperCase()),
    "clear-btn": () => ""
  };
  Object.keys(formatButtons).forEach(cls=>{
    const btn = document.querySelector(`.${cls}`);
    btn?.addEventListener("click",()=>{
      if(!selectedNode) return;
      const inputs = selectedNode.querySelectorAll("input");
      inputs.forEach((input,i)=>{
        input.value = formatButtons[cls](input.value);
        sidebarFields.querySelectorAll("input")[i].value = input.value;
      });
    });
  });
  // Duplicate / Delete
  document.querySelectorAll(".draggable-item").forEach(item=>{
    item.querySelector(".duplicate-btn")?.addEventListener("click", e=>{
      e.stopPropagation();
      const clone = item.cloneNode(true);
      item.parentNode.insertBefore(clone, item.nextSibling);
      attachItemEvents(clone);
    });
    item.querySelector(".delete-btn")?.addEventListener("click", e=>{
      e.stopPropagation();
      item.remove();
      if(selectedNode===item) selectNode(null);
    });
  });
  function attachItemEvents(item){
    item.querySelector(".draggable-item, input")?.addEventListener("click", e=>{
      e.stopPropagation();
      selectNode(item);
    });
    item.querySelector(".duplicate-btn")?.addEventListener("click", e=>{
      e.stopPropagation();
      const clone = item.cloneNode(true);
      item.parentNode.insertBefore(clone, item.nextSibling);
      attachItemEvents(clone);
    });
    item.querySelector(".delete-btn")?.addEventListener("click", e=>{
      e.stopPropagation();
      item.remove();
      if(selectedNode===item) selectNode(null);
    });
  }
  // Add Item
  document.querySelectorAll(".add-array-item").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const container = btn.previousElementSibling;
      const newItem = document.createElement("div");
      newItem.classList.add("draggable-item");
      newItem.setAttribute("draggable","true");
      newItem.innerHTML = `<div style="display:flex; align-items:center;">
        <span class="drag-handle"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-8a2 2 0 10-.001-4.001A2 2 0 0013 6zm0 2a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z" fill="#5C5F62"></path></g></svg></span>
        <div class="field-input-container"><div class="field-wrapper"><label>Field1</label><input type="text" data-field="field1"></div></div>
      </div>
      <div class="item-buttons"><button class="duplicate-btn">Dup</button><button class="delete-btn">Del</button></div>`;
      container.appendChild(newItem);
      attachItemEvents(newItem);
    });
  });
  // Tabs
  const tabs = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".cms-tab-content");
  let activeTab = null;
  function switchTab(key){
    tabs.forEach(t=>t.classList.remove("active"));
    tabContents.forEach(c=>c.classList.remove("active"));
    document.querySelector(`.tab-btn[data-tab="${key}"]`)?.classList.add("active");
    document.getElementById(`tab-${key}`)?.classList.add("active");
    activeTab = key;
  }
  tabs.forEach(tab=>tab.addEventListener("click",()=>switchTab(tab.dataset.tab)));
  if(tabs.length) switchTab(tabs[0].dataset.tab);
  // Save All
  const saveAllBtn = document.getElementById("save-all-btn");
  const toast = document.getElementById("toast");
  function showToast(msg, duration=3000){
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"), duration);
  }
  saveAllBtn.addEventListener("click", ()=>{
    document.querySelectorAll(".editor-container").forEach(container=>{
      const key = container.dataset.jsonKey;
      const data = Array.from(container.querySelectorAll(".draggable-item")).map(item=>{
        const obj = {};
        item.querySelectorAll("input").forEach(input=>obj[input.dataset.field]=input.value);
        return obj;
      });
      fetch(`save.php?file=${key}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
      }).then(res=>res.json())
      .then(res=>res.success?showToast(`Saved ${key} ✓`):showToast(`Error saving ${key}`))
      .catch(()=>showToast(`Error saving ${key}`));
    });
  });
});
</script>
</body>
</html>
