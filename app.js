

const btn = document.getElementById('surpriseBtn');
const card = document.getElementById('card');

  btn.addEventListener('click', () => {
    // Show card
    card.style.display = 'flex';
    const header = document.getElementById("header");
    header.style.display = "none";
    const container = document.getElementById("flexbox");
    container.style.display= "none";

    // Launch confetti
    const burstCount = 10;
    const startX = 0.2;
    const endX = 0.8;

    for (let i = 0; i < burstCount; i++) {
    confetti({
        particleCount: 160,
        spread: 120,
        angle: 90,
        gravity: 0.6,        // slower fall for longer height
        scalar: 1.5,
        origin: { x: startX + ((endX - startX) / (burstCount - 1)) * i, y: 0.7 },  // start at top
        ticks: 500           // lasts longer
    });
    }
  });


  