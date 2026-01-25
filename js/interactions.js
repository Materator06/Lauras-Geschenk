console.log("interactions.js loaded");

/* ======================================================
   🔧 GLOBAL ELEMENTS
====================================================== */
const body = document.body;

const frames = document.querySelectorAll(".frame");
const card = document.getElementById("card");
const stage = document.getElementById("stage");

const uploadUI = document.getElementById("uploadUI");
const frameSelector = document.getElementById("frameSelector");
const imageInput = document.getElementById("imageInput");
const uploadButton = document.getElementById("uploadButton");
const imageLabel = document.getElementById("imageLabel");

/* ======================================================
   🔒 PASSWORD LOCK
====================================================== */
const correctPassword = "laura";

const unlockButton = document.getElementById("unlockButton");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const lockscreen = document.getElementById("lockscreen");

unlockButton.addEventListener("click", () => {
  const entered = passwordInput.value.trim().toLowerCase();

  if (entered === correctPassword.toLowerCase()) {
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
   🎯 FOCUS SYSTEM
====================================================== */
let focusedElement = null;

function setFocus(el) {
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
  focusedElement = null;

  document.querySelectorAll(".focused").forEach(e =>
    e.classList.remove("focused")
  );

  document.querySelectorAll(".dimmed").forEach(e =>
    e.classList.remove("dimmed")
  );

  card.classList.remove("open");
}

/* ======================================================
   🖼️ FRAME INTERACTIONS
====================================================== */
frames.forEach(frame => {
  frame.addEventListener("click", e => {
    e.stopPropagation();
    setFocus(frame);
  });
});

/* ======================================================
   💌 CARD INTERACTIONS
====================================================== */
card.addEventListener("click", e => {
  e.stopPropagation();

  if (!card.classList.contains("focused")) {
    setFocus(card);
  } else {
    card.classList.toggle("open");
  }
});

/* ======================================================
   🌫️ CLEAR FOCUS ON EMPTY CLICK
====================================================== */
document.addEventListener("click", () => {
  clearFocus();
});

/* ======================================================
   🖼️ DESKTOP OVAL POSITIONING
====================================================== */
function positionFramesOval() {
  if (window.innerWidth <= 768) return;

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
   📱 MOBILE SWIPE (IMAGES ↔ CARD)
====================================================== */
let startX = 0;
let currentView = 0; // 0 = images, 1 = card

stage.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

stage.addEventListener("touchend", e => {
  const deltaX = e.changedTouches[0].clientX - startX;

  if (Math.abs(deltaX) < 60) return;

  if (deltaX < 0 && currentView === 0) {
    currentView = 1;
  } else if (deltaX > 0 && currentView === 1) {
    currentView = 0;
  }

  stage.style.transform = `translateX(-${currentView * 100}vw)`;
});

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
    const img = frames[index].querySelector("img");
    img.src = ev.target.result;
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

/* ======================================================
   🚫 PREVENT SCROLL LOCK ISSUES
====================================================== */
document.addEventListener("touchmove", e => {
  if (focusedElement) e.preventDefault();
}, { passive: false });
