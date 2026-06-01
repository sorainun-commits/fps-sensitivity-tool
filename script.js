/* ============================================================
   SensConverter — 共通スクリプト
   ============================================================ */

/* ===== ゲームデータ (25ゲーム対応) ===== */
var GAME_YAW = {
  valorant:       0.07,
  apex:           0.022,
  cs2:            0.022,
  overwatch2:     0.0066,
  fortnite:       0.5590,
  r6s:            0.00572,
  warzone:        0.0066,
  pubg:           0.00572,
  tarkov:         0.02,
  splitgate:      0.022,
  hyper_scape:    0.07,
  destiny2:       0.0222,
  titanfall2:     0.022,
  quake:          0.022,
  diabotical:     0.022,
  xdefiant:       0.022,
  marvel_rivals:  0.07,
  deadlock:       0.022,
  the_finals:     0.022,
  hunt_showdown:  0.04395,
  paladins:       0.0066,
  battlebit:      0.00572,
  enlisted:       0.00572,
  delta_force:    0.022,
  fragpunk:       0.07
};

var GAME_NAMES = {
  valorant:       "Valorant",
  apex:           "Apex Legends",
  cs2:            "CS2",
  overwatch2:     "Overwatch 2",
  fortnite:       "Fortnite",
  r6s:            "Rainbow Six Siege",
  warzone:        "CoD: Warzone",
  pubg:           "PUBG",
  tarkov:         "Escape from Tarkov",
  splitgate:      "Splitgate 2",
  hyper_scape:    "Hyper Scape",
  destiny2:       "Destiny 2",
  titanfall2:     "Titanfall 2",
  quake:          "Quake Champions",
  diabotical:     "Diabotical",
  xdefiant:       "XDefiant",
  marvel_rivals:  "Marvel Rivals",
  deadlock:       "Deadlock",
  the_finals:     "THE FINALS",
  hunt_showdown:  "Hunt: Showdown",
  paladins:       "Paladins",
  battlebit:      "BattleBit Remastered",
  enlisted:       "Enlisted",
  delta_force:    "Delta Force",
  fragpunk:       "FragPunk"
};

var GAME_SENS_LABEL = {
  valorant:       ["感度"],
  apex:           ["マウス感度"],
  cs2:            ["感度"],
  overwatch2:     ["感度"],
  fortnite:       ["X軸感度", "Y軸感度"],
  r6s:            ["感度"],
  warzone:        ["感度"],
  pubg:           ["感度"],
  tarkov:         ["感度"],
  splitgate:      ["感度"],
  hyper_scape:    ["感度"],
  destiny2:       ["感度"],
  titanfall2:     ["感度"],
  quake:          ["感度"],
  diabotical:     ["感度"],
  xdefiant:       ["感度"],
  marvel_rivals:  ["感度"],
  deadlock:       ["感度"],
  the_finals:     ["感度"],
  hunt_showdown:  ["感度"],
  paladins:       ["感度"],
  battlebit:      ["感度"],
  enlisted:       ["感度"],
  delta_force:    ["感度"],
  fragpunk:       ["感度"]
};

