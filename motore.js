/*!
 * Dashboard Giacomel – motore grafico
 * Version 2.1.0 · build 2026-11-18
 * Developed by Andrea Carminati. All rights reserved.
 * Questo file disegna le dashboard: l'HTML generato contiene solo l'oggetto DASHBOARD con i dati.
 */
(function () {
"use strict";
const ENGINE = { name: "Dashboard Giacomel", version: "2.1.0", build: "2026-11-18", minSkill: "6.1", author: "Andrea Carminati" };
ENGINE.signature = `${ENGINE.name} engine v${ENGINE.version} (${ENGINE.build}) – Developed by ${ENGINE.author}`;
if (window.DashboardGiacomel) return;
window.DashboardGiacomel = Object.freeze(Object.assign({}, ENGINE));
const CSS = "*{box-sizing:border-box;margin:0;padding:0}\nhtml,body,#app{width:100%;height:100%;overflow:hidden}\nbody{font-family:'Poppins',system-ui,sans-serif;-webkit-font-smoothing:antialiased;background:var(--bg)}\nbutton{font:inherit;border:0;background:none;cursor:pointer;color:inherit}\n:root{--a1:#fd8534;--a2:#fdba8c;--ok:#10b981;--ko:#ef4444}\nhtml[data-accent=blu]{--a1:#3b82f6;--a2:#93c5fd}\nhtml[data-theme=dark]{--bg:#24282f;--card:#2e333b;--border:#3a4049;--title:#fff;--sub:#a7adb7;--grid:#3a4049;--soft:#373d46}\nhtml[data-theme=light]{--bg:#f4f5f8;--card:#fff;--border:#e8eaef;--title:#111827;--sub:#6b7280;--grid:#eef0f3;--soft:#f3f4f6}\nhtml[data-brand=grafite]{--sb:#1c1f24;--sbact:#244582;--glow:#2c3038}\nhtml[data-brand=blu]{--sb:#244582;--sbact:#3b82f6;--glow:#2f5aa8}\n.num{font-variant-numeric:tabular-nums}\n.shell{display:flex;width:100%;height:100%;background:var(--bg);transition:background .3s}\n#sb{position:relative;flex-shrink:0;width:240px;height:100%;background:var(--sb);color:#fff;border-radius:0 28px 28px 0;overflow:hidden;z-index:5;box-shadow:4px 0 30px rgba(0,0,0,.18);transition:width .9s cubic-bezier(.22,1,.36,1),border-radius .9s}\n.v-home #sb,.v-end #sb{width:100%;border-radius:0}\n.v-app.collapsed #sb{width:76px}\n.splash{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .4s;background:radial-gradient(60% 50% at 50% 45%,var(--glow),transparent 70%)}\n.v-home .splash,.v-end .splash{opacity:1;pointer-events:auto;transition:opacity .7s .35s}\n.splash-in{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 24px}\n.v-home .end-only,.v-end .home-only,.v-app .end-only,.v-app .home-only{display:none}\n.logo img{display:block;width:150px;filter:brightness(0) invert(1)}\n.logo.big img{width:min(70vw,260px)}\n.logo-txt{display:none;font-weight:600;font-size:18px;letter-spacing:-.01em;color:#fff}\n.logo.big .logo-txt{font-size:42px}\n.line{width:40px;height:2px;border-radius:2px;background:var(--a1);margin:32px 0}\n.sp1{font-size:14px;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.65)}\n.sp2{font-size:12px;letter-spacing:.2em;color:rgba(255,255,255,.4);margin-top:8px}\n.start{margin-top:48px;display:inline-flex;align-items:center;gap:14px;padding:11px 12px 11px 30px;border-radius:999px;background:#fff;color:var(--sb);font-weight:600;font-size:15px;box-shadow:0 10px 30px rgba(0,0,0,.25);transition:transform .25s}\n.start:hover{background:#f3f4f6}.start span{transition:transform .25s}.start:hover span{transform:translateX(3px)}\n.start span{width:30px;height:30px;border-radius:50%;background:var(--a1);color:#fff;display:flex;align-items:center;justify-content:center}\n.thanks{font-weight:200;font-size:clamp(26px,4vw,52px);letter-spacing:.25em;color:#fff;animation:pulse 3s ease-in-out infinite}\n@keyframes pulse{50%{opacity:.55}}\n.restart{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;color:rgba(255,255,255,.45);font-size:10px;letter-spacing:.3em;text-transform:uppercase;transition:color .3s}\n.restart:hover{color:#fff}\n.corp{position:absolute;bottom:40px;right:40px;font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:rgba(255,255,255,.3)}\n.menu{position:absolute;inset:0;display:flex;flex-direction:column;padding:20px 16px;opacity:0;pointer-events:none;transition:opacity .3s}\n.v-app .menu{opacity:1;pointer-events:auto;transition:opacity .6s .5s}\n.mtop{display:flex;justify-content:flex-start;margin:-6px 0 14px -6px}\n.collapsed .mtop{justify-content:center;margin:-6px 0 20px}\n.mend{display:flex;justify-content:flex-start}\n.collapsed .mend{padding-left:8px}\n.v-app.collapsed #sb{overflow:visible}\n.enddot{position:relative;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.07);transition:background .25s}\n.enddot svg{width:10px;height:10px;stroke:#ef4444}\n.enddot span{position:absolute;left:38px;top:50%;transform:translate(-4px,-50%);font-size:12px;font-weight:300;letter-spacing:.06em;white-space:nowrap;color:#fff;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s}\n.collapsed .enddot span{left:62px;color:var(--title)}\n.enddot:hover{background:rgba(255,255,255,.14)}\n.enddot:hover span{opacity:1;transform:translate(0,-50%)}\n.colbtn{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.55);transition:background .2s,color .2s}\n.colbtn:hover{background:rgba(255,255,255,.1);color:#fff}\n.mlogo{display:flex;justify-content:center;margin-bottom:30px}\n.collapsed .mlogo{display:none}\nnav{display:flex;flex-direction:column;gap:8px}\n.nb{display:flex;align-items:center;width:100%;text-align:left;padding:12px 16px;border-radius:12px;font-size:12px;font-weight:500;color:rgba(255,255,255,.75);transition:background .2s,color .2s}\n.nb:hover{background:rgba(255,255,255,.08);color:#fff}\n.nb.on{background:var(--sbact);color:#fff;box-shadow:0 4px 12px rgba(0,0,0,.18)}\n.nn{display:none}\n.collapsed .nb{justify-content:center;padding:12px 0}\n.collapsed .nn{display:block;font-weight:600}\n.collapsed .nt{display:none}\n.mbot{margin-top:auto;display:flex;flex-direction:column;gap:16px}\n.prog .ph{display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,.6);margin-bottom:6px}\n.pt{height:3px;border-radius:3px;background:rgba(255,255,255,.14);overflow:hidden}\n.pf{height:100%;border-radius:3px;background:rgba(255,255,255,.75);transition:width .12s linear}\n.collapsed .pl{display:none}\n.collapsed .prog .ph{justify-content:center}\n.mode{display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid rgba(255,255,255,.1)}\n.ml{font-size:10px;color:rgba(255,255,255,.7)}\n.collapsed .mode{justify-content:center}\n.collapsed .ml{display:none}\n.sw{position:relative;flex-shrink:0;width:56px;height:28px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:space-between;padding:0 7px;color:rgba(255,255,255,.55);transition:background .25s}\nhtml[data-theme=light] .sw{background:#3b82f6;border-color:#3b82f6}\n.sw svg{width:12px;height:12px}\n.knob{position:absolute;top:1px;left:2px;width:24px;height:24px;border-radius:50%;background:#fff;color:var(--sb);box-shadow:0 1px 3px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;transition:left .25s}\nhtml[data-theme=light] .knob{left:28px;color:#3b82f6}\n.mper{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.45);text-align:center}\n.mcorp{font-size:9px;color:rgba(255,255,255,.3);text-align:center;margin-top:-10px}\n.enddot{position:relative;z-index:30;flex-shrink:0}\n.collapsed .mper,.collapsed .mcorp{display:none}\n#main{flex:1;min-width:0;height:100%;overflow-y:auto;overflow-anchor:none;overflow-x:hidden;padding:40px;opacity:1;transition:opacity .5s .5s}\n.v-home #main,.v-end #main{opacity:0;padding:0;overflow:hidden;transition:none}\n.page{display:flex;flex-direction:column;gap:24px;padding-bottom:48px}\n.cap{font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--a1)}\n.phd h1{font-size:30px;font-weight:700;line-height:1.2;margin-top:4px;color:var(--title)}\n.phd p{font-size:14px;font-weight:300;color:var(--sub);margin-top:4px}\n.hd{font-size:22px;font-weight:700;color:var(--a1);margin-top:12px}\n.card{min-width:0;padding:24px;border-radius:18px;background:var(--card);border:1px solid var(--border);color:var(--title);transition:background .3s}\n.card.dark{background:#16181c;border-color:color-mix(in srgb,var(--a1) 30%,transparent);color:#fff}\n.ch{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:18px}\n.ct{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--sub)}\n.card.dark .ct{color:var(--a1)}\n.cs{font-size:12px;font-weight:300;color:var(--sub);margin-top:2px}\n.kpis{display:grid;gap:20px;grid-template-columns:repeat(var(--n),minmax(0,1fr))}\n.cols{display:grid;gap:24px;grid-template-columns:repeat(var(--n),minmax(0,1fr))}\n@media(max-width:1000px){.kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.cols{grid-template-columns:1fr}}\n.kpi{min-width:0;padding:20px 22px;border-radius:18px;background:var(--card);border:1px solid var(--border)}\n.kpi.hl{background:color-mix(in srgb,var(--a1) 9%,var(--card));border-color:color-mix(in srgb,var(--a1) 45%,transparent)}\n.kl{display:flex;align-items:center;gap:8px;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--sub)}\n.kl::before{content:'';flex-shrink:0;width:6px;height:6px;border-radius:50%;background:var(--a1)}\n.kpi.hl .kl{color:var(--a1)}\n.kvw{margin-top:10px;overflow:hidden}\n.kv{display:inline-block;white-space:nowrap;font-size:40px;font-weight:700;line-height:1.15;color:var(--title)}\n.kv small{font-size:.5em;font-weight:600;color:var(--a1);margin-left:8px}\n.kd{display:block;font-size:12px;font-weight:600;margin-top:4px;color:var(--sub)}\n.kd.ok{color:var(--ok)}.kd.ko{color:var(--ko)}\n.kn{display:block;font-size:11px;font-weight:300;color:var(--sub);margin-top:4px}\n.btn{padding:6px 12px;border-radius:8px;background:var(--soft);color:var(--title);font-size:11px;font-weight:600;white-space:nowrap;transition:background .2s}\n.btn:hover{background:var(--border)}\n.sw3{flex-shrink:0;display:flex;gap:2px;padding:2px;border-radius:9px;background:var(--soft)}\n.sw3 button{padding:4px 9px;border-radius:7px;font-size:10px;font-weight:500;color:var(--sub)}\n.sw3 button.on{background:var(--card);color:var(--title);box-shadow:0 1px 3px rgba(0,0,0,.15)}\n.tw{overflow-x:auto}\ntable{width:100%;border-collapse:collapse;font-size:13px}\nth{padding:12px 14px;text-align:left;white-space:nowrap;background:var(--soft);color:var(--sub);font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}\nth:first-child{border-radius:10px 0 0 10px}th:last-child{border-radius:0 10px 10px 0}\ntd{padding:12px 14px;text-align:left;border-bottom:1px solid var(--border);color:var(--title);font-weight:300}\ntd:first-child{white-space:nowrap}\nth.r,td.r{text-align:right}\ntd.r{font-weight:500;white-space:nowrap;font-variant-numeric:tabular-nums}\nth.w,td.w{min-width:20rem}\ntr.hl td{color:var(--a1);font-weight:700}\ntr.tot td{font-weight:700;border-bottom:0;background:var(--soft)}\n.dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--a1);margin-right:10px;vertical-align:middle}\n.more{font-size:11px;font-weight:300;color:var(--sub);text-align:right;margin-top:10px}\nsvg text{font-family:inherit}\n.ax{font-size:11px;fill:var(--sub)}\n.vl{font-size:11px;font-weight:600;fill:var(--title)}\n.lg{display:flex;flex-wrap:wrap;gap:16px;font-size:11px;color:var(--sub);margin-top:12px}\n.lg i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px;vertical-align:middle}\n.hb{display:flex;flex-direction:column;gap:14px}\n.hr{display:flex;align-items:center;gap:16px;font-size:13px}\n.hn{width:130px;flex-shrink:0;font-weight:500}\n.hbs{flex:1;display:flex;flex-direction:column;gap:4px}\n.ht{height:10px;border-radius:99px;background:var(--soft)}\n.card.dark .ht{background:rgba(255,255,255,.1)}\n.hf{height:100%;border-radius:99px}\n.hv{min-width:70px;text-align:right;font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums}\n.seg{display:flex;gap:4px;height:12px;border-radius:99px;overflow:hidden;margin-bottom:18px}\n.chips{display:grid;gap:12px;grid-template-columns:repeat(var(--n),minmax(0,1fr))}\n.chip{padding:12px 16px;border-radius:12px;background:var(--soft);font-size:13px;border:1px solid transparent}\n.chip.on{background:color-mix(in srgb,var(--a1) 10%,var(--card));border-color:color-mix(in srgb,var(--a1) 55%,transparent);color:var(--a1)}\n.chip em{font-style:normal;font-size:11px;color:var(--sub)}\n.li{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid var(--border);font-size:13px}\n.li:first-child{border-top:0}\n.lt{display:flex;align-items:center;gap:12px;min-width:0}\n.lt b{font-weight:500}\n.lt small{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:var(--sub)}\n.lv{font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums}\n.ins{padding:16px 20px;border-radius:14px;background:var(--card);border:1px solid var(--border);border-left:3px solid var(--a1)}\n.il{display:block;margin-bottom:8px;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--a1)}\n.ins blockquote{margin-bottom:6px;font-size:14px;font-style:italic;font-weight:300;line-height:1.6;color:var(--title)}\n.ins p{font-size:14px;font-weight:300;line-height:1.6;color:var(--sub)}\n.tx{font-size:14px;font-weight:300;line-height:1.6}\n.warn{display:flex;align-items:center;gap:12px;padding:14px 20px;border-radius:14px;background:color-mix(in srgb,var(--a1) 14%,var(--card));border:1px solid color-mix(in srgb,var(--a1) 60%,transparent);color:var(--a1);font-size:14px;font-weight:600;line-height:1.4}\n.warn svg{flex-shrink:0;width:20px;height:20px}\n.ring{display:flex;flex-direction:column;align-items:center}\n.rv{font-size:30px;font-weight:700;fill:var(--title)}\n.rl{font-size:10px;letter-spacing:.15em;text-transform:uppercase;fill:var(--sub)}\n.rn{font-size:13px;color:var(--sub);margin-top:8px}\n.ov{position:fixed;inset:0;z-index:50;display:flex;padding:12px;background:rgba(0,0,0,.7)}\n.mp{flex:1;display:flex;flex-direction:column;overflow:hidden;border-radius:18px;background:var(--card);border-top:3px solid var(--a1)}\n.mh{display:flex;justify-content:space-between;align-items:center;padding:18px 24px;border-bottom:1px solid var(--border)}\n.mk{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--a1)}\n.mh h3{font-size:18px;font-weight:700;color:var(--title)}\n.mx{width:34px;height:34px;border-radius:50%;background:var(--soft);display:flex;align-items:center;justify-content:center;transition:background .2s}\n.mx svg{width:12px;height:12px;stroke:var(--title)}\n.mx:hover{background:#ef4444}.mx:hover svg{stroke:#fff}\n.mb{flex:1;min-height:0;overflow:auto;padding:24px}\n.mf{padding:14px 24px;text-align:right;border-top:1px solid var(--border)}\n::-webkit-scrollbar{width:7px;height:7px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#6b7280;border-radius:4px}\n\n.fr{display:flex;align-items:center;gap:16px;font-size:13px}\n.ftk{flex:1;position:relative;height:14px}\n.ftk i{position:absolute;top:0;bottom:0;left:0;border-radius:99px}\n.fb{background:color-mix(in srgb,var(--a2) 45%,transparent)}\n.fb.cut{background:repeating-linear-gradient(90deg,color-mix(in srgb,var(--a2) 45%,transparent) 0 84%,transparent 84% 86.5%,color-mix(in srgb,var(--a2) 45%,transparent) 86.5% 89%,transparent 89% 91.5%,color-mix(in srgb,var(--a2) 45%,transparent) 91.5%)}\n.fp{background:var(--a1)}\n.ringc{display:flex;flex-direction:column;align-items:center;padding:18px 20px}\n.ringc .ct{align-self:flex-start;margin-bottom:6px}\n.ringc .ring svg{width:150px;height:150px}\n.ringc .rn{margin-top:2px}\n.ringc .rl{letter-spacing:.05em}\n.pie{display:flex;align-items:center;justify-content:center;gap:36px;flex-wrap:wrap}\n.pl{display:flex;flex-direction:column;gap:8px;min-width:220px}\n.pli{display:grid;grid-template-columns:10px 1fr auto 56px;gap:10px;align-items:center;font-size:13px}\n.pli i{width:10px;height:10px;border-radius:50%}\n.pli b{font-weight:600;font-variant-numeric:tabular-nums}\n.pli em{font-style:normal;font-size:12px;color:var(--sub);text-align:right;font-variant-numeric:tabular-nums}\n#main.anim .pz{animation:dgFade .8s ease both .2s}\n#main.anim path.ar{animation:dgFade 1s ease both .6s}\n.rkg{display:grid;grid-template-columns:minmax(240px,1fr) minmax(0,2fr);gap:28px;align-items:stretch}\n.rkl{min-width:0;display:flex;flex-direction:column;justify-content:center;gap:4px}\n.rkl .rr{padding:10px 12px}\n@media(max-width:800px){.rkg{grid-template-columns:1fr;gap:10px}}\n.rkw{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:2px;padding:22px 16px;border-radius:14px;background:color-mix(in srgb,var(--a1) 12%,var(--card));border:1px solid var(--a1)}\n.rkw svg{width:26px;height:26px;color:var(--a1);margin-bottom:4px}\n.rkn{font-size:28px;font-weight:700;line-height:1.2;color:var(--title)}\n.rkc{font-size:13px;font-weight:500;color:var(--a1)}\n.rkb{width:24px;height:24px;border-radius:50%;background:var(--soft);display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--sub);flex-shrink:0}\n.rr{display:grid;grid-template-columns:24px 1fr auto;column-gap:10px;row-gap:5px;align-items:center;padding:8px 10px;border-radius:10px;border:1px solid transparent;font-size:13px;margin-bottom:2px}\n.rr b{font-weight:500}.rr.top b{font-weight:700}\n.rr.top{background:color-mix(in srgb,var(--a1) 12%,var(--card));border-color:var(--a1)}\n.rr.top .rkb{background:var(--a1);color:#1f2329}\n.rr svg{width:14px;height:14px;color:var(--a1);vertical-align:-2px;margin-left:6px}\n.rbar{grid-column:2/4;height:5px;border-radius:5px;background:var(--soft)}\n.rbar i{display:block;height:100%;border-radius:5px;background:var(--a1)}\n.rr:not(.top) .rbar i{opacity:.55}\n.hn{overflow-wrap:anywhere;line-height:1.3}\n.nt{font-size:11px;font-weight:400;color:var(--sub);margin-top:12px}\n.cha{display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end}\n.mrb{display:block;margin:12px 0 0 auto;font-size:11px;color:var(--sub)}\n.mrb:hover{color:var(--title)}\nth.so{cursor:pointer;user-select:none}\nth.so:hover{color:var(--title)}\nth .ar{margin-left:4px;color:var(--a1)}\n.rr.nd b,.li.nd b{color:var(--sub);font-weight:400}\n.rr.nd .rbar i{background:var(--sub)!important;opacity:.35!important}\n.ver{position:absolute;bottom:14px;left:0;right:0;text-align:center;font-size:9.5px;letter-spacing:.08em;color:rgba(255,255,255,.32)}\n.oldskill{margin-top:14px;padding:7px 14px;border-radius:999px;background:rgba(253,133,52,.16);border:1px solid #fd8534;color:#fed7aa;font-size:11.5px}\n.aib{position:relative;display:flex;gap:16px;align-items:flex-start;padding:14px 20px;border-radius:0 14px 14px 0;background:var(--card);border:1px solid var(--border);border-left:3px solid var(--a1);cursor:default}\n.aib .al{flex-shrink:0;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--a1);padding-top:3px;white-space:nowrap}\n.aib p{font-size:13.5px;font-weight:300;line-height:1.6;color:var(--title);min-height:1.6em}\n.aib p.tw::after{content:'';display:inline-block;width:2px;height:1.05em;margin-left:2px;vertical-align:-2px;background:var(--a1);animation:dgBlink .8s steps(1) infinite}\n.aib mark.nv{background:none;color:#ef4444;border-bottom:1px dashed #ef4444;font-weight:500}\n.aib .avn{display:block;margin-top:6px;font-size:11px;color:#ef4444}\n@keyframes dgBlink{50%{opacity:0}}\n.ctl{padding:18px 22px}\n.ctr{display:grid;grid-template-columns:minmax(0,260px) 60px minmax(0,1fr);gap:14px;align-items:baseline;padding:9px 0;border-top:1px solid var(--border);font-size:12.5px}\n.ctr:first-of-type{border-top:0}\n.ctr b{font-weight:500;color:var(--title)}\n.ctr .cv{font-weight:700;text-align:right;font-variant-numeric:tabular-nums;color:var(--title)}\n.ctr .cd{color:var(--sub);font-weight:300;overflow-wrap:anywhere}\n.ctr.w b,.ctr.w .cv{color:var(--a1)}\n@keyframes dgUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}\n@keyframes dgGX{from{transform:scaleX(0)}to{transform:scaleX(1)}}\n@keyframes dgGY{from{transform:scaleY(0)}to{transform:scaleY(1)}}\n@keyframes dgDraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}\n@keyframes dgFade{from{opacity:0}to{opacity:1}}\n#main.anim .page>*{animation:dgUp .55s cubic-bezier(.2,.8,.2,1) both}\n#main.anim .hf,#main.anim .rbar i{transform-origin:left;animation:dgGX .9s cubic-bezier(.2,.8,.2,1) both .25s}\n#main.anim rect.bar{transform-box:fill-box;transform-origin:bottom;animation:dgGY .8s cubic-bezier(.2,.8,.2,1) both .25s}\n#main.anim path.ln{stroke-dasharray:1;animation:dgDraw 1.2s ease-out both .25s}\n#main.anim svg circle,#main.anim svg .vl{animation:dgFade .5s ease both .9s}\n@media(prefers-reduced-motion:reduce){#main.anim *{animation:none!important}.aib p.tw::after{display:none}}\n.cn{font-size:11px;font-weight:300;font-style:italic;color:var(--sub);margin-top:14px}\n.err{display:flex;flex-direction:column;gap:6px;padding:16px 20px;border-radius:14px;background:rgba(239,68,68,.1);border:1px solid #ef4444;color:#ef4444;font-size:13px;line-height:1.5}\n.err b{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}\n.err code{font-family:ui-monospace,Menlo,monospace;font-size:11px;opacity:.8}\n.errpill{margin-top:22px;padding:8px 16px;border-radius:999px;background:rgba(239,68,68,.18);border:1px solid #ef4444;color:#fecaca;font-size:12px}\n.fatal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;background:#24282f;font-family:'Poppins',system-ui,sans-serif}\n.fatal .err{max-width:640px;font-size:15px}\n#sig{position:fixed;inset:0;z-index:99;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.72)}\n#sig div{min-width:min(92vw,460px);padding:28px 32px;border-radius:18px;background:#16181c;border:1px solid var(--a1);color:#fff;font-size:13px;line-height:1.9;box-shadow:0 20px 60px rgba(0,0,0,.5)}\n#sig h4{font-size:18px;font-weight:700;color:var(--a1);margin-bottom:10px}\n#sig span{color:rgba(255,255,255,.55)}\n#sig p.k{margin-top:14px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35)}\n";
const SRC = (document.currentScript && document.currentScript.src) || "";
/* ===== Dashboard Giacomel – calcoli (motore 2.0) =====
   Riceve DATI (estratti dalla skill), le regole paid e le impostazioni; restituisce l'oggetto DASHBOARD. */
/* ===== Dashboard Giacomel – calcoli (motore 2.0) =====
   Riceve DATI (estratti dalla skill), le regole paid e le impostazioni; restituisce l'oggetto DASHBOARD. */
var CALCOLO = (function () {
"use strict";
var MESI = ["", "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
var BRAND = {
  audi: { nome: "Audi", conc: ["Lombarda", "Sesto", "Sagam", "Eurocar"], modelli: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q4 e-tron", "Q5", "Q6 e-tron", "Q7", "Q8", "e-tron GT", "TT", "R8"] },
  cupra: { nome: "CUPRA", conc: ["Lombarda", "Eurocar", "Busto Motor Company", "Wendecar"], modelli: ["Born", "Formentor", "Leon", "Ateca", "Terramar", "Tavascan", "Raval", "Ibiza", "Arona", "Tarraco"] },
  seat: { nome: "SEAT", conc: ["Lombarda", "Eurocar", "Busto Motor Company", "Wendecar"], modelli: ["Ibiza", "Arona", "Leon", "Ateca", "Tarraco", "Born", "Formentor", "Terramar", "Tavascan", "Raval"] },
  skoda: { nome: "Skoda", conc: ["Rigoldi", "Autocogliati", "Autoarona", "Bossoni"], modelli: ["Fabia", "Scala", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Superb", "Enyaq", "Elroq", "Epiq", "Peaq"] },
  volkswagen: { nome: "Volkswagen", conc: ["Rigoldi", "Sesto", "Lombarda", "Martignoni"], modelli: ["Polo", "T-Cross", "Taigo", "T-Roc", "Golf", "ID.3", "ID.4", "ID.5", "ID.7", "ID. Buzz", "Tiguan", "Tayron", "Touareg", "Passat", "Multivan"] },
  apsp: { nome: "APSP", conc: ["Lombarda", "Sesto", "Eurocar"], modelli: null },
  usato: { nome: "Usato", conc: ["BeBeep", "Eurocar", "Ninicar"], modelli: null }
};
var TUTTI = {};
["audi", "cupra", "seat", "skoda", "volkswagen"].forEach(function (b) { BRAND[b].modelli.forEach(function (m) { TUTTI[m.toLowerCase()] = b; }); });
var FONTI = ["Google Ads", "Meta", "Fornitori Esterni", "Ekonsilio"];
var CANON = { "google ads": "Google Ads", "meta": "Meta", "fornitori esterni": "Fornitori Esterni", "ekonsilio": "Ekonsilio" };
var FILTRI = ["Casa Madre", "Tutte le fonti", "Fonti nostre"];

function k(s) { return String(s == null ? "" : s).replace(/\s+/g, " ").trim().toLowerCase(); }
function hu(num, den) { return Math.floor((2 * num + den) / (2 * den)); }           /* arrotondamento 0,5 per eccesso, interi >= 0 */
function migl(s) { return s.replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function euroC(c) { var neg = c < 0; c = Math.abs(c); var e = Math.floor(c / 100), d = c % 100; return "€ " + (neg ? "-" : "") + migl(String(e)) + "," + (d < 10 ? "0" : "") + d; }
function pct(a, b) { if (!b) return "n.d."; var x = hu(a * 1000, b); return Math.floor(x / 10) + "," + (x % 10) + "%"; }
function intero(n) { return migl(String(n)); }
function cpl(c, l) { if (!l) return ["n.d.", 0]; var x = hu(c, l); return [euroC(x), x / 100]; }

/* ---------- regole paid ---------- */
function leggiRegole(testo) {
  var R = { fonti: {}, dett: {}, combo: {}, n: 0, errori: [] };
  String(testo || "").split(/\r?\n/).forEach(function (riga) {
    riga = riga.trim();
    if (!riga || riga[0] === "#" || riga.indexOf(":") < 0) return;
    var i = riga.indexOf(":"), tipo = k(riga.slice(0, i)), val = riga.slice(i + 1);
    if (tipo === "fonte paid") { R.fonti[k(val)] = 1; R.n++; }
    else if (tipo === "dettaglio paid") { R.dett[k(val)] = 1; R.n++; }
    else if (tipo === "fonte+dettaglio paid") {
      if (val.indexOf("|") < 0) { R.errori.push(riga); return; }
      var p = val.split("|"); R.combo[k(p[0]) + "|" + k(p.slice(1).join("|"))] = 1; R.n++;
    } else if (/^(fonte|dettaglio)/.test(tipo)) R.errori.push(riga);
  });
  return R;
}
function isPaid(R, fonte, dett) { var f = k(fonte), d = k(dett); return !!(R.fonti[f] || (d && R.dett[d]) || R.combo[f + "|" + d]); }

/* ---------- modelli ---------- */
function senzaNuovo(x) { return String(x || "").trim().replace(/^(nuova|nuovo)\s+/i, "").trim(); }
function modello(x, brand) {
  var s = senzaNuovo(x); if (!s) return "";
  var lst = BRAND[brand].modelli; if (!lst) return s;
  var o = lst.slice().sort(function (a, b) { return b.length - a.length; }), sl = k(s);
  for (var i = 0; i < o.length; i++) { var m = k(o[i]); if (sl === m || sl.indexOf(m + " ") === 0) return o[i]; }
  return s;
}
function altroMarchio(x, brand) {
  var lst = BRAND[brand].modelli; if (!lst) return false;
  var s = senzaNuovo(x); if (!s) return false;
  var sl = k(s), i, m;
  for (i = 0; i < lst.length; i++) { m = k(lst[i]); if (sl === m || sl.indexOf(m + " ") === 0) return false; }
  for (m in TUTTI) if ((sl === m || sl.indexOf(m + " ") === 0) && TUTTI[m] !== brand) return true;
  var nomi = ["audi", "cupra", "seat", "skoda", "volkswagen", "vw"];
  for (i = 0; i < nomi.length; i++) if (sl.indexOf(nomi[i] + " ") === 0 && nomi[i] !== brand && !(brand === "volkswagen" && nomi[i] === "vw")) return true;
  return false;
}
function cmpNome(a, b) { a = a.toLowerCase(); b = b.toLowerCase(); return a < b ? -1 : a > b ? 1 : 0; }
function classifica(contr) {
  var c = {}, nd = 0;
  contr.forEach(function (m) { if (m) c[m] = (c[m] || 0) + 1; else nd++; });
  var o = Object.keys(c).map(function (n) { return [n, c[n]]; }).sort(function (x, y) { return y[1] - x[1] || cmpNome(x[0], y[0]); });
  if (o.length > 5) { var s = o[4][1]; o = o.filter(function (x, i) { return i < 5 || x[1] === s; }); }
  var data = o.map(function (x) { return { name: x[0], value: x[1] }; });
  if (nd) data.push({ name: "N/D", value: nd });
  var top = o.length ? o.filter(function (x) { return x[1] === o[0][1]; }).map(function (x) { return x[0]; }) : [];
  return { data: data, vinc: top.length ? top.join(" / ") : "n.d.", nv: o.length ? o[0][1] : 0, conmod: contr.length - nd, tot: contr.length };
}
function nContr(n) { return "(" + n + (n === 1 ? " contratto)" : " contratti)"); }
function cap1(v) { var s = String(v == null ? "" : v).trim(); if (!s) return "ND"; return (s === s.toUpperCase() && s.length > 1 && /[A-Z]/.test(s)) ? s[0] + s.slice(1).toLowerCase() : s; }

/* =================================================================== */
function costruisci(DATI, testoRegole) {
  var R = leggiRegole(testoRegole), AV = [];
  var brand = DATI.brand; if (!BRAND[brand]) throw new Error("brand sconosciuto: " + brand);
  var BN = BRAND[brand].nome, anno = DATI.anno, M = DATI.mese, T = DATI.trimestre;
  var MeseN = MESI[M], Mesi3 = T.map(function (m) { return MESI[m]; }), TRI = Mesi3[0] + " – " + Mesi3[Mesi3.length - 1] + " " + anno;

  /* ---------- Paid ---------- */
  var P = DATI.paid.map(function (r) { return { m: r[0], f: CANON[k(r[1])] || String(r[1]).trim(), fo: r[2], sp: r[3], l: r[4], q: r[5], p: r[6], c: r[7], fa: r[8] }; });
  function ag(rs) { var a = { sp: 0, l: 0, q: 0, p: 0, c: 0, f: 0 }; rs.forEach(function (r) { a.sp += r.sp; a.l += r.l; a.q += r.q; a.p += r.p; a.c += r.c; a.f += r.fa; }); return a; }
  function pm(mesi, f) { return ag(P.filter(function (r) { return mesi.indexOf(r.m) >= 0 && (f == null || r.f === f); })); }

  var a = {}; FONTI.forEach(function (f) { a[f] = pm([M], f); }); var tot = pm([M]);
  function r8(n, x) { return [n, euroC(x.sp), x.l, x.q, pct(x.q, x.l), x.p, pct(x.p, x.q), cpl(x.sp, x.l)[0]]; }
  var cap1_ = { key: "paid-mese", label: "Paid – mese", title: "Campagne a pagamento – " + MeseN + " " + anno, subtitle: "Lead, qualificati e preventivi per fonte a pagamento.", blocks: [
    { id: "paid-mese.kpi", type: "kpi", items: [
      { label: "Spesa", value: euroC(tot.sp) }, { label: "CPL", value: cpl(tot.sp, tot.l)[0] }, { label: "Lead", value: intero(tot.l) },
      { label: "Qualificati", value: intero(tot.q), suffix: "(" + pct(tot.q, tot.l) + ")", note: "% sui lead", highlight: true, anello: [tot.q, tot.l, pct(tot.q, tot.l)] },
      { label: "Preventivi", value: intero(tot.p), suffix: "(" + pct(tot.p, tot.q) + ")", note: "% sui qualificati", anello: [tot.p, tot.q, pct(tot.p, tot.q)] }] },
    { type: "cols", blocks: [
      { id: "paid-mese.lead-fonte", type: "colonne", tipi: ["colonne", "barre", "riempimento", "torta", "segmenti"], title: "Lead e qualificati per fonte", series: ["Lead", "Qualificati"], data: FONTI.map(function (f) { return { name: f, Lead: a[f].l, Qualificati: a[f].q }; }) },
      { id: "paid-mese.cpl-fonte", type: "barre", tipi: ["barre", "colonne", "bolle"], title: "CPL per fonte", note: "Nota: Nella fonte Google Ads vengono conteggiati solo i lead da Form.",
        data: FONTI.map(function (f) { var c = cpl(a[f].sp, a[f].l); return { name: f, value: c[1], display: c[0] }; }) }] },
    { type: "table", title: "Dettaglio per fonte", subtitle: MeseN + " " + anno, head: ["Fonte", "Spesa", "Lead", "Qualificati", "% qualificati", "Preventivi", "% preventivi", "CPL"],
      rows: FONTI.map(function (f) { return r8(f, a[f]); }), total: r8("TOTALE", tot) }] };

  var b = {}; FONTI.forEach(function (f) { b[f] = pm(T, f); }); var tt = pm(T);
  function r10(n, x) { return [n, euroC(x.sp), x.l, x.q, pct(x.q, x.l), x.p, pct(x.p, x.q), x.c, x.f, cpl(x.sp, x.l)[0]]; }
  var forn = {};
  P.forEach(function (r) { if (T.indexOf(r.m) >= 0 && r.f === "Fornitori Esterni") { var n = String(r.fo || "").trim() || "(senza fornitore)"; (forn[n] = forn[n] || []).push(r); } });
  var fo = Object.keys(forn).map(function (n) { return [n, ag(forn[n])]; }).sort(function (x, y) { return y[1].l - x[1].l || cmpNome(x[0], y[0]); });
  var ftot = ag([].concat.apply([], Object.keys(forn).map(function (n) { return forn[n]; })));
  var cap2_ = { key: "paid-trimestre", label: "Paid – trimestre", title: "Campagne a pagamento – " + TRI, subtitle: "Trimestre mobile: lead, qualificati, preventivi e contratti per fonte.", blocks: [
    { id: "paid-trimestre.kpi", type: "kpi", items: [{ label: "Spesa", value: euroC(tt.sp) }, { label: "CPL", value: cpl(tt.sp, tt.l)[0] }, { label: "Lead", value: intero(tt.l) }] },
    { id: "paid-trimestre.kpi2", type: "kpi", items: [
      { label: "Qualificati", value: intero(tt.q), suffix: "(" + pct(tt.q, tt.l) + ")", note: "% sui lead", highlight: true, anello: [tt.q, tt.l, pct(tt.q, tt.l)] },
      { label: "Preventivi", value: intero(tt.p), suffix: "(" + pct(tt.p, tt.q) + ")", note: "% sui qualificati", anello: [tt.p, tt.q, pct(tt.p, tt.q)] },
      { label: "Contratti", value: intero(tt.c) }] },
    { type: "table", title: "Dettaglio per fonte", subtitle: TRI, head: ["Fonte", "Spesa", "Lead", "Qualificati", "% qualificati", "Preventivi", "% preventivi", "Contratti", "Falliti", "CPL"],
      rows: FONTI.map(function (f) { return r10(f, b[f]); }), total: r10("TOTALE", tt) },
    { type: "heading", text: "Andamento mese su mese" },
    { type: "cols", blocks: [
      { id: "paid-trimestre.lead-mese", type: "linea", tipi: ["linea", "area", "colonne", "barre"], title: "Lead per fonte", series: FONTI, data: T.map(function (m) { var o = { name: MESI[m] }; FONTI.forEach(function (f) { o[f] = pm([m], f).l; }); return o; }) },
      { id: "paid-trimestre.qualificati-mese", type: "linea", tipi: ["linea", "area", "colonne", "barre"], title: "Qualificati per fonte", series: FONTI, data: T.map(function (m) { var o = { name: MESI[m] }; FONTI.forEach(function (f) { o[f] = pm([m], f).q; }); return o; }) }] },
    { type: "table", title: "Mese su mese – totale fonti", head: ["Mese", "Spesa", "Lead", "Qualificati", "% qualificati", "Preventivi", "% preventivi", "Contratti", "Falliti", "CPL"],
      rows: T.map(function (m) { return r10(MESI[m], pm([m])); }), total: r10("TRIMESTRE", tt) },
    { type: "heading", text: "Fornitori esterni" },
    { type: "cols", blocks: [
      { id: "paid-trimestre.lead-fornitore", type: "barre", tipi: ["barre", "colonne", "bolle", "torta", "segmenti"], title: "Lead per fornitore", data: fo.map(function (x) { return { name: x[0], value: x[1].l }; }) },
      { id: "paid-trimestre.cpl-fornitore", type: "barre", tipi: ["barre", "colonne", "bolle"], title: "CPL per fornitore", data: fo.map(function (x) { var c = cpl(x[1].sp, x[1].l); return { name: x[0], value: c[1], display: c[0] }; }) }] },
    { type: "table", title: "Dettaglio fornitori esterni", subtitle: TRI, head: ["Fornitore", "Spesa", "Lead", "Qualificati", "% qualificati", "Preventivi", "Contratti", "CPL"],
      rows: fo.map(function (x) { var y = x[1]; return [x[0], euroC(y.sp), y.l, y.q, pct(y.q, y.l), y.p, y.c, cpl(y.sp, y.l)[0]]; }),
      total: ["TOTALE", euroC(ftot.sp), ftot.l, ftot.q, pct(ftot.q, ftot.l), ftot.p, ftot.c, cpl(ftot.sp, ftot.l)[0]] }] };

  /* ---------- Organico ---------- */
  var periodo = {}; periodo[anno * 100 + M] = "M"; T.forEach(function (m) { periodo[anno * 100 + m] = "T"; });
  var ORG = [], paidX = {}, paidN = 0, marchioX = {}, organiciDett = {};
  DATI.lead.forEach(function (r) {
    var ym = r[0], fonte = r[1], dett = r[2], mod = r[3], sq = r[4], tr = r[5], co = r[6], n = r[7];
    var p = periodo[ym]; if (!p) return;                     /* solo i 4 mesi della dashboard */
    if (isPaid(R, fonte, dett)) { var kk = fonte + (dett ? " | " + dett : ""); paidX[kk] = (paidX[kk] || 0) + n; paidN += n; return; }
    if (altroMarchio(mod, brand)) { marchioX[mod] = (marchioX[mod] || 0) + n; return; }
    var nome = String(fonte || "").trim() || "(fonte vuota)"; if (k(nome) === "venditore") nome = "Walk In";
    if (dett) { var kd = nome + " | " + dett; organiciDett[kd] = (organiciDett[kd] || 0) + n; }
    ORG.push({ p: p, m: ym % 100, f: nome, mod: mod, o: (sq === "4" || sq === "5") ? 1 : 0, fa: sq === "3" ? 1 : 0, t: tr, c: co, n: n });
  });
  function om(rs) { var x = { l: 0, o: 0, t: 0, c: 0, f: 0 }; rs.forEach(function (r) { x.l += r.n; x.o += r.o * r.n; x.t += r.t * r.n; x.c += r.c * r.n; x.f += r.fa * r.n; }); return x; }
  function contr(rs) { var out = []; rs.forEach(function (r) { if (r.c) for (var i = 0; i < r.n; i++) out.push(modello(r.mod, brand)); }); return out; }
  function gruppo(n) { return k(n) === "casa madre" ? "Casa Madre" : "Fonti nostre"; }
  function rigaOrg(n, y) { return [n, y.l, y.o, pct(y.o, y.l), y.t, pct(y.t, y.o), y.c, y.f]; }
  function orgBlocchi(rs, sub, pref) {
    var x = om(rs), src = {};
    rs.forEach(function (r) { (src[r.f] = src[r.f] || []).push(r); });
    var srt = Object.keys(src).map(function (n) { return [n, src[n], om(src[n])]; }).sort(function (u, v) { return v[2].l - u[2].l || cmpNome(u[0], v[0]); });
    var cl = classifica(contr(rs)), totali = {};
    FILTRI.forEach(function (g) { var y = om(rs.filter(function (r) { return g === "Tutte le fonti" || gruppo(r.f) === g; })); totali[g] = ["TOTALE", y.l, y.o, pct(y.o, y.l), y.t, pct(y.t, y.o), y.c, y.f]; });
    return { x: x, cl: cl, blocks: [
      { id: pref + ".kpi", type: "kpi", items: [
        { label: "Lead", value: intero(x.l) },
        { label: "Opportunità", value: intero(x.o), suffix: "(" + pct(x.o, x.l) + ")", note: "% sui lead", highlight: true, anello: [x.o, x.l, pct(x.o, x.l)] },
        { label: "Trattative", value: intero(x.t), suffix: "(" + pct(x.t, x.o) + ")", note: "% sulle opportunità", anello: [x.t, x.o, pct(x.t, x.o)] }] },
      { id: pref + ".kpi2", type: "kpi", items: [
        { label: "Contratti", value: intero(x.c) }, { label: "Falliti", value: intero(x.f) },
        { label: "Auto vincitrice", value: cl.vinc, suffix: nContr(cl.nv) }] },
      { id: pref + ".fonti", type: "barre", tipi: ["barre", "colonne", "riempimento", "torta", "segmenti"], title: "Lead e opportunità per fonte", series: ["Lead", "Opportunità"], "switch": false, filtri: FILTRI, maxRighe: 6,
        data: srt.map(function (s) { return { name: s[0], Lead: s[2].l, "Opportunità": s[2].o, gruppo: gruppo(s[0]) }; }) },
      { type: "table", title: "Dettaglio per fonte", subtitle: sub, full: true, sortable: true, filtri: FILTRI, gruppi: srt.map(function (s) { return gruppo(s[0]); }),
        totali: totali, head: ["Fonte", "Lead", "Opportunità", "% opportunità", "Trattative", "% trattative", "Contratti", "Falliti"],
        rows: srt.map(function (s) { return rigaOrg(s[0], s[2]); }), total: rigaOrg("TOTALE", x) },
      { id: pref + ".top-modelli", type: "classifica", tipi: ["classifica", "barre", "colonne"], title: "Top 5 modelli per contratti", unit: "contratti", data: cl.data,
        note: "Calcolata sui " + cl.conmod + " contratti con modello indicato, su " + cl.tot + " contratti totali." + (cl.tot > cl.conmod ? " N/D = contratti senza modello in Salesforce." : "") }] };
  }
  var oM = ORG.filter(function (r) { return r.p === "M"; }), oT = ORG.filter(function (r) { return r.p === "T"; });
  var OM = orgBlocchi(oM, MeseN + " " + anno, "organico-mese"), OT = orgBlocchi(oT, TRI, "organico-trimestre");
  var mm = {}; T.forEach(function (m) { mm[m] = oT.filter(function (r) { return r.m === m; }); });
  var esclTxt = Object.keys(paidX).sort(function (x, y) { return paidX[y] - paidX[x] || cmpNome(x, y); }).map(function (x) { return x + " (" + paidX[x] + ")"; });
  var orgTxt = Object.keys(organiciDett).sort(function (x, y) { return organiciDett[y] - organiciDett[x] || cmpNome(x, y); }).map(function (x) { return x + " (" + organiciDett[x] + ")"; });
  var controlliOrg = { type: "controlli", title: "Controllo esclusioni paid (" + MESI[T[0]] + " – " + MeseN + ")", righe: [
    { label: "Esclusi come paid", value: paidN, detail: esclTxt.length ? esclTxt.join(" · ") : "nessuno" },
    { label: "Contati come organici con dettaglio origine", value: Object.keys(organiciDett).reduce(function (s, x) { return s + organiciDett[x]; }, 0), detail: orgTxt.length ? orgTxt.join(" · ") : "nessuno", warn: orgTxt.length > 0 }
  ].concat(Object.keys(marchioX).length ? [{ label: "Esclusi: modello di un altro marchio", value: Object.keys(marchioX).reduce(function (s, x) { return s + marchioX[x]; }, 0), detail: Object.keys(marchioX).map(function (x) { return x + " (" + marchioX[x] + ")"; }).join(" · ") }] : []),
    note: "Regole paid: " + R.n + " regole lette dal file regole_paid.txt." + (R.errori.length ? " Regole scritte male e ignorate: " + R.errori.join(" · ") : "") };
  var cap3_ = { key: "organico-mese", label: "Organico – mese", title: "Lead organici – " + MeseN + " " + anno, subtitle: "Lead da fonti non a pagamento, per mese di creazione del lead.", blocks: OM.blocks.concat([controlliOrg]) };
  var cap4_ = { key: "organico-trimestre", label: "Organico – trimestre", title: "Lead organici – " + TRI, subtitle: "Lead da fonti non a pagamento, per mese di creazione del lead.", blocks: OT.blocks.concat([
    { type: "heading", text: "Andamento mese su mese" },
    { id: "organico-trimestre.andamento", type: "linea", tipi: ["linea", "area", "colonne", "barre"], title: "Lead, opportunità e contratti", series: ["Lead", "Opportunità", "Contratti"],
      data: T.map(function (m) { var y = om(mm[m]); return { name: MESI[m], Lead: y.l, "Opportunità": y.o, Contratti: y.c }; }) },
    { type: "table", title: "Mese su mese – totale fonti", head: ["Mese", "Lead", "Opportunità", "% opportunità", "Trattative", "% trattative", "Contratti", "Falliti"],
      rows: T.map(function (m) { return rigaOrg(MESI[m], om(mm[m])); }), total: rigaOrg("TRIMESTRE", OT.x) },
    { type: "heading", text: "Top 5 modelli per mese" },
    { type: "cols", blocks: T.map(function (m) { return { type: "classifica", style: "righe", title: MESI[m], data: classifica(contr(mm[m])).data }; }) }]) };

  /* ---------- Preventivi ---------- */
  var QQ = [], marchio3 = 0;
  DATI.prev.forEach(function (r) {
    var ym = r[0], mod = r[1], prop = r[2], persa = r[3], fv = r[4], n = r[5];
    if (altroMarchio(mod, brand)) { marchio3 += n; return; }
    QQ.push({ p: (Math.floor(ym / 100) === anno) ? periodo[ym] : undefined, m: ym % 100, mod: mod, c: prop && !persa ? 1 : 0, fv: fv, n: n });
  });
  var nQQ = QQ.reduce(function (s, r) { return s + r.n; }, 0), nFV = QQ.reduce(function (s, r) { return s + r.fv * r.n; }, 0);
  function qm(rs) { var con = [], t = 0; rs.forEach(function (r) { t += r.n; if (r.c) for (var i = 0; i < r.n; i++) con.push(modello(r.mod, brand)); }); var nd = con.filter(function (m) { return !m; }).length; return { t: t, c: con.length, nd: nd, con: con }; }
  var qM = qm(QQ.filter(function (r) { return r.p === "M"; })), qT = qm(QQ.filter(function (r) { return r.p === "T"; })), qmm = {};
  T.forEach(function (m) { qmm[m] = qm(QQ.filter(function (r) { return r.p === "T" && r.m === m; })); });
  var cM = classifica(qM.con), cT = classifica(qT.con);
  var b5 = [{ type: "avviso", text: "Attenzione: il " + pct(nFV, nQQ) + " delle trattative non ha la fonte del lead compilata." }];
  if (qM.nd || qT.nd) b5.push({ type: "avviso", text: "Contratti senza modello in Salesforce: " + qM.nd + " nel mese, " + qT.nd + " nel trimestre. Sono contati nei totali e nelle classifiche come N/D." });
  b5 = b5.concat([
    { id: "preventivi.kpi", type: "kpi", items: [{ label: "Trattative", value: intero(qM.t) }, { label: "Contratti", value: intero(qM.c) },
      { label: "Tasso di chiusura", value: pct(qM.c, qM.t), note: "contratti / trattative", anello: [qM.c, qM.t, pct(qM.c, qM.t)] }, { label: "Modello più venduto", value: cM.vinc, suffix: nContr(cM.nv), highlight: true }] },
    { id: "preventivi.top-modelli-mese", type: "classifica", tipi: ["classifica", "barre", "colonne"], title: "Top 5 modelli – " + MeseN + " (contratti)", unit: "contratti", data: cM.data,
      note: "Calcolata sui " + cM.conmod + " contratti con modello indicato, su " + cM.tot + " contratti totali." },
    { type: "heading", text: "Trimestre mobile – " + TRI },
    { id: "preventivi.kpi-trimestre", type: "kpi", items: [{ label: "Trattative", value: intero(qT.t) }, { label: "Contratti", value: intero(qT.c) },
      { label: "Tasso di chiusura", value: pct(qT.c, qT.t), note: "contratti / trattative", anello: [qT.c, qT.t, pct(qT.c, qT.t)] }, { label: "Modello più venduto", value: cT.vinc, suffix: nContr(cT.nv), highlight: true }] },
    { type: "cols", blocks: [
      { id: "preventivi.trattative-mese", type: "colonne", tipi: ["colonne", "barre", "linea", "area", "riempimento"], title: "Trattative e contratti per mese", series: ["Trattative", "Contratti"], data: T.map(function (m) { return { name: MESI[m], Trattative: qmm[m].t, Contratti: qmm[m].c }; }) },
      { id: "preventivi.top-modelli-trimestre", type: "classifica", tipi: ["classifica", "barre", "colonne"], title: "Top 5 modelli del trimestre (contratti)", unit: "contratti", data: cT.data,
        note: "Calcolata sui " + cT.conmod + " contratti con modello indicato, su " + cT.tot + " contratti totali." }] },
    { type: "table", title: "Riepilogo mensile", head: ["Mese", "Trattative", "Contratti", "Contratti senza modello", "Tasso di chiusura"],
      rows: T.map(function (m) { var y = qmm[m]; return [MESI[m], y.t, y.c, y.nd, pct(y.c, y.t)]; }), total: ["TRIMESTRE", qT.t, qT.c, qT.nd, pct(qT.c, qT.t)] },
    { type: "heading", text: "Top 5 modelli per mese" },
    { type: "cols", blocks: T.map(function (m) { return { type: "classifica", style: "righe", title: MESI[m], data: classifica(qmm[m].con).data }; }) }]);
  var cap5_ = { key: "preventivi", label: "Preventivi", title: "Preventivi da tutte le fonti – " + MeseN + " " + anno, subtitle: "Trattative (preventivi) e contratti per mese della trattativa; focus sull'ultimo mese e trimestre mobile.", blocks: b5 };

  /* ---------- Concorrenza ---------- */
  var promo = [], fogli = DATI.fogliPromo || [];
  fogli.forEach(function (f) {
    var rs = DATI.promo.filter(function (p) { return p[0] === f; });
    if (!rs.length) promo.push([f, "ND", "ND", "ND", "ND"]);
    rs.forEach(function (p) { promo.push([p[0], cap1(p[1]), cap1(p[2]), p[3] || "ND", p[4] || "ND"]); });
  });
  var mancanti = BRAND[brand].conc.filter(function (c) { return !fogli.some(function (p) { return k(p).indexOf(k(c)) >= 0 || k(c).indexOf(k(p)) >= 0; }); });
  var b6 = [];
  if (mancanti.length) b6.push({ type: "avviso", text: "Nel file promozioni mancano i fogli di: " + mancanti.join(", ") + "." });
  b6.push({ type: "table", title: "Promozioni per concessionario", full: true, head: ["Concessionario", "Brand", "Modello", "Formula d'acquisto", "Promozione"], rows: promo });
  var cap6_ = { key: "concorrenza", label: "Concorrenza", title: "Promozioni attive – " + MeseN + " " + anno, subtitle: "Promozioni di Fratelli Giacomel e dei concorrenti locali, dal file promozioni.", blocks: b6 };

  return { period: BN + " · " + MeseN + " " + anno, thanks: "", brand: "grafite", accent: "arancio",
    generatore: "dashboard-mensile-giacomel v" + DATI.skill, skill: DATI.skill,
    tabs: [cap1_, cap2_, cap3_, cap4_, cap5_, cap6_] };
}

return { costruisci: costruisci, leggiRegole: leggiRegole, BRAND: BRAND, MESI: MESI };
})();

let DB = null;
const PCSS = `
#print{position:absolute;left:-99999px;top:0;width:703px;background:#fff}
#print,#print *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
#print{--bg:#fff;--card:#fff;--border:#dde0e5;--title:#1f2329;--sub:#5f6673;--grid:#e8eaed;--soft:#f4f5f7;--a1:#f07a26;--a2:#f9c39c;color:#1f2329;font-family:'Poppins',system-ui,sans-serif}
#print .pg{break-before:page;display:flex;flex-direction:column;gap:14px}
#print .pg:first-child{break-before:auto}
#print .phd{padding-bottom:10px;border-bottom:2px solid var(--a1);margin-bottom:4px}
#print .phd h1{font-size:21px;margin-top:2px}
#print .phd p{font-size:11.5px}
#print .cap{font-size:9px}
#print .hd{font-size:15px;margin-top:6px;break-after:avoid}
#print .card,#print .kpi{border-radius:10px;padding:14px 16px;background:#fff;box-shadow:none}
#print .card,#print .kpis,#print .cols,#print .warn,#print .ins,#print .err{break-inside:avoid}
#print .kpis{gap:10px;grid-template-columns:repeat(var(--n),minmax(0,1fr))!important}
#print .cols{gap:12px;grid-template-columns:repeat(var(--n),minmax(0,1fr))!important}
#print .kpi.hl{background:#fff;border-color:var(--border);border-left:3px solid var(--a1)}
#print .kl{font-size:8px}
#print .kvw{margin-top:6px}
#print .kv{font-size:24px}
#print .kn,#print .kd{font-size:9px}
#print .ct{font-size:9px}
#print .cs{font-size:10px}
#print .ch{margin-bottom:10px}
#print .card.dark{background:#fff;color:var(--title);border-color:var(--a1)}
#print .card.dark .ht{background:var(--soft)}
#print .sw3,#print .btn{display:none}
#print table{font-size:10px}
#print th{background:none;border-bottom:1.5px solid var(--title);color:var(--title);padding:6px 7px;font-size:8px}
#print td{padding:5px 7px}
#print tr{break-inside:avoid}
#print tr.tot td{background:none;border-top:1.5px solid var(--title)}
#print td .dot{width:5px;height:5px;margin-right:6px}
#print .warn{background:#fff;font-size:11px;padding:9px 14px}
#print .rkw{background:#fff;padding:10px}
#print .rkg{grid-template-columns:1fr 2fr!important;gap:16px}
#print .rkn{font-size:20px}
#print .rr{font-size:11px;padding:5px 8px}
#print .rr.top{background:#fff}
#print .hr,#print .fr{font-size:11px}
#print .hb{gap:9px}
#print .hn{width:110px}
#print .lg{font-size:9px}
#print .cn{font-size:9px;margin-top:8px}
#print .ax,#print .vl{font-size:10px}
#print .ins{background:#fff}
#print .tx,#print .ins p{font-size:11.5px}
#print .cover{height:250mm;display:flex;flex-direction:column;justify-content:center;gap:0}
#print .cover .logo img{filter:none;width:190px}
#print .cover .logo-txt{color:var(--title);font-size:30px}
#print .cover .line{margin:26px 0}
#print .cv1{font-size:30px;font-weight:700;line-height:1.2;color:var(--title)}
#print .cv2{font-size:12px;letter-spacing:.25em;text-transform:uppercase;color:var(--sub);margin-top:8px}
#print .toc{margin-top:46px;display:flex;flex-direction:column;border-top:1px solid var(--border)}
#print .toc div{display:flex;gap:18px;align-items:baseline;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px}
#print .toc b{color:var(--a1);font-weight:600;font-size:11px;letter-spacing:.1em;width:24px}
#print .toc span{color:var(--sub);font-size:11px;font-weight:300;margin-left:auto}
#print .cvf{margin-top:auto;font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--sub)}
html.pv,html.pv body{overflow:auto!important;height:auto!important}
html.pv #app{display:none}
html.pv body{background:#8b9099}
html.pv #print{position:static;left:auto;margin:0 auto;width:auto;background:none;padding:24px 0 80px}
html.pv #print .pg{width:210mm;min-height:297mm;margin:0 auto 20px;padding:14mm 12mm 16mm;background:#fff;box-shadow:0 6px 24px rgba(0,0,0,.25);position:relative}
html.pv #print .pg::after{content:attr(data-foot);position:absolute;left:12mm;right:12mm;bottom:7mm;font-size:8px;color:#8a909b;letter-spacing:.05em}
#pvbar{display:none}
html.pv #pvbar{display:flex;position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:60;gap:18px;align-items:center;padding:10px 20px;border-radius:999px;background:#1c1f24;color:#fff;font:500 12px 'Poppins',system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.35)}
#pvbar kbd{font:600 11px 'Poppins',system-ui,sans-serif;padding:2px 7px;border-radius:5px;background:rgba(255,255,255,.14)}
#pvbar i{width:6px;height:6px;border-radius:50%;background:#fd8534}
@media print{
  html,body{height:auto!important;overflow:visible!important;background:#fff!important}
  #app,#modal,#pvbar,#sig{display:none!important}
  #print{position:static!important;left:auto!important;width:auto!important;padding:0!important}
  #print .pg{width:auto!important;min-height:0!important;margin:0!important;padding:0!important;box-shadow:none!important}
  #print .pg::after{display:none}
  #print .cover{height:255mm}
}
`;
const ACC = { arancio: ["#fd8534", "#fdba8c"], orange: ["#fd8534", "#fdba8c"], blu: ["#3b82f6", "#93c5fd"], blue: ["#3b82f6", "#93c5fd"], verde: ["#10b981", "#6ee7b7"], green: ["#10b981", "#6ee7b7"] };
const I = {
  x: '<svg viewBox="0 0 10 10" fill="none" stroke-width="1.8" stroke-linecap="round"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7"/></svg>',
  panel: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9.5 4v16"/></svg>',
  pc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  proj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="8" width="20" height="9" rx="2"/><circle cx="15" cy="12.5" r="2.5"/><path d="M6 12.5h3M5 17v2M19 17v2"/></svg>',
  home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-8 9 8M5 10v10h5v-6h4v6h5V10"/></svg>',
  warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/></svg>',
  arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
};
const S = { view: "home", tab: 0, last: -1, light: false, collapsed: false, modal: null, modalId: null, views: {}, flt: {}, sort: {}, more: {}, animT: 0, typing: [] };
let REG = [], PRN = false;
const $ = s => document.querySelector(s);
const esc = v => String(v == null ? "" : v).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = v => typeof v === "number" ? v.toLocaleString("it-IT", { maximumFractionDigits: 2, useGrouping: "always" }) : esc(v);
const pad = n => String(n).padStart(2, "0");
const acc = a => a && ACC[a] ? ` style="--a1:${ACC[a][0]};--a2:${ACC[a][1]}"` : "";
const col = j => j === 0 ? "var(--a1)" : j === 1 ? "var(--a2)" : j === 2 ? "var(--sub)" : "#a78bfa";
const PAL = ["var(--a1)", "var(--a2)", "var(--sub)", "#a78bfa", "#2dd4bf", "#facc15", "#f472b6", "#60a5fa"];
const pctS = (n, d) => { if (!d) return "n.d."; const x = Math.floor((2 * n * 1000 + d) / (2 * d)); return Math.floor(x / 10) + "," + (x % 10) + "%"; };
function valori(b) { return (b.data || []).map(d => ({ name: d.name != null ? d.name : d.label, value: b.series ? +d[b.series[0]] || 0 : +d.value || 0, display: d.display })); }
function topAltre(data, k) {
  const d = data.slice().sort((x, y) => y.value - x.value);
  if (d.length <= k + 1) return d;
  return d.slice(0, k).concat([{ name: "Altre (" + (d.length - k) + ")", value: d.slice(k).reduce((a, x) => a + x.value, 0), altre: true }]);
}
const short = v => Math.abs(v) >= 1000 ? (v / 1000).toLocaleString("it-IT", { maximumFractionDigits: 1 }) + "k" : v.toLocaleString("it-IT", { maximumFractionDigits: 2 });
const logo = big => `<div class="logo${big ? " big" : ""}"><img src="https://fratelligiacomel.it/img/logo.png" alt="Fratelli Giacomel" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="logo-txt">Fratelli Giacomel</span></div>`;

function norm(b) {
  if (b.type === "bars") return Object.assign({}, b, { type: "colonne" });
  if (b.type === "donut") return Object.assign({}, b, { type: "torta" });
  if (b.type === "progress") return Object.assign({}, b, { type: "barre", data: (b.rows || []).map(r => ({ name: r.label, value: r.value, display: r.display })) });
  return b;
}
function ser(b) {
  if (b.series) return { keys: b.series, rows: b.data.map(d => ({ name: d.name, vals: b.series.map(s => +d[s] || 0) })) };
  return { keys: null, rows: (b.data || []).map(d => ({ name: d.name != null ? d.name : d.label, vals: [+d.value || 0], display: d.display })) };
}
function scale(max) {
  if (max <= 0) return { top: 1, step: 0.25 };
  const raw = max / 4, p = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / p;
  const step = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
  return { top: step * Math.ceil(max / step), step };
}
const legend = keys => keys ? `<div class="lg">${keys.map((k, j) => `<span><i style="background:${col(j)}"></i>${esc(k)}</span>`).join("")}</div>` : "";
const unit = b => b.unit ? esc(b.unit) + " " : "";

function grid(L, R, W, y, top, step) {
  let g = "";
  for (let v = 0; v <= top + 1e-9; v += step) g += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--grid)"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end" class="ax">${short(v)}</text>`;
  return g;
}
function colSvg(b, W) {
  const { keys, rows } = ser(b), L = 46, R = 8, T = 26, iw = W - L - R, labs = rows.map(r => wrapLab(r.name, iw / rows.length)), two = labs.some(l => l.length > 1), B = two ? 44 : 30, H = two ? 294 : 280, ih = H - T - B;
  const all = rows.flatMap(r => r.vals), max = Math.max(...all), { top, step } = scale(max);
  const y = v => T + ih - (v / top) * ih, slot = iw / rows.length, ns = rows[0].vals.length, gap = ns > 1 ? 4 : 0;
  const gw = Math.min(slot * 0.62, 90 * ns), bw = (gw - gap * (ns - 1)) / ns;
  let g = grid(L, R, W, y, top, step);
  rows.forEach((r, i) => {
    const x0 = L + slot * i + (slot - gw) / 2;
    r.vals.forEach((v, j) => {
      const x = x0 + j * (bw + gap), fill = ns === 1 ? (v === max ? "var(--a1)" : "var(--a2)") : col(j);
      g += `<rect class="bar" x="${x}" y="${y(v)}" width="${bw}" height="${Math.max(1, (v / top) * ih)}" rx="${Math.min(8, bw / 4)}" style="fill:${fill}"><title>${esc(r.name)}${keys ? " · " + esc(keys[j]) : ""}: ${fmt(v)}</title></rect>`;
      if (ns === 1 || bw > 34) g += `<text x="${x + bw / 2}" y="${y(v) - 7}" text-anchor="middle" class="vl">${ns === 1 && r.display ? esc(r.display) : unit(b) + fmt(v)}</text>`;
    });
    g += `<text x="${L + slot * i + slot / 2}" y="${H - (two ? 22 : 8)}" text-anchor="middle" class="ax"><title>${esc(r.name)}</title>${labs[i].map((t, k) => `<tspan x="${L + slot * i + slot / 2}" dy="${k ? 13 : 0}">${esc(t)}</tspan>`).join("")}</text>`;
  });
  return `<svg width="${W}" height="${H}" style="display:block">${g}</svg>${legend(keys)}`;
}
function lineSvg(b, W, id, area) {
  const { keys, rows } = ser(b), H = 280, L = 46, R = 20, T = 26, B = 30, ih = H - T - B, iw = W - L - R, n = rows.length, ns = rows[0].vals.length;
  const { top, step } = scale(Math.max(...rows.flatMap(r => r.vals)));
  const p = n > 1 ? Math.min(40, iw / (n * 2)) : 0, x = i => n > 1 ? L + p + i * (iw - 2 * p) / (n - 1) : L + iw / 2, y = v => T + ih - (v / top) * ih;
  let g = `<defs>${rows[0].vals.map((_, j) => `<linearGradient id="g${id}-${j}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:${col(j)};stop-opacity:${ns > 1 ? .18 : .3}"/><stop offset="1" style="stop-color:${col(j)};stop-opacity:0"/></linearGradient>`).join("")}</defs>` + grid(L, R, W, y, top, step);
  for (let j = 0; j < ns; j++) {
    const pts = rows.map((r, i) => `${x(i)},${y(r.vals[j])}`);
    if (area) g += `<path class="ar" d="M${x(0)},${y(0)}L${pts.join("L")}L${x(n - 1)},${y(0)}Z" fill="url(#g${id}-${j})"/>`;
    g += `<path class="ln" pathLength="1" d="M${pts.join("L")}" fill="none" style="stroke:${col(j)}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    rows.forEach((r, i) => {
      g += `<circle cx="${x(i)}" cy="${y(r.vals[j])}" r="4" style="fill:${col(j)};stroke:var(--card)" stroke-width="2"><title>${esc(r.name)}${keys ? " · " + esc(keys[j]) : ""}: ${fmt(r.vals[j])}</title></circle>`;
      if (ns === 1 && n <= 12) g += `<text x="${x(i)}" y="${y(r.vals[j]) - 10}" text-anchor="middle" class="vl">${r.display ? esc(r.display) : unit(b) + fmt(r.vals[j])}</text>`;
    });
  }
  rows.forEach((r, i) => { g += `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" class="ax">${esc(r.name)}</text>`; });
  return `<svg width="${W}" height="${H}" style="display:block">${g}</svg>${legend(keys)}`;
}
function barHtml(b) {
  const { keys, rows } = ser(b), max = b.max || Math.max(...rows.flatMap(r => r.vals)) || 1;
  return `<div class="hb">${rows.map(r => `<div class="hr"><span class="hn">${esc(r.name)}</span><div class="hbs">${r.vals.map((v, j) => `<div class="ht"><div class="hf" style="width:${Math.max(1.5, v / max * 100)}%;background:${keys ? col(j) : "var(--a1)"}"></div></div>`).join("")}</div><span class="hv">${keys ? r.vals.map(fmt).join(" · ") : r.display ? esc(r.display) : unit(b) + fmt(r.vals[0])}</span></div>`).join("")}</div>${legend(keys)}`;
}
function pack(items, gap) {
  const c = items.map(d => Object.assign({}, d, { r: Math.sqrt(Math.max(d.v, 0.01)) * 10 })).sort((a, b) => b.r - a.r);
  const rMin = c[0].r * 0.5; c.forEach(d => { d.cr = Math.max(d.r, rMin); });
  const placed = [], free = (x, y, r) => placed.every(p => Math.hypot(p.x - x, p.y - y) >= p.cr + r + gap - 0.01);
  c.forEach(d => {
    if (!placed.length) { d.x = 0; d.y = 0; }
    else if (placed.length === 1) { d.x = placed[0].cr + d.cr + gap; d.y = 0; }
    else {
      let best = null;
      for (let i = 0; i < placed.length; i++) for (let j = i + 1; j < placed.length; j++) {
        const A = placed[i], B = placed[j], ra = A.cr + d.cr + gap, rb = B.cr + d.cr + gap, dx = B.x - A.x, dy = B.y - A.y, D = Math.hypot(dx, dy);
        if (D > ra + rb || D < Math.abs(ra - rb) || D === 0) continue;
        const k = (ra * ra - rb * rb + D * D) / (2 * D), h = Math.sqrt(Math.max(0, ra * ra - k * k)), mx = A.x + dx * k / D, my = A.y + dy * k / D;
        [[mx + h * dy / D, my - h * dx / D], [mx - h * dy / D, my + h * dx / D]].forEach(([x, y]) => { if (free(x, y, d.cr)) { const s = Math.hypot(x, y); if (!best || s < best.s) best = { x, y, s }; } });
      }
      d.x = best ? best.x : 0; d.y = best ? best.y : 0;
    }
    placed.push(d);
  });
  return placed;
}
function bubbleSvg(b) {
  const W = 760, H = 360, P = 30, gs = b.groups || [];
  const pts = pack(b.data.map(d => ({ n: d.name, v: +d.value || 0, d: d.display, g: typeof d.group === "number" ? d.group : Math.max(0, gs.indexOf(d.group)) })), 6);
  const minX = Math.min(...pts.map(p => p.x - p.cr)), maxX = Math.max(...pts.map(p => p.x + p.cr)), minY = Math.min(...pts.map(p => p.y - p.cr)), maxY = Math.max(...pts.map(p => p.y + p.cr));
  const tv = pts.reduce((a, p) => a + p.v, 0) || 1, cx = pts.reduce((a, p) => a + p.x * p.v, 0) / tv, cy = pts.reduce((a, p) => a + p.y * p.v, 0) / tv;
  const k = Math.min((W - P * 2) / (maxX - minX), (H - P * 2) / (maxY - minY)), ox = W / 2 - (minX + maxX) / 2 * k, oy = H / 2 - (minY + maxY) / 2 * k;
  let g = "";
  pts.forEach(p => {
    const x = ox + p.x * k, y = oy + p.y * k, r = p.r * k, lab = p.d ? esc(p.d) : fmt(p.v), tc = p.g === 0 ? "#fff" : "#1f2937";
    g += `<g><title>${esc(p.n)}: ${lab}</title><circle cx="${x}" cy="${y}" r="${r}" style="fill:${p.g === 0 ? "var(--a1)" : "var(--a2)"}"/>`;
    if (r >= 34) {
      const fs = Math.max(11, Math.min(16, r / 4.2));
      g += `<text x="${x}" y="${y - fs * 0.15}" text-anchor="middle" fill="${tc}" font-size="${fs * 1.9}" font-weight="700">${lab}</text><text x="${x}" y="${y + fs * 1.25}" text-anchor="middle" fill="${tc}" fill-opacity=".9" font-size="${fs * 0.8}" font-weight="500">${esc(p.n)}</text>`;
    } else {
      const dx = p.x - cx, dy = p.y - cy, Ln = Math.hypot(dx, dy) || 1, ux = dx / Ln, uy = dy / Ln, lx = x + ux * (r + 18), ly = y + uy * (r + 18), an = ux >= 0 ? "start" : "end";
      g += `<line x1="${x + ux * r}" y1="${y + uy * r}" x2="${x + ux * (r + 12)}" y2="${y + uy * (r + 12)}" style="stroke:var(--sub)"/><text x="${lx}" y="${ly - 2}" text-anchor="${an}" style="fill:var(--title)" font-size="13" font-weight="700">${lab}</text><text x="${lx}" y="${ly + 13}" text-anchor="${an}" style="fill:var(--sub)" font-size="11">${esc(p.n)}</text>`;
    }
    g += "</g>";
  });
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" style="display:block;width:100%;height:340px">${g}</svg>${legend(gs.length ? gs : null)}`;
}
function ringSvg(b) {
  const pct = Math.max(0, Math.min(1, (+b.value || 0) / (+b.max || 1))), r = 80, c = 2 * Math.PI * r;
  return `<div class="ring"><svg viewBox="0 0 200 200" width="180" height="180"><circle cx="100" cy="100" r="${r}" fill="none" style="stroke:var(--soft)" stroke-width="14"/><circle cx="100" cy="100" r="${r}" fill="none" style="stroke:var(--a1)" stroke-width="14" stroke-linecap="round" stroke-dasharray="${c * pct} ${c}" transform="rotate(-90 100 100)"/><text x="100" y="106" text-anchor="middle" class="rv">${b.display ? esc(b.display) : Math.round(pct * 100) + "%"}</text><text x="100" y="130" text-anchor="middle" class="rl">${esc(b.label || "")}</text></svg>${b.note ? `<p class="rn">${esc(b.note)}</p>` : ""}</div>`;
}
function pieSvg(b) {
  const data = topAltre(valori(b), 6), tot = data.reduce((a, d) => a + d.value, 0), r = 70, c = 2 * Math.PI * r; let off = 0, g = "";
  if (!tot) return `<p class="tx" style="color:var(--sub)">Nessun dato da ripartire</p>`;
  data.forEach((d, i) => { const l = d.value / tot * c; g += `<circle class="pz" cx="100" cy="100" r="${r}" fill="none" style="stroke:${d.altre ? "#5b6270" : PAL[i % PAL.length]}" stroke-width="26" stroke-dasharray="${Math.max(0, l - (data.length > 1 ? 3 : 0))} ${c}" stroke-dashoffset="${-off}" transform="rotate(-90 100 100)"><title>${esc(d.name)}: ${fmt(d.value)}</title></circle>`; off += l; });
  return `<div class="pie"><svg viewBox="0 0 200 200" width="210" height="210">${g}<text x="100" y="104" text-anchor="middle" class="rv" style="font-size:26px">${fmt(tot)}</text><text x="100" y="126" text-anchor="middle" class="rl">totale</text></svg><div class="pl">${data.map((d, i) => `<div class="pli"><i style="background:${d.altre ? "#5b6270" : PAL[i % PAL.length]}"></i><span>${esc(d.name)}</span><b>${fmt(d.value)}</b><em>${pctS(d.value, tot)}</em></div>`).join("")}</div></div>`;
}
function segHtml(b) {
  const pre = (b.data || []).every(d => d.perc != null && !b.series && !num(d.value));
  if (pre) { const mi = b.data.reduce((m, d, i) => parseFloat(d.perc) > parseFloat(b.data[m].perc) ? i : m, 0);
    return `<div class="seg">${b.data.map((d, i) => `<i style="width:${parseFloat(d.perc) || 0}%;background:${col(i === mi ? 0 : 1)};" title="${esc(d.name)}: ${esc(d.perc)}"></i>`).join("")}</div><div class="chips" style="--n:${b.data.length}">${b.data.map((d, i) => `<div class="chip${i === mi ? " on" : ""}">${esc(d.name)} · <b>${esc(d.perc)}</b></div>`).join("")}</div>`; }
  const data = topAltre(valori(b), 5), tot = data.reduce((a, d) => a + d.value, 0);
  if (!tot) return `<p class="tx" style="color:var(--sub)">Nessun dato da ripartire</p>`;
  return `<div class="seg">${data.filter(d => d.value > 0).map((d, i) => `<i style="width:${d.value / tot * 100}%;background:${i === 0 ? "var(--a1)" : d.altre ? "var(--grid)" : "var(--a2)"};" title="${esc(d.name)}: ${pctS(d.value, tot)}"></i>`).join("")}</div><div class="chips" style="--n:${Math.min(data.length, 6)}">${data.map((d, i) => `<div class="chip${i === 0 ? " on" : ""}">${esc(d.name)} · <b>${pctS(d.value, tot)}</b> <em>(${fmt(d.value)})</em></div>`).join("")}</div>`;
}
const TUTTE = o => /^tutt/i.test(String(o || ""));
function fltOpt(b, id) { const f = b.filtri; if (!isArr(f) || !f.length) return null; const cur = S.flt[id]; return cur != null && f.includes(cur) ? cur : (f.find(TUTTE) || f[0]); }
function fltData(b, id) {
  const o = fltOpt(b, id); if (!o || TUTTE(o)) return b.data;
  return (b.data || []).filter(d => d.gruppo === o);
}
const fltSw = (b, id) => isArr(b.filtri) && b.filtri.length ? `<div class="sw3">${b.filtri.map(o => `<button data-flt="${id}" data-v="${esc(o)}" class="${fltOpt(b, id) === o ? "on" : ""}">${esc(o)}</button>`).join("")}</div>` : "";
function sortKey(c) {
  if (typeof c === "number") return c;
  const t = String(c == null ? "" : c).trim();
  if (/^(n\.d\.|nd|-|)$/i.test(t)) return -Infinity;
  const m = t.replace(/[€%\s]/g, "").replace(/\./g, "").replace(",", ".");
  return /^[-+]?\d+(\.\d+)?$/.test(m) ? parseFloat(m) : t.toLowerCase();
}
function tableView(b, id) {
  let idx = b.rows.map((r, i) => i);
  const o = fltOpt(b, id);
  if (o && !TUTTE(o) && isArr(b.gruppi)) idx = idx.filter(i => b.gruppi[i] === o);
  const so = S.sort[id];
  if (so) idx.sort((x, y) => { const a = sortKey(b.rows[x][so.i]), c = sortKey(b.rows[y][so.i]); const r = typeof a === typeof c ? (a < c ? -1 : a > c ? 1 : 0) : (typeof a === "number" ? 1 : -1); return r * so.d || x - y; });
  const total = o && b.totali && b.totali[o] ? b.totali[o] : b.total;
  return { rows: idx.map(i => b.rows[i]), total };
}
function tableHtml(head, rows, total, hl, sid) {
  hl = hl || [];
  const wide = head.map((h, i) => rows.some(r => typeof r[i] === "string" && r[i].length > 40));
  const isNum = c => c == null || typeof c === "number" || /^(€\s?)?[-+]?[\d.,]+\s?(%|pt)?$|^(n\.d\.|ND|-)$/i.test(String(c).trim());
  const numc = head.map((h, i) => rows.every(r => isNum(r[i])));
  const al = i => wide[i] ? ' class="w"' : i > 0 && numc[i] ? ' class="r"' : "";
  const so = sid ? S.sort[sid] : null;
  return `<div class="tw"><table><thead><tr>${head.map((h, i) => sid ? `<th${al(i).replace('class="', 'class="so ') || ''}${al(i) ? '' : ' class="so"'} data-sort="${sid}" data-i="${i}">${esc(h)}${so && so.i === i ? `<span class="ar">${so.d > 0 ? "↑" : "↓"}</span>` : ""}</th>` : `<th${al(i)}>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((r, ri) => `<tr${hl.includes(ri) ? ' class="hl"' : ""}>${r.map((c, i) => `<td${al(i)}>${i === 0 ? '<i class="dot"></i>' : ""}${fmt(c)}</td>`).join("")}</tr>`).join("")}${total ? `<tr class="tot">${total.map((c, i) => `<td${al(i)}>${fmt(c)}</td>`).join("")}</tr>` : ""}</tbody></table></div>`;
}
const card = (b, inner, action, a, nc) => `<div class="card"${a}>${b.title || action ? `<div class="ch"><div><div class="ct">${esc(b.title || "")}</div>${b.subtitle ? `<div class="cs">${esc(b.subtitle)}</div>` : ""}</div>${action ? `<div class="cha">${action}</div>` : ""}</div>` : ""}${inner}${b.note ? `<p class="${nc || "cn"}">${esc(b.note)}</p>` : ""}</div>`;
const kpi = k => `<div class="kpi${k.highlight ? " hl" : ""}"${acc(k.accent)}><span class="kl">${esc(k.label)}</span><div class="kvw"><span class="kv">${esc(k.value)}${k.suffix ? `<small>${esc(k.suffix)}</small>` : ""}</span></div>${k.delta ? `<span class="kd${k.good === true ? " ok" : k.good === false ? " ko" : ""}">${k.trend === "up" ? "↑ " : k.trend === "down" ? "↓ " : ""}${esc(k.delta)}</span>` : ""}${k.note ? `<span class="kn">${esc(k.note)}</span>` : ""}</div>`;
const switcher = (id, v, tipi) => { const op = [["colonne", "Colonne"], ["barre", "Barre"], ["linea", "Linea"], ["area", "Area"]].filter(([k]) => isArr(tipi) ? tipi.includes(k) : k !== "area"); return op.length < 2 ? "" : `<div class="sw3">${op.map(([k, l]) => `<button data-sw="${id}" data-v="${k}" class="${v === k ? "on" : ""}">${l}</button>`).join("")}</div>`; };

function block(b0, id) {
  const bad = check(b0);
  if (bad) return errBox(id, bad);
  try { return block0(b0, id); } catch (e) { return errBox(id, "errore di disegno: " + e.message); }
}
function block0(b0, id) {
  const b = norm(b0), a = acc(b.accent);
  switch (b.type) {
    case "kpi": return `<div class="kpis" style="--n:${Math.max(3, b.items.length)}">${b.items.map(kpi).join("")}</div>`;
    case "heading": return `<h2 class="hd"${a}>${esc(b.text)}</h2>`;
    case "table":
      REG.push({ id, b });
      { const v = PRN ? { rows: b.rows, total: b.total } : tableView(b, id), sid = b.sortable && !PRN ? id : null;
      return card(b, tableHtml(b.head, b.full || PRN ? v.rows : v.rows.slice(0, 6), v.total, b.hl, sid) + (!b.full && !PRN && v.rows.length > 6 ? `<p class="more">Mostrate 6 su ${v.rows.length} voci. Elenco completo in Apri tabella.</p>` : ""), (PRN ? "" : fltSw(b, id)) + `<button class="btn" data-open="${id}">Apri tabella</button>`, a); }
    case "colonne": case "barre": case "linea": case "area":
      REG.push({ id, b });
      return card(b, `<div data-c="${id}"></div>`, (PRN ? "" : fltSw(b, id)) + (b.switch === false ? "" : switcher(id, S.views[id] || b.type, b.tipi)), a, "nt");
    case "anelli": return `<div class="kpis anl" style="--n:${b.n || 3}">${b.items.map(r => `<div class="card ringc" style="grid-column:${r.col || "auto"}"><div class="ct">${esc(r.title)}</div>${ringSvg(r)}</div>`).join("")}</div>`;
    case "anello":
      REG.push({ id, b });
      return card(Object.assign({}, b, { note: undefined }), `<div data-c="${id}"></div>`, "", a);
    case "bolle": case "torta": case "segmenti": case "riempimento":
      REG.push({ id, b });
      return card(b, `<div data-c="${id}"></div>`, PRN ? "" : fltSw(b, id), a, "nt");
    case "evidenza": {
      const max = Math.max(...b.rows.map(r => +r.value || 0)) || 1;
      return `<div class="card dark"${a}>${b.title ? `<div class="ch"><div class="ct">${esc(b.title)}</div></div>` : ""}<div class="hb">${b.rows.map(r => `<div class="hr"><span class="hn">${esc(r.name)}</span><div class="hbs"><div class="ht"><div class="hf" style="width:${Math.max(1.5, (+r.value || 0) / max * 100)}%;background:var(--a1)"></div></div></div><span class="hv">${r.display ? esc(r.display) : fmt(r.value)}</span></div>`).join("")}</div></div>`;
    }
    case "lista":
      return card(b, "<div>" + b.rows.map(r => `<div class="li"><div class="lt"><i class="dot"${acc(r.accent)}></i><b>${esc(r.label)}</b>${r.detail ? `<small>${esc(r.detail)}</small>` : ""}</div>${r.value != null ? `<span class="lv">${fmt(r.value)}</span>` : ""}</div>`).join("") + "</div>", "", a);
    case "insight": return `<div class="ins"${a}><span class="il">${esc(b.label || "Text Mining Insights")}</span>${b.quote ? `<blockquote>“${esc(b.quote)}”</blockquote>` : ""}${b.text ? `<p>${esc(b.text)}</p>` : ""}</div>`;
    case "text": return card(b, `<p class="tx">${esc(b.text)}</p>`, "", a);
    case "avviso": return `<div class="warn"${a}>${I.warn}<span>${esc(b.text)}</span></div>`;
    case "imperr": return `<div class="err"><b>Richiesta non applicata</b><span>${esc(b.text)}</span></div>`;
    case "analisi": { const v = verificaNumeri(b.text, b.valori || []); return `<div class="aib"${a}><span class="al">Analisi AI</span><div><p data-full="${esc(v.html)}" data-plain="${esc(b.text)}">${v.html}</p>${v.nv ? `<span class="avn">${v.nv === 1 ? "1 numero non trovato" : v.nv + " numeri non trovati"} nei dati della dashboard: da verificare.</span>` : ""}</div></div>`; }
    case "controlli": return card(b, b.righe.map(r => `<div class="ctr${r.warn ? " w" : ""}"><b>${esc(r.label)}</b><span class="cv">${esc(fmt(r.value))}</span><span class="cd">${esc(r.detail || "")}</span></div>`).join(""), "", a.replace(/^$/, "") + "", "cn").replace('class="card"', 'class="card ctl"');
    case "classifica": return card(b, rankHtml(b), "", a);
    case "cols": return `<div class="cols" style="--n:${b.blocks.length}">${b.blocks.map((x, i) => block(x, id + "-" + i)).join("")}</div>`;
    default: return "";
  }
}

function disegna(t, b, W, id) {
  if (t === "colonne") return colSvg(b, W);
  if (t === "linea" || t === "area") return lineSvg(b, W, id, t === "area");
  if (t === "barre") return barHtml(b);
  if (t === "bolle") return bubbleSvg(b.series ? Object.assign({}, b, { series: undefined, data: valori(b) }) : b);
  if (t === "anello") return ringSvg(b);
  if (t === "torta") return pieSvg(b);
  if (t === "segmenti") return segHtml(b);
  if (t === "riempimento") return fillHtml(b);
  return "";
}
function draw() {
  REG.forEach(({ id, b }) => {
    const el = document.querySelector(`[data-c="${id}"]`); if (!el) return;
    const t = (b.switch === false ? b.type : S.views[id]) || b.type, W = Math.max(220, el.clientWidth);
    if (b.data && (isArr(b.filtri) || b.maxRighe)) {
      const pr = /^p/.test(String(id)), all = fltData(b, pr ? null : id) || [], mx = +b.maxRighe || 0, open = S.more[id] || pr;
      const vis = mx && !open ? all.slice(0, mx) : all, rest = all.length - mx;
      b = Object.assign({}, b, { data: vis.length ? vis : [{ name: "Nessuna fonte", value: 0, ...(b.series ? Object.fromEntries(b.series.map(k => [k, 0])) : {}) }] });
      try { el.innerHTML = disegna(t, b, W, id) + (mx && rest > 0 && !pr ? `<button class="mrb" data-more="${id}">${open ? "Mostra solo le prime " + mx : "Mostra altre " + rest + " voci"} ${open ? "▴" : "▾"}</button>` : ""); }
      catch (e) { el.innerHTML = `<div class="err"><b>Grafico non disegnabile</b><span>${esc(e.message)}</span></div>`; }
      return;
    }
    try { el.innerHTML = disegna(t, b, W, id); }
    catch (e) { el.innerHTML = `<div class="err"><b>Grafico non disegnabile</b><span>${esc(e.message)}</span></div>`; }
  });
  document.querySelectorAll(".kvw").forEach(w => {
    const s = w.firstElementChild; let f = 40; s.style.fontSize = f + "px";
    while (s.scrollWidth > w.clientWidth && f > 14) { f--; s.style.fontSize = f + "px"; }
  });
}
function page() {
  const t = DB.tabs[S.tab], m = $("#main"), keepTop = m.scrollTop; REG = [];
  if (!Array.isArray(t.blocks)) { m.innerHTML = `<div class="page">${errBox("cap" + S.tab, "il capitolo non ha l'elenco \"blocks\"")}</div>`; return; }
  m.innerHTML = `<div class="page"><header class="phd"><span class="cap">Capitolo ${pad(S.tab + 1)}</span><h1>${esc(t.title)}</h1>${t.subtitle ? `<p>${esc(t.subtitle)}</p>` : ""}</header>${t.blocks.map((b, i) => block(b, S.tab + "-" + i)).join("")}</div>`;
  const nuovo = S.last !== S.tab;
  if (nuovo) { m.scrollTop = 0; S.last = S.tab; } else m.scrollTop = keepTop;
  if (nuovo && !PRN) {
    m.classList.remove("anim"); void m.offsetWidth; m.classList.add("anim");
    [...m.querySelectorAll(".page>*")].forEach((e, i) => { e.style.animationDelay = Math.min(i * 60, 600) + "ms"; });
    clearTimeout(S.animT); S.animT = setTimeout(() => m.classList.remove("anim"), 2200);
  }
  draw();
  if (!nuovo) m.scrollTop = keepTop;
  prog();
  if (nuovo) animaPagina(m);
}
function verificaNumeri(text, valori) {
  const set = new Set(valori.map(v => String(v)));
  let nv = 0;
  const html = esc(text).replace(/(€\s?)?\d{1,3}(?:\.\d{3})+(?:,\d+)?%?|(€\s?)?\d+(?:,\d+)?%?/g, (m) => {
    const n = numVal(m); if (n == null) return m;
    if (set.has(String(n))) return m;
    if (/^\d{4}$/.test(m) && +m > 1990 && +m < 2100) return m;
    nv++; return `<mark class="nv" title="Numero non trovato nei dati della dashboard">${m}</mark>`;
  });
  return { html, nv };
}
function numVal(t) {
  const s = String(t).replace(/[€%\s]/g, "").replace(/\./g, "").replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(s)) return null;
  return Math.round(parseFloat(s) * 100) / 100;
}
function valoriCapitolo(tab) {
  const out = new Set();
  const walk = o => {
    if (o == null) return;
    if (typeof o === "number") { out.add(String(Math.round(o * 100) / 100)); return; }
    if (typeof o === "string") { (o.match(/(€\s?)?\d{1,3}(?:\.\d{3})+(?:,\d+)?%?|(€\s?)?\d+(?:,\d+)?%?/g) || []).forEach(m => { const n = numVal(m); if (n != null) out.add(String(n)); }); return; }
    if (Array.isArray(o)) { o.forEach(walk); return; }
    if (typeof o === "object") Object.keys(o).forEach(k => { if (k !== "text" || o.type !== "analisi") walk(o[k]); });
  };
  walk(tab.blocks.filter(b => b.type !== "analisi"));
  return [...out];
}
function animaPagina(m) {
  const ridotto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!ridotto) m.querySelectorAll(".kv").forEach(kv => {
    const tn = kv.firstChild; if (!tn || tn.nodeType !== 3) return;
    const orig = tn.nodeValue, mm = orig.match(/^(€ )?(\d{1,3}(?:\.\d{3})*)(,(\d+))?$/); if (!mm) return;
    const dec = mm[4] ? mm[4].length : 0, fin = parseFloat(mm[2].replace(/\./g, "") + (dec ? "." + mm[4] : "")), t0 = performance.now(), D = 900;
    const f = (x) => (mm[1] || "") + x.toFixed(dec).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/(,\d*)\./g, "$1");
    const step = t => { const p = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - p, 3); tn.nodeValue = p < 1 ? f(fin * e) : orig; if (p < 1) requestAnimationFrame(step); };
    tn.nodeValue = f(0); requestAnimationFrame(step);
  });
  m.querySelectorAll(".aib p[data-full]").forEach(p => {
    const full = p.getAttribute("data-full"), plain = p.getAttribute("data-plain") || "";
    if (ridotto || !plain) { p.innerHTML = full; return; }
    let i = 0; const box = p.closest(".aib"), per = Math.max(8, Math.min(28, 2600 / plain.length));
    p.textContent = ""; p.classList.add("tw");
    const fine = () => { clearInterval(tm); p.classList.remove("tw"); p.innerHTML = full; box.removeEventListener("click", fine); };
    const tm = setInterval(() => { i += 1; p.textContent = plain.slice(0, i); if (i >= plain.length) fine(); }, per);
    box.addEventListener("click", fine); S.typing = (S.typing || []).concat(tm);
  });
}
function prog() {
  const m = $("#main"), max = m.scrollHeight - m.clientHeight;
  $("#pf").style.width = (S.view !== "app" ? 0 : max <= 2 ? 100 : Math.min(100, m.scrollTop / max * 100)) + "%";
}
function modal() {
  const m = $("#modal"), b = S.modal;
  m.innerHTML = b ? `<div class="ov" data-close="1"><div class="mp"><div class="mh"><div><span class="mk">Trascrizione integrale</span><h3>${esc(b.title || "Tabella")}</h3></div><button class="mx" data-close="1">${I.x}</button></div><div class="mb">${(() => { const v = S.modalId ? tableView(b, S.modalId) : b; return tableHtml(b.head, v.rows, v.total, b.hl); })()}</div><div class="mf"><button class="btn" data-close="1">Chiudi</button></div></div></div>` : "";
}
function update() {
  const D = DB, n = D.tabs.length, h = document.documentElement;
  h.dataset.theme = S.light ? "light" : "dark";
  $("#shell").className = `shell v-${S.view}${S.collapsed ? " collapsed" : ""}`;
  $("#nav").innerHTML = D.tabs.map((t, i) => `<button class="nb${i === S.tab ? " on" : ""}" data-i="${i}" title="${esc(t.label)}"><span class="nn">${pad(i + 1)}</span><span class="nt">${esc(t.label)}</span></button>`).join("");
  $("#pn").textContent = `${pad(S.tab + 1)} / ${pad(n)}`;
  $("#ml").textContent = S.light ? "Proiettore" : "Modalità PC";
  $("#knob").innerHTML = S.light ? I.proj : I.pc;
  if (S.view === "app") page();
  modal();
}

function pageCss() {
  let st = document.getElementById("dg-page");
  if (!st) { st = document.createElement("style"); st.id = "dg-page"; (document.head || document.documentElement).appendChild(st); }
  const q = s => '"' + String(s || "").replace(/["\\\n]/g, " ") + '"';
  st.textContent = `@page{size:A4 portrait;margin:14mm 12mm 16mm}@page{@bottom-left{content:${q("Fratelli Giacomel S.p.A. · " + (DB.period || ""))};font:300 7.5pt Poppins,sans-serif;color:#8a909b}@bottom-right{content:counter(page) " / " counter(pages);font:500 7.5pt Poppins,sans-serif;color:#8a909b}}@page:first{@bottom-left{content:none}@bottom-right{content:none}}`;
}
function buildPrint() {
  const D = DB, keep = REG; let pr = document.getElementById("print");
  if (!pr) { pr = document.createElement("div"); pr.id = "print"; document.body.appendChild(pr); }
  REG = []; PRN = true;
  const foot = esc("Fratelli Giacomel S.p.A. · " + (D.period || ""));
  let h = `<section class="pg cover"><div>${logo(true)}<div class="line"></div><p class="cv1">${esc(D.period || "")}</p><p class="cv2">${pad(D.tabs.length)} capitoli</p></div><div class="toc">${D.tabs.map((t, i) => `<div><b>${pad(i + 1)}</b>${esc(t.label)}<span>${esc(t.title || "")}</span></div>`).join("")}</div><p class="cvf">Fratelli Giacomel S.p.A.</p></section>`;
  D.tabs.forEach((t, ti) => {
    if (!Array.isArray(t.blocks)) return;
    h += `<section class="pg" data-foot="${foot}"><header class="phd"><span class="cap">Capitolo ${pad(ti + 1)}</span><h1>${esc(t.title)}</h1>${t.subtitle ? `<p>${esc(t.subtitle)}</p>` : ""}</header>${t.blocks.map((b, i) => block(b, "p" + ti + "-" + i)).join("")}</section>`;
  });
  PRN = false;
  pr.innerHTML = h;
  draw();
  REG = keep;
  pageCss();
}
function printView(on) {
  const h = document.documentElement;
  if (on) { buildPrint(); h.classList.add("pv"); window.scrollTo(0, 0); }
  else { h.classList.remove("pv"); if (S.view === "app") { draw(); prog(); } }
}
function doPrint() {
  buildPrint();
  try { window.print(); } catch (e) {}
}

function skillVer() { const v = DB.skill || (String(DB.generatore || "").match(/v(\d+(?:\.\d+)*)/) || [])[1]; return v ? String(v) : ""; }
function vcmp(a, b) { const x = String(a).split(".").map(Number), y = String(b).split(".").map(Number); for (let i = 0; i < Math.max(x.length, y.length); i++) { const d = (x[i] || 0) - (y[i] || 0); if (d) return d; } return 0; }
function oldSkill() { const v = skillVer(); return !v || vcmp(v, ENGINE.minSkill) < 0; }
function verLine() { const v = skillVer(); return `<p class="ver end-only">${v ? "Skill " + esc(v) + " · " : ""}Motore ${ENGINE.version}</p>`; }
function init() {
  const D = DB, h = document.documentElement;
  document.title = ("dashboard_fratelli_giacomel_" + (D.period || "")).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  h.dataset.engine = "dashboard-giacomel@" + ENGINE.version;
  h.dataset.author = ENGINE.author;
  h.dataset.brand = D.brand === "blu" ? "blu" : "grafite";
  h.dataset.accent = D.accent === "blu" ? "blu" : "arancio";
  const per = D.period ? esc(D.period) : "";
  $("#app").innerHTML = `<div class="shell v-home" id="shell"><aside id="sb">
    <div class="splash"><div class="splash-in">${logo(true)}<div class="line"></div>
      <div class="home-only">${per ? `<p class="sp1">${per}</p>` : ""}<p class="sp2">${pad(D.tabs.length)} capitoli</p>${oldSkill() ? `<p class="oldskill">Skill ${esc(skillVer() || "precedente alla 5.0")} non aggiornata: reinstalla la skill per avere le ultime regole</p>` : ""}${ERR.length ? `<p class="errpill">⚠ ${ERR.length} ${ERR.length === 1 ? "problema" : "problemi"} nei dati: i blocchi coinvolti sono segnati in rosso</p>` : ""}<button class="start" id="bStart">Avvia <span>${I.arrow}</span></button></div>
      <div class="end-only"><h2 class="thanks">${esc(D.thanks || "GRAZIE PER L'ATTENZIONE")}</h2>${per ? `<p class="sp2">${per}</p>` : ""}</div></div>
      ${verLine()}<button class="restart end-only" id="bRestart">${I.home}<span>Ricomincia</span></button><p class="corp home-only">Fratelli Giacomel S.p.A.</p></div>
    <div class="menu"><div class="mtop"><button class="colbtn" id="bCol" title="Chiudi / apri barra laterale">${I.panel}</button></div>
      <div class="mlogo">${logo(false)}</div><nav id="nav"></nav>
      <div class="mbot"><div class="prog"><div class="ph"><span class="pl">Avanzamento</span><span id="pn" class="num"></span></div><div class="pt"><div class="pf" id="pf"></div></div></div>
        <div class="mode"><span class="ml" id="ml"></span><button class="sw" id="bMode" title="Modalità PC / Proiettore">${I.pc}${I.proj}<span class="knob" id="knob"></span></button></div>
        ${per ? `<p class="mper">${per}</p>` : ""}<p class="mcorp">Fratelli Giacomel S.p.A.</p><div class="mend"><button class="enddot" id="bEnd" title="Termina">${I.x}<span>Termina</span></button></div></div></div>
  </aside><main id="main"></main></div><div id="modal"></div>`;
  if (!document.getElementById("pvbar")) document.body.insertAdjacentHTML("beforeend", `<div id="pvbar"><i></i><span>Anteprima di stampa · A4</span><span><kbd>Ctrl</kbd> + <kbd>P</kbd> stampa / PDF</span><span><kbd>Esc</kbd> chiudi</span></div>`);
  $("#app").appendChild(document.createComment(" " + ENGINE.signature + " "));
  document.addEventListener("click", e => {
    const th = e.target.closest("th[data-sort]");
    if (th) { const k = th.dataset.sort, i = +th.dataset.i, o = S.sort[k]; S.sort[k] = o && o.i === i ? { i, d: -o.d } : { i, d: i === 0 ? 1 : -1 }; update(); return; }
    const t = e.target.closest("button,[data-close]"); if (!t) return;
    if (t.id === "bStart") S.view = "app";
    else if (t.id === "bEnd") { S.view = "end"; S.modal = null; }
    else if (t.id === "bRestart") { S.view = "home"; S.tab = 0; }
    else if (t.id === "bCol") S.collapsed = !S.collapsed;
    else if (t.id === "bMode") S.light = !S.light;
    else if (t.dataset.i != null) S.tab = +t.dataset.i;
    else if (t.dataset.sw) S.views[t.dataset.sw] = t.dataset.v;
    else if (t.dataset.open) { S.modal = (REG.find(r => r.id === t.dataset.open) || {}).b || null; S.modalId = t.dataset.open; }
    else if (t.dataset.flt) { S.flt[t.dataset.flt] = t.dataset.v; S.more[t.dataset.flt] = false; }
    else if (t.dataset.more) S.more[t.dataset.more] = !S.more[t.dataset.more];
    else if (t.dataset.close && (e.target === t || t.tagName === "BUTTON")) S.modal = null;
    else return;
    update();
  });
  document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.altKey && (e.code === "KeyA" || e.key === "a" || e.key === "A")) { e.preventDefault(); sign(); return; }
    if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === "p" || e.key === "P")) { e.preventDefault(); doPrint(); return; }
    if (e.ctrlKey && e.altKey && (e.code === "KeyP" || e.key === "p" || e.key === "P")) { e.preventDefault(); printView(!document.documentElement.classList.contains("pv")); return; }
    if (e.key === "Escape" && document.documentElement.classList.contains("pv")) { printView(false); return; }
    if (document.documentElement.classList.contains("pv")) return;
    if (e.key === "Escape" && $("#sig")) { $("#sig").remove(); return; }
    if (e.key === "Escape" && S.modal) { S.modal = null; modal(); return; }
    if (S.view !== "app" || S.modal) return;
    if ((e.key === "ArrowRight" || e.key === "PageDown") && S.tab < DB.tabs.length - 1) { S.tab++; update(); }
    if ((e.key === "ArrowLeft" || e.key === "PageUp") && S.tab > 0) { S.tab--; update(); }
  });
  $("#main").addEventListener("scroll", prog, { passive: true });
  let tm; if (window.ResizeObserver) new ResizeObserver(() => { clearTimeout(tm); tm = setTimeout(() => { if (S.view === "app") { draw(); prog(); } }, 120); }).observe($("#main"));
  window.addEventListener("beforeprint", buildPrint);
  update();
  buildPrint();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildPrint);
}



