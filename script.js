/* ── Build background scene ─────────────────────────────── */
const scene = document.getElementById("scene");

/* ── Secret message on 7 clicks ─────────────────────────── */
const mainMsg = document.getElementById("mainMessage");
const secretMsg = document.getElementById("secretMessage");
let msgClickCount = 0;

mainMsg.addEventListener("click", () => {
  msgClickCount++;
  if (msgClickCount >= 7) {
    mainMsg.style.display = "none";
    secretMsg.style.display = "block";
  }
});

const BALLOONS = [
  { left: "4%", color: "#f4a7b9", dur: "10s", delay: "0s" },
  { left: "14%", color: "#c8a8e9", dur: "13s", delay: "2.8s" },
  { left: "26%", color: "#a8d8c8", dur: "9.5s", delay: "5.5s" },
  { left: "40%", color: "#ffb997", dur: "11s", delay: "1.2s" },
  { left: "56%", color: "#a8c8f8", dur: "10.5s", delay: "4s" },
  { left: "68%", color: "#f8e4a0", dur: "12.5s", delay: "0.6s" },
  { left: "80%", color: "#f0a8d8", dur: "9s", delay: "3.5s" },
  { left: "91%", color: "#c8a8e9", dur: "11.5s", delay: "7s" },
];

const RIBBONS = [
  {
    left: "7%",
    color: "#f4a7b9",
    w: "3px",
    h: "44px",
    rot: "35deg",
    dur: "14s",
    delay: "1s",
  },
  {
    left: "21%",
    color: "#c8a8e9",
    w: "3px",
    h: "32px",
    rot: "-22deg",
    dur: "11.5s",
    delay: "4s",
  },
  {
    left: "50%",
    color: "#a8d8c8",
    w: "4px",
    h: "28px",
    rot: "15deg",
    dur: "12s",
    delay: "6.5s",
  },
  {
    left: "63%",
    color: "#ffb997",
    w: "3px",
    h: "48px",
    rot: "-35deg",
    dur: "13.5s",
    delay: "2.5s",
  },
  {
    left: "78%",
    color: "#a8c8f8",
    w: "3px",
    h: "36px",
    rot: "28deg",
    dur: "10.5s",
    delay: "0.5s",
  },
  {
    left: "88%",
    color: "#f8e4a0",
    w: "2px",
    h: "52px",
    rot: "-18deg",
    dur: "15s",
    delay: "3s",
  },
];

BALLOONS.forEach((b) => {
  const el = document.createElement("div");
  el.className = "balloon";
  el.style.cssText =
    `left:${b.left};background:${b.color};` +
    `--color:${b.color};--dur:${b.dur};--delay:${b.delay};`;
  scene.appendChild(el);
});

RIBBONS.forEach((r) => {
  const el = document.createElement("div");
  el.className = "ribbon";
  el.style.cssText =
    `left:${r.left};width:${r.w};height:${r.h};background:${r.color};` +
    `--rot:${r.rot};--dur:${r.dur};--delay:${r.delay};`;
  scene.appendChild(el);
});

/* ── Make a Wish interaction ─────────────────────────────── */
const wishBtn = document.getElementById("wishBtn");
const wishIcon = document.getElementById("wishIcon");
const wishLabel = document.getElementById("wishLabel");
const wishResp = document.getElementById("wishResponse");
const nameEl = document.querySelector(".greeting .name");

const NAMES = [
  "Santhi Supriya Gurrala",
  "Rasi",
  "Shanuuu",
  "Walking Golden Bar",
  "Dinosaur",
  "Vayyari",
];
let nameIdx = 0;

const WISH_PHRASES = [
  "Your wish has floated up to the stars\u2026 \uD83C\uDF1F",
  "The universe is listening\u2026 \u2728",
  "Magic is already on its way to you! \uD83E\uDE84",
  "A shooting star just blinked for you! \uD83C\uDF20",
  "Your heart\u2019s desire is now in motion\u2026 \uD83D\uDCAB",
  "Wishing dust scattered across the sky\u2026 \u2728",
  "Dreams have a beautiful way of coming true\u2026 \uD83D\uDC96",
  "The wind carries your wish far and wide\uD83C\uDF38",
  "The cosmos just conspired in your favor! \uD83C\uDF0C",
  "Your wish rides on moonlight tonight\u2026 \uD83C\uDF19",
];

function spawnBurst(btn) {
  const rect = btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const COLORS = [
    "#f4a7b9",
    "#c8a8e9",
    "#a8d8c8",
    "#ffb997",
    "#a8c8f8",
    "#f8e4a0",
    "#f0a8d8",
    "#b8f0d8",
  ];
  const COUNT = 24;

  for (let i = 0; i < COUNT; i++) {
    // Spread evenly with a touch of randomness so no two bursts look the same
    const angle = (i / COUNT) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
    const dist = 72 + Math.random() * 88;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const color = COLORS[i % COLORS.length];
    const ribbon = Math.random() > 0.35;
    const w = ribbon
      ? 2 + Math.floor(Math.random() * 3)
      : 5 + Math.floor(Math.random() * 4);
    const h = ribbon ? 14 + Math.floor(Math.random() * 18) : w;
    const spin0 = Math.random() * 180 - 90;
    const spin1 =
      spin0 + (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 360);

    const el = document.createElement("div");
    el.style.cssText = [
      "position:fixed",
      `left:${cx}px`,
      `top:${cy}px`,
      `width:${w}px`,
      `height:${h}px`,
      `background:${color}`,
      `border-radius:${ribbon ? "3px" : "2px"}`,
      "pointer-events:none",
      "z-index:9999",
      `--dx:${dx}px`,
      `--dy:${dy}px`,
      `--spin0:${spin0}deg`,
      `--spin1:${spin1}deg`,
      "animation:burstOut 0.85s cubic-bezier(0.2,0.8,0.4,1) forwards",
    ].join(";");
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }
}

wishBtn.addEventListener("click", () => {
  // Switch to "wished" look on first click; keep it on subsequent ones
  wishBtn.classList.add("wished");
  wishIcon.textContent = "\uD83C\uDF1F";
  wishLabel.textContent = "Wish Made!";

  // Random phrase — never repeat the previous one
  const prev = wishResp.dataset.prev | 0;
  let idx = Math.floor(Math.random() * WISH_PHRASES.length);
  if (idx === prev) idx = (idx + 1) % WISH_PHRASES.length;
  wishResp.dataset.prev = idx;
  wishResp.textContent = WISH_PHRASES[idx];

  // Show / refresh the response strip
  wishResp.classList.remove("visible");
  // Force reflow so the transition re-triggers on repeat clicks
  void wishResp.offsetWidth;
  wishResp.classList.add("visible");

  // Burst ribbons from the button
  spawnBurst(wishBtn);

  // Toggle name with a quick fade
  nameEl.style.opacity = "0";
  setTimeout(() => {
    nameIdx = (nameIdx + 1) % NAMES.length;
    nameEl.textContent = NAMES[nameIdx];
    nameEl.style.opacity = "1";
  }, 250);
});