var PRO_DATA = [
  { name: "TenZ",        game: "Valorant",     cm360: 29.0 },
  { name: "Shroud",      game: "Valorant",     cm360: 32.5 },
  { name: "ScreaM",      game: "Valorant",     cm360: 24.8 },
  { name: "Aspas",       game: "Valorant",     cm360: 27.3 },
  { name: "yay",         game: "Valorant",     cm360: 38.1 },
  { name: "Derke",       game: "Valorant",     cm360: 22.4 },
  { name: "nAts",        game: "Valorant",     cm360: 44.2 },
  { name: "cNed",        game: "Valorant",     cm360: 19.8 },
  { name: "Zekken",      game: "Valorant",     cm360: 33.6 },
  { name: "Demon1",      game: "Valorant",     cm360: 25.1 },
  { name: "Verhulst",    game: "Apex Legends", cm360: 30.2 },
  { name: "Genburten",   game: "Apex Legends", cm360: 18.5 },
  { name: "ImperialHal", game: "Apex Legends", cm360: 42.0 },
  { name: "Aceu",        game: "Apex Legends", cm360: 22.7 },
  { name: "Sweetdreams", game: "Apex Legends", cm360: 35.4 },
  { name: "Reps",        game: "Apex Legends", cm360: 28.9 },
  { name: "Dropped",     game: "Apex Legends", cm360: 24.3 },
  { name: "s1mple",      game: "CS2",          cm360: 33.2 },
  { name: "ZywOo",       game: "CS2",          cm360: 50.8 },
  { name: "NiKo",        game: "CS2",          cm360: 38.7 },
  { name: "device",      game: "CS2",          cm360: 55.3 },
  { name: "sh1ro",       game: "CS2",          cm360: 47.1 },
  { name: "electronic",  game: "CS2",          cm360: 29.6 },
  { name: "ropz",        game: "CS2",          cm360: 44.8 },
  { name: "m0NESY",      game: "CS2",          cm360: 31.4 },
  { name: "Fleta",       game: "Overwatch 2",  cm360: 26.5 },
  { name: "Profit",      game: "Overwatch 2",  cm360: 31.0 },
  { name: "Carpe",       game: "Overwatch 2",  cm360: 22.1 },
  { name: "Gesture",     game: "Overwatch 2",  cm360: 48.3 },
  { name: "Smurf",       game: "Overwatch 2",  cm360: 35.7 },
  { name: "Bugha",       game: "Fortnite",     cm360: 27.8 },
  { name: "Mongraal",    game: "Fortnite",     cm360: 15.2 },
  { name: "Benjyfishy",  game: "Fortnite",     cm360: 20.4 },
  { name: "MrSavage",    game: "Fortnite",     cm360: 23.6 },
  { name: "Clix",        game: "Fortnite",     cm360: 18.9 }
];

/* ===== 計算ユーティリティ ===== */
function calcCm360(game, sensitivity, dpi) {
  return (2.54 * 360) / (dpi * sensitivity * GAME_YAW[game]);
}

function findNearbyPros(cm360) {
  return PRO_DATA
    .map(function(pro) {
      return { name: pro.name, game: pro.game, cm360: pro.cm360, diff: Math.abs(pro.cm360 - cm360) };
    })
    .filter(function(pro) { return pro.diff <= 10; })
    .sort(function(a, b) { return a.diff - b.diff; })
    .slice(0, 8);
}

/* ===== メモ帳ユーティリティ ===== */
function loadMemos() {
  try { return JSON.parse(localStorage.getItem("sensMemos") || "[]"); }
  catch(e) { return []; }
}
function saveMemos(memos) {
  localStorage.setItem("sensMemos", JSON.stringify(memos));
}

/* ===== 感度表示HTML生成 ===== */
function buildSensDisplay(toGame, toSens) {
  var labels = GAME_SENS_LABEL[toGame] || ["感度"];
  var html = '<div class="sens-labels">';
  labels.forEach(function(label) {
    html += '<div class="sens-label-row">' +
      '<span class="sens-item-label">' + label + '</span>' +
      '<span class="sens-item-value">' + toSens.toFixed(4) + '</span>' +
      '</div>';
  });
  html += '</div>';
  return html;
}

/* ===== プロ一覧HTML生成 ===== */
function buildProList(pros) {
  if (pros.length === 0) {
    return '<p class="no-pro">±10cm以内に該当するプロ選手が見つかりませんでした。</p>';
  }
  var html = '';
  pros.forEach(function(pro) {
    var diffText  = pro.diff < 0.5 ? "ほぼ同じ" : "差 " + pro.diff.toFixed(1) + "cm";
    var barWidth  = Math.max(0, Math.min(100, 100 - (pro.diff / 10) * 100));
    var matchClass = pro.diff < 1 ? "match-perfect" : pro.diff < 3 ? "match-close" : "match-near";
    html += '<div class="pro-card">' +
      '<div><div class="pro-card-name">' + pro.name + '</div><div class="pro-card-game">' + pro.game + '</div></div>' +
      '<div class="pro-card-center"><div class="pro-bar-wrap"><div class="pro-bar-fill" style="width:' + barWidth + '%"></div></div><div class="pro-bar-lbl">一致度</div></div>' +
      '<div style="text-align:right"><div class="pro-cm">' + pro.cm360.toFixed(1) + ' cm</div><div class="pro-diff ' + matchClass + '">' + diffText + '</div></div>' +
      '</div>';
  });
  return html;
}

