console.log("interactions.js loaded");

/* =========================
   GLOBALS
========================= */
const frames = document.querySelectorAll(".frame");
const card = document.getElementById("card");
const uploadUI = document.getElementById("upload-ui");

let focused = null;
const isMobile = window.innerWidth <= 768;

/* =========================
   DESKTOP: FRAME POSITIONING
========================= */
document.addEventListener("DOMContentLoaded", () => {
  if (isMobile) return;

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const rx = 600;
  const ry = 300;

  frames.forEach((frame, i) => {
    const angle = (i / frames.length) * Math.PI * 2;
    frame.style.left = `${cx + Math.cos(angle) * rx - frame.offsetWidth / 2}px`;
    frame.style.top  = `${cy + Math.sin(angle) * ry - frame.offsetHeight / 2}px`;
  });
});

/* =========================
   DESKTOP: FOCUS SYSTEM
========================= */
function setFocus(el) {
  if (focused || isMobile) return;

  focused = el;
  el.classList.add("focused");

  document.querySelectorAll(".frame, #card").forEach(e => {
    if (e !== el) e.classList.add("dimmed");
  });

  if (uploadUI) uploadUI.classList.remove("dimmed");
}

function clearFocus() {
  if (isMobile) return;

  focused = null;
  document.querySelectorAll(".focused").forEach(e => e.classList.remove("focused"));
  document.querySelectorAll(".dimmed").forEach(e => e.classList.remove("dimmed"));
  card.classList.remove("open");
}

if (!isMobile) {
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
}

/* =========================
   IMAGE UPLOAD + STORAGE
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("image-upload");
  const frameSelect = document.getElementById("frame-select");
  const uploadBtn = document.getElementById("upload-btn");
  const fileLabel = document.querySelector(".file-btn");

  uploadBtn?.addEventListener("click", () => {
    const file = uploadInput.files[0];
    if (!file) return alert("Bitte zuerst ein Bild auswählen ❤️");

    const index = Number(frameSelect.value);
    const reader = new FileReader();

    

    reader.readAsDataURL(file);
  });

  frames.forEach((frame, i) => {
    const saved = localStorage.getItem("frame-image-" + i);
    if (saved) frame.querySelector("img").src = saved;
  });
});

/* =========================
   PASSWORD LOCK
========================= */
const correctPassword = "laura";

document.getElementById("unlock").onclick = () => {
  const entered = document.getElementById("pw").value.trim().toLowerCase();

  if (entered === correctPassword) {
    document.body.classList.remove("locked");
    document.body.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
    document.getElementById("lockscreen").style.display = "none";
    document.getElementById("pw-error").style.display = "none";

    if (typeof startIntro === "function") startIntro();

   
};



/* =========================
   MOBILE: SWIPE CONTENT SETUP
========================= */
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 768) return;

  const mobileImages = document.getElementById("mobileImages");
  const mobileCard = document.getElementById("mobileCard");

  if (!mobileImages || !mobileCard) return;

  // Frames in Mobile-Bilder verschieben
  frames.forEach(frame => {
    frame.classList.remove("focused", "dimmed");
    mobileImages.appendChild(frame);
  });

  // Karte verschieben
  mobileCard.appendChild(card);
});

/* =========================
   MOBILE: SWIPE SETUP
========================= */
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 768) return;

  const mobileImages = document.getElementById("mobileImages");
  const mobileCard = document.getElementById("mobileCard");

  if (!mobileImages || !mobileCard) return;

  // Frames verschieben (ECHT, kein Clone!)
  frames.forEach(frame => {
    frame.classList.remove("focused", "dimmed");
    mobileImages.appendChild(frame);
  });

  // Karte verschieben
  mobileCard.appendChild(card);
});
