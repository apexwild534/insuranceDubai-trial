(function () {
  function buildNav() {
    var inBlog = window.location.pathname.indexOf('/blog/') !== -1;
    var base   = inBlog ? '../' : '';

    var navHTML =
      '<div class="top-strip">' +
        '<span>&#9993;&#65039; <a href="mailto:info@insurancedubai.com">info@insurancedubai.com</a></span>' +
        '<span>Mon &ndash; Sat &nbsp;9am &ndash; 7pm</span>' +
      '</div>' +

      '<nav class="navbar">' +
        '<div class="container nav-inner">' +
          '<a href="' + base + 'index.html" class="logo">Insurance<span>Dubai</span>.com</a>' +
          '<ul class="nav-links">' +
            '<li class="has-mega">' +
              '<a href="#" class="nav-drop-toggle">Personal <span class="nav-arrow">&#9662;</span></a>' +
              '<div class="mega-panel">' +
                '<div class="mega-col">' +
                  '<div class="mega-heading">Life &amp; Health</div>' +
                  '<a href="' + base + 'life-insurance-dubai.html">&#10084;&#65039; Life Insurance Dubai</a>' +
                  '<a href="' + base + 'term-life-insurance-dubai.html">&#128203; Term Life Insurance</a>' +
                  '<a href="' + base + 'health-insurance-dubai.html">&#127973; Health Insurance Dubai</a>' +
                  '<a href="' + base + 'group-health-insurance-uae.html">&#128101; Group Health Insurance</a>' +
                  '<a href="' + base + 'mohre-basic-health-insurance.html">&#127963; MOHRE Basic (AED 320)</a>' +
                '</div>' +
                '<div class="mega-col">' +
                  '<div class="mega-heading">Motor &amp; Home</div>' +
                  '<a href="' + base + 'motor-insurance-dubai.html">&#128663; Motor Insurance Dubai</a>' +
                  '<a href="' + base + 'home-insurance-dubai.html">&#127968; Home Insurance Dubai</a>' +
                  '<a href="' + base + 'travel-insurance-uae.html">&#9992;&#65039; Travel Insurance UAE</a>' +
                  '<a href="' + base + 'mortgage-insurance-uae.html">&#127974; Mortgage Insurance</a>' +
                '</div>' +
                '<div class="mega-col">' +
                  '<div class="mega-heading">Income Protection</div>' +
                  '<a href="' + base + 'iloe-insurance-uae.html">&#128737;&#65039; ILOE Insurance UAE</a>' +
                  '<a href="' + base + 'job-loss-insurance-uae.html">&#128188; Job Loss Insurance UAE</a>' +
                '</div>' +
              '</div>' +
            '</li>' +
            '<li class="has-mega">' +
              '<a href="#" class="nav-drop-toggle">Business <span class="nav-arrow">&#9662;</span></a>' +
              '<div class="mega-panel">' +
                '<div class="mega-col">' +
                  '<div class="mega-heading">Core Business</div>' +
                  '<a href="' + base + 'business-insurance-uae.html">&#127962; Business Insurance UAE</a>' +
                  '<a href="' + base + 'keyman-insurance-uae.html">&#128273; Keyman Insurance UAE</a>' +
                  '<a href="' + base + 'credit-risk-insurance-uae.html">&#128179; Credit Risk Insurance</a>' +
                  '<a href="' + base + 'workers-compensation-insurance-uae.html">&#128119; Workers Compensation</a>' +
                '</div>' +
                '<div class="mega-col">' +
                  '<div class="mega-heading">Specialist Lines</div>' +
                  '<a href="' + base + 'marine-cargo-insurance-uae.html">&#9939; Marine &amp; Cargo</a>' +
                  '<a href="' + base + 'engineering-insurance-uae.html">&#9881;&#65039; Engineering Insurance</a>' +
                  '<a href="' + base + 'liability-insurance-uae.html">&#9878;&#65039; Liability Insurance</a>' +
                  '<a href="' + base + 'cyber-insurance-uae.html">&#128274; Cyber Insurance UAE</a>' +
                  '<a href="' + base + 'professional-indemnity-insurance-uae.html">&#128220; Professional Indemnity</a>' +
                  '<a href="' + base + 'directors-and-officers-insurance-uae.html">&#128084; D&amp;O Insurance</a>' +
                '</div>' +
              '</div>' +
            '</li>' +
            '<li><a href="' + base + 'about.html">About</a></li>' +
            '<li><a href="' + base + 'blog/">Blog</a></li>' +
            '<li><a href="' + base + 'contact.html">Contact</a></li>' +
          '</ul>' +
          '<a href="' + base + 'contact.html" class="btn btn-primary nav-cta">Get Free Quote</a>' +
          '<button class="hamburger" id="hamburgerBtn" aria-label="Open menu">&#9776;</button>' +
        '</div>' +
        '<div class="mobile-menu" id="mobileMenu">' +
          '<div class="mob-section-label">Personal Insurance</div>' +
          '<a href="' + base + 'life-insurance-dubai.html">&#10084; Life Insurance Dubai</a>' +
          '<a href="' + base + 'term-life-insurance-dubai.html">&#128203; Term Life Insurance</a>' +
          '<a href="' + base + 'health-insurance-dubai.html">&#127973; Health Insurance Dubai</a>' +
          '<a href="' + base + 'group-health-insurance-uae.html">&#128101; Group Health Insurance</a>' +
          '<a href="' + base + 'mohre-basic-health-insurance.html">&#127963; MOHRE Basic (AED 320)</a>' +
          '<a href="' + base + 'motor-insurance-dubai.html">&#128663; Motor Insurance Dubai</a>' +
          '<a href="' + base + 'home-insurance-dubai.html">&#127968; Home Insurance Dubai</a>' +
          '<a href="' + base + 'travel-insurance-uae.html">&#9992; Travel Insurance UAE</a>' +
          '<a href="' + base + 'mortgage-insurance-uae.html">&#127974; Mortgage Insurance</a>' +
          '<a href="' + base + 'iloe-insurance-uae.html">&#128737; ILOE Insurance UAE</a>' +
          '<a href="' + base + 'job-loss-insurance-uae.html">&#128188; Job Loss Insurance UAE</a>' +
          '<div class="mob-section-label">Business Insurance</div>' +
          '<a href="' + base + 'business-insurance-uae.html">&#127962; Business Insurance UAE</a>' +
          '<a href="' + base + 'keyman-insurance-uae.html">&#128273; Keyman Insurance UAE</a>' +
          '<a href="' + base + 'credit-risk-insurance-uae.html">&#128179; Credit Risk Insurance</a>' +
          '<a href="' + base + 'workers-compensation-insurance-uae.html">&#128119; Workers Compensation</a>' +
          '<a href="' + base + 'marine-cargo-insurance-uae.html">&#9939; Marine &amp; Cargo</a>' +
          '<a href="' + base + 'engineering-insurance-uae.html">&#9881; Engineering Insurance</a>' +
          '<a href="' + base + 'liability-insurance-uae.html">&#9878; Liability Insurance</a>' +
          '<a href="' + base + 'cyber-insurance-uae.html">&#128274; Cyber Insurance UAE</a>' +
          '<a href="' + base + 'professional-indemnity-insurance-uae.html">&#128220; Professional Indemnity</a>' +
          '<a href="' + base + 'directors-and-officers-insurance-uae.html">&#128084; D&amp;O Insurance</a>' +
          '<div class="mob-section-label">Company</div>' +
          '<a href="' + base + 'about.html">About Us</a>' +
          '<a href="' + base + 'blog/">Blog</a>' +
          '<a href="' + base + 'contact.html">Contact</a>' +
          '<a href="' + base + 'contact.html" class="mobile-cta">Get Free Quote &rarr;</a>' +
        '</div>' +
      '</nav>';

    
    var oldStrip = document.querySelector('.top-strip');
    var oldNav   = document.querySelector('.navbar');
    if (oldStrip) oldStrip.parentNode.removeChild(oldStrip);
    if (oldNav)   oldNav.parentNode.removeChild(oldNav);

    
    var tmp = document.createElement('div');
    tmp.innerHTML = navHTML;
    var body = document.body;
    var ref  = body.firstChild;
    while (tmp.firstChild) {
      body.insertBefore(tmp.firstChild, ref);
    }

    
    var btn  = document.getElementById('hamburgerBtn');
    var menu = document.getElementById('mobileMenu');

    if (btn && menu) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.toggle('open');
      });
      document.addEventListener('click', function (e) {
        if (e.target !== btn && !menu.contains(e.target)) {
          menu.classList.remove('open');
        }
      });
    }

    
    document.addEventListener('click', function (e) {
      var toggle = e.target.closest ? e.target.closest('.nav-drop-toggle') : null;
      if (toggle) {
        e.preventDefault();
        var li = toggle.closest('.has-mega');
        var wasOpen = li.classList.contains('mega-open');
        document.querySelectorAll('.has-mega.mega-open').forEach(function (el) {
          el.classList.remove('mega-open');
        });
        if (!wasOpen) li.classList.add('mega-open');
        return;
      }
      var inPanel = e.target.closest ? e.target.closest('.mega-panel') : null;
      if (!inPanel) {
        document.querySelectorAll('.has-mega.mega-open').forEach(function (el) {
          el.classList.remove('mega-open');
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
