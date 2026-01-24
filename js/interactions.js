console.log("interactions.js loaded");

/* =========================
   GLOBALS
========================= */
const frames = document.querySelectorAll(".frame");
const card = document.getElementById("card");
const uploadUI = document.getElementById("upload-ui");

let focused = null;
const isMobile = window.innerWidth <= 768;

/* ===== Kreis / Oval (nach DOM geladen) ===== */
/* =========================
   DESKTOP: FRAME POSITIONING
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const vw = Math.min(window.innerWidth, document.documentElement.clientWidth);
  const vh = Math.min(window.innerHeight, document.documentElement.clientHeight);

  const cx = vw / 2;
  const cy = vh / 2;
  if (isMobile) return;

  let rx = vw * 0.38;
  let ry = vh * 0.28;

  // Desktop größer
  if (vw > 768) {
    rx = 600;
    ry = 300;
  }
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const rx = 600;
  const ry = 300;

  frames.forEach((f, i) => {
    const a = (i / frames.length) * Math.PI * 2;

    const x = cx + Math.cos(a) * rx;
    const y = cy + Math.sin(a) * ry;

    f.style.left = `${x - f.offsetWidth / 2}px`;
    f.style.top  = `${y - f.offsetHeight / 2}px`;
  frames.forEach((frame, i) => {
    const angle = (i / frames.length) * Math.PI * 2;
    frame.style.left = `${cx + Math.cos(angle) * rx - frame.offsetWidth / 2}px`;
    frame.style.top  = `${cy + Math.sin(angle) * ry - frame.offsetHeight / 2}px`;
  });
});





/* ===== Fokus ===== */
function focus(el) {
  if (focused) return;
/* =========================
   DESKTOP: FOCUS SYSTEM
========================= */
function setFocus(el) {
  if (focused || isMobile) return;

  focused = el;
  el.classList.add("focused");

@@ -45,193 +40,137 @@ function focus(el) {
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
  if (isMobile) return;

  focused = null;
  document.querySelectorAll(".focused").forEach(e => e.classList.remove("focused"));
  document.querySelectorAll(".dimmed").forEach(e => e.classList.remove("dimmed"));
  card.classList.remove("open");
}

/* ===== Events ===== */
frames.forEach(f => {
  f.addEventListener("click", e => {
    e.stopPropagation();
    focus(f);
if (!isMobile) {
  frames.forEach(frame => {
    frame.addEventListener("click", e => {
      e.stopPropagation();
      setFocus(frame);
    });
  });
});

card.addEventListener("click", e => {
  e.stopPropagation();
  focus(card);
});
  card.addEventListener("click", e => {
    e.stopPropagation();
    setFocus(card);
  });

card.addEventListener("dblclick", e => {
  e.stopPropagation();
  if (!focused) return;
  card.classList.toggle("open");
});
  card.addEventListener("dblclick", e => {
    e.stopPropagation();
    card.classList.toggle("open");
  });

document.body.addEventListener("click", clearFocus);
  document.body.addEventListener("click", clearFocus);
}

/* =========================
   IMAGE UPLOAD + REPLACE
   IMAGE UPLOAD + STORAGE
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("image-upload");
  const frameSelect = document.getElementById("frame-select");
  const uploadBtn = document.getElementById("upload-btn");
  const fileLabel = document.querySelector(".file-btn");

  if (!uploadInput || !frameSelect || !uploadBtn) {
    console.error("Upload-UI nicht gefunden");
    return;
  }

  uploadInput.addEventListener("change", () => {
  const label = document.querySelector(".file-btn");
  if (uploadInput.files.length > 0) {
    label.textContent = "✔ Bild gewählt";
  }
});


  uploadBtn.addEventListener("click", () => {
  uploadBtn?.addEventListener("click", () => {
    const file = uploadInput.files[0];
    if (!file) {
      alert("Bitte zuerst ein Bild auswählen ❤️");
      return;
    }
    if (!file) return alert("Bitte zuerst ein Bild auswählen ❤️");

    const frameIndex = Number(frameSelect.value);
    const index = Number(frameSelect.value);
    const reader = new FileReader();

    reader.onload = e => {
      const img = frames[frameIndex].querySelector("img");
      img.src = e.target.result;

      localStorage.setItem(
        "frame-image-" + frameIndex,
        e.target.result
      );
    reader.onload = ev => {
      frames[index].querySelector("img").src = ev.target.result;
      localStorage.setItem("frame-image-" + index, ev.target.result);
      renderMobileImages();
    };

    reader.readAsDataURL(file);
  });

  /* gespeicherte Bilder laden */
  frames.forEach((frame, i) => {
    const saved = localStorage.getItem("frame-image-" + i);
    if (saved) {
      frame.querySelector("img").src = saved;
    }
    if (saved) frame.querySelector("img").src = saved;
  });
});
/* Passwort verschlüsslung */
const correctPassword = "laura"; // ← dein Passwort

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

  // Intro starten
  if (typeof startIntro === "function") {
    startIntro();
  }

  // 📱 Mobile nach Intro aktivieren
  if (window.innerWidth <= 768 && typeof window.showMobileAfterIntro === "function") {
    setTimeout(() => {
      window.showMobileAfterIntro();
    }, 100);
  }
}
);

