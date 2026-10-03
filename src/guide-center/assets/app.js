(function () {
  "use strict";

  var guides = Array.isArray(window.LEARN_MEDICAT_GUIDES) ? window.LEARN_MEDICAT_GUIDES : [];
  var tools = Array.isArray(window.LEARN_MEDICAT_TOOLS) ? window.LEARN_MEDICAT_TOOLS : [];
  var glossary = Array.isArray(window.LEARN_MEDICAT_GLOSSARY) ? window.LEARN_MEDICAT_GLOSSARY : [];
  var intake = window.LEARN_MEDICAT_INTAKE && typeof window.LEARN_MEDICAT_INTAKE === "object" ? window.LEARN_MEDICAT_INTAKE : {};
  var passwordModule = window.LEARN_MEDICAT_PASSWORD && typeof window.LEARN_MEDICAT_PASSWORD === "object" ? window.LEARN_MEDICAT_PASSWORD : {};

  var view = document.getElementById("view");
  var main = document.getElementById("main-content");
  var search = document.getElementById("guide-search");
  var searchResults = document.getElementById("search-results");
  var sidePanel = document.getElementById("side-panel");
  var menuToggle = document.getElementById("menu-toggle");
  var mobileNavigation = window.matchMedia("(max-width: 54rem)");
  var intakeCount = document.getElementById("intake-count");
  var intakeProgress = document.getElementById("intake-progress-bar");
  var intakeTitle = document.getElementById("intake-title");
  var intakeSidebarAction = document.getElementById("intake-sidebar-action");
  var jobSummaryFields = Array.prototype.slice.call(document.querySelectorAll("[data-job-summary]"));
  var jobState = loadJobState();
  var toolCategory = "featured";
  var toolFilter = "";

  var KIND_LABELS = {
    recommended: "Recommended",
    explain: "Why this action",
    skip: "Safe to skip",
    attention: "Pay attention",
    stop: "Stop here",
    success: "How to know it worked",
    failure: "If it did not work",
    understand: "Understand why",
    advanced: "Advanced"
  };

  var RISK_LABELS = {
    low: "Low write risk",
    medium: "Consequential",
    high: "Destructive potential"
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function textList(items, ordered) {
    if (!items || !items.length) {
      return "";
    }
    var tag = ordered ? "ol" : "ul";
    return "<" + tag + ">" + items.map(function (item) {
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("") + "</" + tag + ">";
  }

  function paragraphs(items) {
    return (items || []).map(function (item) {
      return "<p>" + escapeHtml(item) + "</p>";
    }).join("");
  }

  function findGuide(id) {
    return guides.filter(function (guide) {
      return guide.id === id;
    })[0] || null;
  }

  function findQuestion(id) {
    var core = (intake.questions || []).filter(function (question) {
      return question.id === id;
    })[0];
    if (core) {
      return core;
    }
    var branches = intake.branchQuestions || {};
    var branchIds = Object.keys(branches);
    for (var index = 0; index < branchIds.length; index += 1) {
      if (branches[branchIds[index]].id === id) {
        return branches[branchIds[index]];
      }
    }
    return null;
  }

  function findOption(question, id) {
    if (!question) {
      return null;
    }
    return (question.options || []).filter(function (option) {
      return option.id === id;
    })[0] || null;
  }

  function selectedJobOption() {
    return findOption(findQuestion("job"), jobState.answers.job);
  }

  function selectedGuideId() {
    var job = selectedJobOption();
    return job ? job.guide : "";
  }

  function getIntakeQuestions() {
    var job = selectedJobOption();
    var questionIds = job ? (job.questionIds || intake.coreQuestionIds || []) : ["job"];
    var questions = questionIds.map(findQuestion).filter(Boolean);
    var guideId = selectedGuideId();
    var branch = guideId && intake.branchQuestions ? intake.branchQuestions[guideId] : null;
    if (branch) {
      questions.push(branch);
    }
    return questions;
  }

  function expectedIntakeQuestionCount() {
    return getIntakeQuestions().length;
  }

  function answeredQuestionCount(questions) {
    return (questions || getIntakeQuestions()).filter(function (question) {
      return Boolean(findOption(question, jobState.answers[question.id]));
    }).length;
  }

  function intakeIsComplete() {
    var questions = getIntakeQuestions();
    return questions.length > 0 && answeredQuestionCount(questions) === questions.length;
  }

  function hasJobAnswers() {
    return Object.keys(jobState.answers || {}).length > 0;
  }

  function twoDigit(value) {
    return value < 10 ? "0" + value : String(value);
  }

  function routeTo(route) {
    var next = "#" + route;
    if (window.location.hash === next) {
      renderRoute();
    } else {
      window.location.hash = next;
    }
  }

  function currentRoute() {
    var raw = window.location.hash.replace(/^#/, "");
    return raw || "home";
  }

  function setCurrentNavigation(route) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-route]"), function (button) {
      var buttonRoute = button.getAttribute("data-route");
      var active = buttonRoute === route ||
        (route.indexOf("guide=") === 0 && buttonRoute === "all-guides") ||
        (route.indexOf("tool=") === 0 && buttonRoute === "tools") ||
        (route.indexOf("password=") === 0 && buttonRoute === "password") ||
        (route.indexOf("lockpick=") === 0 && buttonRoute === "lockpick");
      if (active) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  function syncNavigationAccessibility() {
    var open = sidePanel.getAttribute("data-open") === "true";
    var hidden = mobileNavigation.matches && !open;

    if (hidden) {
      sidePanel.setAttribute("aria-hidden", "true");
      sidePanel.setAttribute("inert", "");
    } else {
      sidePanel.removeAttribute("aria-hidden");
      sidePanel.removeAttribute("inert");
    }
  }

  function closeMobileMenu() {
    sidePanel.removeAttribute("data-open");
    menuToggle.setAttribute("aria-expanded", "false");
    syncNavigationAccessibility();
  }

  function openMobileMenu() {
    sidePanel.setAttribute("data-open", "true");
    menuToggle.setAttribute("aria-expanded", "true");
    syncNavigationAccessibility();
  }

  function updateDocumentTitle(title) {
    document.title = (title ? title + " — " : "") + "MediCat Field Guide";
  }

  function pageHeader(title, eyebrow, summary, meta) {
    var metaHtml = (meta || []).map(function (item) {
      var className = item.className || "tag";
      var data = item.data ? " data-level=\"" + escapeHtml(item.data) + "\"" : "";
      return "<span class=\"" + className + "\"" + data + ">" + escapeHtml(item.label) + "</span>";
    }).join("");

    return [
      "<header class=\"page-header\">",
      "  <div class=\"breadcrumbs\"><button type=\"button\" data-route=\"home\">Start Here</button><span>/</span><span>" + escapeHtml(eyebrow) + "</span></div>",
      "  <h1>" + escapeHtml(title) + "</h1>",
      "  <p class=\"page-deck\">" + escapeHtml(summary) + "</p>",
      metaHtml ? "  <div class=\"meta-row\">" + metaHtml + "</div>" : "",
      "</header>"
    ].join("");
  }

  function renderHome() {
    updateDocumentTitle("Start Here");
    var intakeAction = intakeIsComplete() ? "View current job brief" : (hasJobAnswers() ? "Resume guided intake" : "Start guided intake");
    var jobs = (findQuestion("job") || {}).options || [];
    var cards = jobs.map(function (job, index) {
      return [
        "<button class=\"goal-card\" type=\"button\" data-start-job=\"" + escapeHtml(job.id) + "\">",
        "  <span class=\"goal-index\">ROUTE " + twoDigit(index + 1) + "</span>",
        "  <h3>" + escapeHtml(job.label) + "</h3>",
        "  <p>" + escapeHtml(job.detail) + "</p>",
        "</button>"
      ].join("");
    }).join("");

    view.innerHTML = [
      "<section class=\"hero\">",
      "  <div>",
      "    <div class=\"hero-kicker\">Authorized repair field manual</div>",
      "    <h1>Find the fault. <em>Protect the outcome.</em></h1>",
      "  </div>",
      "  <div class=\"hero-summary\">",
      "    <p><strong>Start with what is happening.</strong> Choose the closest problem or goal below. A few questions will narrow the next step, what can wait, and when to stop.</p>",
      "    <p>This prototype never changes a disk by itself.</p>",
      "    <div class=\"action-row\"><button class=\"primary-action\" type=\"button\" data-route=\"intake\">" + escapeHtml(intakeAction) + " <span aria-hidden=\"true\">→</span></button><button class=\"secondary-action\" type=\"button\" data-route=\"lockpick\">Jayro's Lockpick programs</button></div>",
      "  </div>",
      "</section>",
      "<section class=\"workflow-section\" aria-labelledby=\"goal-heading\">",
      "  <div class=\"section-heading\">",
      "    <span class=\"number\">01</span>",
      "    <div><h2 id=\"goal-heading\">What is happening, or what do you need to do?</h2><p>Choose the closest answer. You can change it later, or browse all workflows without answering.</p></div>",
      "  </div>",
      "  <div class=\"goal-grid\">" + cards + "</div>",
      "</section>",
      "<section class=\"workflow-section\" aria-labelledby=\"principles-heading\">",
      "  <div class=\"section-heading\">",
      "    <span class=\"number\">02</span>",
      "    <div><h2 id=\"principles-heading\">Three rules before any repair</h2><p>These prevent most irreversible mistakes without turning an informal repair into paperwork.</p></div>",
      "  </div>",
      "  <div class=\"first-principles\">",
      "    <article class=\"principle\"><strong>Identify the physical target</strong><p>Drive letters change. Use model, capacity, partition layout, and the actual requested device.</p></article>",
      "    <article class=\"principle\"><strong>Protect what must survive</strong><p>Confirm data, encryption keys, passkeys, 2FA, and recovery paths before the old environment disappears.</p></article>",
      "    <article class=\"principle\"><strong>Write only to the failed layer</strong><p>Firmware, partitioning, boot files, Windows, and hardware are different layers. Diagnose first.</p></article>",
      "  </div>",
      "</section>"
    ].join("");
  }

  function renderIntakeOptions(question) {
    var selected = jobState.answers[question.id];
    return (question.options || []).map(function (option, index) {
      var pressed = selected === option.id ? "true" : "false";
      return [
        "<button class=\"intake-option\" type=\"button\" data-question=\"" + escapeHtml(question.id) + "\" data-intake-option=\"" + escapeHtml(option.id) + "\" aria-pressed=\"" + pressed + "\">",
        "  <span class=\"option-index\">" + twoDigit(index + 1) + "</span>",
        "  <span><strong>" + escapeHtml(option.label) + "</strong><small>" + escapeHtml(option.detail) + "</small></span>",
        "</button>"
      ].join("");
    }).join("");
  }

  function addUnique(items, value) {
    if (value && items.indexOf(value) === -1) {
      items.push(value);
    }
  }

  function addManyUnique(items, values) {
    (values || []).forEach(function (value) {
      addUnique(items, value);
    });
  }

  function strongerStatus(current, candidate) {
    var rank = { ready: 0, caution: 1, stop: 2 };
    return (rank[candidate] || 0) > (rank[current] || 0) ? candidate : current;
  }

  function evaluateJobBrief(questions) {
    var guideId = selectedGuideId();
    var job = selectedJobOption();
    var asked = questions.map(function (question) { return question.id; });
    var branchQuestion = questions[questions.length - 1];
    var branchOption = findOption(branchQuestion, jobState.answers[branchQuestion.id]);
    var destructive = Boolean((job && job.destructive) || (branchOption && branchOption.destructive));
    var result = {
      status: branchOption && branchOption.status ? branchOption.status : "caution",
      finding: branchOption ? branchOption.finding : "The branch-specific finding is incomplete.",
      routeGuideId: branchOption && branchOption.nextGuide ? branchOption.nextGuide : guideId,
      actions: [],
      holds: [],
      avoid: [],
      ignore: []
    };

    if (branchOption) {
      addUnique(result.actions, branchOption.next);
      addManyUnique(result.avoid, branchOption.avoid);
      addManyUnique(result.ignore, branchOption.ignore);
    }

    if (asked.indexOf("target") !== -1 && jobState.answers.target !== "confirmed") {
      result.status = strongerStatus(result.status, destructive ? "stop" : "caution");
      addUnique(result.holds, "Identify the intended device and physical disk by model, capacity, and layout before any write.");
      addUnique(result.avoid, "Do not rely on a drive letter or disk number as the device identity.");
    }

    if (asked.indexOf("authority") !== -1 && jobState.answers.authority !== "confirmed") {
      result.status = strongerStatus(result.status, destructive || guideId === "identify-password-problem" ? "stop" : "caution");
      addUnique(result.holds, "Confirm who controls the device and the exact authorized outcome before changing credentials or data.");
    }

    if (asked.indexOf("preservation") !== -1 && jobState.answers.preservation === "undecided") {
      result.status = strongerStatus(result.status, destructive ? "stop" : "caution");
      addUnique(result.holds, "Decide what must survive before choosing a method that can change the disk, account, or installation.");
    }

    if (asked.indexOf("preservation") !== -1 && jobState.answers.preservation === "must-preserve" && destructive) {
      result.status = "stop";
      addUnique(result.holds, "Complete and verify the preservation plan before the authorized workflow becomes destructive.");
      addUnique(result.avoid, "Do not let a clean-install or wipe route silently replace a preservation requirement.");
    }

    if (jobState.answers.preservation === "must-preserve" && guideId === "identify-password-problem") {
      result.status = strongerStatus(result.status, "caution");
      addUnique(result.actions, "Check whether the drive asks for a BitLocker recovery key or needed files are encrypted. A password reset may not make those files open.");
    }

    if (asked.indexOf("identity") !== -1 && jobState.answers.identity !== "safe") {
      result.status = strongerStatus(result.status, destructive ? "stop" : "caution");
      if (jobState.answers.identity === "at-risk") {
        addUnique(result.holds, "Create and verify replacement passkeys, authenticator access, recovery codes, password-vault access, and required encryption keys before erasing this environment.");
      } else {
        addUnique(result.holds, "Check whether this device is a passkey, authenticator, approval device, recovery-code holder, password vault, or encryption-key holder.");
      }
      addUnique(result.avoid, "Do not treat a file backup as proof that account recovery is covered.");
    }

    return result;
  }

  function renderAnswerSummary(questions) {
    return questions.map(function (question, index) {
      var option = findOption(question, jobState.answers[question.id]);
      return [
        "<button class=\"brief-answer\" type=\"button\" data-intake-edit=\"" + index + "\">",
        "  <span>" + escapeHtml(question.label) + "</span>",
        "  <strong>" + escapeHtml(option ? option.label : "Pending") + "</strong>",
        "  <small>Change</small>",
        "</button>"
      ].join("");
    }).join("");
  }

  function renderJobBrief(questions) {
    var job = selectedJobOption();
    var result = evaluateJobBrief(questions);
    var guide = findGuide(result.routeGuideId);
    var passwordPath = selectedGuideId() === "identify-password-problem" ? jobState.answers[branchQuestionId(questions)] : "unknown";
    var statusLabels = {
      ready: "Route ready",
      caution: "Proceed with checks",
      stop: "Hold before writing"
    };

    return [
      pageHeader(
        "Current job brief",
        "Guided intake complete",
        "A routing brief based on categorical answers from this browser session. It does not execute a tool or prove that an installed component is compatible.",
        [
          { label: statusLabels[result.status], className: "risk-badge", data: result.status === "stop" ? "high" : (result.status === "caution" ? "medium" : "low") },
          { label: job ? job.label : "Unclassified", className: "evidence-badge" }
        ]
      ),
      "<section class=\"brief-status\" data-status=\"" + escapeHtml(result.status) + "\" aria-labelledby=\"brief-status-title\">",
      "  <div class=\"status-code\">" + escapeHtml(statusLabels[result.status]) + "</div>",
      "  <h2 id=\"brief-status-title\" tabindex=\"-1\">" + escapeHtml(result.finding) + "</h2>",
      "</section>",
      "<section class=\"brief-layout\">",
      "  <div class=\"brief-main\">",
      "    <section class=\"brief-block\" data-kind=\"recommended\"><div class=\"block-label\">Do this next</div><h2>Recommended route</h2>" + textList(result.actions, true) + "</section>",
      result.holds.length ? "    <section class=\"brief-block\" data-kind=\"stop\"><div class=\"block-label\">Resolve before writing</div><h2>Unfinished conditions</h2>" + textList(result.holds, false) + "</section>" : "",
      "    <section class=\"brief-block\" data-kind=\"attention\"><div class=\"block-label\">Do not do yet</div><h2>Methods that do not fit the evidence</h2>" + textList(result.avoid, false) + "</section>",
      "    <section class=\"brief-block\" data-kind=\"skip\"><div class=\"block-label\">Safe to ignore for now</div><h2>Work outside the current layer</h2>" + textList(result.ignore, false) + "</section>",
      "  </div>",
      "  <aside class=\"brief-answers\" aria-labelledby=\"brief-answers-title\"><div class=\"section-kicker\">Session answers</div><h2 id=\"brief-answers-title\">What this brief used</h2>" + renderAnswerSummary(questions) + "</aside>",
      "</section>",
      "<section class=\"brief-actions\" aria-label=\"Job brief actions\">",
      guide && guide.id === "identify-password-problem" ? "  <button class=\"primary-action\" type=\"button\" data-route=\"password=" + escapeHtml(findPasswordPath(passwordPath) ? passwordPath : "unknown") + "\">Open password and access module <span aria-hidden=\"true\">→</span></button>" :
        (guide ? "  <button class=\"primary-action\" type=\"button\" data-guide=\"" + escapeHtml(guide.id) + "\">Open " + escapeHtml(guide.title) + " <span aria-hidden=\"true\">→</span></button>" : ""),
      "  <button class=\"secondary-action\" type=\"button\" data-intake-edit=\"0\">Revise answers</button>",
      "  <button class=\"text-action danger-action\" type=\"button\" data-intake-reset>Clear session answers</button>",
      "</section>"
    ].join("");
  }

  function branchQuestionId(questions) {
    return questions[questions.length - 1].id;
  }

  function normalizeIntakePosition(questions) {
    var firstUnanswered = -1;
    questions.some(function (question, index) {
      if (!findOption(question, jobState.answers[question.id])) {
        firstUnanswered = index;
        return true;
      }
      return false;
    });

    if (typeof jobState.position !== "number" || jobState.position < 0) {
      jobState.position = firstUnanswered === -1 ? questions.length : firstUnanswered;
    }
    if (jobState.position > questions.length) {
      jobState.position = questions.length;
    }
    if (firstUnanswered !== -1 && jobState.position > firstUnanswered) {
      jobState.position = firstUnanswered;
    }
  }

  function renderIntake() {
    updateDocumentTitle("Guided intake");
    var questions = getIntakeQuestions();
    normalizeIntakePosition(questions);

    if (intakeIsComplete() && jobState.position >= questions.length) {
      view.innerHTML = renderJobBrief(questions);
      return;
    }

    var question = questions[jobState.position] || questions[0];
    var totalQuestions = expectedIntakeQuestionCount();
    var progress = totalQuestions ? Math.round((answeredQuestionCount(questions) / totalQuestions) * 100) : 0;
    var back = jobState.position > 0 ? "<button class=\"secondary-action\" type=\"button\" data-intake-back>← Previous question</button>" : "";

    view.innerHTML = [
      pageHeader(
        "Build the job brief",
        "Guided intake",
        "A few categorical answers narrow the repair route without collecting a customer name, credential, recovery key, or device serial number.",
        [{ label: "Session only", className: "evidence-badge" }]
      ),
      "<section class=\"intake-workspace\" aria-labelledby=\"intake-question-title\">",
      "  <div class=\"intake-meter\"><div><span>Question " + (jobState.position + 1) + " of " + totalQuestions + "</span><strong>" + progress + "% answered</strong></div><span><i style=\"width:" + progress + "%\"></i></span></div>",
      "  <div class=\"question-kicker\">" + escapeHtml(question.label) + "</div>",
      "  <h2 id=\"intake-question-title\" tabindex=\"-1\">" + escapeHtml(question.title) + "</h2>",
      "  <p class=\"question-prompt\">" + escapeHtml(question.prompt) + "</p>",
      "  <div class=\"intake-options\">" + renderIntakeOptions(question) + "</div>",
      "  <div class=\"intake-controls\">" + back + "<span>Choose the closest verified answer. You can revise it from the brief.</span></div>",
      "</section>"
    ].join("");
  }

  function renderAllGuides() {
    updateDocumentTitle("All workflows");
    var cards = guides.map(function (guide) {
      return [
        "<button class=\"catalog-card\" type=\"button\" data-guide=\"" + escapeHtml(guide.id) + "\">",
        "  <span class=\"evidence-badge\">" + escapeHtml(guide.category) + "</span>",
        "  <h2>" + escapeHtml(guide.title) + "</h2>",
        "  <p>" + escapeHtml(guide.summary) + "</p>",
        "  <div class=\"card-footer\">" + escapeHtml(RISK_LABELS[guide.risk] || guide.risk) + " · " + escapeHtml(guide.evidenceStatus) + "</div>",
        "</button>"
      ].join("");
    }).join("");

    view.innerHTML = pageHeader(
      "All workflows",
      "Guide index",
      "Problem-led routes and supporting guides. Exact tool procedures remain gated by installed-version evidence.",
      [{ label: guides.length + " prototype workflows", className: "evidence-badge" }]
    ) + "<section class=\"content-section\"><div class=\"catalog-grid\">" + cards + "</div></section>";
  }

  function findPasswordPath(id) {
    return (passwordModule.paths || []).filter(function (path) {
      return path.id === id;
    })[0] || null;
  }

  function findLockpickProgram(id) {
    return (passwordModule.programs || []).filter(function (program) {
      return program.id === id;
    })[0] || null;
  }

  function renderLockpickProgram(id) {
    var program = id ? findLockpickProgram(id) : null;
    if (id && !program) {
      renderNotFound();
      return;
    }

    updateDocumentTitle(program ? program.name : "Jayro's Lockpick");
    if (!program) {
      var groups = [
        { key: "Preparation", label: "Before a password reset" },
        { key: "Windows account tools", label: "Windows sign-in tools" },
        { key: "SQL Server account tool", label: "Database login" }
      ];
      var listings = groups.map(function (group) {
        var rows = (passwordModule.programs || []).filter(function (item) {
          return item.group === group.key;
        }).map(function (item) {
          return [
            "<button class=\"lockpick-row\" type=\"button\" data-route=\"lockpick=" + escapeHtml(item.id) + "\">",
            "<span><strong>" + escapeHtml(item.name) + "</strong><span>" + escapeHtml(item.summary) + "</span></span>",
            "<span class=\"lockpick-row-arrow\" aria-hidden=\"true\">→</span></button>"
          ].join("");
        }).join("");
        return "<div class=\"lockpick-group\"><h3>" + escapeHtml(group.label) + "</h3>" + rows + "</div>";
      }).join("");
      var environment = (passwordModule.environment || []).map(function (item) {
        return "<div><strong>" + escapeHtml(item.title) + "</strong><p>" + escapeHtml(item.text) + "</p></div>";
      }).join("");

      view.innerHTML = [
        "<div class=\"lockpick-page\">",
        pageHeader("Jayro's Lockpick", "MediCat password tools",
          "Lockpick is a temporary Windows-like desktop on the MediCat USB. Pick the problem you are trying to solve, then open the matching tool lesson."),
        "<section class=\"lockpick-choices\" aria-labelledby=\"lockpick-choose-title\"><h2 id=\"lockpick-choose-title\">What do you need to do?</h2><div class=\"lockpick-choice-grid\">",
        "<button type=\"button\" data-route=\"lockpick=pcunlocker\"><strong>Forgot the Windows password</strong><span>For a user on this computer who does not sign in with a Microsoft or work email. Start with PCUnlocker.</span><b aria-hidden=\"true\">→</b></button>",
        "<button type=\"button\" data-route=\"password\"><strong>PIN, Microsoft sign-in, or recovery key</strong><span>First identify what is asking for access. A password tool may not help.</span><b aria-hidden=\"true\">→</b></button>",
        "<button type=\"button\" data-route=\"lockpick=sql-server-password-changer\"><strong>SQL Server database login</strong><span>This is separate from signing in to Windows.</span><b aria-hidden=\"true\">→</b></button>",
        "</div></section>",
        "<p class=\"lockpick-safety\"><strong>Before clearing a password:</strong> make sure you have the right computer and user. If the drive asks for a BitLocker recovery key, or the owner needs encrypted files, pause and use the access guide first.</p>",
        "<section class=\"lockpick-listing\" aria-labelledby=\"lockpick-all-title\"><h2 id=\"lockpick-all-title\">All 14 tools in the launcher</h2><p>The menu has several tools for similar jobs. You can ignore the others when one route above fits your problem.</p>" + listings + "</section>",
        "<details class=\"lockpick-more\"><summary>Using the Lockpick desktop</summary><div class=\"lockpick-more-body\">" + environment + "</div></details>",
        "</div>"
      ].join("");
      return;
    }

    var hasSteps = Boolean(program.steps && program.steps.length);
    var guidance = hasSteps ? [
      "<section class=\"lockpick-steps\"><h2>How to use it</h2>",
      "<p>These steps come from product guidance. If the Lockpick screen does not match, stop rather than guessing.</p>",
      textList(program.steps, true),
      "<div class=\"lockpick-outcome\"><p><strong>Stop if:</strong> " + escapeHtml(program.stopPlain) + "</p><p><strong>Check afterward:</strong> " + escapeHtml(program.check) + "</p></div></section>"
    ].join("") : [
      "<section class=\"lockpick-steps\"><h2>What to do next</h2><p>" + escapeHtml(program.next) + "</p>",
      program.id === "pcunlocker" ? "" : "<button class=\"secondary-action\" type=\"button\" data-route=\"lockpick=pcunlocker\">Open PCUnlocker lesson →</button>",
      "</section>"
    ].join("");
    var reference = [
      "<details class=\"lockpick-more\"><summary>Version and further reading</summary><div class=\"lockpick-more-body\">",
      "<p>Lockpick lists this tool as version " + escapeHtml(program.version) + ". " + (hasSteps ? "The linked instructions may describe a different release." : "We do not yet have reliable step-by-step instructions for this copy.") + "</p>",
      program.source ? "<p><a href=\"" + escapeHtml(program.source) + "\" target=\"_blank\" rel=\"noopener noreferrer\">Read more about this tool →</a></p>" : "",
      "</div></details>"
    ].join("");

    view.innerHTML = [
      "<div class=\"lockpick-page\">",
      pageHeader(program.name, "Jayro's Lockpick / tool guide", program.summary),
      "<div class=\"action-row\"><button class=\"secondary-action\" type=\"button\" data-route=\"lockpick\">← All Lockpick tools</button></div>",
      "<div class=\"lockpick-lesson\"><section class=\"lockpick-fit\"><span>Use it when</span><p>" + escapeHtml(program.useWhen) + "</p></section>",
      guidance,
      reference,
      "</div></div>"
    ].join("");
  }

  function renderPasswordModule(pathId) {
    var path = pathId ? findPasswordPath(pathId) : null;
    if (pathId && !path) {
      renderNotFound();
      return;
    }

    updateDocumentTitle(path ? path.label : passwordModule.title);
    if (!path) {
      var cards = (passwordModule.paths || []).map(function (item) {
        return [
          "<button class=\"goal-card\" type=\"button\" data-route=\"password=" + escapeHtml(item.id) + "\">",
          "<h3>" + escapeHtml(item.label) + "</h3>",
          "<p>" + escapeHtml(item.clue) + "</p>",
          "</button>"
        ].join("");
      }).join("");
      view.innerHTML = [
        pageHeader(passwordModule.title, "Find the right access route", passwordModule.summary),
        "<section class=\"workflow-section\" aria-labelledby=\"password-paths-title\"><div class=\"section-heading\"><div><h2 id=\"password-paths-title\">What does the screen ask for?</h2><p>Choose the closest match. You can return here if it turns out to be a different kind of lock.</p></div></div>",
        "<div class=\"goal-grid\">" + cards + "</div></section>",
        "<p class=\"lockpick-safety\">Already know this is a forgotten password for an account on this computer? <button class=\"text-action\" type=\"button\" data-route=\"lockpick=pcunlocker\">Open the PCUnlocker lesson →</button></p>"
      ].join("");
      return;
    }

    var sources = (path.sources || []).map(function (source) {
      return "<li><a href=\"" + escapeHtml(source.url) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + escapeHtml(source.label) + "</a></li>";
    }).join("");
    view.innerHTML = [
      pageHeader(path.label, "Password and access", path.first),
      "<div class=\"action-row\"><button class=\"secondary-action\" type=\"button\" data-route=\"password\">← Choose a different screen</button></div>",
      "<div class=\"lockpick-lesson\">",
      "<section class=\"lockpick-steps\"><h2>What to do</h2>" + textList(path.steps, true) + "</section>",
      "<section class=\"lockpick-fit\"><span>Where Lockpick fits</span><p>" + escapeHtml(path.medicat) + "</p>",
      path.id === "local-password" ? "<button class=\"secondary-action\" type=\"button\" data-route=\"lockpick=pcunlocker\">Open PCUnlocker lesson →</button>" : "",
      "</section>",
      "<div class=\"lockpick-outcome lockpick-path-outcome\"><p><strong>Pause if:</strong> " + escapeHtml(path.stop) + "</p><p><strong>Check afterward:</strong> " + escapeHtml(path.verify) + "</p></div>",
      "<details class=\"lockpick-more\"><summary>Further reading</summary><div class=\"lockpick-more-body\"><ul>" + sources + "</ul><p>These links need an internet connection; the steps above are available offline.</p></div></details>",
      "</div>"
    ].join("");
  }

  function renderSection(section) {
    var failureHtml = "";
    if (section.failures && section.failures.length) {
      failureHtml = "<div class=\"failure-grid\">" + section.failures.map(function (failure) {
        return [
          "<article class=\"failure-card\">",
          "  <strong>" + escapeHtml(failure.when) + "</strong>",
          "  <p>" + escapeHtml(failure.next) + "</p>",
          "</article>"
        ].join("");
      }).join("") + "</div>";
    }

    return [
      "<section class=\"guide-block\" id=\"" + escapeHtml(section.id) + "\" data-kind=\"" + escapeHtml(section.kind) + "\">",
      "  <div class=\"block-label\">" + escapeHtml(section.label || KIND_LABELS[section.kind] || section.kind) + "</div>",
      "  <h2>" + escapeHtml(section.title) + "</h2>",
      paragraphs(section.paragraphs),
      textList(section.bullets, false),
      failureHtml,
      "</section>"
    ].join("");
  }

  function renderSources(sources) {
    if (!sources || !sources.length) {
      return [
        "<section class=\"guide-block\" id=\"sources\" data-kind=\"attention\">",
        "  <div class=\"block-label\">Evidence status</div>",
        "  <h2>Primary sources still required</h2>",
        "  <p>This prototype section expresses the approved workflow and safety requirements. Provider- or version-specific claims must be sourced before release.</p>",
        "</section>"
      ].join("");
    }

    return [
      "<section class=\"guide-block\" id=\"sources\" data-kind=\"advanced\">",
      "  <div class=\"block-label\">Evidence</div>",
      "  <h2>Primary references</h2>",
      "  <ul class=\"source-list\">",
      sources.map(function (source) {
        return [
          "<li>",
          "  <span class=\"source-status\">" + escapeHtml(source.status) + "</span>",
          "  <span><a href=\"" + escapeHtml(source.url) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + escapeHtml(source.label) + "</a><br>" + escapeHtml(source.note || "") + "</span>",
          "</li>"
        ].join("");
      }).join(""),
      "  </ul>",
      "</section>"
    ].join("");
  }

  function renderRelated(guide) {
    var related = (guide.related || []).map(findGuide).filter(Boolean);
    if (!related.length) {
      return "";
    }
    return [
      "<section class=\"content-section\" aria-labelledby=\"related-heading\">",
      "  <div class=\"section-heading\"><span class=\"number\">NEXT</span><div><h2 id=\"related-heading\">Related routes</h2></div></div>",
      "  <div class=\"catalog-grid\">",
      related.map(function (item) {
        return [
          "<button class=\"catalog-card\" type=\"button\" data-guide=\"" + escapeHtml(item.id) + "\">",
          "  <span class=\"evidence-badge\">" + escapeHtml(item.category) + "</span>",
          "  <h3>" + escapeHtml(item.title) + "</h3>",
          "  <p>" + escapeHtml(item.summary) + "</p>",
          "</button>"
        ].join("");
      }).join(""),
      "  </div>",
      "</section>"
    ].join("");
  }

  function renderGuide(id) {
    var guide = findGuide(id);
    if (!guide) {
      renderNotFound();
      return;
    }

    updateDocumentTitle(guide.title);
    var rail = guide.sections.map(function (section) {
      return "<a href=\"#" + escapeHtml(section.id) + "\" data-anchor=\"" + escapeHtml(section.id) + "\">" + escapeHtml(section.label) + "</a>";
    }).join("") + "<a href=\"#sources\" data-anchor=\"sources\">Evidence</a>";

    var content = guide.sections.map(renderSection).join("") + renderSources(guide.sources);
    var tags = (guide.tags || []).slice(0, 6).map(function (tag) {
      return { label: tag, className: "tag" };
    });
    var meta = [
      { label: RISK_LABELS[guide.risk] || guide.risk, className: "risk-badge", data: guide.risk },
      { label: guide.evidenceStatus, className: "evidence-badge" }
    ].concat(tags);

    view.innerHTML = [
      pageHeader(guide.title, guide.eyebrow, guide.summary, meta),
      id === "identify-password-problem" ? "<div class=\"action-row\"><button class=\"primary-action\" type=\"button\" data-route=\"password\">Open password and access module <span aria-hidden=\"true\">→</span></button></div>" : "",
      "<div class=\"guide-layout\">",
      "  <article class=\"guide-content\">",
      "    <section class=\"guide-block\" data-kind=\"recommended\">",
      "      <div class=\"block-label\">Your outcome</div>",
      "      <h2>" + escapeHtml(guide.goalPrompt) + "</h2>",
      "    </section>",
      content,
      "  </article>",
      "  <nav class=\"guide-rail\" aria-label=\"On this page\"><strong>On this page</strong>" + rail + "</nav>",
      "</div>",
      renderRelated(guide)
    ].join("");
  }

  function renderTools() {
    updateDocumentTitle("Tool directory");
    var categories = tools.map(function (tool) { return tool.category; }).filter(function (item, index, all) {
      return all.indexOf(item) === index;
    }).sort();
    view.innerHTML = pageHeader(
      "Tool directory",
      "What is on this MediCat drive",
      "Find a program by name or job. Each entry explains its purpose and where it lives. The short lessons are useful starting points; the password section has its own deeper guide.",
      [{ label: tools.length + " named tools", className: "evidence-badge" }]
    ) + [
      "<section class=\"content-section\">",
      "  <div class=\"tool-finder\">",
      "    <label for=\"tool-filter\">Find a program</label>",
      "    <input id=\"tool-filter\" type=\"search\" autocomplete=\"off\" placeholder=\"Try ‘backup’, ‘memory’, or a program name\" value=\"" + escapeHtml(toolFilter) + "\">",
      "    <label for=\"tool-category\">Browse by job</label>",
      "    <select id=\"tool-category\"><option value=\"featured\">Good starting points</option><option value=\"all\">All programs</option>" + categories.map(function (category) {
        return "<option value=\"" + escapeHtml(category) + "\"" + (category === toolCategory ? " selected" : "") + ">" + escapeHtml(category) + "</option>";
      }).join("") + "</select>",
      "  </div>",
      "  <p class=\"tool-directory-note\">The list comes from program folders and boot images found on this F: copy. Repeated copies are combined. A file being present does not prove it boots or works.</p>",
      "  <p id=\"tool-result-count\" class=\"section-kicker\" aria-live=\"polite\"></p>",
      "  <div id=\"tool-results\" class=\"tool-results\"></div>",
      "</section>"
    ].join("");
    updateToolResults();
  }

  function updateToolResults() {
    var list = document.getElementById("tool-results");
    if (!list) { return; }
    var query = toolFilter.trim().toLowerCase();
    var matches = tools.filter(function (tool) {
      var categoryMatches = query && toolCategory === "featured" ? true :
        toolCategory === "all" || (toolCategory === "featured" ? Boolean(tool.lesson) : tool.category === toolCategory);
      var text = [tool.name, tool.purpose, tool.category].concat(tool.locations || [tool.location]).join(" ").toLowerCase();
      return categoryMatches && (!query || query.split(/\s+/).every(function (term) { return text.indexOf(term) !== -1; }));
    });
    document.getElementById("tool-result-count").textContent = matches.length + " of " + tools.length + " entries shown";
    list.innerHTML = matches.length ? matches.map(function (tool) {
      return "<button class=\"tool-row\" type=\"button\" data-route=\"tool=" + escapeHtml(encodeURIComponent(tool.id)) + "\"><span><strong>" + escapeHtml(tool.name) + "</strong><small>" + escapeHtml(tool.category) + " · " + escapeHtml(tool.kind) + ((tool.locations || []).length > 1 ? " · " + tool.locations.length + " copies" : "") + (tool.lesson ? " · Short lesson" : "") + "</small></span><span>" + escapeHtml(tool.purpose) + "</span><span aria-hidden=\"true\">→</span></button>";
    }).join("") : "<p>No matching program in this category. Try All programs or a different term.</p>";
  }

  function renderTool(id) {
    var tool = tools.filter(function (item) { return item.id === id; })[0];
    if (!tool) { renderNotFound(); return; }
    updateDocumentTitle(tool.name);
    var lesson = tool.lesson;
    var sources = (tool.sources || []).map(function (source) {
      return "<a href=\"" + escapeHtml(source.url) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + escapeHtml(source.label) + "</a>";
    }).join(" · ");
    view.innerHTML = pageHeader(tool.name, tool.category, tool.purpose, [
      { label: tool.kind, className: "evidence-badge" },
      { label: lesson ? "Short lesson" : "Quick explanation", className: "evidence-badge" }
    ]) + [
      "<div class=\"action-row\"><button class=\"secondary-action\" type=\"button\" data-route=\"tools\">← Back to directory</button>" + (tool.category === "Password and access" ? "<button class=\"primary-action\" type=\"button\" data-route=\"password\">Open password guide →</button>" : "") + (tool.location === "Password_Removal/Jayro's_Lockpick" ? "<button class=\"secondary-action\" type=\"button\" data-route=\"lockpick\">See 14 Lockpick programs →</button>" : "") + "</div>",
      "<section class=\"content-section tool-detail\"><h2>Where to find it</h2><ul>" + (tool.locations || [tool.location]).map(function (location) { return "<li>" + escapeHtml(tool.kind === "Boot menu image" ? "Boot menu → " : "Mini Windows → ") + escapeHtml(location.replace(/_/g, " ")) + "</li>"; }).join("") + "</ul>" + (tool.notice ? "<p class=\"tool-warning\">" + escapeHtml(tool.notice) + "</p>" : ""),
      lesson ? "<h2>When this is useful</h2><p>" + escapeHtml(lesson.when) + "</p><h2>Start here</h2><p>" + escapeHtml(lesson.first) + "</p><ol>" + lesson.steps.map(function (step) { return "<li>" + escapeHtml(step) + "</li>"; }).join("") + "</ol><h2>When to stop</h2><p>" + escapeHtml(lesson.stop) + "</p><h2>How to check</h2><p>" + escapeHtml(lesson.verify) + "</p>" : "<h2>Before opening it</h2><p>Match the program to the problem, confirm the correct device, and protect files you need to keep. This copy has not been run to confirm its exact screens.</p>",
      "<details class=\"tool-evidence\"><summary>What we checked</summary><p>" + escapeHtml(tool.status) + " " + escapeHtml(tool.versionEvidence) + "</p>" + (sources ? "<p>" + sources + "</p>" : "") + "</details></section>"
    ].join("");
  }

  function renderGlossary() {
    updateDocumentTitle("Plain-English glossary");
    var entries = glossary.slice().sort(function (a, b) {
      return a.term.localeCompare(b.term);
    }).map(function (entry) {
      var aliases = entry.aliases && entry.aliases.length ? " <span>(" + escapeHtml(entry.aliases.join(", ")) + ")</span>" : "";
      return [
        "<div class=\"glossary-entry\">",
        "  <dt>" + escapeHtml(entry.term) + aliases + "</dt>",
        "  <dd>" + escapeHtml(entry.definition) + "</dd>",
        "</div>"
      ].join("");
    }).join("");

    view.innerHTML = pageHeader(
      "Plain-English glossary",
      "Terms that decide the repair",
      "Short definitions for the concepts that change which action is safe. Learn them when the workflow needs them—not as an entrance exam.",
      [{ label: glossary.length + " terms", className: "evidence-badge" }]
    ) + "<section class=\"content-section\"><dl class=\"glossary-list\">" + entries + "</dl></section>";
  }

  function renderNotFound() {
    updateDocumentTitle("Not found");
    view.innerHTML = pageHeader(
      "Route not found",
      "Navigation error",
      "This guide route does not exist in the prototype.",
      []
    ) + "<section class=\"content-section\"><button type=\"button\" class=\"goal-card\" data-route=\"home\"><h3>Return to Start Here</h3></button></section>";
  }

  function renderRoute() {
    var route = currentRoute();
    var activeRoute = route;

    if (route === "home") {
      renderHome();
    } else if (route === "intake") {
      renderIntake();
    } else if (route === "all-guides") {
      renderAllGuides();
    } else if (route === "password" || route.indexOf("password=") === 0) {
      renderPasswordModule(route === "password" ? "" : decodeURIComponent(route.substring(9)));
    } else if (route === "lockpick" || route.indexOf("lockpick=") === 0) {
      renderLockpickProgram(route === "lockpick" ? "" : decodeURIComponent(route.substring(9)));
    } else if (route === "tools") {
      renderTools();
    } else if (route.indexOf("tool=") === 0) {
      renderTool(decodeURIComponent(route.substring(5)));
    } else if (route === "glossary") {
      renderGlossary();
    } else if (route.indexOf("guide=") === 0) {
      renderGuide(decodeURIComponent(route.substring(6)));
    } else {
      activeRoute = "";
      renderNotFound();
    }

    setCurrentNavigation(activeRoute);
    closeSearch();
    closeMobileMenu();
    main.scrollTop = 0;
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  function searchTextForGuide(guide) {
    var sectionText = (guide.sections || []).map(function (section) {
      var failures = (section.failures || []).map(function (failure) {
        return failure.when + " " + failure.next;
      }).join(" ");
      return [
        section.label,
        section.title,
        (section.paragraphs || []).join(" "),
        (section.bullets || []).join(" "),
        failures
      ].join(" ");
    }).join(" ");
    return [guide.title, guide.category, guide.summary, (guide.tags || []).join(" "), sectionText].join(" ").toLowerCase();
  }

  function buildSearchIndex() {
    var index = [];

    index.push({
      type: "Module",
      title: passwordModule.title,
      summary: passwordModule.summary,
      text: [passwordModule.title, passwordModule.summary, "Lockpick", "PIN", "BitLocker", "Microsoft account", "local password", "sign in"].join(" ").toLowerCase(),
      route: "password"
    });

    (passwordModule.paths || []).forEach(function (path) {
      index.push({
        type: "Access path",
        title: path.label,
        summary: path.clue,
        text: [path.label, path.clue, path.first, path.medicat].join(" ").toLowerCase(),
        route: "password=" + encodeURIComponent(path.id)
      });
    });

    index.push({
      type: "Module",
      title: "Jayro's Lockpick programs",
      summary: "Choose the right Lockpick tool for your sign-in problem.",
      text: "jayro lockpick medicat password pcunlocker passcape active wbg",
      route: "lockpick"
    });

    (passwordModule.programs || []).forEach(function (program) {
      index.push({
        type: "Lockpick program",
        title: program.name,
        summary: program.summary,
        text: [program.name, program.summary, program.useWhen].join(" ").toLowerCase(),
        route: "lockpick=" + encodeURIComponent(program.id)
      });
    });

    guides.forEach(function (guide) {
      index.push({
        type: "Workflow",
        title: guide.title,
        summary: guide.summary,
        text: searchTextForGuide(guide),
        route: "guide=" + encodeURIComponent(guide.id)
      });
    });

    tools.forEach(function (tool) {
      index.push({
        type: "Tool",
        title: tool.name,
        summary: tool.purpose,
        text: [
          tool.name,
          tool.category,
          tool.purpose,
          tool.versionEvidence,
          (tool.recommendedFor || []).join(" "),
          (tool.notFor || []).join(" ")
        ].join(" ").toLowerCase(),
        route: "tool=" + encodeURIComponent(tool.id)
      });
    });

    glossary.forEach(function (entry) {
      index.push({
        type: "Glossary",
        title: entry.term,
        summary: entry.definition,
        text: [entry.term, (entry.aliases || []).join(" "), entry.definition].join(" ").toLowerCase(),
        route: "glossary"
      });
    });

    return index;
  }

  var searchIndex = buildSearchIndex();

  function scoreResult(item, terms) {
    var title = item.title.toLowerCase();
    var score = 0;
    terms.forEach(function (term) {
      if (title === term) {
        score += 20;
      } else if (title.indexOf(term) === 0) {
        score += 12;
      } else if (title.indexOf(term) !== -1) {
        score += 8;
      }
      if (item.text.indexOf(term) !== -1) {
        score += 2;
      }
    });
    return score;
  }

  function runSearch(value) {
    var query = String(value || "").trim().toLowerCase();
    if (!query) {
      closeSearch();
      return;
    }

    var terms = query.split(/\s+/).filter(Boolean);
    var matches = searchIndex.map(function (item) {
      return { item: item, score: scoreResult(item, terms) };
    }).filter(function (result) {
      return result.score > 0 && terms.every(function (term) {
        return result.item.text.indexOf(term) !== -1;
      });
    }).sort(function (a, b) {
      return b.score - a.score || a.item.title.localeCompare(b.item.title);
    }).slice(0, 12);

    if (!matches.length) {
      searchResults.innerHTML = "<div class=\"empty-search\"><strong>No exact route found.</strong><br>Try the outcome, error, or concept instead of a product name.</div>";
    } else {
      searchResults.innerHTML = matches.map(function (result) {
        return [
          "<button class=\"search-result\" type=\"button\" data-route=\"" + escapeHtml(result.item.route) + "\">",
          "  <span class=\"search-result-type\">" + escapeHtml(result.item.type) + "</span>",
          "  <span><strong>" + escapeHtml(result.item.title) + "</strong><p>" + escapeHtml(result.item.summary) + "</p></span>",
          "</button>"
        ].join("");
      }).join("");
    }

    searchResults.hidden = false;
  }

  function closeSearch() {
    searchResults.hidden = true;
    searchResults.innerHTML = "";
  }

  function emptyJobState() {
    return {
      version: intake.version || 1,
      answers: {},
      position: 0
    };
  }

  function loadJobState() {
    try {
      var saved = window.sessionStorage.getItem(intake.storageKey || "learn-medicat-job-v1");
      var parsed = saved ? JSON.parse(saved) : null;
      if (!parsed || parsed.version !== (intake.version || 1) || !parsed.answers || typeof parsed.answers !== "object") {
        return emptyJobState();
      }
      parsed.position = typeof parsed.position === "number" ? parsed.position : 0;
      return parsed;
    } catch (error) {
      return emptyJobState();
    }
  }

  function saveJobState() {
    try {
      window.sessionStorage.setItem(intake.storageKey || "learn-medicat-job-v1", JSON.stringify(jobState));
    } catch (error) {
      // Some file:// contexts block storage. The in-memory state still works.
    }
  }

  function clearJobState() {
    jobState = emptyJobState();
    try {
      window.sessionStorage.removeItem(intake.storageKey || "learn-medicat-job-v1");
    } catch (error) {
      // The in-memory reset still works when storage is unavailable.
    }
  }

  function renderJobStatus() {
    var questions = getIntakeQuestions();
    var complete = answeredQuestionCount(questions);
    var total = expectedIntakeQuestionCount();

    intakeCount.textContent = complete + "/" + total;
    intakeProgress.style.width = (total ? complete / total * 100 : 0) + "%";
    intakeProgress.style.background = complete === total ? "var(--cyan)" : "var(--amber)";
    intakeTitle.textContent = complete === total ? "Brief ready" : (complete ? "Intake in progress" : "No brief yet");
    intakeSidebarAction.textContent = complete === total ? "View job brief" : (complete ? "Resume guided intake" : "Start guided intake");

    jobSummaryFields.forEach(function (field) {
      var question = findQuestion(field.getAttribute("data-job-summary"));
      var option = question ? findOption(question, jobState.answers[question.id]) : null;
      var relevant = !selectedJobOption() || questions.some(function (item) { return item.id === question.id; });
      field.textContent = relevant ? (option ? option.label : "Pending") : "Not needed";
      if (relevant && option) {
        field.setAttribute("data-complete", "true");
      } else {
        field.removeAttribute("data-complete");
      }
    });
  }

  document.addEventListener("click", function (event) {
    var routeTarget = event.target.closest("[data-route]");
    var guideTarget = event.target.closest("[data-guide]");
    var startJobTarget = event.target.closest("[data-start-job]");
    var anchorTarget = event.target.closest("[data-anchor]");
    var intakeOptionTarget = event.target.closest("[data-intake-option]");
    var intakeBackTarget = event.target.closest("[data-intake-back]");
    var intakeEditTarget = event.target.closest("[data-intake-edit]");
    var intakeResetTarget = event.target.closest("[data-intake-reset]");

    if (intakeOptionTarget) {
      var questionId = intakeOptionTarget.getAttribute("data-question");
      var question = findQuestion(questionId);
      var optionId = intakeOptionTarget.getAttribute("data-intake-option");
      if (findOption(question, optionId)) {
        if (questionId === "job" && jobState.answers.job !== optionId) {
          jobState.answers = {};
        }
        jobState.answers[questionId] = optionId;
        var questionsAfterAnswer = getIntakeQuestions();
        var answeredIndex = questionsAfterAnswer.map(function (item) {
          return item.id;
        }).indexOf(questionId);
        jobState.position = answeredIndex + 1;
        while (
          jobState.position < questionsAfterAnswer.length &&
          findOption(
            questionsAfterAnswer[jobState.position],
            jobState.answers[questionsAfterAnswer[jobState.position].id]
          )
        ) {
          jobState.position += 1;
        }
        saveJobState();
        renderJobStatus();
        renderIntake();
        var nextHeading = document.getElementById("intake-question-title") || document.getElementById("brief-status-title");
        if (nextHeading) {
          nextHeading.focus({ preventScroll: true });
        }
      }
      return;
    }

    if (intakeBackTarget) {
      jobState.position = Math.max(0, jobState.position - 1);
      saveJobState();
      renderIntake();
      return;
    }

    if (intakeEditTarget) {
      jobState.position = Math.max(0, parseInt(intakeEditTarget.getAttribute("data-intake-edit"), 10) || 0);
      saveJobState();
      renderIntake();
      return;
    }

    if (intakeResetTarget) {
      clearJobState();
      renderJobStatus();
      renderIntake();
      return;
    }

    if (anchorTarget) {
      event.preventDefault();
      var anchor = document.getElementById(anchorTarget.getAttribute("data-anchor"));
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
        anchor.setAttribute("tabindex", "-1");
        anchor.focus({ preventScroll: true });
      }
      return;
    }

    if (guideTarget) {
      routeTo("guide=" + encodeURIComponent(guideTarget.getAttribute("data-guide")));
      return;
    }

    if (startJobTarget) {
      var chosenJob = startJobTarget.getAttribute("data-start-job");
      if (findOption(findQuestion("job"), chosenJob)) {
        if (jobState.answers.job !== chosenJob) {
          jobState.answers = { job: chosenJob };
        }
        jobState.position = 1;
        saveJobState();
        renderJobStatus();
        routeTo("intake");
      }
      return;
    }

    if (routeTarget) {
      routeTo(routeTarget.getAttribute("data-route"));
    }
  });

  document.addEventListener("input", function (event) {
    if (event.target.id === "tool-filter") {
      toolFilter = event.target.value;
      updateToolResults();
    }
  });
  document.addEventListener("change", function (event) {
    if (event.target.id === "tool-category") {
      toolCategory = event.target.value;
      updateToolResults();
    }
  });

  menuToggle.addEventListener("click", function () {
    var open = sidePanel.getAttribute("data-open") === "true";
    if (open) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  if (typeof mobileNavigation.addEventListener === "function") {
    mobileNavigation.addEventListener("change", closeMobileMenu);
  } else if (typeof mobileNavigation.addListener === "function") {
    mobileNavigation.addListener(closeMobileMenu);
  }

  search.addEventListener("input", function () {
    runSearch(search.value);
  });

  search.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      search.value = "";
      closeSearch();
      search.blur();
    }
  });

  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      search.focus();
      search.select();
    }
    if (event.key === "Escape") {
      closeSearch();
      closeMobileMenu();
    }
  });

  document.addEventListener("click", function (event) {
    if (!searchResults.contains(event.target) && event.target !== search) {
      closeSearch();
    }
  });

  window.addEventListener("hashchange", renderRoute);
  renderJobStatus();
  renderRoute();
}());
