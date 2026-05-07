(function () {
  function init() {
    var inBlog = window.location.pathname.indexOf('/blog/') !== -1;
    var base = inBlog ? '../' : '';

    var css = '\
.cb-fab{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:#1a3c6e;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.25);z-index:1000;padding:0;overflow:hidden;transition:transform 0.2s;}\
.cb-fab:hover{transform:scale(1.08);}\
.cb-fab img{width:100%;height:100%;object-fit:cover;border-radius:50%;}\
.cb-fab .cb-fab-fallback{display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:28px;}\
.cb-window{position:fixed;bottom:96px;right:24px;width:340px;max-height:520px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,0.18);z-index:1000;display:flex;flex-direction:column;overflow:hidden;transform:scale(0.85) translateY(20px);opacity:0;pointer-events:none;transition:all 0.22s cubic-bezier(0.34,1.56,0.64,1);transform-origin:bottom right;}\
.cb-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}\
.cb-head{background:#1a3c6e;padding:14px 16px;display:flex;align-items:center;gap:10px;}\
.cb-head-img{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.3);flex-shrink:0;}\
.cb-head-img-fallback{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;border:2px solid rgba(255,255,255,0.3);}\
.cb-head-info{flex:1;}\
.cb-head-name{color:#fff;font-weight:700;font-size:14px;}\
.cb-head-status{color:rgba(255,255,255,0.7);font-size:11px;margin-top:1px;}\
.cb-close{background:none;border:none;color:rgba(255,255,255,0.7);font-size:20px;cursor:pointer;line-height:1;padding:2px 4px;}\
.cb-close:hover{color:#fff;}\
.cb-messages{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:10px;min-height:200px;}\
.cb-msg{max-width:82%;font-size:13px;line-height:1.5;padding:9px 12px;border-radius:12px;word-break:break-word;}\
.cb-msg.bot{background:#f0f4ff;color:#222;border-bottom-left-radius:3px;align-self:flex-start;}\
.cb-msg.user{background:#1a3c6e;color:#fff;border-bottom-right-radius:3px;align-self:flex-end;}\
.cb-msg.error{background:#fff3f3;color:#c0392b;border:1px solid #f5c6c6;border-bottom-left-radius:3px;align-self:flex-start;}\
.cb-options{display:flex;flex-wrap:wrap;gap:6px;padding:12px 14px 12px;margin-top:4px;border-top:1px solid #e8edf5;}\
.cb-opt{background:#fff;border:1.5px solid #1a3c6e;color:#1a3c6e;font-size:12px;font-weight:600;padding:6px 12px;border-radius:20px;cursor:pointer;transition:all 0.15s;}\
.cb-opt:hover{background:#1a3c6e;color:#fff;}\
.cb-input-row{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #eee;}\
.cb-input{flex:1;border:1.5px solid #ddd;border-radius:8px;padding:8px 10px;font-size:13px;outline:none;font-family:inherit;}\
.cb-input:focus{border-color:#1a3c6e;}\
.cb-send{background:#1a3c6e;color:#fff;border:none;border-radius:8px;padding:8px 14px;font-size:13px;cursor:pointer;font-weight:600;transition:background 0.15s;}\
.cb-send:hover{background:#2a5298;}\
.cb-typing{display:flex;align-items:center;gap:4px;padding:10px 12px;background:#f0f4ff;border-radius:12px;align-self:flex-start;}\
.cb-typing span{width:7px;height:7px;background:#1a3c6e;border-radius:50%;animation:cbDot 1.2s infinite;}\
.cb-typing span:nth-child(2){animation-delay:0.2s;}\
.cb-typing span:nth-child(3){animation-delay:0.4s;}\
@keyframes cbDot{0%,80%,100%{transform:scale(0.6);opacity:0.4;}40%{transform:scale(1);opacity:1;}}\
@media(max-width:400px){.cb-window{width:calc(100vw - 32px);right:16px;bottom:88px;}}\
.cb-badge{position:absolute;top:-3px;right:-3px;background:#c9a84c;color:#fff;width:18px;height:18px;border-radius:50%;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;}\
';

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    var fabHTML =
      '<button class="cb-fab" id="cbFab" aria-label="Chat with Mr. XYZ">' +
        '<img src="' + base + 'chatbot.png" alt="Mr. XYZ" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<span class="cb-fab-fallback" style="display:none">💬</span>' +
        '<span class="cb-badge" id="cbBadge">1</span>' +
      '</button>' +
      '<div class="cb-window" id="cbWindow" role="dialog" aria-label="Chat with Mr. XYZ">' +
        '<div class="cb-head">' +
          '<img class="cb-head-img" src="' + base + 'chatbot.png" alt="Mr. XYZ" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="cb-head-img-fallback" style="display:none">🤖</div>' +
          '<div class="cb-head-info">' +
            '<div class="cb-head-name">Mr. XYZ</div>' +
            '<div class="cb-head-status">&#9679; Insurance Advisor</div>' +
          '</div>' +
          '<button class="cb-close" id="cbClose" aria-label="Close chat">&times;</button>' +
        '</div>' +
        '<div class="cb-messages" id="cbMessages"></div>' +
        '<div class="cb-options" id="cbOptions"></div>' +
        '<div class="cb-input-row" id="cbInputRow" style="display:none">' +
          '<input class="cb-input" id="cbInput" placeholder="Type your answer..." autocomplete="off"/>' +
          '<button class="cb-send" id="cbSend">Send</button>' +
        '</div>' +
      '</div>';

    document.body.insertAdjacentHTML('beforeend', fabHTML);

    var fab     = document.getElementById('cbFab');
    var win     = document.getElementById('cbWindow');
    var closeBtn= document.getElementById('cbClose');
    var msgBox  = document.getElementById('cbMessages');
    var optBox  = document.getElementById('cbOptions');
    var inputRow= document.getElementById('cbInputRow');
    var input   = document.getElementById('cbInput');
    var sendBtn = document.getElementById('cbSend');
    var badge   = document.getElementById('cbBadge');

    var started = false;

    var userData = { name: '', phone: '', insurance: '' };

    var INSURANCE_TYPES = [
      'Health Insurance', 'Motor Insurance', 'Life Insurance',
      'Travel Insurance', 'Home Insurance', 'Business Insurance',
      'Group Health Insurance', 'ILOE Insurance (MOHRE)', 'Job Loss Insurance (Top-up)',
      'Cyber Insurance', 'Marine & Cargo Insurance', 'Liability Insurance',
      'Engineering Insurance', 'Credit Risk Insurance', 'Keyman Insurance',
      'Mortgage Insurance', 'Directors & Officers Insurance',
      'Professional Indemnity Insurance', 'Workers Compensation Insurance',
      'Term Life Insurance', 'MOHRE Basic Health (AED 320)', 'Other'
    ];

    var step = 0;

    function addMsg(text, type) {
      clearOptions();
      var div = document.createElement('div');
      div.className = 'cb-msg ' + (type || 'bot');
      div.innerHTML = text;
      msgBox.appendChild(div);
      msgBox.scrollTop = msgBox.scrollHeight;
      return div;
    }

    function showTyping(cb) {
      clearOptions();
      var dot = document.createElement('div');
      dot.className = 'cb-typing';
      dot.innerHTML = '<span></span><span></span><span></span>';
      dot.id = 'cbTyping';
      msgBox.appendChild(dot);
      msgBox.scrollTop = msgBox.scrollHeight;
      setTimeout(function () {
        var t = document.getElementById('cbTyping');
        if (t) t.parentNode.removeChild(t);
        cb();
      }, 900);
    }

    function clearOptions() {
      optBox.innerHTML = '';
    }

    function showOptions(opts, cb) {
      clearOptions();
      hideInput();
      opts.forEach(function (o) {
        var btn = document.createElement('button');
        btn.className = 'cb-opt';
        btn.textContent = o;
        btn.addEventListener('click', function () {
          addMsg(o, 'user');
          clearOptions();
          cb(o);
        });
        optBox.appendChild(btn);
      });
    }

    var CB_COUNTRY_CODES = [
      {code:'+971',label:'🇦🇪 +971'},{code:'+91',label:'🇮🇳 +91'},{code:'+92',label:'🇵🇰 +92'},
      {code:'+880',label:'🇧🇩 +880'},{code:'+63',label:'🇵🇭 +63'},{code:'+94',label:'🇱🇰 +94'},
      {code:'+44',label:'🇬🇧 +44'},{code:'+1',label:'🇺🇸 +1'},{code:'+61',label:'🇦🇺 +61'},
      {code:'+966',label:'🇸🇦 +966'},{code:'+968',label:'🇴🇲 +968'},{code:'+974',label:'🇶🇦 +974'},
      {code:'+965',label:'🇰🇼 +965'},{code:'+973',label:'🇧🇭 +973'},{code:'+20',label:'🇪🇬 +20'},
      {code:'+962',label:'🇯🇴 +962'},{code:'+49',label:'🇩🇪 +49'},{code:'+33',label:'🇫🇷 +33'},
      {code:'+86',label:'🇨🇳 +86'},{code:'+90',label:'🇹🇷 +90'}
    ];

    function showInput(placeholder, cb, isPhone) {
      clearOptions();
      
      var existingSel = inputRow.querySelector('.cb-country-sel');
      if (existingSel) existingSel.parentNode.removeChild(existingSel);
      input.type = 'text';
      input.inputMode = '';
      input.onkeypress = null;
      input.oninput = null;

      if (isPhone) {
        
        var sel = document.createElement('select');
        sel.className = 'cb-country-sel';
        sel.style.cssText = 'border:1.5px solid #ddd;border-radius:8px;padding:6px 4px;font-size:12px;outline:none;font-family:inherit;background:#fff;color:#222;flex-shrink:0;max-width:100px;cursor:pointer;';
        CB_COUNTRY_CODES.forEach(function(cc) {
          var opt = document.createElement('option');
          opt.value = cc.code;
          opt.textContent = cc.label;
          if (cc.code === '+971') opt.selected = true;
          sel.appendChild(opt);
        });
        inputRow.insertBefore(sel, input);
        input.type = 'tel';
        input.inputMode = 'numeric';
        input.pattern = '[0-9]*';
        input.oninput = function() { input.value = input.value.replace(/\D/g,''); };
        input.onkeypress = function(e) {
          if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') e.preventDefault();
        };
      }

      inputRow.style.display = 'flex';
      input.placeholder = placeholder || 'Type here...';
      input.value = '';
      input.focus();

      function submit() {
        var num = input.value.trim();
        if (!num) return;
        var sel2 = inputRow.querySelector('.cb-country-sel');
        var fullVal = isPhone && sel2 ? sel2.value + num : num;
        var displayVal = isPhone && sel2 ? sel2.value + ' ' + num : num;
        addMsg(displayVal, 'user');
        inputRow.style.display = 'none';
        input.value = '';
        
        if (sel2) sel2.parentNode.removeChild(sel2);
        cb(fullVal);
      }
      sendBtn.onclick = submit;
      input.onkeydown = function (e) { if (e.key === 'Enter') submit(); };
    }

    function showPhoneInput(placeholder, cb) { showInput(placeholder, cb, true); }

    function hideInput() {
      inputRow.style.display = 'none';
    }

    function runFlow() {
      step = 0;
      userData = { name: '', phone: '', insurance: '' };

      showTyping(function () {
        addMsg('Hello! I\'m <strong>Mr. XYZ</strong>, your insurance advisor at InsuranceDubai.com. I\'m here to help you find the right coverage. &#128522;');
        showTyping(function () {
          addMsg('May I start with your <strong>full name</strong>?');
          showInput('Your full name...', function (val) {
            userData.name = val;
            step = 1;
            showTyping(function () {
              addMsg('Nice to meet you, <strong>' + val + '</strong>! &#128075;');
              showTyping(function () {
                addMsg('What\'s the best <strong>phone number</strong> to reach you on? Please select your country code and enter digits only.');
                showPhoneInput('5X XXX XXXX', function (val2) {
                  userData.phone = val2;
                  step = 2;
                  showTyping(function () {
                    addMsg('Got it. Which type of insurance are you looking for?');
                    showOptions(INSURANCE_TYPES, function (chosen) {
                      userData.insurance = chosen;
                      step = 3;
                      showTyping(function () {
                        addMsg('Thank you, <strong>' + userData.name + '</strong>! Your enquiry for <strong>' + chosen + '</strong> has been received.');
                        fetch('/api/chatbot', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                          body: JSON.stringify({
                            name: userData.name,
                            phone: userData.phone,
                            insurance_type: chosen,
                            source_widget: 'chatbot',
                            source_page: window.location.pathname,
                            submitted_at: new Date().toISOString()
                          })
                        }).catch(function () {});
                        showTyping(function () {
                          addMsg('An expert will call you at <strong>' + userData.phone + '</strong> within 1 hour. 🙂');
                          hideInput();
                          clearOptions();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    }

    fab.addEventListener('click', function () {
      win.classList.toggle('open');
      badge.style.display = 'none';
      if (!started) {
        started = true;
        runFlow();
      }
    });

    closeBtn.addEventListener('click', function () {
      win.classList.remove('open');
    });

    document.addEventListener('click', function (e) {
      
      var path = e.composedPath ? e.composedPath() : [];
      var insideWin = path.indexOf(win) !== -1 || win.contains(e.target);
      var insideFab = path.indexOf(fab) !== -1 || fab.contains(e.target) || e.target === fab;
      if (!insideWin && !insideFab) {
        win.classList.remove('open');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
