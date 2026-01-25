console.log("intro.js loaded");

/* =========================
   INTRO TEXT
========================= */
const text = [
  "Alles Gute zum Jahrestag 💖",
  "Laura ❤️",
  "Ich liebe dich ganz doll ❤️",
  "Und hier ist dein Geschenk 🎁"
];

const target = document.getElementById("intro-text");
let i = 0; // Zeilenindex
let j = 0; // Buchstabenindex

function type() {
  if (i < text.length) {
    if (j < text[i].length) {
      target.textContent += text[i][j++];
      setTimeout(type, 60); // Tippgeschwindigkeit
    } else {
      target.textContent += "\n"; // Zeilenumbruch
      i++;
      j = 0;
      setTimeout(type, 700); // Pause zwischen Zeilen
    }
  } else {
    // Intro ausblenden
    setTimeout(() => {
      const intro = document.getElementById("intro");
      intro.style.opacity = "0";
      intro.style.pointerEvents = "none";

      const scene = document.getElementById("scene");
      if (scene) scene.style.opacity = "1";
    }, 1200);
  }
}

/* =========================
   START INTRO
========================= */
function startIntro() {
  target.textContent = "";
  type();
}

