/* =========================================================
   engine.js
   طبقة المنطق: قراءة البيانات، التصفية، التقييم، الحفظ.
   جميع الدوال هنا جاهزة للعمل الكامل، وتتعامل مع بيانات
   فارغة دون أي أعطال (تعيد قيم افتراضية آمنة).
   ========================================================= */

const Engine = (function () {

  const STORAGE_KEY = "app_progress_v1";

  /* ---------- الوصول إلى البيانات ---------- */

  function getLevel(levelId) {
    return (window.APP_DATA && window.APP_DATA[levelId]) || null;
  }

  function getSection(levelId, sectionName) {
    const level = getLevel(levelId);
    if (!level || !Array.isArray(level[sectionName])) return [];
    return level[sectionName];
  }

  function getWords(levelId) {
    return getSection(levelId, "words");
  }

  function getGrammar(levelId) {
    return getSection(levelId, "grammar");
  }

  function getDialogues(levelId) {
    return getSection(levelId, "dialogues");
  }

  function getStories(levelId) {
    return getSection(levelId, "stories");
  }

  function getQuizzes(levelId) {
    return getSection(levelId, "quizzes");
  }

  /* ---------- إحصاءات المستوى ---------- */

  function getLevelStats(levelId) {
    return {
      words: getWords(levelId).length,
      grammar: getGrammar(levelId).length,
      dialogues: getDialogues(levelId).length,
      stories: getStories(levelId).length,
      quizzes: getQuizzes(levelId).length
    };
  }

  function getAllLevelsStats() {
    const levels = window.APP_LEVELS || [];
    const result = {};
    levels.forEach(function (levelId) {
      result[levelId] = getLevelStats(levelId);
    });
    return result;
  }

  /* ---------- اختبار التحديد السريع ---------- */

  const PLACEMENT_TEST_TARGET_COUNT = 10;
  const PLACEMENT_TEST_DEMO_COUNT = 3;

  function buildPlacementQuestions() {
    const levels = window.APP_LEVELS || [];
    let pooled = [];

    levels.forEach(function (levelId) {
      const quizzes = getQuizzes(levelId);
      quizzes.forEach(function (q) {
        pooled.push(Object.assign({}, q, { level: levelId }));
      });
    });

    const isDemoData = pooled.length <= levels.length;
    const questions = pooled.slice(0, PLACEMENT_TEST_DEMO_COUNT);

    return {
      questions: questions,
      isDemoData: isDemoData,
      targetCount: PLACEMENT_TEST_TARGET_COUNT,
      currentCount: pooled.length
    };
  }

  function evaluatePlacementAnswers(questions, userAnswers) {
    let correct = 0;
    questions.forEach(function (q, index) {
      if (userAnswers[index] !== undefined && userAnswers[index] === q.answer) {
        correct++;
      }
    });

    const total = questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    let suggestedLevel = "A1";
    if (percentage >= 85) suggestedLevel = "B2";
    else if (percentage >= 65) suggestedLevel = "B1";
    else if (percentage >= 40) suggestedLevel = "A2";

    return {
      correct: correct,
      total: total,
      percentage: percentage,
      suggestedLevel: suggestedLevel
    };
  }

  /* ---------- التقييم النهائي لمستوى معين ---------- */

  function evaluateLevelQuiz(levelId, userAnswers) {
    const quizzes = getQuizzes(levelId);
    if (quizzes.length === 0) {
      return {
        hasContent: false,
        correct: 0,
        total: 0,
        percentage: 0,
        passed: false
      };
    }

    let correct = 0;
    quizzes.forEach(function (q, index) {
      if (userAnswers[index] !== undefined && userAnswers[index] === q.answer) {
        correct++;
      }
    });

    const percentage = Math.round((correct / quizzes.length) * 100);

    return {
      hasContent: true,
      correct: correct,
      total: quizzes.length,
      percentage: percentage,
      passed: percentage >= 60
    };
  }

  /* ---------- حفظ واسترجاع التقدم ---------- */

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultProgress();
      const parsed = JSON.parse(raw);
      return Object.assign(getDefaultProgress(), parsed);
    } catch (err) {
      console.error("Engine.loadProgress error:", err);
      return getDefaultProgress();
    }
  }

  function getDefaultProgress() {
    const levels = window.APP_LEVELS || [];
    const levelProgress = {};
    levels.forEach(function (levelId) {
      levelProgress[levelId] = { bestScore: 0, attempts: 0, completed: false };
    });

    return {
      placementDone: false,
      suggestedLevel: null,
      currentLevel: levels[0] || null,
      levels: levelProgress
    };
  }

  function saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      return true;
    } catch (err) {
      console.error("Engine.saveProgress error:", err);
      return false;
    }
  }

  function recordQuizResult(levelId, result) {
    const progress = loadProgress();
    if (!progress.levels[levelId]) {
      progress.levels[levelId] = { bestScore: 0, attempts: 0, completed: false };
    }

    const levelProgress = progress.levels[levelId];
    levelProgress.attempts += 1;
    if (result.percentage > levelProgress.bestScore) {
      levelProgress.bestScore = result.percentage;
    }
    if (result.passed) {
      levelProgress.completed = true;
    }

    saveProgress(progress);
    return progress;
  }

  function resetProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (err) {
      console.error("Engine.resetProgress error:", err);
      return false;
    }
  }

  /* ---------- الواجهة العامة ---------- */

  return {
    getLevel: getLevel,
    getWords: getWords,
    getGrammar: getGrammar,
    getDialogues: getDialogues,
    getStories: getStories,
    getQuizzes: getQuizzes,
    getLevelStats: getLevelStats,
    getAllLevelsStats: getAllLevelsStats,
    buildPlacementQuestions: buildPlacementQuestions,
    evaluatePlacementAnswers: evaluatePlacementAnswers,
    evaluateLevelQuiz: evaluateLevelQuiz,
    loadProgress: loadProgress,
    saveProgress: saveProgress,
    recordQuizResult: recordQuizResult,
    resetProgress: resetProgress
  };

})();
