console.log("intro.js loaded");

/* ======================================================
   ✨ INTRO TEXT CONTENT
====================================================== */
const introLines = [
  "Alles Gute zum Jahrestag 💖",
  "",
  "Laura ❤️",
  "",
  "Ich liebe dich ganz doll.",
  "",
  "Jeder Moment mit dir ist etwas Besonderes.",
  "",
  "Und hier ist dein Geschenk 🎁"
];

/* ======================================================
   🔧 ELEMENTS
====================================================== */
const intro = document.getElementById("intro");
const introText = document.getElementById("introText");
const scene = document.getElementById("scene");

/* ======================================================
   ⏱️ TIMING SETTINGS
====================================================== */
const TYPE_SPEED = 55;      // Buchstaben
const LINE_DELAY = 650;    // Pause nach jeder Zeile
const END_DELAY = 1200;    // Pause vor Fade-Out

let lineIndex = 0;
let charIndex = 0;
let introStarted = false;

/* ======================================================
   ⌨️ TYPEWRITER LOGIC
====================================================== */
function typeNextChar() {
  if (lineIndex >= introLines.length) {
    finishIntro();
    return;
  }

  const currentLine = introLines[lineIndex];

  if (charIndex < currentLine.length) {
    introText.textContent += currentLine.charAt(charIndex);
    charIndex++;

    setTimeout(typeNextChar, TYPE_SPEED);
  } else {
    introText.textContent += "\n";
    lineIndex++;
    charIndex = 0;

    setTimeout(typeNextChar, LINE_DELAY);
  }
}

/* ======================================================
   🌫️ INTRO FINISH
====================================================== */
function finishIntro() {
  setTimeout(() => {
    intro.style.opacity = "0";

    if (scene) {
      scene.style.opacity = "1";
    }

    setTimeout(() => {
      intro.style.display = "none";
    }, 2000);

  }, END_DELAY);
}

/* ======================================================
   ▶️ START INTRO (PUBLIC)
====================================================== */
function startIntro() {
  if (introStarted) return;
  introStarted = true;

  introText.textContent = "";
  intro.style.display = "flex";
  intro.style.opacity = "1";

  lineIndex = 0;
  charIndex = 0;

  setTimeout(typeNextChar, 400);
}

/* ======================================================
   🛑 SAFETY: DO NOT AUTO-START
====================================================== */
/*
  startIntro() wird bewusst NICHT automatisch aufgerufen.
  Es wird erst nach korrektem Passwort aus interactions.js gestartet.
*/
