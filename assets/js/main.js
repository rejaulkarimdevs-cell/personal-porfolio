// Testimonial slider
new Splide('#testimonialSlider', {
  type        : 'loop',
  perPage     : 2,
  perMove     : 1,
  gap         : '24px',
  autoplay    : true,
  interval    : 4000,
  pauseOnHover: true,
  arrows      : false,
  pagination  : true,
  breakpoints : {
    768: { perPage: 1 },
  },
}).mount();

// Nav hamburger
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Lightbox
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lbImg');
const lbName     = document.getElementById('lbName');
const lbResult   = document.getElementById('lbResult');
const lbClose    = document.getElementById('lbClose');
const lbBackdrop = document.getElementById('lbBackdrop');

document.querySelectorAll('.work-card').forEach(card => {
  // Add visit link button
  const url = card.dataset.url;
  if (url) {
    const visitBtn = document.createElement('a');
    visitBtn.className = 'work-visit';
    visitBtn.href = url;
    visitBtn.target = '_blank';
    visitBtn.rel = 'noopener';
    visitBtn.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.63589 19.7784L4.22169 18.3644L15.657 6.92908L10.0712 6.92908V4.92908L19.0712 4.92908L19.0712 13.9291H17.0712L17.0712 8.34326L5.63589 19.7784Z"></path></svg>';
    visitBtn.setAttribute('aria-label', 'Visit site');
    visitBtn.addEventListener('click', e => e.stopPropagation());
    card.querySelector('.work-img-wrap').appendChild(visitBtn);
  }

  // Lightbox on card click
  card.addEventListener('click', () => {
    lbImg.src              = card.dataset.img;
    lbImg.alt              = card.dataset.name;
    lbName.textContent     = card.dataset.name;
    lbResult.textContent   = card.dataset.result;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 250);
}

lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Contact form — Web3Forms
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('formSubmitBtn');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending…';
  formStatus.textContent = '';
  formStatus.className   = 'form-status';

  const data = new FormData(form);

  try {
    const res  = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data,
    });
    const json = await res.json();

    if (json.success) {
      formStatus.textContent = '✓ Message sent! I\'ll reply within 24 hours.';
      formStatus.classList.add('form-status--success');
      form.reset();
    } else {
      throw new Error(json.message || 'Submission failed');
    }
  } catch (err) {
    formStatus.textContent = '✗ Something went wrong. Please email me directly.';
    formStatus.classList.add('form-status--error');
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Send Message';
  }
});
