const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const toast = document.getElementById('toast');
const year = document.getElementById('year');
const progress = document.getElementById('scrollProgress');

year.textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

document.querySelectorAll('[data-placeholder-link]').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  });
});

function updateProgress(){
  const h = document.documentElement;
  const progressValue = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = `${Math.max(0, Math.min(100, progressValue))}%`;
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
