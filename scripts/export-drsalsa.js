/**
 * Dr. Salsa static export: builds standalone HTML + img, zips to public/download/drsalsa-export.zip
 * Run: node scripts/export-drsalsa.js
 * Output: public/download/drsalsa-export.zip (contains index.html + img/*)
 * URL: https://brillcode.hu/download/drsalsa-export.zip
 */

const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

const ROOT = path.resolve(__dirname, "..");
const DATA_PATH = path.join(ROOT, "scripts", "export-drsalsa-data.json");
const CSS_PATH = path.join(ROOT, "scripts", "export-drsalsa.css");
const IMG_SRC = path.join(ROOT, "public", "figala", "drsalsa", "img");
const BUILD_DIR = path.join(ROOT, "build", "drsalsa-export");
const ZIP_PATH = path.join(ROOT, "public", "download", "drsalsa-export.zip");

// Image paths in HTML (relative to index.html next to img/)
const img = (file) => `img/${file}`;

function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSections(data, activeLang) {
  const c = data;
  const sections = [];
  const huActive = activeLang === "hu" ? " ds-lang-active" : "";
  const enActive = activeLang === "en" ? " ds-lang-active" : "";

  // —— NAV ——
  sections.push(`
<nav class="ds-nav">
  <a href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;"><img src="${img("salsalogo.png")}" alt="Dr. Salsa" style="height:40px;width:auto;object-fit:contain;display:block"/></a>
  <div style="display:flex;align-items:center;gap:12px">
    <div style="display:flex;background:rgba(28,25,23,0.06);border-radius:100px;padding:3px">
      <a href="?lang=hu" class="ds-lang${huActive}">HU</a>
      <a href="?lang=en" class="ds-lang${enActive}">EN</a>
    </div>
    <a href="tel:+36209384691" class="ds-cta" style="padding:10px 24px;font-size:13px">${escapeHtml(c.nav.cta)}</a>
  </div>
</nav>`);

  // —— HERO ——
  sections.push(`
<section class="ds-section-bg" style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 24px 80px">
  <div class="ds-bg-image" style="background-image:url(${img("8J5A0132.JPG")})"></div>
  <div class="ds-bg-overlay" style="background:linear-gradient(180deg, rgba(245,242,237,0.65) 0%, rgba(245,242,237,0.82) 50%, rgba(245,242,237,0.95) 100%)"></div>
  <div class="ds-orb" style="width:600px;height:600px;top:-15%;right:-10%;background:radial-gradient(circle,rgba(232,93,74,0.18),transparent 70%);z-index:1"></div>
  <div class="ds-orb" style="width:500px;height:500px;bottom:-10%;left:-12%;background:radial-gradient(circle,rgba(212,165,71,0.1),transparent 70%);animation-delay:-3s;z-index:1"></div>
  <div style="position:absolute;inset:0;z-index:1;background-image:linear-gradient(rgba(28,25,23,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.06) 1px, transparent 1px);background-size:80px 80px;pointer-events:none"></div>
  <div class="ds-bg-content" style="text-align:center;max-width:900px">
    <div style="display:inline-flex;align-items:center;gap:0;background:rgba(232,93,74,0.06);border:1px solid rgba(232,93,74,0.15);border-radius:20px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#E85D4A,#D14030);padding:14px 24px;display:flex;flex-direction:column;align-items:center;line-height:1;color:#fff">
        <span style="font-size:10px;font-weight:800;letter-spacing:0.15em;opacity:0.9">${escapeHtml(c.hero.dateLabel)}</span>
        <span style="font-size:28px;font-weight:900;letter-spacing:-0.02em;margin-top:4px">${escapeHtml(c.hero.dateDay)}</span>
      </div>
      <div style="padding:12px 24px">
        <span style="font-size:13px;font-weight:600;color:rgba(28,25,23,0.75);letter-spacing:0.03em">${escapeHtml(c.hero.dateYear)}</span>
      </div>
    </div>
    <h1 style="font-size:clamp(48px,10vw,110px);font-weight:900;line-height:0.95;margin-top:40px;margin-bottom:32px;letter-spacing:-0.04em">
      ${escapeHtml(c.hero.h1_1)}<br/><span class="ds-grad-text">${escapeHtml(c.hero.h1_2)}</span>
    </h1>
    <p style="font-size:clamp(14px,2vw,18px);font-weight:600;letter-spacing:0.25em;text-transform:uppercase;color:rgba(28,25,23,0.55);margin-bottom:24px">${escapeHtml(c.hero.sub)}</p>
    <p style="font-size:clamp(16px,2vw,20px);color:rgba(28,25,23,0.7);line-height:1.6;max-width:560px;margin:0 auto 48px">${escapeHtml(c.hero.desc)}</p>
    <a href="tel:+36209384691" class="ds-cta">${escapeHtml(c.hero.cta)} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
  </div>
  <div class="ds-bg-content" style="position:absolute;bottom:40px;display:flex;flex-direction:column;align-items:center;gap:12px">
    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(28,25,23,0.35)">${escapeHtml(c.hero.scroll)}</span>
    <div style="width:1px;height:40px;background:linear-gradient(to bottom, rgba(28,25,23,0.2), transparent)"></div>
  </div>
</section>`);

  // —— DANCE STYLES ——
  const styleCards = (c.styles.items || []).map((s, i) => `
    <div class="ds-dance-card">
      <div style="position:absolute;top:24px;right:28px;font-size:80px;font-weight:900;line-height:1;color:rgba(28,25,23,0.12);letter-spacing:-0.04em">0${i + 1}</div>
      <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#E85D4A;margin-bottom:16px">${escapeHtml(s.vibe)}</div>
      <h3 style="font-size:clamp(28px,4vw,40px);font-weight:900;letter-spacing:-0.03em;margin-bottom:16px;line-height:1.1">${escapeHtml(s.name)}</h3>
      <p style="font-size:15px;line-height:1.65;color:rgba(28,25,23,0.65)">${escapeHtml(s.desc)}</p>
    </div>`).join("");
  sections.push(`
<section class="ds-section-bg" style="padding:120px 24px">
  <div class="ds-bg-image" style="background-image:url(${img("8J5A0039.JPG")})"></div>
  <div class="ds-bg-overlay" style="background:linear-gradient(180deg, rgba(245,242,237,0.82) 0%, rgba(245,242,237,0.94) 100%)"></div>
  <div class="ds-bg-content" style="max-width:1200px;margin:0 auto">
    <p style="text-align:center;font-size:13px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(28,25,23,0.5);margin-bottom:64px">${escapeHtml(c.styles.label)}</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px">${styleCards}</div>
  </div>
</section>`);

  // —— URGENCY ——
  sections.push(`
<section class="ds-section-bg" style="padding:100px 24px;text-align:center">
  <div class="ds-bg-image" style="background-image:url(${img("8J5A0169.JPG")})"></div>
  <div class="ds-bg-overlay" style="background:linear-gradient(180deg, rgba(245,242,237,0.75) 0%, rgba(245,242,237,0.92) 100%)"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,93,74,0.06), transparent);pointer-events:none;z-index:1"></div>
  <div class="ds-bg-content" style="max-width:700px;margin:0 auto">
    <p style="font-size:clamp(28px,5vw,48px);font-weight:900;letter-spacing:-0.03em;line-height:1.15;margin-bottom:20px">
      ${escapeHtml(c.urgency.pre)} <span class="ds-grad-text" style="font-size:clamp(36px,7vw,72px);display:block;line-height:1;margin:16px 0">${escapeHtml(c.urgency.date)}</span> ${escapeHtml(c.urgency.post)}
    </p>
    <p style="font-size:16px;color:rgba(28,25,23,0.6);margin-bottom:36px;letter-spacing:0.02em">${escapeHtml(c.urgency.spots)}</p>
    <a href="tel:+36209384691" class="ds-cta">${escapeHtml(c.urgency.cta)} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
  </div>
</section>`);

  // —— PROBLEM ——
  const problemItems = (c.problem.items || []).map((item, i) => `
    <div style="padding:28px 0;border-bottom:1px solid rgba(28,25,23,0.1);display:flex;align-items:center;gap:20px">
      <span style="font-size:14px;font-weight:800;color:rgba(28,25,23,0.25);min-width:28px">0${i + 1}</span>
      <p style="font-size:17px;line-height:1.5;color:rgba(28,25,23,0.7);font-weight:500;margin:0">${escapeHtml(item)}</p>
    </div>`).join("");
  sections.push(`
<section class="ds-section-bg" style="padding:100px 24px">
  <div class="ds-bg-image" style="background-image:url(${img("8J5A0076.JPG")})"></div>
  <div class="ds-bg-overlay" style="background:rgba(245,242,237,0.88)"></div>
  <div class="ds-bg-content" style="max-width:800px;margin:0 auto">
    <h2 style="font-size:clamp(32px,5vw,48px);font-weight:900;letter-spacing:-0.03em;margin-bottom:48px;text-align:center">${escapeHtml(c.problem.h2)}</h2>
    <div style="display:flex;flex-direction:column;gap:0">${problemItems}</div>
    <div style="margin-top:56px;text-align:center">
      <p style="font-size:clamp(22px,3.5vw,32px);font-weight:800;letter-spacing:-0.02em;line-height:1.3"><span class="ds-grad-text">${escapeHtml(c.problem.answer)}</span></p>
    </div>
  </div>
</section>`);

  // —— STATS ——
  const statItems = (c.stats || []).map((stat, i) => `
    <div style="text-align:center;padding:40px 20px;border-right:${i < c.stats.length - 1 ? "1px solid rgba(28,25,23,0.1)" : "none"}">
      <div class="ds-stat-num"><span class="ds-grad-text">${Number(stat.value).toLocaleString()}${escapeHtml(stat.suffix || "")}</span></div>
      <p style="font-size:14px;color:rgba(28,25,23,0.55);margin-top:12px;font-weight:500;letter-spacing:0.02em">${escapeHtml(stat.label)}</p>
    </div>`).join("");
  sections.push(`
<section class="ds-section-bg" style="padding:80px 24px">
  <div class="ds-bg-image" style="background-image:url(${img("8J5A0135.JPG")})"></div>
  <div class="ds-bg-overlay" style="background:linear-gradient(180deg, rgba(245,242,237,0.8) 0%, rgba(245,242,237,0.92) 100%)"></div>
  <div class="ds-bg-content" style="max-width:1100px;margin:0 auto">
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:0">${statItems}</div>
  </div>
</section>`);

  // —— BENEFITS ——
  const benefitItems = (c.benefits.items || []).map((b, i) => `
    <div class="ds-benefit-row" style="display:grid;grid-template-columns:80px 1fr;gap:0;border-top:${i === 0 ? "1px solid rgba(28,25,23,0.1)" : "none"};border-bottom:1px solid rgba(28,25,23,0.1);padding:48px 0;position:relative">
      <div style="position:absolute;inset:-1px -24px;border-radius:16px;background:linear-gradient(90deg, rgba(232,93,74,0.04), rgba(212,165,71,0.02), transparent);opacity:0;transition:opacity 0.5s;pointer-events:none" class="ds-benefit-glow"></div>
      <div style="position:relative;z-index:1;display:flex;align-items:flex-start;padding-top:4px">
        <span class="ds-grad-text" style="font-size:48px;font-weight:900;line-height:1;letter-spacing:-0.04em;opacity:0.6">${String(i + 1).padStart(2, "0")}</span>
      </div>
      <div style="position:relative;z-index:1">
        <h3 style="font-size:clamp(20px,3vw,28px);font-weight:800;letter-spacing:-0.02em;margin-bottom:12px;line-height:1.2">${escapeHtml(b.title)}</h3>
        <p style="font-size:16px;line-height:1.65;color:rgba(28,25,23,0.65);max-width:560px;margin:0">${escapeHtml(b.text)}</p>
      </div>
    </div>`).join("");
  sections.push(`
<section class="ds-section-bg" style="padding:100px 24px">
  <div class="ds-bg-image" style="background-image:url(${img("8J5A0076.JPG")})"></div>
  <div class="ds-bg-overlay" style="background:rgba(245,242,237,0.85)"></div>
  <div class="ds-bg-content" style="max-width:900px;margin:0 auto">
    <p style="text-align:center;font-size:13px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(28,25,23,0.5);margin-bottom:72px">${escapeHtml(c.benefits.label)}</p>
    <div>${benefitItems}</div>
  </div>
</section>`);

  // —— OFFER ——
  const offerDetails = (c.offer.details || []).map((d) => `
    <div style="display:flex;align-items:center;gap:10px;font-size:14px;font-weight:500;color:rgba(28,25,23,0.65)">
      <div style="width:20px;height:20px;border-radius:50%;background:rgba(232,93,74,0.15);display:flex;align-items:center;justify-content:center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E85D4A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>${escapeHtml(d)}
    </div>`).join("");
  sections.push(`
<section id="ds-offer" class="ds-section-bg" style="padding:120px 24px">
  <div class="ds-bg-image" style="background-image:url(${img("8J5A0169.JPG")})"></div>
  <div class="ds-bg-overlay" style="background:linear-gradient(180deg, rgba(245,242,237,0.7) 0%, rgba(245,242,237,0.9) 100%)"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,93,74,0.1), transparent);pointer-events:none;z-index:1"></div>
  <div class="ds-bg-content" style="max-width:700px;margin:0 auto;text-align:center">
    <h2 style="font-size:clamp(40px,7vw,72px);font-weight:900;letter-spacing:-0.04em;line-height:1;margin-bottom:28px"><span class="ds-grad-text">${escapeHtml(c.offer.h2)}</span></h2>
    <p style="font-size:18px;line-height:1.65;color:rgba(28,25,23,0.65);margin-bottom:48px;max-width:560px;margin-left:auto;margin-right:auto">${escapeHtml(c.offer.sub)}</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:24px;margin-bottom:52px">${offerDetails}</div>
    <a href="tel:+36209384691" class="ds-cta">${escapeHtml(c.offer.cta)} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
  </div>
</section>`);

  // —— FAQ ——
  const faqItems = (c.faq.items || []).map((item, i) => `
    <div class="ds-faq-item">
      <button type="button" class="ds-faq-btn" data-faq="${i}" aria-expanded="false">
        <span>${escapeHtml(item.q)}</span>
        <span class="ds-faq-icon">+</span>
      </button>
      <div class="ds-faq-answer" style="max-height:0;overflow:hidden;opacity:0;transition:max-height 0.4s ease, opacity 0.3s">
        <p style="font-size:15px;line-height:1.65;color:rgba(28,25,23,0.6);padding-bottom:24px;margin:0">${escapeHtml(item.a)}</p>
      </div>
    </div>`).join("");
  sections.push(`
<section class="ds-section-bg" style="padding:100px 24px">
  <div class="ds-bg-image" style="background-image:url(${img("8J5A0039.JPG")})"></div>
  <div class="ds-bg-overlay" style="background:rgba(245,242,237,0.88)"></div>
  <div class="ds-bg-content" style="max-width:700px;margin:0 auto">
    <h2 style="font-size:clamp(28px,4vw,40px);font-weight:900;letter-spacing:-0.03em;margin-bottom:48px">${escapeHtml(c.faq.h2)}</h2>
    <div>${faqItems}</div>
  </div>
</section>`);

  // —— FINAL CTA ——
  sections.push(`
<section class="ds-section-bg" style="padding:120px 24px;text-align:center">
  <div class="ds-bg-image" style="background-image:url(${img("8J5A0132.JPG")})"></div>
  <div class="ds-bg-overlay" style="background:linear-gradient(180deg, rgba(245,242,237,0.72) 0%, rgba(245,242,237,0.93) 100%)"></div>
  <div class="ds-orb" style="width:400px;height:400px;top:50%;left:50%;margin-top:-200px;margin-left:-200px;background:radial-gradient(circle,rgba(232,93,74,0.08),transparent 70%);z-index:1"></div>
  <div class="ds-bg-content" style="max-width:650px;margin:0 auto">
    <h2 style="font-size:clamp(28px,5vw,48px);font-weight:900;letter-spacing:-0.03em;line-height:1.1;margin-bottom:20px">${escapeHtml(c.finalCta.h2)}</h2>
    <p style="color:rgba(28,25,23,0.6);font-size:18px;line-height:1.6;margin-bottom:44px">${escapeHtml(c.finalCta.sub)}</p>
    <a href="tel:+36209384691" class="ds-cta">${escapeHtml(c.finalCta.cta)} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
  </div>
</section>`);

  // —— FOOTER ——
  sections.push(`
<footer style="padding:48px 24px;border-top:1px solid rgba(28,25,23,0.08);text-align:center">
  <a href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;" style="display:inline-block;margin-bottom:20px">
    <img src="${img("salsalogo.png")}" alt="Dr. Salsa" style="height:36px;width:auto;object-fit:contain;opacity:0.7"/>
  </a>
  <p style="font-size:14px;color:rgba(28,25,23,0.45);margin-bottom:16px">${escapeHtml(c.footer.copy)}</p>
  <a href="https://brillcode.hu" target="_blank" rel="noopener noreferrer" style="font-size:11px;color:rgba(28,25,23,0.25);text-decoration:none;letter-spacing:0.2em">${escapeHtml(c.footer.made)}</a>
</footer>`);

  return sections.join("\n");
}