/* ===== 感度変換ページ初期化 ===== */
function initSensConverter() {
  var convertBtn = document.getElementById("convertBtn");
  if (!convertBtn) return;

  function renderMemos() {
    var memos    = loadMemos();
    var memoList = document.getElementById("memoList");
    if (!memoList) return;
    memoList.innerHTML = "";
    if (memos.length === 0) {
      memoList.innerHTML = '<p class="no-memo">保存された感度はありません。<br>変換結果から「感度をメモ帳に保存」で追加できます。</p>';
      return;
    }
    memos.forEach(function(memo, index) {
      var card = document.createElement("div");
      card.className = "memo-card";
      card.innerHTML =
        '<div class="memo-info">' +
          '<span class="memo-title">' + (GAME_NAMES[memo.fromGame]||memo.fromGame) + ' → ' + (GAME_NAMES[memo.toGame]||memo.toGame) + '</span>' +
          '<span class="memo-detail">元: ' + memo.sensitivity + ' / DPI: ' + memo.dpi + ' → 変換後: ' + memo.toSens + ' / cm/360: ' + memo.cm360 + 'cm</span>' +
          '<span class="memo-detail" style="color:var(--text-dim)">' + memo.date + '</span>' +
        '</div>' +
        '<button class="memo-delete" data-index="' + index + '">削除</button>';
      memoList.appendChild(card);
    });
    memoList.querySelectorAll(".memo-delete").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var i = parseInt(this.getAttribute("data-index"));
        var m = loadMemos(); m.splice(i, 1); saveMemos(m); renderMemos();
      });
    });
  }
  renderMemos();

  /* ===== リアルタイム変換 ===== */
  function doRealtimeConvert() {
    var fromGame    = document.getElementById("fromGame") && document.getElementById("fromGame").value;
    var toGame      = document.getElementById("toGame")   && document.getElementById("toGame").value;
    var sensitivity = parseFloat(document.getElementById("sensitivity") && document.getElementById("sensitivity").value);
    var dpi         = parseFloat(document.getElementById("dpi")         && document.getElementById("dpi").value);
    var inlineResult = document.getElementById("inlineResult");
    if (!inlineResult) return;
    if (!fromGame || !toGame || !sensitivity || !dpi || sensitivity <= 0 || dpi <= 0) {
      inlineResult.style.display = "none";
      return;
    }
    var cm360  = calcCm360(fromGame, sensitivity, dpi);
    var toSens = (2.54 * 360) / (dpi * GAME_YAW[toGame] * cm360);
    var edpi   = Math.round(sensitivity * dpi);
    document.getElementById("inlineSens").textContent = toSens.toFixed(4);
    document.getElementById("inlineCm").textContent   = cm360.toFixed(1) + " cm";
    document.getElementById("inlineEdpi").textContent = edpi.toLocaleString();
    inlineResult.style.display = "block";
  }

  ["fromGame","toGame","sensitivity","dpi"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("input", doRealtimeConvert);
    if (el) el.addEventListener("change", doRealtimeConvert);
  });

  convertBtn.addEventListener("click", function() {
    var fromGame    = document.getElementById("fromGame").value;
    var toGame      = document.getElementById("toGame").value;
    var sensitivity = parseFloat(document.getElementById("sensitivity").value);
    var dpi         = parseFloat(document.getElementById("dpi").value);
    if (!sensitivity || !dpi || sensitivity <= 0 || dpi <= 0) {
      alert("感度とDPIを正しく入力してください。"); return;
    }
    var cm360  = calcCm360(fromGame, sensitivity, dpi);
    var toSens = (2.54 * 360) / (dpi * GAME_YAW[toGame] * cm360);

    document.getElementById("resultSens").innerHTML = buildSensDisplay(toGame, toSens);
    document.getElementById("resultCm").textContent = cm360.toFixed(1) + " cm";

    var pct = Math.min(Math.max((cm360 - 5) / 95, 0), 1);
    var ind = document.getElementById("cm360Indicator");
    if (ind) ind.style.left = (pct * 100) + "%";

    var proListEl = document.getElementById("proList");
    if (proListEl) proListEl.innerHTML = buildProList(findNearbyPros(cm360));

    var params = new URLSearchParams();
    params.set("from", fromGame); params.set("to", toGame);
    params.set("sens", sensitivity); params.set("dpi", dpi);
    history.replaceState(null, "", "?" + params.toString());

    var saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
      saveBtn.setAttribute("data-from",   fromGame);
      saveBtn.setAttribute("data-to",     toGame);
      saveBtn.setAttribute("data-sens",   sensitivity);
      saveBtn.setAttribute("data-dpi",    dpi);
      saveBtn.setAttribute("data-tosens", toSens.toFixed(4));
      saveBtn.setAttribute("data-cm360",  cm360.toFixed(1));
    }

    var rs = document.getElementById("resultSection");
    if (rs) { rs.style.display = "block"; rs.scrollIntoView({ behavior: "smooth" }); }
  });

  var saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", function() {
      var fromGame = this.getAttribute("data-from");
      if (!fromGame) { alert("先に変換を実行してください。"); return; }
      var memos = loadMemos();
      var now   = new Date();
      var date  = now.getFullYear() + "/" + (now.getMonth()+1) + "/" + now.getDate() +
                  " " + now.getHours() + ":" + ("0"+now.getMinutes()).slice(-2);
      memos.unshift({
        fromGame: fromGame, toGame: this.getAttribute("data-to"),
        sensitivity: this.getAttribute("data-sens"), dpi: this.getAttribute("data-dpi"),
        toSens: this.getAttribute("data-tosens"), cm360: this.getAttribute("data-cm360"), date: date
      });
      saveMemos(memos); renderMemos(); alert("感度をメモ帳に保存しました！");
    });
  }

  var shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function() {
      var url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function() {
          var msg = document.getElementById("shareMsg");
          if (msg) { msg.style.display = "block"; setTimeout(function() { msg.style.display = "none"; }, 3000); }
        });
      } else { prompt("このURLをコピーしてください:", url); }
    });
  }

  var reverseBtn = document.getElementById("reverseBtn");
  if (reverseBtn) {
    reverseBtn.addEventListener("click", function() {
      var cm  = parseFloat(document.getElementById("reverseCm").value);
      var dpi = parseFloat(document.getElementById("reverseDpi").value);
      if (!cm || !dpi || cm <= 0 || dpi <= 0) { alert("cm/360とDPIを正しく入力してください。"); return; }
      var reverseList = document.getElementById("reverseList");
      reverseList.innerHTML = "";
      Object.keys(GAME_YAW).forEach(function(game) {
        var sens   = (2.54 * 360) / (dpi * GAME_YAW[game] * cm);
        var labels = GAME_SENS_LABEL[game] || ["感度"];
        var card   = document.createElement("div");
        card.className = "reverse-card";
        var labelsHtml = '';
        labels.forEach(function(label) {
          labelsHtml += '<div class="reverse-label-row"><span class="reverse-label-name">' + label + '</span><span class="reverse-sens">' + sens.toFixed(4) + '</span></div>';
        });
        card.innerHTML = '<span class="reverse-game">' + GAME_NAMES[game] + '</span><div class="reverse-labels">' + labelsHtml + '</div>';
        reverseList.appendChild(card);
      });
      document.getElementById("reverseResult").style.display = "block";
    });
  }

  // URLパラメータ復元
  (function() {
    var params = new URLSearchParams(window.location.search);
    var from = params.get("from"), to = params.get("to"), sens = params.get("sens"), dpi = params.get("dpi");
    if (from && to && sens && dpi) {
      var fromSel = document.getElementById("fromGame"), toSel = document.getElementById("toGame");
      if (fromSel) fromSel.value = from;
      if (toSel)   toSel.value   = to;
      var sensEl = document.getElementById("sensitivity"), dpiEl = document.getElementById("dpi");
      if (sensEl) sensEl.value = sens;
      if (dpiEl)  dpiEl.value  = dpi;
      convertBtn.click();
    }
  })();
}

