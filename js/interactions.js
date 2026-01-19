console.log("interactions.js loaded");

/* =========================
   GLOBALS
========================= */
const frames = document.querySelectorAll(".frame");
const card = document.getElementById("card");
const uploadUI = document.getElementById("upload-ui");

let focused = null;

/* =========================
   FRAME POSITIONING (DESKTOP)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw <= 768) return; // Mobile: keine Kreis-Positionierung

  const cx = vw / 2;
  const cy = vh / 2;

  const rx = 600;
  const ry = 300;

  frames.forEach((frame, i) => {
    const angle = (i / frames.length) * Math.PI * 2;
    const x = cx + Math.cos(angle) * rx;
    const y = cy + Math.sin(angle) * ry;

    frame.style.left = `${x - frame.offsetWidth / 2}px`;
    frame.style.top = `${y - frame.offsetHeight / 2}px`;
  });
});

/* =========================
   FOCUS SYSTEM (FIXED)
========================= */
function setFocus(el) {
  if (focused) return;

  focused = el;
  el.classList.add("focused");

  document.querySelectorAll(".frame, #card").forEach(e => {
    if (e !== el) e.classList.add("dimmed");
  });

  // Upload UI niemals dimmen
  if (uploadUI) {
    uploadUI.classList.remove("dimmed");
  }
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
   IMAGE UPLOAD + STORAGE
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("image-upload");
  const frameSelect = document.getElementById("frame-select");
  const uploadBtn = document.getElementById("upload-btn");
  const fileLabel = document.querySelector(".file-btn");

  if (!uploadInput || !frameSelect || !uploadBtn) {
    console.error("Upload UI nicht gefunden");
    return;
  }

  // Label ändern bei Dateiauswahl
  uploadInput.addEventListener("change", () => {
    if (uploadInput.files.length > 0) {
      fileLabel.textContent = "✔ Bild gewählt";
    }
  });

  // Upload
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

      // speichern
      localStorage.setItem(
        "frame-image-" + index,
        ev.target.result
      );
    };

    reader.readAsDataURL(file);
  });

  // gespeicherte Bilder laden
  frames.forEach((frame, i) => {
    const saved = localStorage.getItem("frame-image-" + i);
    if (saved) {
      frame.querySelector("img").src = saved;
    }
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

    if (typeof startIntro === "function") {
      startIntro();
    }
  } else {
    error.style.display = "block";
  }
});

/* =========================
   MOBILE TABS
========================= */
if (window.innerWidth <= 768) {
  const tabImages = document.getElementById("tabImages");
  const tabCard = document.getElementById("tabCard");
  const images = document.getElementById("mobileImages");
  const mobileCard = document.getElementById("mobileCard");

  images.style.display = "block";
  mobileCard.style.display = "none";

  tabImages.onclick = () => {
    tabImages.classList.add("active");
    tabCard.classList.remove("active");
    images.style.display = "block";
    mobileCard.style.display = "none";
  };

  tabCard.onclick = () => {
    tabCard.classList.add("active");
    tabImages.classList.remove("active");
    mobileCard.style.display = "flex";
    images.style.display = "none";
  };
}
/* =========================
   MOBILE FRAME CLONE
========================= */
if (window.innerWidth <= 768) {
  const mobileImages = document.getElementById("mobileImages");
  const mobileCard = document.getElementById("mobileCard");

  frames.forEach(frame => {
    const clone = frame.cloneNode(true);
    clone.classList.remove("focused", "dimmed");

    clone.onclick = () => {
      clone.classList.toggle("focused");
    };

    mobileImages.appendChild(clone);
  });

  mobileCard.appendChild(card.cloneNode(true));
}
