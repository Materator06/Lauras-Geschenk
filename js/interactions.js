console.log("interactions.js loaded");

const isMobile = window.innerWidth <= 768;
const frames = document.querySelectorAll(".frame");
const card = document.getElementById("card");

/* =========================
   DESKTOP KREIS / OVAL
========================= */
if (!isMobile) {
  window.addEventListener("load", () => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const rx = 600;
    const ry = 300;

    frames.forEach((f, i) => {
      const a = (i / frames.length) * Math.PI * 2;
      const x = cx + Math.cos(a) * rx;
      const y = cy + Math.sin(a) * ry;
      f.style.left = x - f.offsetWidth / 2 + "px";
      f.style.top  = y - f.offsetHeight / 2 + "px";
    });
  });
}

/* =========================
   DESKTOP FOCUS
========================= */
let focused = null;

function focus(el) {
  if (focused) return;
  focused = el;
  el.classList.add("focused");
  document.querySelectorAll(".frame, #card").forEach(e => {
    if (e !== el) e.classList.add("dimmed");
  });
}

function clearFocus() {
  focused = null;
  document.querySelectorAll(".focused").forEach(e => e.classList.remove("focused"));
  document.querySelectorAll(".dimmed").forEach(e => e.classList.remove("dimmed"));
}

if (!isMobile) {
  frames.forEach(f => f.onclick = e => {
    e.stopPropagation();
    focus(f);
  });
  card.onclick = e => {
    e.stopPropagation();
    focus(card);
  };
  document.body.onclick = clearFocus;
}

/* =========================
   MOBILE LOGIC
========================= */
if (isMobile) {
  const mobileImages = document.getElementById("mobile-images");
  const tabImages = document.getElementById("tab-images");
  const tabCard = document.getElementById("tab-card");
  const mobileCard = document.getElementById("mobile-card");

  frames.forEach(frame => {
    mobileImages.appendChild(frame.querySelector("img"));
  });

  tabImages.onclick = () => {
    tabImages.classList.add("active");
    tabCard.classList.remove("active");
    mobileImages.style.display = "flex";
    mobileCard.style.display = "none";
  };

  tabCard.onclick = () => {
    tabCard.classList.add("active");
    tabImages.classList.remove("active");
    mobileImages.style.display = "none";
    mobileCard.style.display = "flex";
  };
}

/* =========================
   PASSWORT
========================= */
const correctPassword = "laura";

document.getElementById("unlock").onclick = () => {
  const pw = document.getElementById("pw").value.trim().toLowerCase();
  const error = document.getElementById("pw-error");

  if (pw === correctPassword) {
    document.body.classList.remove("locked");
    document.getElementById("lockscreen").style.display = "none";
    if (typeof startIntro === "function") startIntro();
  } else {
    error.style.display = "block";
  }
};










