/* ── Navigation ── */
var hamburgerBtn=document.getElementById('hamburgerBtn');
var mobileMenu=document.getElementById('mobileMenu');
if(hamburgerBtn){hamburgerBtn.addEventListener('click',function(){mobileMenu.classList.toggle('open');});}
if(mobileMenu){var mobileLinks=mobileMenu.querySelectorAll('a');mobileLinks.forEach(function(link){link.addEventListener('click',function(){mobileMenu.classList.remove('open');});});}

/* ── Helpers ── */
function selectType(clickedButton){var allButtons=document.querySelectorAll('.type-btn');allButtons.forEach(function(btn){btn.classList.remove('active');});clickedButton.classList.add('active');}
function showToast(message){var toast=document.getElementById('toast');if(message){toast.textContent=message;}toast.classList.add('show');setTimeout(function(){toast.classList.remove('show');},4000);}

/* ── Phone validation (UAE + international) ── */
function isValidPhone(phone){
  var cleaned=phone.replace(/[\s\-\(\)]/g,'');
  var uaeLocal=/^05\d{8}$/.test(cleaned);
  var uaeIntl=/^\+9715\d{8}$/.test(cleaned);
  var international=/^\+\d{7,14}$/.test(cleaned);
  return uaeLocal||uaeIntl||international;
}

/* ── Formspree endpoint — replace YOUR_FORM_ID with your Formspree form ID ── */
var FORMSPREE_ENDPOINT='https://formspree.io/f/YOUR_FORM_ID';

/* ── Quote form (hero widget) ── */
function submitQuote(){
  var name=document.getElementById('qName').value.trim();
  var phone=document.getElementById('qPhone').value.trim();
  var typeBtn=document.querySelector('.type-btn.active');
  var insType=typeBtn?typeBtn.textContent.trim():'Not specified';

  if(!name){alert('Please enter your name.');document.getElementById('qName').focus();return;}
  if(!phone){alert('Please enter your phone number.');document.getElementById('qPhone').focus();return;}
  if(!isValidPhone(phone)){
    alert('Please enter a valid UAE phone number (e.g. 050 123 4567 or +971 50 123 4567).');
    document.getElementById('qPhone').focus();return;
  }

  var btn=document.querySelector('[onclick="submitQuote()"]');
  if(btn){btn.disabled=true;btn.textContent='Sending\u2026';}

  fetch(FORMSPREE_ENDPOINT,{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({form:'Quote Widget',name:name,phone:phone,insurance_type:insType,_subject:'New Quote Request \u2014 InsuranceDubai.com'})
  })
  .then(function(r){return r.json();})
  .then(function(data){
    if(data.ok||data.next){
      showToast('\u2705 Quote request sent! We\'ll call you within 1 hour.');
      document.getElementById('qName').value='';
      document.getElementById('qPhone').value='';
    } else {
      showToast('\u274C Something went wrong. Please call us or WhatsApp directly.');
    }
  })
  .catch(function(){showToast('\u274C Could not send. Please try WhatsApp or call us directly.');})
  .finally(function(){if(btn){btn.disabled=false;btn.textContent='Get My Free Quote \u2192';}});
}

/* ── Contact / comparison form ── */
function submitContact(){
  var name=document.getElementById('cfName').value.trim();
  var phone=document.getElementById('cfPhone').value.trim();
  var insType=document.getElementById('cfType')?document.getElementById('cfType').value:'';
  var email=document.getElementById('cfEmail')?document.getElementById('cfEmail').value.trim():'';
  var msg=document.getElementById('cfMsg')?document.getElementById('cfMsg').value.trim():'';

  if(!name){alert('Please enter your full name.');document.getElementById('cfName').focus();return;}
  if(!phone){alert('Please enter your phone number.');document.getElementById('cfPhone').focus();return;}
  if(!isValidPhone(phone)){
    alert('Please enter a valid UAE phone number (e.g. 050 123 4567 or +971 50 123 4567).');
    document.getElementById('cfPhone').focus();return;
  }
  if(document.getElementById('cfType')&&!insType){alert('Please select an insurance type.');document.getElementById('cfType').focus();return;}

  var btn=document.querySelector('[onclick="submitContact()"]');
  if(btn){btn.disabled=true;btn.textContent='Sending\u2026';}

  fetch(FORMSPREE_ENDPOINT,{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({form:'Contact Form',name:name,phone:phone,email:email,insurance_type:insType,message:msg,_subject:'New Enquiry \u2014 InsuranceDubai.com'})
  })
  .then(function(r){return r.json();})
  .then(function(data){
    if(data.ok||data.next){
      showToast('\u2705 Request received! An expert will call you shortly.');
      document.getElementById('cfName').value='';
      document.getElementById('cfPhone').value='';
      if(document.getElementById('cfEmail'))document.getElementById('cfEmail').value='';
      if(document.getElementById('cfType'))document.getElementById('cfType').value='';
      if(document.getElementById('cfMsg'))document.getElementById('cfMsg').value='';
    } else {
      showToast('\u274C Something went wrong. Please WhatsApp us directly.');
    }
  })
  .catch(function(){showToast('\u274C Could not send. Please try WhatsApp or call us directly.');})
  .finally(function(){if(btn){btn.disabled=false;btn.textContent='Compare Plans & Get My Free Quote \u2192';}});
}

/* ── Smooth scroll ── */
var anchorLinks=document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(function(link){link.addEventListener('click',function(e){var targetId=link.getAttribute('href');if(targetId==='#')return;var targetElement=document.querySelector(targetId);if(targetElement){e.preventDefault();targetElement.scrollIntoView({behavior:'smooth'});}});});
