const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a,button,.car-card,.service-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    ring.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    ring.classList.remove('hovered');
  });
});

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 50);
});

let menuOpen = false;
document.getElementById('hamburgerBtn').addEventListener('click', () => {
  menuOpen = !menuOpen;
  document.getElementById('mobileMenu').classList.toggle('open', menuOpen);
});

function closeMenu() {
  menuOpen = false;
  document.getElementById('mobileMenu').classList.remove('open');
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in-view');
  });
},{ threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function filterCars(btn, type) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.car-card').forEach(card => {
    const show = type === 'all' || card.dataset.type === type;
    card.style.transition = 'opacity 0.4s,transform 0.4s';
    card.style.opacity = show ? '1' : '0.18';
    card.style.transform = show ? '' : 'scale(0.97)';
    card.style.pointerEvents = show ? 'auto' : 'none';
  });
}

let tIdx = 0;
const track = document.getElementById('testimonialsTrack');

function cardW() {
  const c = track.querySelector('.testimonial-card');
  return c ? c.offsetWidth + 28 : 448;
}

function slideTestimonials(dir) {
  const total = track.querySelectorAll('.testimonial-card').length;
  tIdx = Math.max(0, Math.min(tIdx + dir, total - 1));
  track.style.transform = `translateX(-${tIdx * cardW()}px)`;
}

window.addEventListener('resize', () => {
  track.style.transform = `translateX(-${tIdx * cardW()}px)`;
});

setInterval(() => {
  const total = track.querySelectorAll('.testimonial-card').length;
  tIdx = (tIdx + 1) % total;
  track.style.transform = `translateX(-${tIdx * cardW()}px)`;
}, 5500);

function handleSubmit(e) {
  e.preventDefault();
  const b = e.target;
  b.textContent = 'Sending…';
  b.style.opacity = '0.7';
  setTimeout(() => {
    b.textContent = 'Enquiry Sent ✓';
    b.style.background = '#2e7d52';
    b.style.color = '#eef6f0';
    b.style.opacity = '1';
    setTimeout(() => {
      b.textContent = 'Send Enquiry';
      b.style.background = '';
      b.style.color = '';
    }, 3500);
  }, 1200);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
