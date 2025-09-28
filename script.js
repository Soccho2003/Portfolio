// Theme toggle, menu, scroll spy, filters, contact, progress, back-to-top
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', String(!isLight));
  });
}

// Sidebar toggle on mobile
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

// Scroll spy for side nav
const navLinks = Array.from(document.querySelectorAll('.sidenav a'));
const targets = navLinks.map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const idx = targets.indexOf(entry.target);
    if (idx >= 0 && entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      navLinks[idx].classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });
targets.forEach(s => s && spy.observe(s));

// Project filtering
const projectList = document.getElementById('projectList');
const filterBtns = document.querySelectorAll('.pill');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const tag = btn.dataset.filter;
  Array.from(projectList.children).forEach(card => {
    const tags = (card.dataset.tags || '').split(' ');
    card.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
  });
}));

// Contact form (demo)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Form submission (demo):', data);
    formMsg.textContent = 'Thanks! Message captured locally (demo). Replace with Formspree/EmailJS.';
    form.reset();
  });
}

// Progress bar & back-to-top
const progress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
function onScroll() {
  const scrollTop = window.scrollY;
  const docH = document.body.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? Math.min(100, (scrollTop / docH) * 100) : 0;
  progress.style.width = pct + '%';
  if (scrollTop > 400) backToTop.classList.add('show'); else backToTop.classList.remove('show');
}
window.addEventListener('scroll', onScroll);
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Years
const y = new Date().getFullYear();
document.getElementById('year').textContent = y;
document.getElementById('yearMini').textContent = y;
