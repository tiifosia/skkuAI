/* 파이썬 퀘스트 — 게임 엔진
   콘텐츠는 js/content/*.js 가 window.PQ.worlds 에 채워 넣고,
   한 줄씩 실행 데이터는 js/content/traces.js (tools/gen_traces.py 로 생성) 가 window.PQ.traces 에 넣는다. */
(function () {
  'use strict';

  const PQ = window.PQ || { worlds: [], traces: {} };
  const WORLDS = PQ.worlds || [];
  const TRACES = PQ.traces || {};

  /* ───────────── 작은 도구들 ───────────── */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clone = (o) => JSON.parse(JSON.stringify(o));
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function todayStr(d = new Date()) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  /* 미니 마크다운: **굵게**, `코드`, "- " 목록, 빈 줄 = 문단 */
  function fmt(s) {
    return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  }
  function inl(src) {
    src = String(src == null ? '' : src);
    let out = '';
    const re = /`([^`]+)`/g;
    let last = 0, m;
    while ((m = re.exec(src))) {
      out += fmt(esc(src.slice(last, m.index)));
      out += '<code class="ic">' + esc(m[1]) + '</code>';
      last = re.lastIndex;
    }
    return out + fmt(esc(src.slice(last)));
  }
  function md(src) {
    if (!src) return '';
    if (Array.isArray(src)) src = src.join('\n');
    const lines = String(src).split('\n');
    let html = '', para = [], list = [];
    const flushP = () => { if (para.length) { html += '<p>' + para.map(inl).join('<br>') + '</p>'; para = []; } };
    const flushL = () => { if (list.length) { html += '<ul>' + list.map((x) => '<li>' + inl(x) + '</li>').join('') + '</ul>'; list = []; } };
    for (const line of lines) {
      if (/^\s*$/.test(line)) { flushP(); flushL(); continue; }
      const li = line.match(/^\s*[-•]\s+(.*)$/);
      if (li) { flushP(); list.push(li[1]); } else { flushL(); para.push(line); }
    }
    flushP(); flushL();
    return html;
  }

  /* ───────────── 파이썬 문법 색칠 ───────────── */
  const KW = new Set('False None True and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield'.split(' '));
  const BI = new Set('print input int str float len range list tuple dict set type round min max sum sorted zip map filter open super dir abs complex bool enumerate isinstance id repr'.split(' '));
  const TOKRE = /(#[^\n]*)|([rbfuRBFU]{0,2}(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'))|(\b0[xX][0-9a-fA-F]+\b|\b0[oO][0-7]+\b|\b0[bB][01]+\b|\b\d+(?:\.\d*)?(?:[eE][-+]?\d+)?[jJ]?\b|\.\d+\b)|([A-Za-z_가-힣][A-Za-z0-9_가-힣]*)/g;
  function tokens(code) {
    const out = [];
    let last = 0, m;
    TOKRE.lastIndex = 0;
    while ((m = TOKRE.exec(code))) {
      if (m.index > last) out.push({ t: code.slice(last, m.index), c: '' });
      let c = '';
      if (m[1]) c = 'tok-com';
      else if (m[2]) c = 'tok-str';
      else if (m[3]) c = 'tok-num';
      else if (m[4]) {
        if (KW.has(m[4])) c = 'tok-kw';
        else if (BI.has(m[4])) c = 'tok-fn';
        else if (m[4] === 'self') c = 'tok-self';
      }
      out.push({ t: m[0], c });
      last = TOKRE.lastIndex;
    }
    if (last < code.length) out.push({ t: code.slice(last), c: '' });
    return out;
  }
  const span = (t, c) => (c ? '<span class="' + c + '">' + esc(t) + '</span>' : esc(t));
  function hlInline(code) {
    return tokens(code).map((x) => span(x.t, x.c)).join('');
  }
  function hlLines(code) {
    const lines = [[]];
    for (const tk of tokens(code)) {
      const parts = tk.t.split('\n');
      parts.forEach((p, i) => {
        if (i > 0) lines.push([]);
        if (p) lines[lines.length - 1].push(span(p, tk.c));
      });
    }
    return lines.map((l) => l.join(''));
  }
  function codeHTML(code, opts = {}) {
    const lines = hlLines(code);
    const nums = opts.nums !== false && lines.length > 1;
    return lines.map((l, i) =>
      '<span class="line' + (opts.hl === i + 1 ? ' hl' : '') + '" data-l="' + (i + 1) + '">' +
      (nums ? '<span class="ln">' + (i + 1) + '</span>' : '') + (l || '​') + '</span>'
    ).join('');
  }

  /* ───────────── 마스코트 '파이' ───────────── */
  function mascot(cls = '') {
    return '<svg class="' + cls + '" viewBox="0 0 64 64" aria-hidden="true">' +
      '<path d="M9 54 Q9 45 20 45 L42 45 Q54 45 54 35 Q54 27 45 27 L37 27" fill="none" stroke="#C3BDFF" stroke-width="9" stroke-linecap="round"/>' +
      '<ellipse cx="30" cy="22" rx="13" ry="11" fill="#C3BDFF"/>' +
      '<circle cx="25" cy="20" r="2.7" fill="#111"/><circle cx="35" cy="20" r="2.7" fill="#111"/>' +
      '<circle cx="25.9" cy="19.1" r=".9" fill="#F5F5F5"/><circle cx="35.9" cy="19.1" r=".9" fill="#F5F5F5"/>' +
      '<path d="M30 33 v5 M30 38 l-3 3 M30 38 l3 3" stroke="#ff9f9f" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
      '</svg>';
  }

  /* ───────────── 콘텐츠 색인 ───────────── */
  const ORDER = [];
  const STAGE = {};
  const QINDEX = {};
  WORLDS.forEach((w, wi) => {
    w.index = wi;
    w.stages.forEach((s) => {
      s.world = w;
      s.kind = 'stage';
      s.order = ORDER.length;
      ORDER.push(s);
      STAGE[s.id] = s;
      (s.quiz || []).forEach((q, i) => {
        q.qid = s.id + ':' + i;
        q.stage = s;
        QINDEX[q.qid] = q;
      });
    });
    const boss = {
      id: w.id + '-boss', kind: 'boss', world: w, num: 'BOSS',
      title: w.bossTitle || w.lecture + ' 보스전', sub: w.bossSub || '이 강의 전체에서 무작위 출제 · 제한 시간 · 하트 3개',
    };
    boss.order = ORDER.length;
    w.boss = boss;
    ORDER.push(boss);
    STAGE[boss.id] = boss;
  });
  const REAL_STAGES = ORDER.filter((x) => x.kind === 'stage' && !x.tutorial);
  const ALL_ITEMS = ORDER.length;

  /* ───────────── 저장 ───────────── */
  const KEY = 'pyquest.v1';
  const DEFAULT = {
    name: '', xp: 0, stages: {}, wrong: {}, lessonsDone: {}, lessonPos: {}, seen: {}, labCode: null, resume: null,
    settings: { sound: true, unlockAll: false },
    onboarded: false, exams: [], streak: { day: '', count: 0 }, answered: 0, correct: 0,
  };
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        const s = Object.assign(clone(DEFAULT), d);
        s.settings = Object.assign({}, DEFAULT.settings, d.settings || {});
        ['stages', 'wrong', 'lessonsDone', 'lessonPos', 'seen'].forEach((k) => { if (!s[k] || typeof s[k] !== 'object') s[k] = {}; });
        if (!Array.isArray(s.exams)) s.exams = [];
        return s;
      }
    } catch (e) { /* 저장소를 쓸 수 없어도 게임은 진행 */ }
    return clone(DEFAULT);
  }
  let S = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* 무시 */ }
  }

  /* ───────────── 레벨 ───────────── */
  const TITLES = [[1, '알에서 막 깬 아기 뱀'], [3, 'print 견습생'], [5, '변수 수집가'], [8, '반복문 기사'], [12, '함수 마법사'], [16, '클래스 건축가'], [20, '데이터 연금술사'], [25, '시험 정복자']];
  function levelInfo(xp) {
    let lvl = 1, need = 100, cur = xp;
    while (cur >= need) { cur -= need; lvl++; need = 100 + (lvl - 1) * 40; }
    let title = TITLES[0][1];
    for (const [l, t] of TITLES) if (lvl >= l) title = t;
    return { lvl, cur, need, title };
  }
  function addXP(n) {
    const before = levelInfo(S.xp).lvl;
    S.xp += n;
    const after = levelInfo(S.xp).lvl;
    if (after > before) setTimeout(() => toast('레벨 업! Lv.' + after + ' · ' + levelInfo(S.xp).title), 600);
  }
  function touchStreak() {
    const t = todayStr();
    if (S.streak.day === t) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    S.streak.count = S.streak.day === todayStr(y) ? S.streak.count + 1 : 1;
    S.streak.day = t;
  }

  /* ───────────── 진행 상태 ───────────── */
  const rec = (id) => S.stages[id] || {};
  const isCleared = (id) => !!rec(id).cleared;
  function isUnlocked(item) {
    if (S.settings.unlockAll) return true;
    if (item.kind === 'boss') return item.world.stages.every((s) => isCleared(s.id));
    let prev = null;
    for (let i = item.order - 1; i >= 0; i--) if (ORDER[i].kind === 'stage') { prev = ORDER[i]; break; }
    return !prev || isCleared(prev.id);
  }
  function currentItem() {
    return ORDER.find((x) => isUnlocked(x) && !isCleared(x.id)) || null;
  }
  function totalStars() {
    return ORDER.reduce((a, x) => a + (rec(x.id).stars || 0), 0);
  }
  const wrongCount = () => Object.keys(S.wrong).filter((k) => QINDEX[k]).length;

  /* ───────────── 소리 ───────────── */
  let AC = null;
  function beep(seq) {
    if (!S.settings.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = AC.currentTime;
      seq.forEach(([f, d, delay = 0, type = 'sine', vol = 0.07]) => {
        const o = AC.createOscillator(), g = AC.createGain();
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(vol, t0 + delay);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + delay + d);
        o.connect(g).connect(AC.destination);
        o.start(t0 + delay); o.stop(t0 + delay + d + 0.03);
      });
    } catch (e) { /* 소리는 선택 사항 */ }
  }
  const SFX = {
    ok: () => beep([[660, 0.12], [880, 0.18, 0.1]]),
    bad: () => beep([[196, 0.25, 0, 'square', 0.035]]),
    clear: () => beep([[523, 0.15], [659, 0.15, 0.12], [784, 0.15, 0.24], [1047, 0.35, 0.36]]),
    fail: () => beep([[392, 0.2], [330, 0.2, 0.18], [262, 0.4, 0.36]]),
  };

  /* ───────────── 토스트 · 모달 ───────────── */
  let toastTimer = null;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
  }
  function modal(html, onMount) {
    const root = $('#modal-root');
    root.innerHTML = '';
    const back = el('<div class="modal-back" role="dialog" aria-modal="true"><div class="modal">' + html + '</div></div>');
    root.appendChild(back);
    const close = () => { root.innerHTML = ''; modalKey = null; };
    back.addEventListener('click', (e) => { if (e.target === back && !back.dataset.sticky) close(); });
    if (onMount) onMount($('.modal', back), close, back);
    const f = $('.modal [autofocus]', back) || $('.modal button', back);
    if (f) f.focus();
    return close;
  }
  let modalKey = null;
  function confirmBox(title, text, okLabel, onOk, danger) {
    modal('<h2>' + esc(title) + '</h2><p class="muted">' + esc(text) + '</p><div class="row end"><button class="btn ghost" data-x>취소</button><button class="btn ' + (danger ? 'danger' : 'primary') + '" data-ok>' + esc(okLabel) + '</button></div>', (m, close) => {
      $('[data-x]', m).onclick = close;
      $('[data-ok]', m).onclick = () => { close(); onOk(); };
    });
  }

  /* ───────────── 라우팅 ───────────── */
  let view = { name: 'home' };
  let keyHandler = null;
  const timers = new Set();
  function stopTimers() { timers.forEach((t) => clearInterval(t)); timers.clear(); }
  function go(name, params = {}, opts = {}) {
    stopTimers();
    keyHandler = null;
    view = Object.assign({ name }, params);
    if (!opts.noPush) {
      try { history.pushState({ pq: { name, id: params.id, li: params.li } }, ''); } catch (e) { /* 일부 환경은 history를 막음 */ }
    }
    render();
    window.scrollTo(0, 0);
  }
  // 브라우저·휴대폰의 뒤로 가기 버튼이 앱을 벗어나지 않고 이전 화면으로 가도록
  window.addEventListener('popstate', (e) => {
    const st = e.state && e.state.pq;
    if (view.name === 'quiz' && SESSION && !SESSION.done) {
      try { history.pushState({ pq: { name: 'quiz' } }, ''); } catch (er) { /* 무시 */ }
      confirmBox('그만할까요?', '지금 풀던 문제는 저장되지 않아요.', '그만하기', () => {
        SESSION = null;
        if (st && st.name !== 'quiz' && st.name !== 'result') go(st.name, { id: st.id, li: st.li }); else go('home');
      });
      return;
    }
    $('#modal-root').innerHTML = '';
    if (!st || st.name === 'quiz' || st.name === 'result') { go('home', {}, { noPush: true }); return; }
    go(st.name, { id: st.id, li: st.li }, { noPush: true });
  });
  function render() {
    document.body.classList.toggle('focus', view.name === 'quiz');
    renderTop();
    const scr = $('#screen');
    scr.innerHTML = '';
    (SCREENS[view.name] || SCREENS.home)(scr);
  }
  document.addEventListener('keydown', (e) => {
    // 한글 등 입력기 조합 중의 키(Enter 포함)는 무시: 조합이 끝나기 전에 제출되는 문제 방지
    if (e.isComposing || e.keyCode === 229) return;
    if ($('#modal-root').firstChild) {
      if (e.key === 'Escape' && !$('.modal-back[data-sticky]')) $('#modal-root').innerHTML = '';
      if (modalKey) modalKey(e);
      return;
    }
    if (keyHandler) keyHandler(e);
  });

  /* ───────────── 상단 바 ───────────── */
  const NAV = [['home', '지도'], ['notes', '요약노트'], ['wrong', '오답노트'], ['exam', '모의고사'], ['lab', '실습실'], ['settings', '설정']];
  const ICON = {
    home: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
    notes: 'M6 3h9l3 3v15H6zM9 9h6M9 13h6M9 17h4',
    wrong: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 9l6 6M15 9l-6 6',
    exam: 'M9 3h6v3H9zM15 5h3v16H6V5h3M9 13l2 2 4-4',
    lab: 'M4 5h16v14H4zM8 10l3 2-3 2M13 15h4',
    settings: 'M4 7h10M18 7h2M4 17h4M12 17h8M14 5v4M8 15v4',
    soundOn: 'M4 9h4l5-4v14l-5-4H4zM17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11',
    soundOff: 'M4 9h4l5-4v14l-5-4H4zM17 10l4 4M21 10l-4 4',
  };
  const icon = (k) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + ICON[k] + '"/></svg>';
  function renderTop() {
    const L = levelInfo(S.xp);
    const sessNav = SESSION && SESSION.mode === 'exam' ? 'exam' : SESSION && SESSION.mode === 'review' ? 'wrong' : 'home';
    const navName = { stage: 'home', quiz: sessNav, result: sessNav }[view.name] || view.name;
    const wc = wrongCount();
    $('#topbar').innerHTML =
      '<div class="topbar-inner">' +
      '<button class="brand" data-go="home" aria-label="지도로 가기"><span class="prompt">&gt;&gt;&gt;</span>파이썬 퀘스트</button>' +
      '<div class="lvl-chip" title="경험치"><b>Lv.' + L.lvl + '</b><span class="bar"><i style="width:' + Math.round((L.cur / L.need) * 100) + '%"></i></span><span>' + L.cur + '/' + L.need + '</span></div>' +
      '<button class="icon-btn" data-sound type="button" aria-label="효과음 ' + (S.settings.sound ? '끄기' : '켜기') + '" title="효과음 ' + (S.settings.sound ? '끄기' : '켜기') + '">' + icon(S.settings.sound ? 'soundOn' : 'soundOff') + '</button>' +
      '<nav class="nav" aria-label="메뉴">' +
      NAV.map(([k, t]) => '<button data-go="' + k + '"' + (navName === k ? ' aria-current="page"' : '') + '>' + t + (k === 'wrong' && wc ? ' <span class="nav-badge">' + wc + '</span>' : '') + '</button>').join('') +
      '</nav></div>';
    $('#tabbar').innerHTML = NAV.map(([k, t]) => '<button data-go="' + k + '" type="button"' + (navName === k ? ' aria-current="page"' : '') + '>' + icon(k) + '<span>' + t + '</span>' + (k === 'wrong' && wc ? '<i class="badge">' + wc + '</i>' : '') + '</button>').join('');
    $('[data-sound]', $('#topbar')).onclick = () => {
      S.settings.sound = !S.settings.sound;
      save();
      renderTop();
      toast(S.settings.sound ? '효과음 켬' : '효과음 끔');
      SFX.ok();
    };
    $$('#topbar [data-go], #tabbar [data-go]').forEach((b) => {
      b.onclick = () => {
        const target = b.dataset.go;
        if (view.name === 'quiz' && SESSION && !SESSION.done) {
          confirmBox('그만할까요?', '지금 풀던 문제는 저장되지 않아요.', '그만하기', () => go(target));
        } else go(target);
      };
    });
  }

  /* ───────────── 홈 / 지도 ───────────── */
  function starsHTML(n, max = 3) {
    let s = '<span class="stars" aria-label="별 ' + n + '개">';
    for (let i = 0; i < max; i++) s += '<span class="' + (i < n ? 'on' : 'off') + '">★</span>';
    return s + '</span>';
  }
  function openItem(item) {
    if (!isUnlocked(item)) {
      modal('<h2>잠긴 스테이지예요</h2><p class="muted">앞 스테이지를 먼저 클리어하면 열려요. 시험이 급하다면 <strong>자유 모드</strong>를 켜서 모든 스테이지를 바로 열 수 있어요.</p><div class="row end"><button class="btn ghost" data-x>닫기</button><button class="btn primary" data-ok>자유 모드 켜기</button></div>', (m, close) => {
        $('[data-x]', m).onclick = close;
        $('[data-ok]', m).onclick = () => { S.settings.unlockAll = true; save(); close(); toast('자유 모드: 모든 스테이지가 열렸어요'); openItem(item); };
      });
      return;
    }
    if (item.kind === 'boss') { startBoss(item.world); return; }
    const r = validResume(item.id);
    if (r) {
      modal('<h2>풀던 도전이 있어요</h2><p class="muted">' + esc(item.title) + ' · ' + r.idx + ' / ' + r.qids.length + '문제까지 풀었고 하트가 ' + r.hearts + '개 남아 있어요.</p><div class="stack"><button class="btn primary" data-a type="button">이어서 풀기</button><button class="btn" data-b type="button">배우기 카드부터 보기</button><button class="btn ghost" data-c type="button">처음부터 다시 풀기</button></div>', (m, close) => {
        $('[data-a]', m).onclick = () => { close(); resumeStage(item); };
        $('[data-b]', m).onclick = () => { close(); go('stage', { id: item.id, li: 0 }); };
        $('[data-c]', m).onclick = () => { close(); S.resume = null; save(); startStage(item); };
      });
      return;
    }
    const pos = !S.lessonsDone[item.id] && S.lessonPos[item.id] ? S.lessonPos[item.id] : 0;
    go('stage', { id: item.id, li: pos });
    if (pos > 0) toast('지난번에 보던 ' + (pos + 1) + '번째 카드부터 이어서 볼게요');
  }
  const SCREENS = {};
  SCREENS.home = function (scr) {
    const L = levelInfo(S.xp);
    const cur = currentItem();
    const cleared = ORDER.filter((x) => isCleared(x.id)).length;
    const hero = el(
      '<section class="hero">' +
      '<div class="hero-main">' +
      '<span class="caption">파이썬 및 필요 모듈 리뷰 · 시험 대비 게임</span>' +
      '<h1 class="hero-title">파이썬 퀘스트</h1>' +
      '<div class="terminal-line"><span class="p">&gt;&gt;&gt;</span> print("코딩 처음이어도 시험 정복")<span class="cursor"></span></div>' +
      '<p class="muted" style="max-width:52ch">수업 4개 강의의 모든 범위를 ' + ORDER.filter((x) => x.kind === 'stage').length + '개 스테이지와 ' + WORLDS.length + '개 보스전으로 나눴어요. 각 스테이지에서 개념을 배우고 문제로 확인한 다음, 강의마다 보스전을 깨고 마지막에 모의고사로 실력을 점검해요.</p>' +
      '<div class="row">' +
      (cur ? '<button class="btn primary" data-continue>' + (cleared ? '이어하기' : '시작하기') + ' · ' + esc(cur.kind === 'boss' ? cur.title : cur.num + '. ' + cur.title) + '</button>'
        : '<button class="btn primary" data-exam>모든 스테이지 클리어! 모의고사 보기</button>') +
      '<button class="btn ghost" data-tutorial>게임 방법 보기</button>' +
      '</div></div>' +
      '<aside class="panel player-card">' +
      '<div class="player-top">' + mascot('avatar') + '<div><div class="player-name">' + esc(S.name || '모험가') + '</div><div class="player-title">Lv.' + L.lvl + ' · ' + esc(L.title) + '</div></div></div>' +
      '<div><div class="row between" style="font-size:13px;margin-bottom:6px"><span class="muted">다음 레벨까지</span><span style="font-variant-numeric:tabular-nums">' + L.cur + ' / ' + L.need + ' XP</span></div><div class="xpbar"><i style="width:' + Math.round((L.cur / L.need) * 100) + '%"></i></div></div>' +
      '<div class="stat-grid">' +
      '<div class="stat"><b>' + totalStars() + '<span class="muted" style="font-size:14px"> / ' + ALL_ITEMS * 3 + '</span></b><span>모은 별</span></div>' +
      '<div class="stat"><b>' + cleared + '<span class="muted" style="font-size:14px"> / ' + ALL_ITEMS + '</span></b><span>클리어</span></div>' +
      '<div class="stat"><b>' + (S.streak.day === todayStr() || S.streak.day === todayStr(new Date(Date.now() - 864e5)) ? S.streak.count : 0) + '일</b><span>연속 학습</span></div>' +
      '</div></aside></section>'
    );
    scr.appendChild(hero);
    const cbtn = $('[data-continue]', hero);
    if (cbtn) cbtn.onclick = () => openItem(cur);
    const ebtn = $('[data-exam]', hero);
    if (ebtn) ebtn.onclick = () => go('exam');
    $('[data-tutorial]', hero).onclick = () => onboarding(true);

    // 오늘 할 일: 오답 복습, 모의고사 추천
    const todo = [];
    const rs = S.resume && STAGE[S.resume.stageId] && validResume(S.resume.stageId);
    if (rs) todo.push({ t: '풀던 도전: ' + STAGE[rs.stageId].title, d: rs.idx + ' / ' + rs.qids.length + '문제까지 풀었어요 · 하트 ' + rs.hearts + '개 남음', b: '이어서 풀기', f: () => resumeStage(STAGE[rs.stageId]) });
    const wc = wrongCount();
    if (wc) todo.push({ t: '오답 ' + wc + '개가 기다려요', d: '틀린 문제만 다시 풀어서 오답노트를 비워 보세요.', b: '오답 복습하기', f: () => startReview(Object.keys(S.wrong).filter((k) => QINDEX[k])) });
    const doneWorld = WORLDS.filter((w) => w.stages.every((s) => isCleared(s.id)));
    if (doneWorld.length && !S.exams.length) todo.push({ t: doneWorld.map((w) => w.lecture).join(', ') + ' 범위를 다 배웠어요', d: '모의고사로 실전처럼 점검해 보세요.', b: '모의고사 보기', f: () => go('exam') });
    if (todo.length) {
      const box = el('<section class="todo" aria-label="오늘 할 일"></section>');
      todo.forEach((x) => {
        const c = el('<div class="panel todo-item"><div><strong>' + esc(x.t) + '</strong><p class="muted" style="font-size:14px">' + esc(x.d) + '</p></div><button class="btn small" type="button">' + esc(x.b) + '</button></div>');
        $('button', c).onclick = x.f;
        box.appendChild(c);
      });
      scr.appendChild(box);
    }

    WORLDS.forEach((w) => {
      const done = w.stages.filter((s) => isCleared(s.id)).length;
      const sec = el('<section class="world"><div class="world-head"><div><span class="caption">' + esc(w.lecture) + '</span><h2>' + esc(w.title) + '</h2></div><span class="meta">' + esc(w.desc) + ' · ' + done + '/' + w.stages.length + ' 클리어</span></div><div class="world-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + w.stages.length + '" aria-valuenow="' + done + '" aria-label="' + esc(w.lecture) + ' 진행률"><i style="width:' + Math.round((done / w.stages.length) * 100) + '%"></i></div><div class="trail"></div></section>');
      const trail = $('.trail', sec);
      [...w.stages, w.boss].forEach((item) => {
        const r = rec(item.id);
        const unlocked = isUnlocked(item);
        const cls = ['node', item.kind === 'boss' ? 'boss' : '', r.cleared ? 'cleared' : '', !unlocked ? 'locked' : '', cur && cur.id === item.id ? 'current' : ''].join(' ');
        const right = r.cleared ? starsHTML(r.stars || 0) : !unlocked ? '<span class="pill">잠김</span>' : cur && cur.id === item.id ? '<span class="pill lav">지금 여기</span>' : '<span class="pill">도전 가능</span>';
        const qn = item.kind === 'boss' ? '' : ' · 문제 ' + (item.quiz || []).length + '개';
        const b = el('<button class="' + cls + '" type="button"><span class="node-num">' + esc(item.kind === 'boss' ? '♛' : item.num) + '</span><span style="min-width:0"><span class="node-title">' + esc(item.title) + '</span><span class="node-sub" style="display:block">' + esc(item.sub || '') + (item.kind === 'stage' ? qn : '') + '</span></span><span class="node-right">' + right + '</span></button>');
        b.onclick = () => openItem(item);
        trail.appendChild(b);
      });
      scr.appendChild(sec);
    });
  };

  /* ───────────── 스테이지: 배우기 ───────────── */
  function stageHeader(st, phase) {
    const steps = [['learn', '① 배우기'], ['quiz', '② 도전'], ['result', '③ 결과']];
    const idx = steps.findIndex((x) => x[0] === phase);
    return '<div class="stage-head"><span class="caption">' + esc(st.world.lecture) + ' · 스테이지 ' + esc(st.num) + '</span><h1>' + esc(st.title) + '</h1>' +
      '<div class="steps">' + steps.map((s, i) => '<span class="' + (i === idx ? 'on' : i < idx ? 'done' : '') + '">' + s[1] + '</span>').join('') + '</div></div>';
  }

  function codeBlock(code, opts = {}) {
    const wrap = el('<div class="code"><div class="code-head"><span class="dots"><i></i><i></i><i></i></span><span>' + esc(opts.file || 'main.py') + '</span><span class="row" style="gap:6px"></span></div><pre>' + codeHTML(code) + '</pre></div>');
    const tools = $('.code-head .row', wrap);
    if (opts.output != null) {
      const out = el('<div class="out" hidden><span class="out-label">실행 결과</span><span class="txt"></span></div>');
      wrap.appendChild(out);
      const run = el('<button class="btn small primary" type="button">▶ 실행</button>');
      run.onclick = () => {
        out.hidden = false;
        typeOut($('.txt', out), opts.output === '' ? '(출력 없음)' : opts.output);
        run.textContent = '↻ 다시 실행';
      };
      tools.appendChild(run);
    }
    if (opts.trace) {
      const tb = el('<button class="btn small" type="button">한 줄씩 실행</button>');
      tb.onclick = () => {
        const tr = tracer(opts.trace);
        wrap.replaceWith(tr);
      };
      tools.appendChild(tb);
    }
    if (opts.lab !== false) {
      const lb = el('<button class="btn small ghost" type="button" title="실습실에서 직접 고쳐서 실행해 보기">실습실</button>');
      lb.onclick = () => go('lab', { code });
      tools.appendChild(lb);
    }
    return wrap;
  }
  function typeOut(node, text) {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || text.length > 400) { node.textContent = text; return; }
    node.textContent = '';
    let i = 0;
    const step = Math.max(1, Math.ceil(text.length / 40));
    const t = setInterval(() => {
      i += step;
      node.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(t); timers.delete(t); }
    }, 18);
    timers.add(t);
  }

  function tracer(tr) {
    let k = 0;
    const box = el(
      '<div class="tracer">' +
      '<div class="code"><div class="code-head"><span class="dots"><i></i><i></i><i></i></span><span>한 줄씩 실행하기</span><span class="step-n"></span></div><pre></pre></div>' +
      '<div class="tracer-note"></div>' +
      '<div class="tracer-state"><div class="tracer-box"><span class="lbl">변수 상태</span><div class="vars"></div></div><div class="tracer-box"><span class="lbl">출력 화면</span><div class="tracer-out"></div></div></div>' +
      '<div class="row"><button class="btn small ghost" data-first type="button">⏮ 처음</button><button class="btn small" data-prev type="button">◀ 이전</button><button class="btn small primary" data-next type="button">다음 줄 ▶</button><button class="btn small ghost" data-auto type="button">▶ 자동 재생</button></div>' +
      '</div>'
    );
    const pre = $('pre', box);
    function show() {
      const s = tr.steps[k];
      const prev = k > 0 ? tr.steps[k - 1] : null;
      pre.innerHTML = codeHTML(tr.code, { hl: s.l });
      $('.step-n', box).textContent = '단계 ' + (k + 1) + ' / ' + tr.steps.length;
      const where = s.f && s.f !== '<module>' ? ' · ' + s.f + ' 함수 안' : '';
      $('.tracer-note', box).innerHTML = (s.l ? '방금 <strong>' + s.l + '번 줄</strong>을 실행했어요' + esc(where) : '') + (s.n ? ' · ' + inl(s.n) : '');
      const pv = {};
      if (prev && prev.f === s.f) prev.v.forEach(([n, v]) => { pv[n] = v; });
      $('.vars', box).innerHTML = s.v.length
        ? s.v.map(([n, v]) => '<span class="var' + (prev && pv[n] !== v ? ' changed' : '') + '"><b>' + esc(n) + '</b> = ' + esc(v) + '</span>').join('')
        : '<span class="muted" style="font-size:13px">아직 변수가 없어요</span>';
      $('.tracer-out', box).textContent = s.o || '';
      if (!s.o) $('.tracer-out', box).innerHTML = '<span class="muted" style="font-size:13px">아직 출력이 없어요</span>';
      $('[data-prev]', box).disabled = k === 0;
      $('[data-first]', box).disabled = k === 0;
      const nb = $('[data-next]', box);
      nb.textContent = k === tr.steps.length - 1 ? '끝! 처음부터' : '다음 줄 ▶';
      const line = $('.line.hl', pre);
      if (line) line.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
    let auto = null;
    const autoBtn = $('[data-auto]', box);
    const stopAuto = () => { if (auto) { clearInterval(auto); timers.delete(auto); auto = null; } autoBtn.textContent = '▶ 자동 재생'; };
    autoBtn.onclick = () => {
      if (auto) { stopAuto(); return; }
      if (k === tr.steps.length - 1) { k = 0; show(); }
      autoBtn.textContent = '⏸ 멈춤';
      auto = setInterval(() => {
        if (!box.isConnected || k >= tr.steps.length - 1) { stopAuto(); return; }
        k++; show();
      }, 900);
      timers.add(auto);
    };
    $('[data-next]', box).onclick = () => { stopAuto(); k = k === tr.steps.length - 1 ? 0 : k + 1; show(); };
    $('[data-prev]', box).onclick = () => { stopAuto(); if (k > 0) { k--; show(); } };
    $('[data-first]', box).onclick = () => { stopAuto(); k = 0; show(); };
    show();
    return box;
  }

  /* 미니 matplotlib 미리보기 */
  const CMAP = { b: '#7aa7ff', r: '#ff8a8a', g: '#7ddc9a', k: '#F5F5F5', m: '#e59cff', c: '#6fe0e6', y: '#f0d870', w: '#F5F5F5' };
  function niceTicks(min, max, n = 5) {
    if (min === max) { min -= 1; max += 1; }
    const step0 = (max - min) / n;
    const mag = Math.pow(10, Math.floor(Math.log10(step0)));
    const norm = step0 / mag;
    const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const t0 = Math.floor(min / step) * step, t1 = Math.ceil(max / step) * step;
    const arr = [];
    for (let v = t0; v <= t1 + step / 2; v += step) arr.push(+v.toFixed(10));
    return arr;
  }
  function chart(spec) {
    const W = 480, H = 290, P = { l: 46, r: 18, t: spec.title ? 36 : 16, b: 32 };
    const ser = spec.series.map((s) => Object.assign({}, s, { x: s.x || s.y.map((_, i) => i) }));
    const xs = ser.flatMap((s) => s.x), ys = ser.flatMap((s) => s.y);
    const xt = niceTicks(Math.min(...xs), Math.max(...xs)), yt = niceTicks(Math.min(...ys), Math.max(...ys));
    const X = (v) => P.l + ((v - xt[0]) / (xt[xt.length - 1] - xt[0])) * (W - P.l - P.r);
    const Y = (v) => H - P.b - ((v - yt[0]) / (yt[yt.length - 1] - yt[0])) * (H - P.t - P.b);
    let g = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(spec.title || '그래프 미리보기') + '">';
    g += '<rect x="' + P.l + '" y="' + P.t + '" width="' + (W - P.l - P.r) + '" height="' + (H - P.t - P.b) + '" fill="#141414" stroke="#333"/>';
    yt.forEach((v) => { g += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" stroke="#232323"/><text x="' + (P.l - 8) + '" y="' + (Y(v) + 4) + '" fill="#8d8d8d" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">' + v + '</text>'; });
    xt.forEach((v) => { g += '<text x="' + X(v) + '" y="' + (H - P.b + 18) + '" fill="#8d8d8d" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">' + v + '</text>'; });
    if (spec.title) g += '<text x="' + (P.l + (W - P.l - P.r) / 2) + '" y="22" fill="#F5F5F5" font-size="14" text-anchor="middle">' + esc(spec.title) + '</text>';
    ser.forEach((s, i) => {
      const col = CMAP[s.color] || (i ? '#ffb38a' : '#C3BDFF');
      const dash = { '--': '8 5', ':': '2 4', '-.': '8 4 2 4' }[s.dash] || '';
      const pts = s.x.map((x, j) => X(x) + ',' + Y(s.y[j])).join(' ');
      if (s.dash !== 'none') g += '<polyline points="' + pts + '" fill="none" stroke="' + col + '" stroke-width="2.2"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
      s.x.forEach((x, j) => {
        const cx = X(x), cy = Y(s.y[j]);
        if (s.marker === 'o') g += '<circle cx="' + cx + '" cy="' + cy + '" r="4.5" fill="' + col + '"/>';
        else if (s.marker === 'v') g += '<polygon points="' + (cx - 5) + ',' + (cy - 4) + ' ' + (cx + 5) + ',' + (cy - 4) + ' ' + cx + ',' + (cy + 5) + '" fill="' + col + '"/>';
        else if (s.marker === '^') g += '<polygon points="' + (cx - 5) + ',' + (cy + 4) + ' ' + (cx + 5) + ',' + (cy + 4) + ' ' + cx + ',' + (cy - 5) + '" fill="' + col + '"/>';
        else if (s.marker === 's') g += '<rect x="' + (cx - 4) + '" y="' + (cy - 4) + '" width="8" height="8" fill="' + col + '"/>';
      });
    });
    if (spec.legend) {
      const labeled = ser.filter((s) => s.label);
      const lw = 150, lh = 12 + labeled.length * 18;
      g += '<rect x="' + (W - P.r - lw - 8) + '" y="' + (P.t + 8) + '" width="' + lw + '" height="' + lh + '" fill="#111" stroke="#333" rx="4"/>';
      labeled.forEach((s, i) => {
        const col = CMAP[s.color] || (ser.indexOf(s) ? '#ffb38a' : '#C3BDFF');
        const y = P.t + 22 + i * 18, x = W - P.r - lw;
        g += '<line x1="' + x + '" x2="' + (x + 22) + '" y1="' + y + '" y2="' + y + '" stroke="' + col + '" stroke-width="2.2"/><text x="' + (x + 30) + '" y="' + (y + 4) + '" fill="#F5F5F5" font-size="11.5">' + esc(s.label) + '</text>';
      });
    }
    return el('<div class="chart">' + g + '</svg></div>');
  }

  function tableBlock(rows) {
    const [head, ...body] = rows;
    return el('<div class="table-wrap"><table class="t"><thead><tr>' + head.map((c) => '<th>' + inl(c) + '</th>').join('') + '</tr></thead><tbody>' +
      body.map((r) => '<tr>' + r.map((c) => '<td>' + inl(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>');
  }

  function checkBlock(c) {
    const box = el('<div class="check"><span class="qtype">잠깐 확인!</span><div class="q">' + inl(c.q) + '</div><div class="choices"></div><div class="fb" hidden></div></div>');
    const list = $('.choices', box);
    let done = false;
    c.choices.forEach((t, i) => {
      const b = el('<button class="choice" type="button"><span class="k">' + (i + 1) + '</span><span class="v">' + inl(t) + '</span></button>');
      b.onclick = () => {
        if (done) return;
        done = true;
        const ok = i === c.answer;
        $$('.choice', list).forEach((x, j) => { if (j === c.answer) x.classList.add('right'); else if (j === i) x.classList.add('wrong'); });
        const fb = $('.fb', box);
        fb.hidden = false;
        fb.innerHTML = '<p><strong class="' + (ok ? '' : '') + '" style="color:var(' + (ok ? '--ok' : '--bad') + ')">' + (ok ? '맞았어요!' : '아쉬워요.') + '</strong> ' + inl(c.explain || '') + '</p>';
        (ok ? SFX.ok : SFX.bad)();
      };
      list.appendChild(b);
    });
    return box;
  }

  function tipBlock(text) {
    return el('<div class="tip">' + mascot() + '<div><span class="who">파이의 한마디</span><div class="lesson-body">' + md(text) + '</div></div></div>');
  }
  function warnBlock(text) {
    return el('<div class="warn"><span class="who">⚠ 시험 함정</span><div class="lesson-body">' + md(text) + '</div></div>');
  }

  function lessonCard(st, c, i, total) {
    const card = el('<section class="panel lesson-card"><div class="lesson-top"><span class="caption">배우기 ' + (i + 1) + ' / ' + total + '</span>' + (st.lessons.length ? '' : '') + '</div><div class="lesson-progress"><i style="width:' + Math.round(((i + 1) / total) * 100) + '%"></i></div><h2>' + esc(c.title) + '</h2></section>');
    if (c.body) card.appendChild(el('<div class="lesson-body">' + md(c.body) + '</div>'));
    if (c.table) card.appendChild(tableBlock(c.table));
    if (c.code) {
      const tr = TRACES[st.id + ':' + i];
      const fresh = tr && tr.code === c.code ? tr : null; // 코드가 바뀌었는데 다시 생성하지 않은 추적 데이터는 쓰지 않음
      card.appendChild(codeBlock(c.code, { output: c.output, trace: fresh, file: c.file, lab: !c.file || c.file === 'main.py' }));
    }
    if (c.chart) card.appendChild(chart(c.chart));
    if (c.after) card.appendChild(el('<div class="lesson-body">' + md(c.after) + '</div>'));
    if (c.tip) card.appendChild(tipBlock(c.tip));
    if (c.warn) card.appendChild(warnBlock(c.warn));
    if (c.check) card.appendChild(checkBlock(c.check));
    return card;
  }
  function summaryCard(st, total) {
    const card = el('<section class="panel lesson-card"><div class="lesson-top"><span class="caption">배우기 ' + total + ' / ' + total + ' · 정리</span></div><div class="lesson-progress"><i style="width:100%"></i></div><h2>핵심 정리</h2><div class="lesson-body">' +
      md((st.summary || []).map((x) => '- ' + x).join('\n')) + '</div></section>');
    if (st.traps && st.traps.length) card.appendChild(warnBlock(st.traps.map((x) => '- ' + x).join('\n')));
    card.appendChild(el('<p class="muted" style="font-size:14px">이 정리는 상단 메뉴의 <strong>요약노트</strong>에서 언제든 다시 볼 수 있어요. 이제 문제 ' + (st.quiz || []).length + '개(약 ' + Math.max(3, Math.round((st.quiz || []).length * 0.6)) + '분)로 확인해 봐요. 하트 ' + heartsFor((st.quiz || []).length) + '개가 모두 사라지기 전에 끝까지 풀면 클리어! 중간에 나가도 이어서 풀 수 있어요.</p>'));
    return card;
  }

  SCREENS.stage = function (scr) {
    const st = STAGE[view.id];
    if (!st || st.kind !== 'stage') return go('home');
    const total = st.lessons.length + 1;
    const i = Math.min(view.li || 0, total - 1);
    if (S.lessonPos[st.id] !== i) { S.lessonPos[st.id] = i; save(); }
    scr.appendChild(el(stageHeader(st, 'learn')));
    if (i === 0 && st.goal) scr.appendChild(el('<p class="muted" style="margin:-6px 0 16px">' + inl('이번 목표: ' + st.goal) + '</p>'));
    scr.appendChild(i < st.lessons.length ? lessonCard(st, st.lessons[i], i, total) : summaryCard(st, total));
    const nav = el('<div class="row between sticky-bar" style="margin-top:16px"><div class="row"><button class="btn ghost" data-prev type="button">◀ 이전</button></div><div class="row"><button class="btn ghost small" data-skip type="button">배우기 건너뛰고 도전</button><button class="btn primary" data-next type="button"></button></div></div>');
    const last = i === total - 1;
    $('[data-next]', nav).textContent = last ? '도전 시작 ▶' : '다음 ▶';
    $('[data-prev]', nav).disabled = i === 0;
    if (last || !(S.lessonsDone[st.id] || S.settings.unlockAll)) $('[data-skip]', nav).hidden = true;
    const next = () => {
      if (last) { S.lessonsDone[st.id] = true; save(); startStage(st); }
      else go('stage', { id: st.id, li: i + 1 });
    };
    const prev = () => { if (i > 0) go('stage', { id: st.id, li: i - 1 }); };
    $('[data-next]', nav).onclick = next;
    $('[data-prev]', nav).onclick = prev;
    $('[data-skip]', nav).onclick = () => startStage(st);
    scr.appendChild(nav);
    scr.appendChild(el('<p class="muted" style="font-size:13px;margin-top:10px">키보드: <kbd>←</kbd> <kbd>→</kbd> 로 넘기기</p>'));
    keyHandler = (e) => {
      if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
  };

  /* ───────────── 퀴즈 세션 ───────────── */
  let SESSION = null;
  const TYPE_LABEL = { mc: '객관식', ox: 'O / X', output: '출력 예측', blank: '빈칸 채우기', order: '코드 순서 맞추기', match: '짝 맞추기' };
  const DEFAULT_Q = {
    output: '이 코드를 실행하면 무엇이 출력될까요?',
    order: '줄을 올바른 순서로 눌러 쌓아서 코드를 완성하세요.',
    match: '서로 관련된 것끼리 짝지어 주세요.',
    blank: '빈칸에 들어갈 알맞은 것을 골라 채우세요.',
  };
  function startSession(cfg) {
    SESSION = Object.assign({
      idx: 0, hearts: Infinity, maxHearts: 0, mistakes: 0, combo: 0, maxCombo: 0, xp: 0, log: [], startedAt: Date.now(), done: false, failed: false, timer: 0,
    }, cfg);
    SESSION.maxHearts = cfg.maxHearts || (SESSION.hearts === Infinity ? 0 : SESSION.hearts);
    go('quiz');
  }
  // 문제가 많은 스테이지는 하트도 많이 (20문제까지 5개, 그 위로 4문제당 1개, 최대 9개)
  const heartsFor = (n) => Math.min(9, Math.max(5, Math.ceil(n / 4)));
  function startStage(st) {
    if (S.resume && S.resume.stageId === st.id) S.resume = null;
    const qs = shuffle(st.quiz.map((q) => q));
    startSession({ mode: 'stage', stageId: st.id, title: st.title, questions: qs, hearts: heartsFor(qs.length) });
  }
  // 도전 도중에 나가도 이어서 풀 수 있도록 저장된 기록
  function validResume(id) {
    const r = S.resume;
    if (!r || r.stageId !== id || !Array.isArray(r.qids) || !r.qids.every((k) => QINDEX[k])) return null;
    if (r.qids.length !== STAGE[id].quiz.length || r.idx >= r.qids.length) return null;
    return r;
  }
  function resumeStage(st) {
    const r = validResume(st.id);
    if (!r) { startStage(st); return; }
    startSession({ mode: 'stage', stageId: st.id, title: st.title, questions: r.qids.map((k) => QINDEX[k]), hearts: r.hearts, idx: r.idx, mistakes: r.mistakes, combo: r.combo, maxCombo: r.maxCombo, xp: r.xp, log: r.log, maxHearts: r.maxHearts });
  }
  function startBoss(w) {
    const pool = w.stages.filter((s) => !s.tutorial).flatMap((s) => s.quiz);
    startSession({ mode: 'boss', stageId: w.boss.id, worldId: w.id, title: w.boss.title, questions: shuffle(pool).slice(0, 12), hearts: 3, timer: 1 });
  }
  function startReview(qids) {
    const qs = shuffle(qids.map((k) => QINDEX[k]).filter(Boolean)).slice(0, 20);
    if (!qs.length) { toast('다시 풀 오답이 없어요'); return; }
    startSession({ mode: 'review', title: '오답 다시 풀기', questions: qs });
  }
  function startExam(worldIds, n) {
    const pool = REAL_STAGES.filter((s) => worldIds.includes(s.world.id)).flatMap((s) => s.quiz);
    startSession({ mode: 'exam', title: '모의고사', questions: shuffle(pool).slice(0, n), worldIds });
  }

  function normalizeOut(s) {
    return String(s).replace(/\r/g, '').split('\n').map((l) => l.trim().replace(/\s+/g, ' ')).join('\n').replace(/^\n+|\n+$/g, '').trim();
  }

  /* 문제 유형별 위젯: { el, ready(), check() -> {ok, given}, reveal(ok), key(e) } */
  function widget(q, onChange) {
    let locked = false;
    const W = { lock() { locked = true; } };

    if (q.type === 'mc' || q.type === 'ox') {
      const isOX = q.type === 'ox';
      const items = isOX ? [['O', true], ['X', false]] : q.choices.map((c, i) => [c, i]);
      const order = isOX || q.fixed ? items.map((_, i) => i) : shuffle(items.map((_, i) => i));
      let sel = -1;
      W.el = el('<div class="' + (isOX ? 'ox' : 'choices') + '"></div>');
      order.forEach((oi, k) => {
        const [label] = items[oi];
        const b = el('<button class="choice" type="button">' + (isOX ? '' : '<span class="k">' + (k + 1) + '</span>') + '<span class="v">' + (isOX ? label : inl(label)) + '</span></button>');
        b.onclick = () => {
          if (locked) return;
          sel = k;
          $$('.choice', W.el).forEach((x, j) => x.classList.toggle('sel', j === k));
          onChange();
        };
        W.el.appendChild(b);
      });
      W.ready = () => sel >= 0;
      W.check = () => {
        const [label, val] = items[order[sel]];
        const ok = isOX ? val === q.answer : val === q.answer;
        return { ok, given: isOX ? label : label };
      };
      W.reveal = () => {
        $$('.choice', W.el).forEach((b, j) => {
          const val = items[order[j]][1];
          if (val === q.answer) b.classList.add('right');
          else if (j === sel) b.classList.add('wrong');
        });
      };
      W.key = (e) => {
        // e.code는 자판 언어와 상관없는 물리 키 (한글 자판에서 O 키는 'ㅐ'로 들어옴)
        const n = isOX
          ? ({ KeyO: 1, Digit1: 1, Numpad1: 1, KeyX: 2, Digit2: 2, Numpad2: 2 }[e.code] || { o: 1, O: 1, x: 2, X: 2, '1': 1, '2': 2 }[e.key])
          : (/^(Digit|Numpad)[1-9]$/.test(e.code) ? +e.code.slice(-1) : parseInt(e.key, 10));
        if (n >= 1 && n <= order.length) { $$('.choice', W.el)[n - 1].click(); return true; }
        return false;
      };
      W.answerText = () => (isOX ? (q.answer ? 'O' : 'X') : q.choices[q.answer]);
      return W;
    }

    if (q.type === 'output') {
      const multi = q.answer.includes('\n');
      W.el = el('<div class="stack"><label for="ans-input" class="muted" style="font-size:14px">' + (multi ? '출력 결과를 그대로 입력하세요. 여러 줄이면 줄을 바꿔서 쓰세요. (제출: <kbd>Ctrl</kbd>+<kbd>Enter</kbd>)' : '출력 결과를 그대로 입력하세요. (제출: <kbd>Enter</kbd>)') + '</label>' +
        (multi ? '<textarea id="ans-input" class="answer-input" rows="' + Math.min(9, q.answer.split('\n').length + 1) + '" spellcheck="false" autocomplete="off" autocapitalize="off"></textarea>'
          : '<input id="ans-input" class="answer-input" type="text" spellcheck="false" autocomplete="off" autocapitalize="off">') + '</div>');
      const inp = $('#ans-input', W.el);
      inp.addEventListener('input', onChange);
      W.ready = () => inp.value.trim().length > 0;
      W.check = () => {
        const raw = inp.value;
        const g = normalizeOut(raw);
        const acc = [q.answer].concat(q.accept || []).map(normalizeOut);
        if (acc.includes(g)) return { ok: true, given: raw };
        // 쉼표·괄호 주변 공백만 다르면 정답으로 인정하고 실제 모양을 알려 줌
        const squash = (x) => x.replace(/\s*([,:()\[\]{}])\s*/g, '$1');
        if (acc.some((a) => squash(a) === squash(g))) return { ok: true, given: raw, note: '공백 위치만 달라서 정답으로 인정했어요. 실제 출력은 `' + q.answer.split('\n')[0] + '` 모양이에요.' };
        let note = '';
        const unq = g.split('\n').map((l) => l.replace(/^(['"])(.*)\1$/, '$2')).join('\n');
        if (unq !== g && acc.includes(unq)) note = '내용은 맞았어요! 하지만 print는 문자열의 **따옴표를 출력하지 않아요**.';
        else if (acc.some((a) => a.toLowerCase() === g.toLowerCase())) note = '대소문자가 달라요. 파이썬은 `True`, `False`, `None`처럼 대소문자를 정확히 구분해요.';
        else if (g.split('\n').length !== acc[0].split('\n').length) note = '줄 수가 달라요. 정답은 **' + acc[0].split('\n').length + '줄**이에요. print 한 번에 한 줄, `end=""`이면 줄이 바뀌지 않아요.';
        return { ok: false, given: raw, note };
      };
      W.reveal = (ok) => { inp.readOnly = true; inp.classList.add(ok ? 'right' : 'wrong'); };
      W.focus = () => inp.focus();
      W.multi = multi;
      W.answerText = () => q.answer;
      let hintStep = 0;
      W.hintMax = 2;
      W.hint = () => {
        hintStep++;
        const lines = q.answer.split('\n');
        if (hintStep === 1) return '출력은 ' + lines.length + '줄이에요' + (q.hint ? ' · ' + q.hint : '');
        const first = lines[0];
        return '첫 줄은 "' + first.slice(0, Math.max(1, Math.ceil(first.length / 2))) + '…"(으)로 시작해요';
      };
      return W;
    }

    if (q.type === 'blank') {
      const parts = q.code.split('___');
      const n = parts.length - 1;
      const fill = new Array(n).fill(null); // 각 칸에 들어간 bank 인덱스
      const bank = shuffle(q.options.map((t, i) => i));
      let active = 0;
      let html = '';
      parts.forEach((p, i) => {
        html += hlInline(p);
        if (i < n) html += '<span class="slot empty" data-s="' + i + '" role="button" tabindex="0"></span>';
      });
      W.el = el('<div class="stack"><div class="code"><pre>' + html + '</pre></div><div class="bank"></div></div>');
      const bankEl = $('.bank', W.el);
      function paint() {
        $$('.slot', W.el).forEach((s, i) => {
          s.classList.toggle('empty', fill[i] === null);
          s.classList.toggle('active', !locked && i === active);
          s.textContent = fill[i] === null ? '' : q.options[fill[i]];
        });
        $$('.token', bankEl).forEach((t) => t.classList.toggle('used', fill.includes(+t.dataset.i)));
      }
      bank.forEach((bi) => {
        const t = el('<button class="token" type="button" data-i="' + bi + '">' + esc(q.options[bi]) + '</button>');
        t.onclick = () => {
          if (locked) return;
          let slot = fill[active] === null ? active : fill.indexOf(null);
          if (slot < 0) slot = active;
          fill[slot] = bi;
          const nxt = fill.indexOf(null);
          active = nxt < 0 ? slot : nxt;
          paint(); onChange();
        };
        bankEl.appendChild(t);
      });
      $$('.slot', W.el).forEach((s) => {
        s.onclick = () => {
          if (locked) return;
          const i = +s.dataset.s;
          if (fill[i] !== null) fill[i] = null;
          active = i;
          paint(); onChange();
        };
      });
      paint();
      W.ready = () => fill.every((x) => x !== null);
      W.check = () => {
        const given = fill.map((x) => q.options[x]);
        return { ok: given.every((g, i) => g === q.answer[i]), given: given.join(' / ') };
      };
      W.reveal = () => {
        $$('.slot', W.el).forEach((s, i) => {
          const ok = q.options[fill[i]] === q.answer[i];
          s.classList.add(ok ? 'right' : 'wrong');
          s.classList.remove('active');
        });
      };
      W.answerText = () => { let s = ''; parts.forEach((p, i) => { s += p; if (i < n) s += q.answer[i]; }); return s; };
      W.answerIsCode = true;
      return W;
    }

    if (q.type === 'order') {
      const lines = q.lines;
      let bank = shuffle(lines.map((_, i) => i));
      if (lines.length > 1 && bank.every((v, i) => v === i)) bank = bank.reverse();
      const picked = [];
      W.el = el('<div class="stack"><div class="order-zone" aria-label="완성 중인 코드"></div><span class="caption">남은 줄</span><div class="stack" data-bank style="gap:6px"></div></div>');
      const zone = $('.order-zone', W.el), bankEl = $('[data-bank]', W.el);
      function paint() {
        zone.innerHTML = '';
        picked.forEach((li, k) => {
          const b = el('<button class="oline" type="button"><span class="n">' + (k + 1) + '</span><span>' + (q.text ? inl(lines[li]) : hlInline(lines[li])) + '</span></button>');
          b.onclick = () => { if (locked) return; picked.splice(k, 1); paint(); onChange(); };
          zone.appendChild(b);
        });
        bankEl.innerHTML = '';
        bank.filter((li) => !picked.includes(li)).forEach((li) => {
          const b = el('<button class="oline" type="button"><span class="n">+</span><span>' + (q.text ? inl(lines[li]) : hlInline(lines[li])) + '</span></button>');
          b.onclick = () => { if (locked) return; picked.push(li); paint(); onChange(); };
          bankEl.appendChild(b);
        });
        if (!bankEl.children.length) bankEl.innerHTML = '<span class="muted" style="font-size:13px">모든 줄을 배치했어요. 잘못 넣은 줄은 위에서 눌러 빼낼 수 있어요.</span>';
      }
      paint();
      W.ready = () => picked.length === lines.length;
      W.check = () => {
        const ok = picked.every((li, k) => lines[li] === lines[k]);
        return { ok, given: picked.map((li) => lines[li]).join('\n') };
      };
      W.reveal = () => {
        $$('.oline', zone).forEach((b, k) => b.classList.add(lines[picked[k]] === lines[k] ? 'right' : 'wrong'));
      };
      W.answerText = () => lines.join('\n');
      W.answerIsCode = !q.text;
      return W;
    }

    if (q.type === 'match') {
      const pairs = q.pairs;
      const right = shuffle(pairs.map((_, i) => i));
      const link = new Array(pairs.length).fill(null); // 왼쪽 i -> 오른쪽 원본 인덱스
      let selL = null;
      const L = 'ABCDEFGH';
      W.el = el('<div class="match"><div class="match-col" data-l></div><div class="match-col" data-r></div></div>');
      const lc = $('[data-l]', W.el), rc = $('[data-r]', W.el);
      pairs.forEach((p, i) => {
        const b = el('<button class="mitem" type="button" data-i="' + i + '"><span class="tag"></span><span>' + inl(p[0]) + '</span></button>');
        b.onclick = () => {
          if (locked) return;
          if (link[i] !== null) { link[i] = null; selL = i; } else selL = selL === i ? null : i;
          paint(); onChange();
        };
        lc.appendChild(b);
      });
      right.forEach((ri) => {
        const b = el('<button class="mitem" type="button" data-i="' + ri + '"><span class="tag"></span><span>' + inl(pairs[ri][1]) + '</span></button>');
        b.onclick = () => {
          if (locked) return;
          const owner = link.indexOf(ri);
          if (owner >= 0) { link[owner] = null; paint(); onChange(); return; }
          if (selL === null) { const free = link.indexOf(null); if (free < 0) return; selL = free; }
          link[selL] = ri;
          const nxt = link.indexOf(null);
          selL = nxt < 0 ? null : nxt;
          paint(); onChange();
        };
        rc.appendChild(b);
      });
      function paint() {
        $$('.mitem', lc).forEach((b, i) => {
          b.classList.toggle('sel', selL === i);
          b.classList.toggle('paired', link[i] !== null);
          $('.tag', b).textContent = L[i];
        });
        $$('.mitem', rc).forEach((b) => {
          const ri = +b.dataset.i, owner = link.indexOf(ri);
          b.classList.toggle('paired', owner >= 0);
          $('.tag', b).textContent = owner >= 0 ? L[owner] : '';
        });
      }
      paint();
      W.ready = () => link.every((x) => x !== null);
      W.check = () => ({ ok: link.every((ri, i) => ri === i), given: link.map((ri, i) => pairs[i][0] + ' → ' + pairs[ri][1]).join('\n') });
      W.reveal = () => {
        $$('.mitem', lc).forEach((b, i) => b.classList.add(link[i] === i ? 'right' : 'wrong'));
        $$('.mitem', rc).forEach((b) => { const owner = link.indexOf(+b.dataset.i); b.classList.add(owner === +b.dataset.i ? 'right' : 'wrong'); });
      };
      W.answerText = () => pairs.map((p) => p[0].replace(/`/g, '') + '  →  ' + p[1].replace(/`/g, '')).join('\n');
      return W;
    }

    W.el = el('<p class="muted">알 수 없는 문제 유형</p>');
    W.ready = () => true;
    W.check = () => ({ ok: true, given: '' });
    W.reveal = () => {};
    W.answerText = () => '';
    return W;
  }

  SCREENS.quiz = function (scr) {
    const se = SESSION;
    if (!se) return go('home');
    if (se.done) return go('result');
    const q = se.questions[se.idx];
    const total = se.questions.length;
    const isExam = se.mode === 'exam';

    const hud = el('<div class="quiz-hud"></div>');
    if (se.maxHearts) {
      let hs = '<div class="hearts" aria-label="남은 하트 ' + se.hearts + '개">';
      for (let i = 0; i < se.maxHearts; i++) hs += '<span class="' + (i < se.hearts ? 'on' : 'off') + '">♥</span>';
      hud.appendChild(el(hs + '</div>'));
    }
    hud.appendChild(el('<div class="qbar" aria-hidden="true"><i style="width:' + Math.round((se.idx / total) * 100) + '%"></i></div>'));
    hud.appendChild(el('<span class="caption" style="font-variant-numeric:tabular-nums">' + (se.idx + 1) + ' / ' + total + '</span>'));
    if (!isExam) hud.appendChild(el('<span class="combo">' + (se.combo >= 2 ? se.combo + '콤보' : '') + '</span>'));
    const timerEl = el('<span class="timer"></span>');
    if (se.timer || isExam) hud.appendChild(timerEl);
    scr.appendChild(el('<div class="stage-head" style="margin-bottom:10px"><span class="caption">' + esc({ stage: '스테이지 도전', boss: '보스전', review: '오답 복습', exam: '모의고사' }[se.mode]) + '</span><h1 style="font-size:clamp(22px,4vw,30px)">' + esc(se.title) + '</h1></div>'));
    if (se.mode === 'stage' && !S.seen.quizTip) {
      const tipEl = el('<div class="tip" style="margin-bottom:14px">' + mascot() + '<div><span class="who">첫 도전 안내</span><div class="lesson-body"><ul><li>답을 고르고 <strong>확인</strong> → 바로 정답과 해설</li><li><span style="color:var(--bad)">♥</span> ' + se.maxHearts + '개: 틀리면 하나씩 줄어요</li><li>틀린 문제는 오답노트에 저장, 중간에 나가도 이어 풀기 가능</li></ul><div class="row"><button class="btn small primary" type="button">알겠어요</button></div></div></div></div>');
      $('button', tipEl).onclick = () => { S.seen.quizTip = true; save(); tipEl.remove(); };
      scr.appendChild(tipEl);
    }
    scr.appendChild(hud);

    const card = el('<section class="panel qcard"><div class="row between"><span class="qtype">' + TYPE_LABEL[q.type] + '</span><span class="pill">' + esc(q.stage.world.lecture + ' · ' + q.stage.num + '. ' + q.stage.title) + '</span></div><div class="qtext">' + inl(q.q || DEFAULT_Q[q.type] || '') + '</div></section>');
    if (q.code && q.type !== 'blank') card.appendChild(codeBlock(q.code, { lab: false }));
    const fbSlot = el('<div></div>');
    const giveLabel = isExam ? '모르겠어요 (넘기기)' : se.maxHearts ? '정답 보기 (♥ -1)' : '정답 보기';
    const actions = el('<div class="qactions sticky-bar"><span class="hint-text"></span><button class="btn ghost small" data-giveup type="button">' + giveLabel + '</button><button class="btn primary" data-check type="button" disabled>확인</button></div>');
    let W;
    const onChange = () => { $('[data-check]', actions).disabled = !W.ready(); };
    W = widget(q, onChange);
    card.appendChild(W.el);
    card.appendChild(fbSlot);
    card.appendChild(actions);
    scr.appendChild(card);
    if (W.hint) {
      const hb = el('<button class="btn ghost small" type="button">힌트</button>');
      let used = 0;
      hb.onclick = () => {
        used++;
        $('.hint-text', actions).textContent = W.hint();
        if (used >= (W.hintMax || 1)) hb.remove(); else hb.textContent = '힌트 더 보기';
      };
      actions.insertBefore(hb, $('[data-giveup]', actions));
    }
    const quitRow = el('<div class="row" style="margin-top:14px"><button class="btn ghost small" type="button">그만하기</button><span class="muted" style="font-size:13px">' + (q.type === 'mc' ? '숫자키 <kbd>1</kbd>~<kbd>4</kbd> 로 고르고 <kbd>Enter</kbd> 로 확인' : q.type === 'ox' ? '<kbd>O</kbd> / <kbd>X</kbd> 키로 고르고 <kbd>Enter</kbd> 로 확인' : '') + '</span></div>');
    const quitMsg = se.mode === 'stage' ? '지금까지 푼 기록은 저장돼요. 지도에서 이 스테이지를 다시 누르면 이어서 풀 수 있어요.' : '지금 풀던 기록은 저장되지 않아요.';
    $('button', quitRow).onclick = () => confirmBox('그만할까요?', quitMsg, '그만하기', () => { SESSION = null; go(se.mode === 'review' ? 'wrong' : se.mode === 'exam' ? 'exam' : 'home'); });
    scr.appendChild(quitRow);
    if (W.focus) setTimeout(W.focus, 30);

    let answered = false;
    function finishQuestion(res) {
      if (answered) return;
      answered = true;
      stopTimers();
      W.lock();
      const ok = res.ok;
      se.log.push({ qid: q.qid, ok, given: res.given });
      S.answered++;
      if (ok) {
        S.correct++;
        se.combo++;
        se.maxCombo = Math.max(se.maxCombo, se.combo);
        const gain = isExam || se.mode === 'review' ? 5 : 10 + Math.min(Math.max(se.combo - 2, 0), 5) * 2;
        se.xp += gain;
        if (S.wrong[q.qid]) delete S.wrong[q.qid];
      } else {
        se.combo = 0;
        se.mistakes++;
        if (se.hearts !== Infinity) se.hearts--;
        const w = S.wrong[q.qid] || { n: 0 };
        S.wrong[q.qid] = { n: w.n + 1, t: Date.now() };
      }
      if (se.mode === 'stage') {
        S.resume = se.hearts === 0 || se.idx + 1 >= total ? null : {
          stageId: se.stageId, qids: se.questions.map((x) => x.qid), idx: se.idx + 1, hearts: se.hearts, maxHearts: se.maxHearts,
          mistakes: se.mistakes, combo: se.combo, maxCombo: se.maxCombo, xp: se.xp, log: se.log,
        };
      }
      save();
      if (isExam) { advance(); return; }
      W.reveal(ok);
      (ok ? SFX.ok : SFX.bad)();
      const ansHTML = W.answerIsCode ? '<div class="ans">' + hlInline(W.answerText()) + '</div>' : '<div class="ans">' + esc(String(W.answerText()).replace(/`/g, '')) + '</div>';
      const praise = ['정답!', '좋아요!', '완벽해요!', '바로 그거예요!'];
      const fb = el('<div class="feedback ' + (ok ? 'ok' : 'bad') + '"><div class="fb-title">' + (ok ? praise[Math.floor(Math.random() * praise.length)] + (se.combo >= 3 ? ' ' + se.combo + '콤보!' : '') : res.timeout ? '시간 초과!' : '아쉬워요') + '</div>' +
        (res.note ? '<div class="lesson-body"><p>' + inl(res.note) + '</p></div>' : '') +
        (ok ? '' : '<div><span class="muted" style="font-size:13px">정답</span>' + ansHTML + '</div>') +
        (q.explain ? '<div class="lesson-body">' + md(q.explain) + '</div>' : '') + '</div>');
      fbSlot.appendChild(fb);
      const status = ok ? '경험치 획득!' : se.hearts !== Infinity ? '하트 ' + se.hearts + '개 남음 · 오답노트에 저장했어요' : '오답노트에 저장했어요';
      actions.innerHTML = '<span class="hint-text">' + status + '</span><button class="btn primary" data-next type="button">' + (se.hearts === 0 || se.idx + 1 >= total ? '결과 보기' : '계속 ▶') + '</button>';
      $('[data-next]', actions).onclick = advance;
      $('[data-next]', actions).focus();
      renderTop();
      // 헤더 하트 갱신
      const hearts = $('.hearts', hud);
      if (hearts) $$('span', hearts).forEach((s, i) => { s.className = i < se.hearts ? 'on' : 'off'; });
      const combo = $('.combo', hud);
      if (combo) combo.textContent = se.combo >= 2 ? se.combo + '콤보' : '';
      fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    function advance() {
      if (se.hearts === 0) { se.failed = true; endSession(); return; }
      se.idx++;
      if (se.idx >= total) { endSession(); return; }
      render();
      window.scrollTo(0, 0);
    }
    $('[data-check]', actions).onclick = () => { if (W.ready()) finishQuestion(W.check()); };
    $('[data-giveup]', actions).onclick = () => finishQuestion({ ok: false, given: '(모름)' });

    // 타이머
    if (se.timer) {
      let left = q.type === 'output' || q.type === 'order' || q.type === 'match' || q.type === 'blank' ? 45 : 25;
      timerEl.textContent = '⏱ ' + left + '초';
      const t = setInterval(() => {
        left--;
        timerEl.textContent = '⏱ ' + left + '초';
        timerEl.classList.toggle('low', left <= 5);
        if (left <= 0) finishQuestion({ ok: false, given: '(시간 초과)', timeout: true });
      }, 1000);
      timers.add(t);
    } else if (isExam) {
      const tick = () => {
        const s = Math.floor((Date.now() - se.startedAt) / 1000);
        timerEl.textContent = '⏱ ' + Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
      };
      tick();
      const t = setInterval(tick, 1000);
      timers.add(t);
    }

    keyHandler = (e) => {
      const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
      if (e.key === 'Enter') {
        if (answered) { if (!(document.activeElement && document.activeElement.matches('[data-next]'))) { e.preventDefault(); advance(); } return; }
        if (typing && W.multi && !(e.ctrlKey || e.metaKey)) return;
        if (W.ready()) { e.preventDefault(); finishQuestion(W.check()); }
        return;
      }
      if (!answered && !typing && W.key && W.key(e)) e.preventDefault();
    };
  };

  function endSession() {
    const se = SESSION;
    se.done = true;
    if (se.mode === 'stage' && S.resume && S.resume.stageId === se.stageId) S.resume = null;
    stopTimers();
    se.correct = se.log.filter((x) => x.ok).length;
    const total = se.questions.length;
    touchStreak();
    if (se.mode === 'stage' || se.mode === 'boss') {
      const cleared = !se.failed;
      let stars = 0;
      if (cleared) {
        if (se.mode === 'stage') { const acc = se.correct / total; stars = acc >= 0.95 ? 3 : acc >= 0.8 ? 2 : 1; }
        else stars = se.hearts >= 3 ? 3 : se.hearts === 2 ? 2 : 1;
      }
      const old = rec(se.stageId);
      let bonus = 0;
      if (cleared && !old.cleared) bonus += se.mode === 'boss' ? 100 : 30;
      if (stars > (old.stars || 0)) bonus += (stars - (old.stars || 0)) * 10;
      se.bonus = bonus;
      se.stars = stars;
      se.firstClear = cleared && !old.cleared;
      S.stages[se.stageId] = { cleared: !!old.cleared || cleared, stars: Math.max(old.stars || 0, stars), best: Math.max(old.best || 0, Math.round((se.correct / total) * 100)) };
      addXP(se.xp + bonus);
      (cleared ? SFX.clear : SFX.fail)();
    } else if (se.mode === 'exam') {
      se.score = Math.round((se.correct / total) * 100);
      S.exams.unshift({ d: Date.now(), score: se.score, n: total, c: se.correct, sec: Math.round((Date.now() - se.startedAt) / 1000), w: se.worldIds });
      S.exams = S.exams.slice(0, 20);
      se.bonus = Math.round(se.score / 2);
      addXP(se.xp + se.bonus);
      SFX.clear();
    } else {
      se.bonus = 0;
      addXP(se.xp);
      SFX.clear();
    }
    save();
    go('result');
  }

  /* ───────────── 결과 ───────────── */
  function reviewList(se, onlyWrong) {
    const box = el('<div class="result-list"></div>');
    se.log.forEach((lg, i) => {
      if (onlyWrong && lg.ok) return;
      const q = QINDEX[lg.qid];
      const d = el('<details class="note"><summary><span class="pill ' + (lg.ok ? 'ok' : 'bad') + '">' + (lg.ok ? '정답' : '오답') + '</span><span style="min-width:0">' + (i + 1) + '. ' + inl(q.q || DEFAULT_Q[q.type] || '') + '</span></summary><div class="note-body"></div></details>');
      const body = $('.note-body', d);
      if (q.code && q.type !== 'blank') body.appendChild(codeBlock(q.code, { lab: true }));
      const w = widget(q, () => {});
      body.appendChild(el('<div><span class="caption">정답</span><div class="ans code" style="margin-top:6px"><pre>' + (w.answerIsCode ? hlInline(w.answerText()) : esc(String(w.answerText()).replace(/`/g, ''))) + '</pre></div></div>'));
      if (!lg.ok) body.appendChild(el('<div><span class="caption">내 답</span><div class="code" style="margin-top:6px"><pre>' + esc(lg.given || '') + '</pre></div></div>'));
      if (q.explain) body.appendChild(el('<div class="lesson-body">' + md(q.explain) + '</div>'));
      box.appendChild(d);
    });
    return box;
  }
  function nextItemAfter(id) {
    const it = STAGE[id];
    return ORDER[it.order + 1] || null;
  }
  SCREENS.result = function (scr) {
    const se = SESSION;
    if (!se || !se.done) return go('home');
    const total = se.questions.length;
    const acc = Math.round((se.correct / total) * 100);
    const wrapper = el('<section class="result"></section>');
    if (se.mode === 'stage' || se.mode === 'boss') {
      const cleared = !se.failed;
      const st = STAGE[se.stageId];
      if (se.mode === 'stage') scr.appendChild(el(stageHeader(st, 'result')));
      let stars = '<div class="big-stars" aria-label="별 ' + se.stars + '개">';
      for (let i = 0; i < 3; i++) stars += '<span class="' + (i < se.stars ? 'on' : '') + '">★</span>';
      wrapper.appendChild(el('<div>' + mascot('avatar') + '</div>'));
      wrapper.appendChild(el('<h1>' + (cleared ? (se.mode === 'boss' ? '보스 격파!' : '스테이지 클리어!') : '하트가 모두 떨어졌어요') + '</h1>'));
      wrapper.appendChild(el(stars + '</div>'));
      wrapper.appendChild(el('<p class="muted" style="max-width:46ch">' + (cleared
        ? (se.stars === 3 ? '하나도 안 틀렸어요. 이 범위는 시험에 나와도 문제없어요!' : '클리어! 틀린 문제는 오답노트에 모아뒀어요. 한 번 더 도전하면 별을 더 모을 수 있어요.')
        : '괜찮아요. 틀린 문제의 해설을 읽고 다시 도전해 봐요. 배우기 카드를 한 번 더 보는 것도 좋아요.') + '</p>'));
      wrapper.appendChild(el('<div class="result-stats"><div class="stat"><b>' + se.correct + '/' + se.log.length + '</b><span>정답</span></div><div class="stat"><b>' + se.maxCombo + '</b><span>최대 콤보</span></div><div class="stat"><b>+' + (se.xp + se.bonus) + '</b><span>XP</span></div></div>'));
      const btns = el('<div class="row" style="justify-content:center"></div>');
      const nxt = nextItemAfter(se.stageId);
      if (cleared && nxt) {
        const b = el('<button class="btn primary" type="button">다음: ' + esc(nxt.kind === 'boss' ? nxt.title : nxt.num + '. ' + nxt.title) + ' ▶</button>');
        b.onclick = () => openItem(nxt);
        btns.appendChild(b);
      }
      const wrongIds = se.log.filter((x) => !x.ok).map((x) => x.qid);
      if (wrongIds.length) {
        const rv = el('<button class="btn" type="button">틀린 ' + wrongIds.length + '문제만 다시 풀기</button>');
        rv.onclick = () => startReview(wrongIds);
        btns.appendChild(rv);
      }
      const again = el('<button class="btn' + (cleared ? '' : ' primary') + '" type="button">다시 도전</button>');
      again.onclick = () => (se.mode === 'boss' ? startBoss(STAGE[se.stageId].world) : startStage(st));
      btns.appendChild(again);
      if (se.mode === 'stage') {
        const learn = el('<button class="btn ghost" type="button">배우기 다시 보기</button>');
        learn.onclick = () => go('stage', { id: st.id, li: 0 });
        btns.appendChild(learn);
      }
      const home = el('<button class="btn ghost" type="button">지도로</button>');
      home.onclick = () => go('home');
      btns.appendChild(home);
      wrapper.appendChild(btns);
      scr.appendChild(wrapper);
      if (se.log.some((x) => !x.ok)) {
        scr.appendChild(el('<h2 style="font-size:22px;margin:18px 0 10px">틀린 문제 다시 보기</h2>'));
        scr.appendChild(reviewList(se, true));
      }
    } else if (se.mode === 'exam') {
      const g = se.score >= 95 ? 'A+' : se.score >= 90 ? 'A' : se.score >= 85 ? 'B+' : se.score >= 80 ? 'B' : se.score >= 75 ? 'C+' : se.score >= 70 ? 'C' : se.score >= 60 ? 'D' : 'F';
      const sec = Math.round((Date.now() - se.startedAt) / 1000);
      wrapper.appendChild(el('<span class="caption">모의고사 결과</span>'));
      wrapper.appendChild(el('<div class="grade">' + g + '</div>'));
      wrapper.appendChild(el('<h1>' + se.score + '점</h1>'));
      wrapper.appendChild(el('<div class="result-stats"><div class="stat"><b>' + se.correct + '/' + total + '</b><span>정답</span></div><div class="stat"><b>' + Math.floor(sec / 60) + '분 ' + (sec % 60) + '초</b><span>걸린 시간</span></div><div class="stat"><b>+' + (se.xp + se.bonus) + '</b><span>XP</span></div></div>'));
      scr.appendChild(wrapper);
      // 단원별 분석
      const by = {};
      se.log.forEach((lg) => {
        const s = QINDEX[lg.qid].stage;
        by[s.id] = by[s.id] || { s, n: 0, c: 0 };
        by[s.id].n++;
        if (lg.ok) by[s.id].c++;
      });
      const rows = [['단원', '정답', '정답률']].concat(Object.values(by).sort((a, b) => a.s.order - b.s.order).map((x) => [x.s.world.lecture + ' · ' + x.s.title, x.c + ' / ' + x.n, Math.round((x.c / x.n) * 100) + '%']));
      scr.appendChild(el('<h2 style="font-size:22px;margin:18px 0 10px">단원별 분석</h2>'));
      scr.appendChild(tableBlock(rows));
      const weak = Object.values(by).filter((x) => x.c / x.n < 0.6).map((x) => x.s).sort((a, b) => a.order - b.order);
      if (weak.length) {
        const wk = el('<div class="warn" style="margin-top:12px"><span class="who">약한 단원</span><div class="row" style="margin-top:6px"></div></div>');
        weak.forEach((s) => { const b = el('<button class="btn small" type="button">' + esc(s.num + '. ' + s.title) + ' 복습</button>'); b.onclick = () => go('stage', { id: s.id, li: 0 }); $('.row', wk).appendChild(b); });
        scr.appendChild(wk);
      }
      const btns = el('<div class="row" style="justify-content:center;margin:20px 0"><button class="btn primary" data-a type="button">한 번 더 보기</button><button class="btn" data-w type="button">오답노트로</button><button class="btn ghost" data-h type="button">지도로</button></div>');
      $('[data-a]', btns).onclick = () => startExam(se.worldIds, total);
      $('[data-w]', btns).onclick = () => go('wrong');
      $('[data-h]', btns).onclick = () => go('home');
      scr.appendChild(btns);
      scr.appendChild(el('<h2 style="font-size:22px;margin:18px 0 10px">전체 문항 해설</h2>'));
      scr.appendChild(reviewList(se, false));
    } else {
      wrapper.appendChild(el('<div>' + mascot('avatar') + '</div>'));
      wrapper.appendChild(el('<h1>복습 완료!</h1>'));
      wrapper.appendChild(el('<p class="muted">' + se.correct + '문제를 맞혀서 오답노트에서 지웠어요. 남은 오답 ' + wrongCount() + '개.</p>'));
      wrapper.appendChild(el('<div class="result-stats"><div class="stat"><b>' + se.correct + '/' + total + '</b><span>정답</span></div><div class="stat"><b>' + acc + '%</b><span>정답률</span></div><div class="stat"><b>+' + se.xp + '</b><span>XP</span></div></div>'));
      const btns = el('<div class="row" style="justify-content:center"><button class="btn primary" data-w type="button">오답노트로</button><button class="btn ghost" data-h type="button">지도로</button></div>');
      $('[data-w]', btns).onclick = () => go('wrong');
      $('[data-h]', btns).onclick = () => go('home');
      wrapper.appendChild(btns);
      scr.appendChild(wrapper);
      if (se.log.some((x) => !x.ok)) scr.appendChild(reviewList(se, true));
    }
  };

  /* ───────────── 요약노트 ───────────── */
  SCREENS.notes = function (scr) {
    scr.appendChild(el('<div class="stage-head"><span class="caption">시험 직전 훑어보기</span><h1>요약노트</h1><p class="muted">스테이지마다 꼭 기억할 내용과 시험 함정을 모았어요. 검색으로 원하는 개념을 바로 찾을 수 있어요.</p></div>'));
    const search = el('<input class="search" id="note-search" type="search" placeholder="예: 슬라이스, append, loc, 들여쓰기" aria-label="요약노트 검색">');
    scr.appendChild(search);
    const box = el('<div></div>');
    scr.appendChild(box);
    function draw(qs) {
      box.innerHTML = '';
      const needle = qs.trim().toLowerCase();
      let any = false;
      WORLDS.forEach((w) => {
        const sec = el('<section class="note-world"><span class="caption">' + esc(w.lecture) + '</span><h2 style="font-size:24px;margin:2px 0 10px">' + esc(w.title) + '</h2></section>');
        let count = 0;
        w.stages.forEach((s) => {
          const items = (s.summary || []).filter((x) => !needle || x.toLowerCase().includes(needle) || s.title.toLowerCase().includes(needle));
          const traps = (s.traps || []).filter((x) => !needle || x.toLowerCase().includes(needle) || s.title.toLowerCase().includes(needle));
          if (!items.length && !traps.length) return;
          count++;
          const d = el('<details class="note"' + (needle ? ' open' : '') + '><summary><span class="pill lav">' + esc(s.num) + '</span>' + esc(s.title) + '</summary><div class="note-body"><div class="lesson-body">' + md(items.map((x) => '- ' + x).join('\n')) + '</div></div></details>');
          if (traps.length) $('.note-body', d).appendChild(warnBlock(traps.map((x) => '- ' + x).join('\n')));
          const b = el('<div class="row"><button class="btn small" type="button">이 스테이지 배우기</button></div>');
          $('button', b).onclick = () => openItem(s);
          $('.note-body', d).appendChild(b);
          sec.appendChild(d);
        });
        if (count) { box.appendChild(sec); any = true; }
      });
      if (!any) box.appendChild(el('<p class="muted" style="margin-top:20px">"' + esc(qs) + '"에 대한 내용을 찾지 못했어요. 다른 낱말로 검색해 보세요.</p>'));
    }
    search.addEventListener('input', () => draw(search.value));
    draw('');
  };

  /* ───────────── 오답노트 ───────────── */
  SCREENS.wrong = function (scr) {
    const ids = Object.keys(S.wrong).filter((k) => QINDEX[k]).sort((a, b) => QINDEX[a].stage.order - QINDEX[b].stage.order);
    scr.appendChild(el('<div class="stage-head"><span class="caption">틀린 문제만 모아서</span><h1>오답노트</h1><p class="muted">틀린 문제는 자동으로 여기에 저장되고, 다시 맞히면 사라져요. 시험 전에 이 목록을 0개로 만드는 게 목표예요.</p></div>'));
    if (!ids.length) {
      scr.appendChild(el('<section class="panel stack" style="align-items:center;text-align:center;padding:36px">' + mascot('avatar') + '<h2 style="font-size:24px">오답이 하나도 없어요</h2><p class="muted">스테이지를 풀다가 틀린 문제가 생기면 여기에 모여요.</p></section>'));
      return;
    }
    const top = el('<div class="row between" style="margin-bottom:14px"><span class="pill bad">오답 ' + ids.length + '개</span><div class="row"><button class="btn primary" data-all type="button">오답 다시 풀기 (최대 20문제)</button></div></div>');
    $('[data-all]', top).onclick = () => startReview(ids);
    scr.appendChild(top);
    let lastStage = null;
    ids.forEach((qid) => {
      const q = QINDEX[qid];
      if (q.stage !== lastStage) {
        lastStage = q.stage;
        scr.appendChild(el('<h2 style="font-size:20px;margin:22px 0 8px">' + esc(q.stage.world.lecture + ' · ' + q.stage.num + '. ' + q.stage.title) + '</h2>'));
      }
      const w = widget(q, () => {});
      const item = el('<section class="panel wrong-item"><div class="meta"><span class="qtype">' + TYPE_LABEL[q.type] + '</span><span class="pill bad">' + S.wrong[qid].n + '번 틀림</span></div><div class="qtext" style="font-size:16px">' + inl(q.q || DEFAULT_Q[q.type] || '') + '</div></section>');
      if (q.code && q.type !== 'blank') item.appendChild(codeBlock(q.code, {}));
      item.appendChild(el('<details class="note"><summary>정답과 해설 보기</summary><div class="note-body"><div class="code"><pre>' + (w.answerIsCode ? hlInline(w.answerText()) : esc(String(w.answerText()).replace(/`/g, ''))) + '</pre></div>' + (q.explain ? '<div class="lesson-body">' + md(q.explain) + '</div>' : '') + '</div></details>'));
      const acts = el('<div class="row"><button class="btn small" data-one type="button">이 문제만 풀기</button><button class="btn small ghost" data-del type="button">목록에서 지우기</button></div>');
      $('[data-one]', acts).onclick = () => startReview([qid]);
      $('[data-del]', acts).onclick = () => { delete S.wrong[qid]; save(); render(); };
      item.appendChild(acts);
      scr.appendChild(item);
      item.style.marginBottom = '10px';
    });
  };

  /* ───────────── 모의고사 ───────────── */
  SCREENS.exam = function (scr) {
    scr.appendChild(el('<div class="stage-head"><span class="caption">실전처럼 풀어보기</span><h1>모의고사</h1><p class="muted">고른 강의에서 문제를 무작위로 뽑아요. 풀이 중에는 정답을 알려주지 않고, 끝나면 점수와 단원별 분석, 전체 해설을 보여줘요.</p></div>'));
    const p = el('<section class="panel stack"></section>');
    p.appendChild(el('<span class="caption">출제 범위</span>'));
    const ranges = el('<div class="row"></div>');
    WORLDS.forEach((w) => {
      const n = w.stages.filter((s) => !s.tutorial).reduce((a, s) => a + s.quiz.length, 0);
      ranges.appendChild(el('<label class="pill" style="cursor:pointer;padding:8px 12px;font-size:14px"><input type="checkbox" id="exam-' + w.id + '" value="' + w.id + '" checked> ' + esc(w.lecture + ' ' + w.short) + ' (' + n + ')</label>'));
    });
    p.appendChild(ranges);
    p.appendChild(el('<span class="caption">문항 수</span>'));
    const cnt = el('<div class="row"><select id="exam-count" aria-label="문항 수"><option value="10">10문제 · 약 10분</option><option value="20" selected>20문제 · 약 20분</option><option value="30">30문제 · 약 30분</option><option value="50">50문제 · 약 50분</option></select><button class="btn primary" data-start type="button">시험 시작</button></div>');
    p.appendChild(cnt);
    $('[data-start]', cnt).onclick = () => {
      const ws = $$('input[type=checkbox]', ranges).filter((x) => x.checked).map((x) => x.value);
      if (!ws.length) { toast('출제 범위를 하나 이상 골라주세요'); return; }
      startExam(ws, parseInt($('#exam-count').value, 10));
    };
    scr.appendChild(p);
    if (S.exams.length) {
      scr.appendChild(el('<h2 style="font-size:22px;margin:24px 0 10px">지난 기록</h2>'));
      const rows = [['날짜', '범위', '점수', '정답', '시간']].concat(S.exams.map((x) => {
        const d = new Date(x.d);
        return [(d.getMonth() + 1) + '/' + d.getDate() + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'), (x.w || []).map((id) => (WORLDS.find((w) => w.id === id) || {}).lecture).join(', '), x.score + '점', x.c + '/' + x.n, Math.floor(x.sec / 60) + '분 ' + (x.sec % 60) + '초'];
      }));
      scr.appendChild(tableBlock(rows));
    }
  };

  /* ───────────── 실습실 (Pyodide) ───────────── */
  const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
  let PY = null, PYLOADING = null;
  function loadPy() {
    if (PY) return Promise.resolve(PY);
    if (PYLOADING) return PYLOADING;
    PYLOADING = new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = PYODIDE_URL;
      s.onload = async () => {
        try { PY = await window.loadPyodide(); res(PY); } catch (e) { PYLOADING = null; rej(e); }
      };
      s.onerror = () => { PYLOADING = null; s.remove(); rej(new Error('load')); };
      document.head.appendChild(s);
    });
    return PYLOADING;
  }
  const ERRHELP = {
    NameError: '정의되지 않은 이름(변수·함수)을 썼어요. 철자와 대소문자, 그리고 변수를 먼저 만들었는지 확인하세요.',
    SyntaxError: '문법이 틀렸어요. 콜론(:), 괄호 짝, 따옴표 짝을 확인하세요.',
    IndentationError: '들여쓰기가 맞지 않아요. 같은 블록의 줄은 공백 4칸으로 똑같이 맞추세요.',
    TypeError: '자료형이 맞지 않는 연산이에요. 예: 문자열 + 숫자는 안 돼요. str()이나 int()로 바꿔 주세요.',
    ValueError: '값의 모양이 맞지 않아요. 예: int("3.5")는 안 되고 int(float("3.5"))처럼 써야 해요.',
    ZeroDivisionError: '0으로 나눌 수 없어요.',
    IndexError: '없는 위치(인덱스)를 썼어요. 인덱스는 0부터 시작하고 길이-1까지예요.',
    KeyError: '사전에 없는 키를 썼어요. dic.get(키)를 쓰면 에러 대신 None이 나와요.',
    ModuleNotFoundError: '모듈을 찾지 못했어요. 이름을 확인하세요.',
    AttributeError: '그 값에는 없는 메서드나 속성을 썼어요. 철자를 확인하세요.',
    FileNotFoundError: '파일이 없어요. 실습실은 브라우저 안의 가상 공간이라, 먼저 "w" 모드로 파일을 만든 다음 읽어야 해요.',
  };
  async function runPy(code, stdinText) {
    const py = await loadPy();
    let out = '';
    const dec = new TextDecoder();
    py.setStdout({ write: (buf) => { out += dec.decode(buf, { stream: true }); return buf.length; } });
    py.setStderr({ write: (buf) => { out += dec.decode(buf, { stream: true }); return buf.length; } });
    const lines = (stdinText || '').split('\n');
    let k = 0;
    py.setStdin({ stdin: () => (k < lines.length ? lines[k++] : undefined) });
    try {
      await py.loadPackagesFromImports(code);
      const ns = py.globals.get('dict')();
      await py.runPythonAsync(code, { globals: ns });
      ns.destroy();
      return { out, err: null };
    } catch (e) {
      const msg = String(e.message || e);
      const lines2 = msg.trim().split('\n');
      const last = lines2[lines2.length - 1];
      const m = last.match(/^(\w+(?:Error|Exception)?)/);
      const lineNo = (msg.match(/File "<exec>", line (\d+)/g) || []).pop();
      return { out, err: last, help: m && ERRHELP[m[1]], line: lineNo ? lineNo.replace(/\D+/g, '') : '' };
    }
  }
  const LAB_DEFAULT = '# 마음대로 고쳐서 실행해 보세요!\nname = "파이"\nfor i in range(3):\n    print(i + 1, "번째 인사:", "안녕,", name)\n\nscore = [88, 95, 70]\nprint("평균 =", sum(score) / len(score))\n';
  let labCode = null;
  SCREENS.lab = function (scr) {
    if (view.code) { labCode = view.code; view.code = null; }
    if (labCode == null) labCode = S.labCode || LAB_DEFAULT;
    scr.appendChild(el('<div class="stage-head"><span class="caption">직접 쳐보면 두 배로 기억나요</span><h1>실습실</h1><p class="muted">브라우저 안에서 진짜 파이썬이 돌아가요. 처음 실행할 때 엔진(약 10MB)을 내려받느라 시간이 조금 걸려요. numpy, pandas도 import 하면 자동으로 불러와요. 그래프(matplotlib)는 Google Colab에서 확인하세요.</p></div>'));
    const p = el('<section class="panel stack"></section>');
    const sel = el('<select id="lab-example" aria-label="예제 불러오기"><option value="">예제 불러오기…</option></select>');
    WORLDS.forEach((w) => w.stages.forEach((s) => {
      const og = document.createElement('optgroup');
      og.label = s.num + '. ' + s.title;
      s.lessons.forEach((c, i) => { if (c.code) { const o = document.createElement('option'); o.value = s.id + '|' + i; o.textContent = c.title; og.appendChild(o); } });
      if (og.children.length) sel.appendChild(og);
    }));
    const top = el('<div class="row between"></div>');
    top.appendChild(sel);
    const status = el('<span class="pill" id="lab-status">' + (PY ? '엔진 준비됨' : '엔진 대기 중') + '</span>');
    top.appendChild(status);
    p.appendChild(top);
    const ed = el('<textarea class="editor" id="lab-editor" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="파이썬 코드"></textarea>');
    ed.value = labCode;
    let saveT = null;
    ed.addEventListener('input', () => {
      labCode = ed.value;
      clearTimeout(saveT);
      saveT = setTimeout(() => { S.labCode = labCode; save(); }, 600);
    });
    ed.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ed.selectionStart, en = ed.selectionEnd;
        ed.value = ed.value.slice(0, s) + '    ' + ed.value.slice(en);
        ed.selectionStart = ed.selectionEnd = s + 4;
        labCode = ed.value;
      }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
    });
    p.appendChild(ed);
    p.appendChild(el('<details class="note"><summary>input()에 넣을 값 (한 줄에 하나씩)</summary><div class="note-body"><textarea class="editor" id="lab-stdin" style="min-height:70px" spellcheck="false" placeholder="예: 2021"></textarea></div></details>'));
    const acts = el('<div class="row"><button class="btn primary" data-run type="button">▶ 실행 <kbd style="margin-left:4px">Ctrl+Enter</kbd></button><button class="btn ghost" data-reset type="button">처음 코드로</button></div>');
    p.appendChild(acts);
    const out = el('<div class="code"><div class="code-head"><span>출력</span><span></span></div><div class="out" style="border-top:0;min-height:80px"><span class="muted">실행 결과가 여기에 나와요.</span></div></div>');
    p.appendChild(out);
    scr.appendChild(p);
    sel.onchange = () => {
      if (!sel.value) return;
      const [sid, i] = sel.value.split('|');
      ed.value = labCode = STAGE[sid].lessons[+i].code;
      sel.value = '';
    };
    $('[data-reset]', acts).onclick = () => { ed.value = labCode = LAB_DEFAULT; S.labCode = null; save(); };
    async function run() {
      const o = $('.out', out);
      o.classList.remove('err');
      if (!PY) { status.textContent = '엔진 불러오는 중…'; o.innerHTML = '<span class="muted">파이썬 엔진을 불러오고 있어요. 처음 한 번만 기다리면 돼요.</span>'; }
      else o.innerHTML = '<span class="muted">실행 중…</span>';
      try {
        const r = await runPy(ed.value, $('#lab-stdin').value);
        status.textContent = '엔진 준비됨';
        o.textContent = r.out || (r.err ? '' : '(출력 없음)');
        if (r.err) {
          o.appendChild(el('<div style="color:var(--bad);margin-top:6px">' + esc(r.err) + (r.line ? ' (' + r.line + '번 줄)' : '') + '</div>'));
          if (r.help) o.appendChild(el('<div class="muted" style="margin-top:4px;font-family:var(--f-body)">도움말: ' + esc(r.help) + '</div>'));
        }
      } catch (e) {
        status.textContent = '엔진 불러오기 실패';
        o.classList.add('err');
        o.textContent = '파이썬 엔진을 불러오지 못했어요. 인터넷 연결을 확인하고 다시 눌러 보세요. 계속 안 되면 Google Colab(colab.research.google.com)에 코드를 붙여넣어 실행해 보세요.';
      }
    }
    $('[data-run]', acts).onclick = run;
  };

  /* ───────────── 설정 ───────────── */
  SCREENS.settings = function (scr) {
    scr.appendChild(el('<div class="stage-head"><span class="caption">내 기록과 옵션</span><h1>설정</h1></div>'));
    const p = el('<section class="panel"></section>');
    const nameRow = el('<div class="switch"><div><strong>닉네임</strong><div class="desc">지도 화면의 플레이어 카드에 보여요.</div></div><div class="row"><input type="text" id="set-name" maxlength="12" aria-label="닉네임"><button class="btn small" type="button">저장</button></div></div>');
    $('#set-name', nameRow).value = S.name;
    $('button', nameRow).onclick = () => { S.name = $('#set-name', nameRow).value.trim() || '모험가'; save(); renderTop(); toast('닉네임을 저장했어요'); };
    p.appendChild(nameRow);
    function sw(key, title, desc) {
      const r = el('<div class="switch"><div><strong>' + title + '</strong><div class="desc">' + desc + '</div></div><label class="toggle"><input type="checkbox" id="set-' + key + '" aria-label="' + title + '"><span></span></label></div>');
      const inp = $('input', r);
      inp.checked = !!S.settings[key];
      inp.onchange = () => { S.settings[key] = inp.checked; save(); toast(title + (inp.checked ? ' 켬' : ' 끔')); };
      return r;
    }
    p.appendChild(sw('sound', '효과음', '정답·오답·클리어 소리를 들려줘요.'));
    p.appendChild(sw('unlockAll', '자유 모드 (모든 스테이지 열기)', '시험이 급할 때 순서와 상관없이 원하는 스테이지로 바로 갈 수 있어요.'));
    const stats = el('<div class="switch"><div><strong>지금까지 푼 문제</strong><div class="desc">정답률은 모든 모드를 합친 값이에요.</div></div><span class="pill lav">' + S.answered + '문제 · 정답률 ' + (S.answered ? Math.round((S.correct / S.answered) * 100) : 0) + '%</span></div>');
    p.appendChild(stats);
    const tut = el('<div class="switch"><div><strong>게임 방법 다시 보기</strong><div class="desc">처음 화면의 안내를 다시 보여줘요.</div></div><button class="btn small" type="button">보기</button></div>');
    $('button', tut).onclick = () => onboarding(true);
    p.appendChild(tut);
    const reset = el('<div class="switch"><div><strong>기록 초기화</strong><div class="desc">경험치, 별, 오답노트, 모의고사 기록이 모두 지워져요.</div></div><button class="btn small danger" type="button">초기화</button></div>');
    $('button', reset).onclick = () => confirmBox('정말 초기화할까요?', '모든 기록이 지워지고 되돌릴 수 없어요.', '모두 지우기', () => {
      const name = S.name;
      S = clone(DEFAULT);
      S.name = name;
      S.onboarded = true;
      save();
      go('home');
      toast('기록을 초기화했어요');
    }, true);
    p.appendChild(reset);
    scr.appendChild(p);
    scr.appendChild(el('<p class="muted" style="font-size:13px;margin-top:14px">기록은 이 브라우저에만 저장돼요. 다른 기기나 시크릿 창에서는 새로 시작해요.</p>'));
  };

  /* ───────────── 처음 안내 (튜토리얼) ───────────── */
  function onboarding(again) {
    const pages = [
      {
        t: '파이썬 퀘스트에 온 걸 환영해요',
        b: '저는 길잡이 뱀 <strong>파이</strong>예요. 코딩을 한 번도 안 해봤어도 괜찮아요. 수업 PDF 4개의 범위를 처음부터 끝까지 게임처럼 차근차근 같이 갈 거예요.' +
          (again ? '' : '<div class="stack" style="margin-top:14px"><label for="ob-name" class="muted" style="font-size:14px">뭐라고 불러드릴까요?</label><input type="text" id="ob-name" maxlength="12" placeholder="닉네임 (예: 코딩새싹)" autofocus></div>'),
      },
      {
        t: '스테이지는 이렇게 진행돼요',
        b: '<ol style="margin:0;padding-left:1.2em;display:flex;flex-direction:column;gap:8px"><li><strong>배우기</strong> · 카드를 넘기며 개념을 익혀요. 코드 옆 <span class="pill lav">▶ 실행</span>을 누르면 결과가, <span class="pill">한 줄씩 실행</span>을 누르면 변수가 변하는 과정이 보여요.</li><li><strong>도전</strong> · 객관식, O/X, 출력 예측, 빈칸 채우기, 순서 맞추기, 짝 맞추기 문제를 풀어요.</li><li><strong>결과</strong> · 틀린 문제는 해설과 함께 오답노트에 자동 저장돼요.</li></ol>',
      },
      {
        t: '규칙은 간단해요',
        b: '<ul style="margin:0;padding-left:1.2em;display:flex;flex-direction:column;gap:8px"><li>스테이지 도전에는 <span style="color:var(--bad)">♥</span> 하트가 5개 이상(문제가 많으면 더 많이) 있어요. 다 잃으면 다시 도전!</li><li>정답률 95% 이상이면 <span class="lav">★★★</span>, 80% 이상이면 <span class="lav">★★</span>, 끝까지 버티면 <span class="lav">★</span></li><li>도전 중에 나가도 기록이 저장돼서 이어서 풀 수 있어요.</li><li>연속으로 맞히면 <strong>콤보</strong>로 경험치가 더 쌓이고 레벨이 올라요.</li><li>강의마다 마지막에 <strong>보스전</strong>이 있어요. 제한 시간과 하트 3개로 실력을 확인해요.</li></ul>',
      },
      {
        t: '시험 직전엔 이것만 기억하세요',
        b: '<ul style="margin:0;padding-left:1.2em;display:flex;flex-direction:column;gap:8px"><li><strong>요약노트</strong> · 단원별 핵심과 시험 함정을 한 화면에.</li><li><strong>오답노트</strong> · 틀린 문제만 다시 풀어서 0개로 만들기.</li><li><strong>모의고사</strong> · 강의 범위를 골라 실전처럼 풀고 점수 확인.</li><li><strong>실습실</strong> · 코드를 직접 고쳐서 실행해 보기.</li><li>시간이 없다면 설정에서 <strong>자유 모드</strong>를 켜고 필요한 단원으로 바로 가세요.</li></ul>',
      },
    ];
    let k = 0;
    const close = modal('<div data-body class="stack" style="gap:18px"></div>', (m, closeFn, back) => {
      if (!again) back.dataset.sticky = '1';
      function draw() {
        const pg = pages[k];
        $('[data-body]', m).innerHTML =
          '<div class="row" style="gap:14px;align-items:center">' + mascot('avatar') + '<h2 style="flex:1;min-width:0">' + pg.t + '</h2></div>' +
          '<div class="lesson-body" style="max-width:none"><div>' + pg.b + '</div></div>' +
          '<div class="dots-nav">' + pages.map((_, i) => '<i class="' + (i === k ? 'on' : '') + '"></i>').join('') + '</div>' +
          '<div class="row between"><button class="btn ghost" data-p type="button"' + (k === 0 ? ' disabled' : '') + '>◀ 이전</button><button class="btn primary" data-n type="button">' + (k === pages.length - 1 ? (again ? '닫기' : '프롤로그 시작하기 ▶') : '다음 ▶') + '</button></div>';
        const nameInput = $('#ob-name', m);
        if (nameInput) { nameInput.value = S.name || ''; nameInput.addEventListener('input', () => { S.name = nameInput.value.trim(); }); setTimeout(() => nameInput.focus(), 30); }
        $('[data-p]', m).onclick = () => { if (k > 0) { k--; draw(); } };
        $('[data-n]', m).onclick = () => {
          if (k < pages.length - 1) { k++; draw(); return; }
          closeFn();
          if (!again) {
            S.name = S.name || '모험가';
            S.onboarded = true;
            save();
            go('stage', { id: ORDER[0].id, li: 0 });
          }
        };
      }
      draw();
      modalKey = (e) => {
        if (e.key === 'Enter' && !(document.activeElement && document.activeElement.tagName === 'BUTTON')) { e.preventDefault(); $('[data-n]', m).click(); }
      };
    });
    return close;
  }

  /* ───────────── 시작 ───────────── */
  try { history.replaceState({ pq: { name: 'home' } }, ''); } catch (e) { /* 무시 */ }
  render();
  if (!S.onboarded) onboarding(false);

  // 디버그·검증용
  window.__PQ = { ORDER, QINDEX, STAGE, state: () => S, session: () => SESSION };
})();
