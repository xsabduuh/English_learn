/* =========================================================
   app.js
   الملف الرئيسي المدير: يربط data.js و engine.js و ui.js
   ويدير التنقل بين الشاشات.
   ========================================================= */

const App = (function () {

  let currentScreen = "home";
  let currentParams = {};

  /* ---------- التنقل ---------- */

  function navigateTo(screenName, params) {
    currentScreen = screenName;
    currentParams = params || {};

    switch (screenName) {
      case "home":
        UI.renderHome();
        break;

      case "level":
        if (currentParams.levelId) {
          UI.renderLevel(currentParams.levelId);
        } else {
          notifyLoading();
          UI.renderHome();
        }
        break;

      case "content":
        if (currentParams.levelId && currentParams.sectionKey) {
          UI.renderContent(currentParams.levelId, currentParams.sectionKey, currentParams.sectionLabel || "");
        } else {
          notifyLoading();
          UI.renderHome();
        }
        break;

      case "placement":
        UI.renderPlacementTest();
        break;

      case "quiz":
        if (currentParams.levelId) {
          UI.renderLevelQuiz(currentParams.levelId);
        } else {
          notifyLoading();
          UI.renderHome();
        }
        break;

      default:
        notifyLoading();
        UI.renderHome();
        break;
    }

    window.scrollTo(0, 0);
  }

  function notifyLoading() {
    console.log("جاري التحميل... (شاشة أو بيانات غير متوفرة بعد)");
  }

  /* ---------- بدء التشغيل ---------- */

  function init() {
    if (typeof window.APP_DATA === "undefined") {
      console.error("App.init error: APP_DATA غير معرف. تأكد من تحميل data.js أولاً.");
      return;
    }

    Engine.loadProgress();
    navigateTo("home");
  }

  document.addEventListener("DOMContentLoaded", init);

  /* ---------- الواجهة العامة ---------- */

  return {
    navigateTo: navigateTo,
    getCurrentScreen: function () { return currentScreen; }
  };

})();
