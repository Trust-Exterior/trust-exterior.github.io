// Before/after slider: a range input drives the --pos custom property.
document.querySelectorAll('.ba-slider').forEach(function (slider) {
  var range = slider.querySelector('.ba-range');
  if (!range) return;
  var set = function () { slider.style.setProperty('--pos', range.value + '%'); };
  range.addEventListener('input', set);
  set();
});

// Close the mobile menu after a link is tapped (same-page anchors).
document.querySelectorAll('.mnav a').forEach(function (a) {
  a.addEventListener('click', function () { a.closest('details').removeAttribute('open'); });
});

// Quote forms (banner + page bottom): submit to Web3Forms.
document.querySelectorAll('form.quote-js').forEach(function (form) {
  var btn = form.querySelector('button[type="submit"]');
  var label = btn.textContent;
  var status = form.querySelector('.form-status');
  var show = function (cls, msg) { status.className = 'form-status ' + cls; status.textContent = msg; status.hidden = false; };
  var fail = 'Something went wrong sending your request. Please call us at (913) 327-0111.';
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (/claude|claudeusercontent/.test(location.hostname)) {
      show('err', 'This is a preview. The form sends for real on trustexteriorkc.com.');
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.hidden = true;
    fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          show('ok', "Thanks! Your request is in. We'll be in touch within one business day.");
          form.reset();
        } else { show('err', fail); }
      })
      .catch(function () { show('err', fail); })
      .finally(function () { btn.disabled = false; btn.textContent = label; });
  });
});
