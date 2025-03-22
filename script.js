// ---------------------------------------------------------------------------
// 1. Gestion du curseur personnalisé (dot)
// ---------------------------------------------------------------------------
const dot = document.querySelector('.cursor-dot');

if (dot) {
  let mouseX = 0, mouseY = 0;       // Coordonnées actuelles de la souris
  let dotX = 0, dotY = 0;           // Coordonnées actuelles du dot

  // Met à jour les coordonnées de la souris
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Fonction d'animation pour créer un effet de traînée
  const animateDot = () => {
    const delay = 0.1; // Ajustement pour un suivi fluide
    dotX += (mouseX - dotX) * delay;
    dotY += (mouseY - dotY) * delay;
    dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    requestAnimationFrame(animateDot);
  };

  animateDot();
} else {
  console.warn('L\'élément avec la classe "cursor-dot" est introuvable.');
}


// ---------------------------------------------------------------------------
// 2. Gestion du menu mobile
// ---------------------------------------------------------------------------
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const headerButtons = document.querySelector('.header-buttons');

if (mobileMenuButton && headerButtons) {
  mobileMenuButton.addEventListener('click', () => {
    headerButtons.classList.toggle('active');
    const isOpen = headerButtons.classList.contains('active');
    mobileMenuButton.setAttribute('aria-expanded', isOpen);
    mobileMenuButton.textContent = isOpen ? '✕' : '☰';
  });
} else {
  console.warn('Le bouton du menu mobile ou le conteneur de navigation sont introuvables.');
}


// ---------------------------------------------------------------------------
// 3. Gestion des boutons avec défilement fluide
// ---------------------------------------------------------------------------
const buttons = document.querySelectorAll('.card-button, .header-buttons-item, .header-btn'); 
// Ceci inclut potentiellement d'autres classes de boutons de navigation

if (buttons.length > 0) {
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // Empêche le comportement par défaut
      const targetId = button.getAttribute('href'); // Récupère la cible
      const targetElement = document.querySelector(targetId);

      // Ferme le menu mobile s'il est ouvert
      if (headerButtons && headerButtons.classList.contains('active')) {
        headerButtons.classList.remove('active');
        mobileMenuButton.textContent = '☰';
      }

      if (targetElement) {
        const headerOffset = 80; // Compense la hauteur du header
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn(`L'élément avec l'ID "${targetId}" est introuvable.`);
      }
    });
  });
} else {
  console.warn('Aucun bouton de navigation trouvé.');
}


// ---------------------------------------------------------------------------
// 4. Animation des cartes lors du scroll (révélation progressive)
// ---------------------------------------------------------------------------
const cards = document.querySelectorAll('.card');

const revealCards = () => {
  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Lorsque la carte se trouve à 100px du bas de la fenêtre, on la rend visible
    if (cardTop < windowHeight - 100) {
      card.classList.add('visible');
    }
  });
};

// Déclenche l'animation lors du scroll
window.addEventListener('scroll', revealCards);

// Appel initial au chargement de la page
revealCards();