function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const css = fs.readFileSync(CSS_PATH, "utf8");

  const contentHu = buildSections(data.hu, "hu");
  const contentEn = buildSections(data.en, "en");

  const navStyle = `
.ds-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;background:rgba(245,242,237,0.96);backdrop-filter:blur(16px);border-bottom:1px solid rgba(28,25,23,0.08);transition:all 0.4s ease}
.ds-nav a.ds-lang{text-decoration:none;color:rgba(28,25,23,0.5)}
.ds-nav a.ds-lang-active{background:rgba(28,25,23,0.12);color:#1c1917}
.ds-faq-answer.open{max-height:200px !important;opacity:1 !important}
.ds-faq-btn .ds-faq-icon{width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:rgba(28,25,23,0.06);color:rgba(28,25,23,0.5);margin-left:16px;flex-shrink:0;transition:all 0.3s}
.ds-faq-btn[aria-expanded="true"] .ds-faq-icon{background:rgba(232,93,74,0.15);color:#E85D4A;transform:rotate(45deg)}
`;

  const script = `
(function(){
  var lang = (new URLSearchParams(location.search)).get('lang') || 'hu';
  var hu = document.getElementById('content-hu');
  var en = document.getElementById('content-en');
  if (hu) hu.style.display = lang === 'hu' ? 'block' : 'none';
  if (en) en.style.display = lang === 'en' ? 'block' : 'none';
  document.querySelectorAll('.ds-faq-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = this.closest('.ds-faq-item');
      var open = this.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.ds-faq-item').forEach(function(i){ i.querySelector('.ds-faq-answer').classList.remove('open'); i.querySelector('.ds-faq-btn').setAttribute('aria-expanded','false'); });
      if (!open) { item.querySelector('.ds-faq-answer').classList.add('open'); this.setAttribute('aria-expanded','true'); }
    });
  });
})();
`;

  const html = `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Dr. Salsa – Salsa · Bachata · Kizomba</title>
  <style>${css}${navStyle}</style>
</head>
<body>
  <div class="ds">
    <div id="content-hu" class="lang-content" style="display:none">${contentHu}</div>
    <div id="content-en" class="lang-content" style="display:none">${contentEn}</div>
  </div>
  <script>${script}</script>
</body>
</html>`;

  // Default: show HU so no FOUC; script overrides from ?lang=
  const finalHtml = html.replace(
    '<div id="content-hu" class="lang-content" style="display:none">',
    '<div id="content-hu" class="lang-content" style="display:block">'
  );

  if (!fs.existsSync(BUILD_DIR)) fs.mkdirSync(BUILD_DIR, { recursive: true });
  const imgDir = path.join(BUILD_DIR, "img");
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

  fs.writeFileSync(path.join(BUILD_DIR, "index.html"), finalHtml, "utf8");

  const imgFiles = fs.readdirSync(IMG_SRC);
  for (const f of imgFiles) {
    fs.copyFileSync(path.join(IMG_SRC, f), path.join(imgDir, f));
  }

  const downloadDir = path.dirname(ZIP_PATH);
  if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

  const out = fs.createWriteStream(ZIP_PATH);
  const archive = archiver("zip", { zlib: { level: 9 } });
  out.on("close", () => console.log("ZIP created:", ZIP_PATH, "(", archive.pointer(), "bytes )"));
  archive.on("error", (err) => {
    throw err;
  });
  archive.pipe(out);
  archive.directory(BUILD_DIR, false);
  archive.finalize();

  console.log("Export done. Download URL: https://brillcode.hu/download/drsalsa-export.zip");
}

main();
