/* Sticker maker: photo → crop → caption template → PNG (512×512 for Telegram / WhatsApp) */
window.LISTAI_I18N_EXT = {
  ru: {
    st_nav: "Стикеры", st_title: "Стикеры из фото", st_lead: "Загрузите фото, обрежьте, добавьте надпись в одном из шаблонов и скачайте PNG 512×512 для Telegram и WhatsApp. Или соберите целый пак архивом.",
    st_upload: "Загрузить фото", st_replace: "Другое фото", st_shape: "Форма", sh_square: "Квадрат", sh_round: "Скругление", sh_circle: "Круг", sh_cut: "Вырезать фон",
    st_zoom: "Масштаб", st_tol: "Чувствительность выреза", st_outline: "Белая обводка", st_outline_w: "Толщина обводки", st_tpl: "Шаблон надписи",
    tp_none: "Без надписи", tp_meme: "Мем", tp_pill: "Плашка", tp_neuro: "Нейро", tp_bubble: "Пузырь", tp_stamp: "Штамп", tp_bar: "Полоса",
    st_text: "Надпись", st_label: "Метка (маленький текст)", st_pos: "Положение", st_top: "Сверху", st_bottom: "Снизу", st_size: "Размер текста", st_auto: "авто",
    st_color: "Цвет текста", st_accent: "Цвет плашки", st_out: "Размер", st_dl: "Скачать PNG", st_add: "В пак", st_pack: "Пак стикеров", st_pack_empty: "Добавляйте стикеры сюда и скачайте пак одним архивом. В Telegram пак загружают через @Stickers.",
    st_pack_dl: "Скачать пак (ZIP)", st_pack_clear: "Очистить пак", st_remove: "Убрать", st_hint: "Тяните фото, чтобы сдвинуть кадр. Колесо мыши или ползунок — масштаб.",
    st_ready: (kb) => "Готово: 512×512, " + kb + " КБ", st_big: (kb) => "PNG " + kb + " КБ. Telegram принимает до 512 КБ: уменьшите обводку или выберите форму без прозрачности.",
    st_err: "Не удалось прочитать файл. Нужна картинка PNG, JPG или WebP.", st_brush: "Кисть", br_off: "Выкл", br_erase: "Стереть", br_restore: "Вернуть", st_brush_size: "Размер кисти", st_feather: "Мягкость края", st_brush_hint: "Кисть работает в режиме «Вырезать фон»: сотрите лишнее или верните то, что срезалось.", st_back: "← Карусели", st_page_title: "Стикеры из фото", st_added: (n) => "В паке: " + n, st_demo: "Пример", st_placeholder: "Загрузите фото, чтобы начать"
  },
  en: {
    st_nav: "Stickers", st_title: "Stickers from photos", st_lead: "Upload a photo, crop it, add a caption in one of the templates and download a 512×512 PNG for Telegram and WhatsApp. Or build a whole pack as an archive.",
    st_upload: "Upload photo", st_replace: "Another photo", st_shape: "Shape", sh_square: "Square", sh_round: "Rounded", sh_circle: "Circle", sh_cut: "Cut out background",
    st_zoom: "Zoom", st_tol: "Cut-out sensitivity", st_outline: "White outline", st_outline_w: "Outline width", st_tpl: "Caption template",
    tp_none: "No caption", tp_meme: "Meme", tp_pill: "Pill", tp_neuro: "Neuro", tp_bubble: "Bubble", tp_stamp: "Stamp", tp_bar: "Bar",
    st_text: "Caption", st_label: "Label (small text)", st_pos: "Position", st_top: "Top", st_bottom: "Bottom", st_size: "Text size", st_auto: "auto",
    st_color: "Text color", st_accent: "Pill color", st_out: "Size", st_dl: "Download PNG", st_add: "Add to pack", st_pack: "Sticker pack", st_pack_empty: "Add stickers here and download the pack as one archive. Telegram packs are uploaded via @Stickers.",
    st_pack_dl: "Download pack (ZIP)", st_pack_clear: "Clear pack", st_remove: "Remove", st_hint: "Drag the photo to move the crop. Mouse wheel or the slider zooms.",
    st_ready: (kb) => "Done: 512×512, " + kb + " KB", st_big: (kb) => "PNG is " + kb + " KB. Telegram accepts up to 512 KB: reduce the outline or pick a shape without transparency.",
    st_err: "Could not read the file. Use a PNG, JPG or WebP image.", st_brush: "Brush", br_off: "Off", br_erase: "Erase", br_restore: "Restore", st_brush_size: "Brush size", st_feather: "Edge softness", st_brush_hint: "The brush works in “Cut out background” mode: erase leftovers or bring back what was trimmed.", st_back: "← Carousels", st_page_title: "Stickers from photos", st_added: (n) => "In pack: " + n, st_demo: "Example", st_placeholder: "Upload a photo to start"
  }
};
(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const D = window.LISTAI_I18N_EXT;
  let lang = "ru";
  try { lang = localStorage.getItem("listai.lang") || (navigator.language.startsWith("ru") ? "ru" : "en"); } catch (e) {}
  const t = (k, ...a) => { const v = D[lang][k]; return typeof v === "function" ? v(...a) : (v == null ? k : v); };
  const root = $("#stickers"); if (!root) return;
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    labels();
  }
  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => { lang = b.dataset.lang; try { localStorage.setItem("listai.lang", lang); } catch (e) {} applyLang(); }));
  const PREVIEW = 320;
  const st = { img: null, cut: null, shape: "round", zoom: 1, ox: 0, oy: 0, tol: 40, feather: 2, brush: "off", bsize: 24, outline: true, ow: 12, tpl: "meme", text: "", label: "", pos: "bottom", size: 0, color: "#ffffff", accent: "#1F3DFF", out: 512, pack: [] };
  const TPLS = ["none", "meme", "pill", "neuro", "bubble", "stamp", "bar"];
  const SHAPES = ["square", "round", "circle", "cut"];

  root.innerHTML =
    '<div class="st-wrap"><div class="panel st-panel">' +
    '<div class="st-stage-wrap"><canvas id="st-canvas" width="' + PREVIEW + '" height="' + PREVIEW + '"></canvas><div class="st-empty" id="st-empty"><span data-i18n="st_placeholder"></span></div></div>' +
    '<div class="inline"><label class="btn primary file-btn"><span id="st-upload-l"></span><input type="file" id="st-file" accept="image/*" hidden></label><button type="button" class="btn ghost" id="st-demo" data-i18n="st_demo"></button></div>' +
    '<span class="hint" data-i18n="st_hint"></span>' +
    '<div class="field"><label data-i18n="st_shape"></label><div class="seg" id="st-shape"></div></div>' +
    '<div class="field"><label for="st-zoom" data-i18n="st_zoom"></label><input type="range" id="st-zoom" min="100" max="400" value="100"></div>' +
    '<div id="st-cut-f" hidden><div class="field"><label for="st-tol" data-i18n="st_tol"></label><input type="range" id="st-tol" min="5" max="120" value="40"></div>' +
    '<div class="field"><label for="st-feather" data-i18n="st_feather"></label><input type="range" id="st-feather" min="0" max="6" value="2"></div>' +
    '<div class="field"><label data-i18n="st_brush"></label><div class="seg" id="st-brush"><button type="button" data-v="off"></button><button type="button" data-v="erase"></button><button type="button" data-v="restore"></button></div></div>' +
    '<div class="field"><label for="st-bsize" data-i18n="st_brush_size"></label><input type="range" id="st-bsize" min="6" max="80" value="24"></div><span class="hint" data-i18n="st_brush_hint"></span></div>' +
    '<div class="toggles"><label><input type="checkbox" id="st-outline" checked> <span data-i18n="st_outline"></span></label><input type="range" id="st-ow" min="0" max="30" value="12" style="flex:1" aria-label="outline width"></div>' +
    "</div>" +
    '<div class="panel st-panel">' +
    '<div class="field"><label data-i18n="st_tpl"></label><div class="st-tpls" id="st-tpls"></div></div>' +
    '<div class="field"><label for="st-text" data-i18n="st_text"></label><input type="text" id="st-text" maxlength="80"></div>' +
    '<div class="field" id="st-label-f"><label for="st-label" data-i18n="st_label"></label><input type="text" id="st-label" maxlength="24"></div>' +
    '<div class="row"><div class="field"><label data-i18n="st_pos"></label><div class="seg" id="st-pos"><button type="button" data-v="top" data-i18n="st_top"></button><button type="button" data-v="bottom" data-i18n="st_bottom"></button></div></div>' +
    '<div class="field"><label for="st-size"><span data-i18n="st_size"></span> <span id="st-size-v"></span></label><input type="range" id="st-size" min="0" max="120" value="0"></div></div>' +
    '<div class="row3"><label class="color"><input type="color" id="st-color" value="#ffffff"><span data-i18n="st_color"></span></label><label class="color"><input type="color" id="st-accent" value="#1F3DFF"><span data-i18n="st_accent"></span></label>' +
    '<div class="field"><label for="st-out" data-i18n="st_out"></label><select id="st-out"><option value="512">512 · Telegram</option><option value="1024">1024</option></select></div></div>' +
    '<div class="actions"><button type="button" class="btn primary" id="st-dl" data-i18n="st_dl"></button><button type="button" class="btn" id="st-add" data-i18n="st_add"></button></div>' +
    '<div class="status" id="st-status"></div>' +
    "</div></div>" +
    '<div class="panel st-pack"><div class="preview-head"><h2 data-i18n="st_pack"></h2><span class="count" id="st-pack-n"></span></div><div class="st-pack-grid" id="st-pack"></div><p class="hint" id="st-pack-empty" data-i18n="st_pack_empty"></p>' +
    '<div class="actions"><button type="button" class="btn primary" id="st-pack-dl" data-i18n="st_pack_dl"></button><button type="button" class="btn ghost" id="st-pack-clear" data-i18n="st_pack_clear"></button></div></div>';

  const cv = $("#st-canvas"), ctx = cv.getContext("2d");
  const E = { file: $("#st-file"), zoom: $("#st-zoom"), tol: $("#st-tol"), tolF: $("#st-cut-f"), feather: $("#st-feather"), bsize: $("#st-bsize"), outline: $("#st-outline"), ow: $("#st-ow"), text: $("#st-text"), label: $("#st-label"), labelF: $("#st-label-f"), size: $("#st-size"), sizeV: $("#st-size-v"), color: $("#st-color"), accent: $("#st-accent"), out: $("#st-out"), status: $("#st-status"), pack: $("#st-pack"), packN: $("#st-pack-n"), packEmpty: $("#st-pack-empty"), empty: $("#st-empty") };

  /* ── i18n-dependent UI ── */
  function labels() {
    $("#st-upload-l").textContent = t(st.img ? "st_replace" : "st_upload");
    $("#st-shape").innerHTML = SHAPES.map((s) => '<button type="button" data-v="' + s + '" aria-pressed="' + (st.shape === s) + '">' + t("sh_" + s) + "</button>").join("");
    $("#st-tpls").innerHTML = TPLS.map((p) => '<button type="button" class="st-tpl" data-v="' + p + '" aria-pressed="' + (st.tpl === p) + '"><canvas width="72" height="72"></canvas><span>' + t("tp_" + p) + "</span></button>").join("");
    document.querySelectorAll("#st-pos button").forEach((b) => { b.setAttribute("aria-pressed", String(b.dataset.v === st.pos)); b.textContent = t(b.dataset.i18n); });
    E.sizeV.textContent = st.size ? st.size : t("st_auto");
    E.labelF.hidden = st.tpl !== "neuro" && st.tpl !== "stamp";
    E.tolF.hidden = st.shape !== "cut";
    document.querySelectorAll("#st-brush button").forEach((b) => { b.setAttribute("aria-pressed", String(b.dataset.v === st.brush)); b.textContent = t("br_" + b.dataset.v); });
    cv.style.cursor = st.brush !== "off" && st.shape === "cut" ? "crosshair" : "grab";
    E.packN.textContent = st.pack.length ? t("st_added", st.pack.length) : "";
    E.packEmpty.hidden = st.pack.length > 0;
    thumbs();
  }

  /* ── image loading + background cut-out ── */
  function loadFile(f) {
    return new Promise((res, rej) => {
      if (!f || !/^image\//.test(f.type)) return rej();
      const fr = new FileReader(); fr.onerror = rej;
      fr.onload = () => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = fr.result; };
      fr.readAsDataURL(f);
    });
  }
  function prepare(im) {
    const k = Math.min(1, 1400 / Math.max(im.width, im.height));
    const c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
    c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
    st.img = c; st.cut = null; st.zoom = 1; st.ox = st.oy = 0; E.zoom.value = 100;
    E.empty.hidden = true; labels(); draw();
  }
  function cutout() {
    if (!st.img) return null;
    const w = st.img.width, h = st.img.height, c = document.createElement("canvas"); c.width = w; c.height = h;
    const x = c.getContext("2d"); x.drawImage(st.img, 0, 0);
    const id = x.getImageData(0, 0, w, h), d = id.data, N = w * h;
    // 1. background colour = median of the border pixels
    const rs = [], gs = [], bs = [];
    const take = (p) => { rs.push(d[p * 4]); gs.push(d[p * 4 + 1]); bs.push(d[p * 4 + 2]); };
    for (let i = 0; i < w; i += 2) { take(i); take((h - 1) * w + i); }
    for (let j = 0; j < h; j += 2) { take(j * w); take(j * w + w - 1); }
    const med = (arr) => { arr.sort((p, q) => p - q); return arr[arr.length >> 1]; };
    const br = med(rs), bg = med(gs), bb = med(bs);
    const dist = (p, r, g, b2) => { const dr = d[p * 4] - r, dg = d[p * 4 + 1] - g, db = d[p * 4 + 2] - b2; return (dr * dr * 0.9 + dg * dg * 1.6 + db * db * 0.5); };
    const tolG = (st.tol * 2.1) * (st.tol * 2.1), tolL = (st.tol * 0.75) * (st.tol * 0.75), tolSeed = (st.tol * 1.4) * (st.tol * 1.4);
    // 2. region growing from every border pixel that looks like background;
    //    a neighbour joins if it is close to the pixel it came from (handles gradients and soft shadows)
    //    and not too far from the global background colour (stops leaks into the subject)
    const mask = new Uint8Array(N), queue = new Int32Array(N); let qh = 0, qt = 0;
    const seed = (p) => { if (!mask[p] && dist(p, br, bg, bb) < tolSeed) { mask[p] = 1; queue[qt++] = p; } };
    for (let i = 0; i < w; i++) { seed(i); seed((h - 1) * w + i); }
    for (let j = 0; j < h; j++) { seed(j * w); seed(j * w + w - 1); }
    while (qh < qt) {
      const p = queue[qh++], px = p % w, r = d[p * 4], g = d[p * 4 + 1], b2 = d[p * 4 + 2];
      const nb = [p - w, p + w, px > 0 ? p - 1 : -1, px < w - 1 ? p + 1 : -1];
      for (let k = 0; k < 4; k++) { const n = nb[k]; if (n < 0 || n >= N || mask[n]) continue; if (dist(n, r, g, b2) < tolL && dist(n, br, bg, bb) < tolG) { mask[n] = 1; queue[qt++] = n; } }
    }
    // 3. alpha: background 0, subject 255, border pixels get a soft value from their distance to the background colour
    const alpha = new Uint8ClampedArray(N);
    for (let p = 0; p < N; p++) {
      if (mask[p]) { alpha[p] = 0; continue; }
      const px = p % w, near = (p >= w && mask[p - w]) || (p < N - w && mask[p + w]) || (px > 0 && mask[p - 1]) || (px < w - 1 && mask[p + 1]);
      if (!near) { alpha[p] = 255; continue; }
      const k = Math.min(1, Math.max(0, (Math.sqrt(dist(p, br, bg, bb)) - st.tol * 0.75) / (st.tol * 0.9)));
      alpha[p] = Math.round(255 * (0.25 + 0.75 * k));
    }
    // 4. feather: box blur the alpha channel
    let out = alpha;
    for (let pass = 0; pass < st.feather; pass++) {
      const nx = new Uint8ClampedArray(N);
      for (let p = 0; p < N; p++) {
        const px = p % w; let sum = out[p] * 2, cnt = 2;
        if (px > 0) { sum += out[p - 1]; cnt++; } if (px < w - 1) { sum += out[p + 1]; cnt++; }
        if (p >= w) { sum += out[p - w]; cnt++; } if (p < N - w) { sum += out[p + w]; cnt++; }
        nx[p] = Math.round(sum / cnt);
      }
      out = nx;
    }
    for (let p = 0; p < N; p++) d[p * 4 + 3] = Math.min(d[p * 4 + 3], out[p]);
    x.putImageData(id, 0, 0);
    return c;
  }
  /* brush: erase or restore on the cut-out at source resolution */
  function toSource(px, py) {
    const src = source(); if (!src) return null;
    const S = PREVIEW, bs = Math.max(S / src.width, S / src.height) * st.zoom, w = src.width * bs, h = src.height * bs;
    return { x: (px - ((S - w) / 2 + st.ox * S)) / bs, y: (py - ((S - h) / 2 + st.oy * S)) / bs, r: st.bsize / 2 / bs };
  }
  function brushAt(px, py) {
    if (st.shape !== "cut" || st.brush === "off") return false;
    const c = source(); if (!c) return false;
    const m = toSource(px, py), x = c.getContext("2d");
    x.save();
    if (st.brush === "erase") { x.globalCompositeOperation = "destination-out"; x.beginPath(); x.arc(m.x, m.y, m.r, 0, Math.PI * 2); x.fill(); }
    else { x.globalCompositeOperation = "source-over"; x.beginPath(); x.arc(m.x, m.y, m.r, 0, Math.PI * 2); x.clip(); x.drawImage(st.img, 0, 0); }
    x.restore();
    return true;
  }
  function source() { if (st.shape === "cut") { if (!st.cut) st.cut = cutout(); return st.cut; } return st.img; }

  /* ── rendering ── */
  function wrapLines(x, text, font, maxW) {
    x.font = font;
    const words = text.split(/\s+/).filter(Boolean), lines = []; let cur = "";
    for (const w of words) { const test = cur ? cur + " " + w : w; if (x.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test; }
    if (cur) lines.push(cur);
    return lines;
  }
  function fitFont(x, text, weight, family, maxW, maxH, start) {
    let size = st.size ? st.size * (maxW / 460) : start;
    for (; size > 14; size -= 2) {
      const lines = wrapLines(x, text, weight + " " + size + "px " + family, maxW);
      if (lines.length * size * 1.15 <= maxH && lines.every((l) => x.measureText(l).width <= maxW)) return { size, lines };
      if (st.size) return { size, lines };
    }
    return { size, lines: wrapLines(x, text, weight + " " + size + "px " + family, maxW) };
  }
  function roundRect(x, X, Y, W, H, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + W, Y, X + W, Y + H, r); x.arcTo(X + W, Y + H, X, Y + H, r); x.arcTo(X, Y + H, X, Y, r); x.arcTo(X, Y, X + W, Y, r); x.closePath(); }
  function clipShape(x, S) {
    if (st.shape === "circle") { x.beginPath(); x.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2); x.clip(); }
    else if (st.shape === "round") { roundRect(x, 0, 0, S, S, S * 0.14); x.clip(); }
  }
  function drawPhoto(x, S, src) {
    const bs = Math.max(S / src.width, S / src.height) * st.zoom, w = src.width * bs, h = src.height * bs;
    x.drawImage(src, (S - w) / 2 + st.ox * S, (S - h) / 2 + st.oy * S, w, h);
  }
  function render(S, forExport) {
    const c = document.createElement("canvas"); c.width = c.height = S; const x = c.getContext("2d");
    const src = source();
    if (src) {
      // photo layer with shape clip
      const photo = document.createElement("canvas"); photo.width = photo.height = S; const px = photo.getContext("2d");
      px.save(); clipShape(px, S); drawPhoto(px, S, src); px.restore();
      // white outline: silhouette dilated
      if (st.outline && st.ow > 0 && st.shape !== "square") {
        const sil = document.createElement("canvas"); sil.width = sil.height = S; const sx = sil.getContext("2d");
        sx.drawImage(photo, 0, 0); sx.globalCompositeOperation = "source-in"; sx.fillStyle = "#fff"; sx.fillRect(0, 0, S, S);
        const r = st.ow * S / 512;
        for (let a = 0; a < 24; a++) x.drawImage(sil, Math.cos(a / 24 * Math.PI * 2) * r, Math.sin(a / 24 * Math.PI * 2) * r);
      }
      x.drawImage(photo, 0, 0);
    } else if (!forExport) { x.fillStyle = "#dcdce6"; roundRect(x, 0, 0, S, S, S * 0.14); x.fill(); }
    caption(x, S);
    return c;
  }
  function caption(x, S) {
    const text = st.text.trim(), tpl = st.tpl; if (tpl === "none" || (!text && tpl !== "stamp")) return;
    const u = S / 512, pad = 26 * u, maxW = S - pad * 2;
    x.textAlign = "center"; x.textBaseline = "middle"; x.lineJoin = "round";
    if (tpl === "meme") {
      const f = fitFont(x, text.toUpperCase(), "900", "Unbounded, Manrope, sans-serif", maxW, S * 0.42, 56 * u);
      x.font = "900 " + f.size + "px Unbounded, Manrope, sans-serif"; x.lineWidth = f.size * 0.16; x.strokeStyle = "#000"; x.fillStyle = st.color;
      const lh = f.size * 1.12, total = lh * f.lines.length, y0 = st.pos === "top" ? pad + f.size * 0.6 : S - pad - total + f.size * 0.6;
      f.lines.forEach((l, i) => { x.strokeText(l, S / 2, y0 + i * lh); x.fillText(l, S / 2, y0 + i * lh); });
    } else if (tpl === "pill") {
      const f = fitFont(x, text, "800", "Manrope, sans-serif", maxW - 48 * u, S * 0.35, 40 * u);
      x.font = "800 " + f.size + "px Manrope, sans-serif";
      const lh = f.size * 1.2, W = Math.max(...f.lines.map((l) => x.measureText(l).width)) + 48 * u, H = lh * f.lines.length + 28 * u;
      const X = (S - W) / 2, Y = st.pos === "top" ? pad : S - pad - H;
      x.fillStyle = st.accent; roundRect(x, X, Y, W, H, H / 2); x.fill(); x.fillStyle = st.color;
      f.lines.forEach((l, i) => x.fillText(l, S / 2, Y + 14 * u + lh * (i + 0.5)));
    } else if (tpl === "neuro") {
      const f = fitFont(x, text, "900", "Unbounded, Manrope, sans-serif", maxW - 40 * u, S * 0.36, 36 * u);
      x.font = "900 " + f.size + "px Unbounded, Manrope, sans-serif";
      const lh = f.size * 1.15, H = lh * f.lines.length + 36 * u, W = Math.max(...f.lines.map((l) => x.measureText(l).width)) + 40 * u;
      const X = (S - W) / 2, Y = st.pos === "top" ? pad + (st.label ? 30 * u : 0) : S - pad - H;
      x.fillStyle = "#0E0E14"; roundRect(x, X, Y, W, H, 22 * u); x.fill(); x.fillStyle = st.color;
      f.lines.forEach((l, i) => x.fillText(l, S / 2, Y + 18 * u + lh * (i + 0.5)));
      if (st.label) {
        x.font = "700 " + 15 * u + "px Unbounded, Manrope, sans-serif"; const lw = x.measureText(st.label.toUpperCase()).width + 26 * u, lY = Y - 15 * u;
        x.fillStyle = st.accent; roundRect(x, X + 18 * u, lY, lw, 30 * u, 15 * u); x.fill(); x.fillStyle = "#fff"; x.fillText(st.label.toUpperCase(), X + 18 * u + lw / 2, lY + 15 * u);
      }
    } else if (tpl === "bubble") {
      const f = fitFont(x, text, "800", "Manrope, sans-serif", maxW - 56 * u, S * 0.3, 34 * u);
      x.font = "800 " + f.size + "px Manrope, sans-serif";
      const lh = f.size * 1.2, W = Math.max(...f.lines.map((l) => x.measureText(l).width)) + 56 * u, H = lh * f.lines.length + 36 * u;
      const X = (S - W) / 2, Y = st.pos === "top" ? pad : S - pad - H - 18 * u;
      x.fillStyle = "#fff"; x.strokeStyle = "#0E0E14"; x.lineWidth = 5 * u;
      roundRect(x, X, Y, W, H, 26 * u); x.fill(); x.stroke();
      x.beginPath(); const tx = X + W * 0.28, ty = st.pos === "top" ? Y + H : Y;
      if (st.pos === "top") { x.moveTo(tx - 16 * u, ty - 3 * u); x.lineTo(tx + 6 * u, ty + 26 * u); x.lineTo(tx + 22 * u, ty - 3 * u); } else { x.moveTo(tx - 16 * u, ty + 3 * u); x.lineTo(tx + 6 * u, ty - 26 * u); x.lineTo(tx + 22 * u, ty + 3 * u); }
      x.closePath(); x.fill(); x.stroke(); x.fillStyle = "#fff"; x.fillRect(tx - 12 * u, st.pos === "top" ? ty - 6 * u : ty - 1 * u, 30 * u, 7 * u);
      x.fillStyle = "#0E0E14"; f.lines.forEach((l, i) => x.fillText(l, S / 2, Y + 18 * u + lh * (i + 0.5)));
    } else if (tpl === "stamp") {
      const label = (text || st.label || "").toUpperCase(); if (!label) return;
      x.save(); x.translate(S / 2, st.pos === "top" ? S * 0.22 : S * 0.78); x.rotate(-12 * Math.PI / 180);
      const f = fitFont(x, label, "900", "Unbounded, Manrope, sans-serif", S * 0.8, S * 0.3, 44 * u);
      x.font = "900 " + f.size + "px Unbounded, Manrope, sans-serif";
      const lh = f.size * 1.1, W = Math.max(...f.lines.map((l) => x.measureText(l).width)) + 40 * u, H = lh * f.lines.length + 26 * u;
      x.globalAlpha = 0.88; x.strokeStyle = st.accent; x.lineWidth = 6 * u; roundRect(x, -W / 2, -H / 2, W, H, 10 * u); x.stroke();
      x.lineWidth = 2 * u; roundRect(x, -W / 2 + 8 * u, -H / 2 + 8 * u, W - 16 * u, H - 16 * u, 6 * u); x.stroke();
      x.fillStyle = st.accent; f.lines.forEach((l, i) => x.fillText(l, 0, -H / 2 + 13 * u + lh * (i + 0.5)));
      x.restore();
    } else if (tpl === "bar") {
      const f = fitFont(x, text, "800", "Manrope, sans-serif", maxW, S * 0.3, 34 * u);
      x.font = "800 " + f.size + "px Manrope, sans-serif";
      const lh = f.size * 1.2, H = lh * f.lines.length + 32 * u, Y = st.pos === "top" ? 0 : S - H;
      x.fillStyle = st.accent; x.fillRect(0, Y, S, H); x.fillStyle = st.color;
      f.lines.forEach((l, i) => x.fillText(l, S / 2, Y + 16 * u + lh * (i + 0.5)));
    }
  }
  let raf;
  function draw() { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { ctx.clearRect(0, 0, PREVIEW, PREVIEW); ctx.drawImage(render(PREVIEW, false), 0, 0); }); }
  function thumbs() {
    const saved = { text: st.text, label: st.label, pos: st.pos, size: st.size };
    document.querySelectorAll("#st-tpls .st-tpl").forEach((b) => {
      const tpl = b.dataset.v, c = b.querySelector("canvas"), x = c.getContext("2d");
      x.clearRect(0, 0, 72, 72); x.fillStyle = "#c9c9d6"; roundRect(x, 0, 0, 72, 72, 12); x.fill();
      const keep = st.tpl; st.tpl = tpl; st.text = tpl === "stamp" ? "OK" : "Текст"; st.label = "AI"; st.size = 0; st.pos = "bottom";
      caption(x, 72); st.tpl = keep;
    });
    Object.assign(st, saved);
  }

  /* ── interactions ── */
  E.file.addEventListener("change", async () => { const f = E.file.files[0]; E.file.value = ""; if (!f) return; try { prepare(await loadFile(f)); E.status.textContent = ""; } catch (e) { E.status.textContent = t("st_err"); } });
  $("#st-demo").addEventListener("click", () => {
    const c = document.createElement("canvas"); c.width = c.height = 800; const x = c.getContext("2d");
    const g = x.createLinearGradient(0, 0, 800, 800); g.addColorStop(0, "#ffd166"); g.addColorStop(1, "#ef476f"); x.fillStyle = g; x.fillRect(0, 0, 800, 800);
    x.fillStyle = "#fff"; x.beginPath(); x.arc(400, 380, 220, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0E0E14"; x.beginPath(); x.arc(330, 340, 26, 0, Math.PI * 2); x.arc(470, 340, 26, 0, Math.PI * 2); x.fill();
    x.lineWidth = 18; x.strokeStyle = "#0E0E14"; x.beginPath(); x.arc(400, 400, 110, 0.15 * Math.PI, 0.85 * Math.PI); x.stroke();
    prepare(c); st.text = st.text || (t("tp_meme") === "Meme" ? "when it works" : "когда заработало"); E.text.value = st.text; draw();
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("#st-shape button, #st-tpls .st-tpl, #st-pos button, #st-brush button"); if (!b) return;
    if (b.closest("#st-brush")) st.brush = b.dataset.v;
    else if (b.closest("#st-shape")) { st.shape = b.dataset.v; st.cut = null; }
    else if (b.closest("#st-tpls")) st.tpl = b.dataset.v; else st.pos = b.dataset.v;
    labels(); draw();
  });
  E.zoom.addEventListener("input", () => { st.zoom = Number(E.zoom.value) / 100; draw(); });
  E.tol.addEventListener("change", () => { st.tol = Number(E.tol.value); st.cut = null; draw(); });
  E.feather.addEventListener("change", () => { st.feather = Number(E.feather.value); st.cut = null; draw(); });
  E.bsize.addEventListener("input", () => { st.bsize = Number(E.bsize.value); });
  E.outline.addEventListener("change", () => { st.outline = E.outline.checked; draw(); });
  E.ow.addEventListener("input", () => { st.ow = Number(E.ow.value); draw(); });
  E.text.addEventListener("input", () => { st.text = E.text.value; draw(); });
  E.label.addEventListener("input", () => { st.label = E.label.value; draw(); });
  E.size.addEventListener("input", () => { st.size = Number(E.size.value); E.sizeV.textContent = st.size ? st.size : t("st_auto"); draw(); });
  E.color.addEventListener("input", () => { st.color = E.color.value; draw(); });
  E.accent.addEventListener("input", () => { st.accent = E.accent.value; draw(); thumbs(); });
  E.out.addEventListener("change", () => { st.out = Number(E.out.value); });
  let drag = null;
  const local = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * PREVIEW / r.width, (e.clientY - r.top) * PREVIEW / r.height]; };
  cv.addEventListener("pointerdown", (e) => {
    if (!st.img) return; cv.setPointerCapture(e.pointerId);
    if (st.shape === "cut" && st.brush !== "off") { const [px, py] = local(e); brushAt(px, py); draw(); drag = { brush: true }; return; }
    drag = { x: e.clientX, y: e.clientY, ox: st.ox, oy: st.oy };
  });
  cv.addEventListener("pointermove", (e) => {
    if (!drag) return;
    if (drag.brush) { const [px, py] = local(e); brushAt(px, py); draw(); return; }
    st.ox = drag.ox + (e.clientX - drag.x) / PREVIEW; st.oy = drag.oy + (e.clientY - drag.y) / PREVIEW; draw();
  });
  cv.addEventListener("pointerup", () => { drag = null; }); cv.addEventListener("pointercancel", () => { drag = null; });
  cv.addEventListener("wheel", (e) => { if (!st.img) return; e.preventDefault(); st.zoom = Math.min(4, Math.max(1, st.zoom * (e.deltaY < 0 ? 1.08 : 0.92))); E.zoom.value = Math.round(st.zoom * 100); draw(); }, { passive: false });

  /* ── export + pack ── */
  async function exportBlob() {
    await document.fonts.load("900 40px Unbounded").catch(() => {}); await document.fonts.load("800 40px Manrope").catch(() => {});
    return new Promise((res) => render(st.out, true).toBlob(res, "image/png"));
  }
  function download(blob, name) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
  function report(blob) { const kb = Math.round(blob.size / 1024); E.status.textContent = st.out === 512 && kb > 512 ? t("st_big", kb) : t("st_ready", kb); }
  $("#st-dl").addEventListener("click", async () => { if (!st.img) return; const b = await exportBlob(); download(b, "sticker.png"); report(b); });
  $("#st-add").addEventListener("click", async () => {
    if (!st.img) return; const b = await exportBlob(); const url = URL.createObjectURL(b);
    st.pack.push({ blob: b, url }); report(b); labels(); renderPack();
  });
  function renderPack() {
    E.pack.innerHTML = st.pack.map((p, i) => '<div class="st-item"><img src="' + p.url + '" alt=""><button type="button" class="link" data-rm="' + i + '">' + t("st_remove") + "</button></div>").join("");
    E.packN.textContent = st.pack.length ? t("st_added", st.pack.length) : ""; E.packEmpty.hidden = st.pack.length > 0;
  }
  E.pack.addEventListener("click", (e) => { const b = e.target.closest("[data-rm]"); if (!b) return; URL.revokeObjectURL(st.pack[Number(b.dataset.rm)].url); st.pack.splice(Number(b.dataset.rm), 1); renderPack(); });
  $("#st-pack-dl").addEventListener("click", async () => {
    if (!st.pack.length || !window.JSZip) return; const zip = new JSZip();
    st.pack.forEach((p, i) => zip.file("sticker-" + String(i + 1).padStart(2, "0") + ".png", p.blob));
    download(await zip.generateAsync({ type: "blob" }), "sticker-pack.zip");
  });
  $("#st-pack-clear").addEventListener("click", () => { st.pack.forEach((p) => URL.revokeObjectURL(p.url)); st.pack = []; renderPack(); });

  applyLang(); draw();
})();
