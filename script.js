const startDateKey = "start-date";

/* Fecha base */
let startDate = localStorage.getItem(startDateKey);
if (!startDate) {
  startDate = new Date().toISOString();
  localStorage.setItem(startDateKey, startDate);
}
const baseDate = new Date(startDate);

function daysFromStart(days) {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + days);
  return d;
}

/* BONOS */
const bonos = [
  { title: "Cena de Cumpleaños.", desc: "Una excelente oportunidad para celebrar tu vida.", img: "bono1.jpg", day: 0, reusable: false },
  { title: "Accesorio que escojas.", desc: "Un accesorio que te haga lucir más hermosa de lo que eres.", img: "bono2.jpg", day: 0, reusable: false },
  { title: "¿Un Pecadito?", desc: "Que tal un postrecito o algo dulce, tu solo pídelo.", img: "bono3.jpg", day: 5, reusable: false },
  { title: "Revivir primera Cita.", desc: "Si si si, otra vez sushi, pero es nuestro primer momento juntos.", img: "bono1.jpg", day: 8, reusable: false },
  { title: "Tiquetes a San Andrés.", desc: "Un viaje único para 2, un lugar mágico por conocer ¿Preparada?", img: "bono5.jpg", day: 12, reusable: false },
  { title: "Picnic en la Playa.", desc: "Seremos 3, la Playa tu y yo, te amo Pulga.", img: "bono6.jpg", day: 13, reusable: false },
  { title: "Traguito bajo la luna, en la playa.", desc: "Preparado con amor y algo de desorden.", img: "bono7.jpg", day: 13, reusable: false },
  { title: "Cena Romántica.", desc: "Tu solo ponte hermosa como siempre y dejate sorprender.", img: "bono8.jpg", day: 13, reusable: false },
  { title: "Recuerdo de nuestro viaje.", desc: "Algo que siempre nos recordará esta aventura.", img: "bono9.png", day: 24, reusable: false },
  { title: "Bono de Temu.", desc: "Tienes un bono para Temu, lo puedes canjear cuando quieras.", img: "Bono10.png", day: 1, reusable: false },

 { title: "Masaje Relajante hecho por mi <3.", desc: "Para un día especial o para todos los días, este bono es redimible las veces que creas conveniente, no vence, eso si no abusar del masajista jajajaja.", img: "bono11.jpg", day: 1, reusable: true },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono12.jpg", day: 33, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono13.jpg", day: 36, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono14.jpg", day: 39, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono15.jpg", day: 42, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono16.jpg", day: 45, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono17.jpg", day: 48, reusable: false },
 { title: "Compraaaas.", desc: "Tendrás un tiempo o monto determinado a gastar, disfrutalo pulga.", img: "images/bono18.jpg", day: 51, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono19.jpg", day: 54, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono20.jpg", day: 57, reusable: false },

 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono21.jpg", day: 60, reusable: true },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono22.jpg", day: 63, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono23.jpg", day: 66, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono24.jpg", day: 69, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono25.jpg", day: 72, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono26.jpg", day: 75, reusable: false },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono27.jpg", day: 78, reusable: true },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", img: "images/bono28.jpg", day: 81, reusable: true },
 { title: "Pronto sabrás más.", desc: "Pronto sabrás más.", day: 84, reusable: true },
 { title: "Este es Exclusivo para cuando termines de abrirlos...", desc: "Este bono no vence nunca, mi Pulga 🖤", img: "images/bono30.jpg", day: 87, reusable: true }
];

const grid = document.getElementById("bonos");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const unlockInfo = document.getElementById("unlockInfo");
const redeemBtn = document.getElementById("redeemBtn");
const closeModal = document.getElementById("closeModal");

let activeIndex = null;

/* Render cards */
bonos.forEach((bono, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h3>Bono #${i + 1}</h3><p>${bono.title}</p>`;
  card.onclick = () => openModal(i);
  grid.appendChild(card);
});

/* Modal logic */
function openModal(i) {
  activeIndex = i;
  const bono = bonos[i];

  modalImg.src = bono.img;
  modalTitle.textContent = bono.title;
  modalDesc.textContent = bono.desc;

  const used = localStorage.getItem(`bono-${i}`) === "true";
  const now = new Date();
  const activeDate = daysFromStart(bono.day);
  const locked = now < activeDate;

  if (locked) {
    redeemBtn.disabled = true;
    redeemBtn.textContent = "Disponible pronto 💛";
    unlockInfo.textContent = `Disponible a partir del ${activeDate.toLocaleDateString()}`;
  } else if (used && !bono.reusable) {
    redeemBtn.disabled = true;
    redeemBtn.textContent = "Bono canjeado 💛";
    unlockInfo.textContent = "";
  } else {
    redeemBtn.disabled = false;
    redeemBtn.textContent = bono.reusable ? "Usar este bono 💛" : "Canjear este bono 💛";
    unlockInfo.textContent = "";
  }

  modal.classList.remove("hidden");
}

/* Canjear */
redeemBtn.onclick = () => {
  const bono = bonos[activeIndex];
  spawnHeart();

  if (!bono.reusable) {
    localStorage.setItem(`bono-${activeIndex}`, "true");
  }

  setTimeout(() => modal.classList.add("hidden"), 600);
};

closeModal.onclick = () => modal.classList.add("hidden");

/* Corazón */
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.left = `${Math.random() * window.innerWidth}px`;
  heart.style.top = `${window.innerHeight - 50}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}

/* 🔄 RESET DE SEGURIDAD */
window.resetBonos = () => {
  const confirmReset = confirm(
    "¿Quieres reiniciar el sistema de bonos?\n(Solo para corregir errores técnicos 💛)"
  );
  if (!confirmReset) return;

  for (let i = 0; i < bonos.length; i++) {
    localStorage.removeItem(`bono-${i}`);
  }

  localStorage.setItem(startDateKey, new Date().toISOString());
  alert("Los bonos se reiniciaron correctamente 💖");
  location.reload();
};







