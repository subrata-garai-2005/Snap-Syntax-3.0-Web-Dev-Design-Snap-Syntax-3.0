import { useState, useEffect, useRef } from "react";
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; font-size:16px; -webkit-font-smoothing:antialiased; }
body { font-family:'DM Sans',sans-serif; background:#08080e; color:#ececf4; line-height:1.6; overflow-x:hidden; }
a { color:inherit; text-decoration:none; }
ul { list-style:none; }
button,input,select,textarea { font-family:inherit; font-size:inherit; color:inherit; border:none; outline:none; background:none; }
::selection { background:#7c5cfc; color:#fff; }

:root {
  --bg:#08080e; --bg2:#0d0d18; --surface:#12121e;
  --border:rgba(255,255,255,0.07); --border-h:rgba(255,255,255,0.14);
  --txt:#ececf4; --txt2:#8a8aa8; --txt3:#4a4a68;
  --acc:#7c5cfc; --acc-h:#9479ff; --acc-glow:rgba(124,92,252,0.28);
  --acc2:#f545a0; --acc3:#00d4ff;
  --grad:linear-gradient(135deg,#7c5cfc 0%,#f545a0 100%);
  --grad2:linear-gradient(135deg,#00d4ff 0%,#7c5cfc 100%);
  --r-sm:8px; --r-md:14px; --r-lg:22px; --r-full:999px;
  --sh-lg:0 24px 64px rgba(0,0,0,0.55);
  --sh-glow:0 0 48px rgba(124,92,252,0.28);
  --t-fast:.2s cubic-bezier(.4,0,.2,1);
  --t-base:.35s cubic-bezier(.4,0,.2,1);
  --t-spring:.5s cubic-bezier(.34,1.56,.64,1);
  --f-head:'Syne',sans-serif;
}

/* ── SHAPES ── */
.shapes { position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
.sh { position:absolute; border-radius:50%; filter:blur(90px); opacity:.11; animation:floatSh 22s ease-in-out infinite; }
.sh1{width:420px;height:420px;background:var(--acc);top:-8%;left:-4%;animation-delay:0s}
.sh2{width:320px;height:320px;background:var(--acc2);top:18%;right:-4%;animation-delay:-5s;animation-duration:28s}
.sh3{width:260px;height:260px;background:var(--acc3);bottom:12%;left:18%;animation-delay:-9s}
.sh4{width:380px;height:380px;background:#7c5cfc;top:52%;right:18%;animation-delay:-13s;animation-duration:32s}
.sh5{width:220px;height:220px;background:var(--acc2);bottom:28%;right:-3%;animation-delay:-3s;animation-duration:24s}
.sh6{width:300px;height:300px;background:var(--acc3);top:-4%;right:28%;animation-delay:-7s;animation-duration:30s}
@keyframes floatSh {
  0%,100%{transform:translate(0,0) rotate(0deg)}
  25%{transform:translate(28px,-36px) rotate(4deg)}
  50%{transform:translate(-18px,18px) rotate(-3deg)}
  75%{transform:translate(14px,32px) rotate(3deg)}
}

/* ── NAV ── */
.nav { position:fixed; top:0; left:0; right:0; z-index:100; padding:18px 0; transition:all var(--t-base); }
.nav.scrolled { padding:12px 0; background:rgba(8,8,14,.9); backdrop-filter:blur(22px); border-bottom:1px solid var(--border); }
.nav-c { max-width:1200px; margin:0 auto; padding:0 28px; display:flex; align-items:center; justify-content:space-between; }
.logo { display:flex; align-items:center; gap:10px; font-family:var(--f-head); font-weight:800; font-size:1.25rem; cursor:pointer; }
.logo-ico { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; background:var(--grad); color:#fff; border-radius:var(--r-sm); font-size:.95rem; transition:transform var(--t-spring); }
.logo:hover .logo-ico { transform:rotate(180deg) scale(1.1); }
.nav-links { display:flex; gap:4px; }
.nl { padding:8px 16px; font-size:.88rem; font-weight:500; color:var(--txt2); border-radius:var(--r-full); transition:all var(--t-fast); cursor:pointer; background:none; border:none; }
.nl:hover,.nl.active { color:var(--txt); background:rgba(255,255,255,.06); }
.nav-cta { padding:10px 26px; font-size:.88rem; font-weight:700; color:#fff; background:var(--grad); border-radius:var(--r-full); cursor:pointer; transition:all var(--t-base); position:relative; overflow:hidden; border:none; }
.nav-cta:hover { transform:translateY(-2px); box-shadow:var(--sh-glow); }
.hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; z-index:120; padding:4px; background:none; border:none; }
.hamburger span { display:block; width:24px; height:2px; background:var(--txt); border-radius:2px; transition:all var(--t-base); transform-origin:center; }
.hamburger.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
.hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
.hamburger.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }
.mobile-menu { display:none; position:fixed; inset:0; background:rgba(8,8,14,.97); backdrop-filter:blur(24px); flex-direction:column; align-items:center; justify-content:center; gap:18px; z-index:108; }
.mobile-menu.open { display:flex; }
.mobile-menu .nl { font-size:1.3rem; padding:12px 28px; }

/* ── SECTIONS ── */
.section { padding:120px 0; position:relative; z-index:1; }
.container { max-width:1200px; margin:0 auto; padding:0 28px; }
.sec-head { text-align:center; margin-bottom:72px; }
.sec-tag { display:inline-block; font-size:.75rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--acc); background:rgba(124,92,252,.1); border:1px solid rgba(124,92,252,.2); padding:6px 18px; border-radius:var(--r-full); margin-bottom:20px; }
.sec-title { font-family:var(--f-head); font-size:clamp(1.9rem,4vw,3rem); font-weight:800; line-height:1.18; }
.sec-title em { font-style:normal; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.reveal { opacity:0; transform:translateY(36px); transition:opacity .75s cubic-bezier(.4,0,.2,1), transform .75s cubic-bezier(.4,0,.2,1); }
.reveal.visible { opacity:1; transform:none; }
.reveal-left { opacity:0; transform:translateX(-48px); transition:opacity .75s cubic-bezier(.4,0,.2,1), transform .75s cubic-bezier(.4,0,.2,1); }
.reveal-left.visible { opacity:1; transform:none; }
.reveal-right { opacity:0; transform:translateX(48px); transition:opacity .75s cubic-bezier(.4,0,.2,1), transform .75s cubic-bezier(.4,0,.2,1); }
.reveal-right.visible { opacity:1; transform:none; }

/* ── HERO ── */
.hero { min-height:100vh; display:flex; align-items:center; padding:100px 0 80px; position:relative; overflow:hidden; z-index:1; }
.hero-inner { max-width:1200px; margin:0 auto; padding:0 28px; width:100%; display:flex; align-items:center; gap:80px; }
.hero-content { flex:1; max-width:600px; }
.hero-badge { display:inline-flex; align-items:center; gap:10px; font-size:.83rem; font-weight:500; color:var(--txt2); background:rgba(255,255,255,.03); border:1px solid var(--border); padding:8px 18px; border-radius:var(--r-full); margin-bottom:30px; animation:fadeUp .7s .2s both; }
.badge-dot { width:8px; height:8px; background:#22c55e; border-radius:50%; animation:pulse 2s infinite; flex-shrink:0; }
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5);opacity:1}50%{box-shadow:0 0 0 6px rgba(34,197,94,0);opacity:.8}}
.hero-title { font-family:var(--f-head); font-size:clamp(2.8rem,6vw,4.8rem); font-weight:800; line-height:1.05; letter-spacing:-.02em; margin-bottom:26px; animation:fadeUp .8s .35s both; }
.t-grad { background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; position:relative; }
.t-grad::after { content:''; position:absolute; bottom:2px; left:0; right:0; height:3px; background:var(--grad); border-radius:2px; opacity:.35; }
.hero-desc { font-size:1.05rem; color:var(--txt2); line-height:1.75; margin-bottom:38px; animation:fadeUp .8s .5s both; }
.hero-acts { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:60px; animation:fadeUp .8s .65s both; }
.hero-stats { display:flex; align-items:center; gap:36px; animation:fadeUp .8s .8s both; }
.stat { text-align:left; }
.stat-n { font-family:var(--f-head); font-size:2rem; font-weight:800; color:var(--txt); line-height:1; }
.stat-suf { font-family:var(--f-head); font-size:1.4rem; font-weight:800; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.stat-l { display:block; font-size:.78rem; color:var(--txt3); margin-top:4px; }
.stat-div { width:1px; height:44px; background:var(--border); }
.scroll-ind { position:absolute; bottom:38px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:12px; font-size:.72rem; letter-spacing:.18em; text-transform:uppercase; color:var(--txt3); }
.scroll-line { width:1px; height:52px; background:linear-gradient(to bottom,var(--acc),transparent); animation:scrollPulse 2s infinite; }
@keyframes scrollPulse{0%,100%{opacity:1;transform:scaleY(1)}50%{opacity:.3;transform:scaleY(.6)}}

/* ── HERO 3D SCENE ── */
.hero-scene { flex:1; display:flex; align-items:center; justify-content:center; min-height:460px; position:relative; perspective:900px; animation:fadeLeft .9s .4s both; }
.cube-wrap { width:190px; height:190px; perspective:700px; }
.cube { width:100%; height:100%; position:relative; transform-style:preserve-3d; animation:spinCube 14s linear infinite; }
.cf { position:absolute; width:190px; height:190px; border:1.5px solid rgba(124,92,252,.32); background:rgba(124,92,252,.04); backdrop-filter:blur(4px); }
.cf-fr{transform:rotateY(0deg) translateZ(95px)}.cf-bk{transform:rotateY(180deg) translateZ(95px)}
.cf-rt{transform:rotateY(90deg) translateZ(95px)}.cf-lt{transform:rotateY(-90deg) translateZ(95px)}
.cf-tp{transform:rotateX(90deg) translateZ(95px)}.cf-bt{transform:rotateX(-90deg) translateZ(95px)}
@keyframes spinCube{0%{transform:rotateX(-20deg) rotateY(0deg)}100%{transform:rotateX(-20deg) rotateY(360deg)}}
.orbit { position:absolute; border-radius:50%; border:1px solid rgba(124,92,252,.14); }
.orb1{width:340px;height:340px;top:50%;left:50%;animation:orb1s 8s linear infinite}
.orb2{width:410px;height:410px;top:50%;left:50%;border-color:rgba(245,69,160,.11);animation:orb2s 13s linear infinite}
.orb3{width:290px;height:290px;top:50%;left:50%;border-color:rgba(0,212,255,.1);animation:orb3s 5.5s linear infinite}
.orb-dot { position:absolute; width:10px; height:10px; border-radius:50%; top:-5px; left:50%; background:var(--acc); box-shadow:0 0 14px var(--acc-glow),0 0 28px var(--acc-glow); }
.orb2 .orb-dot{background:var(--acc2);box-shadow:0 0 14px rgba(245,69,160,.45)}
.orb3 .orb-dot{background:var(--acc3);box-shadow:0 0 14px rgba(0,212,255,.45)}
@keyframes orb1s{from{transform:translate(-50%,-50%) rotateX(70deg) rotateZ(0deg)}to{transform:translate(-50%,-50%) rotateX(70deg) rotateZ(360deg)}}
@keyframes orb2s{from{transform:translate(-50%,-50%) rotateX(70deg) rotateZ(60deg)}to{transform:translate(-50%,-50%) rotateX(70deg) rotateZ(420deg)}}
@keyframes orb3s{from{transform:translate(-50%,-50%) rotateX(70deg) rotateZ(-30deg)}to{transform:translate(-50%,-50%) rotateX(70deg) rotateZ(330deg)}}

/* ── BTN ── */
.btn { display:inline-flex; align-items:center; gap:10px; padding:14px 30px; font-size:.93rem; font-weight:700; border-radius:var(--r-full); cursor:pointer; transition:all var(--t-base); position:relative; overflow:hidden; border:none; }
.btn-p { background:var(--grad); color:#fff; box-shadow:0 4px 22px var(--acc-glow); }
.btn-p:hover { transform:translateY(-3px); box-shadow:0 8px 32px var(--acc-glow); }
.btn-p svg { transition:transform var(--t-base); }
.btn-p:hover svg { transform:translate(3px,-3px); }
.btn-g { color:var(--txt); border:1px solid var(--border-h); background:rgba(255,255,255,.03); }
.btn-g:hover { background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.22); transform:translateY(-3px); }
.btn-full { width:100%; justify-content:center; }

/* ── ABOUT ── */
.about { background:var(--bg2); }
.about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
.about-lead { font-size:1.2rem; font-weight:500; color:var(--txt); margin-bottom:16px; line-height:1.65; }
.about-text p { color:var(--txt2); line-height:1.85; margin-bottom:28px; font-size:.97rem; }
.feats { display:flex; flex-direction:column; gap:20px; }
.feat { display:flex; gap:16px; padding:20px; border-radius:var(--r-md); border:1px solid var(--border); background:rgba(255,255,255,.015); transition:all var(--t-base); }
.feat:hover { border-color:var(--border-h); background:rgba(255,255,255,.035); transform:translateX(8px); }
.feat-ico { font-size:1.3rem; color:var(--acc); flex-shrink:0; padding-top:2px; }
.feat h4 { font-family:var(--f-head); font-size:.97rem; font-weight:700; margin-bottom:4px; }
.feat p { font-size:.87rem; color:var(--txt3); margin-bottom:0; line-height:1.5; }
.tilt-card { position:relative; width:100%; aspect-ratio:4/5; border-radius:var(--r-lg); overflow:hidden; border:1px solid var(--border); background:var(--surface); transition:transform var(--t-base); cursor:default; }
.tilt-card:hover { transform:perspective(800px) rotateX(3deg) rotateY(-4deg) scale(1.02); box-shadow:var(--sh-lg); }
.card-pat { position:absolute; inset:0; background:radial-gradient(circle at 20% 30%,rgba(124,92,252,.13) 0%,transparent 50%),radial-gradient(circle at 80% 70%,rgba(245,69,160,.1) 0%,transparent 50%),linear-gradient(135deg,rgba(255,255,255,.02) 25%,transparent 25%),linear-gradient(225deg,rgba(255,255,255,.02) 25%,transparent 25%); background-size:100%,100%,30px 30px,30px 30px; }
.card-cnt { position:absolute; bottom:0; left:0; right:0; padding:40px; background:linear-gradient(to top,rgba(8,8,14,.97) 0%,transparent 100%); }
.card-yr { display:inline-block; font-size:.72rem; font-weight:700; letter-spacing:.22em; color:var(--acc); background:rgba(124,92,252,.15); padding:4px 12px; border-radius:var(--r-full); margin-bottom:16px; }
.card-cnt h3 { font-family:var(--f-head); font-size:1.55rem; font-weight:800; line-height:1.3; margin-bottom:20px; }
.card-stats { display:flex; gap:32px; }
.card-stats div { display:flex; flex-direction:column; }
.card-stats strong { font-family:var(--f-head); font-size:1.45rem; font-weight:800; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.card-stats span { font-size:.78rem; color:var(--txt3); }

/* ── SERVICES ── */
.svc-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
.svc { border-radius:var(--r-lg); border:1px solid var(--border); padding:42px; background:rgba(255,255,255,.015); transition:all var(--t-base); position:relative; overflow:hidden; }
.svc::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--grad); transform:scaleX(0); transform-origin:left; transition:transform .6s cubic-bezier(.4,0,.2,1); }
.svc:hover { border-color:var(--border-h); background:rgba(255,255,255,.028); transform:translateY(-8px); box-shadow:var(--sh-lg); }
.svc:hover::before { transform:scaleX(1); }
.svc-num { font-family:var(--f-head); font-size:3rem; font-weight:900; color:rgba(255,255,255,.04); position:absolute; top:14px; right:22px; line-height:1; transition:color var(--t-base); pointer-events:none; }
.svc:hover .svc-num { color:rgba(124,92,252,.12); }
.svc-ico { display:inline-flex; align-items:center; justify-content:center; width:58px; height:58px; border-radius:var(--r-md); background:rgba(124,92,252,.08); border:1px solid rgba(124,92,252,.16); color:var(--acc); margin-bottom:24px; transition:all var(--t-base); }
.svc:hover .svc-ico { background:rgba(124,92,252,.16); box-shadow:0 0 22px var(--acc-glow); transform:scale(1.06); }
.svc h3 { font-family:var(--f-head); font-size:1.25rem; font-weight:800; margin-bottom:12px; transition:color var(--t-fast); }
.svc:hover h3 { color:var(--acc-h); }
.svc p { font-size:.92rem; color:var(--txt2); line-height:1.75; margin-bottom:20px; }
.tags { display:flex; gap:8px; flex-wrap:wrap; }
.tag { font-size:.72rem; font-weight:600; color:var(--txt3); background:rgba(255,255,255,.04); padding:4px 12px; border-radius:var(--r-full); border:1px solid var(--border); }

/* ── PORTFOLIO ── */
.portfolio { background:var(--bg2); }
.port-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
.port-card { border-radius:var(--r-lg); overflow:hidden; border:1px solid var(--border); background:var(--surface); transition:all var(--t-base); cursor:pointer; }
.port-card:hover { transform:translateY(-8px) rotateY(-1.5deg) rotateX(1.5deg); box-shadow:var(--sh-lg); border-color:var(--border-h); }
.port-img { height:280px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
.port-lg .port-img { height:340px; }
.port-info { padding:28px; }
.port-cat { font-size:.72rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--acc); margin-bottom:8px; display:block; }
.port-info h3 { font-family:var(--f-head); font-size:1.22rem; font-weight:800; margin-bottom:8px; transition:color var(--t-fast); }
.port-card:hover .port-info h3 { color:var(--acc-h); }
.port-info p { font-size:.88rem; color:var(--txt2); line-height:1.65; }

/* ── 3D PORTFOLIO SHAPES ── */
.p3d-cube{width:78px;height:78px;position:relative;transform-style:preserve-3d;animation:spinCube 10s linear infinite}
.pf{position:absolute;width:78px;height:78px;border:1.5px solid rgba(255,255,255,.26);background:rgba(255,255,255,.05)}
.pf-fr{transform:rotateY(0deg) translateZ(39px)}.pf-bk{transform:rotateY(180deg) translateZ(39px)}
.pf-lt{transform:rotateY(-90deg) translateZ(39px)}.pf-rt{transform:rotateY(90deg) translateZ(39px)}
.pf-tp{transform:rotateX(90deg) translateZ(39px)}.pf-bt{transform:rotateX(-90deg) translateZ(39px)}
.p3d-ring{width:98px;height:98px;position:relative;transform-style:preserve-3d;animation:spinCube 8s linear infinite}
.ring-s{position:absolute;width:98px;height:98px;border:2px solid rgba(255,255,255,.22);border-radius:50%}
.ring-s:nth-child(2){transform:rotateX(60deg)}.ring-s:nth-child(3){transform:rotateX(120deg)}
.p3d-pyramid{width:78px;height:78px;position:relative;transform-style:preserve-3d;animation:spinCube 12s linear infinite}
.pyf{position:absolute;width:0;height:0;border-left:39px solid transparent;border-right:39px solid transparent;border-bottom:68px solid rgba(255,255,255,.09);transform-origin:bottom center}
.py-fr{transform:rotateX(30deg) translateZ(19px)}.py-bk{transform:rotateY(180deg) rotateX(30deg) translateZ(19px)}
.py-lt{transform:rotateY(-90deg) rotateX(30deg) translateZ(19px)}.py-rt{transform:rotateY(90deg) rotateX(30deg) translateZ(19px)}
.py-bs{width:78px;height:78px;position:absolute;background:rgba(255,255,255,.05);transform:rotateX(90deg) translateZ(-34px)}
.p3d-sphere{width:98px;height:98px;position:relative;transform-style:preserve-3d;animation:spinCube 14s linear infinite}
.sph-r{position:absolute;inset:0;border:1.5px solid rgba(255,255,255,.16);border-radius:50%}
.sph-r2{transform:rotateY(60deg)}.sph-r3{transform:rotateY(120deg)}
.sph-core{position:absolute;top:50%;left:50%;width:20px;height:20px;transform:translate(-50%,-50%);background:var(--grad);border-radius:50%;box-shadow:0 0 22px var(--acc-glow),0 0 44px var(--acc-glow)}

/* ── TESTIMONIALS ── */
.testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
.testi { padding:36px; border-radius:var(--r-lg); border:1px solid var(--border); background:rgba(255,255,255,.015); transition:all var(--t-base); display:flex; flex-direction:column; }
.testi:hover { border-color:var(--border-h); transform:translateY(-6px); box-shadow:0 20px 50px rgba(0,0,0,.45); }
.t-stars { color:#fbbf24; font-size:1.05rem; letter-spacing:2px; margin-bottom:20px; }
.t-quote { font-size:.92rem; color:var(--txt2); line-height:1.82; font-style:italic; flex:1; margin-bottom:24px; position:relative; }
.t-quote::before { content:'"'; position:absolute; top:-18px; left:-4px; font-size:3.8rem; font-family:Georgia,serif; color:rgba(124,92,252,.14); line-height:1; }
.t-author { display:flex; align-items:center; gap:14px; padding-top:20px; border-top:1px solid var(--border); }
.t-av { width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:.82rem; color:#fff; flex-shrink:0; }
.t-author strong { display:block; font-size:.93rem; }
.t-author span { font-size:.78rem; color:var(--txt3); }

/* ── MARQUEE ── */
.marquee-sec { position:relative; z-index:1; padding:34px 0; overflow:hidden; border-top:1px solid var(--border); border-bottom:1px solid var(--border); background:var(--bg2); }
.marquee-track { display:flex; gap:40px; white-space:nowrap; animation:marquee 22s linear infinite; width:max-content; }
.marquee-track span { font-family:var(--f-head); font-size:2.8rem; font-weight:900; color:rgba(255,255,255,.04); text-transform:uppercase; letter-spacing:.05em; -webkit-text-stroke:1px rgba(255,255,255,.08); }
.marquee-track span:nth-child(even) { font-size:1.4rem; color:rgba(124,92,252,.16); -webkit-text-stroke:none; align-self:center; }
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ── CONTACT ── */
.contact-wrap { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
.c-info .sec-title { text-align:left; margin-bottom:18px; font-size:clamp(1.6rem,3.5vw,2.4rem); }
.c-info .sec-tag { margin-bottom:14px; display:inline-block; }
.c-info > p { color:var(--txt2); margin-bottom:36px; line-height:1.75; font-size:.95rem; }
.c-details { display:flex; flex-direction:column; gap:14px; margin-bottom:32px; }
.c-link { display:flex; align-items:center; gap:12px; font-size:.92rem; color:var(--txt2); padding:12px 16px; border-radius:var(--r-md); border:1px solid transparent; transition:all var(--t-fast); }
.c-link:hover { color:var(--txt); background:rgba(255,255,255,.03); border-color:var(--border); transform:translateX(8px); }
.c-link-ico { font-size:1.1rem; width:24px; text-align:center; }
.socials { display:flex; gap:12px; }
.soc { display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:50%; border:1px solid var(--border); color:var(--txt2); font-size:.88rem; font-weight:800; transition:all var(--t-base); }
.soc:hover { border-color:var(--acc); color:var(--acc); background:rgba(124,92,252,.08); transform:translateY(-4px); box-shadow:0 4px 16px var(--acc-glow); }
.c-form-wrap { padding:40px; border-radius:var(--r-lg); border:1px solid var(--border); background:rgba(255,255,255,.015); }
.fg { margin-bottom:20px; }
.fg label { display:block; font-size:.82rem; font-weight:700; color:var(--txt2); margin-bottom:8px; letter-spacing:.05em; text-transform:uppercase; }
.fg input, .fg select, .fg textarea { width:100%; padding:14px 18px; border-radius:var(--r-md); border:1px solid var(--border); background:rgba(255,255,255,.03); color:var(--txt); font-size:.93rem; transition:all var(--t-fast); }
.fg input:focus, .fg select:focus, .fg textarea:focus { border-color:var(--acc); box-shadow:0 0 0 3px rgba(124,92,252,.28); background:rgba(255,255,255,.05); }
.fg input::placeholder, .fg textarea::placeholder { color:var(--txt3); }
.fg select { appearance:none; cursor:pointer; background-image:url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238888a0' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 16px center; }
.fg select option { background:var(--surface); color:var(--txt); }
.fg textarea { resize:vertical; min-height:110px; }
.submit-btn { display:flex; align-items:center; justify-content:center; gap:10px; width:100%; padding:14px 30px; font-size:.93rem; font-weight:700; border-radius:var(--r-full); cursor:pointer; border:none; color:#fff; transition:all var(--t-base); }
.submit-btn:hover { transform:translateY(-3px); }
.submit-btn.idle { background:var(--grad); box-shadow:0 4px 22px var(--acc-glow); }
.submit-btn.sending { background:rgba(124,92,252,.5); cursor:not-allowed; }
.submit-btn.sent { background:linear-gradient(135deg,#22c55e,#16a34a); }

/* ── FOOTER ── */
.footer { position:relative; z-index:1; padding:60px 0 0; background:var(--bg2); border-top:1px solid var(--border); }
.foot-grid { display:grid; grid-template-columns:2fr 1fr 1fr; gap:60px; padding-bottom:48px; }
.foot-brand p { color:var(--txt2); font-size:.88rem; margin-top:16px; line-height:1.65; max-width:300px; }
.foot-g h4 { font-family:var(--f-head); font-size:.88rem; font-weight:700; margin-bottom:18px; color:var(--txt); }
.foot-g li { margin-bottom:10px; }
.foot-g a { font-size:.88rem; color:var(--txt2); transition:all var(--t-fast); }
.foot-g a:hover { color:var(--acc); padding-left:4px; }
.foot-bot { display:flex; justify-content:space-between; align-items:center; padding:20px 0; border-top:1px solid var(--border); font-size:.83rem; color:var(--txt3); }
.foot-bot-links { display:flex; gap:24px; }
.foot-bot-links a { color:var(--txt3); transition:color var(--t-fast); }
.foot-bot-links a:hover { color:var(--txt2); }

/* ── KEYFRAMES ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
@keyframes fadeLeft{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:none}}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .hero-inner{flex-direction:column;text-align:center}
  .hero-content{max-width:100%}
  .hero-acts{justify-content:center}
  .hero-stats{justify-content:center}
  .hero-scene{min-height:320px}
  .about-grid,.contact-wrap{grid-template-columns:1fr;gap:48px}
  .c-info .sec-title,.c-info{text-align:center}
  .c-details{align-items:center}
  .socials{justify-content:center}
  .svc-grid,.port-grid{grid-template-columns:1fr}
  .testi-grid{grid-template-columns:1fr}
  .foot-grid{grid-template-columns:1fr;gap:36px}
}
@media(max-width:768px){
  .section{padding:80px 0}
  .sec-head{margin-bottom:48px}
  .nav-links{display:none!important}
  .hamburger{display:flex}
  .nav-cta{display:none}
  .hero-stats{flex-direction:column;gap:20px}
  .stat-div{width:40px;height:1px}
  .scroll-ind{display:none}
  .marquee-track span{font-size:2rem}
  .foot-bot{flex-direction:column;gap:12px;text-align:center}
}
@media(max-width:480px){
  .container,.hero-inner{padding:0 18px}
  .svc{padding:28px}
  .testi{padding:28px}
  .c-form-wrap{padding:24px}
}
`;


function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.13, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounter(target, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 4);
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.floor(ease(p) * target));
          if (p < 1) requestAnimationFrame(tick);
          else setValue(target);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return [value, ref];
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
}




function Scene() {
  return (
    <div className="hero-scene">
      <div className="cube-wrap">
        <div className="cube">
          <div className="cf cf-fr" /><div className="cf cf-bk" />
          <div className="cf cf-rt" /><div className="cf cf-lt" />
          <div className="cf cf-tp" /><div className="cf cf-bt" />
        </div>
      </div>
      <div className="orbit orb1"><div className="orb-dot" /></div>
      <div className="orbit orb2"><div className="orb-dot" /></div>
      <div className="orbit orb3"><div className="orb-dot" /></div>
    </div>
  );
}

/* COUNTER STAT */
function Stat({ to, suffix, label }) {
  const [val, ref] = useCounter(to);
  return (
    <div className="stat" ref={ref}>
      <span className="stat-n">
        {val}<span className="stat-suf">{suffix}</span>
      </span>
      <span className="stat-l">{label}</span>
    </div>
  );
}


const Shape3D = {
  cube: () => (
    <div className="p3d-cube">
      <div className="pf pf-fr" /><div className="pf pf-bk" />
      <div className="pf pf-lt" /><div className="pf pf-rt" />
      <div className="pf pf-tp" /><div className="pf pf-bt" />
    </div>
  ),
  ring: () => (
    <div className="p3d-ring">
      <div className="ring-s" /><div className="ring-s" /><div className="ring-s" />
    </div>
  ),
  pyramid: () => (
    <div className="p3d-pyramid">
      <div className="pyf py-fr" /><div className="pyf py-bk" />
      <div className="pyf py-lt" /><div className="pyf py-rt" />
      <div className="py-bs" />
    </div>
  ),
  sphere: () => (
    <div className="p3d-sphere">
      <div className="sph-r" /><div className="sph-r sph-r2" /><div className="sph-r sph-r3" />
      <div className="sph-core" />
    </div>
  ),
};


function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const links = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Work" },
    { id: "testimonials", label: "Clients" },
    { id: "contact", label: "Contact" },
  ];

  const go = (id) => { setOpen(false); scrollTo(id); };

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-c">
          <button className="logo" onClick={() => go("hero")}>
            <span className="logo-ico">◆</span>
            <span>SUBRATA DEV</span>
          </button>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.id}>
                <button className="nl" onClick={() => go(l.id)}>{l.label}</button>
              </li>
            ))}
          </ul>
          <button className="nav-cta" onClick={() => go("contact")}>Let's Talk</button>
          <button
            className={`hamburger${open ? " open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {links.map((l) => (
          <button key={l.id} className="nl" onClick={() => go(l.id)}>
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
}


function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for Projects — 2026
          </div>
          <h1 className="hero-title">
            We Craft<br />
            <span className="t-grad">Digital</span><br />
            Experiences
          </h1>
          <p className="hero-desc">
            Award-winning digital agency specialising in immersive web design,
            brand strategy, and cutting-edge creative technology.
          </p>
          <div className="hero-acts">
            <button className="btn btn-p" onClick={() => scrollTo("portfolio")}>
              <span>View My Work</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
            <button className="btn btn-g" onClick={() => scrollTo("about")}>
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            <Stat to={150} suffix="+" label="Projects Delivered" />
            <div className="stat-div" />
            <Stat to={4} suffix="" label="Years Experience" />
            <div className="stat-div" />
            <Stat to={98} suffix="%" label="Client Satisfaction" />
          </div>
        </div>
        <Scene />
      </div>
      <div className="scroll-ind">
        <div className="scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}


function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="sec-head reveal">
          <span className="sec-tag">About Us</span>
          <h2 className="sec-title">
            We bring <em>ideas</em> to life<br />through design &amp; code
          </h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal-left">
            <p className="about-lead">
              SUBRATA Studio is a collective of designers, developers, and
              strategists who believe in the power of exceptional digital experiences.
            </p>
            <p>
              Founded in 2026, we've partnered with startups and Fortune 500
              companies alike, delivering solutions that push creative boundaries
              while driving measurable results.
            </p>
            <div className="feats">
              <div className="feat">
                <div className="feat-ico">✦</div>
                <div>
                  <h4>Design-First Approach</h4>
                  <p>Every project starts with deep research and human-centered design thinking.</p>
                </div>
              </div>
              <div className="feat">
                <div className="feat-ico">◈</div>
                <div>
                  <h4>Technical Excellence</h4>
                  <p>Clean, performant code built with modern best practices and scalability in mind.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal-right">
            <div className="tilt-card">
              <div className="card-pat" />
              <div className="card-cnt">
                <span className="card-yr">EST. 2026</span>
                <h3>Crafting the<br />Future of Digital</h3>
                <div className="card-stats">
                  <div><strong>35+</strong><span>Team Members</span></div>
                  <div><strong>4</strong><span>Global Offices</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


const SERVICES = [
  {
    n: "01",
    title: "Web Design & Development",
    desc: "Responsive websites that captivate users and drive conversions through intuitive design.",
    tags: ["UI/UX Design", "Frontend Dev", "Backend Dev", "Full Stack"],
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Brand Identity & Strategy",
    desc: "Comprehensive branding solutions that define your visual language and create lasting market impressions.",
    tags: ["Logo Design", "Brand Guide", "Strategy"],
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18M3 12h18" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Interactive Experiences",
    desc: "Immersive 3D experiences, animations, and interactive installations that push creative boundaries.",
    tags: ["3D/WebGL", "Animation", "AR/VR"],
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Performance & Growth",
    desc: "Data-driven optimisation strategies that accelerate growth and maximise digital performance.",
    tags: ["SEO", "Analytics", "Conversion"],
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="sec-head reveal">
          <span className="sec-tag">What We Do</span>
          <h2 className="sec-title">
            Services tailored to<br /><em>elevate</em> your brand
          </h2>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <div className="svc reveal" key={s.n}>
              <div className="svc-num">{s.n}</div>
              <div className="svc-ico">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="tags">
                {s.tags.map((t) => <li className="tag" key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


const PROJECTS = [
  {
    id: 1, large: true,
    grad: "linear-gradient(135deg,#667eea,#764ba2)",
    shape: "cube", cat: "Web Design / Development",
    title: "Quantum Finance Platform",
    desc: "A next-gen fintech dashboard with real-time analytics and AI-powered insights.",
  },
  {
    id: 2, large: false,
    grad: "linear-gradient(135deg,#f093fb,#f5576c)",
    shape: "ring", cat: "Brand Identity",
    title: "Aurora Health",
    desc: "Complete rebrand for a wellness tech startup.",
  },
  {
    id: 3, large: false,
    grad: "linear-gradient(135deg,#4facfe,#00f2fe)",
    shape: "pyramid", cat: "Interactive / 3D",
    title: "SkyVault Experience",
    desc: "Immersive product showcase with 3D interactions.",
  },
  {
    id: 4, large: true,
    grad: "linear-gradient(135deg,#43e97b,#38f9d7)",
    shape: "sphere", cat: "App Design / Strategy",
    title: "EcoTrack Mobile App",
    desc: "An award-winning sustainability tracking platform with gamified user engagement.",
  },
];

function Portfolio() {
  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <div className="sec-head reveal">
          <span className="sec-tag">Our Work</span>
          <h2 className="sec-title">
            Selected <em>projects</em> that<br />define our craft
          </h2>
        </div>
        <div className="port-grid">
          {PROJECTS.map((p) => {
            const ShapeComp = Shape3D[p.shape];
            return (
              <div className={`port-card${p.large ? " port-lg" : ""} reveal`} key={p.id}>
                <div className="port-img" style={{ background: p.grad }}>
                  <div style={{ perspective: "500px" }}><ShapeComp /></div>
                </div>
                <div className="port-info">
                  <span className="port-cat">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const TESTI = [
  {
    initials: "SG", hue: 250,
    name: "Subrata Garai", role: "CEO, Web Development",
    text: "Web development is the process of building and maintaining websites — from simple plain-text pages to complex web applications and social network services.",
  },
  {
    initials: "AM", hue: 340,
    name: "Alice Muhuhu", role: "Founder, Aurora Health",
    text: "Working with this team was an absolute game-changer. They didn't just build us a website — they crafted an experience that our users love. Truly world-class work.",
  },
  {
    initials: "RS", hue: 180,
    name: "Roshmik Saha", role: "CTO, SkyVault Technologies",
    text: "The interactive experience created for our product launch was nothing short of spectacular. It generated massive buzz and set a new industry standard.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="sec-head reveal">
          <span className="sec-tag">Testimonials</span>
          <h2 className="sec-title">
            Trusted by <em>industry</em><br />leaders worldwide
          </h2>
        </div>
        <div className="testi-grid">
          {TESTI.map((t) => (
            <div className="testi reveal" key={t.name}>
              <div className="t-stars">★★★★★</div>
              <p className="t-quote">"{t.text}"</p>
              <div className="t-author">
                <div
                  className="t-av"
                  style={{ background: `linear-gradient(135deg,hsl(${t.hue},80%,60%),hsl(${t.hue + 40},80%,50%))` }}
                >
                  {t.initials}
                </div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MARQUEE_ITEMS = [
  "UI/UX Design", "◆",
  "Frontend Development", "◆",
  "Backend Development", "◆",
  "Full Stack Development", "◆",
];

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-sec" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => <span key={i}>{item}</span>)}
      </div>
    </div>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", type: "", message: "" });
      }, 3000);
    }, 1500);
  };

  const btnLabel =
    status === "idle" ? "Send Message" :
      status === "sending" ? "Sending…" :
        "✓ Message Sent!";

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-wrap">
          <div className="c-info reveal-left">
            <span className="sec-tag">Get in Touch</span>
            <h2 className="sec-title">
              Let's build<br />something <em>amazing</em><br />together
            </h2>
            <p>
              Ready to transform your digital presence? Let's discuss your project
              and explore how we can create something extraordinary.
            </p>
            <div className="c-details">
              <a href="mailto:Subratagarai514@gmail.com" className="c-link">
                <span className="c-link-ico">✉</span>Subratagarai514@gmail.com
              </a>
              <a href="tel:+918918808600" className="c-link">
                <span className="c-link-ico">☎</span>+91 89188 08600
              </a>
              <div className="c-link">
                <span className="c-link-ico">◎</span>Bansdiha, Garbeta-III, West Bengal
              </div>
            </div>
            <div className="socials">
              {["𝕏", "in", "◉", "⌥"].map((s, i) => (
                <a key={i} href="#" className="soc">{s}</a>
              ))}
            </div>
          </div>
          <div className="c-form-wrap reveal-right">
            <form onSubmit={submit}>
              <div className="fg">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Your name"
                  required value={form.name} onChange={handle} />
              </div>
              <div className="fg">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="example@example.com"
                  required value={form.email} onChange={handle} />
              </div>
              <div className="fg">
                <label htmlFor="type">Project Type</label>
                <select id="type" name="type" value={form.type} onChange={handle}>
                  <option value="" disabled>Select a service</option>
                  <option>Web Design &amp; Development</option>
                  <option>UI/UX Design</option>
                  <option>Frontend Development</option>
                  <option>Backend Development</option>
                  <option>Full Stack Development</option>
                  <option>Brand Identity</option>
                  <option>Interactive Experience</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="fg">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" name="message" rows={4}
                  placeholder="Tell us about your project…"
                  required value={form.message} onChange={handle} />
              </div>
              <button type="submit" className={`submit-btn ${status}`} disabled={status !== "idle"}>
                {btnLabel}
                {status === "idle" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <button className="logo" onClick={() => scrollTo("hero")}>
              <span className="logo-ico">◆</span>
              <span>SUBRATA DEV</span>
            </button>
            <p>Crafting digital experiences that inspire, engage, and deliver results since 2026.</p>
          </div>
          <div className="foot-g">
            <h4>Company</h4>
            <ul>
              {[["about", "About"], ["services", "Services"], ["portfolio", "Work"], ["#", "Careers"]].map(
                ([id, label]) => (
                  <li key={label}>
                    <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="foot-g">
            <h4>Resources</h4>
            <ul>
              {["Blog", "Case Studies", "Newsletter", "Press Kit"].map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <p>© 2026 SUBRATA Studio. All rights reserved.</p>
          <div className="foot-bot-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useReveal();

  return (
    <>
      <div className="shapes" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className={`sh sh${n}`} />
        ))}
      </div>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}