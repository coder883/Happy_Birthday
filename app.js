window.onload = () => {
  const header = document.getElementById("header");
  const flexbox = document.getElementById("flexbox");
  header.style.display = "block";
  flexbox.style.display = "flex";
};


const btn = document.getElementById('surpriseBtn');
    const card = document.getElementById('card');

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

      const container = document.getElementById("container");
      container.style.display= "flex";
      if (window.innerWidth > 600){
        document.body.style.height = "150%";
      }
      else{
        document.body.style.height = "100%";
      }

    });


const finalBtn = document.getElementById('lastBtn');

    finalBtn.addEventListener('click', () => {
      // Show card
      card.style.display = 'none';

      const container = document.getElementById("container");
      container.style.display= "none";
      if (window.innerWidth > 600){
        document.body.style.height = "150%";
      }
      else{
        document.body.style.height = "80%";
      }
      const finalPage = document.getElementById("finalPage");
      finalPage.style.display = "flex";
      document.body.style.backgroundImage ="url(birthday_image.webp)";
      document.body.style.backgroundSize = "none";
    });
