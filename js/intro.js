const text = [
  "Alles Gute zum Jahrestag",
  "Laura ❤️",
  "Ich liebe dich ganz doll"
];

const target = document.getElementById("intro-text");
let i = 0, j = 0;

function type() {
  if (i < text.length) {
    if (j < text[i].length) {
      target.textContent += text[i][j++];
      setTimeout(type, 60);
    } else {
      target.textContent += "\n";
      i++; j = 0;
      setTimeout(type, 700);
    }
  } else {
    setTimeout(() => {
      document.getElementById("intro").style.opacity = "0";
      document.getElementById("intro").style.pointerEvents = "none";
      document.getElementById("scene").style.opacity = "1";
    }, 1200);
  }
}

function startIntro() {
  type();
}

