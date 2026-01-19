console.log("interactions.js loaded");

/* =========================
   GLOBAL
========================= */
const isMobile = window.innerWidth <= 768;
const frames = document.querySelectorAll(".frame");
const card = document.getElementById("card");
let focused = null;

/* =========================
   DESKTOP – KREIS / OVAL
========================= */
if (!isMobile) {
  document.addEventListener("DOMContentLoaded", () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const cx = vw / 2;
    const cy = vh / 2;

    let rx = 600;
    let ry = 300;

    frames.forEach((f, i) => {
      const a = (i / frames.length) * Math.PI * 2;
      const x = cx + Math.cos(a) * rx;
      const y = cy + Math.sin(a) * ry;

      f.style.left = `${x - f.offsetWidth / 2}px`;
      f.style.top = `${y - f.offsetHeight / 2}px`;
    });
  });
}

/* =========================
   DESKTOP – FOKUS
========================= */
function focus(el) {
  if (focused || isMobile) return;

  focused = el;
  el.classList.add("focused");

  document.querySelectorAll(".frame, #card").forEach(e => {
    if (e !== el) e.classList.add("dimmed");
  });
}

function clearFocus() {
  if (isMobile) return;

  focused = null;

  document.querySelectorAll(".focused").forEach(e =>
    e.classList.remove("focused")
  );
  document.querySelectorAll(".dimmed").forEach(e =>
    e.classList.remove("dimmed")
  );

  card.classList.remove("open");
}

if (!isMobile) {
  frames.forEach(f => {
    f.addEventListener("click", e => {
      e.stopPropagation();
      focus(f);
    });
  });

  card.addEventListener("click", e => {
    e.stopPropagation();
    focus(card);
  });

  document.body.addEventListener("click", clearFocus);
}

/* =========================
   IMAGE UPLOAD
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("image-upload");
  const frameSelect = document.getElementById("frame-select");
  const uploadBtn = document.getElementById("upload-btn");

  if (!uploadInput || !frameSelect || !uploadBtn) return;

  uploadBtn.addEventListener("click", () => {
    const file = uploadInput.files[0];
    if (!file) return alert("Bitte Bild auswählen ❤️");

    const index = Number(frameSelect.value);
    const reader = new FileReader();

    reader.onload = e => {
      frames[index].querySelector("img").src = e.target.result;
      localStorage.setItem("frame-image-" + index, e.target.result);
    };

    reader.readAsDataURL(file);
  });

  frames.forEach((frame, i) => {
    const saved = localStorage.getItem("frame-image-" + i);
    if (saved) frame.querySelector("img").src = saved;
  });
});

/* =========================
   PASSWORT + INTRO
========================= */
const correctPassword = "laura";

const unlockBtn = document.getElementById("unlock");
const pwInput = document.getElementById("pw");
const lockscreen = document.getElementById("lockscreen");
const error = document.getElementById("pw-error");

unlockBtn.addEventListener("click", () => {
  if (pwInput.value.trim().toLowerCase() === correctPassword) {
    document.body.classList.remove("locked");
    lockscreen.style.display = "none";
    error.style.display = "none";

    if (typeof startIntro === "function") startIntro();
  } else {
    error.style.display = "block";
  }
});

/* =========================
   MOBILE – TABS + SCROLL
========================= */
if (isMobile) {
  document.addEventListener("DOMContentLoaded", () => {
    const mobileImages = document.getElementById("mobile-images");
    const tabImages = document.getElementById("tabImages");
    const tabCard = document.getElementById("tabCard");

    frames.forEach(frame => {
      const img = frame.querySelector("img").cloneNode(true);
      mobileImages.appendChild(img);
    });

    mobileImages.style.display = "flex";
    card.style.display = "none";

    tabImages.onclick = () => {
      tabImages.classList.add("active");
      tabCard.classList.remove("active");
      mobileImages.style.display = "flex";
      card.style.display = "none";
    };

    tabCard.onclick = () => {
      tabCard.classList.add("active");
      tabImages.classList.remove("active");
      mobileImages.style.display = "none";
      card.style.display = "block";
    };
  });
}











