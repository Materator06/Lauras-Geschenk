console.log("interactions.js loaded");

/* ======================================================
   🔧 GLOBAL ELEMENTS
====================================================== */
let cardExpanded = false;
const body = document.body;
const frames = document.querySelectorAll(".frame");
const card = document.getElementById("card");
const stage = document.getElementById("stage");
const framesContainer = document.getElementById("frames");

const uploadUI = document.getElementById("uploadUI");
const frameSelector = document.getElementById("frameSelector");
const imageInput = document.getElementById("imageInput");
const uploadButton = document.getElementById("uploadButton");
const imageLabel = document.getElementById("imageLabel");

const isMobile = () => window.innerWidth <= 768;

/* ======================================================
   🔒 PASSWORD LOCK
====================================================== */
const correctPassword = "250125";

const unlockButton = document.getElementById("unlockButton");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const lockscreen = document.getElementById("lockscreen");

unlockButton.addEventListener("click", () => {
  const entered = passwordInput.value.trim();

  if (entered === correctPassword) {
    body.classList.remove("locked");
    lockscreen.style.display = "none";
    passwordError.style.display = "none";

    if (typeof startIntro === "function") {
      startIntro();
    } else {
      document.getElementById("scene").style.opacity = "1";
    }
  } else {
    passwordError.style.display = "block";
  }
});

/* ======================================================
   🎯 DESKTOP FOCUS SYSTEM (UNVERÄNDERT)
====================================================== */
let focusedElement = null;

function setFocus(el) {
  if (isMobile()) return;

  if (focusedElement === el) return;
  clearFocus();

  focusedElement = el;
  el.classList.add("focused");

  [...frames, card].forEach(e => {
    if (e !== el) e.classList.add("dimmed");
  });

  uploadUI.classList.remove("dimmed");
}

function clearFocus() {
  if (isMobile()) return;

  focusedElement = null;

  document.querySelectorAll(".focused").forEach(e =>
    e.classList.remove("focused")
  );

  document.querySelectorAll(".dimmed").forEach(e =>
    e.classList.remove("dimmed")
  );

  card.classList.remove("open");
  card.classList.remove("expanded");
  cardExpanded = false;

}

frames.forEach(frame => {
  frame.addEventListener("click", e => {
    if (isMobile()) return;
    e.stopPropagation();
    setFocus(frame);
  });
});

card.addEventListener("click", e => {
  e.stopPropagation();

  // 📱 Mobile: nur flip
  if (isMobile()) {
    card.classList.toggle("open");
    return;
  }

  // 🖥️ Desktop
  if (!card.classList.contains("focused")) {
    setFocus(card);
    card.classList.add("open");
    cardExpanded = false;
    card.classList.remove("expanded");
    return;
  }

  // 1️⃣ Klick: öffnen
  if (!card.classList.contains("open")) {
    card.classList.add("open");
    cardExpanded = false;
    card.classList.remove("expanded");
    return;
  }

  // 2️⃣ Klick: erweitern
  if (!cardExpanded) {
    card.classList.add("expanded");
    cardExpanded = true;
  }
});


document.addEventListener("click", () => {
  if (!isMobile()) clearFocus();
});

/* ======================================================
   🖼️ DESKTOP OVAL POSITIONING
====================================================== */
function positionFramesOval() {
  if (isMobile()) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const cx = vw / 2;
  const cy = vh / 2;

  const rx = Math.min(vw, 1200) / 2.1;
  const ry = Math.min(vh, 700) / 2.2;

  frames.forEach((frame, i) => {
    const angle = (i / frames.length) * Math.PI * 2 - Math.PI / 2;

    const x = cx + Math.cos(angle) * rx;
    const y = cy + Math.sin(angle) * ry;

    frame.style.left = `${x - frame.offsetWidth / 2}px`;
    frame.style.top = `${y - frame.offsetHeight / 2}px`;
    frame.style.zIndex = Math.floor(y);
  });
}

window.addEventListener("resize", positionFramesOval);
window.addEventListener("load", positionFramesOval);

/* ======================================================
   📱 MOBILE SWIPE SYSTEM (STABIL)
====================================================== */
let startX = 0;
let startY = 0;
let currentView = 0;
let isSwiping = false;

stage.addEventListener(
  "touchstart",
  e => {
    if (!isMobile()) return;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = true;
  },
  { passive: true }
);

stage.addEventListener(
  "touchend",
  e => {
    if (!isMobile() || !isSwiping) return;
    isSwiping = false;

    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    /* ❗ Vertikales Scrollen IMMER erlauben */
    if (Math.abs(dy) > Math.abs(dx)) return;

    /* ❗ Mini-Bewegungen ignorieren */
    if (Math.abs(dx) < 80) return;

    if (dx < 0 && currentView === 0) currentView = 1;
    if (dx > 0 && currentView === 1) currentView = 0;

    stage.style.transform = `translateX(-${currentView * 100}vw)`;
  },
  { passive: true }
);

/* ======================================================
   🎁 IMAGE UPLOAD + STORAGE
====================================================== */
imageInput.addEventListener("change", () => {
  if (imageInput.files.length > 0) {
    imageLabel.textContent = "✔ Bild gewählt";
  }
});

uploadButton.addEventListener("click", e => {
  e.stopPropagation();

  const file = imageInput.files[0];
  if (!file) {
    alert("Bitte ein Bild auswählen ❤️");
    return;
  }

  const index = Number(frameSelector.value);
  const reader = new FileReader();

  reader.onload = ev => {
    frames[index].querySelector("img").src = ev.target.result;
    localStorage.setItem(`frameImage-${index}`, ev.target.result);
  };

  reader.readAsDataURL(file);
});

/* ======================================================
   💾 LOAD SAVED IMAGES
====================================================== */
frames.forEach((frame, i) => {
  const saved = localStorage.getItem(`frameImage-${i}`);
  if (saved) {
    frame.querySelector("img").src = saved;
  }
});
