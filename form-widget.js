(function () {
  'use strict';

  var ALL_INSURANCE_TYPES = [
    { label: 'Business Insurance',              emoji: '🏢' },
    { label: 'Credit Risk Insurance',           emoji: '📊' },
    { label: 'Cyber Insurance',                 emoji: '🔒' },
    { label: 'Directors & Officers Insurance',  emoji: '👔' },
    { label: 'Engineering Insurance',           emoji: '⚙️' },
    { label: 'Group Health Insurance',          emoji: '👥' },
    { label: 'Health Insurance',                emoji: '🏥' },
    { label: 'Home Insurance',                  emoji: '🏠' },
    { label: 'ILOE Insurance (MOHRE)',          emoji: '🛡️' },
    { label: 'Job Loss Insurance (Top-up)',     emoji: '💼' },
    { label: 'Keyman Insurance',                emoji: '🔑' },
    { label: 'Liability Insurance',             emoji: '⚖️' },
    { label: 'Life Insurance',                  emoji: '❤️' },
    { label: 'Marine & Cargo Insurance',        emoji: '🚢' },
    { label: 'MOHRE Basic Health (AED 320)',    emoji: '🏨' },
    { label: 'Mortgage Insurance',              emoji: '🏦' },
    { label: 'Motor Insurance',                 emoji: '🚗' },
    { label: 'Professional Indemnity Insurance',emoji: '📋' },
    { label: 'Term Life Insurance',             emoji: '📄' },
    { label: 'Travel Insurance',                emoji: '✈️' },
    { label: 'Workers Compensation Insurance',  emoji: '👷' },
    { label: 'Other',                           emoji: '➕' }
  ];

  var PAGE_TYPE_MAP = {
    'business-insurance-uae':             'Business Insurance',
    'credit-risk-insurance-uae':          'Credit Risk Insurance',
    'cyber-insurance-uae':                'Cyber Insurance',
    'directors-and-officers-insurance-uae': 'Directors & Officers Insurance',
    'engineering-insurance-uae':          'Engineering Insurance',
    'group-health-insurance-uae':         'Group Health Insurance',
    'health-insurance-dubai':             'Health Insurance',
    'home-insurance-dubai':               'Home Insurance',
    'iloe-insurance-uae':                 'ILOE Insurance (MOHRE)',
    'job-loss-insurance-uae':             'Job Loss Insurance (Top-up)',
    'keyman-insurance-uae':               'Keyman Insurance',
    'liability-insurance-uae':            'Liability Insurance',
    'life-insurance-dubai':               'Life Insurance',
    'marine-cargo-insurance-uae':         'Marine & Cargo Insurance',
    'mohre-basic-health-insurance':       'MOHRE Basic Health (AED 320)',
    'mortgage-insurance-uae':             'Mortgage Insurance',
    'motor-insurance-dubai':              'Motor Insurance',
    'professional-indemnity-insurance-uae': 'Professional Indemnity Insurance',
    'term-life-insurance-dubai':          'Term Life Insurance',
    'travel-insurance-uae':              'Travel Insurance',
    'workers-compensation-insurance-uae': 'Workers Compensation Insurance',
    'best-health-insurance-dubai':        'Health Insurance',
    'life-insurance-guide-uae':           'Life Insurance',
    'motor-insurance-uae-tips':           'Motor Insurance'
  };

  var INDEX_FEATURED = [
    'Health Insurance',
    'Motor Insurance',
    'Life Insurance',
    'Travel Insurance',
    'Home Insurance'
  ];

  var AGE_GROUPS = ['18 – 25', '26 – 35', '36 – 45', '46 – 55', '56+'];

  var API_BASE = '';

  function getPageSlug() {
    var path = window.location.pathname;
    var file = path.split('/').pop().replace('.html', '');
    return file || 'index';
  }

  function getDetectedType() {
    var slug = getPageSlug();
    return PAGE_TYPE_MAP[slug] || null;
  }

  function isIndexPage() {
    var slug = getPageSlug();
    return slug === 'index' || slug === '' || slug === '/';
  }

  function getTypeEmoji(label) {
    for (var i = 0; i < ALL_INSURANCE_TYPES.length; i++) {
      if (ALL_INSURANCE_TYPES[i].label === label) return ALL_INSURANCE_TYPES[i].emoji;
    }
    return '🛡️';
  }

  function buildTypeSelector(containerId, selectedType, onSelect) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    var isIndex = isIndexPage();
    var typesToShow = isIndex
      ? INDEX_FEATURED
      : (selectedType ? [selectedType] : ALL_INSURANCE_TYPES.slice(0, 5).map(function(t){ return t.label; }));

    var grid = document.createElement('div');
    grid.className = 'type-selector';

    typesToShow.forEach(function (label) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'type-btn' + (label === selectedType ? ' active' : '');
      btn.textContent = getTypeEmoji(label) + ' ' + label.replace(' Insurance', '').replace(' (MOHRE)', '').replace(' (Top-up)', '');
      btn.title = label;
      btn.addEventListener('click', function () {
        container.querySelectorAll('.type-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        onSelect(label);
      });
      grid.appendChild(btn);
    });

    if (isIndex) {
      var moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'type-btn type-btn-more';
      moreBtn.textContent = '➕ More';
      moreBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openTypeModal(selectedType, function (chosen) {
          container.querySelectorAll('.type-btn').forEach(function (b) { b.classList.remove('active'); });
          moreBtn.textContent = getTypeEmoji(chosen) + ' ' + chosen.replace(' Insurance', '').replace(' (MOHRE)', '').replace(' (Top-up)', '');
          moreBtn.classList.add('active');
          onSelect(chosen);
        });
      });
      grid.appendChild(moreBtn);
    } else if (selectedType) {
      var changeLink = document.createElement('button');
      changeLink.type = 'button';
      changeLink.className = 'type-change-link';
      changeLink.textContent = 'Change type';
      changeLink.addEventListener('click', function (e) {
        e.stopPropagation();
        openTypeModal(selectedType, function (chosen) {
          container.querySelectorAll('.type-btn').forEach(function (b) { b.classList.remove('active'); });
          buildTypeSelector(containerId, chosen, onSelect);
          onSelect(chosen);
        });
      });
      container.appendChild(grid);
      container.appendChild(changeLink);
      return;
    }

    container.appendChild(grid);
  }

  function openTypeModal(currentType, onPick) {
    var existing = document.getElementById('fw-type-modal');
    if (existing) existing.parentNode.removeChild(existing);

    var overlay = document.createElement('div');
    overlay.id = 'fw-type-modal';
    overlay.className = 'fw-modal-overlay';

    var box = document.createElement('div');
    box.className = 'fw-modal-box';

    var header = document.createElement('div');
    header.className = 'fw-modal-header';
    header.innerHTML = '<span>Select Insurance Type</span>';

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'fw-modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function () { overlay.parentNode.removeChild(overlay); });
    header.appendChild(closeBtn);

    var search = document.createElement('input');
    search.type = 'text';
    search.className = 'fw-modal-search';
    search.placeholder = 'Search insurance type...';
    search.setAttribute('autocomplete', 'off');

    var list = document.createElement('div');
    list.className = 'fw-modal-list';

    function renderModalList(q) {
      list.innerHTML = '';
      var filtered = ALL_INSURANCE_TYPES.filter(function (t) {
        return !q || t.label.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      });
      filtered.forEach(function (t) {
        var item = document.createElement('button');
        item.type = 'button';
        item.className = 'fw-modal-item' + (t.label === currentType ? ' active' : '');
        item.innerHTML = '<span class="fw-modal-emoji">' + t.emoji + '</span><span>' + t.label + '</span>';
        item.addEventListener('click', function () {
          overlay.parentNode.removeChild(overlay);
          onPick(t.label);
        });
        list.appendChild(item);
      });
    }

    search.addEventListener('input', function () { renderModalList(search.value); });
    renderModalList('');

    box.appendChild(header);
    box.appendChild(search);
    box.appendChild(list);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    search.focus();

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.parentNode.removeChild(overlay);
    });
  }

  function buildPhoneField(wrapId) {
    var wrap = document.getElementById(wrapId);
    if (!wrap) return;
    wrap.innerHTML = '';
    wrap.className = 'phone-input-group';

    var sel = document.createElement('select');
    sel.id = wrapId + '-code';
    sel.className = 'country-code-select';
    sel.setAttribute('aria-label', 'Country code');
    var defaultOption = document.createElement('option');
    defaultOption.value = '+971';
    defaultOption.textContent = '🇦🇪 +971';
    sel.appendChild(defaultOption);
    wrap.appendChild(sel);

    var inp = document.createElement('input');
    inp.type = 'tel';
    inp.id = wrapId + '-number';
    inp.className = 'phone-number-input';
    inp.placeholder = '5X XXX XXXX';
    inp.setAttribute('inputmode', 'numeric');
    inp.setAttribute('pattern', '[0-9]*');
    inp.setAttribute('autocomplete', 'tel-national');
    inp.addEventListener('input', function () { inp.value = inp.value.replace(/\D/g, ''); });
    wrap.appendChild(inp);
  }

  function getFullPhoneFromWrap(wrapId) {
    var codeEl = document.getElementById(wrapId + '-code');
    var numEl  = document.getElementById(wrapId + '-number');
    if (!numEl) return '';
    var num = numEl.value.trim();
    if (!num) return '';
    var code = codeEl ? codeEl.value : '+971';
    return code + num;
  }

  function showToast(message) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 4000);
  }

  function buildSelectOptions(selectEl, options, defaultLabel, preselect) {
    selectEl.innerHTML = '';
    var def = document.createElement('option');
    def.value = '';
    def.textContent = defaultLabel;
    selectEl.appendChild(def);
    options.forEach(function (o) {
      var opt = document.createElement('option');
      opt.value = o;
      opt.textContent = o;
      if (o === preselect) opt.selected = true;
      selectEl.appendChild(opt);
    });
  }

  function collectFormData(prefix, selectedType) {
    var name     = (document.getElementById(prefix + 'Name') || {}).value || '';
    var email    = (document.getElementById(prefix + 'Email') || {}).value || '';
    var phone    = getFullPhoneFromWrap(prefix + 'PhoneWrap');
    var age      = (document.getElementById(prefix + 'Age') || {}).value || '';
    var insType  = selectedType || '';
    var msg      = (document.getElementById(prefix + 'Msg') || {}).value || '';
    return { name: name.trim(), email: email.trim(), phone: phone, age: age, insurance_type: insType, message: msg.trim() };
  }

  function validateData(data, btnEl, originalText) {
    if (!data.name)           { alert('Please enter your full name.'); return false; }
    if (!data.phone)          { alert('Please enter your phone number.'); return false; }
    if (!data.insurance_type) { alert('Please select an insurance type.'); return false; }
    return true;
  }

  function submitLead(data, sourcePage, sourceWidget, btnEl, originalText, successMsg) {
    btnEl.disabled = true;
    btnEl.textContent = 'Sending…';

    var endpoint = API_BASE + '/api/' + sourceWidget.toLowerCase().replace(' ', '-');
    if (endpoint.indexOf('quote-widget') !== -1) endpoint = API_BASE + '/api/quote';
    if (endpoint.indexOf('contact-form') !== -1) endpoint = API_BASE + '/api/contact';

    var payload = Object.assign({}, data, {
      source_page:   sourcePage,
      source_widget: sourceWidget,
      submitted_at:  new Date().toISOString()
    });

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function (r) { return r.json(); })
    .then(function (res) {
      if (res.ok || res.next) {
        showToast(successMsg);
      } else {
        showToast('❌ Something went wrong. Please WhatsApp or call us directly.');
      }
    })
    .catch(function () {
      showToast('❌ Could not send. Please try WhatsApp or call us directly.');
    })
    .finally(function () {
      btnEl.disabled = false;
      btnEl.textContent = originalText;
    });
  }

  function initQuoteWidget() {
    var qform = document.querySelector('.qform');
    if (!qform) return;

    var detectedType = getDetectedType();
    var selectedType = detectedType;
    var sourcePage   = window.location.pathname;

    var container = document.getElementById('qTypeSelector');
    if (container) {
      buildTypeSelector('qTypeSelector', selectedType, function (t) { selectedType = t; });
    }

    var nameInp = document.getElementById('qName');
    var emailInp = document.getElementById('qEmail');
    var phoneWrap = document.getElementById('qPhoneWrap');
    var ageEl = document.getElementById('qAge');
    var msgInp = document.getElementById('qMsg');

    if (phoneWrap) {
      buildPhoneField('qPhoneWrap');
      if (window.initCountryPicker) window.initCountryPicker();
    }

    if (ageEl) {
      buildSelectOptions(ageEl, AGE_GROUPS, 'Select age group', '');
    }

    var btn = document.querySelector('[data-fw-submit="quote"]');
    if (!btn) return;
    var originalText = btn.textContent;

    btn.addEventListener('click', function () {
      var data = {
        name:           (nameInp || {}).value ? nameInp.value.trim() : '',
        email:          (emailInp || {}).value ? emailInp.value.trim() : '',
        phone:          getFullPhoneFromWrap('qPhoneWrap'),
        age:            ageEl ? ageEl.value : '',
        insurance_type: selectedType || '',
        message:        (msgInp || {}).value ? msgInp.value.trim() : ''
      };
      if (!validateData(data)) return;
      submitLead(data, sourcePage, 'Quote Widget', btn, originalText,
        '✅ Quote request sent! We\'ll call you within 1 hour.');
    });
  }

  function initContactForm() {
    var cfForm = document.querySelector('.contact-form-box');
    if (!cfForm) return;

    var detectedType = getDetectedType();
    var selectedType = detectedType;
    var sourcePage   = window.location.pathname;

    var container = document.getElementById('cfTypeSelector');
    if (container) {
      buildTypeSelector('cfTypeSelector', selectedType, function (t) { selectedType = t; });
    }

    var nameInp  = document.getElementById('cfName');
    var emailInp = document.getElementById('cfEmail');
    var phoneWrap = document.getElementById('cfPhoneWrap');
    var ageEl    = document.getElementById('cfAge');
    var msgInp   = document.getElementById('cfMsg');

    if (phoneWrap) {
      buildPhoneField('cfPhoneWrap');
      if (window.initCountryPicker) window.initCountryPicker();
    }

    if (ageEl) {
      buildSelectOptions(ageEl, AGE_GROUPS, 'Select age group', '');
    }

    var btn = document.querySelector('[data-fw-submit="contact"]');
    if (!btn) return;
    var originalText = btn.textContent;

    btn.addEventListener('click', function () {
      var data = {
        name:           (nameInp || {}).value ? nameInp.value.trim() : '',
        email:          (emailInp || {}).value ? emailInp.value.trim() : '',
        phone:          getFullPhoneFromWrap('cfPhoneWrap'),
        age:            ageEl ? ageEl.value : '',
        insurance_type: selectedType || '',
        message:        (msgInp || {}).value ? msgInp.value.trim() : ''
      };
      if (!validateData(data)) return;
      submitLead(data, sourcePage, 'Contact Form', btn, originalText,
        '✅ Request received! An expert will call you shortly.');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initQuoteWidget();
      initContactForm();
    });
  } else {
    initQuoteWidget();
    initContactForm();
  }

})();
