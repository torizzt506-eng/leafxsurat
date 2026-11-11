
const intro = document.getElementById("intro");
const letter = document.getElementById("letter");
const ending = document.getElementById("ending");

const envelope = document.getElementById("envelope");
const openButton = document.getElementById("openLetter");
const nextButton = document.getElementById("toEnding");
const replayButton = document.getElementById("replay");

const letterText = document.getElementById("letterText");
const signature = document.getElementById("signature");
const particles = document.getElementById("particles");

let typing = false;
let animationId = 0;

// SURAT UNTUK LEA

const paragraphs = [
  "Aku nggak tahu harus mulai dari mana, tapi sepertinya kalimat paling sederhana adalah yang paling jujur.",

  "Aku suka kamu.",

  "Bukan cuma karena senyummu, bukan juga karena hal-hal kecil yang mungkin bahkan nggak kamu sadari.",

  "Ada sesuatu dari dirimu yang bikin hari biasa terasa sedikit lebih menyenangkan.",

  "Kadang ngobrol sama kamu bisa bikin aku lupa kalau tadinya lagi bad mood. Dan itu agak menyebalkan, karena sekarang mood-ku seolah punya satu admin tambahan. ",

  "Aku nggak mau membuat semuanya terdengar berlebihan. Aku cuma ingin kamu tahu bahwa kehadiranmu berarti buatku.",

  "Aku nggak tahu bagaimana perasaanmu sekarang, dan aku nggak akan memaksakan apa pun.",

  "Tapi kalau boleh jujur, aku ingin punya kesempatan untuk mengenalmu lebih jauh, bukan cuma sebagai seseorang yang aku kagumi diam-diam."
];

// CREATE PARTICLES

function createParticles() {
  const symbols = ["♡", "✦", "·", "✧"];

  for (let i = 0; i < 24; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration =
      (7 + Math.random() * 10) + "s";

    particle.style.animationDelay =
      (Math.random() * 12) + "s";

    particle.style.fontSize =
      (9 + Math.random() * 13) + "px";

    particles.appendChild(particle);
  }
}

createParticles();

// SCREEN TRANSITION

function showScreen(screen) {
  [intro, letter, ending].forEach(item => {
    item.classList.remove("active");
  });

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// TYPEWRITER EFFECT

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeParagraph(text, id) {
  if (id !== animationId) return;

  const paragraph = document.createElement("p");
  paragraph.className = "letter-paragraph";

  letterText.appendChild(paragraph);

  for (let i = 0; i < text.length; i++) {
    if (id !== animationId) return;

    paragraph.textContent += text[i];

    // Sedikit jeda pada tanda baca
    let speed = 17;

    if (".!?,".includes(text[i])) {
      speed = 160;
    }

    await wait(speed);
  }

  await wait(350);
}

// OPEN LETTER

openButton.addEventListener("click", async () => {
  if (typing) return;

  typing = true;
  openButton.disabled = true;

  envelope.classList.add("open");

  await wait(950);

  showScreen(letter);

  const currentId = ++animationId;

  letterText.innerHTML = "";
  signature.classList.remove("show");
  nextButton.disabled = true;

  for (const paragraph of paragraphs) {
    await typeParagraph(paragraph, currentId);
  }

  if (currentId !== animationId) return;

  signature.classList.add("show");

  await wait(500);

  nextButton.disabled = false;
  typing = false;
});

// GO TO ENDING

nextButton.addEventListener("click", () => {
  if (typing || nextButton.disabled) return;

  showScreen(ending);
});

// REPLAY

replayButton.addEventListener("click", () => {
  animationId++;

  typing = false;

  envelope.classList.remove("open");

  openButton.disabled = false;
  nextButton.disabled = false;

  letterText.innerHTML = "";
  signature.classList.remove("show");

  showScreen(intro);
});