/* ===== ハンバーガーメニュー ===== */
function initHamburger() {
  var btn  = document.getElementById("hamburgerBtn");
  var menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", function() {
    var open = menu.classList.toggle("open");
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
  });
  // メニュー外クリックで閉じる
  document.addEventListener("click", function(e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", false);
    }
  });
}

/* ===== 言語切り替え ===== */
function initLang() {
  var currentLang = localStorage.getItem("lang") || "ja";

  function applyLang(lang) {
    document.querySelectorAll("[data-ja][data-en]").forEach(function(el) {
      el.textContent = lang === "ja" ? el.getAttribute("data-ja") : el.getAttribute("data-en");
    });
    document.querySelectorAll("[data-ja-placeholder][data-en-placeholder]").forEach(function(el) {
      el.placeholder = lang === "ja" ? el.getAttribute("data-ja-placeholder") : el.getAttribute("data-en-placeholder");
    });
    var btns = document.querySelectorAll(".btn-lang");
    btns.forEach(function(btn) { btn.textContent = lang === "ja" ? "EN" : "JA"; });
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
    currentLang = lang;
  }

  applyLang(currentLang);

  document.querySelectorAll(".btn-lang").forEach(function(btn) {
    btn.addEventListener("click", function() {
      applyLang(currentLang === "ja" ? "en" : "ja");
    });
  });
}

