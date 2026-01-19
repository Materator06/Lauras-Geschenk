console.log("interactions.js loaded");
const frames = document.querySelectorAll(".frame");
const card = document.getElementById("card");
let focused = null;

/* ===== Kreis / Oval (nach DOM geladen) ===== */
document.addEventListener("DOMContentLoaded", () => {
  const vw = Math.min(window.innerWidth, document.documentElement.clientWidth);
  const vh = Math.min(window.innerHeight, document.documentElement.clientHeight);

  const cx = vw / 2;
  const cy = vh / 2;

  let rx = vw * 0.38;
  let ry = vh * 0.28;

  // Desktop größer
  if (vw > 768) {
    rx = 600;
    ry = 300;
  }

  frames.forEach((f, i) => {
    const a = (i / frames.length) * Math.PI * 2;

    const x = cx + Math.cos(a) * rx;
    const y = cy + Math.sin(a) * ry;

    f.style.left = `${x - f.offsetWidth / 2}px`;
    f.style.top  = `${y - f.offsetHeight / 2}px`;
  });
});





/* ===== Fokus ===== */
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

  document.querySelectorAll(".focused").forEach(e =>
    e.classList.remove("focused")
  );
  document.querySelectorAll(".dimmed").forEach(e =>
    e.classList.remove("dimmed")
  );

  card.classList.remove("open");
}

/* ===== Events ===== */
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

card.addEventListener("dblclick", e => {
  e.stopPropagation();
  if (!focused) return;
  card.classList.toggle("open");
});

document.body.addEventListener("click", clearFocus);

/* =========================
   IMAGE UPLOAD + REPLACE
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("image-upload");
  const frameSelect = document.getElementById("frame-select");
  const uploadBtn = document.getElementById("upload-btn");

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
    const file = uploadInput.files[0];
    if (!file) {
      alert("Bitte zuerst ein Bild auswählen ❤️");
      return;
    }

    const frameIndex = Number(frameSelect.value);
    const reader = new FileReader();

    reader.onload = e => {
      const img = frames[frameIndex].querySelector("img");
      img.src = e.target.result;

      localStorage.setItem(
        "frame-image-" + frameIndex,
        e.target.result
      );
    };

    reader.readAsDataURL(file);
  });

  /* gespeicherte Bilder laden */
  frames.forEach((frame, i) => {
    const saved = localStorage.getItem("frame-image-" + i);
    if (saved) {
      frame.querySelector("img").src = saved;
    }
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

    // Intro JETZT starten
    if (typeof startIntro === "function") {
      startIntro();
    }
  } else {
    error.style.display = "block";
  }
});

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







