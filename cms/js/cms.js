// cms/js/cms.js
(() => {
  const { files, data, csrf, saveUrl, uploadUrl } = window.CMS || {};
  if (!files || !data) {
    document.getElementById('editorRoot').innerHTML = '<div class="card">Initialization error: missing CMS payload.</div>';
    return;
  }

  // UI refs
  const editorRoot = document.getElementById('editorRoot');
  const sideButtons = Array.from(document.querySelectorAll('.side-item'));
  const saveStatus = document.getElementById('saveStatus');
  const btnSaveNow = document.getElementById('btnSaveNow');
  const toast = document.getElementById('toast');

  // state
  let currentFile = files[0] || null;
  let stateData = JSON.parse(JSON.stringify(data)); // clone
  let dirty = false;
  let autosaveTimer = null;

  // init
  sideButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // update active
      sideButtons.forEach(b => b.classList.remove('active'));
      sideButtons.forEach(b => b.setAttribute('aria-pressed','false'));
      btn.classList.add('active');
      btn.setAttribute('aria-pressed','true');

      openFile(btn.dataset.file);
    });
  });

  btnSaveNow.addEventListener('click', () => saveCurrent(true));

  // open default
  openFile(currentFile);

  /* ---------- rendering ---------- */
  function openFile(filename) {
    if (!filename) return;
    currentFile = filename;
    const prettyName = filename.replace('.json','');
    const json = stateData[filename] || {};
    editorRoot.innerHTML = `
      <div class="card">
        <div class="header-row">
          <h2>${prettyName}</h2>
          <div class="controls">
            <button class="btn ghost" id="btnAddItem">Add item</button>
            <button class="btn primary" id="btnSave">Save changes</button>
          </div>
        </div>

        <div id="structuredEditor"></div>
        <div class="card" style="margin-top:12px">
          <label class="field-label">Raw JSON</label>
          <textarea id="rawJson" style="min-height:200px;font-family:monospace">${JSON.stringify(json,null,2)}</textarea>
          <div style="margin-top:8px"><button class="btn small" id="btnApplyRaw">Apply raw JSON</button></div>
        </div>
      </div>
    `;

    document.getElementById('btnSave').addEventListener('click', () => saveCurrent(true));
    document.getElementById('btnApplyRaw').addEventListener('click', applyRaw);
    document.getElementById('btnAddItem')?.addEventListener('click', () => addTopLevelItem());

    buildStructuredEditor(document.getElementById('structuredEditor'), stateData[filename], []);
    setStatus('All changes saved ✓', false);
  }

  function buildStructuredEditor(container, node, path) {
    container.innerHTML = '';
    // root object handling - walk keys
    if (isObject(node)) {
      Object.keys(node).forEach(key => {
        const val = node[key];
        const card = document.createElement('div');
        card.className = 'card';
        const header = document.createElement('div');
        header.className = 'header-row';
        header.innerHTML = `<h3>${key}</h3><div class="controls"></div>`;
        card.appendChild(header);

        const body = document.createElement('div');
        body.style.marginTop = '8px';
        card.appendChild(body);

        renderField(body, val, [...path, key], (newVal) => {
          node[key] = newVal;
          markDirty();
        });

        container.appendChild(card);
      });
    } else {
      // arrays/primitives - fallback raw editor shown below
      container.innerHTML = `<div class="card"><em>Non-object root — edit raw JSON below.</em></div>`;
    }
  }

  function renderField(parent, value, path, onChange) {
    // object
    if (isObject(value)) {
      Object.keys(value).forEach(k => {
        const wrap = document.createElement('div');
        wrap.className = 'field';
        wrap.innerHTML = `<label>${k}</label>`;
        const sub = document.createElement('div');
        wrap.appendChild(sub);
        renderField(sub, value[k], [...path,k], (nv) => {
          value[k] = nv;
          onChange(value);
        });
        parent.appendChild(wrap);
      });
      return;
    }

    // array
    if (Array.isArray(value)) {
      const container = document.createElement('div');
      container.className = 'array-list';
      value.forEach((item, idx) => {
        const itemWrap = document.createElement('div');
        itemWrap.className = 'array-item';
        const left = document.createElement('div');
        const right = document.createElement('div');
        right.className = 'array-actions';

        // render item (object vs primitive)
        if (isObject(item)) {
          Object.keys(item).forEach(k => {
            const f = document.createElement('div');
            f.className = 'field';
            f.innerHTML = `<label>${k}</label>`;
            const input = createInputFor(item[k]);
            input.addEventListener('input', (e) => { item[k] = inputValueFrom(input); onChange(value); });
            f.appendChild(input);
            left.appendChild(f);
          });
        } else {
          const f = document.createElement('div');
          f.className = 'field';
          f.innerHTML = `<label>Item</label>`;
          const input = createInputFor(item);
          input.addEventListener('input', () => { value[idx] = inputValueFrom(input); onChange(value); });
          f.appendChild(input);
          left.appendChild(f);
        }

        // actions
        const btnDel = document.createElement('button');
        btnDel.className = 'small-btn';
        btnDel.textContent = 'Delete';
        btnDel.addEventListener('click', () => {
          if (!confirm('Delete this item?')) return;
          value.splice(idx,1);
          onChange(value);
          openFile(currentFile); // re-render
        });
        right.appendChild(btnDel);

        itemWrap.appendChild(left);
        itemWrap.appendChild(right);
        container.appendChild(itemWrap);
      });

      const addBtn = document.createElement('button');
      addBtn.className = 'btn small';
      addBtn.textContent = 'Add item';
      addBtn.addEventListener('click', () => {
        // create smart empty item
        let sample = typeof value[0] === 'object' ? {} : '';
        value.push(sample);
        onChange(value);
        openFile(currentFile);
      });

      parent.appendChild(container);
      parent.appendChild(addBtn);
      return;
    }

    // primitive
    const field = document.createElement('div');
    field.className = 'field';
    const label = document.createElement('label');
    label.textContent = path[path.length-1] || 'value';
    field.appendChild(label);

    // image heuristic
    if (typeof value === 'string' && (value.includes('/assets/media/images') || /\.(png|jpe?g|webp|svg)$/i.test(value))) {
      const imgWrap = document.createElement('div');
      imgWrap.style.display = 'flex'; imgWrap.style.gap='12px'; imgWrap.style.alignItems='center';

      const img = document.createElement('img');
      img.className = 'img-preview';
      img.src = value || '/assets/media/images/placeholder.webp';
      img.addEventListener('click', () => openLightbox(img.src));
      imgWrap.appendChild(img);

      const input = document.createElement('input');
      input.type = 'text';
      input.value = value;
      input.addEventListener('input', () => { onChange(input.value); markDirty(); });

      const file = document.createElement('input');
      file.type = 'file';
      file.accept = 'image/*';
      file.addEventListener('change', (e) => {
        const f = e.target.files[0];
        if (!f) return;
        uploadFile(f).then(url => {
          if (url) {
            img.src = url;
            input.value = url;
            onChange(url);
            markDirty();
            showToast('Upload complete');
          }
        });
      });

      imgWrap.appendChild(input);
      imgWrap.appendChild(file);
      field.appendChild(imgWrap);
      parent.appendChild(field);
      return;
    }

    // long text -> textarea
    if (typeof value === 'string' && value.length > 120) {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.addEventListener('input', () => { onChange(ta.value); markDirty(); autoGrowTextarea(ta); });
      field.appendChild(ta);
      parent.appendChild(field);
      autoGrowTextarea(ta);
      return;
    }

    // default input
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.value = value === null ? '' : value;
    inp.addEventListener('input', () => { onChange(inp.value); markDirty(); });
    field.appendChild(inp);
    parent.appendChild(field);
  }

  /* ---------- utilities ---------- */

  function createInputFor(sample) {
    if (typeof sample === 'string' && sample.length > 120) {
      const t = document.createElement('textarea'); t.value = sample; return t;
    }
    const i = document.createElement('input'); i.type = 'text'; i.value = sample || ''; return i;
  }
  function inputValueFrom(el) {
    if (!el) return '';
    return el.tagName === 'TEXTAREA' ? el.value : el.value;
  }

  function isObject(v){ return v && typeof v === 'object' && !Array.isArray(v); }

  function autoGrowTextarea(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.min(window.innerHeight * 0.5, ta.scrollHeight + 6) + 'px';
  }

  /* ---------- save / apply raw ---------- */

  function applyRaw() {
    const raw = document.getElementById('rawJson').value;
    try {
      const parsed = JSON.parse(raw);
      stateData[currentFile] = parsed;
      openFile(currentFile);
      markDirty();
      showToast('Raw JSON applied (local). Save to persist.');
    } catch (e) {
      alert('Invalid JSON: ' + e.message);
    }
  }

  function saveCurrent(force = false) {
    const payload = JSON.stringify(stateData[currentFile], null, 2);
    // send via fetch to saveUrl
    setStatus('Saving…', true);
    fetch(saveUrl, {
      method: 'POST',
      body: new FormDataWrapper({ filename: currentFile, json: payload, csrf })
    }).then(r => r.json())
      .then(res => {
        if (res.ok) {
          setStatus('All changes saved ✓', false);
          dirty = false;
          // update embedded data
          try { window.CMS.data[currentFile] = stateData[currentFile]; } catch(e){}
        } else {
          setStatus('Save failed', false);
          showToast('Save failed: ' + (res.error || 'unknown'), true);
        }
      })
      .catch(() => {
        setStatus('Save failed', false);
        showToast('Save request failed', true);
      });
  }

  // small wrapper to build FormData in a way fetch accepts
  function FormDataWrapper(obj) {
    const fd = new FormData();
    Object.keys(obj).forEach(k => fd.append(k, obj[k]));
    return fd;
  }

  /* ---------- upload ---------- */
  async function uploadFile(file) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('csrf', csrf);
    setStatus('Uploading…', true);
    try {
      const res = await fetch(uploadUrl, { method: 'POST', body: fd });
      const json = await res.json();
      if (json.ok && json.url) {
        setStatus('Upload complete', false);
        return json.url;
      } else {
        showToast('Upload failed: ' + (json.error||'unknown'), true);
        setStatus('Upload failed', false);
        return null;
      }
    } catch (e) {
      showToast('Upload error', true);
      setStatus('Upload failed', false);
      return null;
    }
  }

  /* ---------- UI helpers ---------- */

  function markDirty() {
    dirty = true;
    setStatus('Unsaved changes', true);
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => saveCurrent(false), 4000); // auto-save after 4s idle
  }

  function setStatus(text, busy) {
    saveStatus.textContent = text;
    saveStatus.style.color = busy ? 'var(--muted)' : 'inherit';
  }

  function showToast(msg, isError) {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    toast.style.background = isError ? '#b91c1c' : '#111';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.style.display = 'none'; }, 2800);
  }

  function openLightbox(src) {
    const lb = document.createElement('div');
    lb.style.position='fixed';lb.style.inset=0;lb.style.background='rgba(0,0,0,0.6)';lb.style.display='flex';lb.style.alignItems='center';lb.style.justifyContent='center';lb.style.zIndex=9999;
    const img = document.createElement('img'); img.src = src; img.style.maxWidth='90%'; img.style.maxHeight='90%'; img.style.borderRadius='10px';
    lb.appendChild(img);
    lb.addEventListener('click', ()=> lb.remove());
    document.body.appendChild(lb);
  }

  // expose openFile for re-rendering
  window.openFile = openFile;

})();
