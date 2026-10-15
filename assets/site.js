// zohaibmughal.dev. Generated site; edit in the hub (02-portfolio/freelance-site/site.js).
// Everything here is an enhancement: without script the page reads and works in full.

// Reveal once when an element enters the viewport; never leaves content hidden.
(() => {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  targets.forEach((el) => io.observe(el));
  window.addEventListener('load', () => setTimeout(() => {
    targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
  }, 2500));
})();

// The scoper: choose what you need; the sheet lights the runs that prove it, the price shows,
// and the email is rewritten with the choice.
(() => {
  const dataEl = document.getElementById('scoper-data');
  const sheet = document.getElementById('sheet');
  if (!dataEl || !sheet) return;
  const data = JSON.parse(dataEl.textContent);
  const out = document.getElementById('scoper-out');
  const start = document.getElementById('start');
  const chips = [...document.querySelectorAll('.chip[data-need]')];
  const frames = [...sheet.querySelectorAll('.frame')];
  const priceCells = [...document.querySelectorAll('[data-offer]')];
  const defaultOut = out.textContent;
  const defaultHref = start.getAttribute('href');

  const mail = (subject, body) => `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  function select(id) {
    const need = id ? data.needs[id] : null;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.need === id)));
    priceCells.forEach((c) => c.classList.toggle('pick', !!need && c.dataset.offer === need.offer));
    if (!need) {
      sheet.removeAttribute('data-need');
      frames.forEach((f) => f.classList.remove('on'));
      out.textContent = defaultOut;
      start.setAttribute('href', defaultHref);
      return;
    }
    sheet.setAttribute('data-need', id);
    frames.forEach((f) => f.classList.toggle('on', need.proof.includes(f.dataset.p)));
    const offer = data.offers[need.offer];
    if (offer.from.startsWith('$')) {
      out.innerHTML = '';
      const strong = document.createElement('strong');
      strong.textContent = `${need.label} from ${offer.from}`;
      out.append(strong, document.createTextNode(`, in about ${offer.days}. The lit screens are ones I shipped.`));
    } else {
      out.textContent = /^\d/.test(offer.days || '')
        ? `${need.label}: fixed price, in about ${offer.days}. The lit screens are ones I shipped.`
        : `${need.note} The lit screens are ones I shipped.`;
    }
    start.setAttribute('href', mail(`Project enquiry: ${need.label}`,
      `Hi Zohaib,\n\nI need: ${need.label}\n\nWhat it should do:\n\nWhen I need it:\n\nBudget:\n`));
  }

  chips.forEach((c) => {
    c.setAttribute('role', 'button');
    c.setAttribute('aria-pressed', 'false');
    c.addEventListener('click', (ev) => {
      ev.preventDefault();
      select(c.getAttribute('aria-pressed') === 'true' ? null : c.dataset.need);
    });
    c.addEventListener('keydown', (ev) => {
      if (ev.key === ' ') { ev.preventDefault(); c.click(); }
    });
  });
})();

// Ledger: hovering or focusing a row shows its first screen beside the column.
(() => {
  const list = document.querySelector('.ledger-list');
  const prev = document.querySelector('.ledger-preview');
  if (!list || !prev || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const img = prev.querySelector('img');
  const show = (a) => {
    if (img.getAttribute('src') !== a.dataset.prev) img.src = a.dataset.prev;
    prev.style.setProperty('--py', `${a.offsetTop + list.offsetTop - prev.offsetTop}px`);
  };
  list.querySelectorAll('a').forEach((a) => {
    a.addEventListener('mouseenter', () => show(a));
    a.addEventListener('focus', () => show(a));
  });
})();

// The hero clips its sheet at the viewport's edges; frames wholly outside it are not shown, so
// nothing invisible is left in the reading order of the page around it.
(() => {
  const hero = document.querySelector('.hero');
  if (!hero || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) en.target.classList.toggle('out', !en.isIntersecting);
  }, { root: hero, threshold: 0 });
  hero.querySelectorAll('.frame, .strip').forEach((el) => io.observe(el));
})();

// What I build: hovering a name shows its one-line description in the empty columns.
(() => {
  const pane = document.querySelector('.fdesc');
  if (!pane || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.fnames li').forEach((li) => {
    li.addEventListener('mouseenter', () => { pane.textContent = li.dataset.desc; });
  });

})();

// Questions: one answer at a time. Wide screens show it large in the pane; phones open it in place.
(() => {
  const qs = [...document.querySelectorAll('.faq .q')];
  const pane = document.querySelector('.faq-pane p');
  if (!qs.length) return;
  const wide = matchMedia('(min-width: 761px)');
  let current = 0;
  function show(i, how) {
    current = i;
    qs.forEach((q, k) => {
      q.setAttribute('aria-expanded', String(k === i));
      const a = document.getElementById(q.getAttribute('aria-controls'));
      a.hidden = k !== i;   // only the selected answer is in the page; wide screens also show it in the pane
    });
    if (pane) {
      const text = document.getElementById(qs[i].getAttribute('aria-controls')).textContent;
      if (pane.textContent === text) return;
      if (how === 'key') { pane.textContent = text; return; }   // keyboard moves are never animated
      pane.classList.add('fade');
      setTimeout(() => { pane.textContent = text; pane.classList.remove('fade'); }, 120);
    }
  }
  qs.forEach((q, i) => {
    q.addEventListener('click', () => show(i));
    q.addEventListener('focus', () => { if (wide.matches) show(i, 'key'); });
    q.addEventListener('mouseenter', () => { if (wide.matches) show(i, 'pointer'); });
  });
  wide.addEventListener('change', () => show(current));
  show(0, 'key');
})();

// The time in Karachi, for the footer.
(() => {
  const el = document.getElementById('khi-time');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Karachi' });
  const tick = () => { const now = new Date(); el.textContent = fmt.format(now); el.setAttribute('datetime', now.toISOString()); };
  tick();
  setInterval(tick, 30000);
})();
