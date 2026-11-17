"use client";

import React, { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Shorthand helpers
    const $ = (selector: string): any => document.querySelector(selector);
    const cl = (val: number, min: number, max: number): number => Math.max(min, Math.min(max, val));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- 1. Preloader Screen & Mesh Generation ---
    const pn = $("#pn");
    const pls = $("#pls");
    let v = 0;
    const PP: [number, number][] = [];
    let hh = "";

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

    if (pls) {
      pls.innerHTML = hh;
      const pe = pls.children;

      const tk = () => {
        v += reduce ? 100 : Math.random() * 5 + 2;
        const nn = Math.floor((Math.min(v, 100) / 100) * pe.length);
        for (let q = 0; q < nn; q++) {
          (pe[q] as HTMLElement).style.opacity = "1";
        }
        if (v >= 100) {
          if (pn) pn.textContent = "100";
          $("#pl")?.classList.add("out");
          document.body.classList.add("go");
          return;
        }
        if (pn) pn.textContent = Math.floor(v).toString();
        setTimeout(tk, 55);
      };
      tk();
    }

    // --- 2. Custom Cursor, Ripples & Magnets ---
    let mxp = 0;
    let myp = 0;
    let hasPtr = false;
    let heroP = 0;
    let lensR = 0;
    const spot = $("#spot");

    let onPointerMove: any, onPointerDown: any, onPointerOver: any;

    if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
      const dot = $("#cd");
      const ring = $("#cr");
      const rl2 = ring?.firstElementChild as HTMLElement;
      let x = 0, y = 0, rx = 0, ry = 0;

      if (!reduce) document.body.classList.add("cur");

      onPointerMove = (e: PointerEvent) => {
        x = e.clientX;
        y = e.clientY;
        hasPtr = true;
        mxp = x / window.innerWidth - 0.5;
        myp = y / window.innerHeight - 0.5;
        if (dot) dot.style.transform = `translate(${x}px,${y}px)`;
        if (spot) {
          spot.style.setProperty("--sx", `${x}px`);
          spot.style.setProperty("--sy", `${y}px`);
        }
      };
      window.addEventListener("pointermove", onPointerMove);

      const renderCursor = () => {
        rx += (x - rx) * 0.18;
        ry += (y - ry) * 0.18;
        if (ring) ring.style.transform = `translate(${rx}px,${ry}px)`;
        cursorRaf = requestAnimationFrame(renderCursor);
      };
      let cursorRaf = requestAnimationFrame(renderCursor);

      onPointerOver = (e: MouseEvent) => {
        const targetCur = (e.target as HTMLElement)?.closest?.("[data-cur]") as HTMLElement;
        if (ring) {
          if (targetCur) {
            ring.className = "lab";
            if (rl2) rl2.textContent = targetCur.dataset.cur || "";
          } else {
            ring.className = (e.target as HTMLElement)?.closest?.("a,label,button,li") ? "big" : "";
            if (rl2) rl2.textContent = "";
          }
        }
      };
      document.addEventListener("pointerover", onPointerOver);

      onPointerDown = (e: PointerEvent) => {
        if (reduce) return;
        const ripple = document.createElement("i");
        ripple.className = "rp";
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      };
      window.addEventListener("pointerdown", onPointerDown);

      document.querySelectorAll(".mag").forEach((el: any) => {
        el.addEventListener("pointermove", (e: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          el.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.28}px, ${(e.clientY - rect.top - rect.height / 2) * 0.4}px)`;
        });
        el.addEventListener("pointerleave", () => {
          el.style.transform = "";
        });
      });
    } else {
      const scr = $("#scr");
      if (scr) scr.textContent = "Scroll ↓";
    }

    // --- 3. Hero Visuals & SVG AI Mesh ---
    const PHOTO_PATH = "/assets/img/photo.jpg";
    if ($("#i1")) $("#i1").src = PHOTO_PATH;
    if ($("#i2")) $("#i2").src = PHOTO_PATH;
    if ($("#i3")) $("#i3").src = PHOTO_PATH;

    const SH: Record<string, string> = {
      za: "/assets/img/zyng-analytics.jpg",
      ze: "/assets/img/zyng-entry-tickets.jpg",
      zl: "/assets/img/zyng-login.jpg",
      dc: "/assets/img/direct-credit-login.jpg",
      d1: "/assets/img/drone-coe-hero.jpg",
      d2: "/assets/img/drone-coe-partners.jpg",
    };

    document.querySelectorAll("[data-s]").forEach((img: any) => {
      if (SH[img.dataset.s]) img.src = SH[img.dataset.s];
    });

    const P: [number, number, number, number][] = [];
    const LNs: any[] = [];
    const CIs: any[] = [];
    const mesh = $("#mesh");
    const NS = "http://www.w3.org/2000/svg";

    for (let gx = -4; gx <= 4; gx++) {
      for (let gy = -5; gy <= 5; gy++) {
        const px0 = 51 + gx * 3.6 + (Math.random() - 0.5) * 2;
        const py0 = 30 + gy * 4.8 + (Math.random() - 0.5) * 2.4;
        if (Math.pow((px0 - 51) / 15, 2) + Math.pow((py0 - 30) / 24, 2) < 1) {
          P.push([px0, py0, 0, 0]);
        }
      }
    }

    function mk(tag: string, attrs: Record<string, any>) {
      const el = document.createElementNS(NS, tag);
      for (const key in attrs) el.setAttribute(key, attrs[key]);
      mesh?.appendChild(el);
      return el;
    }

    P.forEach((a, i) => {
      P.forEach((b, j) => {
        if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 6.6) {
          LNs.push({
            a: i,
            b: j,
            el: mk("line", { stroke: "#fff", "stroke-opacity": 0.5, "stroke-width": 0.12 }),
          });
        }
      });
    });

    P.forEach(() => {
      const c = mk("circle", { r: 0.38, fill: "#ffe066" });
      c.style.animationDelay = `-${(Math.random() * 2.4).toFixed(2)}s`;
      CIs.push(c);
    });

    mk("circle", { cx: 58, cy: 28.3, r: 1.7, fill: "none", stroke: "#ffe066", "stroke-width": 0.3 });
    const eye2 = mk("circle", { cx: 58, cy: 28.3, r: 0.6, fill: "#fff" });
    let cp = [58, 30];

    function relayoutMesh() {
      P.forEach((a, i) => {
        const dx = cp[0] - a[0];
        const dy = cp[1] - a[1];
        const d = Math.hypot(dx, dy);
        const f = Math.exp((-d * d) / 90) * 0.2;
        a[2] = a[0] + dx * f;
        a[3] = a[1] + dy * f;
        if (CIs[i]) {
          CIs[i].setAttribute("cx", a[2].toString());
          CIs[i].setAttribute("cy", a[3].toString());
        }
      });

      LNs.forEach((l) => {
        const a = P[l.a];
        const b = P[l.b];
        l.el.setAttribute("x1", a[2].toString());
        l.el.setAttribute("y1", a[3].toString());
        l.el.setAttribute("x2", b[2].toString());
        l.el.setAttribute("y2", b[3].toString());
      });

      if (eye2) {
        eye2.setAttribute("cx", (58 + Math.max(-1, Math.min(1, (cp[0] - 58) / 18))).toString());
        eye2.setAttribute("cy", (28.3 + Math.max(-1, Math.min(1, (cp[1] - 28.3) / 18))).toString());
      }
    }

    relayoutMesh();

    let raf2 = 0;
    const onMeshPointer = (e: PointerEvent) => {
      if (raf2) return;
      raf2 = requestAnimationFrame(() => {
        raf2 = 0;
        const rect = $("#pic")?.getBoundingClientRect();
        if (rect) {
          cp = [((e.clientX - rect.left) / rect.width) * 100, ((e.clientY - rect.top) / rect.height) * 100];
          relayoutMesh();
        }
      });
    };
    window.addEventListener("pointermove", onMeshPointer);

    const onPicMove = (e: PointerEvent) => {
      const picEl = $("#pic");
      if (picEl) {
        picEl.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
        picEl.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
      }
    };
    window.addEventListener("pointermove", onPicMove);

    // Intro Words
    const big = $("#big");
    if (big) {
      const words = big.textContent.split(" ");
      big.innerHTML = words.map((w: string) => `<span>${w}</span>`).join(" ");
    }
    const ws = big?.querySelectorAll("span") || [];

    // --- 4. World Road & Skyline ---
    const W = 8200;
    const Y = (x: number) => 520 + Math.sin(x / 420) * 35;
    let roadPath = `M-900,${Y(-900)}`;
    for (let x2 = -860; x2 <= W; x2 += 40) roadPath += ` L${x2},${Y(x2)}`;
    document.querySelectorAll(".rd").forEach((p) => p.setAttribute("d", roadPath));

    function generateCity(selector: string, hmin: number, hmax: number, fill: string, glow: number) {
      let s = "";
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
      const target = $(selector + " svg");
      if (target) target.innerHTML = s;
    }

    generateCity("#far", 60, 170, "#3a2fb0", 0);
    generateCity("#near", 30, 110, "#0d0b1f", 1);

    // Ambient Stars
    let starsHtml = "";
    for (let k = 0; k < 80; k++) {
      const z = Math.random() * 2 + 1;
      starsHtml += `<i style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${z}px;height:${z}px;animation-delay:-${(Math.random() * 3).toFixed(2)}s"></i>`;
    }
    const starsEl = $("#stars");
    if (starsEl) starsEl.innerHTML = starsHtml;

    // Stops and Milestone Signs
    const stops = [1100, 2000, 2900, 3800, 4700, 5600, 6500];
    const nm = ["NovoStack", "Zyng Parks", "Direct Credit", "IIT Kanpur Drone", "Skills", "How I ship", "Education"];
    let signsHtml = "";

    [[250, "Noida"], [7300, "Your team"]].concat(stops.map((x, i) => [x, nm[i]])).forEach((s: any) => {
      const width = Math.max(110, s[1].length * 14);
      signsHtml += `<g transform="translate(${s[0]},${Y(s[0]) - 35})">
        <rect x="-3" y="-120" width="6" height="120" fill="#f5f2ff"/>
        <rect x="${-width / 2}" y="-172" width="${width}" height="52" rx="26" fill="#f5f2ff"/>
        <text x="0" y="-138" fill="#0d0b1f" font-family="Bricolage Grotesque,sans-serif" font-weight="800" font-size="21" text-anchor="middle">${s[1]}</text>
      </g>`;
    });
    const signsEl = $("#signs");
    if (signsEl) signsEl.innerHTML = signsHtml;

    // Element references
    const cards = document.querySelectorAll(".card");
    const sc = $("#sc");
    const wls = document.querySelectorAll(".sp");
    const world = $("#world");
    const far = $("#far");
    const near = $("#near");
    const orb = $("#orb");
    const moon = $("#moon");
    const stars = $("#stars");
    const stage = $("#stage");
    const ride = $("#ride");
    const bar = $("#bar");
    const tip = $("#tip");
    const intro = $("#intro");
    const stats = $("#stats");
    const fin = $("#fin");
    const lbt = $("#lbt");
    const lbb = $("#lbb");

    const hero = $("#top");
    const pic = $("#pic");
    const ai = $("#ai");
    const sw = $("#sw");
    const blu = $("#blu");
    const caps = document.querySelectorAll(".cap");
    const scr = $("#scr");
    const h1 = $("h1");
    const rl = $(".role");
    const pl2 = $(".pill");

    // Nav anchor handlers
    document.querySelectorAll("nav a[data-p]").forEach((a: any) => {
      a.addEventListener("click", (e: Event) => {
        e.preventDefault();
        window.scrollTo({
          top: ride.offsetTop + parseFloat(a.dataset.p) * (ride.offsetHeight - window.innerHeight),
          behavior: "smooth",
        });
      });
    });

    // --- 5. Scroll Engine ---
    function upd() {
      if (!hero || !ride) return;
      const hp = cl((cur - hero.offsetTop) / (hero.offsetHeight - window.innerHeight), 0, 1);
      const a0 = cl((hp - 0.12) / 0.55, 0, 1);
      const e = a0 * a0 * (3 - 2 * a0);
      const m = cl((hp - 0.8) / 0.2, 0, 1);
      const H = window.innerHeight;
      const vw = window.innerWidth;
      const pct = cl(((vw * (1 - 0.5 * e) - (vw - H) / 2) / H) * 100, 0, 100);

      heroE = e;
      heroP = hp;
      if (ai) ai.style.clipPath = `inset(0 0 0 ${pct}%)`;
      if (sw) {
        sw.style.left = `${pct}%`;
        sw.style.opacity = e > 0 && m < 0.5 ? "1" : "0";
      }
      if (blu) blu.style.clipPath = `inset(0 0 0 ${(100 - 50 * e) * (1 - m)}%)`;

      if (pic) {
        pic.style.setProperty("--z", (1 + 0.06 * hp + 0.5 * m * m).toFixed(3));
        pic.style.opacity = (1 - m).toString();
      }

      const fo = cl(1 - m * 1.6, 0, 1);
      if (h1) h1.style.opacity = fo.toString();
      if (rl) rl.style.opacity = fo.toString();
      if (pl2) pl2.style.opacity = fo.toString();

      caps.forEach((c: any) => c.style.setProperty("--c", (cl((hp - 0.55) / 0.2, 0, 1) * fo).toString()));
      if (scr) scr.style.opacity = cl(1 - hp * 8, 0, 1).toString();

      const p = cl((cur - ride.offsetTop) / (ride.offsetHeight - window.innerHeight), 0, 1);
      const rp = cl((p - 0.27) / 0.65, 0, 1);
      const s = Math.min(cl(vw / 1100, 0.6, 1), H / 700);

      let ent = cl(p / 0.1, 0, 1);
      ent = 1 - (1 - ent) * (1 - ent);
      const cam = 250 + rp * 7050;
      const sx = rp > 0 ? cam : -450 + 700 * ent;

      if (sc) {
        sc.setAttribute(
          "transform",
          `translate(${sx},${Y(sx) - 32 + Math.sin(sx / 18) * 2 - hop}) rotate(${Math.atan((Math.cos(sx / 420) * 35) / 420) * 57.3})`
        );
      }

      wls.forEach((w) => w.setAttribute("transform", `rotate(${sx * 2.4})`));

      if (world) world.style.transform = `translate(${vw * 0.38 - cam * s}px,-50%) scale(${s})`;
      if (far) far.style.transform = `translate(${-cam * 0.2 - mxp * 10}px,${myp * 6}px)`;
      if (near) near.style.transform = `translate(${-cam * 0.45 - mxp * 24}px,${myp * 12}px)`;

      if (stage) stage.style.setProperty("--p", cl((p - 0.2) / 0.72, 0, 1).toString());
      if (orb) orb.style.transform = `translateY(${H * (0.74 - rp * 0.64)}px)`;

      const nt = cl(1 - rp * 1.8, 0, 1);
      if (moon) moon.style.opacity = nt.toString();
      if (stars) stars.style.opacity = nt.toString();

      cards.forEach((c: any, i) => {
        const on = Math.abs(cam - stops[i]) < 430 && rp > 0;
        if (on && !c.classList.contains("on")) scramble(c.querySelector("h3"));
        c.classList.toggle("on", on);
      });

      const io = 1 - cl((p - 0.21) / 0.05, 0, 1);
      const q = cl((p - 0.01) / 0.13, 0, 1);
      const n = ws.length;

      if (intro) {
        intro.style.opacity = io.toString();
        intro.style.transform = `translateY(${-(1 - io) * 40}px)`;
      }
      if (stats) stats.style.opacity = cl((p - 0.09) / 0.05, 0, 1).toString();

      ws.forEach((w: any, i: number) => {
        w.style.opacity = (0.14 + 0.86 * cl(q * (n + 4) - i, 0, 1)).toString();
      });

      const lb = cl(p / 0.04, 0, 1) * (1 - cl((p - 0.93) / 0.04, 0, 1));
      if (lbt) lbt.style.transform = `translateY(${(lb - 1) * 100}%)`;
      if (lbb) lbb.style.transform = `translateY(${(1 - lb) * 100}%)`;

      const fi = cl((p - 0.93) / 0.04, 0, 1);
      if (fin) {
        fin.style.opacity = fi.toString();
        fin.style.pointerEvents = fi > 0.5 ? "auto" : "none";
      }

      if (tip) {
        tip.style.opacity = p > 0.02 && p < 0.9 ? "0.85" : "0";
        tip.textContent = p < 0.25 ? "Scroll to start the ride" : "Keep scrolling to keep riding";
      }

      if (bar) bar.style.width = `${(cur / (document.body.scrollHeight - window.innerHeight)) * 100}%`;
      extra(p, rp, cam, sx, nt);
    }

    let cur = window.scrollY;
    let tg = window.scrollY;
    let prev = window.scrollY;
    let vel = 0;
    let hop = 0;
    let hopT = -1;
    let heroE = 0;
    let lastCode = -1;
    let fs = 0;

    const root = document.documentElement;
    const CODE = "const devansh = {\n  role: 'AI-native engineer',\n  stack: ['React', 'Node', 'Postgres'],\n  ships: 'scoped, reviewed, fast'\n};";
    const MAIL = PORTFOLIO_DATA.email;

    function toast(message: string) {
      const t = $("#toast");
      if (!t) return;
      t.textContent = message;
      t.classList.add("on");
      clearTimeout((toast as any).timer);
      (toast as any).timer = setTimeout(() => t.classList.remove("on"), 2600);
    }

    // Theme toggler
    function setTheme(theme: string) {
      root.dataset.theme = theme;
      const thmBtn = $("#thm");
      if (thmBtn) thmBtn.textContent = theme === "day" ? "☀" : "☾";
      try {
        localStorage.setItem("da-theme", theme);
      } catch (e) {}
    }

    try {
      const savedTheme = localStorage.getItem("da-theme");
      if (savedTheme) setTheme(savedTheme);
    } catch (e) {}

    const thm = $("#thm");
    if (thm) {
      thm.onclick = () => setTheme(root.dataset.theme === "day" ? "night" : "day");
    }

    // Text Scramble
    const SCH = "01<>/{}#$%&*";
    function scramble(element: any) {
      if (!element || reduce) return;
      const originalText = element.dataset.t || (element.dataset.t = element.textContent);
      const startTime = performance.now();

      (function loop() {
        const progress = Math.min(1, (performance.now() - startTime) / 650);
        let output = "";
        for (let i = 0; i < originalText.length; i++) {
          output += originalText[i] === " " || i < originalText.length * progress
            ? originalText[i]
            : SCH[Math.floor(Math.random() * SCH.length)];
        }
        element.textContent = output;
        if (progress < 1) requestAnimationFrame(loop);
      })();
    }

    function pFor(x: number) {
      return 0.27 + (0.65 * (x - 250)) / 7050;
    }

    function go(progress: number) {
      window.scrollTo({
        top: progress < 0 ? 0 : ride.offsetTop + progress * (ride.offsetHeight - window.innerHeight),
        behavior: "smooth",
      });
    }

    const CH: [string, number][] = [
      ["Photo", -1],
      ["Intro", 0.02],
      ...stops.map((x, i) => [nm[i], pFor(x)] as [string, number]),
      ["Contact", 1],
    ];

    const chEl = $("#ch");
    if (chEl) {
      chEl.innerHTML = "";
      CH.forEach((c) => {
        const btn = document.createElement("button");
        btn.innerHTML = `<span>${c[0]}</span>`;
        btn.setAttribute("aria-label", `Go to ${c[0]}`);
        btn.onclick = () => go(c[1]);
        chEl.appendChild(btn);
      });
    }

    const chButtons = chEl?.children || [];

    function updateActiveChapter(p: number, inRide: boolean) {
      let activeIndex = 0;
      if (inRide) {
        activeIndex = 1;
        CH.forEach((c, i) => {
          if (i > 1 && p >= c[1] - 0.03) activeIndex = i;
        });
      }
      for (let i = 0; i < chButtons.length; i++) {
        chButtons[i].classList.toggle("a", i === activeIndex);
      }
    }

    // Street Lamps & Buildings
    let lg = "";
    let bg = "";
    const lamps: any[] = [];
    const blds: any[] = [];

    for (let lx = 650; lx < 8000; lx += 900) {
      const ly = Y(lx) - 35;
      lg += `<g data-x="${lx}">
        <rect x="${lx - 2}" y="${ly - 130}" width="4" height="130" fill="#f5f2ff" opacity=".7"/>
        <circle cx="${lx}" cy="${ly - 134}" r="6" fill="#fff6c8"/>
        <circle class="lgl" cx="${lx}" cy="${ly - 134}" r="95" fill="url(#lg)" style="opacity:0"/>
      </g>`;
    }

    const lampsEl = $("#lamps");
    if (lampsEl) {
      lampsEl.innerHTML = lg;
      [].forEach.call(lampsEl.children, (g: any) => {
        lamps.push({ x: +g.dataset.x, g: g.querySelector(".lgl") });
      });
    }

    stops.forEach((x) => {
      const y = Y(x) - 35;
      let windows = "";
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

    const bldsEl = $("#blds");
    if (bldsEl) {
      bldsEl.innerHTML = bg;
      [].forEach.call(bldsEl.children, (g: any) => {
        blds.push({ x: +g.dataset.x, el: g });
      });
    }

    const sky2 = $("#sky2");
    const cl2 = sky2?.querySelectorAll(".cd") || [];
    const bd2 = sky2?.querySelectorAll(".bi") || [];
    const spd = $("#spd");
    const hlE = $("#hl");
    const armE = $("#arm");
    const wvE = $("#wv");
    const codeEl = $("#code");

    let speedLinesHtml = "";
    for (let q2 = 0; q2 < 14; q2++) {
      speedLinesHtml += `<b style="top:${18 + Math.random() * 60}%;width:${8 + Math.random() * 16}vw;animation-delay:-${(Math.random() * 0.4).toFixed(2)}s;animation-duration:${(0.28 + Math.random() * 0.2).toFixed(2)}s"></b>`;
    }
    if (spd) spd.innerHTML = speedLinesHtml;

    function extra(p: number, rp: number, cam: number, sx: number, nt: number) {
      const day = root.dataset.theme === "day";
      const n = day ? 0 : nt;
      const t = performance.now();

      if (hlE) hlE.style.opacity = n.toString();

      for (let i = 0; i < lamps.length; i++) {
        if (lamps[i].g) lamps[i].g.style.opacity = (n * cl((sx - (lamps[i].x - 520)) / 320, 0, 1)).toString();
      }

      for (let i = 0; i < blds.length; i++) {
        if (blds[i].el) blds[i].el.classList.toggle("lit", Math.abs(cam - blds[i].x) < 460);
      }

      const onCard = document.querySelector(".card.on");
      if (armE) armE.style.display = onCard ? "none" : "";
      if (wvE) {
        wvE.style.display = onCard ? "" : "none";
        if (onCard) wvE.setAttribute("transform", `rotate(${Math.sin(t / 110) * 22} 6 -66)`);
      }

      if (sky2) sky2.style.opacity = day ? "0.9" : cl((rp - 0.4) / 0.3, 0, 1).toString();

      cl2.forEach((cloud: any, i: number) => {
        cloud.setAttribute("transform", `translate(${((t * 0.012 * (1 + i * 0.3) + i * 420) % 1900) - 250},${i * 55})`);
      });

      bd2.forEach((bird: any, i: number) => {
        bird.setAttribute(
          "transform",
          `translate(${((t * 0.06 + i * 330) % 1900) - 100},${70 + i * 38 + Math.sin(t / 260 + i) * 8}) scale(1,${0.6 + Math.abs(Math.sin(t / 120 + i)) * 0.5})`
        );
      });

      if (spd) spd.style.opacity = (reduce ? 0 : cl((Math.abs(vel) - 6) / 25, 0, 0.85)).toString();
      updateActiveChapter(p, cur >= ride.offsetTop - 10);

      const k = Math.min(CODE.length, Math.floor(heroE * 1.15 * CODE.length));
      if (k !== lastCode && codeEl) {
        lastCode = k;
        codeEl.textContent = CODE.slice(0, k) + (k < CODE.length ? "▌" : "");
      }

      if (fin && +fin.style.opacity > 0.5) {
        if (!fs) {
          fs = 1;
          scramble(fin.querySelector("h2"));
        }
      } else {
        fs = 0;
      }
    }

    // Audio Engine
    let ac: any, og: any, o1: any, o2: any, soundOn = false;

    function initAudio() {
      if (ac) return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      ac = new AudioCtx();
      const filter = ac.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 260;

      og = ac.createGain();
      og.gain.value = 0;

      o1 = ac.createOscillator();
      o1.type = "sawtooth";

      o2 = ac.createOscillator();
      o2.type = "square";

      o1.connect(filter);
      o2.connect(filter);
      filter.connect(og);
      og.connect(ac.destination);

      o1.start();
      o2.start();
    }

    const sndBtn = $("#snd");
    if (sndBtn) {
      sndBtn.onclick = function () {
        soundOn = !soundOn;
        if (soundOn) {
          initAudio();
          ac.resume();
        }
        sndBtn.textContent = soundOn ? "Sound on" : "Sound off";
        sndBtn.setAttribute("aria-pressed", soundOn.toString());
      };
    }

    function honk() {
      if (!ac) return;
      const t = ac.currentTime;
      [420, 520].forEach((fr) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = "square";
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

    if (sc) {
      sc.addEventListener("click", () => {
        hopT = performance.now();
        if (soundOn) honk();
        else toast("Turn sound on to hear the horn");
      });
    }

    function audioTick() {
      if (!ac) return;
      const v2 = Math.min(Math.abs(vel), 40);
      const T = ac.currentTime;
      og.gain.setTargetAtTime(soundOn ? 0.02 + v2 * 0.0012 : 0, T, 0.15);
      o1.frequency.setTargetAtTime(44 + v2 * 1.8, T, 0.1);
      o2.frequency.setTargetAtTime(88 + v2 * 3, T, 0.1);
    }

    // Actions
    function copyMail() {
      try {
        navigator.clipboard.writeText(MAIL).then(
          () => toast("Email copied"),
          () => toast(MAIL)
        );
      } catch (e) {
        toast(MAIL);
      }
    }

    function dlRes() {
      const a = document.createElement("a");
      a.href = PORTFOLIO_DATA.resumePath;
      a.download = "Devansh_Awasthi_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    const rsmBtn = $("#rsm");
    if (rsmBtn) {
      rsmBtn.onclick = (e: Event) => {
        e.preventDefault();
        dlRes();
      };
    }

    // Command Palette
    const cpb = $("#cp");
    const cpi = $("#cpi");
    const cpl = $("#cpl");
    let sel = 0;
    let list: any[] = [];

    const ACT: [string, () => void][] = [
      ["Go to photo", () => go(-1)],
      ["Go to intro", () => go(0.02)],
      ...stops.map((x, i) => [`Go to ${nm[i]}`, () => go(pFor(x))] as [string, () => void]),
      ["Go to contact", () => go(1)],
      ["Copy email", copyMail],
      ["Download résumé", dlRes],
      ["Open LinkedIn", () => window.open(PORTFOLIO_DATA.linkedin, "_blank", "noopener")],
      ["Open GitHub (devawasthi13)", () => window.open(PORTFOLIO_DATA.github, "_blank", "noopener")],
      ["Open GitHub (devawasthi08)", () => window.open(PORTFOLIO_DATA.githubAlt, "_blank", "noopener")],
      ["Toggle day or night", () => $("#thm")?.click()],
      ["Toggle sound", () => $("#snd")?.click()],
    ];

    function renderPalette() {
      const query = cpi?.value.toLowerCase() || "";
      list = ACT.filter((a) => a[0].toLowerCase().indexOf(query) > -1);
      sel = Math.min(sel, Math.max(0, list.length - 1));
      if (cpl) {
        cpl.innerHTML = list
          .map((a, i) => `<li${i === sel ? ' class="s"' : ""} data-i="${i}">${a[0]}</li>`)
          .join("");
      }
    }

    function openCp() {
      if (cpb) cpb.hidden = false;
      if (cpi) {
        cpi.value = "";
        cpi.focus();
      }
      sel = 0;
      renderPalette();
    }

    function closeCp() {
      if (cpb) cpb.hidden = true;
    }

    const lbx = $("#lbx");

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        cpb?.hidden ? openCp() : closeCp();
        return;
      }
      if (e.key === "Escape") {
        closeCp();
        if (lbx) lbx.hidden = true;
      }
      if (cpb && !cpb.hidden) {
        if (e.key === "ArrowDown") {
          sel = Math.min(sel + 1, list.length - 1);
          renderPalette();
          e.preventDefault();
        } else if (e.key === "ArrowUp") {
          sel = Math.max(sel - 1, 0);
          renderPalette();
          e.preventDefault();
        } else if (e.key === "Enter" && list[sel]) {
          const fn = list[sel][1];
          closeCp();
          fn();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);

    if (cpi) {
      cpi.oninput = () => {
        sel = 0;
        renderPalette();
      };
    }

    if (cpl) {
      cpl.onclick = (e: any) => {
        const li = e.target.closest("li");
        if (li) {
          const fn = list[+li.dataset.i][1];
          closeCp();
          fn();
        }
      };
    }

    if (cpb) {
      cpb.onclick = (e: any) => {
        if (e.target === cpb) closeCp();
      };
    }

    const kbBtn = $("#kb");
    if (kbBtn) kbBtn.onclick = openCp;

    // Lightbox
    const lbi = $("#lbi");
    const lbc = $("#lbc");
    let lbs: any[] = [];
    let lbk = 0;

    function showLb() {
      if (lbi && lbs[lbk]) {
        lbi.src = lbs[lbk].src;
        lbi.alt = lbs[lbk].alt;
      }
      if (lbc && lbs[lbk]) {
        lbc.textContent = `${lbs[lbk].alt} (${lbk + 1}/${lbs.length})`;
      }
    }

    document.querySelectorAll(".sf").forEach((sf: any) => {
      sf.style.cursor = "zoom-in";
      sf.addEventListener("click", () => {
        lbs = [].slice.call(sf.querySelectorAll("img"));
        let highestOpacity = -1;
        lbs.forEach((im, i) => {
          const opacity = +getComputedStyle(im).opacity;
          if (opacity > highestOpacity) {
            highestOpacity = opacity;
            lbk = i;
          }
        });
        showLb();
        if (lbx) lbx.hidden = false;
      });
    });

    const lbn = $("#lbn");
    if (lbn) {
      lbn.onclick = (e: Event) => {
        e.stopPropagation();
        lbk = (lbk + 1) % lbs.length;
        showLb();
      };
    }

    const lbp = $("#lbp");
    if (lbp) {
      lbp.onclick = (e: Event) => {
        e.stopPropagation();
        lbk = (lbk - 1 + lbs.length) % lbs.length;
        showLb();
      };
    }

    if (lbx) {
      lbx.onclick = (e: any) => {
        if (e.target === lbx || e.target === lbi) lbx.hidden = true;
      };
    }

    // Card Tilt & Loupe
    document.querySelectorAll(".shot").forEach((shotFrame: any) => {
      const sf = shotFrame.querySelector(".sf");
      if (sf) sf.dataset.cur = "Zoom";

      shotFrame.addEventListener("pointermove", (e: PointerEvent) => {
        const rect = shotFrame.getBoundingClientRect();
        shotFrame.style.setProperty("--tx", ((e.clientX - rect.left) / rect.width - 0.5).toFixed(3));
        shotFrame.style.setProperty("--ty", ((e.clientY - rect.top) / rect.height - 0.5).toFixed(3));

        if (sf) {
          const fr = sf.getBoundingClientRect();
          const fx = ((e.clientX - fr.left) / fr.width) * 100;
          const fy = ((e.clientY - fr.top) / fr.height) * 100;

          sf.style.setProperty("--ox", `${fx}%`);
          sf.style.setProperty("--oy", `${fy}%`);
          sf.style.setProperty("--gx", `${fx}%`);
          sf.style.setProperty("--gy", `${fy}%`);
          sf.classList.toggle("z", fx >= 0 && fx <= 100 && fy >= 0 && fy <= 100);
        }
      });

      shotFrame.addEventListener("pointerleave", () => {
        shotFrame.style.setProperty("--tx", 0);
        shotFrame.style.setProperty("--ty", 0);
        if (sf) sf.classList.remove("z");
      });
    });

    if (sc) sc.dataset.cur = "Honk";
    document.querySelectorAll("a.lk").forEach((a: any) => {
      a.dataset.cur = "Visit";
    });

    function fitCards() {
      document.querySelectorAll(".card").forEach((c: any) => {
        c.style.setProperty("--fit", 1);
        c.style.setProperty("--fit", Math.min(1, (window.innerHeight * 0.56) / c.offsetHeight).toFixed(3));
      });
    }

    fitCards();
    window.addEventListener("resize", fitCards);

    // Hero AI Cursor Tracking Lens
    const lens = $("#lens");
    const lr = $("#lr");

    function lensTick() {
      const want = !reduce && hasPtr && heroP < 0.09 && cur < window.innerHeight * 0.4 ? 11 : 0;
      lensR += (want - lensR) * 0.14;
      const r = lensR < 0.15 ? 0 : lensR;
      if (lens) lens.style.clipPath = `circle(${r}% at ${cp[0]}% ${cp[1]}%)`;
      if (lr) lr.style.cssText = `left:${cp[0]}%;top:${cp[1]}%;width:${r * 2}%;opacity:${r > 0 ? 1 : 0}`;
    }

    // Scroll Lerp Loop
    const onScroll = () => { tg = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    let animId: number;
    function frame(now: number) {
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
      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", fitCards);
      window.removeEventListener("keydown", onKeyDown);
      if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
      if (onPointerDown) window.removeEventListener("pointerdown", onPointerDown);
      if (onPointerOver) document.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointermove", onMeshPointer);
      window.removeEventListener("pointermove", onPicMove);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* Preloader Screen */}
      <div id="pl" aria-hidden="true">
        <svg id="pls" viewBox="0 0 100 100"></svg>
        <b className="d" id="pn">0</b>
        <span>Devansh Awasthi, loading</span>
      </div>

      {/* Custom Cursor Elements */}
      <div id="cd"></div>
      <div id="cr"><span></span></div>

      {/* Reading Progress Bar */}
      <div className="bar" id="bar"></div>

      {/* Navigation */}
      <nav>
        <a className="d" href="#top">DA</a>
        <div>
          <a href="#ride" data-p=".02">About</a>
          <a href="#ride" data-p=".43">Work</a>
          <a className="hm" href="#ride" data-p=".68">Skills</a>
          <a href="#ride" data-p="1">Contact</a>
          <button id="thm" aria-label="Toggle day and night">☾</button>
          <button id="kb" aria-label="Open command menu">Ctrl K</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="top">
        <div className="stk">
          <div className="blu" id="blu"></div>
          <div className="pic" id="pic">
            <img id="i1" alt="Devansh Awasthi in a navy blazer" />
            <div className="ai" id="ai">
              <img id="i2" alt="" />
              <div className="tint"></div>
              <div className="grid"></div>
              <svg id="mesh" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
              <div className="scan"></div>
              <pre className="code" id="code"></pre>
              <span className="tg" style={{ left: "62%", top: "11%" }}>React</span>
              <span className="tg" style={{ left: "70%", top: "24%" }}>Node.js</span>
              <span className="tg" style={{ left: "73%", top: "39%" }}>AI agents</span>
              <span className="tg" style={{ left: "60%", top: "47%" }}>PostgreSQL</span>
            </div>
            <div className="lens" id="lens">
              <img id="i3" alt="" />
              <div className="tint"></div>
              <div className="grid"></div>
            </div>
            <div className="lr" id="lr"></div>
            <div className="sw" id="sw"></div>
          </div>
          <div className="vig"></div>
          <div className="spot" id="spot"></div>
          <p className="role d">{PORTFOLIO_DATA.role}</p>
          <span className="pill">Open to work</span>
          <p className="cap l d">Human craft</p>
          <p className="cap r d">AI speed</p>
          <h1 className="d" aria-label="Devansh Awasthi">
            <span><em>Devansh</em></span>
            <span><em>Awasthi</em></span>
          </h1>
          <span className="scroll" id="scr">Hover my face, then scroll ↓</span>
        </div>
      </header>

      {/* Interactive Scooter Ride Section */}
      <div className="ride" id="ride">
        <div className="stage" id="stage">
          <div className="stars" id="stars"></div>
          <div className="moon" id="moon"></div>
          <div className="dawn"></div>
          <div className="orb" id="orb"></div>
          <svg className="sky2" id="sky2" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
            <g className="cd"><ellipse cx="120" cy="80" rx="110" ry="26" /><ellipse cx="190" cy="62" rx="70" ry="28" /></g>
            <g className="cd"><ellipse cx="120" cy="60" rx="90" ry="22" /><ellipse cx="60" cy="48" rx="50" ry="22" /></g>
            <g className="cd"><ellipse cx="140" cy="70" rx="120" ry="24" /><ellipse cx="220" cy="54" rx="60" ry="24" /></g>
            <g className="cd"><ellipse cx="100" cy="66" rx="80" ry="20" /></g>
            <path className="bi" d="M0 0q8-10 16 0q8-10 16 0" />
            <path className="bi" d="M0 0q8-10 16 0q8-10 16 0" />
            <path className="bi" d="M0 0q8-10 16 0q8-10 16 0" />
            <path className="bi" d="M0 0q8-10 16 0q8-10 16 0" />
          </svg>

          <div className="lay" id="far"><svg viewBox="0 0 6000 300" preserveAspectRatio="none"></svg></div>
          <div className="lay" id="near"><svg viewBox="0 0 6000 300" preserveAspectRatio="none"></svg></div>

          <div id="world">
            <svg viewBox="0 0 8200 720">
              <defs>
                <radialGradient id="lg">
                  <stop offset="0" stopColor="#ffe9a8" stopOpacity=".9" />
                  <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="hlg" x1="0" x2="1">
                  <stop offset="0" stopColor="#fff6c8" stopOpacity=".85" />
                  <stop offset="1" stopColor="#fff6c8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="rd" stroke="#0d0b1f" strokeWidth="70" fill="none" />
              <path className="rd" stroke="#ffe066" strokeWidth="3" strokeDasharray="26 30" fill="none" transform="translate(0,2)" />
              <g id="blds"></g>
              <g id="lamps"></g>
              <g id="signs"></g>
              <g id="sc">
                <g transform="scale(1.5)">
                  <path id="hl" d="M32-72L340-140L340-4Z" fill="url(#hlg)" style={{ opacity: 0 }} />
                  <circle cx="30" cy="-72" r="3.2" fill="#fff6c8" />
                  <g transform="translate(-34,-14)">
                    <g className="sp">
                      <circle r="14" fill="#0d0b1f" stroke="#f5f2ff" strokeWidth="3" />
                      <path d="M-14 0H14M0-14V14" stroke="#ffe066" strokeWidth="2" />
                    </g>
                  </g>
                  <g transform="translate(34,-14)">
                    <g className="sp">
                      <circle r="14" fill="#0d0b1f" stroke="#f5f2ff" strokeWidth="3" />
                      <path d="M-14 0H14M0-14V14" stroke="#ffe066" strokeWidth="2" />
                    </g>
                  </g>
                  <rect x="-38" y="-27" width="64" height="7" rx="3.5" fill="#ffe066" />
                  <path d="M34-14L24-72M16-74H32" stroke="#f5f2ff" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M-5-27L-4-50M6-27L6-50" stroke="#7b8cff" strokeWidth="8" strokeLinecap="round" />
                  <rect x="-18" y="-70" width="10" height="20" rx="4" fill="#ffb347" />
                  <rect x="-10" y="-74" width="22" height="28" rx="9" fill="#ff5c8a" />
                  <path id="arm" d="M6-66L24-72" stroke="#f1c27d" strokeWidth="6" strokeLinecap="round" />
                  <path id="wv" d="M6-66L20-94" stroke="#f1c27d" strokeWidth="6" strokeLinecap="round" style={{ display: "none" }} />
                  <circle cx="1" cy="-88" r="12" fill="#f1c27d" />
                  <path d="M-11-90a12 12 0 0 1 24 0z" fill="#2a2bff" />
                  <path d="M8-91h12" stroke="#2a2bff" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="6" cy="-87" r="1.6" fill="#222" />
                  <path d="M4-82q3 2 6 0" stroke="#7a4a2a" strokeWidth="1.5" fill="none" />
                </g>
              </g>
            </svg>
          </div>

          <div className="intro" id="intro">
            <p className="big d" id="big">{PORTFOLIO_DATA.headline}</p>
            <div className="stats" id="stats">
              {PORTFOLIO_DATA.stats.map((s, idx) => (
                <div key={idx}>
                  <b className="d">{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="info">
            {/* Card 1: Experience */}
            <article className="card" style={{ "--bg": "#f5f2ff", "--fg": "#0d0b1f" } as any}>
              <div>
                <span className="n">01 · Experience</span>
                <h3>NovoStack</h3>
                <div className="t">Full Stack Developer · Noida · 2 years (present)</div>
                <ul>
                  <li>Build and maintain enterprise CRM modules and dashboards in React.js and Next.js, with reusable components and centralised shared table logic.</li>
                  <li>Integrate REST APIs and implement filters, search, KPI views, reporting workflows and dynamic data rendering for data-heavy screens.</li>
                  <li>Deliver role- and permission-driven interfaces; troubleshoot production issues and optimise frontend performance.</li>
                  <li>Collaborate with backend, QA and product teams.</li>
                </ul>
                <i>React.js</i>
                <i>Next.js</i>
                <i>REST APIs</i>
              </div>
            </article>

            {/* Card 2: Zyng Parks */}
            <article className="card w" style={{ "--bg": "#ff5c8a", "--fg": "#0d0b1f" } as any}>
              <div>
                <span className="n">02 · Project</span>
                <h3>Zyng Parks</h3>
                <div className="t">Parks, ticketing and parking management platform</div>
                <ul>
                  <li>Worked on parking workflows and API integration for vehicle types, pricing modes (hourly, per-day, duration slabs) and parking sessions.</li>
                  <li>Contributed to backend APIs and CRM modules (parks management, packages, entry ticketing, slots), connecting frontend workflows with structured API responses.</li>
                </ul>
                <i>React.js</i>
                <i>Node.js/Express</i>
                <i>PostgreSQL</i>
              </div>
              <div className="shot">
                <div className="sf">
                  <img data-s="za" alt="Zyng Parks analytics dashboard" />
                  <img data-s="ze" alt="Zyng Parks entry tickets screen" />
                  <img data-s="zl" alt="Zyng Parks login" />
                </div>
              </div>
            </article>

            {/* Card 3: Direct Credit CRM */}
            <article className="card w" style={{ "--bg": "#ffe066", "--fg": "#0d0b1f" } as any}>
              <div>
                <span className="n">03 · Project</span>
                <h3>Direct Credit CRM</h3>
                <div className="t">CRM for Direct Credit, The MSME Experts</div>
                <ul>
                  <li>Developed CRM dashboard features for leads, users, KPI reporting, filters, search and data-heavy listing pages.</li>
                  <li>Built reusable components, integrated APIs and supported permission-driven workflows.</li>
                </ul>
                <i>React.js</i>
                <i>Next.js</i>
                <i>TypeScript</i>
                <i>PostgreSQL</i>
              </div>
              <div className="shot">
                <div className="sf one">
                  <img data-s="dc" alt="Direct Credit CRM sign-in" />
                </div>
              </div>
            </article>

            {/* Card 4: IIT Kanpur Drone Centre */}
            <article className="card w" style={{ "--bg": "#0d0b1f", "--fg": "#f5f2ff" } as any}>
              <div>
                <span className="n">04 · Project</span>
                <h3>IIT Kanpur Drone Centre</h3>
                <div className="t">Official Centre of Excellence website</div>
                <ul>
                  <li>Contributed to responsive frontend development, UI implementation and optimisation.</li>
                </ul>
                <i>React.js</i>
                <i>Next.js</i>
                <i>HTML5</i>
                <i>CSS3</i>
                <br />
                <a className="lk" style={{ color: "#ffe066" }} href="https://dronecoeiitk.com" target="_blank" rel="noopener">Visit dronecoeiitk.com ↗</a>
              </div>
              <div className="shot">
                <div className="sf two">
                  <img data-s="d1" alt="Drone CoE website hero" />
                  <img data-s="d2" alt="Drone CoE partners section" />
                </div>
              </div>
            </article>

            {/* Card 5: Skills Stack */}
            <article className="card" style={{ "--bg": "#f5f2ff", "--fg": "#0d0b1f" } as any}>
              <div>
                <span className="n">05 · Skills</span>
                <h3>Stack</h3>
              </div>
              <div className="sk">
                <div>
                  <h4>AI-native engineering</h4>
                  <p>AI-assisted development (Cursor, Antigravity, Claude), Generative AI and LLM fundamentals, scoped analyse-first prompting</p>
                </div>
                <div>
                  <h4>AI harness engineering</h4>
                  <p>Tool/API orchestration, prompt and context management, structured outputs, guardrails, evaluation workflows</p>
                </div>
                <div>
                  <h4>Frontend</h4>
                  <p>React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, SCSS, CSS Modules, responsive design, reusable components</p>
                </div>
                <div>
                  <h4>Backend and APIs</h4>
                  <p>Node.js, Express.js, REST API development and integration, JSON, Fetch API, Axios, Postman</p>
                </div>
                <div>
                  <h4>Data and tools</h4>
                  <p>PostgreSQL, MySQL, Git, GitHub, VS Code, Vercel; Power BI and Tableau (certified)</p>
                </div>
              </div>
            </article>

            {/* Card 6: Workflow */}
            <article className="card" style={{ "--bg": "#ff5c8a", "--fg": "#0d0b1f" } as any}>
              <div>
                <span className="n">06 · Workflow</span>
                <h3>How I ship</h3>
                <div className="t">AI-native engineering with harness thinking</div>
                <ul>
                  <li>Pair AI coding agents (Cursor, Antigravity, Claude) with tightly scoped, analyse-first prompts.</li>
                  <li>Apply AI harness engineering: tool orchestration, structured outputs, guardrails and evaluation.</li>
                  <li>Confirm root causes, apply minimal changes and validate behaviour across bug-fix batches and feature work.</li>
                </ul>
                <i>Analyse first</i>
                <i>Minimal change</i>
                <i>Verify</i>
              </div>
            </article>

            {/* Card 7: Education */}
            <article className="card" style={{ "--bg": "#ffe066", "--fg": "#0d0b1f" } as any}>
              <div>
                <span className="n">07 · Education</span>
                <h3>Education and certifications</h3>
              </div>
              <div className="sk">
                <div>
                  <h4>MCA · PSIT College (AKTU)</h4>
                  <p>CGPA 8.18 · 2025</p>
                </div>
                <div>
                  <h4>Bachelor’s degree · PSIT College</h4>
                  <p>CGPA 8.9 · 2023</p>
                </div>
                <div>
                  <h4>Class XII · Gulmohar Public School</h4>
                  <p>2019</p>
                </div>
                <div>
                  <h4>Class X · Gulmohar Public School</h4>
                  <p>CGPA 9.8 · 2017</p>
                </div>
                <div>
                  <h4>Certifications</h4>
                  <p>Power BI Certification, Tableau Certification</p>
                </div>
              </div>
            </article>
          </div>

          <div className="tip" id="tip">Keep scrolling to keep riding</div>

          {/* Contact Finale */}
          <div className="fin" id="fin">
            <h2 className="d">Let’s talk.</h2>
            <p>Open to full-stack and AI-focused engineering roles. Based in Noida, India.</p>
            <div className="row">
              <a className="btn dk mag" href={`mailto:${PORTFOLIO_DATA.email}`}>Email me</a>
              <a className="btn o mag" href={PORTFOLIO_DATA.linkedin} target="_blank" rel="noopener">LinkedIn</a>
              <a className="btn o mag" href={PORTFOLIO_DATA.github} target="_blank" rel="noopener">GitHub (@devawasthi13)</a>
              <a className="btn o mag" href={PORTFOLIO_DATA.githubAlt} target="_blank" rel="noopener">GitHub (@devawasthi08)</a>
              <a className="btn o mag" id="rsm" href="#">Résumé</a>
            </div>
            <div className="meta">
              <a href={`mailto:${PORTFOLIO_DATA.email}`}>{PORTFOLIO_DATA.email}</a>
              <a href={`tel:${PORTFOLIO_DATA.phone}`}>{PORTFOLIO_DATA.phone}</a>
            </div>
          </div>

          <div className="spd" id="spd"></div>
          <div className="vg"></div>
          <div className="grain"></div>
          <div className="lb t" id="lbt"></div>
          <div className="lb b" id="lbb"></div>
        </div>
      </div>

      <div className="ch" id="ch" aria-label="Chapters"></div>
      <button id="snd" className="fl" aria-pressed="false">Sound off</button>

      {/* Command Palette */}
      <div id="cp" className="md" hidden>
        <div className="bx">
          <input id="cpi" placeholder="Type a command or search…" aria-label="Command" autoComplete="off" />
          <ul id="cpl"></ul>
        </div>
      </div>

      {/* Lightbox */}
      <div id="lbx" className="md" hidden>
        <button id="lbp" aria-label="Previous">‹</button>
        <img id="lbi" alt="" />
        <button id="lbn" aria-label="Next">›</button>
        <p id="lbc"></p>
      </div>

      <div id="toast" role="status"></div>
    </div>
  );
}