I.trophy = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>';
function fillHtml(b) {
  if (b.series) b = Object.assign({}, b, { legend: b.series.slice(0, 2), data: b.data.map(x => ({ name: x.name, value: +x[b.series[0]] || 0, part: +x[b.series[1]] || 0 })) });
  const d = b.data, vs = d.map(x => +x.value || 0), out = new Set();
  const mx = Math.max(1, ...vs);
  const lab = isArr(b.legend) && b.legend.length === 2 ? b.legend : ["Totale", "Parte"];
  const rows = d.map(x => {
    const v = +x.value || 0, p = +x.part || 0, cut = false, L = v ? Math.max(2, v / mx * 100) : 0, f = v ? Math.min(1, p / v) : 0;
    return `<div class="fr"><span class="hn">${esc(x.name)}</span><div class="ftk"><i class="fb${cut ? " cut" : ""}" style="width:${L}%"></i><i class="fp" style="width:${L * f}%"></i></div><span class="hv">${fmt(v)} | ${fmt(p)}</span></div>`;
  }).join("");
  return `<div class="hb">${rows}</div><div class="lg"><span><i style="background:color-mix(in srgb,var(--a2) 45%,transparent)"></i>${esc(lab[0])}</span><span><i style="background:var(--a1)"></i>${esc(lab[1])}</span></div>`;
}
function rankHtml(b) {
  const all = (b.data || []).map((x, i) => ({ n: x.name, v: +x.value || 0, i })), isND = x => /^n\/?d\.?$/i.test(String(x.n).trim());
  const nd = all.filter(isND), d = all.filter(x => !isND(x)).sort((x, y) => y.v - x.v || x.i - y.i);
  const ndHtml = (righe, mx) => nd.map(x => righe ? `<div class="rr nd"><span class="rkb">–</span><b>${esc(x.n)}</b><span class="lv">${fmt(x.v)}</span><div class="rbar"><i style="width:${Math.min(100, Math.max(2, x.v / (mx || 1) * 100))}%"></i></div></div>` : `<div class="li nd"><div class="lt"><span class="rkb">–</span><b>${esc(x.n)} · senza modello</b></div><span class="lv">${fmt(x.v)}</span></div>`).join("");
  if (!d.length && nd.length) return ndHtml(b.style === "righe", nd[0].v);
  if (!d.length) return `<p class="tx" style="color:var(--sub)">${esc(b.empty || "Nessun dato disponibile")}</p>`;
  d.forEach(x => { x.r = 1 + d.filter(y => y.v > x.v).length; });
  const u = b.unit ? " " + esc(d[0].v === 1 && b.unit === "contratti" ? "contratto" : b.unit) : "", mx = d[0].v || 1;
  const righe = d.map(x => `<div class="rr${x.r === 1 ? " top" : ""}"><span class="rkb">${x.r}</span><b>${esc(x.n)}${x.r === 1 ? I.trophy : ""}</b><span class="lv">${fmt(x.v)}</span><div class="rbar"><i style="width:${Math.max(2, x.v / mx * 100)}%"></i></div></div>`).join("") + ndHtml(true, mx);
  if (b.style === "righe") return righe;
  const w = d.filter(x => x.r === 1);
  return `<div class="rkg"><div class="rkw">${I.trophy}<div class="rkn">${w.map(x => esc(x.n)).join(" / ")}</div><div class="rkc">${fmt(w[0].v)}${u}</div></div><div class="rkl">${righe}</div></div>`;
}

