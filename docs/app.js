(function () {
  "use strict";
  const CFG = window.LISTAI_CONFIG || {};
  const $ = (s) => document.querySelector(s);

  /* ───────── i18n ───────── */
  const I18N = {
    ru: {
      brand: "Листай", h1: "Карусель из текста за минуту",
      lead: "Вставьте текст поста, выберите тему и скачайте готовые слайды для Instagram, Telegram, LinkedIn и VK. Без регистрации, всё считается в браузере.",
      text_label: "Текст карусели", text_hint: "Пустая строка — новый слайд. Первая строка слайда — заголовок. «- » в начале строки — список. ==слово== выделит цветом, **слово** сделает жирным.",
      tpl_pick: "Шаблон структуры…", tpl_list: "Список: N ошибок / советов", tpl_howto: "Инструкция по шагам", tpl_myths: "Мифы и факты", tpl_story: "История: было → стало", tpl_quotes: "Цитаты и тезисы",
      handle_label: "@ник", format_label: "Формат", theme_label: "Тема", cta_label: "Текст на последнем слайде",
      g_brand: "Цвета и шрифты", c_bg: "Фон", c_ink: "Текст", c_accent: "Акцент", font_label: "Шрифты", font_theme: "Как в теме", pattern_label: "Узор фона",
      pat_none: "Нет", pat_dots: "Точки", pat_grid: "Сетка", pat_lines: "Штриховка", al_left: "Текст слева", al_center: "По центру", brand_reset: "Сбросить цвета",
      g_author: "Автор и логотип", name_label: "Имя автора", avatar_label: "Аватар", author_hint: "Аватар и имя появятся в шапке слайдов и на последнем слайде в карточке «Подписаться».",
      logo_label: "Логотип на всех слайдах", logo_upload: "Загрузить", remove: "Убрать", lp_tl: "Сверху слева", lp_tr: "Сверху справа", lp_bl: "Снизу слева", lp_br: "Снизу справа",
      logo_hint: "PNG с прозрачным фоном смотрится лучше всего. Картинку на конкретный слайд добавляют в редакторе: нажмите на слайд в предпросмотре.",
      opt_num: "Нумерация", opt_arrow: "Стрелка «листай»", opt_cover: "Первый слайд — обложка",
      btn_zip: "Скачать PNG (ZIP)", btn_pdf: "PDF для LinkedIn", btn_sample: "Пример", btn_save: "Сохранить проект", btn_open: "Открыть проект", btn_clear: "Очистить",
      preview: "Предпросмотр", how: "Как это работает",
      s1t: "1. Вставьте текст", s1p: "Пост, заметку из Telegram, тезисы из поста в LinkedIn. Слайды разделяются пустой строкой.",
      s2t: "2. Настройте слайды", s2p: "Шесть тем, свои цвета и шрифты, логотип, аватар. Нажмите на слайд, чтобы добавить картинку, подвинуть и растянуть её или сделать фоном.",
      s3t: "3. Скачайте PNG или PDF", s3p: "PNG-архив для Instagram, Telegram и VK, PDF-документ для LinkedIn. Ничего не загружается на сервер: файлы собираются в вашем браузере.",
      q1: "Это бесплатно?", a1: "Да. Бесплатная версия делает карусели без ограничений по количеству. Pro убирает водяной знак, открывает дополнительные темы и экспорт в PDF.",
      q2: "Куда попадает мой текст?", a2: "Никуда. Картинки собираются прямо в браузере, на сервер ничего не отправляется. Черновик хранится в вашем браузере.",
      q3: "Какие форматы подходят для Telegram и LinkedIn?", a3: "Для альбомов в Telegram лучше 1:1 или 4:5. Для сторис и Shorts — 9:16. LinkedIn принимает карусели только документом: нажмите «PDF для LinkedIn» и загрузите файл как документ в пост.",
      q4: "Можно ли использовать слайды в коммерческих целях?", a4: "Да, всё что вы сделали — ваше. Ссылка на сервис не обязательна.",
      foot: "Работает в браузере · без регистрации",
      swipe: "Листай", follow: "Подписаться", cta_default: "Сохрани, чтобы не потерять", counting: (n) => n === 1 ? "1 слайд" : (n >= 2 && n <= 4 ? n + " слайда" : n + " слайдов"),
      empty: "Введите текст — слайды появятся здесь.", rendering: (i, n) => "Собираю слайд " + i + " из " + n + "…", done: "Готово: архив скачан.", done_pdf: "Готово: PDF скачан. Загрузите его в LinkedIn как документ.",
      err_font: "Не удалось собрать картинку. Обновите страницу и попробуйте ещё раз.", saved: "Проект сохранён в файл.", opened: "Проект открыт.", err_open: "Это не файл проекта Листай.", cleared: "Очищено.",
      pro_btn: (p) => "Pro · " + p, pro_title: "Листай Pro", pro_lead: "Разовая оплата, навсегда, без подписки.",
      pro_f1: "Без водяного знака", pro_f2: "Все темы, включая закрытые", pro_f3: "Экспорт в PDF для LinkedIn", pro_f4: "Все будущие темы и форматы",
      pro_buy: (p) => "Купить за " + p, pro_have: "Уже есть ключ", act_title: "Активация Pro", act_lead: "Введите e-mail, на который оформлена покупка, и ключ из письма.",
      act_email: "E-mail", act_key: "Ключ", act_btn: "Активировать", act_bad: "Ключ не подходит к этому e-mail. Проверьте написание.", act_ok: "Pro активирован. Спасибо!",
      act_contact: (c) => "Вопросы по ключу: " + c, locked: "Эта тема доступна в Pro.", locked_pdf: "Экспорт в PDF доступен в Pro.", lock: "PRO",
      edit: "Редактор", ed_title: (i) => "Слайд " + i, ed_upload: "Добавить картинку", ed_replace: "Заменить картинку", ed_mode: "Размещение", ed_free: "Свободно", ed_bg: "Фоном",
      ed_size: "Размер", ed_dim: "Затемнение фона", ed_round: "Скруглить углы", ed_textpos: "Положение текста", tp_top: "Сверху", tp_middle: "По центру", tp_bottom: "Снизу",
      ed_hint: "Тяните картинку, чтобы подвинуть. Кружок в углу меняет размер.", ed_done: "Готово", ed_img_err: "Не удалось прочитать файл. Нужна картинка PNG, JPG или WebP.",
      ed_ttl: "Заголовок", ed_body: "Текст", ed_prev: "← Раньше", ed_next: "Позже →", ed_dup: "Дублировать", ed_del: "Удалить слайд",
      sample: "5 ошибок в постах, из-за которых вас ==не читают==\nи как их исправить за один вечер\n\nОшибка 1. Нет обещания\nЧитатель за **2 секунды** решает, листать дальше или нет. Заголовок должен обещать конкретную пользу.\n\nОшибка 2. Стена текста\n- абзацы по 2–3 строки\n- один тезис на абзац\n- списки вместо перечислений через запятую\n\nОшибка 3. Нет примера\nЛюбой совет без примера — это просто мнение. Покажите «было → стало».\n\nОшибка 4. Нет вывода\nПоследний слайд отвечает на вопрос «и что теперь делать?».\n\nОшибка 5. Нет призыва\nПопросите ==сохранить==, поделиться или написать в комментариях. Люди делают то, о чём их просят.",
      tpls: {
        list: "5 ошибок, которые ==мешают== [результат]\nи как их исправить\n\nОшибка 1. [Название]\n[Почему это плохо и что делать вместо]\n\nОшибка 2. [Название]\n[Почему это плохо и что делать вместо]\n\nОшибка 3. [Название]\n[Почему это плохо и что делать вместо]\n\nОшибка 4. [Название]\n[Почему это плохо и что делать вместо]\n\nОшибка 5. [Название]\n[Почему это плохо и что делать вместо]\n\nИтог\n[Одна мысль, которую нужно запомнить]",
        howto: "Как [сделать X] за [время]\nПошагово, без воды\n\nШаг 1. [Действие]\n[Что именно сделать и на что обратить внимание]\n\nШаг 2. [Действие]\n[Что именно сделать]\n\nШаг 3. [Действие]\n[Что именно сделать]\n\nШаг 4. [Действие]\n[Что именно сделать]\n\nЧто получится\n[Результат и как его проверить]",
        myths: "5 мифов о [тема]\nв которые до сих пор верят\n\nМиф 1. [Утверждение]\n**Факт:** [как на самом деле]\n\nМиф 2. [Утверждение]\n**Факт:** [как на самом деле]\n\nМиф 3. [Утверждение]\n**Факт:** [как на самом деле]\n\nМиф 4. [Утверждение]\n**Факт:** [как на самом деле]\n\nМиф 5. [Утверждение]\n**Факт:** [как на самом деле]",
        story: "Как я [результат] за [срок]\nЧестная история без прикрас\n\nБыло\n[Точка А: цифры, состояние, проблема]\n\nЧто мешало\n[Главное препятствие]\n\nЧто изменил\n- [решение 1]\n- [решение 2]\n- [решение 3]\n\nСтало\n[Точка Б: цифры, состояние]\n\nВывод\n[Что бы посоветовал себе в начале]",
        quotes: "[Тема] в 5 тезисах\nСохраните, чтобы перечитать\n\n1\n«[Тезис или цитата]»\n\n2\n«[Тезис или цитата]»\n\n3\n«[Тезис или цитата]»\n\n4\n«[Тезис или цитата]»\n\n5\n«[Тезис или цитата]»"
      }
    },
    en: {
      brand: "Listai", h1: "Text to carousel in a minute",
      lead: "Paste your post, pick a theme and download ready slides for Instagram, Telegram, LinkedIn and X. No sign-up, everything runs in your browser.",
      text_label: "Carousel text", text_hint: "Blank line starts a new slide. First line of a slide is its heading. “- ” starts a list item. ==word== highlights, **word** makes bold.",
      tpl_pick: "Structure template…", tpl_list: "List: N mistakes / tips", tpl_howto: "Step-by-step guide", tpl_myths: "Myths vs facts", tpl_story: "Story: before → after", tpl_quotes: "Quotes and takeaways",
      handle_label: "@handle", format_label: "Format", theme_label: "Theme", cta_label: "Last slide text",
      g_brand: "Colors and fonts", c_bg: "Background", c_ink: "Text", c_accent: "Accent", font_label: "Fonts", font_theme: "Theme default", pattern_label: "Background pattern",
      pat_none: "None", pat_dots: "Dots", pat_grid: "Grid", pat_lines: "Hatch", al_left: "Left aligned", al_center: "Centered", brand_reset: "Reset colors",
      g_author: "Author and logo", name_label: "Author name", avatar_label: "Avatar", author_hint: "Avatar and name appear in the slide header and in a “Follow” card on the last slide.",
      logo_label: "Logo on every slide", logo_upload: "Upload", remove: "Remove", lp_tl: "Top left", lp_tr: "Top right", lp_bl: "Bottom left", lp_br: "Bottom right",
      logo_hint: "A PNG with a transparent background looks best. To add an image to one slide, open the editor: click the slide in the preview.",
      opt_num: "Numbering", opt_arrow: "Swipe arrow", opt_cover: "First slide is a cover",
      btn_zip: "Download PNG (ZIP)", btn_pdf: "PDF for LinkedIn", btn_sample: "Example", btn_save: "Save project", btn_open: "Open project", btn_clear: "Clear",
      preview: "Preview", how: "How it works",
      s1t: "1. Paste text", s1p: "A post, a Telegram note, the key points of a LinkedIn article. Slides are separated by a blank line.",
      s2t: "2. Set up the slides", s2p: "Six themes, your own colors and fonts, logo, avatar. Click a slide to add an image, drag and resize it, or use it as a background.",
      s3t: "3. Download PNG or PDF", s3p: "A PNG archive for Instagram, Telegram and X, a PDF document for LinkedIn. Nothing is uploaded: files are built in your browser.",
      q1: "Is it free?", a1: "Yes. The free version has no limit on the number of carousels. Pro removes the watermark and unlocks extra themes and PDF export.",
      q2: "Where does my text go?", a2: "Nowhere. Images are rendered in your browser; nothing is sent to a server. Your draft is kept in your browser.",
      q3: "Which format works for Telegram and LinkedIn?", a3: "For Telegram albums use 1:1 or 4:5. For stories and Shorts use 9:16. LinkedIn accepts carousels only as a document: click “PDF for LinkedIn” and upload the file as a document post.",
      q4: "Can I use the slides commercially?", a4: "Yes. Everything you make is yours. No attribution required.",
      foot: "Runs in your browser · no sign-up",
      swipe: "Swipe", follow: "Follow", cta_default: "Save this for later", counting: (n) => n + (n === 1 ? " slide" : " slides"),
      empty: "Type some text and slides will appear here.", rendering: (i, n) => "Rendering slide " + i + " of " + n + "…", done: "Done: archive downloaded.", done_pdf: "Done: PDF downloaded. Upload it to LinkedIn as a document.",
      err_font: "Could not render the image. Reload the page and try again.", saved: "Project saved to a file.", opened: "Project opened.", err_open: "This is not a Listai project file.", cleared: "Cleared.",
      pro_btn: (p) => "Pro · " + p, pro_title: "Listai Pro", pro_lead: "One-time payment, forever, no subscription.",
      pro_f1: "No watermark", pro_f2: "All themes, including locked ones", pro_f3: "PDF export for LinkedIn", pro_f4: "All future themes and formats",
      pro_buy: (p) => "Buy for " + p, pro_have: "I have a key", act_title: "Activate Pro", act_lead: "Enter the e-mail you used to purchase and the key from the e-mail.",
      act_email: "E-mail", act_key: "Key", act_btn: "Activate", act_bad: "This key does not match the e-mail. Check the spelling.", act_ok: "Pro activated. Thank you!",
      act_contact: (c) => "Questions about your key: " + c, locked: "This theme is available in Pro.", locked_pdf: "PDF export is available in Pro.", lock: "PRO",
      edit: "Edit", ed_title: (i) => "Slide " + i, ed_upload: "Add image", ed_replace: "Replace image", ed_mode: "Placement", ed_free: "Free", ed_bg: "Background",
      ed_size: "Size", ed_dim: "Darken background", ed_round: "Rounded corners", ed_textpos: "Text position", tp_top: "Top", tp_middle: "Middle", tp_bottom: "Bottom",
      ed_hint: "Drag the image to move it. The corner dot resizes it.", ed_done: "Done", ed_img_err: "Could not read the file. Use a PNG, JPG or WebP image.",
      ed_ttl: "Heading", ed_body: "Text", ed_prev: "← Earlier", ed_next: "Later →", ed_dup: "Duplicate", ed_del: "Delete slide",
      sample: "5 reasons nobody ==reads== your posts\nand how to fix them in one evening\n\nMistake 1. No promise\nA reader decides in **2 seconds** whether to keep going. The headline must promise a concrete benefit.\n\nMistake 2. Wall of text\n- paragraphs of 2–3 lines\n- one idea per paragraph\n- lists instead of comma chains\n\nMistake 3. No example\nAdvice without an example is just an opinion. Show “before → after”.\n\nMistake 4. No takeaway\nThe last slide answers “so what do I do now?”.\n\nMistake 5. No ask\nAsk people to ==save==, share or comment. People do what they are asked to.",
      tpls: {
        list: "5 mistakes that ==hold back== [result]\nand how to fix them\n\nMistake 1. [Name]\n[Why it hurts and what to do instead]\n\nMistake 2. [Name]\n[Why it hurts and what to do instead]\n\nMistake 3. [Name]\n[Why it hurts and what to do instead]\n\nMistake 4. [Name]\n[Why it hurts and what to do instead]\n\nMistake 5. [Name]\n[Why it hurts and what to do instead]\n\nTakeaway\n[The one thing to remember]",
        howto: "How to [do X] in [time]\nStep by step, no fluff\n\nStep 1. [Action]\n[What exactly to do and what to watch for]\n\nStep 2. [Action]\n[What exactly to do]\n\nStep 3. [Action]\n[What exactly to do]\n\nStep 4. [Action]\n[What exactly to do]\n\nWhat you get\n[The result and how to check it]",
        myths: "5 myths about [topic]\npeople still believe\n\nMyth 1. [Claim]\n**Fact:** [what is actually true]\n\nMyth 2. [Claim]\n**Fact:** [what is actually true]\n\nMyth 3. [Claim]\n**Fact:** [what is actually true]\n\nMyth 4. [Claim]\n**Fact:** [what is actually true]\n\nMyth 5. [Claim]\n**Fact:** [what is actually true]",
        story: "How I [result] in [time]\nAn honest story\n\nBefore\n[Point A: numbers, state, problem]\n\nWhat was in the way\n[The main obstacle]\n\nWhat I changed\n- [decision 1]\n- [decision 2]\n- [decision 3]\n\nAfter\n[Point B: numbers, state]\n\nTakeaway\n[What I would tell myself at the start]",
        quotes: "[Topic] in 5 takeaways\nSave to re-read\n\n1\n“[Takeaway or quote]”\n\n2\n“[Takeaway or quote]”\n\n3\n“[Takeaway or quote]”\n\n4\n“[Takeaway or quote]”\n\n5\n“[Takeaway or quote]”"
      }
    }
  };
  let lang = "ru";
  try { lang = localStorage.getItem("listai.lang") || (navigator.language.startsWith("ru") ? "ru" : "en"); } catch (e) {}
  const t = (k, ...a) => { const v = I18N[lang][k]; return typeof v === "function" ? v(...a) : (v == null ? k : v); };

  /* ───────── themes & fonts ───────── */
  const THEMES = [
    { id: "coal", name: { ru: "Уголь", en: "Coal" }, sw: "background:#0d0d0f;color:#f5f5f2", c: ["#0d0d0f", "#f5f5f2", "#22c38a"] },
    { id: "paper", name: { ru: "Бумага", en: "Paper" }, sw: "background:#f7f4ec;color:#1b1a17;font-family:'Playfair Display',serif", c: ["#f7f4ec", "#1b1a17", "#1b1a17"] },
    { id: "mint", name: { ru: "Мята", en: "Mint" }, sw: "background:#d9f4e6;color:#0b3d2e", c: ["#d9f4e6", "#0b3d2e", "#0b3d2e"] },
    { id: "neon", name: { ru: "Неон", en: "Neon" }, sw: "background:#0b1020;color:#c7ff3d", c: ["#0b1020", "#dfe6ff", "#c7ff3d"] },
    { id: "sunset", name: { ru: "Закат", en: "Sunset" }, sw: "background:linear-gradient(160deg,#ff7a45,#ff2e88);color:#fff", c: ["#ff5a66", "#ffffff", "#ffffff"] },
    { id: "plex", name: { ru: "Плекс", en: "Plex" }, sw: "background:#fff;color:#1d4ed8;font-family:'IBM Plex Mono',monospace", c: ["#ffffff", "#0a0a0a", "#1d4ed8"] }
  ];
  const FONTS = {
    unbounded: ["Unbounded", "Manrope"], oswald: ["Oswald", "Manrope"], playfair: ["Playfair Display", "Manrope"], manrope: ["Manrope", "Manrope"], plex: ["IBM Plex Mono", "IBM Plex Mono"]
  };
  const monetized = !!(CFG.payUrl && CFG.payUrl.trim());
  const proThemes = new Set(monetized ? (CFG.proThemes || []) : []);

  /* ───────── state ───────── */
  const state = { theme: "coal", format: "1080x1350", pro: false, extras: {}, logo: null, avatar: null, brand: { bg: "", ink: "", accent: "", font: "" }, pattern: "", align: "left" };
  try { const s = JSON.parse(localStorage.getItem("listai.pro") || "null"); if (s && s.email && s.key) state.pro = true; state._lic = s; } catch (e) {}
  const els = {
    text: $("#text"), handle: $("#handle"), name: $("#name"), format: $("#format"), cta: $("#cta"), themes: $("#themes"), tpl: $("#tpl"),
    num: $("#opt-num"), arrow: $("#opt-arrow"), cover: $("#opt-cover"), grid: $("#grid"), count: $("#count"),
    status: $("#status"), zip: $("#btn-zip"), pdf: $("#btn-pdf"), sample: $("#btn-sample"), stage: $("#export-stage"),
    proBtn: $("#btn-pro"), proBadge: $("#pro-badge"), modal: $("#modal-root"),
    logoFile: $("#logo-file"), logoPos: $("#logo-pos"), logoSize: $("#logo-size"), logoRemove: $("#logo-remove"),
    avatarFile: $("#avatar-file"), avatarRemove: $("#avatar-remove"),
    cBg: $("#c-bg"), cInk: $("#c-ink"), cAccent: $("#c-accent"), font: $("#font"), pattern: $("#pattern"), brandReset: $("#brand-reset"),
    save: $("#btn-save"), open: $("#open-file"), clear: $("#btn-clear")
  };

  /* ───────── parsing / formatting ───────── */
  function parseSlides(text) {
    const blocks = text.replace(/\r/g, "").split(/\n[ \t]*\n+|^\s*---\s*$/m).map((b) => b.trim()).filter(Boolean);
    return blocks.map((b) => {
      const lines = b.split("\n");
      return { title: lines[0].replace(/^#+\s*/, "").trim(), body: lines.slice(1).join("\n").trim() };
    });
  }
  function serialize(list) { return list.map((s) => s.title + (s.body ? "\n" + s.body : "")).join("\n\n"); }
  function esc(s) { return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function fmt(s) { return esc(s).replace(/==(.+?)==/g, "<mark>$1</mark>").replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
  function bodyHtml(body) {
    if (!body) return "";
    const lines = body.split("\n");
    let out = "", list = [];
    const flush = () => { if (list.length) { out += "<ul>" + list.map((l) => "<li>" + fmt(l) + "</li>").join("") + "</ul>"; list = []; } };
    for (const raw of lines) {
      const m = raw.match(/^\s*[-•*]\s+(.*)$/);
      if (m) list.push(m[1]); else { flush(); out += (out && !out.endsWith("</ul>") ? "\n" : "") + fmt(raw); }
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
  function brandVars() {
    const b = state.brand, v = [];
    if (b.bg) v.push("--s-bg:" + b.bg);
    if (b.ink) v.push("--s-ink:" + b.ink, "--s-title:" + b.ink);
    if (b.accent) v.push("--s-accent:" + b.accent);
    if (b.font && FONTS[b.font]) v.push("--s-head:'" + FONTS[b.font][0] + "'", "--s-body:'" + FONTS[b.font][1] + "'");
    return v.length ? ";" + v.join(";") : "";
  }
  function buildSlide(slide, i, n, opts) {
    const { w, h } = dims();
    const isCover = opts.cover && i === 0;
    const isLast = i === n - 1;
    const { tt, bb } = sizes(slide, isCover, h);
    const ex = state.extras[i] || {};
    const el = document.createElement("div");
    el.className = "slide t-" + state.theme + (isCover ? " cover" : "") + (state.align === "center" ? " center" : "");
    el.style.cssText = "width:" + w + "px;height:" + h + "px;--t:" + tt + "px;--b:" + bb + "px" + brandVars();
    if (state.brand.font) el.style.fontFamily = "'" + FONTS[state.brand.font][1] + "',sans-serif";
    const handle = esc(opts.handle || "");
    const ava = state.avatar ? '<img class="s-ava" src="' + state.avatar + '" alt="">' : "";
    const num = opts.num ? (i + 1) + "/" + n : "";
    const hint = isLast ? fmt(opts.cta || "") : (opts.arrow ? t("swipe") + " →" : "");
    const logo = state.logo ? '<img class="s-logo" src="' + state.logo.src + '" style="height:' + (state.logo.size || 80) + 'px" alt="">' : "";
    const lp = state.logo ? (state.logo.pos || "br") : "";
    let layers = "";
    if (ex.img) {
      if (ex.mode === "bg") {
        layers = '<img class="s-bg" src="' + ex.img + '" alt="">' + '<div class="s-dim" style="opacity:' + (ex.dim == null ? 0.5 : ex.dim) + '"></div>';
      } else {
        const iw = (ex.w || 0.6) * w, ih = iw / (ex.ar || 1);
        const left = (ex.x == null ? 0.5 : ex.x) * w - iw / 2, top = (ex.y == null ? 0.3 : ex.y) * h - ih / 2;
        layers = '<img class="s-img' + (ex.round ? " round" : "") + '" src="' + ex.img + '" style="left:' + left.toFixed(1) + "px;top:" + top.toFixed(1) + "px;width:" + iw.toFixed(1) + 'px" alt="">';
      }
    }
    if (state.pattern) layers += '<div class="s-pat ' + state.pattern + '"></div>';
    const tp = ex.textPos || (isCover ? "bottom" : "middle");
    const just = tp === "top" ? "flex-start" : tp === "bottom" ? "flex-end" : "center";
    const author = isLast && (state.avatar || opts.name) ?
      '<div class="s-author">' + (state.avatar ? '<img class="s-ava" src="' + state.avatar + '" alt="">' : "") +
      '<div class="who">' + (opts.name ? '<span class="nm">' + esc(opts.name) + "</span>" : "") + (handle ? '<span class="hd">' + handle + "</span>" : "") +
      '<span><span class="s-follow">' + t("follow") + "</span></span></div></div>" : "";
    el.innerHTML =
      layers +
      '<div class="s-bar"></div>' +
      '<div class="s-top"><span class="grp">' + (lp === "tl" ? logo : "") + ava + '<span class="s-handle">' + handle + '</span></span><span class="grp">' + '<span class="s-num">' + num + "</span>" + (lp === "tr" ? logo : "") + "</span></div>" +
      '<div class="s-main" style="justify-content:' + just + '"><h2 class="s-title">' + fmt(slide.title) + "</h2>" + (slide.body ? '<div class="s-body">' + bodyHtml(slide.body) + "</div>" : "") + author + "</div>" +
      '<div class="s-bot"><span class="grp">' + (lp === "bl" ? logo : "") + '<span class="s-hint">' + hint + "</span></span>" + '<span class="grp">' + (lp === "br" ? logo : "") + "</span></div>" +
      (opts.watermark ? '<div class="s-wm">' + esc(opts.watermark) + "</div>" : "");
    return el;
  }
  function options() {
    return {
      handle: els.handle.value.trim(), name: els.name.value.trim(), cta: els.cta.value.trim() || t("cta_default"),
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
    if (!slides.length) { els.grid.innerHTML = '<p class="status">' + t("empty") + "</p>"; els.zip.disabled = els.pdf.disabled = true; saveDraft(); return; }
    els.zip.disabled = els.pdf.disabled = false;
    slides.forEach((s, i) => {
      const th = document.createElement("div");
      th.className = "thumb"; th.style.aspectRatio = w + "/" + h;
      const stage = document.createElement("div"); stage.className = "stage";
      stage.appendChild(buildSlide(s, i, slides.length, opts));
      stage.addEventListener("click", () => openEditor(i));
      th.appendChild(stage);
      if (state.extras[i] && state.extras[i].img) { const m = document.createElement("span"); m.className = "has-img"; th.appendChild(m); }
      const ed = document.createElement("button"); ed.type = "button"; ed.className = "edit"; ed.textContent = t("edit");
      ed.addEventListener("click", () => openEditor(i));
      th.appendChild(ed);
      const dl = document.createElement("button"); dl.type = "button"; dl.className = "dl"; dl.textContent = "PNG";
      dl.addEventListener("click", () => exportOne(i));
      th.appendChild(dl);
      els.grid.appendChild(th);
    });
    fit();
    saveDraft();
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
  async function renderCanvas(i) {
    const opts = options();
    const el = buildSlide(slides[i], i, slides.length, opts);
    els.stage.innerHTML = ""; els.stage.appendChild(el);
    await document.fonts.ready;
    await Promise.all(Array.from(el.querySelectorAll("img")).map((im) => im.decode().catch(() => {})));
    const { w, h } = dims();
    const canvas = await html2canvas(el, { scale: 1, width: w, height: h, backgroundColor: null, logging: false });
    els.stage.innerHTML = "";
    return canvas;
  }
  async function renderPng(i) { const c = await renderCanvas(i); return new Promise((res) => c.toBlob(res, "image/png")); }
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
  async function exportPdf() {
    if (!slides.length) return;
    if (locked()) return openPro(t("locked"));
    if (monetized && !state.pro) return openPro(t("locked_pdf"));
    els.pdf.disabled = true;
    try {
      const { w, h } = dims();
      const doc = new window.jspdf.jsPDF({ orientation: h >= w ? "p" : "l", unit: "px", format: [w, h], hotfixes: ["px_scaling"], compress: true });
      for (let i = 0; i < slides.length; i++) {
        status(t("rendering", i + 1, slides.length));
        const c = await renderCanvas(i);
        if (i > 0) doc.addPage([w, h], h >= w ? "p" : "l");
        doc.addImage(c.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, w, h);
      }
      save(doc.output("blob"), "carousel.pdf");
      status(t("done_pdf"));
    } catch (e) { console.error(e); status(t("err_font"), true); }
    els.pdf.disabled = false;
  }

  /* ───────── images: read + downscale ───────── */
  function readImage(file, max) {
    return new Promise((res, rej) => {
      if (!file || !/^image\//.test(file.type)) return rej(new Error("type"));
      const fr = new FileReader();
      fr.onerror = () => rej(new Error("read"));
      fr.onload = () => {
        const im = new Image();
        im.onerror = () => rej(new Error("decode"));
        im.onload = () => {
          const k = Math.min(1, max / Math.max(im.width, im.height));
          if (k === 1 && file.size < 1.5e6) return res({ src: fr.result, ar: im.width / im.height });
          const c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
          c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
          const png = file.type === "image/png" || file.type === "image/svg+xml" || file.type === "image/webp";
          res({ src: png ? c.toDataURL("image/png") : c.toDataURL("image/jpeg", 0.9), ar: im.width / im.height });
        };
        im.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  /* ───────── draft autosave / project files ───────── */
  function snapshot(withImages) {
    const ex = {};
    Object.keys(state.extras).forEach((k) => { const e = Object.assign({}, state.extras[k]); if (!withImages) { delete e.img; delete e.ar; } if (Object.keys(e).length) ex[k] = e; });
    return {
      v: 2, text: els.text.value, handle: els.handle.value, name: els.name.value, cta: els.cta.value, format: state.format, theme: state.theme,
      brand: state.brand, pattern: state.pattern, align: state.align, num: els.num.checked, arrow: els.arrow.checked, cover: els.cover.checked,
      extras: ex, logo: withImages ? state.logo : null, avatar: withImages ? state.avatar : null
    };
  }
  function restore(d) {
    if (!d || typeof d.text !== "string") return false;
    els.text.value = d.text; els.handle.value = d.handle || ""; els.name.value = d.name || ""; els.cta.value = d.cta || "";
    if (/^\d+x\d+$/.test(d.format || "")) { state.format = d.format; els.format.value = d.format; }
    if (THEMES.some((x) => x.id === d.theme)) state.theme = d.theme;
    state.brand = Object.assign({ bg: "", ink: "", accent: "", font: "" }, d.brand || {});
    state.pattern = d.pattern || ""; state.align = d.align === "center" ? "center" : "left";
    if (typeof d.num === "boolean") els.num.checked = d.num; if (typeof d.arrow === "boolean") els.arrow.checked = d.arrow; if (typeof d.cover === "boolean") els.cover.checked = d.cover;
    state.extras = d.extras && typeof d.extras === "object" ? d.extras : {};
    if (d.logo && d.logo.src) state.logo = d.logo; if (d.avatar) state.avatar = d.avatar;
    syncControls();
    return true;
  }
  let draftTimer;
  function saveDraft() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => {
      try { localStorage.setItem("listai.draft", JSON.stringify(snapshot(true))); }
      catch (e) { try { localStorage.setItem("listai.draft", JSON.stringify(snapshot(false))); } catch (e2) {} }
    }, 300);
  }
  function loadDraft() { try { return restore(JSON.parse(localStorage.getItem("listai.draft") || "null")); } catch (e) { return false; } }

  /* ───────── logo / avatar / brand ───────── */
  function syncControls() {
    els.logoRemove.hidden = !state.logo;
    if (state.logo) { els.logoPos.value = state.logo.pos || "br"; els.logoSize.value = state.logo.size || 80; }
    els.avatarRemove.hidden = !state.avatar;
    const th = THEMES.find((x) => x.id === state.theme) || THEMES[0];
    els.cBg.value = state.brand.bg || th.c[0]; els.cInk.value = state.brand.ink || th.c[1]; els.cAccent.value = state.brand.accent || th.c[2];
    els.font.value = state.brand.font || ""; els.pattern.value = state.pattern || "";
    const r = document.querySelector('input[name="align"][value="' + state.align + '"]'); if (r) r.checked = true;
  }
  els.logoFile.addEventListener("change", async () => {
    const f = els.logoFile.files[0]; els.logoFile.value = "";
    if (!f) return;
    try { const im = await readImage(f, 800); state.logo = { src: im.src, pos: els.logoPos.value, size: Number(els.logoSize.value) }; syncControls(); render(); }
    catch (e) { status(t("ed_img_err"), true); }
  });
  els.logoPos.addEventListener("change", () => { if (state.logo) { state.logo.pos = els.logoPos.value; render(); } });
  els.logoSize.addEventListener("input", () => { if (state.logo) { state.logo.size = Number(els.logoSize.value); render(); } });
  els.logoRemove.addEventListener("click", () => { state.logo = null; syncControls(); render(); });
  els.avatarFile.addEventListener("change", async () => {
    const f = els.avatarFile.files[0]; els.avatarFile.value = "";
    if (!f) return;
    try { const im = await readImage(f, 400); state.avatar = im.src; syncControls(); render(); }
    catch (e) { status(t("ed_img_err"), true); }
  });
  els.avatarRemove.addEventListener("click", () => { state.avatar = null; syncControls(); render(); });
  els.cBg.addEventListener("input", () => { state.brand.bg = els.cBg.value; render(); });
  els.cInk.addEventListener("input", () => { state.brand.ink = els.cInk.value; render(); });
  els.cAccent.addEventListener("input", () => { state.brand.accent = els.cAccent.value; render(); });
  els.font.addEventListener("change", () => { state.brand.font = els.font.value; render(); });
  els.pattern.addEventListener("change", () => { state.pattern = els.pattern.value; render(); });
  document.querySelectorAll('input[name="align"]').forEach((r) => r.addEventListener("change", () => { state.align = r.value; render(); }));
  els.brandReset.addEventListener("click", () => { state.brand = { bg: "", ink: "", accent: "", font: "" }; state.pattern = ""; syncControls(); render(); });

  /* ───────── slide editor ───────── */
  function remapExtras(map) { const out = {}; Object.keys(state.extras).forEach((k) => { const j = map(Number(k)); if (j != null) out[j] = state.extras[k]; }); state.extras = out; }
  function openEditor(i) {
    if (!slides[i]) return;
    const ex = state.extras[i] = state.extras[i] || {};
    const { w, h } = dims();
    const isCover = els.cover.checked && i === 0;
    els.modal.innerHTML =
      '<div class="modal editor" role="dialog" aria-modal="true"><div class="box">' +
      '<button class="close" type="button" aria-label="Close">×</button>' +
      "<h3>" + esc(t("ed_title", i + 1)) + "</h3>" +
      '<div class="editor-body"><div class="ed-stage-wrap"><div class="ed-stage" id="ed-stage"><div class="stage" id="ed-inner"></div><div class="ed-sel" id="ed-sel" hidden><div class="hnd" id="ed-hnd"></div></div></div></div>' +
      '<div class="ed-controls">' +
      '<div class="field"><label for="ed-ttl">' + esc(t("ed_ttl")) + '</label><input type="text" id="ed-ttl"></div>' +
      '<div class="field"><label for="ed-body">' + esc(t("ed_body")) + '</label><textarea id="ed-body"></textarea></div>' +
      '<label class="btn primary file-btn"><span id="ed-upload-label"></span><input type="file" id="ed-file" accept="image/*" hidden></label>' +
      '<div class="field" id="ed-img-fields" hidden>' +
      "<label>" + esc(t("ed_mode")) + '</label><div class="seg"><button type="button" id="ed-free"></button><button type="button" id="ed-bg"></button></div>' +
      '<label for="ed-size" id="ed-size-l">' + esc(t("ed_size")) + '</label><input type="range" id="ed-size" min="10" max="100">' +
      '<label for="ed-dim" id="ed-dim-l">' + esc(t("ed_dim")) + '</label><input type="range" id="ed-dim" min="0" max="85">' +
      '<label class="toggles"><input type="checkbox" id="ed-round"> ' + esc(t("ed_round")) + "</label>" +
      '<button type="button" class="btn ghost" id="ed-remove">' + esc(t("remove")) + "</button></div>" +
      '<div class="field"><label for="ed-tp">' + esc(t("ed_textpos")) + '</label><select id="ed-tp"><option value="top">' + esc(t("tp_top")) + '</option><option value="middle">' + esc(t("tp_middle")) + '</option><option value="bottom">' + esc(t("tp_bottom")) + "</option></select></div>" +
      '<div class="ed-ops"><button type="button" class="btn ghost" id="ed-prev">' + esc(t("ed_prev")) + '</button><button type="button" class="btn ghost" id="ed-next">' + esc(t("ed_next")) + '</button><button type="button" class="btn ghost" id="ed-dup">' + esc(t("ed_dup")) + '</button><button type="button" class="btn ghost" id="ed-del">' + esc(t("ed_del")) + "</button></div>" +
      '<p class="ed-hint">' + esc(t("ed_hint")) + "</p>" +
      '<button type="button" class="btn" id="ed-done">' + esc(t("ed_done")) + "</button>" +
      "</div></div></div></div>";
    const q = (sel) => els.modal.querySelector(sel);
    const stageEl = q("#ed-stage"), inner = q("#ed-inner"), sel = q("#ed-sel");
    const wrapW = Math.min(q(".ed-stage-wrap").clientWidth - 24, 620);
    const k = Math.min(wrapW / w, 560 / h);
    stageEl.style.width = (w * k) + "px"; stageEl.style.height = (h * k) + "px";
    inner.style.transform = "scale(" + k + ")";
    q("#ed-tp").value = ex.textPos || (isCover ? "bottom" : "middle");
    q("#ed-ttl").value = slides[i].title; q("#ed-body").value = slides[i].body;
    q("#ed-prev").disabled = i === 0; q("#ed-next").disabled = i === slides.length - 1;

    function paint() {
      inner.innerHTML = ""; inner.appendChild(buildSlide(slides[i], i, slides.length, options()));
      const has = !!ex.img;
      q("#ed-img-fields").hidden = !has;
      q("#ed-upload-label").textContent = t(has ? "ed_replace" : "ed_upload");
      const free = has && ex.mode !== "bg";
      q("#ed-free").setAttribute("aria-pressed", String(ex.mode !== "bg")); q("#ed-free").textContent = t("ed_free");
      q("#ed-bg").setAttribute("aria-pressed", String(ex.mode === "bg")); q("#ed-bg").textContent = t("ed_bg");
      q("#ed-size").hidden = q("#ed-size-l").hidden = !free; q("#ed-round").parentElement.hidden = !free;
      q("#ed-dim").hidden = q("#ed-dim-l").hidden = free;
      q("#ed-size").value = Math.round((ex.w || 0.6) * 100); q("#ed-dim").value = Math.round((ex.dim == null ? 0.5 : ex.dim) * 100); q("#ed-round").checked = !!ex.round;
      sel.hidden = !free;
      if (free) {
        const iw = (ex.w || 0.6) * w, ih = iw / (ex.ar || 1);
        sel.style.left = (((ex.x == null ? 0.5 : ex.x) * w - iw / 2) * k) + "px"; sel.style.top = (((ex.y == null ? 0.3 : ex.y) * h - ih / 2) * k) + "px";
        sel.style.width = (iw * k) + "px"; sel.style.height = (ih * k) + "px";
      }
    }
    paint();
    const commitText = () => { slides[i].title = q("#ed-ttl").value.replace(/\n/g, " "); slides[i].body = q("#ed-body").value.replace(/\n[ \t]*\n+/g, "\n"); els.text.value = serialize(slides); paint(); };
    q("#ed-ttl").addEventListener("input", commitText); q("#ed-body").addEventListener("input", commitText);

    q("#ed-file").addEventListener("change", async (e) => {
      const f = e.target.files[0]; e.target.value = ""; if (!f) return;
      try {
        const im = await readImage(f, 2160);
        ex.img = im.src; ex.ar = im.ar;
        if (ex.x == null) { ex.x = 0.5; ex.y = 0.3; ex.w = 0.6; ex.mode = ex.mode || "free"; }
        paint();
      } catch (err) { q(".ed-hint").textContent = t("ed_img_err"); }
    });
    q("#ed-free").onclick = () => { ex.mode = "free"; paint(); };
    q("#ed-bg").onclick = () => { ex.mode = "bg"; paint(); };
    q("#ed-size").oninput = (e) => { ex.w = Number(e.target.value) / 100; paint(); };
    q("#ed-dim").oninput = (e) => { ex.dim = Number(e.target.value) / 100; paint(); };
    q("#ed-round").onchange = (e) => { ex.round = e.target.checked; paint(); };
    q("#ed-remove").onclick = () => { delete ex.img; delete ex.ar; paint(); };
    q("#ed-tp").onchange = (e) => { ex.textPos = e.target.value; paint(); };

    let drag = null;
    sel.addEventListener("pointerdown", (e) => {
      e.preventDefault(); sel.setPointerCapture(e.pointerId);
      drag = { mode: e.target.id === "ed-hnd" ? "resize" : "move", sx: e.clientX, sy: e.clientY, x: ex.x, y: ex.y, w: ex.w };
    });
    sel.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const dx = (e.clientX - drag.sx) / k, dy = (e.clientY - drag.sy) / k;
      if (drag.mode === "move") { ex.x = Math.min(1.2, Math.max(-0.2, drag.x + dx / w)); ex.y = Math.min(1.2, Math.max(-0.2, drag.y + dy / h)); }
      else { const left = drag.x - drag.w / 2; const nw = Math.min(2, Math.max(0.08, drag.w + dx / w)); ex.w = nw; ex.x = left + nw / 2; }
      paint();
    });
    const end = () => { drag = null; };
    sel.addEventListener("pointerup", end); sel.addEventListener("pointercancel", end);

    const finish = () => { closeModal(); render(); };
    const reopen = (j) => { closeModal(); render(); openEditor(j); };
    q("#ed-prev").onclick = () => { const s = slides[i]; slides[i] = slides[i - 1]; slides[i - 1] = s; els.text.value = serialize(slides); remapExtras((k2) => k2 === i ? i - 1 : k2 === i - 1 ? i : k2); reopen(i - 1); };
    q("#ed-next").onclick = () => { const s = slides[i]; slides[i] = slides[i + 1]; slides[i + 1] = s; els.text.value = serialize(slides); remapExtras((k2) => k2 === i ? i + 1 : k2 === i + 1 ? i : k2); reopen(i + 1); };
    q("#ed-dup").onclick = () => { slides.splice(i + 1, 0, Object.assign({}, slides[i])); els.text.value = serialize(slides); remapExtras((k2) => k2 > i ? k2 + 1 : k2); state.extras[i + 1] = JSON.parse(JSON.stringify(ex)); reopen(i + 1); };
    q("#ed-del").onclick = () => { slides.splice(i, 1); els.text.value = serialize(slides); remapExtras((k2) => k2 === i ? null : k2 > i ? k2 - 1 : k2); finish(); };
    q(".close").onclick = finish; q("#ed-done").onclick = finish;
    q(".modal").addEventListener("click", (e) => { if (e.target === e.currentTarget) finish(); });
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
      "<p>" + esc(t("pro_lead")) + "</p><ul><li>" + esc(t("pro_f1")) + "</li><li>" + esc(t("pro_f2")) + "</li><li>" + esc(t("pro_f3")) + "</li><li>" + esc(t("pro_f4")) + "</li></ul>" +
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
      b.addEventListener("click", () => { state.theme = th.id; state.brand.bg = state.brand.ink = state.brand.accent = ""; syncControls(); renderThemes(); render(); });
      els.themes.appendChild(b);
    });
  }
  function isTemplateText(v) { const all = [I18N.ru.sample, I18N.en.sample].concat(Object.values(I18N.ru.tpls), Object.values(I18N.en.tpls)); return !v.trim() || all.includes(v); }
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
    if (e.target.type === "file" || e.target.type === "color" || e.target.type === "range" || e.target === els.tpl) return;
    clearTimeout(timer); timer = setTimeout(render, 120);
  }));
  $("#form").addEventListener("submit", (e) => e.preventDefault());
  els.zip.addEventListener("click", exportZip);
  els.pdf.addEventListener("click", exportPdf);
  els.sample.addEventListener("click", () => { els.text.value = I18N[lang].sample; state.extras = {}; render(); });
  els.tpl.addEventListener("change", () => {
    const id = els.tpl.value; if (!id) return;
    const tpl = I18N[lang].tpls[id];
    els.text.value = isTemplateText(els.text.value) ? tpl : els.text.value.trimEnd() + "\n\n" + tpl;
    els.tpl.value = ""; render(); els.text.focus();
  });
  els.save.addEventListener("click", () => {
    save(new Blob([JSON.stringify(snapshot(true))], { type: "application/json" }), "carousel.listai.json"); status(t("saved"));
  });
  els.open.addEventListener("change", () => {
    const f = els.open.files[0]; els.open.value = ""; if (!f) return;
    const fr = new FileReader();
    fr.onload = () => { try { const d = JSON.parse(fr.result); if (d && d.v && restore(d)) { renderThemes(); render(); status(t("opened")); } else status(t("err_open"), true); } catch (e) { status(t("err_open"), true); } };
    fr.readAsText(f);
  });
  els.clear.addEventListener("click", () => { els.text.value = ""; state.extras = {}; render(); status(t("cleared")); els.text.focus(); });
  els.proBtn.addEventListener("click", () => openPro());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && els.modal.firstChild) { closeModal(); render(); }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); exportZip(); }
  });

  /* ───────── demo notice (hosted preview, downloads disabled there) ───────── */
  if (/claude/i.test(location.hostname)) {
    const n = document.createElement("p"); n.className = "status";
    n.style.cssText = "margin:0 0 12px;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--panel)";
    n.textContent = lang === "ru" ? "Это демо-версия для просмотра. Скачивание работает на основном сайте: yangorovet-lab.github.io/m20-" : "Preview copy. Downloads work on the main site: yangorovet-lab.github.io/m20-";
    document.querySelector(".hero").appendChild(n);
  }

  /* ───────── boot ───────── */
  const restored = loadDraft();
  if (!restored) { try { const th = localStorage.getItem("listai.theme"); if (th && THEMES.some((x) => x.id === th)) state.theme = th; } catch (e) {} }
  if (!els.text.value.trim()) els.text.value = I18N[lang].sample;
  syncControls();
  verifyStored().finally(applyLang);
  document.fonts.ready.then(fit);
})();
