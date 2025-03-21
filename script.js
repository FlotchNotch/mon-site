// Gestion du curseur personnalisé (dot)
const dot = document.querySelector('.cursor-dot');

if (dot) {
    let mouseX = 0, mouseY = 0; // Position actuelle de la souris
    let dotX = 0, dotY = 0;     // Position actuelle du curseur personnalisé

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; // Mise à jour des coordonnées X de la souris
        mouseY = e.clientY; // Mise à jour des coordonnées Y de la souris
    });

    const animateDot = () => {
        const delay = 0.1; // Réactivité ajustée pour un suivi fluide

        // Mise à jour des coordonnées du curseur personnalisé (avec un effet de traînée)
        dotX += (mouseX - dotX) * delay;
        dotY += (mouseY - dotY) * delay;

        // Application des nouvelles positions via CSS
        dot.style.transform = `translate(${dotX}px, ${dotY}px)`;

        // Boucle d'animation
        requestAnimationFrame(animateDot);
    };

    // Lancement de l'animation
    animateDot();
} else {
    console.warn('L\'élément avec la classe "cursor-dot" est introuvable.');
}

// Gestion du menu mobile
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const headerButtons = document.querySelector('.header-buttons');

if (mobileMenuButton && headerButtons) {
    mobileMenuButton.addEventListener('click', () => {
        headerButtons.classList.toggle('active');

        // Mise à jour de l'état ARIA pour l'accessibilité
        const isOpen = headerButtons.classList.contains('active');
        mobileMenuButton.setAttribute('aria-expanded', isOpen);

        // Changement du symbole du menu
        mobileMenuButton.textContent = isOpen ? '✕' : '☰';
    });
} else {
    console.warn('Le bouton du menu mobile ou les boutons de navigation sont introuvables.');
}

// Gestion des boutons avec défilement fluide
const buttons = document.querySelectorAll('.card-button, .header-buttons-item');

if (buttons.length > 0) {
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le comportement par défaut

            const targetId = button.getAttribute('href'); // Récupère l'attribut href
            const targetElement = document.querySelector(targetId);

            // Ferme le menu mobile si ouvert
            if (headerButtons && headerButtons.classList.contains('active')) {
                headerButtons.classList.remove('active');
                mobileMenuButton.textContent = '☰';
            }

            if (targetElement) {
                // Défilement fluide vers l'élément cible
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

// Défilement fluide natif activé par CSS (supplémentaire)
document.documentElement.style.scrollBehavior = 'smooth';
