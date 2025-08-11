window.onload = () => {
  const btn = document.getElementById("surpriseBtn");
  const card = document.getElementById("card");
  const container = document.getElementById("container");
  const finalBtn = document.getElementById("lastBtn");
  const finalPage = document.getElementById("finalPage");
  const header = document.getElementById("header");
  const flexbox = document.getElementById("flexbox");

  btn.addEventListener("click", () => {
    // Κρύβουμε header & κουμπί
    header.style.display = "none";
    flexbox.style.display = "none";

    // Εμφανίζουμε την κάρτα με flex και σωστό direction
    card.style.display = "flex";
    card.style.flexDirection = "column";

    // Κάνουμε confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  });

  card.addEventListener("click", () => {
    // Κρύβουμε κάρτα
    card.style.display = "none";

    // Εμφανίζουμε container με το δεύτερο κουμπί
    container.style.display = "flex";
    container.style.flexDirection = "column";

    // Confetti πάλι
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 },
    });
  });

  finalBtn.addEventListener("click", () => {
    // Κρύβουμε container
    container.style.display = "none";

    // Εμφανίζουμε τελικό page με εικόνα και ήχους
    finalPage.style.display = "flex";
    finalPage.style.flexDirection = "column";

    // Confetti τελική γιορτή
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 },
    });
  });
};
