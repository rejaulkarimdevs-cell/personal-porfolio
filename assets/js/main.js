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