function wrapLab(name, slot) {
  const s = String(name == null ? "" : name), max = Math.max(4, Math.floor((slot - 6) / 6.2));
  if (s.length <= max) return [s];
  const parts = s.split(/(?<=[\s./-])/), lines = [""];
  parts.forEach(p => { const cur = lines[lines.length - 1]; if (cur && (cur + p).trimEnd().length > max && lines.length < 2) lines.push(p); else lines[lines.length - 1] = cur + p; });
  return lines.map(l => l.trim()).map(l => l.length > max ? l.slice(0, max - 1) + "…" : l);
}
const TYPES = ["anelli","area","analisi","controlli","imperr","riempimento","classifica","kpi","heading","table","colonne","barre","linea","bars","progress","bolle","anello","segmenti","evidenza","lista","torta","donut","insight","text","avviso","cols"];
const ERR = [];
const isArr = Array.isArray, num = v => typeof v === "number" && isFinite(v);
function check(b) {
  if (!b || typeof b !== "object") return "blocco vuoto o non valido";
  if (!TYPES.includes(b.type)) return `tipo di blocco sconosciuto: "${b.type}"`;
  const need = (c, m) => c ? "" : m;
  switch (b.type) {
    case "kpi": return need(isArr(b.items) && b.items.length && b.items.every(k => k && k.label != null && k.value != null), "kpi: serve \"items\" con label e value per ogni card");
    case "heading": case "avviso": case "text": case "analisi": case "imperr": return need(b.text != null && b.text !== "", `${b.type}: manca "text"`);
    case "controlli": return need(isArr(b.righe), "controlli: serve \"righe\"");
    case "table": {
      if (!isArr(b.head) || !isArr(b.rows)) return "tabella: servono \"head\" e \"rows\"";
      const i = b.rows.findIndex(r => !isArr(r) || r.length !== b.head.length);
      if (i >= 0) return `tabella "${b.title || ""}": la riga ${i + 1} ha ${isArr(b.rows[i]) ? b.rows[i].length : 0} celle, le colonne sono ${b.head.length}`;
      if (b.total && (!isArr(b.total) || b.total.length !== b.head.length)) return `tabella "${b.title || ""}": la riga totale ha ${isArr(b.total) ? b.total.length : 0} celle, le colonne sono ${b.head.length}`;
      if (b.gruppi && (!isArr(b.gruppi) || b.gruppi.length !== b.rows.length)) return `tabella "${b.title || ""}": "gruppi" deve avere una voce per ogni riga`;
      if (b.totali && Object.values(b.totali).some(t => !isArr(t) || t.length !== b.head.length)) return `tabella "${b.title || ""}": un totale filtrato non ha ${b.head.length} celle`;
      return "";
    }
    case "colonne": case "barre": case "linea": case "area": case "bars": {
      if (!isArr(b.data) || !b.data.length) return `grafico "${b.title || ""}": "data" vuoto`;
      if (b.series) {
        if (!isArr(b.series) || !b.series.length) return `grafico "${b.title || ""}": "series" non valido`;
        const d = b.data.find(d => d.name == null || b.series.some(s => !num(d[s])));
        return d ? `grafico "${b.title || ""}": la voce "${d.name}" deve avere un numero per ${b.series.join(", ")}` : "";
      }
      const d = b.data.find(d => (d.name == null && d.label == null) || !num(d.value));
      return d ? `grafico "${b.title || ""}": la voce "${d.name != null ? d.name : d.label}" deve avere "value" numerico (senza virgolette)` : "";
    }
    case "anelli": return need(isArr(b.items) && b.items.length && b.items.every(r => num(r.value) && num(r.max)), "anelli: serve \"items\" con value e max numerici");
    case "progress": return need(isArr(b.rows) && b.rows.every(r => num(r.value)), "progress: serve \"rows\" con value numerico");
    case "bolle": return need(isArr(b.data) && b.data.length && b.data.every(d => num(d.value)), `bolle "${b.title || ""}": serve "data" con value numerico`);
    case "anello": return need(num(b.value) && num(b.max), `anello "${b.title || ""}": "value" e "max" devono essere numeri`);
    case "segmenti": return need(isArr(b.data) && b.data.length && b.data.every(d => d.perc != null || num(b.series ? d[b.series[0]] : d.value)), `segmenti "${b.title || ""}": serve "perc" o "value" per ogni voce`);
    case "evidenza": return need(isArr(b.rows) && b.rows.length && b.rows.every(r => num(r.value)), `evidenza "${b.title || ""}": serve "rows" con value numerico`);
    case "lista": return need(isArr(b.rows) && b.rows.every(r => r && r.label != null), `lista "${b.title || ""}": serve "rows" con label`);
    case "torta": case "donut": return need(isArr(b.data) && b.data.length && b.data.every(d => num(b.series ? d[b.series[0]] : d.value)), `torta "${b.title || ""}": serve "data" con value numerico`);
    case "insight": return need(b.quote || b.text, "insight: serve \"quote\" o \"text\"");
    case "riempimento": return need(isArr(b.data) && b.data.length && b.data.every(d => d.name != null && (b.series ? b.series.length >= 2 && num(d[b.series[0]]) && num(d[b.series[1]]) : num(d.value) && num(d.part))), `riempimento "${b.title || ""}": ogni voce deve avere name, value e part numerici`);
    case "classifica": return need(isArr(b.data) && b.data.every(d => d.name != null && num(d.value)), `classifica "${b.title || ""}": ogni voce deve avere name e value numerico`);
    case "cols": return need(isArr(b.blocks) && b.blocks.length >= 1 && b.blocks.length <= 3, "cols: servono da 1 a 3 blocchi in \"blocks\"");
  }
  return "";
}
function where(id) { const p = String(id).replace(/^p/, "").split("-"); return `Capitolo ${+p[0] + 1}, blocco ${+p[1] + 1}${p[2] != null ? "." + (+p[2] + 1) : ""}`; }
function errBox(id, msg) { return `<div class="err"><b>Dato da correggere · ${esc(String(id).startsWith("cap") ? "Capitolo " + (+String(id).slice(3) + 1) : where(id))}</b><span>${esc(msg)}</span></div>`; }
function scan() {
  (DB.tabs || []).forEach((t, ti) => {
    if (!t || !isArr(t.blocks)) { ERR.push(`Capitolo ${ti + 1}: manca "blocks"`); return; }
    t.blocks.forEach((b, bi) => {
      const e = check(b); if (e) ERR.push(`${where(ti + "-" + bi)}: ${e}`);
      else if (b.type === "cols") b.blocks.forEach((x, xi) => { const e2 = check(x); if (e2) ERR.push(`${where(ti + "-" + bi + "-" + xi)}: ${e2}`); });
    });
  });
  if (ERR.length && window.console) console.warn("[Dashboard Giacomel] Dati da correggere:\n- " + ERR.join("\n- "));
}
function sign() {
  if ($("#sig")) { $("#sig").remove(); return; }
  const g = DB && (DB.generatore || DB.generator) ? esc(DB.generatore || DB.generator) : "";
  const d = document.createElement("div"); d.id = "sig";
  d.innerHTML = `<div><h4>Dashboard Giacomel</h4><span>Engine</span> v${ENGINE.version} · ${ENGINE.build}<br><span>Developed by</span> ${ENGINE.author}<br>${g ? `<span>Skill</span> ${g}<br>` : ""}<span>Period</span> ${esc(DB.period || "-")}<p class="k">Esc / Ctrl+Alt+A per chiudere</p></div>`;
  d.addEventListener("click", () => d.remove());
  document.body.appendChild(d);
}
function fatal(msg) {
  const box = document.getElementById("app") || document.body.appendChild(Object.assign(document.createElement("div"), { id: "app" }));
  box.removeAttribute("style");
  if (!document.getElementById("dg-style")) { const st = document.createElement("style"); st.id = "dg-style"; st.textContent = CSS; (document.head || document.documentElement).appendChild(st); }
  box.innerHTML = `<div class="fatal"><div class="err"><b>Dashboard non disponibile</b><span>${esc(msg)}</span><code>${esc(ENGINE.signature)}</code></div></div>`;
}

