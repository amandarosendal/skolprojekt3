// Allt JS för interaktivitet
// Mobilmeny
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
if (toggle){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded','false');
    }
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold: .15});
document.querySelectorAll('.reveal-on-scroll').forEach(el=>io.observe(el));

// Filter för spots
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const val = btn.dataset.filter;
    document.querySelectorAll('.card').forEach(card=>{
      const level = card.dataset.level;
      if (val === 'alla' || level === val) card.style.display = '';
      else card.style.display = 'none';
    });
  });
});

// Accordion
document.querySelectorAll('.acc-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const panel = btn.nextElementSibling;
    panel.classList.toggle('open');
  });
});

// Gallery lightbox
const lb = document.querySelector('.lightbox');
const lbImg = document.querySelector('.lightbox-img');
const lbClose = document.querySelector('.lightbox-close');
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lb.classList.add('open');
  });
});
lbClose?.addEventListener('click', ()=> lb.classList.remove('open'));
lb?.addEventListener('click', (e)=>{
  if(e.target === lb) lb.classList.remove('open');
});

// Form validation (basic)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
function setError(input, msg){
  const small = input.parentElement.querySelector('.error');
  if (small){ small.textContent = msg || ''; }
}
function validateEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  status.textContent = '';
  let ok = true;

  const name = form.name;
  const email = form.email;
  const message = form.message;

  if (!name.value.trim()){ setError(name, 'Skriv ditt namn'); ok = false; } else setError(name,'');
  if (!validateEmail(email.value)){ setError(email, 'Ogiltig e-post'); ok = false; } else setError(email,'');
  if (message.value.trim().length < 10){ setError(message, 'Minst 10 tecken'); ok = false; } else setError(message,'');

  if (ok){
    status.textContent = 'Tack! Vi hör av oss snart.';
    form.reset();
  }
});

// År i footer & to-top
document.getElementById('year').textContent = new Date().getFullYear();
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  window.scrollY > 600 ? toTop.classList.add('show') : toTop.classList.remove('show');
});
toTop?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
