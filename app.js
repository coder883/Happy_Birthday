// ✅ Mobile-friendly viewport height fix
function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Run as soon as DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to allow mobile browser UI to settle
    setTimeout(setVh, 300);
});

// Run again after full load (images, fonts, etc.)
window.addEventListener('load', setVh);

// Update on resize (rotation, address bar hide)
window.addEventListener('resize', setVh);

window.onload = () => {
    const btn = document.getElementById('surpriseBtn');
    const card = document.getElementById('card');
    const container = document.getElementById("container");
    const finalBtn = document.getElementById('lastBtn');
    const finalPage = document.getElementById("finalPage");

    btn.addEventListener('click', () => {
        // Show card
        card.style.display = 'flex';
        document.getElementById("header").style.display = "none";
        document.getElementById("flexbox").style.display = "none";

        // Confetti parameters adjusted for mobile
        const isMobile = window.innerWidth <= 600;
        const burstCount = 10;
        const startX = 0.2;
        const endX = 0.8;

        for (let i = 0; i < burstCount; i++) {
            confetti({
                particleCount: isMobile ? 100 : 160,
                spread: isMobile ? 90 : 120,
                angle: 90,
                gravity: isMobile ? 0.8 : 0.6,
                scalar: 1.5,
                origin: { x: startX + ((endX - startX) / (burstCount - 1)) * i, y: 0.7 },
                ticks: isMobile ? 250 : 400
            });
        }

        container.style.display = "flex";
    });

    finalBtn.addEventListener('click', () => {
        // Hide card and container
        card.style.display = 'none';
        container.style.display = "none";

        // Show final page
        finalPage.style.display = "flex";
        document.body.style.backgroundImage = "url(birthday_image.webp)";
        document.body.style.backgroundSize = "none";
    });
};

