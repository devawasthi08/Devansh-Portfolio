/**
 * Devansh Awasthi - Interactive Portfolio Engine
 * Plain JavaScript (ES6+), Zero External Dependencies
 */

(function () {
  'use strict';

  // --- Helper Functions ---
  const $ = (selector) => document.querySelector(selector);
  const cl = (val, min, max) => Math.max(min, Math.min(max, val));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================================
  // 1. Preloader Screen & Mesh Generation
  // ============================================================================
  const pn = $('#pn');
  const pls = $('#pls');
  let v = 0;
  const PP = [];
  let hh = '';

  for (let gx0 = -4; gx0 <= 4; gx0++) {
    for (let gy0 = -6; gy0 <= 6; gy0++) {
      const x0 = 50 + gx0 * 4.6 + (Math.random() - 0.5) * 2.4;
      const y0 = 50 + gy0 * 5.4 + (Math.random() - 0.5) * 2.8;
      if (Math.pow((x0 - 50) / 21, 2) + Math.pow((y0 - 50) / 33, 2) < 1) {
        PP.push([x0, y0]);
      }
    }
  }

  PP.forEach(([x, y]) => {
    hh += `<circle cx="${x}" cy="${y}" r=".5" fill="#ffe066" style="opacity:0"/>`;
  });

  PP.forEach((a, i) => {
    PP.forEach((b, j) => {
      if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 7.4) {
        hh += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#ffe066" stroke-opacity=".5" stroke-width=".18" style="opacity:0"/>`;
      }
    });
  });

  pls.innerHTML = hh;
  const pe = pls.children;

  (function tk() {
    v += reduce ? 100 : Math.random() * 5 + 2;
    const nn = Math.floor((Math.min(v, 100) / 100) * pe.length);
    for (let q = 0; q < nn; q++) {
      pe[q].style.opacity = 1;
    }
    if (v >= 100) {
      pn.textContent = 100;
      $('#pl').classList.add('out');
      document.body.classList.add('go');
      return;
    }
    pn.textContent = Math.floor(v);
    setTimeout(tk, 55);
  })();

  // ============================================================================
  // 2. Custom Cursor, Ripples & Magnetic Buttons
  // ============================================================================
  let mxp = 0;
  let myp = 0;
  let hasPtr = false;
  let heroP = 0;
  let lensR = 0;
  const spot = $('#spot');

  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const dot = $('#cd');
    const ring = $('#cr');
    const rl2 = ring.firstElementChild;
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;

    if (!reduce) document.body.classList.add('cur');

    addEventListener('pointermove', (e) => {
      x = e.clientX;
      y = e.clientY;
      hasPtr = true;
      mxp = x / innerWidth - 0.5;
      myp = y / innerHeight - 0.5;
      dot.style.transform = `translate(${x}px,${y}px)`;
      spot.style.setProperty('--sx', `${x}px`);
      spot.style.setProperty('--sy', `${y}px`);
    });

    (function renderCursor() {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(renderCursor);
    })();

    document.addEventListener('pointerover', (e) => {
      const targetCur = e.target.closest && e.target.closest('[data-cur]');
      if (targetCur) {
        ring.className = 'lab';
        rl2.textContent = targetCur.dataset.cur;
      } else {
        ring.className = e.target.closest && e.target.closest('a,label,button,li') ? 'big' : '';
        rl2.textContent = '';
      }
    });

    addEventListener('pointerdown', (e) => {
      if (reduce) return;
      const ripple = document.createElement('i');
      ripple.className = 'rp';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });

    document.querySelectorAll('.mag').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.28}px, ${(e.clientY - rect.top - rect.height / 2) * 0.4}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  } else {
    $('#scr').textContent = 'Scroll ↓';
  }

  // ============================================================================
  // 3. Hero Visuals: Photo Split & AI Mesh
  // ============================================================================
  const PHOTO_PATH = 'assets/img/photo.jpg';
  $('#i1').src = PHOTO_PATH;
  $('#i2').src = PHOTO_PATH;
  $('#i3').src = PHOTO_PATH;

  const SH = {
    za: 'assets/img/zyng-analytics.jpg',
    ze: 'assets/img/zyng-entry-tickets.jpg',
    zl: 'assets/img/zyng-login.jpg',
    dc: 'assets/img/direct-credit-login.jpg',
    d1: 'assets/img/drone-coe-hero.jpg',
    d2: 'assets/img/drone-coe-partners.jpg'
  };

  document.querySelectorAll('[data-s]').forEach((img) => {
    img.src = SH[img.dataset.s];
  });

  const P = [];
  const LNs = [];
  const CIs = [];
  const mesh = $('#mesh');
  const NS = 'http://www.w3.org/2000/svg';

  for (let gx = -4; gx <= 4; gx++) {
    for (let gy = -5; gy <= 5; gy++) {
      const px0 = 51 + gx * 3.6 + (Math.random() - 0.5) * 2;
      const py0 = 30 + gy * 4.8 + (Math.random() - 0.5) * 2.4;
      if (Math.pow((px0 - 51) / 15, 2) + Math.pow((py0 - 30) / 24, 2) < 1) {
        P.push([px0, py0, 0, 0]);
      }
    }
  }

  function mk(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    for (const key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    mesh.appendChild(el);
    return el;
  }

  P.forEach((a, i) => {
    P.forEach((b, j) => {
      if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 6.6) {
        LNs.push({
          a: i,
          b: j,
          el: mk('line', { stroke: '#fff', 'stroke-opacity': 0.5, 'stroke-width': 0.12 })
        });
      }
    });
  });

  P.forEach((a, i) => {
    const c = mk('circle', { r: 0.38, fill: '#ffe066' });
    c.style.animationDelay = `-${(Math.random() * 2.4).toFixed(2)}s`;
    CIs.push(c);
  });

  const eye = mk('circle', { cx: 58, cy: 28.3, r: 1.7, fill: 'none', stroke: '#ffe066', 'stroke-width': 0.3 });
  const eye2 = mk('circle', { cx: 58, cy: 28.3, r: 0.6, fill: '#fff' });
  let cp = [58, 30];

  function relayoutMesh() {
    P.forEach((a, i) => {
      const dx = cp[0] - a[0];
      const dy = cp[1] - a[1];
      const d = Math.hypot(dx, dy);
      const f = Math.exp((-d * d) / 90) * 0.2;
      a[2] = a[0] + dx * f;
      a[3] = a[1] + dy * f;
      CIs[i].setAttribute('cx', a[2]);
      CIs[i].setAttribute('cy', a[3]);
    });

    LNs.forEach((l) => {
      const a = P[l.a];
      const b = P[l.b];
      l.el.setAttribute('x1', a[2]);
      l.el.setAttribute('y1', a[3]);
      l.el.setAttribute('x2', b[2]);
      l.el.setAttribute('y2', b[3]);
    });

    eye2.setAttribute('cx', 58 + Math.max(-1, Math.min(1, (cp[0] - 58) / 18)));
    eye2.setAttribute('cy', 28.3 + Math.max(-1, Math.min(1, (cp[1] - 28.3) / 18)));
  }

  relayoutMesh();

  let raf2 = 0;
  addEventListener('pointermove', (e) => {
    if (raf2) return;
    raf2 = requestAnimationFrame(() => {
      raf2 = 0;
      const rect = $('#pic').getBoundingClientRect();
      cp = [((e.clientX - rect.left) / rect.width) * 100, ((e.clientY - rect.top) / rect.height) * 100];
      relayoutMesh();
    });
  });

  addEventListener('pointermove', (e) => {
    const style = $('#pic').style;
    style.setProperty('--mx', (e.clientX / innerWidth - 0.5).toFixed(3));
    style.setProperty('--my', (e.clientY / innerHeight - 0.5).toFixed(3));
  });

  // Intro Words Splitting
  const big = $('#big');
  const words = big.textContent.split(' ');
  big.innerHTML = words.map((w) => `<span>${w}</span>`).join(' ');
  const ws = big.querySelectorAll('span');

  // ============================================================================
  // 4. World Geometry & Skyline Generation
  // ============================================================================
  const W = 8200;
  const Y = (x) => 520 + Math.sin(x / 420) * 35;
  let roadPath = `M-900,${Y(-900)}`;

  for (let x2 = -860; x2 <= W; x2 += 40) {
    roadPath += ` L${x2},${Y(x2)}`;
  }

  document.querySelectorAll('.rd').forEach((p) => {
    p.setAttribute('d', roadPath);
  });

  function generateCity(selector, hmin, hmax, fill, glow) {
    let s = '';
    let x = 0;
    while (x < 6000) {
      const bw = 40 + Math.random() * 90;
      const bh = hmin + Math.random() * (hmax - hmin);
      s += `<rect x="${x}" y="${300 - bh}" width="${bw}" height="${bh}" fill="${fill}"/>`;
      if (glow && Math.random() < 0.6) {
        s += `<rect class="wn" x="${x + 10}" y="${300 - bh + 14}" width="6" height="8" fill="#ffe066" opacity=".85"/>`;
      }
      x += bw + Math.random() * 16;
    }
    $(selector + ' svg').innerHTML = s;
  }

  generateCity('#far', 60, 170, '#3a2fb0', 0);
  generateCity('#near', 30, 110, '#0d0b1f', 1);

  // Generate Ambient Stars
  let starsHtml = '';
  for (let k = 0; k < 80; k++) {
    const z = Math.random() * 2 + 1;
    starsHtml += `<i style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${z}px;height:${z}px;animation-delay:-${(Math.random() * 3).toFixed(2)}s"></i>`;
  }
  $('#stars').innerHTML = starsHtml;

  // Stops and Landmark Signs
  const stops = [1100, 2000, 2900, 3800, 4700, 5600, 6500];
  const nm = ['NovoStack', 'Zyng Parks', 'Direct Credit', 'IIT Kanpur Drone', 'Skills', 'How I ship', 'Education'];
  let signsHtml = '';

  [[250, 'Noida'], [7300, 'Your team']]
    .concat(stops.map((x, i) => [x, nm[i]]))
    .forEach((s) => {
      const width = Math.max(110, s[1].length * 14);
      signsHtml += `<g transform="translate(${s[0]},${Y(s[0]) - 35})">
        <rect x="-3" y="-120" width="6" height="120" fill="#f5f2ff"/>
        <rect x="${-width / 2}" y="-172" width="${width}" height="52" rx="26" fill="#f5f2ff"/>
        <text x="0" y="-138" fill="#0d0b1f" font-family="Bricolage Grotesque,sans-serif" font-weight="800" font-size="21" text-anchor="middle">${s[1]}</text>
      </g>`;
    });

  $('#signs').innerHTML = signsHtml;

  // DOM Elements Cache
  const cards = document.querySelectorAll('.card');
  const sc = $('#sc');
  const wls = document.querySelectorAll('.sp');
  const world = $('#world');
  const far = $('#far');
  const near = $('#near');
  const orb = $('#orb');
  const moon = $('#moon');
  const stars = $('#stars');
  const stage = $('#stage');
  const ride = $('#ride');
  const bar = $('#bar');
  const tip = $('#tip');
  const intro = $('#intro');
  const stats = $('#stats');
  const fin = $('#fin');
  const lbt = $('#lbt');
  const lbb = $('#lbb');

  const hero = $('#top');
  const pic = $('#pic');
  const ai = $('#ai');
  const sw = $('#sw');
  const blu = $('#blu');
  const caps = document.querySelectorAll('.cap');
  const scr = $('#scr');
  const h1 = $('h1');
  const rl = $('.role');
  const pl2 = $('.pill');

  // Navigation Links
  document.querySelectorAll('nav a[data-p]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      scrollTo({
        top: ride.offsetTop + parseFloat(a.dataset.p) * (ride.offsetHeight - innerHeight),
        behavior: 'smooth'
      });
    });
  });

  // ============================================================================
  // 5. Scroll Update Engine
  // ============================================================================
  function upd() {
    // Hero photo -> AI half split
    const hp = cl((cur - hero.offsetTop) / (hero.offsetHeight - innerHeight), 0, 1);
    const a0 = cl((hp - 0.12) / 0.55, 0, 1);
    const e = a0 * a0 * (3 - 2 * a0);
    const m = cl((hp - 0.8) / 0.2, 0, 1);
    const H = innerHeight;
    const vw = innerWidth;
    const pct = cl(((vw * (1 - 0.5 * e) - (vw - H) / 2) / H) * 100, 0, 100);

    heroE = e;
    heroP = hp;
    ai.style.clipPath = `inset(0 0 0 ${pct}%)`;
    sw.style.left = `${pct}%`;
    sw.style.opacity = e > 0 && m < 0.5 ? 1 : 0;
    blu.style.clipPath = `inset(0 0 0 ${(100 - 50 * e) * (1 - m)}%)`;

    pic.style.setProperty('--z', (1 + 0.06 * hp + 0.5 * m * m).toFixed(3));
    pic.style.opacity = 1 - m;

    const fo = cl(1 - m * 1.6, 0, 1);
    h1.style.opacity = fo;
    rl.style.opacity = fo;
    pl2.style.opacity = fo;

    caps.forEach((c) => {
      c.style.setProperty('--c', cl((hp - 0.55) / 0.2, 0, 1) * fo);
    });
    scr.style.opacity = cl(1 - hp * 8, 0, 1);

    // Scooter ride progress
    const p = cl((cur - ride.offsetTop) / (ride.offsetHeight - innerHeight), 0, 1);
    const rp = cl((p - 0.27) / 0.65, 0, 1);
    const s = Math.min(cl(vw / 1100, 0.6, 1), H / 700);

    let ent = cl(p / 0.1, 0, 1);
    ent = 1 - (1 - ent) * (1 - ent);
    const cam = 250 + rp * 7050;
    const sx = rp > 0 ? cam : -450 + 700 * ent;

    sc.setAttribute(
      'transform',
      `translate(${sx},${Y(sx) - 32 + Math.sin(sx / 18) * 2 - hop}) rotate(${(Math.atan((Math.cos(sx / 420) * 35) / 420) * 57.3)})`
    );

    wls.forEach((w) => {
      w.setAttribute('transform', `rotate(${sx * 2.4})`);
    });

    world.style.transform = `translate(${vw * 0.38 - cam * s}px,-50%) scale(${s})`;
    far.style.transform = `translate(${-cam * 0.2 - mxp * 10}px,${myp * 6}px)`;
    near.style.transform = `translate(${-cam * 0.45 - mxp * 24}px,${myp * 12}px)`;

    stage.style.setProperty('--p', cl((p - 0.2) / 0.72, 0, 1));
    orb.style.transform = `translateY(${H * (0.74 - rp * 0.64)}px)`;

    const nt = cl(1 - rp * 1.8, 0, 1);
    moon.style.opacity = nt;
    stars.style.opacity = nt;

    // Card Triggering
    cards.forEach((c, i) => {
      const on = Math.abs(cam - stops[i]) < 430 && rp > 0;
      if (on && !c.classList.contains('on')) {
        scramble(c.querySelector('h3'));
      }
      c.classList.toggle('on', on);
    });

    // Intro Words & Stats
    const io = 1 - cl((p - 0.21) / 0.05, 0, 1);
    const q = cl((p - 0.01) / 0.13, 0, 1);
    const n = ws.length;

    intro.style.opacity = io;
    intro.style.transform = `translateY(${-(1 - io) * 40}px)`;
    stats.style.opacity = cl((p - 0.09) / 0.05, 0, 1);

    ws.forEach((w, i) => {
      w.style.opacity = 0.14 + 0.86 * cl(q * (n + 4) - i, 0, 1);
    });

    // Letterbox & Finale
    const lb = cl(p / 0.04, 0, 1) * (1 - cl((p - 0.93) / 0.04, 0, 1));
    lbt.style.transform = `translateY(${(lb - 1) * 100}%)`;
    lbb.style.transform = `translateY(${(1 - lb) * 100}%)`;

    const fi = cl((p - 0.93) / 0.04, 0, 1);
    fin.style.opacity = fi;
    fin.style.pointerEvents = fi > 0.5 ? 'auto' : 'none';

    tip.style.opacity = p > 0.02 && p < 0.9 ? 0.85 : 0;
    tip.textContent = p < 0.25 ? 'Scroll to start the ride' : 'Keep scrolling to keep riding';

    bar.style.width = `${(cur / (document.body.scrollHeight - innerHeight)) * 100}%`;
    extra(p, rp, cam, sx, nt);
  }

  // State Variables
  let cur = scrollY;
  let tg = scrollY;
  let prev = scrollY;
  let vel = 0;
  let hop = 0;
  let hopT = -1;
  let heroE = 0;
  let lastCode = -1;
  let fs = 0;

  const root = document.documentElement;
  const CODE = "const devansh = {\n  role: 'AI-native engineer',\n  stack: ['React', 'Node', 'Postgres'],\n  ships: 'scoped, reviewed, fast'\n};";
  const MAIL = 'devanshawasthi0502314@gmail.com';

  function toast(message) {
    const t = $('#toast');
    t.textContent = message;
    t.classList.add('on');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove('on'), 2600);
  }

  // ============================================================================
  // 6. Day / Night Theme Management
  // ============================================================================
  function setTheme(theme) {
    root.dataset.theme = theme;
    $('#thm').textContent = theme === 'day' ? '☀' : '☾';
    try {
      localStorage.setItem('da-theme', theme);
    } catch (e) {}
  }

  try {
    const savedTheme = localStorage.getItem('da-theme');
    if (savedTheme) setTheme(savedTheme);
  } catch (e) {}

  $('#thm').onclick = () => {
    setTheme(root.dataset.theme === 'day' ? 'night' : 'day');
  };

  // ============================================================================
  // 7. Text Scramble Animation
  // ============================================================================
  const SCH = '01<>/{}#$%&*';

  function scramble(element) {
    if (!element || reduce) return;
    const originalText = element.dataset.t || (element.dataset.t = element.textContent);
    const startTime = performance.now();

    (function loop() {
      const progress = Math.min(1, (performance.now() - startTime) / 650);
      let output = '';
      for (let i = 0; i < originalText.length; i++) {
        output += originalText[i] === ' ' || i < originalText.length * progress
          ? originalText[i]
          : SCH[Math.floor(Math.random() * SCH.length)];
      }
      element.textContent = output;
      if (progress < 1) requestAnimationFrame(loop);
    })();
  }

  // ============================================================================
  // 8. Navigation & Chapters
  // ============================================================================
  function pFor(x) {
    return 0.27 + (0.65 * (x - 250)) / 7050;
  }

  function go(progress) {
    scrollTo({
      top: progress < 0 ? 0 : ride.offsetTop + progress * (ride.offsetHeight - innerHeight),
      behavior: 'smooth'
    });
  }

  const CH = [['Photo', -1], ['Intro', 0.02]]
    .concat(stops.map((x, i) => [nm[i], pFor(x)]))
    .concat([['Contact', 1]]);

  const chEl = $('#ch');
  CH.forEach((c) => {
    const btn = document.createElement('button');
    btn.innerHTML = `<span>${c[0]}</span>`;
    btn.setAttribute('aria-label', `Go to ${c[0]}`);
    btn.onclick = () => go(c[1]);
    chEl.appendChild(btn);
  });

  const chButtons = chEl.children;

  function updateActiveChapter(p, inRide) {
    let activeIndex = 0;
    if (inRide) {
      activeIndex = 1;
      CH.forEach((c, i) => {
        if (i > 1 && p >= c[1] - 0.03) activeIndex = i;
      });
    }
    for (let i = 0; i < chButtons.length; i++) {
      chButtons[i].classList.toggle('a', i === activeIndex);
    }
  }

  // ============================================================================
  // 9. World Extras: Street Lamps & Landmark Buildings
  // ============================================================================
  let lg = '';
  let bg = '';
  const lamps = [];
  const blds = [];

  for (let lx = 650; lx < 8000; lx += 900) {
    const ly = Y(lx) - 35;
    lg += `<g data-x="${lx}">
      <rect x="${lx - 2}" y="${ly - 130}" width="4" height="130" fill="#f5f2ff" opacity=".7"/>
      <circle cx="${lx}" cy="${ly - 134}" r="6" fill="#fff6c8"/>
      <circle class="lgl" cx="${lx}" cy="${ly - 134}" r="95" fill="url(#lg)" style="opacity:0"/>
    </g>`;
  }

  $('#lamps').innerHTML = lg;
  [].forEach.call($('#lamps').children, (g) => {
    lamps.push({ x: +g.dataset.x, g: g.querySelector('.lgl') });
  });

  stops.forEach((x) => {
    const y = Y(x) - 35;
    let windows = '';
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 4; c++) {
        windows += `<rect class="w" x="${16 + c * 32}" y="${-212 + r * 30}" width="18" height="18" rx="2" style="transition-delay:${(Math.random() * 0.7).toFixed(2)}s"/>`;
      }
    }
    bg += `<g class="bd" data-x="${x}" transform="translate(${x + 140},${y})">
      <rect x="0" y="-232" width="146" height="232" rx="6" fill="#14114a" stroke="rgba(255,255,255,.25)"/>
      <rect x="70" y="-262" width="6" height="30" fill="#14114a"/>
      ${windows}
    </g>`;
  });

  $('#blds').innerHTML = bg;
  [].forEach.call($('#blds').children, (g) => {
    blds.push({ x: +g.dataset.x, el: g });
  });

  const sky2 = $('#sky2');
  const cl2 = sky2.querySelectorAll('.cd');
  const bd2 = sky2.querySelectorAll('.bi');
  const spd = $('#spd');
  const hlE = $('#hl');
  const armE = $('#arm');
  const wvE = $('#wv');
  const codeEl = $('#code');

  let speedLinesHtml = '';
  for (let q2 = 0; q2 < 14; q2++) {
    speedLinesHtml += `<b style="top:${18 + Math.random() * 60}%;width:${8 + Math.random() * 16}vw;animation-delay:-${(Math.random() * 0.4).toFixed(2)}s;animation-duration:${(0.28 + Math.random() * 0.2).toFixed(2)}s"></b>`;
  }
  spd.innerHTML = speedLinesHtml;

  function extra(p, rp, cam, sx, nt) {
    const day = root.dataset.theme === 'day';
    const n = day ? 0 : nt;
    const t = performance.now();

    hlE.style.opacity = n;

    for (let i = 0; i < lamps.length; i++) {
      lamps[i].g.style.opacity = n * cl((sx - (lamps[i].x - 520)) / 320, 0, 1);
    }

    for (let i = 0; i < blds.length; i++) {
      blds[i].el.classList.toggle('lit', Math.abs(cam - blds[i].x) < 460);
    }

    const onCard = document.querySelector('.card.on');
    armE.style.display = onCard ? 'none' : '';
    wvE.style.display = onCard ? '' : 'none';
    if (onCard) {
      wvE.setAttribute('transform', `rotate(${Math.sin(t / 110) * 22} 6 -66)`);
    }

    sky2.style.opacity = day ? 0.9 : cl((rp - 0.4) / 0.3, 0, 1);

    cl2.forEach((cloud, i) => {
      cloud.setAttribute('transform', `translate(${((t * 0.012 * (1 + i * 0.3) + i * 420) % 1900) - 250},${i * 55})`);
    });

    bd2.forEach((bird, i) => {
      bird.setAttribute(
        'transform',
        `translate(${((t * 0.06 + i * 330) % 1900) - 100},${70 + i * 38 + Math.sin(t / 260 + i) * 8}) scale(1,${0.6 + Math.abs(Math.sin(t / 120 + i)) * 0.5})`
      );
    });

    spd.style.opacity = reduce ? 0 : cl((Math.abs(vel) - 6) / 25, 0, 0.85);
    updateActiveChapter(p, cur >= ride.offsetTop - 10);

    const k = Math.min(CODE.length, Math.floor(heroE * 1.15 * CODE.length));
    if (k !== lastCode) {
      lastCode = k;
      codeEl.textContent = CODE.slice(0, k) + (k < CODE.length ? '▌' : '');
    }

    if (+fin.style.opacity > 0.5) {
      if (!fs) {
        fs = 1;
        scramble(fin.querySelector('h2'));
      }
    } else {
      fs = 0;
    }
  }

  // ============================================================================
  // 10. Web Audio Synthesizer (Horn & Motor Engine)
  // ============================================================================
  let ac;
  let og;
  let o1;
  let o2;
  let soundOn = false;

  function initAudio() {
    if (ac) return;
    ac = new (window.AudioContext || window.webkitAudioContext)();
    const filter = ac.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 260;

    og = ac.createGain();
    og.gain.value = 0;

    o1 = ac.createOscillator();
    o1.type = 'sawtooth';

    o2 = ac.createOscillator();
    o2.type = 'square';

    o1.connect(filter);
    o2.connect(filter);
    filter.connect(og);
    og.connect(ac.destination);

    o1.start();
    o2.start();
  }

  $('#snd').onclick = function () {
    soundOn = !soundOn;
    if (soundOn) {
      initAudio();
      ac.resume();
    }
    this.textContent = soundOn ? 'Sound on' : 'Sound off';
    this.setAttribute('aria-pressed', soundOn);
  };

  function honk() {
    const t = ac.currentTime;
    [420, 520].forEach((fr) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'square';
      osc.frequency.value = fr;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  }

  sc.addEventListener('click', () => {
    hopT = performance.now();
    if (soundOn) honk();
    else toast('Turn sound on to hear the horn');
  });

  function audioTick(rp) {
    if (!ac) return;
    const v2 = Math.min(Math.abs(vel), 40);
    const T = ac.currentTime;
    og.gain.setTargetAtTime(soundOn ? 0.02 + v2 * 0.0012 : 0, T, 0.15);
    o1.frequency.setTargetAtTime(44 + v2 * 1.8, T, 0.1);
    o2.frequency.setTargetAtTime(88 + v2 * 3, T, 0.1);
  }

  // ============================================================================
  // 11. Actions: Email Copy & Résumé Download
  // ============================================================================
  function copyMail() {
    try {
      navigator.clipboard.writeText(MAIL).then(
        () => toast('Email copied'),
        () => toast(MAIL)
      );
    } catch (e) {
      toast(MAIL);
    }
  }

  function dlRes() {
    const a = document.createElement('a');
    a.href = 'assets/Devansh_Awasthi_Resume.pdf';
    a.download = 'Devansh_Awasthi_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  $('#rsm').onclick = (e) => {
    e.preventDefault();
    dlRes();
  };

  // ============================================================================
  // 12. Command Palette (Ctrl+K)
  // ============================================================================
  const cpb = $('#cp');
  const cpi = $('#cpi');
  const cpl = $('#cpl');
  let sel = 0;
  let list = [];

  const ACT = [
    ['Go to photo', () => go(-1)],
    ['Go to intro', () => go(0.02)]
  ]
    .concat(stops.map((x, i) => [`Go to ${nm[i]}`, () => go(pFor(x))]))
    .concat([
      ['Go to contact', () => go(1)],
      ['Copy email', copyMail],
      ['Download résumé', dlRes],
      ['Open LinkedIn', () => window.open('https://linkedin.com/in/devansh-a-94179022a', '_blank', 'noopener')],
      ['Open GitHub', () => window.open('https://github.com/devawasthi08', '_blank', 'noopener')],
      ['Toggle day or night', () => $('#thm').click()],
      ['Toggle sound', () => $('#snd').click()]
    ]);

  function renderPalette() {
    const query = cpi.value.toLowerCase();
    list = ACT.filter((a) => a[0].toLowerCase().indexOf(query) > -1);
    sel = Math.min(sel, Math.max(0, list.length - 1));
    cpl.innerHTML = list
      .map((a, i) => `<li${i === sel ? ' class="s"' : ''} data-i="${i}">${a[0]}</li>`)
      .join('');
  }

  function openCp() {
    cpb.hidden = false;
    cpi.value = '';
    sel = 0;
    renderPalette();
    cpi.focus();
  }

  function closeCp() {
    cpb.hidden = true;
  }

  const lbx = $('#lbx');

  addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cpb.hidden ? openCp() : closeCp();
      return;
    }
    if (e.key === 'Escape') {
      closeCp();
      lbx.hidden = true;
    }
    if (!cpb.hidden) {
      if (e.key === 'ArrowDown') {
        sel = Math.min(sel + 1, list.length - 1);
        renderPalette();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        sel = Math.max(sel - 1, 0);
        renderPalette();
        e.preventDefault();
      } else if (e.key === 'Enter' && list[sel]) {
        const fn = list[sel][1];
        closeCp();
        fn();
      }
    }
  });

  cpi.oninput = () => {
    sel = 0;
    renderPalette();
  };

  cpl.onclick = (e) => {
    const li = e.target.closest('li');
    if (li) {
      const fn = list[+li.dataset.i][1];
      closeCp();
      fn();
    }
  };

  cpb.onclick = (e) => {
    if (e.target === cpb) closeCp();
  };

  $('#kb').onclick = openCp;

  // ============================================================================
  // 13. Screenshot Lightbox Gallery
  // ============================================================================
  const lbi = $('#lbi');
  const lbc = $('#lbc');
  let lbs = [];
  let lbk = 0;

  function showLb() {
    lbi.src = lbs[lbk].src;
    lbi.alt = lbs[lbk].alt;
    lbc.textContent = `${lbs[lbk].alt} (${lbk + 1}/${lbs.length})`;
  }

  document.querySelectorAll('.sf').forEach((sf) => {
    sf.style.cursor = 'zoom-in';
    sf.addEventListener('click', () => {
      lbs = [].slice.call(sf.querySelectorAll('img'));
      let highestOpacity = -1;
      lbs.forEach((im, i) => {
        const opacity = +getComputedStyle(im).opacity;
        if (opacity > highestOpacity) {
          highestOpacity = opacity;
          lbk = i;
        }
      });
      showLb();
      lbx.hidden = false;
    });
  });

  $('#lbn').onclick = (e) => {
    e.stopPropagation();
    lbk = (lbk + 1) % lbs.length;
    showLb();
  };

  $('#lbp').onclick = (e) => {
    e.stopPropagation();
    lbk = (lbk - 1 + lbs.length) % lbs.length;
    showLb();
  };

  lbx.onclick = (e) => {
    if (e.target === lbx || e.target === lbi) lbx.hidden = true;
  };

  // ============================================================================
  // 14. 3D Tilt, Glare, Magnifier Loupe & Card Fitting
  // ============================================================================
  document.querySelectorAll('.shot').forEach((shotFrame) => {
    const sf = shotFrame.querySelector('.sf');
    sf.dataset.cur = 'Zoom';

    shotFrame.addEventListener('pointermove', (e) => {
      const rect = shotFrame.getBoundingClientRect();
      shotFrame.style.setProperty('--tx', ((e.clientX - rect.left) / rect.width - 0.5).toFixed(3));
      shotFrame.style.setProperty('--ty', ((e.clientY - rect.top) / rect.height - 0.5).toFixed(3));

      const fr = sf.getBoundingClientRect();
      const fx = ((e.clientX - fr.left) / fr.width) * 100;
      const fy = ((e.clientY - fr.top) / fr.height) * 100;

      sf.style.setProperty('--ox', `${fx}%`);
      sf.style.setProperty('--oy', `${fy}%`);
      sf.style.setProperty('--gx', `${fx}%`);
      sf.style.setProperty('--gy', `${fy}%`);
      sf.classList.toggle('z', fx >= 0 && fx <= 100 && fy >= 0 && fy <= 100);
    });

    shotFrame.addEventListener('pointerleave', () => {
      shotFrame.style.setProperty('--tx', 0);
      shotFrame.style.setProperty('--ty', 0);
      sf.classList.remove('z');
    });
  });

  sc.dataset.cur = 'Honk';
  document.querySelectorAll('a.lk').forEach((a) => {
    a.dataset.cur = 'Visit';
  });

  function fitCards() {
    document.querySelectorAll('.card').forEach((c) => {
      c.style.setProperty('--fit', 1);
      c.style.setProperty('--fit', Math.min(1, (innerHeight * 0.56) / c.offsetHeight).toFixed(3));
    });
  }

  fitCards();
  addEventListener('resize', fitCards);
  addEventListener('load', fitCards);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitCards);
  }

  // Hero AI Cursor Tracking Lens
  const lens = $('#lens');
  const lr = $('#lr');

  function lensTick() {
    const want = !reduce && hasPtr && heroP < 0.09 && cur < innerHeight * 0.4 ? 11 : 0;
    lensR += (want - lensR) * 0.14;
    const r = lensR < 0.15 ? 0 : lensR;
    lens.style.clipPath = `circle(${r}% at ${cp[0]}% ${cp[1]}%)`;
    lr.style.cssText = `left:${cp[0]}%;top:${cp[1]}%;width:${r * 2}%;opacity:${r > 0 ? 1 : 0}`;
  }

  // ============================================================================
  // 15. Smooth Inertial Scroll Loop
  // ============================================================================
  addEventListener('scroll', () => { tg = scrollY; }, { passive: true });
  addEventListener('resize', () => { tg = scrollY; });

  function frame(now) {
    cur += (tg - cur) * (reduce ? 1 : 0.11);
    if (Math.abs(tg - cur) < 0.3) cur = tg;
    vel = cur - prev;
    prev = cur;

    if (hopT >= 0) {
      const k = (now - hopT) / 650;
      if (k >= 1) {
        hopT = -1;
        hop = 0;
      } else {
        hop = Math.sin(k * Math.PI) * 80;
      }
    }

    lensTick();
    upd();
    audioTick();
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
