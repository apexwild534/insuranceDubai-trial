// ============================================================
// LEGAL MODALS — Privacy Policy & Terms of Use
// Edit this file to update legal content across ALL pages
// ============================================================
(function () {

  var modalCSS = `
  .legal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    z-index: 9999;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .legal-overlay.open { display: flex; }
  .legal-modal {
    background: #fff;
    border-radius: 14px;
    max-width: 720px;
    width: 100%;
    max-height: 88vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    overflow: hidden;
  }
  .legal-modal-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 28px;
    border-bottom: 1px solid #eee;
    background: #1a3c6e;
    color: #fff;
  }
  .legal-modal-head h2 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
  }
  .legal-modal-head .legal-close {
    background: rgba(255,255,255,0.15);
    border: none;
    color: #fff;
    font-size: 20px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    transition: background 0.2s;
  }
  .legal-modal-head .legal-close:hover { background: rgba(255,255,255,0.3); }
  .legal-modal-body {
    overflow-y: auto;
    padding: 28px 28px 32px;
    font-size: 14px;
    line-height: 1.75;
    color: #333;
  }
  .legal-modal-body h3 {
    font-size: 15px;
    font-weight: 700;
    color: #1a3c6e;
    margin: 22px 0 8px;
  }
  .legal-modal-body h3:first-child { margin-top: 0; }
  .legal-modal-body p { margin-bottom: 10px; }
  .legal-modal-body ul { padding-left: 18px; margin-bottom: 10px; }
  .legal-modal-body ul li { margin-bottom: 5px; }
  .legal-modal-body .legal-badge {
    display: inline-block;
    background: #f0f4ff;
    color: #1a3c6e;
    border: 1px solid #c5d3f0;
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 13px;
    margin-bottom: 18px;
    width: 100%;
  }
  .legal-modal-body .legal-badge strong { display: block; margin-bottom: 2px; }
  @media (max-width: 600px) {
    .legal-modal-body { padding: 20px 18px 24px; }
    .legal-modal-head { padding: 16px 18px; }
  }
  `;

  var privacyContent = `
    <div class="legal-badge">
      <strong>&#128274; InsuranceDubai.com &mdash; Privacy Policy</strong>
      Last updated: January 2026 &nbsp;|&nbsp; Applies to all users of InsuranceDubai.com
    </div>

    <h3>1. Who We Are</h3>
    <p>InsuranceDubai.com is a UAE-registered <strong>insurance aggregator</strong> &mdash; not an insurer or broker. Our role is to collect your enquiry details and share them with licensed UAE insurance brokers and insurers who may be able to assist you. We do not sell, underwrite, or administer insurance policies ourselves.</p>

    <h3>2. What Information We Collect</h3>
    <ul>
      <li>Personal details: name, phone number, email address, age group</li>
      <li>Insurance enquiry details: type of cover, coverage amount, preferences</li>
      <li>Technical data: device type, browser, pages visited (via analytics cookies)</li>
    </ul>

    <h3>3. How We Use Your Information</h3>
    <p>Your personal data is used to:</p>
    <ul>
      <li>Forward your enquiry to one or more <strong>licensed UAE insurance brokers or insurers</strong> who can provide you with a quote</li>
      <li>Follow up with you directly about your enquiry</li>
      <li>Improve our website and services</li>
      <li>Comply with UAE regulatory requirements</li>
    </ul>
    <p><strong>Important:</strong> By submitting a quote request on InsuranceDubai.com, you consent to your contact details and enquiry information being shared with our panel of licensed brokers and insurers. These third parties will contact you independently. The time it takes to receive a quote depends entirely on the broker or insurer &mdash; we cannot guarantee any specific response time.</p>

    <h3>4. Data Sharing</h3>
    <p>We share your data with:</p>
    <ul>
      <li>Licensed UAE insurance brokers and insurers on our panel</li>
      <li>Analytics providers (e.g. Google Analytics) &mdash; anonymised data only</li>
    </ul>
    <p>We do <strong>not</strong> sell your data to marketing companies or unrelated third parties.</p>

    <h3>5. Data Retention</h3>
    <p>We retain your enquiry data for up to 24 months, or until you request deletion. Contact us at <a href="mailto:info@insurancedubai.com">info@insurancedubai.com</a> to request removal.</p>

    <h3>6. Your Rights</h3>
    <p>Under UAE data protection regulations, you have the right to access, correct, or delete your personal data held by us. Email <a href="mailto:info@insurancedubai.com">info@insurancedubai.com</a> with any such request.</p>

    <h3>7. Cookies</h3>
    <p>We use essential and analytics cookies to operate and improve our website. You can disable cookies in your browser settings, though this may affect site functionality.</p>

    <h3>8. Contact</h3>
    <p>For privacy-related queries: <a href="mailto:info@insurancedubai.com">info@insurancedubai.com</a></p>
  `;

  var termsContent = `
    <div class="legal-badge">
      <strong>&#128203; InsuranceDubai.com &mdash; Terms of Use</strong>
      Last updated: January 2026 &nbsp;|&nbsp; Please read carefully before using this website
    </div>

    <h3>1. About InsuranceDubai.com</h3>
    <p>InsuranceDubai.com is an <strong>insurance aggregator</strong> operated in the UAE. We are <strong>not</strong> an insurance broker, insurer, or financial advisor. We do not provide insurance advice, sell policies, or handle claims. Our service is to present insurance options and forward your enquiry to licensed UAE brokers and insurers.</p>

    <h3>2. The Quote Process &mdash; What to Expect</h3>
    <p>When you submit a quote request:</p>
    <ul>
      <li>Your details are shared with one or more licensed UAE insurance brokers or insurers from our panel</li>
      <li>Those brokers or insurers will contact you directly to discuss your needs and provide a quote</li>
      <li>The <strong>&ldquo;2 minutes&rdquo;</strong> referenced on this website refers to the time it takes to <em>submit</em> your enquiry form &mdash; not to receive an actual quote. Actual quote delivery depends on the broker or insurer and may take longer</li>
      <li>We cannot guarantee the price, availability, or terms of any insurance product</li>
    </ul>

    <h3>3. No Financial Advice</h3>
    <p>Nothing on InsuranceDubai.com constitutes financial, legal, or insurance advice. All content is for general informational purposes only. You should independently verify any information before making insurance decisions and consult a licensed advisor if needed.</p>

    <h3>4. Third-Party Brokers &amp; Insurers</h3>
    <p>The brokers and insurers we connect you with are independent third parties. InsuranceDubai.com is not responsible for:</p>
    <ul>
      <li>The accuracy or completeness of quotes provided by brokers or insurers</li>
      <li>The terms, conditions, or performance of any insurance policy you purchase</li>
      <li>Any delays, miscommunications, or disputes between you and a broker or insurer</li>
    </ul>

    <h3>5. Accuracy of Information</h3>
    <p>We strive to keep content accurate and up to date, but insurance products, regulations, and pricing change frequently. Always verify current terms directly with the relevant insurer or broker before purchasing any policy.</p>

    <h3>6. Intellectual Property</h3>
    <p>All content on InsuranceDubai.com &mdash; including text, design, and code &mdash; is the property of InsuranceDubai.com. Reproduction without written permission is prohibited.</p>

    <h3>7. Limitation of Liability</h3>
    <p>InsuranceDubai.com shall not be liable for any loss or damage arising from your use of this website or reliance on its content, to the fullest extent permitted by UAE law.</p>

    <h3>8. Governing Law</h3>
    <p>These terms are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the jurisdiction of Dubai courts.</p>

    <h3>9. Contact Us</h3>
    <p>Questions about these terms? Email <a href="mailto:info@insurancedubai.com">info@insurancedubai.com</a></p>
  `;

  function init() {
    // Inject CSS
    var style = document.createElement('style');
    style.textContent = modalCSS;
    document.head.appendChild(style);

    // Build modal HTML
    var modalHTML =
      '<div class="legal-overlay" id="legalOverlay">' +
        '<div class="legal-modal" role="dialog" aria-modal="true">' +
          '<div class="legal-modal-head">' +
            '<h2 id="legalModalTitle">Policy</h2>' +
            '<button class="legal-close" id="legalClose" aria-label="Close">&times;</button>' +
          '</div>' +
          '<div class="legal-modal-body" id="legalModalBody"></div>' +
        '</div>' +
      '</div>';

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Close handlers
    document.getElementById('legalClose').addEventListener('click', closeModal);
    document.getElementById('legalOverlay').addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  function closeModal() {
    var overlay = document.getElementById('legalOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.openLegalModal = function(type) {
    var overlay = document.getElementById('legalOverlay');
    var title   = document.getElementById('legalModalTitle');
    var body    = document.getElementById('legalModalBody');
    if (!overlay) return;
    if (type === 'privacy') {
      title.textContent = 'Privacy Policy';
      body.innerHTML = privacyContent;
    } else {
      title.textContent = 'Terms of Use';
      body.innerHTML = termsContent;
    }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    body.scrollTop = 0;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
