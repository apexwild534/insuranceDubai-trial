// ============================================================
// SHARED MEGA-NAV — edit this file to update ALL pages at once
// ============================================================
(function () {
  // Detect if we're inside /blog/ subfolder to adjust relative links
  const inBlog = window.location.pathname.includes('/blog/');
  const base = inBlog ? '../' : '';

  const navHTML = `
<div class="top-strip">
  <span>📞 Call / WhatsApp: <a href="tel:+97142000000">+971 4 200 0000</a></span>
  <span>✉️ <a href="mailto:info@insurancedubai.com">info@insurancedubai.com</a></span>
  <span>Mon – Sat &nbsp;9am – 7pm</span>
</div>

<nav class="navbar">
  <div class="container nav-inner">
    <a href="${base}index.html" class="logo">Insurance<span>Dubai</span>.com</a>

    <ul class="nav-links">
      <!-- ── PERSONAL ── -->
      <li class="has-mega">
        <a href="#" class="nav-drop-toggle">Personal <span class="nav-arrow">▾</span></a>
        <div class="mega-panel">
          <div class="mega-col">
            <div class="mega-heading">Life &amp; Health</div>
            <a href="${base}life-insurance-dubai.html">❤️ Life Insurance Dubai</a>
            <a href="${base}term-life-insurance-dubai.html">📋 Term Life Insurance</a>
            <a href="${base}health-insurance-dubai.html">🏥 Health Insurance Dubai</a>
            <a href="${base}group-health-insurance-uae.html">👥 Group Health Insurance</a>
            <a href="${base}mohre-basic-health-insurance.html">🏛️ MOHRE Basic (AED 320)</a>
          </div>
          <div class="mega-col">
            <div class="mega-heading">Motor &amp; Home</div>
            <a href="${base}motor-insurance-dubai.html">🚗 Motor Insurance Dubai</a>
            <a href="${base}home-insurance-dubai.html">🏠 Home Insurance Dubai</a>
            <a href="${base}travel-insurance-uae.html">✈️ Travel Insurance UAE</a>
            <a href="${base}mortgage-insurance-uae.html">🏦 Mortgage Insurance</a>
          </div>
          <div class="mega-col">
            <div class="mega-heading">Income Protection</div>
            <a href="${base}iloe-insurance-uae.html">🛡️ ILOE Insurance UAE</a>
            <a href="${base}job-loss-insurance-uae.html">💼 Job Loss Insurance UAE</a>
          </div>
        </div>
      </li>

      <!-- ── BUSINESS ── -->
      <li class="has-mega">
        <a href="#" class="nav-drop-toggle">Business <span class="nav-arrow">▾</span></a>
        <div class="mega-panel">
          <div class="mega-col">
            <div class="mega-heading">Core Business</div>
            <a href="${base}business-insurance-uae.html">🏢 Business Insurance UAE</a>
            <a href="${base}keyman-insurance-uae.html">🔑 Keyman Insurance UAE</a>
            <a href="${base}credit-risk-insurance-uae.html">💳 Credit Risk Insurance</a>
            <a href="${base}workers-compensation-insurance-uae.html">👷 Workers Compensation</a>
          </div>
          <div class="mega-col">
            <div class="mega-heading">Specialist Lines</div>
            <a href="${base}marine-cargo-insurance-uae.html">⚓ Marine &amp; Cargo</a>
            <a href="${base}engineering-insurance-uae.html">⚙️ Engineering Insurance</a>
            <a href="${base}liability-insurance-uae.html">⚖️ Liability Insurance</a>
            <a href="${base}cyber-insurance-uae.html">🔒 Cyber Insurance UAE</a>
            <a href="${base}professional-indemnity-insurance-uae.html">📜 Professional Indemnity</a>
            <a href="${base}directors-and-officers-insurance-uae.html">👔 D&amp;O Insurance</a>
          </div>
        </div>
      </li>

      <li><a href="${base}about.html">About</a></li>
      <li><a href="${base}blog/">Blog</a></li>
      <li><a href="${base}contact.html">Contact</a></li>
    </ul>

    <a href="${base}contact.html" class="btn btn-primary nav-cta">Get Free Quote</a>
    <button class="hamburger" id="hamburgerBtn" aria-label="Open menu">&#9776;</button>
  </div>

  <!-- MOBILE MENU -->
  <div class="mobile-menu" id="mobileMenu">
    <div class="mob-section-label">Personal Insurance</div>
    <a href="${base}life-insurance-dubai.html">❤️ Life Insurance Dubai</a>
    <a href="${base}term-life-insurance-dubai.html">📋 Term Life Insurance</a>
    <a href="${base}health-insurance-dubai.html">🏥 Health Insurance Dubai</a>
    <a href="${base}group-health-insurance-uae.html">👥 Group Health Insurance</a>
    <a href="${base}mohre-basic-health-insurance.html">🏛️ MOHRE Basic (AED 320)</a>
    <a href="${base}motor-insurance-dubai.html">🚗 Motor Insurance Dubai</a>
    <a href="${base}home-insurance-dubai.html">🏠 Home Insurance Dubai</a>
    <a href="${base}travel-insurance-uae.html">✈️ Travel Insurance UAE</a>
    <a href="${base}mortgage-insurance-uae.html">🏦 Mortgage Insurance</a>
    <a href="${base}iloe-insurance-uae.html">🛡️ ILOE Insurance UAE</a>
    <a href="${base}job-loss-insurance-uae.html">💼 Job Loss Insurance UAE</a>
    <div class="mob-section-label">Business Insurance</div>
    <a href="${base}business-insurance-uae.html">🏢 Business Insurance UAE</a>
    <a href="${base}keyman-insurance-uae.html">🔑 Keyman Insurance UAE</a>
    <a href="${base}credit-risk-insurance-uae.html">💳 Credit Risk Insurance</a>
    <a href="${base}workers-compensation-insurance-uae.html">👷 Workers Compensation</a>
    <a href="${base}marine-cargo-insurance-uae.html">⚓ Marine &amp; Cargo</a>
    <a href="${base}engineering-insurance-uae.html">⚙️ Engineering Insurance</a>
    <a href="${base}liability-insurance-uae.html">⚖️ Liability Insurance</a>
    <a href="${base}cyber-insurance-uae.html">🔒 Cyber Insurance UAE</a>
    <a href="${base}professional-indemnity-insurance-uae.html">📜 Professional Indemnity</a>
    <a href="${base}directors-and-officers-insurance-uae.html">👔 D&amp;O Insurance</a>
    <div class="mob-section-label">Company</div>
    <a href="${base}about.html">About Us</a>
    <a href="${base}blog/">Blog</a>
    <a href="${base}contact.html">Contact</a>
    <a href="${base}contact.html" class="mobile-cta">Get Free Quote →</a>
  </div>
</nav>`;

  // Inject: replace existing top-strip + nav or prepend to body
  const existingStrip = document.querySelector('.top-strip');
  const existingNav   = document.querySelector('nav.navbar');

  if (existingStrip && existingNav) {
    existingStrip.outerHTML = navHTML;
    // existingNav was replaced as part of string above; remove stale nav if still present
    const leftover = document.querySelector('nav.navbar');
    // The injected HTML includes both top-strip and nav so leftover is the new one — fine
  } else {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }

  // ── HAMBURGER toggle ──
  document.addEventListener('click', function (e) {
    const btn  = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    if (btn.contains(e.target)) {
      menu.classList.toggle('open');
    } else if (!menu.contains(e.target)) {
      menu.classList.remove('open');
    }
  });

  // ── Desktop mega-panel toggle (hover handled by CSS, click for accessibility) ──
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.nav-drop-toggle');
    if (toggle) {
      e.preventDefault();
      const li = toggle.closest('.has-mega');
      const isOpen = li.classList.contains('mega-open');
      document.querySelectorAll('.has-mega.mega-open').forEach(function (el) { el.classList.remove('mega-open'); });
      if (!isOpen) li.classList.add('mega-open');
    } else if (!e.target.closest('.mega-panel')) {
      document.querySelectorAll('.has-mega.mega-open').forEach(function (el) { el.classList.remove('mega-open'); });
    }
  });
})();
