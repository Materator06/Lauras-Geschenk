console.log("interactions.js loaded");

/* =========================
   GLOBAL VARIABLES
========================= */
const frames = document.querySelectorAll(".frame");
const card = document.getElementById("card");
const uploadUI = document.getElementById("upload-ui");

let focused = null;

/* =========================
   FRAME POSITIONING (DESKTOP)
========================= */
function positionFrames() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw <= 768) return; // Mobile: keine Kreis-Positionierung

  const cx = vw / 2;
  const cy = vh / 2;

  const rx = Math.min(vw, 1200) / 2.2; // X-Radius
  const ry = Math.min(vh, 600) / 2;    // Y-Radius

  frames.forEach((frame, i) => {
    const angle = (i / frames.length) * Math.PI * 2;
    const x = cx + Math.cos(angle) * rx;
    const y = cy + Math.sin(angle) * ry;

    frame.style.left = `${x - frame.offsetWidth / 2}px`;
    frame.style.top = `${y - frame.offsetHeight / 2}px`;

    // Z-Index nach Y-Position setzen
    frame.style.zIndex = Math.floor(y); 
});

}

window.addEventListener("resize", positionFrames);
document.addEventListener("DOMContentLoaded", positionFrames);

/* =========================
   FOCUS SYSTEM
========================= */
function setFocus(el) {
  if (focused) return;

  focused = el;
  el.classList.add("focused");

  document.querySelectorAll(".frame, #card").forEach(e => {
    if (e !== el) e.classList.add("dimmed");
  });

  if (uploadUI) uploadUI.classList.remove("dimmed");
}

function clearFocus() {
  focused = null;

  document.querySelectorAll(".focused").forEach(e =>
    e.classList.remove("focused")
  );

  document.querySelectorAll(".dimmed").forEach(e =>
    e.classList.remove("dimmed")
  );

  card.classList.remove("open");
}

/* =========================
   CLICK EVENTS
========================= */
frames.forEach(frame => {
  frame.addEventListener("click", e => {
    e.stopPropagation();
    setFocus(frame);
  });
});

card.addEventListener("click", e => {
  e.stopPropagation();
  setFocus(card);
});

card.addEventListener("dblclick", e => {
  e.stopPropagation();
  card.classList.toggle("open");
});

document.body.addEventListener("click", clearFocus);

/* =========================
   IMAGE UPLOAD & LOCAL STORAGE
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("image-upload");
  const frameSelect = document.getElementById("frame-select");
  const uploadBtn = document.getElementById("upload-btn");
  const fileLabel = document.querySelector(".file-btn");

  if (!uploadInput || !frameSelect || !uploadBtn) return;

  // Label aktualisieren, wenn Bild ausgewählt
  uploadInput.addEventListener("change", () => {
    if (uploadInput.files.length > 0) {
      fileLabel.textContent = "✔ Bild gewählt";
    }
  });

  // Upload Button
  uploadBtn.addEventListener("click", e => {
    e.stopPropagation();

    const file = uploadInput.files[0];
    if (!file) {
      alert("Bitte zuerst ein Bild auswählen ❤️");
      return;
    }

    const index = Number(frameSelect.value);
    const reader = new FileReader();

    reader.onload = ev => {
      const img = frames[index].querySelector("img");
      img.src = ev.target.result;

      // Bild speichern
      localStorage.setItem("frame-image-" + index, ev.target.result);
    };

    reader.readAsDataURL(file);
  });

  // Gespeicherte Bilder laden
  frames.forEach((frame, i) => {
    const saved = localStorage.getItem("frame-image-" + i);
    if (saved) frame.querySelector("img").src = saved;
  });
});

/* =========================
   PASSWORD LOCK
========================= */
const correctPassword = "laura";
const unlockBtn = document.getElementById("unlock");
const pwInput = document.getElementById("pw");
const lockscreen = document.getElementById("lockscreen");
const error = document.getElementById("pw-error");

unlockBtn.addEventListener("click", () => {
  const entered = pwInput.value.trim().toLowerCase();

  if (entered === correctPassword.toLowerCase()) {
    document.body.classList.remove("locked");
    lockscreen.style.display = "none";
    error.style.display = "none";

    if (typeof startIntro === "function") startIntro();
  } else {
    error.style.display = "block";
  }
});

/* =========================
   MOBILE TABS & SWIPE
========================= */
if (window.innerWidth <= 768) {
  const btnImages = document.getElementById("btnImages");
  const btnCard = document.getElementById("btnCard");
  const images = document.getElementById("mobile-images");
  const mobileCard = document.getElementById("mobile-card");

  images.style.display = "flex";
  mobileCard.style.display = "none";

  btnImages.onclick = () => {
    btnImages.classList.add("active");
    btnCard.classList.remove("active");
    images.style.display = "flex";
    mobileCard.style.display = "none";
  };

  btnCard.onclick = () => {
    btnCard.classList.add("active");
    btnImages.classList.remove("active");
    mobileCard.style.display = "flex";
    images.style.display = "none";
  };
}
