var hamburgerBtn = document.getElementById('hamburgerBtn');
var mobileMenu = document.getElementById('mobileMenu');
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
  });
}
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
    });
  });
}

function showToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  if (message) toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 4000);
}

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var targetId = link.getAttribute('href');
    if (targetId === '#') return;
    var el = document.querySelector(targetId);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  });
});
