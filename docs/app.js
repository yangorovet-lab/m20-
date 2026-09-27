(function () {
  "use strict";
  const CFG = window.LISTAI_CONFIG || {};
  const $ = (s) => document.querySelector(s);

  /* ───────── i18n ───────── */
  const I18N = {
    ru: {
      brand: "Листай", h1: "Карусель из текста за минуту",
      lead: "Вставьте текст поста, выберите тему и скачайте готовые PNG-слайды для Instagram, Telegram, LinkedIn и VK. Без регистрации, всё считается в браузере.",
      text_label: "Текст карусели", text_hint: "Пустая строка — новый слайд. Первая строка слайда — заголовок. Строки с «- » становятся списком.",
      handle_label: "Подпись / @ник", format_label: "Формат", theme_label: "Тема", cta_label: "Текст на последнем слайде",
      opt_num: "Нумерация", opt_arrow: "Стрелка «листай»", opt_cover: "Первый слайд — обложка",
      btn_zip: "Скачать все (ZIP)", btn_sample: "Пример", preview: "Предпросмотр", how: "Как это работает",
      s1t: "1. Вставьте текст", s1p: "Пост, заметку из Telegram, тезисы из поста в LinkedIn. Слайды разделяются пустой строкой.",
      s2t: "2. Выберите тему и формат", s2p: "Шесть тем и три формата. Размер шрифта подбирается автоматически под объём текста.",
      s3t: "3. Скачайте PNG", s3p: "Все слайды одним архивом в 1080 px. Ничего не загружается на сервер: файлы собираются в вашем браузере.",
      q1: "Это бесплатно?", a1: "Да. Бесплатная версия делает карусели без ограничений по количеству. Pro убирает водяной знак и открывает дополнительные темы.",
      q2: "Куда попадает мой текст?", a2: "Никуда. Картинки собираются прямо в браузере, на сервер ничего не отправляется.",
      q3: "Какие форматы подходят для Telegram?", a3: "Для альбомов в Telegram лучше 1:1 или 4:5. Для сторис и Shorts — 9:16.",
      q4: "Можно ли использовать слайды в коммерческих целях?", a4: "Да, всё что вы сделали — ваше. Ссылка на сервис не обязательна.",
      foot: "Работает в браузере · без регистрации",
      swipe: "Листай", cta_default: "Сохрани, чтобы не потерять", counting: (n) => n === 1 ? "1 слайд" : (n >= 2 && n <= 4 ? n + " слайда" : n + " слайдов"),
      empty: "Введите текст — слайды появятся здесь.", rendering: (i, n) => "Собираю слайд " + i + " из " + n + "…", done: "Готово: архив скачан.",
      err_font: "Не удалось собрать картинку. Обновите страницу и попробуйте ещё раз.",
      pro_btn: (p) => "Pro · " + p, pro_title: "Листай Pro", pro_lead: "Разовая оплата, навсегда, без подписки.",
      pro_f1: "Без водяного знака", pro_f2: "Все темы, включая закрытые", pro_f3: "Все будущие темы и форматы",
      pro_buy: (p) => "Купить за " + p, pro_have: "Уже есть ключ", act_title: "Активация Pro", act_lead: "Введите e-mail, на который оформлена покупка, и ключ из письма.",
      act_email: "E-mail", act_key: "Ключ", act_btn: "Активировать", act_bad: "Ключ не подходит к этому e-mail. Проверьте написание.", act_ok: "Pro активирован. Спасибо!",
      act_contact: (c) => "Вопросы по ключу: " + c, locked: "Эта тема доступна в Pro.", lock: "PRO",
      sample: "5 ошибок в постах, из-за которых вас не читают\nи как их исправить за один вечер\n\nОшибка 1. Нет обещания\nЧитатель за 2 секунды решает, листать дальше или нет. Заголовок должен обещать конкретную пользу.\n\nОшибка 2. Стена текста\n- абзацы по 2–3 строки\n- один тезис на абзац\n- списки вместо перечислений через запятую\n\nОшибка 3. Нет примера\nЛюбой совет без примера — это просто мнение. Покажите «было → стало».\n\nОшибка 4. Нет вывода\nПоследний слайд отвечает на вопрос «и что теперь делать?».\n\nОшибка 5. Нет призыва\nПопросите сохранить, поделиться или написать в комментариях. Люди делают то, о чём их просят."
    },
    en: {
      brand: "Listai", h1: "Text to carousel in a minute",
      lead: "Paste your post, pick a theme and download ready PNG slides for Instagram, Telegram, LinkedIn and X. No sign-up, everything runs in your browser.",
      text_label: "Carousel text", text_hint: "Blank line starts a new slide. First line of a slide is its heading. Lines starting with “- ” become a list.",
      handle_label: "Signature / @handle", format_label: "Format", theme_label: "Theme", cta_label: "Last slide text",
      opt_num: "Numbering", opt_arrow: "Swipe arrow", opt_cover: "First slide is a cover",
      btn_zip: "Download all (ZIP)", btn_sample: "Example", preview: "Preview", how: "How it works",
      s1t: "1. Paste text", s1p: "A post, a Telegram note, the key points of a LinkedIn article. Slides are separated by a blank line.",
      s2t: "2. Pick a theme and format", s2p: "Six themes and three formats. Font size adapts to the amount of text.",
      s3t: "3. Download PNG", s3p: "All slides in one archive at 1080 px. Nothing is uploaded: files are built in your browser.",
      q1: "Is it free?", a1: "Yes. The free version has no limit on the number of carousels. Pro removes the watermark and unlocks extra themes.",
      q2: "Where does my text go?", a2: "Nowhere. Images are rendered in your browser; nothing is sent to a server.",
      q3: "Which format works for Telegram?", a3: "For Telegram albums use 1:1 or 4:5. For stories and Shorts use 9:16.",
      q4: "Can I use the slides commercially?", a4: "Yes. Everything you make is yours. No attribution required.",
      foot: "Runs in your browser · no sign-up",
      swipe: "Swipe", cta_default: "Save this for later", counting: (n) => n + (n === 1 ? " slide" : " slides"),
      empty: "Type some text and slides will appear here.", rendering: (i, n) => "Rendering slide " + i + " of " + n + "…", done: "Done: archive downloaded.",
      err_font: "Could not render the image. Reload the page and try again.",
      pro_btn: (p) => "Pro · " + p, pro_title: "Listai Pro", pro_lead: "One-time payment, forever, no subscription.",
      pro_f1: "No watermark", pro_f2: "All themes, including locked ones", pro_f3: "All future themes and formats",
      pro_buy: (p) => "Buy for " + p, pro_have: "I have a key", act_title: "Activate Pro", act_lead: "Enter the e-mail you used to purchase and the key from the e-mail.",
      act_email: "E-mail", act_key: "Key", act_btn: "Activate", act_bad: "This key does not match the e-mail. Check the spelling.", act_ok: "Pro activated. Thank you!",
      act_contact: (c) => "Questions about your key: " + c, locked: "This theme is available in Pro.", lock: "PRO",
      sample: "5 reasons nobody reads your posts\nand how to fix them in one evening\n\nMistake 1. No promise\nA reader decides in 2 seconds whether to keep going. The headline must promise a concrete benefit.\n\nMistake 2. Wall of text\n- paragraphs of 2–3 lines\n- one idea per paragraph\n- lists instead of comma chains\n\nMistake 3. No example\nAdvice without an example is just an opinion. Show “before → after”.\n\nMistake 4. No takeaway\nThe last slide answers “so what do I do now?”.\n\nMistake 5. No ask\nAsk people to save, share or comment. People do what they are asked to."
    }
  };
  let lang = "ru";
  try { lang = localStorage.getItem("listai.lang") || (navigator.language.startsWith("ru") ? "ru" : "en"); } catch (e) {}
  const t = (k, ...a) => { const v = I18N[lang][k]; return typeof v === "function" ? v(...a) : (v == null ? k : v); };

  /* ───────── themes ───────── */
  const THEMES = [
    { id: "coal", name: { ru: "Уголь", en: "Coal" }, sw: "background:#0d0d0f;color:#f5f5f2" },
    { id: "paper", name: { ru: "Бумага", en: "Paper" }, sw: "background:#f7f4ec;color:#1b1a17;font-family:'Playfair Display',serif" },
    { id: "mint", name: { ru: "Мята", en: "Mint" }, sw: "background:#d9f4e6;color:#0b3d2e" },
    { id: "neon", name: { ru: "Неон", en: "Neon" }, sw: "background:#0b1020;color:#c7ff3d" },
    { id: "sunset", name: { ru: "Закат", en: "Sunset" }, sw: "background:linear-gradient(160deg,#ff7a45,#ff2e88);color:#fff" },
    { id: "plex", name: { ru: "Плекс", en: "Plex" }, sw: "background:#fff;color:#1d4ed8;font-family:'IBM Plex Mono',monospace" }
  ];
  const monetized = !!(CFG.payUrl && CFG.payUrl.trim());
  const proThemes = new Set(monetized ? (CFG.proThemes || []) : []);

  /* ───────── state ───────── */
  const state = { theme: "coal", format: "1080x1350", pro: false };
  try { const s = JSON.parse(localStorage.getItem("listai.pro") || "null"); if (s && s.email && s.key) state.pro = true; state._lic = s; } catch (e) {}
  const els = {
    text: $("#text"), handle: $("#handle"), format: $("#format"), cta: $("#cta"), themes: $("#themes"),
    num: $("#opt-num"), arrow: $("#opt-arrow"), cover: $("#opt-cover"), grid: $("#grid"), count: $("#count"),
    status: $("#status"), zip: $("#btn-zip"), sample: $("#btn-sample"), stage: $("#export-stage"),
    proBtn: $("#btn-pro"), proBadge: $("#pro-badge"), modal: $("#modal-root")
  };

  /* ───────── parsing ───────── */
  function parseSlides(text) {
    const blocks = text.replace(/\r/g, "").split(/\n[ \t]*\n+|^\s*---\s*$/m).map((b) => b.trim()).filter(Boolean);
    return blocks.map((b) => {
      const lines = b.split("\n");
      return { title: lines[0].replace(/^#+\s*/, "").trim(), body: lines.slice(1).join("\n").trim() };
    });
  }
  function esc(s) { return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function bodyHtml(body) {
    if (!body) return "";
    const lines = body.split("\n");
    let out = "", list = [];
    const flush = () => { if (list.length) { out += "<ul>" + list.map((l) => "<li>" + esc(l) + "</li>").join("") + "</ul>"; list = []; } };
    for (const raw of lines) {
      const m = raw.match(/^\s*[-•*]\s+(.*)$/);
      if (m) list.push(m[1]); else { flush(); out += (out && !out.endsWith("</ul>") ? "\n" : "") + esc(raw); }
    }
    flush();
    return out;
  }

  /* ───────── slide DOM ───────── */
  function dims() { const [w, h] = state.format.split("x").map(Number); return { w, h }; }
  function sizes(slide, isCover, h) {
    const tl = slide.title.length, bl = slide.body.length;
    let tt = isCover ? (tl > 70 ? 60 : tl > 40 ? 72 : 88) : (tl > 80 ? 46 : tl > 45 ? 54 : 64);
    let bb = bl > 700 ? 28 : bl > 450 ? 32 : bl > 250 ? 36 : 40;
    if (h < 1200) { tt *= 0.88; bb *= 0.9; }
    return { tt: Math.round(tt), bb: Math.round(bb) };
  }
  function buildSlide(slide, i, n, opts) {
    const { w, h } = dims();
    const isCover = opts.cover && i === 0;
    const isLast = i === n - 1;
    const { tt, bb } = sizes(slide, isCover, h);
    const el = document.createElement("div");
    el.className = "slide t-" + state.theme + (isCover ? " cover" : "");
    el.style.cssText = "width:" + w + "px;height:" + h + "px;--t:" + tt + "px;--b:" + bb + "px";
    const handle = esc(opts.handle || "");
    const num = opts.num ? (i + 1) + "/" + n : "";
    const hint = isLast ? esc(opts.cta || "") : (opts.arrow ? t("swipe") + " →" : "");
    el.innerHTML =
      '<div class="s-bar"></div>' +
      '<div class="s-top"><span class="s-handle">' + handle + '</span><span class="s-num">' + num + "</span></div>" +
      '<div class="s-main"><h2 class="s-title">' + esc(slide.title) + "</h2>" + (slide.body ? '<div class="s-body">' + bodyHtml(slide.body) + "</div>" : "") + "</div>" +
      '<div class="s-bot"><span class="s-hint">' + hint + "</span></div>" +
      (opts.watermark ? '<div class="s-wm">' + esc(opts.watermark) + "</div>" : "");
    return el;
  }
  function options() {
    return {
      handle: els.handle.value.trim(), cta: els.cta.value.trim() || t("cta_default"),
      num: els.num.checked, arrow: els.arrow.checked, cover: els.cover.checked,
      watermark: monetized && !state.pro ? (CFG.watermark || "listai") : ""
    };
  }

  /* ───────── preview ───────── */
  let slides = [];
  function render() {
    slides = parseSlides(els.text.value);
    const opts = options();
    const { w, h } = dims();
    els.grid.innerHTML = "";
    els.count.textContent = slides.length ? t("counting", slides.length) : "";
    if (!slides.length) { els.grid.innerHTML = '<p class="status">' + t("empty") + "</p>"; els.zip.disabled = true; return; }
    els.zip.disabled = false;
    slides.forEach((s, i) => {
      const th = document.createElement("div");
      th.className = "thumb"; th.style.aspectRatio = w + "/" + h;
      const stage = document.createElement("div"); stage.className = "stage";
      stage.appendChild(buildSlide(s, i, slides.length, opts));
      th.appendChild(stage);
      const dl = document.createElement("button"); dl.type = "button"; dl.className = "dl"; dl.textContent = "PNG";
      dl.addEventListener("click", () => exportOne(i));
      th.appendChild(dl);
      els.grid.appendChild(th);
    });
    fit();
  }
  function fit() {
    const { w } = dims();
    els.grid.querySelectorAll(".thumb").forEach((th) => {
      const k = th.clientWidth / w;
      th.querySelector(".stage").style.transform = "scale(" + k + ")";
    });
  }
  window.addEventListener("resize", fit);

  /* ───────── export ───────── */
  function locked() { return proThemes.has(state.theme) && !state.pro; }
  async function renderPng(i) {
    const opts = options();
    const el = buildSlide(slides[i], i, slides.length, opts);
    els.stage.innerHTML = ""; els.stage.appendChild(el);
    await document.fonts.ready;
    const { w, h } = dims();
    const canvas = await html2canvas(el, { scale: 1, width: w, height: h, backgroundColor: null, logging: false });
    els.stage.innerHTML = "";
    return new Promise((res) => canvas.toBlob(res, "image/png"));
  }
  function save(blob, name) {
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  function status(msg, err) { els.status.textContent = msg; els.status.classList.toggle("err", !!err); }
  async function exportOne(i) {
    if (locked()) return openPro(t("locked"));
    try { status(t("rendering", i + 1, slides.length)); save(await renderPng(i), "slide-" + String(i + 1).padStart(2, "0") + ".png"); status(""); }
    catch (e) { console.error(e); status(t("err_font"), true); }
  }
  async function exportZip() {
    if (!slides.length) return;
    if (locked()) return openPro(t("locked"));
    els.zip.disabled = true;
    try {
      const zip = new JSZip();
      for (let i = 0; i < slides.length; i++) { status(t("rendering", i + 1, slides.length)); zip.file("slide-" + String(i + 1).padStart(2, "0") + ".png", await renderPng(i)); }
      save(await zip.generateAsync({ type: "blob" }), "carousel.zip");
      status(t("done"));
    } catch (e) { console.error(e); status(t("err_font"), true); }
    els.zip.disabled = false;
  }

  /* ───────── Pro / licensing ───────── */
  async function keyFor(email) {
    const data = new TextEncoder().encode(email.trim().toLowerCase() + ":" + (CFG.licenseSecret || ""));
    const buf = await crypto.subtle.digest("SHA-256", data);
    const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 16).toUpperCase();
    return hex.match(/.{4}/g).join("-");
  }
  function closeModal() { els.modal.innerHTML = ""; }
  function openPro(note) {
    const p = CFG.priceLabel || "$9";
    els.modal.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true"><div class="box">' +
      '<button class="close" type="button" aria-label="Close">×</button>' +
      "<h3>" + esc(t("pro_title")) + "</h3>" + (note ? "<p><b>" + esc(note) + "</b></p>" : "") +
      "<p>" + esc(t("pro_lead")) + "</p><ul><li>" + esc(t("pro_f1")) + "</li><li>" + esc(t("pro_f2")) + "</li><li>" + esc(t("pro_f3")) + "</li></ul>" +
      '<a class="btn primary" href="' + esc(CFG.payUrl) + '" target="_blank" rel="noopener">' + esc(t("pro_buy", p)) + "</a>" +
      '<button class="btn ghost" type="button" id="m-have">' + esc(t("pro_have")) + "</button></div></div>";
    els.modal.querySelector(".close").onclick = closeModal;
    els.modal.querySelector(".modal").addEventListener("click", (e) => { if (e.target === e.currentTarget) closeModal(); });
    els.modal.querySelector("#m-have").onclick = openActivate;
  }
  function openActivate() {
    els.modal.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true"><div class="box">' +
      '<button class="close" type="button" aria-label="Close">×</button>' +
      "<h3>" + esc(t("act_title")) + "</h3><p>" + esc(t("act_lead")) + "</p>" +
      '<div class="field"><label for="m-email">' + esc(t("act_email")) + '</label><input type="email" id="m-email"></div>' +
      '<div class="field"><label for="m-key">' + esc(t("act_key")) + '</label><input type="text" id="m-key" placeholder="XXXX-XXXX-XXXX-XXXX"></div>' +
      '<button class="btn primary" type="button" id="m-act">' + esc(t("act_btn")) + "</button>" +
      '<div class="status" id="m-status"></div>' + (CFG.contact ? "<p>" + esc(t("act_contact", CFG.contact)) + "</p>" : "") + "</div></div>";
    els.modal.querySelector(".close").onclick = closeModal;
    els.modal.querySelector("#m-act").onclick = async () => {
      const email = els.modal.querySelector("#m-email").value, key = els.modal.querySelector("#m-key").value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      const st = els.modal.querySelector("#m-status");
      if ((await keyFor(email)).replace(/-/g, "") === key && key.length === 16) {
        state.pro = true; try { localStorage.setItem("listai.pro", JSON.stringify({ email, key })); } catch (e) {}
        st.textContent = t("act_ok"); st.classList.remove("err"); setTimeout(() => { closeModal(); applyPro(); render(); }, 900);
      } else { st.textContent = t("act_bad"); st.classList.add("err"); }
    };
  }
  async function verifyStored() {
    if (!state._lic) return;
    try { if ((await keyFor(state._lic.email)) !== state._lic.key.toUpperCase()) { state.pro = false; localStorage.removeItem("listai.pro"); } }
    catch (e) { state.pro = false; }
  }
  function applyPro() {
    els.proBadge.hidden = !(monetized && state.pro);
    els.proBtn.hidden = !(monetized && !state.pro);
    els.proBtn.textContent = t("pro_btn", CFG.priceLabel || "$9");
    renderThemes();
  }

  /* ───────── UI wiring ───────── */
  function renderThemes() {
    els.themes.innerHTML = "";
    THEMES.forEach((th) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "theme"; b.setAttribute("aria-pressed", String(th.id === state.theme));
      b.innerHTML = '<span class="sw" style="' + th.sw + '">' + esc(th.name[lang]) + "</span>" + (proThemes.has(th.id) && !state.pro ? '<span class="lock">' + t("lock") + "</span>" : "");
      b.addEventListener("click", () => { state.theme = th.id; try { localStorage.setItem("listai.theme", th.id); } catch (e) {} renderThemes(); render(); });
      els.themes.appendChild(b);
    });
  }
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    els.cta.placeholder = t("cta_default");
    applyPro(); render();
  }
  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    const wasSample = els.text.value === I18N[lang].sample;
    lang = b.dataset.lang; try { localStorage.setItem("listai.lang", lang); } catch (e) {}
    if (wasSample) els.text.value = I18N[lang].sample;
    applyLang();
  }));
  let timer;
  ["input", "change"].forEach((ev) => $("#form").addEventListener(ev, (e) => {
    if (e.target === els.format) state.format = els.format.value;
    clearTimeout(timer); timer = setTimeout(render, 120);
  }));
  $("#form").addEventListener("submit", (e) => e.preventDefault());
  els.zip.addEventListener("click", exportZip);
  els.sample.addEventListener("click", () => { els.text.value = I18N[lang].sample; render(); });
  els.proBtn.addEventListener("click", () => openPro());
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ───────── demo notice (hosted preview, downloads disabled there) ───────── */
  if (/claude/i.test(location.hostname)) {
    const n = document.createElement("p"); n.className = "status";
    n.style.cssText = "margin:0 0 12px;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--panel)";
    n.textContent = lang === "ru" ? "Это демо-версия для просмотра. Скачивание PNG работает на основном сайте: yangorovet-lab.github.io/m20-" : "Preview copy. PNG download works on the main site: yangorovet-lab.github.io/m20-";
    document.querySelector(".hero").appendChild(n);
  }

  /* ───────── boot ───────── */
  try { const th = localStorage.getItem("listai.theme"); if (th && THEMES.some((x) => x.id === th)) state.theme = th; } catch (e) {}
  if (!els.text.value.trim()) els.text.value = I18N[lang].sample;
  verifyStored().finally(applyLang);
  document.fonts.ready.then(fit);
})();
