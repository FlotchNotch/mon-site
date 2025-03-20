// Gestion du curseur personnalisé (dot)
const dot = document.querySelector('.cursor-dot');

if (!dot) {
    console.error('L\'élément avec la classe "cursor-dot" est introuvable.');
} else {
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
}

// Gestion des boutons avec défilement fluide
const buttons = document.querySelectorAll('.card-button');

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Bloque le comportement de clic par défaut

        const targetId = button.getAttribute('data-scroll'); // Récupère l'ID cible
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Défilement fluide vers l'élément cible
            const headerOffset = 100; // Compense la hauteur du header
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

// Ajout du défilement fluide natif
document.documentElement.style.scrollBehavior = 'smooth';
