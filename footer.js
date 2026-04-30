// ============================================================
// SHARED FOOTER — edit this file to update ALL pages at once
// ============================================================
(function () {
  const footerHTML = `
<footer class="footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <div class="footer-logo">Insurance<span>Dubai</span>.com</div>
      <p>Dubai's trusted insurance aggregator since 2009. We connect you with UAE-licensed brokers and insurers. Helping 10,000+ clients find the right coverage across UAE.</p>
      <div class="footer-social">
        <a href="https://wa.me/97142000000" aria-label="WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.854L.057 23.527a.5.5 0 0 0 .609.61l5.805-1.458A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.918 0-3.718-.504-5.271-1.385l-.371-.22-3.878.974.998-3.778-.241-.389A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
        </a>
        <a href="mailto:info@insurancedubai.com" aria-label="Email">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </a></div>
    </div>

    <div class="footer-col">
      <h4>Personal Insurance</h4>
      <ul>
        <li><a href="life-insurance-dubai.html">Life Insurance Dubai</a></li>
        <li><a href="health-insurance-dubai.html">Health Insurance Dubai</a></li>
        <li><a href="motor-insurance-dubai.html">Motor Insurance Dubai</a></li>
        <li><a href="travel-insurance-uae.html">Travel Insurance UAE</a></li>
        <li><a href="home-insurance-dubai.html">Home Insurance Dubai</a></li>
        <li><a href="iloe-insurance-uae.html">ILOE Insurance UAE</a></li>
        <li><a href="job-loss-insurance-uae.html">Job Loss Insurance UAE</a></li>
        <li><a href="mohre-basic-health-insurance.html">AED 320 MOHRE Basic</a></li>
        <li><a href="term-life-insurance-dubai.html">Term Life Insurance</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Business Insurance</h4>
      <ul>
        <li><a href="business-insurance-uae.html">Business Insurance UAE</a></li>
        <li><a href="credit-risk-insurance-uae.html">Credit Risk Insurance</a></li>
        <li><a href="keyman-insurance-uae.html">Keyman Insurance UAE</a></li>
        <li><a href="marine-cargo-insurance-uae.html">Marine &amp; Cargo</a></li>
        <li><a href="liability-insurance-uae.html">Liability Insurance</a></li>
        <li><a href="cyber-insurance-uae.html">Cyber Insurance UAE</a></li>
        <li><a href="engineering-insurance-uae.html">Engineering Insurance</a></li>
        <li><a href="professional-indemnity-insurance-uae.html">Professional Indemnity</a></li>
        <li><a href="directors-and-officers-insurance-uae.html">D&amp;O Insurance</a></li>
        <li><a href="workers-compensation-insurance-uae.html">Workers Compensation</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Contact Us</a></li>
        <li><a href="blog/">Insurance Blog</a></li>
        <li><a href="group-health-insurance-uae.html">Group Health Insurance</a></li>
        <li><a href="mortgage-insurance-uae.html">Mortgage Insurance</a></li>
        <li><a href="mailto:info@insurancedubai.com">info@insurancedubai.com</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container">
      <span>© 2026 InsuranceDubai.com. All rights reserved. UAE Insurance Aggregator</span>
      <span>
        <a href="#" style="color:rgba(255,255,255,0.4)" onclick="openLegalModal('privacy');return false;">Privacy Policy</a> &middot;
        <a href="#" style="color:rgba(255,255,255,0.4)" onclick="openLegalModal('terms');return false;">Terms of Use</a>
      </span>
    </div>
  </div>
</footer>`;

  // Inject footer — replace any existing <footer> or append before </body>
  const existing = document.querySelector('footer.footer');
  if (existing) {
    existing.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // Fix relative paths for pages inside /blog/ subfolder
  if (window.location.pathname.includes('/blog/')) {
    document.querySelectorAll('footer a[href]').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.startsWith('#') && !href.startsWith('../')) {
        a.setAttribute('href', '../' + href);
      }
    });
  }
})();