function controlloDati(D) {
  const c = D.controllo || {}, sum = (a, i) => a.reduce((s, r) => s + (+r[i < 0 ? r.length + i : i] || 0), 0), cp = s => Array.from(String(s)).length;
  const att = { paid: [D.paid.length, sum(D.paid, 3), sum(D.paid, 4)], lead: [D.lead.length, sum(D.lead, -1)], prev: [D.prev.length, sum(D.prev, -1)], promo: [D.promo.length, D.promo.reduce((s, p) => s + cp(p.join("")), 0)] };
  const bad = Object.keys(att).filter(k => !isArr(c[k]) || c[k].join() !== att[k].join());
  return bad;
}
function caricaRegole() {
  const base = SRC ? SRC.replace(/motore\.js(\?.*)?$/, "regole_paid.txt") : "";
  const urls = [base, "https://andrea300992.github.io/dashboard-giacomel-regole/regole_paid.txt", "https://cdn.jsdelivr.net/gh/Andrea300992/dashboard-giacomel-regole@main/regole_paid.txt"].filter((u, i, a) => u && a.indexOf(u) === i);
  const prova = i => i >= urls.length ? Promise.reject(new Error("file delle regole paid non raggiungibile"))
    : fetch(urls[i], { cache: "no-store" }).then(r => r.ok ? r.text() : Promise.reject()).then(t => /PAID/i.test(t) ? t : Promise.reject()).catch(() => prova(i + 1));
  return prova(0);
}
const FAM = { serie: ["barre", "colonne", "linea"], valori: ["barre", "colonne", "linea", "bolle"], classifica: ["classifica", "barre", "colonne"] };
const NOMI_TIPI = { barre: "Barre", colonne: "Colonne", linea: "Linea", area: "Area", bolle: "Bolle", torta: "Torta", segmenti: "Segmenti", riempimento: "Riempimento", classifica: "Classifica" };
const CARTESIANI = ["colonne", "barre", "linea", "area"];
function ammessi(b) { return isArr(b.tipi) ? b.tipi : FAM[b.type === "classifica" ? "classifica" : b.series ? "serie" : "valori"]; }
function converti(b, tipo) {
  if (b.type === "classifica" && tipo !== "classifica") { b.data = b.data.filter(d => d.name !== "N/D"); delete b.style; }
  if (b.series && ["torta", "segmenti", "bolle"].includes(tipo)) b.subtitle = [b.subtitle, "quote calcolate su: " + b.series[0].toLowerCase()].filter(Boolean).join(" · ");
  if (!CARTESIANI.includes(tipo)) b.switch = false;
  if (["torta", "segmenti"].includes(tipo)) delete b.maxRighe;
  b.type = tipo;
  return b;
}
function anelliDi(kb) {
  return (kb.items || []).map((k, i) => [k, i + 1]).filter(([k]) => isArr(k.anello) && k.anello[1] > 0).map(([k, c]) => ({ col: c, title: k.label, value: k.anello[0], max: k.anello[1], display: k.anello[2], label: k.note || "", note: fmt(k.anello[0]) + " su " + fmt(k.anello[1]) }));
}
function gruppi3(arr) { const out = []; for (let i = 0; i < arr.length; i += 3) out.push({ type: "cols", blocks: arr.slice(i, i + 3) }); return out; }
function catalogo(D) {
  const tutti = []; D.tabs.forEach(t => t.blocks.forEach(b => { if (b.id && b.type !== "kpi") tutti.push([t, b]); if (b.type === "cols") b.blocks.forEach(x => x.id && tutti.push([t, x])); }));
  const clone = o => JSON.parse(JSON.stringify(o)), tabs = [];
  ["barre", "colonne", "linea", "area", "bolle", "torta", "segmenti", "riempimento", "classifica"].forEach(tipo => {
    const bl = tutti.filter(([, b]) => ammessi(b).includes(tipo)).map(([t, b]) => { const x = converti(clone(b), tipo); x.subtitle = [t.label, x.subtitle].filter(Boolean).join(" · "); x.switch = false; delete x.note; delete x.id; return x; });
    if (bl.length) tabs.push({ key: "cat-" + tipo, label: NOMI_TIPI[tipo], title: "Grafico: " + NOMI_TIPI[tipo].toLowerCase(), subtitle: bl.length + (bl.length === 1 ? " grafico della dashboard" : " grafici della dashboard") + " si possono mostrare così.", blocks: bl });
  });
  const an = []; D.tabs.forEach(t => t.blocks.forEach(b => { if (b.type === "kpi") anelliDi(b).forEach(r => { r.title = t.label + (/trimestre$/.test(b.id || "") && !/trimestre/.test(t.key) ? " trimestre" : "") + " · " + r.title; an.push(r); }); }));
  const anB = []; for (let i = 0; i < an.length; i += 3) anB.push({ type: "anelli", n: 3, items: an.slice(i, i + 3).map((r, j) => Object.assign(r, { col: j + 1 })) });
  if (an.length) tabs.push({ key: "cat-anelli", label: "Anelli", title: "Anelli sotto i KPI", subtitle: "Le percentuali dei KPI si possono aggiungere come anelli, sotto la riga dei KPI.", blocks: anB });
  tabs.push({ key: "cat-elenco", label: "Elenco", title: "Grafici che si possono cambiare", subtitle: "Chiedi a Gemini, ad esempio: metti il CPL per fonte a bolle.",
    blocks: [{ type: "table", title: "Grafici e tipi ammessi", full: true, head: ["Capitolo", "Grafico", "Tipi ammessi"], rows: tutti.map(([t, b]) => [t.label, b.title, ammessi(b).map(x => NOMI_TIPI[x].toLowerCase()).join(", ")]) }] });
  D.tabs = tabs; D.catalogo = true;
}
const NO_ANALISI = ["organico-mese", "organico-trimestre"];
function applicaImpostazioni(D, I0) {
  const I = I0 || {}, err = {}, addErr = (key, t) => { (err[key || D.tabs[0].key] = err[key || D.tabs[0].key] || []).push(t); };
  const tutti = []; D.tabs.forEach(t => t.blocks.forEach(b => { tutti.push([t, b]); if (b.type === "cols") b.blocks.forEach(x => tutti.push([t, x])); }));
  const trova = id => tutti.find(([, b]) => b.id === id);
  const tab = key => D.tabs.find(t => t.key === key);
  const C = I.colori || {};
  if (C.sfondo) { if (["grafite", "blu"].includes(C.sfondo)) D.brand = C.sfondo; else addErr(null, `colore sfondo "${C.sfondo}" non disponibile (ammessi: grafite, blu)`); }
  if (C.accento) { if (["arancio", "blu"].includes(C.accento)) D.accent = C.accento; else addErr(null, `colore accento "${C.accento}" non disponibile (ammessi: arancio, blu)`); }
  if (I.tema) { if (["chiaro", "scuro"].includes(I.tema)) D.tema = I.tema; else addErr(null, `tema "${I.tema}" non disponibile (ammessi: chiaro, scuro)`); }
  Object.keys(I.grafici || {}).forEach(id => {
    const tipo = I.grafici[id], f = trova(id);
    if (!f) return addErr(null, `grafico "${id}" inesistente`);
    const b = f[1], am = ammessi(b);
    if (!am.includes(tipo)) return addErr(f[0].key, `il grafico "${b.title}" non può diventare "${tipo}" (ammessi: ${am.join(", ")})`);
    converti(b, tipo);
  });
  (isArr(I.anelli) ? I.anelli : []).forEach(id0 => {
    const id = String(id0), f = trova(id);
    if (!f || f[1].type !== "kpi") return addErr(null, `anelli: "${id}" non è una riga di KPI`);
    const bl = f[0].blocks; let i = bl.indexOf(f[1]); if (bl.some(x => x.id === id + ".anelli")) return;
    let r = anelliDi(f[1]), n = f[1].items.length;
    while (bl[i + 1] && (bl[i + 1].type === "kpi" || bl[i + 1].type === "anelli")) { i++; if (bl[i].type === "kpi") { r = r.concat(anelliDi(bl[i])); n = Math.max(n, bl[i].items.length); } }
    if (!r.length) return addErr(f[0].key, `anelli: i KPI "${id}" non hanno percentuali da mostrare`);
    bl.splice(i + 1, 0, { type: "anelli", id: id + ".anelli", n: Math.max(3, n), items: r });
  });
  Object.keys(I.note || {}).forEach(id => { const f = trova(id); if (!f) return addErr(null, `blocco "${id}" inesistente per la nota`); if (I.note[id]) f[1].note = String(I.note[id]); else delete f[1].note; });
  Object.keys(I.evidenza || {}).forEach(key => {
    const t = tab(key); if (!t) return addErr(null, `capitolo "${key}" inesistente`);
    const lab = String(I.evidenza[key] || "").toLowerCase(); let ok = !lab;
    t.blocks.filter(b => b.type === "kpi").forEach(b => b.items.forEach(it => { it.highlight = !!lab && it.label.toLowerCase() === lab; if (it.highlight) ok = true; }));
    if (!ok) addErr(key, `nessun KPI "${I.evidenza[key]}" da evidenziare`);
  });
  (isArr(I.analisi) ? I.analisi : []).forEach(an => {
    const t = tab(an.capitolo); if (!t) return addErr(null, `analisi: capitolo "${an.capitolo}" inesistente`);
    if (NO_ANALISI.includes(an.capitolo)) return addErr(an.capitolo, "l'analisi AI non è disponibile sui lead organici");
    if (!an.testo) return;
    const dopo = an.dopo ? (an.dopo.indexOf(".") > 0 ? an.dopo : an.capitolo + "." + an.dopo) : null;
    let i = dopo ? t.blocks.findIndex(b => b.id === dopo || (b.type === "cols" && b.blocks.some(x => x.id === dopo))) : -1;
    if (dopo && i < 0) { addErr(an.capitolo, `analisi: blocco "${an.dopo}" inesistente, inserita in fondo`); i = t.blocks.length - 1; }
    if (t.blocks[i] && t.blocks[i].type === "kpi") while (t.blocks[i + 1] && (t.blocks[i + 1].type === "kpi" || t.blocks[i + 1].type === "anelli")) i++;
    if (!dopo) i = t.blocks.length - 1;
    t.blocks.splice(i + 1, 0, { type: "analisi", text: String(an.testo), valori: valoriCapitolo({ blocks: [].concat(...D.tabs.map(x => x.blocks)) }) });
  });
  Object.keys(I.capitoli || {}).forEach(key => {
    const t = tab(key), c = I.capitoli[key] || {}; if (!t) return addErr(null, `capitolo "${key}" inesistente`);
    if (c.nome) t.label = String(c.nome);
    if (c.titolo) t.title = String(c.titolo);
    if (c.nascosto) t._hide = true;
  });
  if (I.catalogo === true) catalogo(D);
  D.tabs.forEach(t => { if (err[t.key]) t.blocks.unshift(...err[t.key].map(x => ({ type: "imperr", text: x }))); });
  D.tabs = D.tabs.filter(t => !t._hide);
  if (!D.tabs.length) throw new Error("tutti i capitoli sono nascosti");
}
let AVVIO = false;
function boot() {
  if (DB || AVVIO) return;
  let d = null, dati = null, imp = null;
  try { dati = DATI; } catch (e) { dati = window.DATI || null; }
  try { imp = IMPOSTAZIONI; } catch (e) { imp = window.IMPOSTAZIONI || null; }
  if (dati) {
    AVVIO = true;
    const bad = controlloDati(dati);
    if (bad.length) { fatal("I dati copiati nella dashboard sono incompleti o alterati (" + bad.join(", ") + "). Chiedi a Gemini di ricopiare la riga DATI esattamente come stampata dallo script."); return; }
    caricaRegole().then(txt => {
      try { DB = CALCOLO.costruisci(dati, txt); applicaImpostazioni(DB, imp); } catch (e) { fatal("Errore nel calcolo della dashboard: " + e.message); return; }
      avvia();
    }).catch(e => fatal("Impossibile caricare le regole paid da GitHub (" + e.message + "). Controlla la connessione a internet e ricarica."));
    return;
  }
  try { d = DASHBOARD; } catch (e) { d = window.DASHBOARD || null; }
  if (!d) { if (document.readyState !== "complete") return; fatal("Nessun dato trovato nella pagina: l'HTML deve contenere const DATI = {...} prima del motore."); return; }
  DB = d; avvia();
}
function avvia() {
  const head = document.head || document.documentElement;
  if (!document.querySelector('link[href*="family=Poppins"]')) { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"; head.appendChild(l); }
  const st = document.createElement("style"); st.id = "dg-style"; st.textContent = CSS + PCSS; head.appendChild(st);
  [["author", ENGINE.author], ["generator", ENGINE.signature]].forEach(([n, c]) => { const m = document.createElement("meta"); m.name = n; m.content = c; head.appendChild(m); });
  const app = document.getElementById("app") || document.body.appendChild(Object.assign(document.createElement("div"), { id: "app" }));
  app.removeAttribute("style"); app.textContent = "";
  if (!isArr(DB.tabs) || !DB.tabs.length) { fatal("L'oggetto DASHBOARD non contiene capitoli (\"tabs\" vuoto o mancante)."); return; }
  if (DB.tema === "chiaro") S.light = true;
  scan();
  if (window.console) console.info("%c" + ENGINE.signature, "color:#fd8534;font-weight:600");
  init();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
window.addEventListener("load", boot);
})();
