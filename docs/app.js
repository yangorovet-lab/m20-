(function () {
  "use strict";
  const CFG = window.LISTAI_CONFIG || {};
  const $ = (s) => document.querySelector(s);
  const uid = () => Math.random().toString(36).slice(2, 9);

  /* ───────── i18n ───────── */
  const I18N = {
    ru: {
      brand: "Листай", h1: "Карусель из текста за минуту",
      lead: "Вставьте текст поста, выберите тему и скачайте готовые слайды для Instagram, Telegram, LinkedIn и VK. Без регистрации, всё считается в браузере.",
      my: "Мои карусели", install: "Установить", ideas: "Идеи", shortcuts: "Горячие клавиши",
      text_label: "Текст карусели", text_hint: "Пустая строка — новый слайд. Первая строка слайда — заголовок. «- » в начале строки — список. ==слово== выделит цветом, **слово** сделает жирным.",
      tpl_pick: "Шаблон структуры…", tpl_list: "Список: N ошибок / советов", tpl_howto: "Инструкция по шагам", tpl_myths: "Мифы и факты", tpl_story: "История: было → стало", tpl_quotes: "Цитаты и тезисы",
      handle_label: "@ник", format_label: "Формат", theme_label: "Тема", cta_label: "Текст на последнем слайде",
      g_brand: "Цвета и шрифты", c_bg: "Фон", c_ink: "Текст", c_accent: "Акцент", font_label: "Шрифты", font_theme: "Как в теме", pattern_label: "Узор фона",
      pat_none: "Нет", pat_dots: "Точки", pat_grid: "Сетка", pat_lines: "Штриховка", al_left: "Текст слева", al_center: "По центру", brand_reset: "Сбросить цвета",
      brand_save: "Сохранить как мой бренд", brand_save_hint: "Цвета, шрифты, логотип и автор подставятся в каждую новую карусель.", brand_saved: "Бренд сохранён. Новые карусели начнутся с него.",
      g_author: "Автор и логотип", name_label: "Имя автора", avatar_label: "Аватар", author_hint: "Аватар и имя появятся в шапке слайдов и на последнем слайде в карточке «Подписаться».",
      logo_label: "Логотип на всех слайдах", logo_upload: "Загрузить", remove: "Убрать", lp_tl: "Сверху слева", lp_tr: "Сверху справа", lp_bl: "Снизу слева", lp_br: "Снизу справа",
      logo_hint: "PNG с прозрачным фоном смотрится лучше всего. Картинку на конкретный слайд добавляют в редакторе: нажмите на слайд в предпросмотре.",
      opt_num: "Нумерация", opt_arrow: "Стрелка «листай»", opt_cover: "Первый слайд — обложка",
      btn_zip: "Скачать PNG (ZIP)", btn_pdf: "PDF для LinkedIn", btn_sample: "Пример", btn_save: "Сохранить проект", btn_open: "Открыть проект", btn_clear: "Очистить", btn_caption: "Подпись к посту",
      preview: "Предпросмотр", how: "Как это работает",
      s1t: "1. Вставьте текст", s1p: "Пост, заметку из Telegram, тезисы из поста в LinkedIn. Слайды разделяются пустой строкой.",
      s2t: "2. Настройте слайды", s2p: "16 тем, 8 компоновок, свои цвета и шрифты. В редакторе слайда двигайте текст, картинки, фигуры и стикеры, включайте сетку и привязку.",
      s3t: "3. Скачайте PNG или PDF", s3p: "PNG-архив для Instagram, Telegram и VK, PDF-документ для LinkedIn. Ничего не загружается на сервер: файлы собираются в вашем браузере.",
      q1: "Это бесплатно?", a1: "Да. Бесплатная версия делает карусели без ограничений по количеству. Pro убирает водяной знак, открывает дополнительные темы и экспорт в PDF.",
      q2: "Куда попадает мой текст?", a2: "Никуда. Картинки собираются прямо в браузере, на сервер ничего не отправляется. Черновики хранятся в вашем браузере.",
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
      edit: "Редактор", ed_title: (i, n) => "Слайд " + i + " из " + n,
      tool_text: "Текст", tool_head: "Заголовок", tool_img: "Картинка", tool_rect: "Прямоугольник", tool_circle: "Круг", tool_line: "Линия", tool_emoji: "Стикер",
      tool_grid: "Сетка", tool_safe: "Безопасная зона", tool_snap: "Привязка", tool_undo: "Отменить", tool_redo: "Вернуть",
      p_slide: "Слайд", p_layout: "Компоновка", p_layout_all: "Применить компоновку ко всем", p_textpos: "Положение текста", tp_top: "Сверху", tp_middle: "По центру", tp_bottom: "Снизу",
      p_below: "Текст под слоями", p_bg: "Фоновая картинка", p_bg_add: "Добавить фон", p_bg_replace: "Заменить фон", p_dim: "Затемнение", p_bg_remove: "Убрать фон",
      p_ttl: "Заголовок", p_body: "Текст", p_sel: "Выбранный элемент", p_scale: "Размер текста", p_reflow: "Вернуть в поток",
      p_content: "Содержимое", p_size: "Кегль", p_color: "Цвет", p_theme_color: "Как в теме", p_weight: "Начертание", p_align: "Выравнивание", p_font: "Шрифт", p_hl: "Плашка под текстом",
      p_replace: "Заменить картинку", p_round: "Скруглить углы", p_as_bg: "Сделать фоном", p_fill: "Заливка", p_radius: "Скругление", p_thick: "Толщина", p_opacity: "Прозрачность", p_rot: "Поворот",
      p_up: "Выше", p_down: "Ниже", p_dup: "Дублировать", p_all: "На все слайды", p_del: "Удалить", p_applied: "Добавлено на все слайды.",
      ed_prev: "← Раньше", ed_next: "Позже →", ed_dup: "Дублировать слайд", ed_del: "Удалить слайд", ed_done: "Готово",
      ed_hint: "Тяните элементы, чтобы двигать. Уголки меняют размер, ручка сверху — поворот. Стрелки на клавиатуре двигают выбранное, Delete удаляет.",
      ed_img_err: "Не удалось прочитать файл. Нужна картинка PNG, JPG или WebP.",
      lay_default: "Стандарт", lay_number: "С номером", lay_split: "Две колонки", lay_quote: "Цитата", lay_stat: "Крупная цифра", lay_check: "Чеклист", lay_card: "Карточка", lay_frame: "Рамка", lay_rules: "Линейки",
      w_500: "Обычный", w_700: "Жирный", w_800: "Очень жирный", a_left: "Слева", a_center: "Центр", a_right: "Справа", new_text: "Новый текст", new_head: "Заголовок",
      audit_title: "Проверка перед публикацией",
      au1: "Заголовок обложки до 60 знаков", au2: "От 5 до 10 слайдов", au3: "На слайдах не больше 400 знаков текста", au4: "На последнем слайде есть призыв или карточка автора",
      au5: "Указан @ник или имя автора", au6: "У каждого слайда есть заголовок", au7: "Есть выделение ==цветом== или **жирным**", au8: "Включена нумерация слайдов",
      au_hint: (n) => "Слишком длинный: " + n + " зн.", au_slides: (n) => "Сейчас " + n,
      my_title: "Мои карусели", my_new: "Новая карусель", my_empty: "Пока пусто. Текущая карусель сохраняется автоматически.", my_open: "Открыть", my_dup: "Копия", my_del: "Удалить", my_del_confirm: "Точно удалить?", my_untitled: "Без названия", my_cur: "Текущая",
      ideas_title: "Банк идей", ideas_hint: "Нажмите на идею, и она станет обложкой с готовой структурой.", idea_sub: "и что с этим делать",
      niche_smm: "SMM", niche_marketing: "Маркетинг", niche_business: "Бизнес", niche_career: "Карьера", niche_money: "Деньги", niche_health: "Здоровье",
      cap_title: "Подпись к посту", cap_hint: "Собрана из заголовков слайдов. Отредактируйте и скопируйте.", cap_copy: "Скопировать", cap_copied: "Скопировано", cap_save: "Сохраняйте, чтобы вернуться:",
      keys_title: "Горячие клавиши", k_export: "Скачать ZIP", k_undo: "Отменить в редакторе", k_redo: "Вернуть", k_dup: "Дублировать элемент", k_grid: "Сетка", k_del: "Удалить элемент", k_move: "Сдвинуть элемент", k_move5: "Сдвинуть на 5×", k_esc: "Снять выделение / закрыть",
      installed: "Приложение установлено.",
      sample: "5 ошибок в постах, из-за которых вас ==не читают==\nи как их исправить за один вечер\n\nОшибка 1. Нет обещания\nЧитатель за **2 секунды** решает, листать дальше или нет. Заголовок должен обещать конкретную пользу.\n\nОшибка 2. Стена текста\n- абзацы по 2–3 строки\n- один тезис на абзац\n- списки вместо перечислений через запятую\n\nОшибка 3. Нет примера\nЛюбой совет без примера — это просто мнение. Покажите «было → стало».\n\nОшибка 4. Нет вывода\nПоследний слайд отвечает на вопрос «и что теперь делать?».\n\nОшибка 5. Нет призыва\nПопросите ==сохранить==, поделиться или написать в комментариях. Люди делают то, о чём их просят.",
      tpls: {
        list: "5 ошибок, которые ==мешают== [результат]\nи как их исправить\n\nОшибка 1. [Название]\n[Почему это плохо и что делать вместо]\n\nОшибка 2. [Название]\n[Почему это плохо и что делать вместо]\n\nОшибка 3. [Название]\n[Почему это плохо и что делать вместо]\n\nОшибка 4. [Название]\n[Почему это плохо и что делать вместо]\n\nОшибка 5. [Название]\n[Почему это плохо и что делать вместо]\n\nИтог\n[Одна мысль, которую нужно запомнить]",
        howto: "Как [сделать X] за [время]\nПошагово, без воды\n\nШаг 1. [Действие]\n[Что именно сделать и на что обратить внимание]\n\nШаг 2. [Действие]\n[Что именно сделать]\n\nШаг 3. [Действие]\n[Что именно сделать]\n\nШаг 4. [Действие]\n[Что именно сделать]\n\nЧто получится\n[Результат и как его проверить]",
        myths: "5 мифов о [тема]\nв которые до сих пор верят\n\nМиф 1. [Утверждение]\n**Факт:** [как на самом деле]\n\nМиф 2. [Утверждение]\n**Факт:** [как на самом деле]\n\nМиф 3. [Утверждение]\n**Факт:** [как на самом деле]\n\nМиф 4. [Утверждение]\n**Факт:** [как на самом деле]\n\nМиф 5. [Утверждение]\n**Факт:** [как на самом деле]",
        story: "Как я [результат] за [срок]\nЧестная история без прикрас\n\nБыло\n[Точка А: цифры, состояние, проблема]\n\nЧто мешало\n[Главное препятствие]\n\nЧто изменил\n- [решение 1]\n- [решение 2]\n- [решение 3]\n\nСтало\n[Точка Б: цифры, состояние]\n\nВывод\n[Что бы посоветовал себе в начале]",
        quotes: "[Тема] в 5 тезисах\nСохраните, чтобы перечитать\n\n1\n«[Тезис или цитата]»\n\n2\n«[Тезис или цитата]»\n\n3\n«[Тезис или цитата]»\n\n4\n«[Тезис или цитата]»\n\n5\n«[Тезис или цитата]»"
      },
      ideas: {
        smm: ["5 признаков, что ваш контент никто не читает", "Почему охваты падают и как их вернуть за 2 недели", "Контент-план на месяц за 1 час: система", "7 форматов постов, которые собирают сохранения", "Как писать заголовки, которые останавливают скролл", "Что публиковать, когда нечего сказать"],
        marketing: ["5 ошибок в рекламе, которые сливают бюджет", "Как проверить идею продукта за неделю без вложений", "Воронка продаж на пальцах: 4 этапа", "Почему клиенты не покупают, даже когда им нравится", "7 триггеров, которые двигают к покупке", "Как поднять средний чек без скидок"],
        business: ["5 ошибок первого года бизнеса", "Как считать юнит-экономику: простой пример", "Найм первого сотрудника: чек-лист", "Почему выручка растёт, а денег нет", "7 привычек предпринимателей, которые выживают кризисы", "Как перестать быть узким местом в своём бизнесе"],
        career: ["5 ошибок в резюме, из-за которых не зовут на собеседование", "Как просить повышение: разговор по шагам", "7 вопросов, которые стоит задать на собеседовании", "Почему вас не повышают, хотя вы стараетесь", "Как уйти с работы правильно и не сжечь мосты", "Выгорание: 5 сигналов, которые нельзя игнорировать"],
        money: ["5 привычек, которые съедают ваши деньги", "Финансовая подушка: сколько и где хранить", "Как начать инвестировать с 1000 рублей", "Почему бюджет не работает и что делать вместо", "7 бесполезных трат, которые кажутся нужными", "Как перестать жить от зарплаты до зарплаты"],
        health: ["5 привычек для сна, которые реально работают", "Как начать бегать и не бросить через неделю", "Почему вы устаёте к обеду: 4 причины", "7 продуктов, которые незаметно мешают худеть", "Как сидеть за компьютером без боли в спине", "Тревога: 5 приёмов, которые помогают за минуту"]
      }
    },
    en: {
      brand: "Listai", h1: "Text to carousel in a minute",
      lead: "Paste your post, pick a theme and download ready slides for Instagram, Telegram, LinkedIn and X. No sign-up, everything runs in your browser.",
      my: "My carousels", install: "Install app", ideas: "Ideas", shortcuts: "Keyboard shortcuts",
      text_label: "Carousel text", text_hint: "Blank line starts a new slide. First line of a slide is its heading. “- ” starts a list item. ==word== highlights, **word** makes bold.",
      tpl_pick: "Structure template…", tpl_list: "List: N mistakes / tips", tpl_howto: "Step-by-step guide", tpl_myths: "Myths vs facts", tpl_story: "Story: before → after", tpl_quotes: "Quotes and takeaways",
      handle_label: "@handle", format_label: "Format", theme_label: "Theme", cta_label: "Last slide text",
      g_brand: "Colors and fonts", c_bg: "Background", c_ink: "Text", c_accent: "Accent", font_label: "Fonts", font_theme: "Theme default", pattern_label: "Background pattern",
      pat_none: "None", pat_dots: "Dots", pat_grid: "Grid", pat_lines: "Hatch", al_left: "Left aligned", al_center: "Centered", brand_reset: "Reset colors",
      brand_save: "Save as my brand", brand_save_hint: "Colors, fonts, logo and author will be applied to every new carousel.", brand_saved: "Brand saved. New carousels will start from it.",
      g_author: "Author and logo", name_label: "Author name", avatar_label: "Avatar", author_hint: "Avatar and name appear in the slide header and in a “Follow” card on the last slide.",
      logo_label: "Logo on every slide", logo_upload: "Upload", remove: "Remove", lp_tl: "Top left", lp_tr: "Top right", lp_bl: "Bottom left", lp_br: "Bottom right",
      logo_hint: "A PNG with a transparent background looks best. To add an image to one slide, open the editor: click the slide in the preview.",
      opt_num: "Numbering", opt_arrow: "Swipe arrow", opt_cover: "First slide is a cover",
      btn_zip: "Download PNG (ZIP)", btn_pdf: "PDF for LinkedIn", btn_sample: "Example", btn_save: "Save project", btn_open: "Open project", btn_clear: "Clear", btn_caption: "Post caption",
      preview: "Preview", how: "How it works",
      s1t: "1. Paste text", s1p: "A post, a Telegram note, the key points of a LinkedIn article. Slides are separated by a blank line.",
      s2t: "2. Set up the slides", s2p: "16 themes, 8 layouts, your own colors and fonts. In the slide editor move text, images, shapes and stickers, with grid and snapping.",
      s3t: "3. Download PNG or PDF", s3p: "A PNG archive for Instagram, Telegram and X, a PDF document for LinkedIn. Nothing is uploaded: files are built in your browser.",
      q1: "Is it free?", a1: "Yes. The free version has no limit on the number of carousels. Pro removes the watermark and unlocks extra themes and PDF export.",
      q2: "Where does my text go?", a2: "Nowhere. Images are rendered in your browser; nothing is sent to a server. Drafts are kept in your browser.",
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
      edit: "Edit", ed_title: (i, n) => "Slide " + i + " of " + n,
      tool_text: "Text", tool_head: "Heading", tool_img: "Image", tool_rect: "Rectangle", tool_circle: "Circle", tool_line: "Line", tool_emoji: "Sticker",
      tool_grid: "Grid", tool_safe: "Safe zone", tool_snap: "Snap", tool_undo: "Undo", tool_redo: "Redo",
      p_slide: "Slide", p_layout: "Layout", p_layout_all: "Apply layout to all slides", p_textpos: "Text position", tp_top: "Top", tp_middle: "Middle", tp_bottom: "Bottom",
      p_below: "Text under layers", p_bg: "Background image", p_bg_add: "Add background", p_bg_replace: "Replace background", p_dim: "Darken", p_bg_remove: "Remove background",
      p_ttl: "Heading", p_body: "Text", p_sel: "Selected element", p_scale: "Text size", p_reflow: "Back to flow",
      p_content: "Content", p_size: "Font size", p_color: "Color", p_theme_color: "Theme color", p_weight: "Weight", p_align: "Alignment", p_font: "Font", p_hl: "Highlight box",
      p_replace: "Replace image", p_round: "Rounded corners", p_as_bg: "Use as background", p_fill: "Fill", p_radius: "Corner radius", p_thick: "Thickness", p_opacity: "Opacity", p_rot: "Rotation",
      p_up: "Bring forward", p_down: "Send backward", p_dup: "Duplicate", p_all: "To all slides", p_del: "Delete", p_applied: "Added to every slide.",
      ed_prev: "← Earlier", ed_next: "Later →", ed_dup: "Duplicate slide", ed_del: "Delete slide", ed_done: "Done",
      ed_hint: "Drag elements to move. Corners resize, the top handle rotates. Arrow keys nudge the selection, Delete removes it.",
      ed_img_err: "Could not read the file. Use a PNG, JPG or WebP image.",
      lay_default: "Default", lay_number: "Numbered", lay_split: "Two columns", lay_quote: "Quote", lay_stat: "Big number", lay_check: "Checklist", lay_card: "Card", lay_frame: "Frame", lay_rules: "Rules",
      w_500: "Regular", w_700: "Bold", w_800: "Extra bold", a_left: "Left", a_center: "Center", a_right: "Right", new_text: "New text", new_head: "Heading",
      audit_title: "Pre-publish check",
      au1: "Cover heading under 60 characters", au2: "Between 5 and 10 slides", au3: "No slide has more than 400 characters of text", au4: "Last slide has a call to action or author card",
      au5: "Handle or author name is set", au6: "Every slide has a heading", au7: "Uses ==highlight== or **bold**", au8: "Slide numbering is on",
      au_hint: (n) => "Too long: " + n + " chars", au_slides: (n) => "Now " + n,
      my_title: "My carousels", my_new: "New carousel", my_empty: "Nothing yet. The current carousel is saved automatically.", my_open: "Open", my_dup: "Copy", my_del: "Delete", my_del_confirm: "Really delete?", my_untitled: "Untitled", my_cur: "Current",
      ideas_title: "Idea bank", ideas_hint: "Click an idea and it becomes a cover with a ready structure.", idea_sub: "and what to do about it",
      niche_smm: "Social media", niche_marketing: "Marketing", niche_business: "Business", niche_career: "Career", niche_money: "Money", niche_health: "Health",
      cap_title: "Post caption", cap_hint: "Built from the slide headings. Edit and copy.", cap_copy: "Copy", cap_copied: "Copied", cap_save: "Save this to come back later:",
      keys_title: "Keyboard shortcuts", k_export: "Download ZIP", k_undo: "Undo in editor", k_redo: "Redo", k_dup: "Duplicate element", k_grid: "Grid", k_del: "Delete element", k_move: "Nudge element", k_move5: "Nudge 5×", k_esc: "Deselect / close",
      installed: "App installed.",
      sample: "5 reasons nobody ==reads== your posts\nand how to fix them in one evening\n\nMistake 1. No promise\nA reader decides in **2 seconds** whether to keep going. The headline must promise a concrete benefit.\n\nMistake 2. Wall of text\n- paragraphs of 2–3 lines\n- one idea per paragraph\n- lists instead of comma chains\n\nMistake 3. No example\nAdvice without an example is just an opinion. Show “before → after”.\n\nMistake 4. No takeaway\nThe last slide answers “so what do I do now?”.\n\nMistake 5. No ask\nAsk people to ==save==, share or comment. People do what they are asked to.",
      tpls: {
        list: "5 mistakes that ==hold back== [result]\nand how to fix them\n\nMistake 1. [Name]\n[Why it hurts and what to do instead]\n\nMistake 2. [Name]\n[Why it hurts and what to do instead]\n\nMistake 3. [Name]\n[Why it hurts and what to do instead]\n\nMistake 4. [Name]\n[Why it hurts and what to do instead]\n\nMistake 5. [Name]\n[Why it hurts and what to do instead]\n\nTakeaway\n[The one thing to remember]",
        howto: "How to [do X] in [time]\nStep by step, no fluff\n\nStep 1. [Action]\n[What exactly to do and what to watch for]\n\nStep 2. [Action]\n[What exactly to do]\n\nStep 3. [Action]\n[What exactly to do]\n\nStep 4. [Action]\n[What exactly to do]\n\nWhat you get\n[The result and how to check it]",
        myths: "5 myths about [topic]\npeople still believe\n\nMyth 1. [Claim]\n**Fact:** [what is actually true]\n\nMyth 2. [Claim]\n**Fact:** [what is actually true]\n\nMyth 3. [Claim]\n**Fact:** [what is actually true]\n\nMyth 4. [Claim]\n**Fact:** [what is actually true]\n\nMyth 5. [Claim]\n**Fact:** [what is actually true]",
        story: "How I [result] in [time]\nAn honest story\n\nBefore\n[Point A: numbers, state, problem]\n\nWhat was in the way\n[The main obstacle]\n\nWhat I changed\n- [decision 1]\n- [decision 2]\n- [decision 3]\n\nAfter\n[Point B: numbers, state]\n\nTakeaway\n[What I would tell myself at the start]",
        quotes: "[Topic] in 5 takeaways\nSave to re-read\n\n1\n“[Takeaway or quote]”\n\n2\n“[Takeaway or quote]”\n\n3\n“[Takeaway or quote]”\n\n4\n“[Takeaway or quote]”\n\n5\n“[Takeaway or quote]”"
      },
      ideas: {
        smm: ["5 signs nobody reads your content", "Why reach drops and how to get it back in 2 weeks", "A month of content in 1 hour: the system", "7 post formats that get saved", "How to write headlines that stop the scroll", "What to post when you have nothing to say"],
        marketing: ["5 ad mistakes that burn your budget", "How to test a product idea in a week for free", "The sales funnel in 4 plain steps", "Why people like you but don't buy", "7 triggers that move people to buy", "How to raise your average order without discounts"],
        business: ["5 mistakes of the first year in business", "Unit economics with one simple example", "Hiring your first employee: a checklist", "Why revenue grows but cash doesn't", "7 habits of founders who survive downturns", "How to stop being the bottleneck of your own business"],
        career: ["5 resume mistakes that cost you interviews", "How to ask for a raise, step by step", "7 questions to ask at an interview", "Why you don't get promoted even though you try", "How to quit without burning bridges", "Burnout: 5 signals you can't ignore"],
        money: ["5 habits that quietly eat your money", "Emergency fund: how much and where", "How to start investing with $100", "Why budgets fail and what to do instead", "7 expenses that feel necessary but aren't", "How to stop living paycheck to paycheck"],
        health: ["5 sleep habits that actually work", "How to start running and not quit in a week", "Why you're exhausted by noon: 4 reasons", "7 foods that quietly block weight loss", "How to sit at a computer without back pain", "Anxiety: 5 techniques that help in a minute"]
      }
    }
  };
  let lang = "ru";
  try { lang = localStorage.getItem("listai.lang") || (navigator.language.startsWith("ru") ? "ru" : "en"); } catch (e) {}
  const t = (k, ...a) => { const v = I18N[lang][k]; return typeof v === "function" ? v(...a) : (v == null ? k : v); };

  /* ───────── themes, fonts, layouts ───────── */
  const THEMES = [
    { id: "coal", name: { ru: "Уголь", en: "Coal" }, sw: "background:#0d0d0f;color:#f5f5f2", c: ["#0d0d0f", "#f5f5f2", "#22c38a"] },
    { id: "paper", name: { ru: "Бумага", en: "Paper" }, sw: "background:#f7f4ec;color:#1b1a17;font-family:'Playfair Display',serif", c: ["#f7f4ec", "#1b1a17", "#1b1a17"] },
    { id: "mint", name: { ru: "Мята", en: "Mint" }, sw: "background:#d9f4e6;color:#0b3d2e", c: ["#d9f4e6", "#0b3d2e", "#0b3d2e"] },
    { id: "swiss", name: { ru: "Швейцария", en: "Swiss" }, sw: "background:#fff;color:#111;border-top:6px solid #e30613", c: ["#ffffff", "#111111", "#e30613"] },
    { id: "bank", name: { ru: "Банк", en: "Bank" }, sw: "background:#ffdd2d;color:#111", c: ["#ffdd2d", "#111111", "#111111"] },
    { id: "corp", name: { ru: "Корпорат", en: "Corporate" }, sw: "background:#0a66c2;color:#fff", c: ["#0a66c2", "#ffffff", "#ffffff"] },
    { id: "pastel", name: { ru: "Пастель", en: "Pastel" }, sw: "background:#ece8ff;color:#6d4aff", c: ["#ece8ff", "#2b2350", "#6d4aff"] },
    { id: "news", name: { ru: "Газета", en: "Newspaper" }, sw: "background:#f4f1ea;color:#111;font-family:'Playfair Display',serif;border-bottom:3px solid #111", c: ["#f4f1ea", "#111111", "#111111"] },
    { id: "neon", name: { ru: "Неон", en: "Neon" }, sw: "background:#0b1020;color:#c7ff3d", c: ["#0b1020", "#dfe6ff", "#c7ff3d"] },
    { id: "sunset", name: { ru: "Закат", en: "Sunset" }, sw: "background:linear-gradient(160deg,#ff7a45,#ff2e88);color:#fff", c: ["#ff5a66", "#ffffff", "#ffffff"] },
    { id: "insta", name: { ru: "Градиент", en: "Gradient" }, sw: "background:linear-gradient(135deg,#833ab4,#fd1d1d 55%,#fcb045);color:#fff", c: ["#c1279b", "#ffffff", "#ffffff"] },
    { id: "gloss", name: { ru: "Глянец", en: "Gloss" }, sw: "background:#0b0b0b;color:#d4af37;font-family:'Playfair Display',serif", c: ["#0b0b0b", "#f3efe6", "#d4af37"] },
    { id: "sport", name: { ru: "Спорт", en: "Sport" }, sw: "background:#0a0a0a;color:#ff4d00;font-family:'Oswald',sans-serif;text-transform:uppercase", c: ["#0a0a0a", "#ffffff", "#ff4d00"] },
    { id: "brutal", name: { ru: "Бруталь", en: "Brutal" }, sw: "background:#f2f2f2;color:#000;font-family:'IBM Plex Mono',monospace;box-shadow:inset 0 0 0 4px #000", c: ["#f2f2f2", "#000000", "#ff3b00"] },
    { id: "ocean", name: { ru: "Океан", en: "Ocean" }, sw: "background:#0f172a;color:#38bdf8", c: ["#0f172a", "#e2e8f0", "#38bdf8"] },
    { id: "plex", name: { ru: "Плекс", en: "Plex" }, sw: "background:#fff;color:#1d4ed8;font-family:'IBM Plex Mono',monospace", c: ["#ffffff", "#0a0a0a", "#1d4ed8"] },
    { id: "cream", name: { ru: "Крем", en: "Cream" }, sw: "background:#fff7ed;color:#ea580c;font-family:'Oswald',sans-serif;text-transform:uppercase", c: ["#fff7ed", "#7c2d12", "#ea580c"] }
  ];
  const FONTS = { unbounded: ["Unbounded", "Manrope"], oswald: ["Oswald", "Manrope"], playfair: ["Playfair Display", "Manrope"], manrope: ["Manrope", "Manrope"], plex: ["IBM Plex Mono", "IBM Plex Mono"] };
  const FONT_LIST = ["Unbounded", "Manrope", "Oswald", "Playfair Display", "IBM Plex Mono"];
  const LAYOUTS = ["default", "number", "split", "quote", "stat", "check", "card", "frame", "rules"];
  const EMOJIS = "🔥💡✅❌⚡️🎯📈📉💰🚀⭐️❤️👉👇☝️🙌👀💬📌🧠🛑⏰📣🎁🏆🔑🧩📝🤔😅😍🙏💪🎉✨🌱☕️📱".match(/\p{Extended_Pictographic}️?|\S/gu).filter((e) => e.trim());
  const monetized = !!(CFG.payUrl && CFG.payUrl.trim());
  const proThemes = new Set(monetized ? (CFG.proThemes || []) : []);

  /* ───────── state ───────── */
  const state = { theme: "coal", format: "1080x1350", pro: false, extras: {}, logo: null, avatar: null, brand: { bg: "", ink: "", accent: "", font: "" }, pattern: "", align: "left", id: null };
  try { const s = JSON.parse(localStorage.getItem("listai.pro") || "null"); if (s && s.email && s.key) state.pro = true; state._lic = s; } catch (e) {}
  const els = {
    text: $("#text"), handle: $("#handle"), name: $("#name"), format: $("#format"), cta: $("#cta"), themes: $("#themes"), tpl: $("#tpl"),
    num: $("#opt-num"), arrow: $("#opt-arrow"), cover: $("#opt-cover"), grid: $("#grid"), count: $("#count"),
    status: $("#status"), zip: $("#btn-zip"), pdf: $("#btn-pdf"), sample: $("#btn-sample"), stage: $("#export-stage"),
    proBtn: $("#btn-pro"), proBadge: $("#pro-badge"), modal: $("#modal-root"),
    logoFile: $("#logo-file"), logoPos: $("#logo-pos"), logoSize: $("#logo-size"), logoRemove: $("#logo-remove"),
    avatarFile: $("#avatar-file"), avatarRemove: $("#avatar-remove"),
    cBg: $("#c-bg"), cInk: $("#c-ink"), cAccent: $("#c-accent"), font: $("#font"), pattern: $("#pattern"), brandReset: $("#brand-reset"), brandSave: $("#brand-save"),
    save: $("#btn-save"), open: $("#open-file"), clear: $("#btn-clear"), caption: $("#btn-caption"), projects: $("#btn-projects"), install: $("#btn-install"), ideas: $("#btn-ideas"), keys: $("#btn-keys"),
    auditScore: $("#audit-score"), auditList: $("#audit-list")
  };

  /* ───────── parsing / formatting ───────── */
  function parseSlides(text) {
    const blocks = text.replace(/\r/g, "").split(/\n[ \t]*\n+|^\s*---\s*$/m).map((b) => b.trim()).filter(Boolean);
    return blocks.map((b) => { const lines = b.split("\n"); return { title: lines[0].replace(/^#+\s*/, "").trim(), body: lines.slice(1).join("\n").trim() }; });
  }
  function serialize(list) { return list.map((s) => s.title + (s.body ? "\n" + s.body : "")).join("\n\n"); }
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function fmt(s) { return esc(s).replace(/==(.+?)==/g, "<mark>$1</mark>").replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
  function bodyHtml(body) {
    if (!body) return "";
    let out = "", list = [];
    const flush = () => { if (list.length) { out += "<ul>" + list.map((l) => "<li>" + fmt(l) + "</li>").join("") + "</ul>"; list = []; } };
    for (const raw of body.split("\n")) {
      const m = raw.match(/^\s*[-•*]\s+(.*)$/);
      if (m) list.push(m[1]); else { flush(); out += (out && !out.endsWith("</ul>") ? "\n" : "") + fmt(raw); }
    }
    flush();
    return out;
  }

  /* ───────── slide DOM ───────── */
  function dims() { const [w, h] = state.format.split("x").map(Number); return { w, h }; }
  function ext(i) { return state.extras[i] || (state.extras[i] = {}); }
  function layersOf(ex) { return ex.layers || (ex.layers = []); }
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
  function absStyle(box, W, H) { return "left:" + (box.x * W).toFixed(1) + "px;top:" + (box.y * H).toFixed(1) + "px;width:" + (box.w * W).toFixed(1) + "px;"; }
  function renderLayer(L, idx, W, H) {
    let st = absStyle(L, W, H) + "z-index:" + (10 + idx) + ";opacity:" + (L.op == null ? 1 : L.op) + ";" + (L.rot ? "transform:rotate(" + L.rot + "deg);" : "");
    const d = ' data-el="layer" data-idx="' + idx + '"';
    if (L.type === "image") return '<img class="s-layer s-limg' + (L.round ? " round" : "") + '" src="' + L.src + '" style="' + st + '" alt=""' + d + ">";
    if (L.type === "text") {
      st += "font-size:" + (L.size || 48) + "px;font-weight:" + (L.weight || 700) + ";text-align:" + (L.align || "left") + ";" + (L.color ? "color:" + L.color + ";" : "") + (L.font ? "font-family:'" + L.font + "',sans-serif;" : "");
      if (L.hl) st += "background:" + (L.hlColor || "var(--s-accent)") + ";color:" + (L.color || "var(--s-on-accent,#0d0d0f)") + ";";
      return '<div class="s-layer s-ltext' + (L.hl ? " hl" : "") + '" style="' + st + '"' + d + ">" + fmt(L.text || "") + "</div>";
    }
    if (L.type === "rect" || L.type === "ellipse") {
      st += "height:" + (L.h * H).toFixed(1) + "px;background:" + (L.fill || "var(--s-accent)") + ";border-radius:" + (L.type === "ellipse" ? "50%" : (L.r || 0) + "px") + ";";
      return '<div class="s-layer s-lshape" style="' + st + '"' + d + "></div>";
    }
    if (L.type === "line") { st += "height:" + (L.th || 8) + "px;background:" + (L.fill || "var(--s-accent)") + ";"; return '<div class="s-layer s-lshape" style="' + st + '"' + d + "></div>"; }
    return "";
  }
  function buildSlide(slide, i, n, opts) {
    const { w: W, h: H } = dims();
    const isCover = opts.cover && i === 0, isLast = i === n - 1;
    const { tt, bb } = sizes(slide, isCover, H);
    const ex = state.extras[i] || {};
    const layout = LAYOUTS.includes(ex.layout) ? ex.layout : "default";
    const el = document.createElement("div");
    el.className = "slide t-" + state.theme + " l-" + layout + (isCover ? " cover" : "") + (state.align === "center" ? " center" : "") + (ex.textBelow ? " text-below" : "");
    el.style.cssText = "width:" + W + "px;height:" + H + "px;--t:" + tt + "px;--b:" + bb + "px" + brandVars();
    const handle = esc(opts.handle || "");
    const ava = state.avatar ? '<img class="s-ava" src="' + state.avatar + '" alt="">' : "";
    const num = opts.num ? (i + 1) + "/" + n : "";
    const hint = isLast ? fmt(opts.cta || "") : (opts.arrow ? t("swipe") + " →" : "");
    const logo = state.logo ? '<img class="s-logo" src="' + state.logo.src + '" style="height:' + (state.logo.size || 80) + 'px" alt="">' : "";
    const lp = state.logo ? (state.logo.pos || "br") : "";
    let layers = "";
    if (ex.bg && ex.bg.img) layers += '<img class="s-bg" src="' + ex.bg.img + '" alt=""><div class="s-dim" style="opacity:' + (ex.bg.dim == null ? 0.5 : ex.bg.dim) + '"></div>';
    if (state.pattern) layers += '<div class="s-pat ' + state.pattern + '"></div>';
    (ex.layers || []).forEach((L, idx) => { layers += renderLayer(L, idx, W, H); });
    const tp = ex.textPos || (isCover ? "bottom" : "middle");
    const just = tp === "top" ? "flex-start" : tp === "bottom" ? "flex-end" : "center";
    const author = isLast && (state.avatar || opts.name) ?
      '<div class="s-author">' + (state.avatar ? '<img class="s-ava" src="' + state.avatar + '" alt="">' : "") +
      '<div class="who">' + (opts.name ? '<span class="nm">' + esc(opts.name) + "</span>" : "") + (handle ? '<span class="hd">' + handle + "</span>" : "") +
      '<span><span class="s-follow">' + t("follow") + "</span></span></div></div>" : "";
    const titleFlow = ex.title ? "" : '<h2 class="s-title" data-el="title">' + fmt(slide.title) + "</h2>";
    const bodyFlow = ex.body || !slide.body ? "" : '<div class="s-body" data-el="body">' + bodyHtml(slide.body) + "</div>";
    const titleAbs = ex.title ? '<h2 class="s-title s-abs" data-el="title" style="' + absStyle(ex.title, W, H) + "--ts:" + (ex.title.s || 1) + '">' + fmt(slide.title) + "</h2>" : "";
    const bodyAbs = ex.body && slide.body ? '<div class="s-body s-abs" data-el="body" style="' + absStyle(ex.body, W, H) + "--bs:" + (ex.body.s || 1) + '">' + bodyHtml(slide.body) + "</div>" : "";
    let main = "";
    if (layout === "number" && !isCover) main += '<div class="s-bignum">' + String(i + 1).padStart(2, "0") + "</div>";
    if (layout === "quote") main += '<div class="s-quote">“</div>';
    main += titleFlow + bodyFlow + author;
    const mainEmpty = !titleFlow && !bodyFlow && !author && layout !== "quote";
    el.innerHTML =
      layers + '<div class="s-bar"></div>' +
      '<div class="s-top"><span class="grp">' + (lp === "tl" ? logo : "") + ava + '<span class="s-handle">' + handle + '</span></span><span class="grp"><span class="s-num">' + num + "</span>" + (lp === "tr" ? logo : "") + "</span></div>" +
      '<div class="s-main' + (mainEmpty ? " empty" : "") + '" style="justify-content:' + just + '">' + main + "</div>" +
      '<div class="s-bot"><span class="grp">' + (lp === "bl" ? logo : "") + '<span class="s-hint">' + hint + '</span></span><span class="grp">' + (lp === "br" ? logo : "") + "</span></div>" +
      titleAbs + bodyAbs +
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

  /* ───────── preview + audit ───────── */
  let slides = [];
  function render() {
    slides = parseSlides(els.text.value);
    const opts = options();
    const { w, h } = dims();
    els.grid.innerHTML = "";
    els.count.textContent = slides.length ? t("counting", slides.length) : "";
    if (!slides.length) { els.grid.innerHTML = '<p class="status">' + t("empty") + "</p>"; els.zip.disabled = els.pdf.disabled = true; audit(); saveDraft(); return; }
    els.zip.disabled = els.pdf.disabled = false;
    slides.forEach((s, i) => {
      const th = document.createElement("div");
      th.className = "thumb"; th.style.aspectRatio = w + "/" + h;
      const stage = document.createElement("div"); stage.className = "stage";
      stage.appendChild(buildSlide(s, i, slides.length, opts));
      stage.addEventListener("click", () => openEditor(i));
      th.appendChild(stage);
      const ex = state.extras[i];
      if (ex && ((ex.layers && ex.layers.length) || ex.bg)) { const m = document.createElement("span"); m.className = "has-img"; th.appendChild(m); }
      const ed = document.createElement("button"); ed.type = "button"; ed.className = "edit"; ed.textContent = t("edit"); ed.addEventListener("click", () => openEditor(i)); th.appendChild(ed);
      const dl = document.createElement("button"); dl.type = "button"; dl.className = "dl"; dl.textContent = "PNG"; dl.addEventListener("click", () => exportOne(i)); th.appendChild(dl);
      els.grid.appendChild(th);
    });
    fit(); audit(); saveDraft();
  }
  function fit() {
    const { w } = dims();
    els.grid.querySelectorAll(".thumb").forEach((th) => { th.querySelector(".stage").style.transform = "scale(" + (th.clientWidth / w) + ")"; });
  }
  window.addEventListener("resize", fit);
  function audit() {
    if (!slides.length) { els.auditScore.textContent = "—"; els.auditScore.className = "score"; els.auditList.innerHTML = ""; return; }
    const o = options(), n = slides.length, text = els.text.value;
    const longest = Math.max(...slides.map((s) => s.body.length));
    const checks = [
      { ok: slides[0].title.length <= 60, w: 15, k: "au1", hint: slides[0].title.length > 60 ? t("au_hint", slides[0].title.length) : "" },
      { ok: n >= 5 && n <= 10, w: 15, k: "au2", hint: t("au_slides", n) },
      { ok: longest <= 400, w: 15, k: "au3", hint: longest > 400 ? t("au_hint", longest) : "" },
      { ok: !!(els.cta.value.trim() || state.avatar || o.name), w: 15, k: "au4" },
      { ok: !!(o.handle || o.name), w: 10, k: "au5" },
      { ok: slides.every((s) => s.title.length > 0), w: 10, k: "au6" },
      { ok: /==.+?==|\*\*.+?\*\*/.test(text), w: 10, k: "au7" },
      { ok: o.num, w: 10, k: "au8" }
    ];
    const score = checks.reduce((a, c) => a + (c.ok ? c.w : 0), 0);
    els.auditScore.textContent = score + "/100";
    els.auditScore.className = "score" + (score >= 80 ? "" : score >= 50 ? " mid" : " low");
    els.auditList.innerHTML = checks.map((c) => "<li" + (c.ok ? "" : ' class="no"') + ">" + esc(t(c.k)) + (c.hint && !c.ok ? " · " + esc(c.hint) : "") + "</li>").join("");
  }

  /* ───────── export ───────── */
  function locked() { return proThemes.has(state.theme) && !state.pro; }
  async function renderCanvas(i) {
    const el = buildSlide(slides[i], i, slides.length, options());
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
      save(await zip.generateAsync({ type: "blob" }), "carousel.zip"); status(t("done"));
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
      save(doc.output("blob"), "carousel.pdf"); status(t("done_pdf"));
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

  /* ───────── persistence: draft, projects, brand ───────── */
  function snapshot(withImages) {
    const ex = {};
    Object.keys(state.extras).forEach((k) => {
      const e = JSON.parse(JSON.stringify(state.extras[k]));
      if (!withImages) { delete e.bg; e.layers = (e.layers || []).filter((L) => L.type !== "image"); }
      if (e.layers && !e.layers.length) delete e.layers;
      if (Object.keys(e).length) ex[k] = e;
    });
    return {
      v: 3, id: state.id, text: els.text.value, handle: els.handle.value, name: els.name.value, cta: els.cta.value, format: state.format, theme: state.theme,
      brand: state.brand, pattern: state.pattern, align: state.align, num: els.num.checked, arrow: els.arrow.checked, cover: els.cover.checked,
      extras: ex, logo: withImages ? state.logo : null, avatar: withImages ? state.avatar : null
    };
  }
  function migrateExtras(ex) {
    const { w: W, h: H } = dims();
    Object.keys(ex).forEach((k) => {
      const e = ex[k];
      if (e && e.img) {
        if (e.mode === "bg") e.bg = { img: e.img, dim: e.dim == null ? 0.5 : e.dim };
        else { const w = e.w || 0.6, ar = e.ar || 1, ih = (w * W / ar) / H; e.layers = [{ id: uid(), type: "image", src: e.img, ar: ar, x: (e.x == null ? 0.5 : e.x) - w / 2, y: (e.y == null ? 0.3 : e.y) - ih / 2, w: w, round: !!e.round }]; }
        delete e.img; delete e.mode; delete e.dim; delete e.x; delete e.y; delete e.w; delete e.ar; delete e.round;
      }
      if (e && e.layers) e.layers.forEach((L) => { if (!L.id) L.id = uid(); });
    });
    return ex;
  }
  function restore(d) {
    if (!d || typeof d.text !== "string") return false;
    els.text.value = d.text; els.handle.value = d.handle || ""; els.name.value = d.name || ""; els.cta.value = d.cta || "";
    if (/^\d+x\d+$/.test(d.format || "")) { state.format = d.format; els.format.value = d.format; }
    if (THEMES.some((x) => x.id === d.theme)) state.theme = d.theme;
    state.brand = Object.assign({ bg: "", ink: "", accent: "", font: "" }, d.brand || {});
    state.pattern = d.pattern || ""; state.align = d.align === "center" ? "center" : "left";
    if (typeof d.num === "boolean") els.num.checked = d.num; if (typeof d.arrow === "boolean") els.arrow.checked = d.arrow; if (typeof d.cover === "boolean") els.cover.checked = d.cover;
    state.extras = migrateExtras(d.extras && typeof d.extras === "object" ? d.extras : {});
    state.logo = d.logo && d.logo.src ? d.logo : null; state.avatar = d.avatar || null;
    if (d.id) state.id = d.id;
    syncControls();
    return true;
  }
  function lsGet(k, def) { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch (e) { return def; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function projectTitle() { const f = (els.text.value.trim().split("\n")[0] || "").replace(/==|\*\*/g, "").trim(); return f || t("my_untitled"); }
  let draftTimer;
  function saveDraft() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => {
      if (!state.id) state.id = uid();
      const all = lsGet("listai.projects", {});
      const meta = { title: projectTitle(), updated: Date.now(), theme: state.theme, n: slides.length, format: state.format };
      if (!els.text.value.trim() && !Object.keys(state.extras).length) { delete all[state.id]; lsSet("listai.projects", all); return; }
      all[state.id] = { meta, data: snapshot(true) };
      if (!lsSet("listai.projects", all)) { all[state.id] = { meta, data: snapshot(false) }; if (!lsSet("listai.projects", all)) { pruneProjects(all); lsSet("listai.projects", all); } }
      lsSet("listai.current", state.id);
    }, 300);
  }
  function pruneProjects(all) {
    const ids = Object.keys(all).filter((k) => k !== state.id).sort((a, b) => all[a].meta.updated - all[b].meta.updated);
    while (ids.length > 5) delete all[ids.shift()];
  }
  function loadDraft() {
    const cur = lsGet("listai.current", null), all = lsGet("listai.projects", {});
    if (cur && all[cur]) { const ok = restore(all[cur].data); state.id = cur; return ok; }
    const legacy = lsGet("listai.draft", null);
    if (legacy) { const ok = restore(legacy); try { localStorage.removeItem("listai.draft"); } catch (e) {} return ok; }
    return false;
  }
  function brandKit() { return { brand: state.brand, pattern: state.pattern, align: state.align, theme: state.theme, logo: state.logo, avatar: state.avatar, name: els.name.value, handle: els.handle.value }; }
  function applyBrandKit(b) {
    if (!b) return;
    state.brand = Object.assign({ bg: "", ink: "", accent: "", font: "" }, b.brand || {}); state.pattern = b.pattern || ""; state.align = b.align || "left";
    if (THEMES.some((x) => x.id === b.theme)) state.theme = b.theme;
    state.logo = b.logo || null; state.avatar = b.avatar || null; els.name.value = b.name || ""; els.handle.value = b.handle || "";
  }
  function newProject() {
    state.id = uid(); state.extras = {}; els.text.value = ""; els.cta.value = "";
    applyBrandKit(lsGet("listai.brand", null));
    syncControls(); renderThemes(); render(); els.text.focus();
  }
  function openProject(id) {
    const all = lsGet("listai.projects", {});
    if (!all[id]) return;
    restore(all[id].data); state.id = id; lsSet("listai.current", id);
    renderThemes(); render();
  }

  /* ───────── logo / avatar / brand controls ───────── */
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
    const f = els.logoFile.files[0]; els.logoFile.value = ""; if (!f) return;
    try { const im = await readImage(f, 800); state.logo = { src: im.src, pos: els.logoPos.value, size: Number(els.logoSize.value) }; syncControls(); render(); }
    catch (e) { status(t("ed_img_err"), true); }
  });
  els.logoPos.addEventListener("change", () => { if (state.logo) { state.logo.pos = els.logoPos.value; render(); } });
  els.logoSize.addEventListener("input", () => { if (state.logo) { state.logo.size = Number(els.logoSize.value); render(); } });
  els.logoRemove.addEventListener("click", () => { state.logo = null; syncControls(); render(); });
  els.avatarFile.addEventListener("change", async () => {
    const f = els.avatarFile.files[0]; els.avatarFile.value = ""; if (!f) return;
    try { const im = await readImage(f, 400); state.avatar = im.src; syncControls(); render(); } catch (e) { status(t("ed_img_err"), true); }
  });
  els.avatarRemove.addEventListener("click", () => { state.avatar = null; syncControls(); render(); });
  els.cBg.addEventListener("input", () => { state.brand.bg = els.cBg.value; render(); });
  els.cInk.addEventListener("input", () => { state.brand.ink = els.cInk.value; render(); });
  els.cAccent.addEventListener("input", () => { state.brand.accent = els.cAccent.value; render(); });
  els.font.addEventListener("change", () => { state.brand.font = els.font.value; render(); });
  els.pattern.addEventListener("change", () => { state.pattern = els.pattern.value; render(); });
  document.querySelectorAll('input[name="align"]').forEach((r) => r.addEventListener("change", () => { state.align = r.value; render(); }));
  els.brandReset.addEventListener("click", () => { state.brand = { bg: "", ink: "", accent: "", font: "" }; state.pattern = ""; syncControls(); render(); });
  els.brandSave.addEventListener("click", () => { if (lsSet("listai.brand", brandKit())) status(t("brand_saved")); });

  /* ───────── slide editor ───────── */
  const edPrefs = lsGet("listai.editor", { grid: false, safe: false, snap: true });
  function remapExtras(map) { const out = {}; Object.keys(state.extras).forEach((k) => { const j = map(Number(k)); if (j != null) out[j] = state.extras[k]; }); state.extras = out; }
  function openEditor(i) {
    if (!slides[i]) return;
    const ex = ext(i);
    const { w: W, h: H } = dims();
    const isCover = els.cover.checked && i === 0;
    let sel = null, history = [], future = [], editing = false;
    const M = els.modal;
    M.innerHTML =
      '<div class="modal editor" role="dialog" aria-modal="true"><div class="box">' +
      '<div class="ed-head"><h3>' + esc(t("ed_title", i + 1, slides.length)) + '</h3><button class="close" type="button" aria-label="Close">×</button></div>' +
      '<div class="ed-tools">' +
      '<button type="button" class="btn ghost" data-add="text">+ ' + esc(t("tool_text")) + '</button>' +
      '<button type="button" class="btn ghost" data-add="head">+ ' + esc(t("tool_head")) + '</button>' +
      '<label class="btn ghost file-btn">+ ' + esc(t("tool_img")) + '<input type="file" id="ed-add-img" accept="image/*" hidden></label>' +
      '<button type="button" class="btn ghost" data-add="rect">▭ ' + esc(t("tool_rect")) + '</button>' +
      '<button type="button" class="btn ghost" data-add="ellipse">○ ' + esc(t("tool_circle")) + '</button>' +
      '<button type="button" class="btn ghost" data-add="line">— ' + esc(t("tool_line")) + '</button>' +
      '<button type="button" class="btn ghost" id="ed-emoji">☺ ' + esc(t("tool_emoji")) + '</button>' +
      '<span class="sep"></span>' +
      '<button type="button" class="btn ghost" id="ed-grid" aria-pressed="' + edPrefs.grid + '">▦ ' + esc(t("tool_grid")) + '</button>' +
      '<button type="button" class="btn ghost" id="ed-safe" aria-pressed="' + edPrefs.safe + '">▤ ' + esc(t("tool_safe")) + '</button>' +
      '<button type="button" class="btn ghost" id="ed-snap" aria-pressed="' + edPrefs.snap + '">⌗ ' + esc(t("tool_snap")) + '</button>' +
      '<span class="sep"></span>' +
      '<button type="button" class="btn ghost" id="ed-undo" title="Ctrl+Z">↶ ' + esc(t("tool_undo")) + '</button>' +
      '<button type="button" class="btn ghost" id="ed-redo" title="Ctrl+Y">↷ ' + esc(t("tool_redo")) + '</button>' +
      '</div>' +
      '<div class="editor-body"><div class="ed-stage-wrap"><div class="ed-stage" id="ed-stage"><div class="stage" id="ed-inner"></div><div class="ed-grid" id="ed-gridov" hidden></div><div class="ed-safe" id="ed-safe-top" hidden></div><div class="ed-safe" id="ed-safe-bot" hidden></div>' +
      '<div class="ed-guide v" id="ed-gv" hidden></div><div class="ed-guide h" id="ed-gh" hidden></div>' +
      '<div class="ed-sel" id="ed-sel" hidden><div class="hnd nw" data-h="nw"></div><div class="hnd ne" data-h="ne"></div><div class="hnd sw" data-h="sw"></div><div class="hnd se" data-h="se"></div><div class="hnd rot" data-h="rot"></div></div></div></div>' +
      '<div class="ed-props" id="ed-props"></div></div>' +
      '<div class="ed-ops"><button type="button" class="btn ghost" id="ed-prev">' + esc(t("ed_prev")) + '</button><button type="button" class="btn ghost" id="ed-next">' + esc(t("ed_next")) + '</button><button type="button" class="btn ghost" id="ed-dupslide">' + esc(t("ed_dup")) + '</button><button type="button" class="btn ghost" id="ed-delslide">' + esc(t("ed_del")) + '</button><span style="flex:1"></span><button type="button" class="btn" id="ed-done">' + esc(t("ed_done")) + "</button></div>" +
      '<p class="ed-hint">' + esc(t("ed_hint")) + "</p>" +
      "</div></div>";
    const q = (s) => M.querySelector(s);
    const stageEl = q("#ed-stage"), inner = q("#ed-inner"), selBox = q("#ed-sel"), props = q("#ed-props"), gv = q("#ed-gv"), gh = q("#ed-gh");
    const wrapW = Math.min(q(".ed-stage-wrap").clientWidth - 24, 680);
    const k = Math.min(wrapW / W, Math.max(360, window.innerHeight - 330) / H);
    stageEl.style.width = (W * k) + "px"; stageEl.style.height = (H * k) + "px";
    inner.style.transform = "scale(" + k + ")";
    const GRID = W / 12;
    q("#ed-gridov").style.backgroundSize = (GRID * k) + "px " + (GRID * k) + "px";
    q("#ed-prev").disabled = i === 0; q("#ed-next").disabled = i === slides.length - 1;

    /* history */
    const snapNow = () => JSON.stringify({ ex: ex, t: slides[i].title, b: slides[i].body });
    function push() { history.push(snapNow()); if (history.length > 60) history.shift(); future = []; }
    function beginEdit() { if (!editing) { push(); editing = true; } }
    function endEdit() { editing = false; }
    function applySnap(s) { const d = JSON.parse(s); Object.keys(ex).forEach((key) => delete ex[key]); Object.assign(ex, d.ex); slides[i].title = d.t; slides[i].body = d.b; els.text.value = serialize(slides); if (sel && sel.type === "layer" && !layersOf(ex)[sel.idx]) sel = null; paint(); renderProps(); }
    function undo() { if (!history.length) return; future.push(snapNow()); applySnap(history.pop()); }
    function redo() { if (!future.length) return; history.push(snapNow()); applySnap(future.pop()); }

    /* painting */
    function slideEl() { return inner.firstChild; }
    function elFor(s) {
      if (!s) return null;
      if (s.type === "layer") return inner.querySelector('[data-el="layer"][data-idx="' + s.idx + '"]');
      return inner.querySelector('[data-el="' + s.type + '"]');
    }
    function boxOf(s) {
      const el = elFor(s); if (!el) return null;
      const L = s.type === "layer" ? layersOf(ex)[s.idx] : ex[s.type];
      if (L) return { x: L.x * W, y: L.y * H, w: L.w * W, h: el.offsetHeight, rot: L.rot || 0 };
      const r = el.getBoundingClientRect(), sr = slideEl().getBoundingClientRect();
      return { x: (r.left - sr.left) / k, y: (r.top - sr.top) / k, w: r.width / k, h: r.height / k, rot: 0 };
    }
    function paint() {
      inner.innerHTML = ""; inner.appendChild(buildSlide(slides[i], i, slides.length, options()));
      q("#ed-gridov").hidden = !edPrefs.grid; q("#ed-grid").setAttribute("aria-pressed", String(edPrefs.grid));
      q("#ed-safe").setAttribute("aria-pressed", String(edPrefs.safe)); q("#ed-snap").setAttribute("aria-pressed", String(edPrefs.snap));
      const st = q("#ed-safe-top"), sb = q("#ed-safe-bot");
      st.hidden = sb.hidden = !edPrefs.safe;
      if (edPrefs.safe) { const top = H >= 1900 ? 250 : 0, bot = H >= 1900 ? 340 : 0; st.style.top = "0"; st.style.height = (top * k) + "px"; st.hidden = !top; sb.style.bottom = "0"; sb.style.height = (bot * k) + "px"; sb.hidden = !bot; if (!top && !bot) { st.hidden = false; st.style.height = "0"; st.style.top = "0"; } }
      drawSel();
    }
    function drawSel() {
      const b = boxOf(sel);
      if (!b) { selBox.hidden = true; return; }
      selBox.hidden = false;
      selBox.style.left = (b.x * k) + "px"; selBox.style.top = (b.y * k) + "px"; selBox.style.width = (b.w * k) + "px"; selBox.style.height = (b.h * k) + "px";
      selBox.style.transform = b.rot ? "rotate(" + b.rot + "deg)" : ""; selBox.style.transformOrigin = "center";
      const rotatable = sel.type === "layer";
      selBox.querySelector(".rot").hidden = !rotatable;
    }
    function select(s) { sel = s; drawSel(); renderProps(); }

    /* detaching flow text */
    function detach(type) {
      if (ex[type]) return ex[type];
      const b = boxOf({ type }); if (!b) return null;
      ex[type] = { x: b.x / W, y: b.y / H, w: b.w / W, s: 1 };
      paint(); return ex[type];
    }
    function target(s) { return s.type === "layer" ? layersOf(ex)[s.idx] : ex[s.type]; }

    /* snapping */
    function snapAxis(pos, size, total, margin, lines) {
      if (!edPrefs.snap) return { pos, guide: null };
      const th = 8 / k, edges = [pos, pos + size / 2, pos + size];
      const cands = [0, margin, total / 2, total - margin, total].concat(lines);
      for (let e = 0; e < 3; e++) for (const c of cands) if (Math.abs(edges[e] - c) < th) return { pos: pos + (c - edges[e]), guide: c };
      return { pos, guide: null };
    }
    function gridLines(total, step) { const r = []; if (!edPrefs.grid) return r; for (let v = step; v < total; v += step) r.push(v); return r; }

    /* pointer interactions */
    let drag = null;
    stageEl.addEventListener("pointerdown", (e) => {
      const hnd = e.target.closest(".hnd");
      if (hnd) {
        if (!sel) return;
        e.preventDefault(); stageEl.setPointerCapture(e.pointerId);
        const b = boxOf(sel), L = target(sel);
        drag = { mode: hnd.dataset.h, sx: e.clientX, sy: e.clientY, box: b, L: L ? Object.assign({}, L) : null, moved: false, cx: b.x + b.w / 2, cy: b.y + b.h / 2 };
        return;
      }
      if (e.target === selBox) { e.preventDefault(); stageEl.setPointerCapture(e.pointerId); const b = boxOf(sel); drag = { mode: "move", sx: e.clientX, sy: e.clientY, box: b, moved: false }; return; }
      const hit = e.target.closest("[data-el]");
      if (!hit || !inner.contains(hit)) { select(null); return; }
      const s = hit.dataset.el === "layer" ? { type: "layer", idx: Number(hit.dataset.idx) } : { type: hit.dataset.el };
      select(s);
      e.preventDefault(); stageEl.setPointerCapture(e.pointerId);
      drag = { mode: "move", sx: e.clientX, sy: e.clientY, box: boxOf(s), moved: false };
    });
    stageEl.addEventListener("pointermove", (e) => {
      if (!drag || !sel) return;
      const dx = (e.clientX - drag.sx) / k, dy = (e.clientY - drag.sy) / k;
      if (!drag.moved) { if (Math.abs(dx) < 3 / k && Math.abs(dy) < 3 / k) return; drag.moved = true; push(); if (sel.type !== "layer") { detach(sel.type); drag.box = boxOf(sel); } }
      const L = target(sel); if (!L) return;
      const b = drag.box;
      if (drag.mode === "move") {
        const sx = snapAxis(b.x + dx, b.w, W, 84, gridLines(W, GRID)), sy = snapAxis(b.y + dy, b.h, H, 88, gridLines(H, GRID));
        L.x = sx.pos / W; L.y = sy.pos / H;
        gv.hidden = sx.guide == null; if (sx.guide != null) gv.style.left = (sx.guide * k) + "px";
        gh.hidden = sy.guide == null; if (sy.guide != null) gh.style.top = (sy.guide * k) + "px";
      } else if (drag.mode === "rot") {
        const r = stageEl.getBoundingClientRect(), px = (e.clientX - r.left) / k, py = (e.clientY - r.top) / k;
        let a = Math.atan2(py - drag.cy, px - drag.cx) * 180 / Math.PI + 90;
        if (!e.shiftKey) { const s = Math.round(a / 15) * 15; if (Math.abs(a - s) < 4) a = s; }
        L.rot = Math.round(((a % 360) + 360) % 360);
      } else {
        const h = drag.mode, isText = sel.type !== "layer" || L.type === "text", isImg = sel.type === "layer" && L.type === "image", isLine = sel.type === "layer" && L.type === "line";
        let nx = b.x, ny = b.y, nw = b.w, nh = b.h;
        if (h.includes("e")) nw = b.w + dx; if (h.includes("w")) { nw = b.w - dx; nx = b.x + dx; }
        if (h.includes("s")) nh = b.h + dy; if (h.includes("n")) { nh = b.h - dy; ny = b.y + dy; }
        if (isImg) { const ar = L.ar || 1; nh = nw / ar; if (h.includes("n")) ny = b.y + b.h - nh; }
        nw = Math.max(0.06 * W, nw); if (!isImg && !isText && !isLine) nh = Math.max(0.03 * H, nh);
        L.x = nx / W; L.w = nw / W;
        if (isImg) L.y = ny / H; else if (isLine) L.y = ny / H; else if (isText) { L.y = ny / H; } else { L.y = ny / H; L.h = nh / H; }
      }
      paint();
    });
    const endDrag = () => { if (drag && drag.moved) saveDraft(); drag = null; gv.hidden = gh.hidden = true; };
    stageEl.addEventListener("pointerup", endDrag); stageEl.addEventListener("pointercancel", endDrag);

    /* adding layers */
    function addLayer(L) { push(); L.id = uid(); layersOf(ex).push(L); paint(); select({ type: "layer", idx: layersOf(ex).length - 1 }); }
    M.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => {
      const kind = b.dataset.add;
      if (kind === "text") addLayer({ type: "text", text: t("new_text"), size: 44, weight: 700, align: "left", x: 0.1, y: 0.42, w: 0.6 });
      if (kind === "head") addLayer({ type: "text", text: t("new_head"), size: 84, weight: 800, align: "left", font: (FONTS[state.brand.font] || ["Unbounded"])[0], x: 0.08, y: 0.3, w: 0.8 });
      if (kind === "rect") addLayer({ type: "rect", x: 0.1, y: 0.15, w: 0.45, h: 0.22, r: 24 });
      if (kind === "ellipse") addLayer({ type: "ellipse", x: 0.55, y: 0.12, w: 0.3, h: 0.3 * W / H });
      if (kind === "line") addLayer({ type: "line", x: 0.08, y: 0.5, w: 0.84, th: 8 });
    }));
    q("#ed-add-img").addEventListener("change", async (e) => {
      const f = e.target.files[0]; e.target.value = ""; if (!f) return;
      try { const im = await readImage(f, 2160); const w = 0.6; addLayer({ type: "image", src: im.src, ar: im.ar, x: 0.2, y: Math.max(0.05, 0.4 - (w * W / im.ar) / H / 2), w: w }); }
      catch (err) { q(".ed-hint").textContent = t("ed_img_err"); }
    });
    q("#ed-emoji").addEventListener("click", () => {
      const pop = document.createElement("div"); pop.className = "emoji-grid"; pop.style.cssText = "margin-top:6px";
      pop.innerHTML = EMOJIS.map((e) => '<button type="button">' + e + "</button>").join("");
      pop.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; addLayer({ type: "text", text: b.textContent, size: 180, align: "center", x: 0.35, y: 0.3, w: 0.3 }); pop.remove(); });
      const old = M.querySelector(".emoji-grid"); if (old) { old.remove(); return; }
      q(".ed-tools").after(pop);
    });
    q("#ed-grid").addEventListener("click", () => { edPrefs.grid = !edPrefs.grid; lsSet("listai.editor", edPrefs); paint(); });
    q("#ed-safe").addEventListener("click", () => { edPrefs.safe = !edPrefs.safe; lsSet("listai.editor", edPrefs); paint(); });
    q("#ed-snap").addEventListener("click", () => { edPrefs.snap = !edPrefs.snap; lsSet("listai.editor", edPrefs); paint(); });
    q("#ed-undo").addEventListener("click", undo); q("#ed-redo").addEventListener("click", redo);

    /* properties panel */
    function seg(id, items, cur) { return '<div class="seg" id="' + id + '">' + items.map((it) => '<button type="button" data-v="' + it[0] + '" aria-pressed="' + (String(it[0]) === String(cur)) + '">' + esc(it[1]) + "</button>").join("") + "</div>"; }
    function renderProps() {
      const L = sel ? target(sel) : null;
      let h = "";
      if (sel && sel.type === "layer" && L) {
        h += "<h4>" + esc(t("p_sel")) + "</h4>";
        if (L.type === "text") {
          h += '<div class="field"><label>' + esc(t("p_content")) + '</label><textarea id="pp-text">' + esc(L.text || "") + "</textarea></div>" +
            '<div class="field"><label>' + esc(t("p_size")) + '</label><input type="range" id="pp-size" min="16" max="260" value="' + (L.size || 48) + '"></div>' +
            '<div class="field"><label>' + esc(t("p_color")) + '</label><div class="inline"><input type="color" id="pp-color" value="' + (L.color || "#ffffff") + '"><button type="button" class="link" id="pp-color-reset">' + esc(t("p_theme_color")) + "</button></div></div>" +
            '<div class="field"><label>' + esc(t("p_weight")) + "</label>" + seg("pp-weight", [[500, t("w_500")], [700, t("w_700")], [800, t("w_800")]], L.weight || 700) + "</div>" +
            '<div class="field"><label>' + esc(t("p_align")) + "</label>" + seg("pp-align", [["left", t("a_left")], ["center", t("a_center")], ["right", t("a_right")]], L.align || "left") + "</div>" +
            '<div class="field"><label>' + esc(t("p_font")) + '</label><select id="pp-font"><option value="">' + esc(t("font_theme")) + "</option>" + FONT_LIST.map((f) => '<option value="' + f + '"' + (L.font === f ? " selected" : "") + ">" + f + "</option>").join("") + "</select></div>" +
            '<label class="toggles"><input type="checkbox" id="pp-hl"' + (L.hl ? " checked" : "") + "> " + esc(t("p_hl")) + "</label>";
        } else if (L.type === "image") {
          h += '<label class="btn ghost small file-btn">' + esc(t("p_replace")) + '<input type="file" id="pp-replace" accept="image/*" hidden></label>' +
            '<label class="toggles"><input type="checkbox" id="pp-round"' + (L.round ? " checked" : "") + "> " + esc(t("p_round")) + "</label>" +
            '<button type="button" class="btn ghost small" id="pp-asbg">' + esc(t("p_as_bg")) + "</button>";
        } else {
          h += '<div class="field"><label>' + esc(t("p_fill")) + '</label><div class="inline"><input type="color" id="pp-fill" value="' + (L.fill || "#22c38a") + '"><button type="button" class="link" id="pp-fill-reset">' + esc(t("p_theme_color")) + "</button></div></div>";
          if (L.type === "rect") h += '<div class="field"><label>' + esc(t("p_radius")) + '</label><input type="range" id="pp-radius" min="0" max="200" value="' + (L.r || 0) + '"></div>';
          if (L.type === "line") h += '<div class="field"><label>' + esc(t("p_thick")) + '</label><input type="range" id="pp-thick" min="2" max="60" value="' + (L.th || 8) + '"></div>';
        }
        h += '<div class="field"><label>' + esc(t("p_opacity")) + '</label><input type="range" id="pp-op" min="10" max="100" value="' + Math.round((L.op == null ? 1 : L.op) * 100) + '"></div>' +
          '<div class="field"><label>' + esc(t("p_rot")) + '</label><input type="range" id="pp-rot" min="0" max="359" value="' + (L.rot || 0) + '"></div>' +
          '<div class="ed-ops"><button type="button" class="btn ghost" id="pp-up">' + esc(t("p_up")) + '</button><button type="button" class="btn ghost" id="pp-down">' + esc(t("p_down")) + '</button><button type="button" class="btn ghost" id="pp-dup">' + esc(t("p_dup")) + '</button><button type="button" class="btn ghost" id="pp-all">' + esc(t("p_all")) + '</button><button type="button" class="btn ghost" id="pp-del">' + esc(t("p_del")) + "</button></div>";
      } else if (sel && (sel.type === "title" || sel.type === "body")) {
        h += "<h4>" + esc(t(sel.type === "title" ? "p_ttl" : "p_body")) + "</h4>" +
          '<div class="field"><textarea id="pp-flow">' + esc(sel.type === "title" ? slides[i].title : slides[i].body) + "</textarea></div>";
        if (L) h += '<div class="field"><label>' + esc(t("p_scale")) + '</label><input type="range" id="pp-scale" min="50" max="220" value="' + Math.round((L.s || 1) * 100) + '"></div><button type="button" class="btn ghost small" id="pp-reflow">' + esc(t("p_reflow")) + "</button>";
      } else {
        h += "<h4>" + esc(t("p_ttl")) + '</h4><div class="field"><input type="text" id="pp-ttl" value="' + esc(slides[i].title) + '"></div>' +
          "<h4>" + esc(t("p_body")) + '</h4><div class="field"><textarea id="pp-body">' + esc(slides[i].body) + "</textarea></div>";
      }
      h += "<h4>" + esc(t("p_slide")) + "</h4>" +
        '<div class="field"><label>' + esc(t("p_layout")) + '</label><select id="pp-layout">' + LAYOUTS.map((l) => '<option value="' + l + '"' + ((ex.layout || "default") === l ? " selected" : "") + ">" + esc(t("lay_" + l)) + "</option>").join("") + "</select><button type=\"button\" class=\"link\" id=\"pp-layout-all\">" + esc(t("p_layout_all")) + "</button></div>" +
        '<div class="field"><label>' + esc(t("p_textpos")) + '</label><select id="pp-tp"><option value="top">' + esc(t("tp_top")) + '</option><option value="middle">' + esc(t("tp_middle")) + '</option><option value="bottom">' + esc(t("tp_bottom")) + "</option></select></div>" +
        '<label class="toggles"><input type="checkbox" id="pp-below"' + (ex.textBelow ? " checked" : "") + "> " + esc(t("p_below")) + "</label>" +
        '<div class="field"><label>' + esc(t("p_bg")) + '</label><label class="btn ghost small file-btn">' + esc(t(ex.bg ? "p_bg_replace" : "p_bg_add")) + '<input type="file" id="pp-bgfile" accept="image/*" hidden></label>' +
        (ex.bg ? '<label>' + esc(t("p_dim")) + '</label><input type="range" id="pp-dim" min="0" max="85" value="' + Math.round((ex.bg.dim == null ? 0.5 : ex.bg.dim) * 100) + '"><button type="button" class="link" id="pp-bgremove">' + esc(t("p_bg_remove")) + "</button>" : "") + "</div>";
      props.innerHTML = h;
      const P = (s) => props.querySelector(s);
      props.querySelectorAll("input,textarea,select").forEach((inp) => { inp.addEventListener("pointerdown", beginEdit); inp.addEventListener("focus", beginEdit); inp.addEventListener("change", () => { endEdit(); saveDraft(); }); });
      P("#pp-tp").value = ex.textPos || (isCover ? "bottom" : "middle");
      P("#pp-layout").onchange = (e) => { ex.layout = e.target.value; paint(); };
      P("#pp-layout-all").onclick = () => { slides.forEach((_, j) => { ext(j).layout = ex.layout || "default"; }); status(t("p_applied")); };
      P("#pp-tp").onchange = (e) => { ex.textPos = e.target.value; paint(); };
      P("#pp-below").onchange = (e) => { ex.textBelow = e.target.checked; paint(); };
      P("#pp-bgfile").onchange = async (e) => { const f = e.target.files[0]; e.target.value = ""; if (!f) return; try { const im = await readImage(f, 2160); push(); ex.bg = { img: im.src, dim: ex.bg ? ex.bg.dim : 0.5 }; paint(); renderProps(); } catch (err) { q(".ed-hint").textContent = t("ed_img_err"); } };
      if (P("#pp-dim")) P("#pp-dim").oninput = (e) => { ex.bg.dim = Number(e.target.value) / 100; paint(); };
      if (P("#pp-bgremove")) P("#pp-bgremove").onclick = () => { push(); delete ex.bg; paint(); renderProps(); };
      const commit = () => { els.text.value = serialize(slides); paint(); };
      if (P("#pp-ttl")) P("#pp-ttl").oninput = (e) => { slides[i].title = e.target.value.replace(/\n/g, " "); commit(); };
      if (P("#pp-body")) P("#pp-body").oninput = (e) => { slides[i].body = e.target.value.replace(/\n[ \t]*\n+/g, "\n"); commit(); };
      if (P("#pp-flow")) P("#pp-flow").oninput = (e) => { if (sel.type === "title") slides[i].title = e.target.value.replace(/\n/g, " "); else slides[i].body = e.target.value.replace(/\n[ \t]*\n+/g, "\n"); commit(); };
      if (P("#pp-scale")) P("#pp-scale").oninput = (e) => { ex[sel.type].s = Number(e.target.value) / 100; paint(); };
      if (P("#pp-reflow")) P("#pp-reflow").onclick = () => { push(); delete ex[sel.type]; paint(); renderProps(); };
      if (!(sel && sel.type === "layer" && L)) return;
      const bind = (id, fn, ev) => { const n = P(id); if (n) n[ev || "oninput"] = (e) => { fn(e); paint(); }; };
      bind("#pp-text", (e) => { L.text = e.target.value; });
      bind("#pp-size", (e) => { L.size = Number(e.target.value); });
      bind("#pp-color", (e) => { L.color = e.target.value; });
      bind("#pp-color-reset", () => { push(); delete L.color; }, "onclick");
      bind("#pp-font", (e) => { L.font = e.target.value; }, "onchange");
      bind("#pp-hl", (e) => { L.hl = e.target.checked; }, "onchange");
      bind("#pp-round", (e) => { L.round = e.target.checked; }, "onchange");
      bind("#pp-fill", (e) => { L.fill = e.target.value; });
      bind("#pp-fill-reset", () => { push(); delete L.fill; }, "onclick");
      bind("#pp-radius", (e) => { L.r = Number(e.target.value); });
      bind("#pp-thick", (e) => { L.th = Number(e.target.value); });
      bind("#pp-op", (e) => { L.op = Number(e.target.value) / 100; });
      bind("#pp-rot", (e) => { L.rot = Number(e.target.value); });
      ["#pp-weight", "#pp-align"].forEach((id) => { const n = P(id); if (n) n.onclick = (e) => { const b = e.target.closest("button"); if (!b) return; push(); if (id === "#pp-weight") L.weight = Number(b.dataset.v); else L.align = b.dataset.v; paint(); renderProps(); }; });
      if (P("#pp-replace")) P("#pp-replace").onchange = async (e) => { const f = e.target.files[0]; e.target.value = ""; if (!f) return; try { const im = await readImage(f, 2160); push(); L.src = im.src; L.ar = im.ar; paint(); } catch (err) { q(".ed-hint").textContent = t("ed_img_err"); } };
      if (P("#pp-asbg")) P("#pp-asbg").onclick = () => { push(); ex.bg = { img: L.src, dim: 0.5 }; layersOf(ex).splice(sel.idx, 1); sel = null; paint(); renderProps(); };
      const ls = layersOf(ex);
      P("#pp-up").onclick = () => { if (sel.idx < ls.length - 1) { push(); [ls[sel.idx], ls[sel.idx + 1]] = [ls[sel.idx + 1], ls[sel.idx]]; sel.idx++; paint(); renderProps(); } };
      P("#pp-down").onclick = () => { if (sel.idx > 0) { push(); [ls[sel.idx], ls[sel.idx - 1]] = [ls[sel.idx - 1], ls[sel.idx]]; sel.idx--; paint(); renderProps(); } };
      P("#pp-dup").onclick = dupLayer;
      P("#pp-all").onclick = () => { slides.forEach((_, j) => { if (j !== i) { const c = JSON.parse(JSON.stringify(L)); c.id = uid(); layersOf(ext(j)).push(c); } }); status(t("p_applied")); };
      P("#pp-del").onclick = delSel;
    }
    function dupLayer() { if (!sel || sel.type !== "layer") return; push(); const c = JSON.parse(JSON.stringify(layersOf(ex)[sel.idx])); c.id = uid(); c.x += 0.03; c.y += 0.03; layersOf(ex).splice(sel.idx + 1, 0, c); paint(); select({ type: "layer", idx: sel.idx + 1 }); }
    function delSel() {
      if (!sel) return; push();
      if (sel.type === "layer") layersOf(ex).splice(sel.idx, 1); else delete ex[sel.type];
      sel = null; paint(); renderProps(); saveDraft();
    }

    /* keyboard */
    const onKey = (e) => {
      const inField = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      if (e.key === "Escape") { e.preventDefault(); if (sel) select(null); else finish(); return; }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") { e.preventDefault(); redo(); return; }
      if (inField) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") { e.preventDefault(); dupLayer(); return; }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g") { e.preventDefault(); edPrefs.grid = !edPrefs.grid; lsSet("listai.editor", edPrefs); paint(); return; }
      if ((e.key === "Delete" || e.key === "Backspace") && sel) { e.preventDefault(); delSel(); return; }
      if (sel && /^Arrow/.test(e.key)) {
        e.preventDefault();
        let L = target(sel); if (!L) L = detach(sel.type); if (!L) return;
        beginEdit(); const step = (e.shiftKey ? 20 : 4);
        if (e.key === "ArrowLeft") L.x -= step / W; if (e.key === "ArrowRight") L.x += step / W; if (e.key === "ArrowUp") L.y -= step / H; if (e.key === "ArrowDown") L.y += step / H;
        paint(); clearTimeout(onKey.t); onKey.t = setTimeout(() => { endEdit(); saveDraft(); }, 400);
      }
    };
    document.addEventListener("keydown", onKey);

    /* slide ops + finish */
    const finish = () => { document.removeEventListener("keydown", onKey); closeModal(); render(); };
    const reopen = (j) => { document.removeEventListener("keydown", onKey); closeModal(); render(); openEditor(j); };
    q("#ed-prev").onclick = () => { const s = slides[i]; slides[i] = slides[i - 1]; slides[i - 1] = s; els.text.value = serialize(slides); remapExtras((k2) => k2 === i ? i - 1 : k2 === i - 1 ? i : k2); reopen(i - 1); };
    q("#ed-next").onclick = () => { const s = slides[i]; slides[i] = slides[i + 1]; slides[i + 1] = s; els.text.value = serialize(slides); remapExtras((k2) => k2 === i ? i + 1 : k2 === i + 1 ? i : k2); reopen(i + 1); };
    q("#ed-dupslide").onclick = () => { slides.splice(i + 1, 0, Object.assign({}, slides[i])); els.text.value = serialize(slides); remapExtras((k2) => k2 > i ? k2 + 1 : k2); state.extras[i + 1] = JSON.parse(JSON.stringify(ex)); reopen(i + 1); };
    q("#ed-delslide").onclick = () => { slides.splice(i, 1); els.text.value = serialize(slides); remapExtras((k2) => k2 === i ? null : k2 > i ? k2 - 1 : k2); finish(); };
    q(".close").onclick = finish; q("#ed-done").onclick = finish;
    q(".modal").addEventListener("pointerdown", (e) => { if (e.target === e.currentTarget) finish(); });
    paint(); renderProps();
  }

  /* ───────── Pro / licensing ───────── */
  async function keyFor(email) {
    const data = new TextEncoder().encode(email.trim().toLowerCase() + ":" + (CFG.licenseSecret || ""));
    const buf = await crypto.subtle.digest("SHA-256", data);
    const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 16).toUpperCase();
    return hex.match(/.{4}/g).join("-");
  }
  function closeModal() { els.modal.innerHTML = ""; }
  function modalShell(inner, wide) {
    els.modal.innerHTML = '<div class="modal' + (wide ? " wide" : "") + '" role="dialog" aria-modal="true"><div class="box"><button class="close" type="button" aria-label="Close">×</button>' + inner + "</div></div>";
    els.modal.querySelector(".close").onclick = closeModal;
    els.modal.querySelector(".modal").addEventListener("pointerdown", (e) => { if (e.target === e.currentTarget) closeModal(); });
    return (s) => els.modal.querySelector(s);
  }
  function openPro(note) {
    const p = CFG.priceLabel || "$9";
    const q = modalShell("<h3>" + esc(t("pro_title")) + "</h3>" + (note ? "<p><b>" + esc(note) + "</b></p>" : "") +
      "<p>" + esc(t("pro_lead")) + "</p><ul><li>" + esc(t("pro_f1")) + "</li><li>" + esc(t("pro_f2")) + "</li><li>" + esc(t("pro_f3")) + "</li><li>" + esc(t("pro_f4")) + "</li></ul>" +
      '<a class="btn primary" href="' + esc(CFG.payUrl) + '" target="_blank" rel="noopener">' + esc(t("pro_buy", p)) + "</a>" +
      '<button class="btn ghost" type="button" id="m-have">' + esc(t("pro_have")) + "</button>");
    q("#m-have").onclick = openActivate;
  }
  function openActivate() {
    const q = modalShell("<h3>" + esc(t("act_title")) + "</h3><p>" + esc(t("act_lead")) + "</p>" +
      '<div class="field"><label for="m-email">' + esc(t("act_email")) + '</label><input type="email" id="m-email"></div>' +
      '<div class="field"><label for="m-key">' + esc(t("act_key")) + '</label><input type="text" id="m-key" placeholder="XXXX-XXXX-XXXX-XXXX"></div>' +
      '<button class="btn primary" type="button" id="m-act">' + esc(t("act_btn")) + "</button>" +
      '<div class="status" id="m-status"></div>' + (CFG.contact ? "<p>" + esc(t("act_contact", CFG.contact)) + "</p>" : ""));
    q("#m-act").onclick = async () => {
      const email = q("#m-email").value, key = q("#m-key").value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      const st = q("#m-status");
      if ((await keyFor(email)).replace(/-/g, "") === key && key.length === 16) {
        state.pro = true; lsSet("listai.pro", { email, key });
        st.textContent = t("act_ok"); st.classList.remove("err"); setTimeout(() => { closeModal(); applyPro(); render(); }, 900);
      } else { st.textContent = t("act_bad"); st.classList.add("err"); }
    };
  }
  async function verifyStored() {
    if (!state._lic) return;
    try { if ((await keyFor(state._lic.email)) !== state._lic.key.toUpperCase()) { state.pro = false; localStorage.removeItem("listai.pro"); } } catch (e) { state.pro = false; }
  }
  function applyPro() {
    els.proBadge.hidden = !(monetized && state.pro);
    els.proBtn.hidden = !(monetized && !state.pro);
    els.proBtn.textContent = t("pro_btn", CFG.priceLabel || "$9");
    renderThemes();
  }

  /* ───────── projects, ideas, caption, shortcuts ───────── */
  function openProjects() {
    const all = lsGet("listai.projects", {});
    const ids = Object.keys(all).sort((a, b) => all[b].meta.updated - all[a].meta.updated);
    const fmtDate = (ts) => new Date(ts).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", { day: "numeric", month: "short" });
    const q = modalShell("<h3>" + esc(t("my_title")) + '</h3><div class="inline"><button type="button" class="btn primary small" id="my-new">+ ' + esc(t("my_new")) + "</button></div>" +
      (ids.length ? '<div class="cards">' + ids.map((id) => {
        const m = all[id].meta, th = THEMES.find((x) => x.id === m.theme) || THEMES[0];
        return '<div class="card" data-id="' + id + '"><div class="sw" style="' + th.sw + '"></div><b>' + esc(m.title) + "</b>" +
          '<span class="meta">' + esc(t("counting", m.n || 0)) + " · " + fmtDate(m.updated) + (id === state.id ? " · " + esc(t("my_cur")) : "") + "</span>" +
          '<div class="ops"><button type="button" class="link" data-op="open">' + esc(t("my_open")) + '</button><button type="button" class="link" data-op="dup">' + esc(t("my_dup")) + '</button><button type="button" class="link" data-op="del">' + esc(t("my_del")) + "</button></div></div>";
      }).join("") + "</div>" : "<p>" + esc(t("my_empty")) + "</p>"), true);
    q("#my-new").onclick = () => { closeModal(); newProject(); };
    els.modal.querySelectorAll(".card").forEach((card) => {
      const id = card.dataset.id;
      card.addEventListener("click", (e) => {
        const op = e.target.dataset.op;
        if (op === "del") {
          if (e.target.dataset.armed) { delete all[id]; lsSet("listai.projects", all); if (id === state.id) { state.id = null; } card.remove(); return; }
          e.target.dataset.armed = "1"; e.target.textContent = t("my_del_confirm"); return;
        }
        if (op === "dup") { const nid = uid(); const copy = JSON.parse(JSON.stringify(all[id])); copy.data.id = nid; copy.meta.updated = Date.now(); all[nid] = copy; lsSet("listai.projects", all); closeModal(); openProject(nid); return; }
        closeModal(); openProject(id);
      });
    });
  }
  function openIdeas() {
    const niches = Object.keys(I18N[lang].ideas);
    let cur = niches[0];
    const q = modalShell("<h3>" + esc(t("ideas_title")) + "</h3><p>" + esc(t("ideas_hint")) + '</p><div class="ideas"><div class="niche" id="niche"></div><ul id="idea-list"></ul></div>', true);
    const paintIdeas = () => {
      q("#niche").innerHTML = niches.map((n) => '<button type="button" data-n="' + n + '" aria-pressed="' + (n === cur) + '">' + esc(t("niche_" + n)) + "</button>").join("");
      q("#idea-list").innerHTML = I18N[lang].ideas[cur].map((h, idx) => '<li><button type="button" data-i="' + idx + '">' + esc(h) + "</button></li>").join("");
    };
    paintIdeas();
    q("#niche").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; cur = b.dataset.n; paintIdeas(); });
    q("#idea-list").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      const hook = I18N[lang].ideas[cur][Number(b.dataset.i)];
      const rest = I18N[lang].tpls.list.split("\n\n").slice(1).join("\n\n");
      const txt = hook + "\n" + t("idea_sub") + "\n\n" + rest;
      if (!isTemplateText(els.text.value)) newProject();
      els.text.value = txt; state.extras = {}; closeModal(); render(); els.text.focus();
    });
  }
  function openCaption() {
    const o = options();
    const heads = slides.slice(1).map((s, idx) => (idx + 1) + ". " + s.title.replace(/==|\*\*/g, "")).join("\n");
    const cap = (slides[0] ? slides[0].title.replace(/==|\*\*/g, "") + (slides[0].body ? "\n" + slides[0].body.replace(/==|\*\*/g, "") : "") : "") + "\n\n" + heads + "\n\n" + t("cap_save") + " " + o.cta + (o.handle ? "\n\n" + o.handle : "");
    const q = modalShell("<h3>" + esc(t("cap_title")) + "</h3><p>" + esc(t("cap_hint")) + '</p><textarea id="cap-text" style="min-height:220px">' + esc(cap.trim()) + '</textarea><button type="button" class="btn primary" id="cap-copy">' + esc(t("cap_copy")) + "</button>");
    q("#cap-copy").onclick = async () => {
      const ta = q("#cap-text");
      try { await navigator.clipboard.writeText(ta.value); } catch (e) { ta.select(); try { document.execCommand("copy"); } catch (e2) {} }
      q("#cap-copy").textContent = t("cap_copied");
    };
  }
  function openKeys() {
    const rows = [["Ctrl/⌘ + Enter", "k_export"], ["Ctrl/⌘ + Z", "k_undo"], ["Ctrl/⌘ + Shift + Z, Ctrl + Y", "k_redo"], ["Ctrl/⌘ + D", "k_dup"], ["Ctrl/⌘ + G", "k_grid"], ["Delete", "k_del"], ["← ↑ → ↓", "k_move"], ["Shift + ← ↑ → ↓", "k_move5"], ["Esc", "k_esc"]];
    modalShell("<h3>" + esc(t("keys_title")) + '</h3><div class="kbd-list">' + rows.map((r) => "<kbd>" + esc(r[0]) + "</kbd><span>" + esc(t(r[1])) + "</span>").join("") + "</div>");
  }

  /* ───────── UI wiring ───────── */
  function renderThemes() {
    els.themes.innerHTML = "";
    THEMES.forEach((th) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "theme"; b.setAttribute("aria-pressed", String(th.id === state.theme)); b.title = th.name[lang];
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
  els.save.addEventListener("click", () => { save(new Blob([JSON.stringify(snapshot(true))], { type: "application/json" }), "carousel.listai.json"); status(t("saved")); });
  els.open.addEventListener("change", () => {
    const f = els.open.files[0]; els.open.value = ""; if (!f) return;
    const fr = new FileReader();
    fr.onload = () => { try { const d = JSON.parse(fr.result); if (d && d.v && restore(d)) { state.id = uid(); renderThemes(); render(); status(t("opened")); } else status(t("err_open"), true); } catch (e) { status(t("err_open"), true); } };
    fr.readAsText(f);
  });
  els.clear.addEventListener("click", () => { els.text.value = ""; state.extras = {}; render(); status(t("cleared")); els.text.focus(); });
  els.caption.addEventListener("click", openCaption);
  els.projects.addEventListener("click", openProjects);
  els.ideas.addEventListener("click", openIdeas);
  els.keys.addEventListener("click", openKeys);
  els.proBtn.addEventListener("click", () => openPro());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && els.modal.firstChild && !els.modal.querySelector(".editor")) { closeModal(); render(); }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); exportZip(); }
  });

  /* ───────── PWA ───────── */
  let installEvt = null;
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installEvt = e; els.install.hidden = false; });
  els.install.addEventListener("click", async () => { if (!installEvt) return; installEvt.prompt(); const r = await installEvt.userChoice.catch(() => null); if (r && r.outcome === "accepted") { els.install.hidden = true; status(t("installed")); } installEvt = null; });
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost") && !/claude/i.test(location.hostname)) {
    window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
  }

  /* ───────── demo notice (hosted preview, downloads disabled there) ───────── */
  if (/claude/i.test(location.hostname)) {
    const n = document.createElement("p"); n.className = "status";
    n.style.cssText = "margin:0 0 12px;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--panel)";
    n.textContent = lang === "ru" ? "Это демо-версия для просмотра. Скачивание работает на основном сайте: yangorovet-lab.github.io/m20-" : "Preview copy. Downloads work on the main site: yangorovet-lab.github.io/m20-";
    document.querySelector(".hero").appendChild(n);
  }

  /* ───────── boot ───────── */
  const restored = loadDraft();
  if (!restored) { applyBrandKit(lsGet("listai.brand", null)); state.id = uid(); }
  if (!els.text.value.trim()) els.text.value = I18N[lang].sample;
  syncControls();
  verifyStored().finally(applyLang);
  document.fonts.ready.then(fit);
})();
