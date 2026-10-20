// EverShade Painting Co. — accessible navigation, comparison slider and WhatsApp enquiries
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const comparison = document.getElementById('before-after');
  const range = document.getElementById('comparison-range');
  function setComparison(value) {
    if (!comparison || !range) return;
    const split = Math.max(5, Math.min(95, Number(value)));
    comparison.style.setProperty('--split', split + '%');
    const before = comparison.querySelector('.before-layer');
    if (before) before.style.width = split + '%';
    const beforeImage = before && before.querySelector('img');
    if (beforeImage) beforeImage.style.width = (10000 / split) + '%';
    range.value = String(split);
  }
  if (range && comparison) {
    setComparison(range.value);
    range.addEventListener('input', () => setComparison(range.value));
    const left = document.getElementById('before-prev');
    const right = document.getElementById('after-next');
    if (left) left.addEventListener('click', () => setComparison(Number(range.value) - 10));
    if (right) right.addEventListener('click', () => setComparison(Number(range.value) + 10));
  }

  const form = document.getElementById('estimate-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const fields = {
        name: String(data.get('name') || '').trim(),
        phone: String(data.get('phone') || '').trim(),
        project: String(data.get('project') || '').trim(),
        location: String(data.get('location') || '').trim(),
        message: String(data.get('message') || '').trim()
      };
      const text = [
        'Hello EverShade Painting Co., I would like to request a free estimate.',
        '',
        'Name: ' + fields.name,
        'My phone: ' + fields.phone,
        'Project type: ' + fields.project,
        'Location: ' + (fields.location || 'Not provided'),
        'Project details: ' + (fields.message || 'Not provided')
      ].join('\n');
      const url = 'https://wa.me/917795319519?text=' + encodeURIComponent(text);
      const popup = window.open(url, '_blank', 'noopener,noreferrer');
      if (!popup) window.location.href = url;
    });
  }
})();
