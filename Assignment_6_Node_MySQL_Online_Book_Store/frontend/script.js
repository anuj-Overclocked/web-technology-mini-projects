const API_BASE_URL =
  window.location.origin &&
  window.location.origin !== 'null' &&
  !window.location.origin.includes(':5500') &&
  !window.location.origin.includes(':3000') &&
  !window.location.origin.startsWith('file:')
    ? window.location.origin
    : 'http://localhost:8081';

function setupMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.addEventListener('DOMContentLoaded', setupMobileMenu);