if (window.innerWidth <= 768) {
  const tabImages = document.getElementById("tabImages");
  const tabCard = document.getElementById("tabCard");
  const images = document.getElementById("mobileImages");
  const card = document.getElementById("mobileCard");

  images.style.display = "block";
  card.style.display = "none";

  tabImages.onclick = () => {
    tabImages.classList.add("active");
    tabCard.classList.remove("active");
    images.style.display = "block";
    card.style.display = "none";
  };

  tabCard.onclick = () => {
    tabCard.classList.add("active");
    tabImages.classList.remove("active");
    card.style.display = "flex";
    images.style.display = "none";
  };
}
/* =========================
   MOBILE INTRO + TABS FIX
   PASSWORD LOCK
========================= */
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 768) return;
const correctPassword = "laura";

  const tabImages = document.getElementById("tabImages");
  const tabCard = document.getElementById("tabCard");
  const images = document.getElementById("mobileImages");
  const cardWrap = document.getElementById("mobileCard");
document.getElementById("unlock").onclick = () => {
  const entered = document.getElementById("pw").value.trim().toLowerCase();

  if (!tabImages || !tabCard || !images || !cardWrap) {
    console.error("Mobile Tabs nicht gefunden");
    return;
  }
  if (entered === correctPassword) {
    document.body.classList.remove("locked");
    document.getElementById("lockscreen").style.display = "none";
    document.getElementById("pw-error").style.display = "none";

  // Startzustand NACH Intro
  function showImages() {
    tabImages.classList.add("active");
    tabCard.classList.remove("active");
    images.style.display = "flex";
    cardWrap.style.display = "none";
  }
    if (typeof startIntro === "function") startIntro();

  function showCard() {
    tabCard.classList.add("active");
    tabImages.classList.remove("active");
    cardWrap.style.display = "flex";
    images.style.display = "none";
    if (isMobile) setTimeout(showImages, 200);
  } else {
    document.getElementById("pw-error").style.display = "block";
  }
};

  tabImages.addEventListener("click", showImages);
  tabCard.addEventListener("click", showCard);

  // WICHTIG: nach Unlock automatisch Bilder anzeigen
  window.showMobileAfterIntro = showImages;
});




/* =========================
   MOBILE VIEW
========================= */
const mobileImages = document.getElementById("mobileImages");
const mobileCard = document.getElementById("mobileCard");
const tabImages = document.getElementById("tabImages");
const tabCard = document.getElementById("tabCard");

function renderMobileImages() {
  if (!isMobile || !mobileImages) return;

  mobileImages.innerHTML = "";

  frames.forEach((frame, i) => {
    const img = document.createElement("img");
    img.src = frame.querySelector("img").src;
    img.alt = "Bild " + (i + 1);
    mobileImages.appendChild(img);
  });
}

function showImages() {
  if (!isMobile) return;
  tabImages.classList.add("active");
  tabCard.classList.remove("active");
  mobileImages.style.display = "block";
  mobileCard.style.display = "none";
}

function showCard() {
  if (!isMobile) return;
  tabCard.classList.add("active");
  tabImages.classList.remove("active");
  mobileCard.style.display = "flex";
  mobileImages.style.display = "none";
}

tabImages?.addEventListener("click", showImages);
tabCard?.addEventListener("click", showCard);

document.addEventListener("DOMContentLoaded", () => {
  if (isMobile) {
    renderMobileImages();
    showImages();
    mobileCard.appendChild(card.cloneNode(true));
  }
});