// ── DATA ──────────────────────────────────────────────
const DATA = {
  boys: {
    basketball:   [{ n:'Liam T.',   pts:1240, dist:'0.3km', av:'#1d4ed8', ac:'#bfdbfe' },
                   { n:'Marcus W.', pts:980,  dist:'1.1km', av:'#065f46', ac:'#a7f3d0' },
                   { n:'Jake O.',   pts:760,  dist:'1.4km', av:'#7c3aed', ac:'#ddd6fe' }],
    tennis:       [{ n:'Connor B.', pts:1080, dist:'0.4km', av:'#9a3412', ac:'#fed7aa' },
                   { n:'Riley M.',  pts:870,  dist:'0.9km', av:'#1e40af', ac:'#bfdbfe' }],
    badminton:    [{ n:'Ethan H.',  pts:650,  dist:'0.5km', av:'#6d28d9', ac:'#ddd6fe' },
                   { n:'Noah P.',   pts:440,  dist:'1.2km', av:'#065f46', ac:'#a7f3d0' }],
    tabletennis:  [{ n:'Dylan K.',  pts:740,  dist:'0.3km', av:'#b45309', ac:'#fde68a' },
                   { n:'Mason R.',  pts:510,  dist:'0.8km', av:'#1d4ed8', ac:'#bfdbfe' }],
    pickleball:   [{ n:'Jack F.',   pts:920,  dist:'0.7km', av:'#9a3412', ac:'#fed7aa' },
                   { n:'Liam T.',   pts:680,  dist:'1.0km', av:'#065f46', ac:'#a7f3d0' }],
  },
  girls: {
    basketball:   [{ n:'Zoe C.',    pts:2810, dist:'0.6km', av:'#7c3aed', ac:'#ddd6fe', king:true },
                   { n:'Mia S.',    pts:740,  dist:'0.8km', av:'#be185d', ac:'#fbcfe8' }],
    tennis:       [{ n:'Olivia H.', pts:1200, dist:'0.4km', av:'#be185d', ac:'#fbcfe8' },
                   { n:'Ava W.',    pts:900,  dist:'0.9km', av:'#6d28d9', ac:'#ddd6fe' }],
    badminton:    [{ n:'Chloe B.',  pts:650,  dist:'0.5km', av:'#6d28d9', ac:'#ddd6fe' },
                   { n:'Ella M.',   pts:440,  dist:'1.2km', av:'#be185d', ac:'#fbcfe8' }],
    tabletennis:  [{ n:'Mia S.',    pts:740,  dist:'0.3km', av:'#be185d', ac:'#fbcfe8' },
                   { n:'Olivia H.', pts:510,  dist:'0.8km', av:'#7c3aed', ac:'#ddd6fe' }],
    pickleball:   [{ n:'Zoe C.',    pts:880,  dist:'0.5km', av:'#7c3aed', ac:'#ddd6fe' },
                   { n:'Chloe B.',  pts:620,  dist:'1.1km', av:'#6d28d9', ac:'#ddd6fe' }],
  }
};

const SPORT_EMOJI = { basketball:'🏀', tennis:'🎾', badminton:'🏸', tabletennis:'🏓', pickleball:'🥒' };
const SPORT_LABEL = { basketball:'Basketball', tennis:'Tennis', badminton:'Badminton', tabletennis:'Table Tennis', pickleball:'Pickleball' };

let activeSport  = 'basketball';
let activeGender = 'boys';

// ── PAGE SWITCHING ─────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const pageEl = document.getElementById('page-' + name);
  if (pageEl) pageEl.classList.add('active');
  const map = { home:0, rank:1, about:2, register:3, contact:4 };
  const links = document.querySelectorAll('.nav-link');
  if (links[map[name]]) links[map[name]].classList.add('active');
  window.scrollTo(0, 0);
}