/* ===== アクティブナビ ===== */
function initActiveNav() {
  var path = window.location.pathname;
  document.querySelectorAll(".nav-link").forEach(function(link) {
    var href = link.getAttribute("href") || "";
    if (href && path.endsWith(href.replace(/^\.\.\//, "").replace(/^\.\//, ""))) {
      link.classList.add("active");
    }
  });
}

/* ===== DOMContentLoaded ===== */
document.addEventListener("DOMContentLoaded", function() {
  initHamburger();
  initLang();
  initActiveNav();
  initSensConverter();
  initBackToTop();
  initGuideLink();
});

/* ===== トップへ戻るボタン ===== */
function initBackToTop() {
  var btn = document.createElement("button");
  btn.id = "backToTop";
  btn.innerHTML = "↑";
  btn.setAttribute("aria-label", "トップへ戻る");
  btn.style.cssText = [
    "position:fixed", "bottom:24px", "right:24px", "z-index:999",
    "width:44px", "height:44px", "border-radius:50%",
    "background:linear-gradient(135deg,#7c5cfc,#ff4655)",
    "color:#fff", "border:none", "font-size:1.1rem", "font-weight:900",
    "cursor:pointer", "opacity:0", "transform:translateY(10px)",
    "transition:opacity 0.3s,transform 0.3s",
    "box-shadow:0 0 16px rgba(124,92,252,0.5)",
    "display:flex", "align-items:center", "justify-content:center"
  ].join(";");
  document.body.appendChild(btn);

  window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0)";
    } else {
      btn.style.opacity = "0";
      btn.style.transform = "translateY(10px)";
    }
  });

  btn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ===== ガイドリンクをナビに追加 ===== */
function initGuideLink() {
  // ナビにガイドリンクがなければ追加しない（各ページのHTMLで管理）
}
