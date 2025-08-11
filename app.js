/* ---------- Robust --vh setup (paste at top of app.js) ---------- */
(function () {
  // fallback default so CSS isn't empty before script runs
  document.documentElement.style.setProperty('--vh', '1vh');

  const hasVisualViewport = !!window.visualViewport;

  const getViewportHeight = () => {
    // Prefer visualViewport if available (gives visible area excluding UI chrome)
    if (hasVisualViewport && typeof window.visualViewport.height === 'number') {
      return Math.round(window.visualViewport.height);
    }
    return Math.round(window.innerHeight);
  };

  // one-shot setter
  function setVhOnce() {
    const h = getViewportHeight();
    document.documentElement.style.setProperty('--vh', `${h * 0.01}px`);
    return h;
  }

  // keep setting for a few frames until the measured height stabilizes
  function settleVh(maxFrames = 30) {
    let frames = 0;
    let last = setVhOnce();
    let stable = 0;

    function step() {
      frames++;
      const curr = setVhOnce();
      // consider stable when change < 1px for 3 consecutive frames
      if (Math.abs(curr - last) < 1) stable++; else stable = 0;
      last = curr;
      if (stable < 3 && frames < maxFrames) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // Run early + with small delay to allow UI chrome to settle
  document.addEventListener('DOMContentLoaded', () => {
    // try to settle immediately and again after a short timeout
    settleVh();
    setTimeout(settleVh, 60);
  });

  // fonts can change layout — run after fonts load (if supported)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => setTimeout(settleVh, 50)).catch(() => {});
  }

  // also run after window load (images etc)
  window.addEventListener('load', () => setTimeout(settleVh, 50));

  // listen for viewport changes:
  if (hasVisualViewport) {
    // visualViewport gives better events for mobile UI changes
    window.visualViewport.addEventListener('resize', () => {
      setVhOnce();
    });
  } else {
    window.addEventListener('resize', setVhOnce);
    // orientation change fallback
    window.addEventListener('orientationchange', () => setTimeout(setVhOnce, 60));
  }

  // expose for debugging if needed
  window.setVhOnce = setVhOnce;
  window.settleVh = settleVh;
})();
/* ---------- End --vh setup ---------- */


/* ---------- Page behaviour (buttons, confetti) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('surpriseBtn');
  const card = document.getElementById('card');
  const container = document.getElementById('container');
  const finalBtn = document.getElementById('lastBtn');
  const finalPage = document.getElementById('finalPage');

  if (!btn) return; // safety

  btn.addEventListener('click', () => {
    // Reveal card, hide header/flexbox
    card.style.display = 'flex';
    const hdr = document.getElementById('header');
    const flex = document.getElementById('flexbox');
    if (hdr) hdr.style.display = 'none';
    if (flex) flex.style.display = 'none';

    // Confetti
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

    container.style.display = 'flex';
    // ensure sizes recalc after showing elements (helpful in some browsers)
    setTimeout(() => window.settleVh && window.settleVh(), 40);
  });

  finalBtn && finalBtn.addEventListener('click', () => {
    if (card) card.style.display = 'none';
    if (container) container.style.display = 'none';
    if (finalPage) finalPage.style.display = 'flex';

    document.body.style.backgroundImage = 'url(birthday_image.webp)';
    document.body.style.backgroundSize = 'auto';
    // small delay to let background apply then recalc
    setTimeout(() => window.setVhOnce && window.setVhOnce(), 40);
  });
});
