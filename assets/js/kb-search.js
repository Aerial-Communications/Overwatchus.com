(function () {
  'use strict';
  var form = document.getElementById('epkb-ml-search-form');
  var input = document.getElementById('epkb-ml-search-box');
  if (!form || !input) return;

  var rootPrefix = '';
  var articles = [
    { title: 'Alarm.com: Add an iOS Widget to the Home Screen', url: 'alarm-com-add-an-ios-widget-to-the-home-screen.html', tags: 'alarm.com ios iphone widget home screen app' },
    { title: 'Alarm.com: Change a User Code', url: 'alarm-com-change-a-user-code.html', tags: 'alarm.com user code pin password change access' },
    { title: 'Alarm.com: Clear an Active Alarm', url: 'alarm-com-clear-an-active-alarm.html', tags: 'alarm.com clear active alarm false alarm disarm cancel' },
    { title: 'Alarm.com: How to Arm a System', url: 'alarm-com-how-to-arm-a-system.html', tags: 'alarm.com arm stay away system security' },
    { title: 'How Security Systems Work: A Beginner\'s Guide', url: 'how-security-systems-work.html', tags: 'security systems work beginner guide sensors panel monitoring' },
    { title: 'How to Pay Your OverWatch Invoice via Email', url: 'how-to-pay-your-overwatch-invoice-via-email.html', tags: 'pay invoice email billing payment quickbooks' },
    { title: 'How to Replace the Console Battery on a 2GIG GC3 Panel', url: 'how-to-replace-the-console-battery-on-a-2gig-gc3-panel.html', tags: 'replace console battery 2gig gc3 panel low battery' }
  ];

  var resultsBox = document.getElementById('epkb-ml-search-results');
  if (!resultsBox) {
    resultsBox = document.createElement('div');
    resultsBox.id = 'epkb-ml-search-results';
    form.appendChild(resultsBox);
  }
  resultsBox.style.cssText = 'display:none;background:#fff;border:1px solid #d5d8dc;border-radius:4px;margin-top:8px;text-align:left;box-shadow:0 8px 24px rgba(0,0,0,0.12);position:relative;z-index:50;';

  function runSearch() {
    var q = (input.value || '').trim().toLowerCase();
    if (!q) {
      resultsBox.style.display = 'none';
      resultsBox.innerHTML = '';
      return;
    }
    var terms = q.split(/\s+/);
    var hits = articles.filter(function (a) {
      var hay = (a.title + ' ' + a.tags).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    });

    if (hits.length === 0) {
      resultsBox.innerHTML = '<div style="padding:12px 16px;color:#555;font-size:14px;">No matching guides found. Try searching for <strong>Alarm.com</strong>, <strong>battery</strong>, or <strong>invoice</strong>.</div>';
    } else {
      resultsBox.innerHTML = '<ul style="list-style:none;margin:0;padding:6px 0;">' + hits.map(function (h) {
        return '<li style="border-bottom:1px solid #eee;"><a href="' + rootPrefix + h.url + '" style="display:block;padding:10px 16px;color:#1d2b44;text-decoration:none;font-size:15px;font-weight:500;">' + h.title + '</a></li>';
      }).join('') + '</ul>';
    }
    resultsBox.style.display = 'block';
  }

  input.addEventListener('input', runSearch);
  form.addEventListener('submit', function (e) { e.preventDefault(); runSearch(); });
})();