/* =========================================================
   ui.js
   طبقة الواجهة: بناء عناصر HTML وعرض الشاشات المختلفة.
   جميع الدوال جاهزة للعمل، وتعرض بيانات فارغة أو رسائل
   "قريباً" عند عدم وجود محتوى حقيقي بعد.
   ========================================================= */

const UI = (function () {

  const screenRoot = function () {
    return document.getElementById("screen-root");
  };

  /* ---------- أدوات مساعدة لبناء العناصر ---------- */

  function el(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined && content !== null) node.innerHTML = content;
    return node;
  }

  function clearScreen() {
    const root = screenRoot();
    if (root) root.innerHTML = "";
  }

  function iconMarkup(name) {
    return '<i class="fa-solid ' + name + '"></i>';
  }

  /* ---------- الشاشة الرئيسية ---------- */

  function renderHome() {
    clearScreen();
    const root = screenRoot();
    if (!root) return;

    const header = el("header", "app-header");
    header.appendChild(el("h1", "app-title", "منصة التعلم"));
    header.appendChild(el("p", "app-subtitle", "اختر مستواك وابدأ التعلم"));
    root.appendChild(header);

    const actions = el("div", "home-actions");
    const placementBtn = el("button", "btn btn-primary", iconMarkup("fa-bolt") + " اختبار تحديد المستوى");
    placementBtn.addEventListener("click", function () {
      App.navigateTo("placement");
    });
    actions.appendChild(placementBtn);
    root.appendChild(actions);

    const grid = el("div", "levels-grid");
    const levels = window.APP_LEVELS || [];
    const stats = Engine.getAllLevelsStats();
    const labels = window.APP_LEVEL_LABELS || {};

    levels.forEach(function (levelId) {
      const s = stats[levelId] || { words: 0, grammar: 0, dialogues: 0, stories: 0, quizzes: 0 };
      const card = el("div", "level-card");
      card.setAttribute("data-level", levelId);

      card.appendChild(el("div", "level-card-badge", levelId));
      card.appendChild(el("div", "level-card-name", labels[levelId] || levelId));

      const countRow = el("div", "level-card-count");
      countRow.appendChild(el("span", "count-number", String(s.words)));
      countRow.appendChild(el("span", "count-label", "كلمة"));
      card.appendChild(countRow);

      card.addEventListener("click", function () {
        App.navigateTo("level", { levelId: levelId });
      });

      grid.appendChild(card);
    });

    root.appendChild(grid);
  }

  /* ---------- شاشة تفاصيل المستوى ---------- */

  function renderLevel(levelId) {
    clearScreen();
    const root = screenRoot();
    if (!root) return;

    const labels = window.APP_LEVEL_LABELS || {};
    const header = el("header", "app-header with-back");

    const backBtn = el("button", "btn-icon back-btn", iconMarkup("fa-arrow-right"));
    backBtn.addEventListener("click", function () { App.navigateTo("home"); });
    header.appendChild(backBtn);

    header.appendChild(el("h1", "app-title", labels[levelId] || levelId));
    root.appendChild(header);

    const sections = [
      { key: "words", label: "الكلمات", icon: "fa-book" },
      { key: "grammar", label: "القواعد", icon: "fa-diagram-project" },
      { key: "dialogues", label: "الحوارات", icon: "fa-comments" },
      { key: "stories", label: "القصص", icon: "fa-feather" },
      { key: "quizzes", label: "الاختبار", icon: "fa-clipboard-check" }
    ];

    const list = el("div", "section-list");
    sections.forEach(function (sec) {
      const items = Engine.getLevel(levelId) ? Engine.getLevel(levelId)[sec.key] : [];
      const count = Array.isArray(items) ? items.length : 0;

      const row = el("div", "section-row");
      row.appendChild(el("div", "section-row-icon", iconMarkup(sec.icon)));
      row.appendChild(el("div", "section-row-label", sec.label));
      row.appendChild(el("div", "section-row-count", String(count)));

      row.addEventListener("click", function () {
        if (sec.key === "quizzes") {
          App.navigateTo("quiz", { levelId: levelId });
        } else {
          App.navigateTo("content", { levelId: levelId, sectionKey: sec.key, sectionLabel: sec.label });
        }
      });

      list.appendChild(row);
    });

    root.appendChild(list);
  }

  /* ---------- شاشة عرض محتوى قسم ---------- */

  function renderContent(levelId, sectionKey, sectionLabel) {
    clearScreen();
    const root = screenRoot();
    if (!root) return;

    const header = el("header", "app-header with-back");
    const backBtn = el("button", "btn-icon back-btn", iconMarkup("fa-arrow-right"));
    backBtn.addEventListener("click", function () { App.navigateTo("level", { levelId: levelId }); });
    header.appendChild(backBtn);
    header.appendChild(el("h1", "app-title", sectionLabel));
    root.appendChild(header);

    const items = Engine.getLevel(levelId) ? Engine.getLevel(levelId)[sectionKey] : [];

    if (!items || items.length === 0) {
      root.appendChild(renderEmptyState("لا يوجد محتوى بعد", "سيتم إضافة المحتوى قريباً."));
      return;
    }

    const list = el("div", "content-list");
    items.forEach(function (item) {
      const card = el("div", "content-card");
      card.innerHTML = renderItemMarkup(sectionKey, item);
      list.appendChild(card);
    });
    root.appendChild(list);
  }

  function renderItemMarkup(sectionKey, item) {
    switch (sectionKey) {
      case "words":
        return '<div class="item-word">' + (item.word || "") + '</div>' +
               '<div class="item-translation">' + (item.translation || "") + '</div>';
      case "grammar":
        return '<div class="item-rule">' + (item.rule || "") + '</div>';
      case "dialogues":
        return '<div class="item-dialogue">' + (item.dialogue || "") + '</div>';
      case "stories":
        return '<div class="item-story">' + (item.story || "") + '</div>';
      default:
        return "";
    }
  }

  /* ---------- شاشة اختبار تحديد المستوى ---------- */

  function renderPlacementTest() {
    clearScreen();
    const root = screenRoot();
    if (!root) return;

    const header = el("header", "app-header with-back");
    const backBtn = el("button", "btn-icon back-btn", iconMarkup("fa-arrow-right"));
    backBtn.addEventListener("click", function () { App.navigateTo("home"); });
    header.appendChild(backBtn);
    header.appendChild(el("h1", "app-title", "اختبار تحديد المستوى"));
    root.appendChild(header);

    const data = Engine.buildPlacementQuestions();

    if (data.isDemoData) {
      root.appendChild(renderNotice(
        "هذا عرض تجريبي للاختبار",
        "المحتوى الحقيقي قيد الإعداد. الاختبار الكامل سيضم " + data.targetCount + " أسئلة."
      ));
    }

    if (data.questions.length === 0) {
      root.appendChild(renderEmptyState("لا توجد أسئلة بعد", "سيتم إضافة الأسئلة قريباً."));
      return;
    }

    const userAnswers = [];
    const form = el("div", "quiz-form");

    data.questions.forEach(function (q, index) {
      const qCard = el("div", "quiz-question");
      qCard.appendChild(el("div", "quiz-question-text", (index + 1) + ". " + (q.question || "")));

      const optionsWrap = el("div", "quiz-options");
      (q.options || []).forEach(function (opt) {
        const optBtn = el("button", "quiz-option", opt);
        optBtn.addEventListener("click", function () {
          userAnswers[index] = opt;
          Array.from(optionsWrap.children).forEach(function (c) { c.classList.remove("selected"); });
          optBtn.classList.add("selected");
        });
        optionsWrap.appendChild(optBtn);
      });

      qCard.appendChild(optionsWrap);
      form.appendChild(qCard);
    });

    root.appendChild(form);

    const submitBtn = el("button", "btn btn-primary submit-btn", "عرض النتيجة");
    submitBtn.addEventListener("click", function () {
      const result = Engine.evaluatePlacementAnswers(data.questions, userAnswers);
      renderPlacementResult(result);
    });
    root.appendChild(submitBtn);
  }

  function renderPlacementResult(result) {
    clearScreen();
    const root = screenRoot();
    if (!root) return;

    const header = el("header", "app-header with-back");
    const backBtn = el("button", "btn-icon back-btn", iconMarkup("fa-arrow-right"));
    backBtn.addEventListener("click", function () { App.navigateTo("home"); });
    header.appendChild(backBtn);
    header.appendChild(el("h1", "app-title", "نتيجتك"));
    root.appendChild(header);

    const resultCard = el("div", "result-card");
    resultCard.appendChild(el("div", "result-score", result.percentage + "%"));
    resultCard.appendChild(el("div", "result-detail", result.correct + " من " + result.total + " إجابات صحيحة"));
    resultCard.appendChild(el("div", "result-suggestion", "المستوى المقترح: " + result.suggestedLevel));
    root.appendChild(resultCard);

    root.appendChild(renderNotice("ملاحظة", "هذه النتيجة مبنية على أسئلة تجريبية فقط."));

    const homeBtn = el("button", "btn btn-primary", "العودة للرئيسية");
    homeBtn.addEventListener("click", function () { App.navigateTo("home"); });
    root.appendChild(homeBtn);
  }

  /* ---------- شاشة اختبار المستوى النهائي ---------- */

  function renderLevelQuiz(levelId) {
    clearScreen();
    const root = screenRoot();
    if (!root) return;

    const labels = window.APP_LEVEL_LABELS || {};
    const header = el("header", "app-header with-back");
    const backBtn = el("button", "btn-icon back-btn", iconMarkup("fa-arrow-right"));
    backBtn.addEventListener("click", function () { App.navigateTo("level", { levelId: levelId }); });
    header.appendChild(backBtn);
    header.appendChild(el("h1", "app-title", "اختبار " + (labels[levelId] || levelId)));
    root.appendChild(header);

    const quizzes = Engine.getQuizzes(levelId);

    if (quizzes.length === 0) {
      root.appendChild(renderEmptyState("لا يوجد اختبار بعد", "سيتم إضافة أسئلة هذا المستوى قريباً."));
      return;
    }

    const userAnswers = [];
    const form = el("div", "quiz-form");

    quizzes.forEach(function (q, index) {
      const qCard = el("div", "quiz-question");
      qCard.appendChild(el("div", "quiz-question-text", (index + 1) + ". " + (q.question || "")));

      const optionsWrap = el("div", "quiz-options");
      (q.options || []).forEach(function (opt) {
        const optBtn = el("button", "quiz-option", opt);
        optBtn.addEventListener("click", function () {
          userAnswers[index] = opt;
          Array.from(optionsWrap.children).forEach(function (c) { c.classList.remove("selected"); });
          optBtn.classList.add("selected");
        });
        optionsWrap.appendChild(optBtn);
      });

      qCard.appendChild(optionsWrap);
      form.appendChild(qCard);
    });

    root.appendChild(form);

    const submitBtn = el("button", "btn btn-primary submit-btn", "إنهاء الاختبار");
    submitBtn.addEventListener("click", function () {
      const result = Engine.evaluateLevelQuiz(levelId, userAnswers);
      Engine.recordQuizResult(levelId, result);
      renderLevelResult(levelId, result);
    });
    root.appendChild(submitBtn);
  }

  function renderLevelResult(levelId, result) {
    clearScreen();
    const root = screenRoot();
    if (!root) return;

    const header = el("header", "app-header with-back");
    const backBtn = el("button", "btn-icon back-btn", iconMarkup("fa-arrow-right"));
    backBtn.addEventListener("click", function () { App.navigateTo("level", { levelId: levelId }); });
    header.appendChild(backBtn);
    header.appendChild(el("h1", "app-title", "نتيجة الاختبار"));
    root.appendChild(header);

    const resultCard = el("div", "result-card");
    resultCard.appendChild(el("div", "result-score", result.percentage + "%"));
    resultCard.appendChild(el("div", "result-detail", result.correct + " من " + result.total + " إجابات صحيحة"));
    resultCard.appendChild(el("div", "result-status", result.passed ? "ناجح" : "أعد المحاولة"));
    root.appendChild(resultCard);

    const homeBtn = el("button", "btn btn-primary", "العودة إلى المستوى");
    homeBtn.addEventListener("click", function () { App.navigateTo("level", { levelId: levelId }); });
    root.appendChild(homeBtn);
  }

  /* ---------- عناصر مشتركة ---------- */

  function renderEmptyState(title, message) {
    const wrap = el("div", "empty-state");
    wrap.appendChild(el("div", "empty-state-icon", iconMarkup("fa-clock")));
    wrap.appendChild(el("div", "empty-state-title", title));
    wrap.appendChild(el("div", "empty-state-message", message));
    return wrap;
  }

  function renderNotice(title, message) {
    const wrap = el("div", "notice-box");
    wrap.appendChild(el("div", "notice-title", title));
    wrap.appendChild(el("div", "notice-message", message));
    return wrap;
  }

  /* ---------- الواجهة العامة ---------- */

  return {
    renderHome: renderHome,
    renderLevel: renderLevel,
    renderContent: renderContent,
    renderPlacementTest: renderPlacementTest,
    renderPlacementResult: renderPlacementResult,
    renderLevelQuiz: renderLevelQuiz,
    renderLevelResult: renderLevelResult,
    renderEmptyState: renderEmptyState,
    renderNotice: renderNotice
  };

})();