// ── MOBILE MENU ────────────────────────────────────────
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── GENDER SWITCH ──────────────────────────────────────
function switchGender(el, gender) {
  document.querySelectorAll('.gender-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  activeGender = gender;
  renderPlayers();
  renderLeaderboard();
  document.getElementById('boardGym').textContent =
    (gender === 'boys' ? 'Boys' : 'Girls') + ' · Fitness First Sydney';
}

// ── SPORT FILTER ───────────────────────────────────────
function filterSport(el, sport) {
  document.querySelectorAll('.sport-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  activeSport = sport;
  renderPlayers();
  renderLeaderboard();
  document.getElementById('boardTitle').textContent = SPORT_EMOJI[sport] + ' ' + SPORT_LABEL[sport];
}

// ── RENDER PLAYERS ─────────────────────────────────────
function renderPlayers() {
  const list = document.getElementById('playerList');
  const players = DATA[activeGender][activeSport] || [];
  if (!players.length) {
    list.innerHTML = '<div class="p-empty">No challengers nearby for this sport yet.</div>';
    return;
  }
  list.innerHTML = players.map(p => `
    <div class="player-card">
      <div class="p-avatar" style="background:${p.av};color:${p.ac}">
        ${p.n.split(' ').map(x => x[0]).join('').slice(0, 2)}
      </div>
      <div>
        <div class="p-name">${p.n}${p.king ? ' 👑' : ''}</div>
        <div class="p-meta">${p.pts} pts · ${p.dist}</div>
      </div>
      <button class="p-challenge" onclick="alert('Sign up to challenge ${p.n.replace(' 👑','')}!')">Challenge ⚡</button>
    </div>
  `).join('');
}

// ── RENDER LEADERBOARD ─────────────────────────────────
function renderLeaderboard() {
  const rows = document.getElementById('leaderboardRows');
  const players = [...(DATA[activeGender][activeSport] || [])].sort((a, b) => b.pts - a.pts);
  if (!players.length) {
    rows.innerHTML = '<div style="padding:14px;color:var(--muted);font-size:13px;">No rankings yet.</div>';
    return;
  }
  rows.innerHTML = players.map((p, i) => `
    <div class="lb-row">
      <div class="lb-num ${i === 0 ? 'top' : ''}">${i === 0 ? '👑' : '#' + (i + 1)}</div>
      <div class="lb-name">${p.n}</div>
      ${i === 0 ? '<div class="king-tag">KING</div>' : ''}
      <div class="lb-pts">${p.pts.toLocaleString()}</div>
    </div>
  `).join('');
}

// ── NOTIFY FORM ────────────────────────────────────────
function submitNotify() {
  const e = document.getElementById('notifyEmail').value.trim();
  if (!e || !e.includes('@')) { alert('Please enter a valid email.'); return; }
  document.getElementById('notifySuccess').style.display = 'block';
  document.querySelector('.notify-row').style.opacity = '0.4';
  document.querySelector('.notify-row').style.pointerEvents = 'none';
}

// ── REGISTER FORM ──────────────────────────────────────
let selectedGenderOpt = 'male';

function selectGender(g) {
  selectedGenderOpt = g;
  document.querySelectorAll('.gender-opt').forEach(o => o.classList.remove('selected'));
  document.getElementById('gopt-' + g).classList.add('selected');
}

function toggleSport(el) {
  el.classList.toggle('checked');
}

function submitReg() {
  const first = document.getElementById('regFirst').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  if (!first || !email || !email.includes('@')) {
    alert('Please fill in at least your name and email.');
    return;
  }
  document.getElementById('regForm').style.display = 'none';
  document.getElementById('regSuccess').style.display = 'block';
}

// ── CONTACT FORM ───────────────────────────────────────
function submitContact() {
  const name  = document.getElementById('ctName').value.trim();
  const email = document.getElementById('ctEmail').value.trim();
  const msg   = document.getElementById('ctMessage').value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in all fields.');
    return;
  }
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('contactSuccess').style.display = 'block';
}

// ── INIT ───────────────────────────────────────────────
renderPlayers();
renderLeaderboard();
