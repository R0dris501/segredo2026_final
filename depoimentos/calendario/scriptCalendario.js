let currentYear = 2025;
let currentMonth = 5; // Junho = índice 5 (0 = Janeiro)

// Limites do calendário
const startYear = 2025;
const startMonth = 0; // Junho/2025
const endYear = 2026;
const endMonth = 2; // Dezembro/2026

const monthYearElement = document.getElementById("month-year");
const daysElement = document.getElementById("days");
const modal = document.getElementById("modal");
const modalDate = document.getElementById("modal-date");
const modalText = document.getElementById("modal-text");
const modalImg = document.getElementById("modal-img");
const closeModal = document.getElementById("close-modal");

let eventos = {};

// Carregar eventos do JSON
fetch("Calendario.json")
  .then(res => res.json())
  .then(data => {
    eventos = data;
    renderCalendar(); // Renderiza calendário após carregar eventos
  })
  .catch(err => {
    console.error("Erro ao carregar eventos.json:", err);
  });

function renderCalendar() {
  const date = new Date(currentYear, currentMonth, 1);
  const monthName = date.toLocaleString("pt-BR", { month: "long" });
  monthYearElement.textContent = `${monthName.toUpperCase()} ${currentYear}`;

  daysElement.innerHTML = "";

  const firstDay = date.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Espaços em branco antes do 1º dia
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    daysElement.appendChild(empty);
  }

  // Dias do mês
  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = d;

    const dateKey = `${currentYear}/${String(currentMonth + 1).padStart(2, "0")}/${String(d).padStart(2, "0")}`;
    if (eventos[dateKey]) {
      dayDiv.classList.add("has-event"); // Adiciona destaque para dias com evento
    }

    dayDiv.addEventListener("click", () => openModal(dateKey, d));
    daysElement.appendChild(dayDiv);
  }

  // Bloquear navegação nos limites
  document.getElementById("prev-month").disabled = currentYear === startYear && currentMonth === startMonth;
  document.getElementById("next-month").disabled = currentYear === endYear && currentMonth === endMonth;
}

function openModal(dateKey, day) {
  modalDate.textContent = `DIA ${day}/${currentMonth + 1}/${currentYear}`;

  const evento = eventos[dateKey];
  if (evento && evento.texto) {
    // 👉 Ajuste para exibir quebras de linha corretamente
    modalText.textContent = evento.texto;
    modalText.style.whiteSpace = "pre-line";

    if (evento.imagem) {
      modalImg.src = evento.imagem;
      modalImg.style.display = "block";
    } else {
      modalImg.style.display = "none";
    }
  } else {
    modalText.textContent = "SEM ANOTAÇÕES PARA ESTE DIA.";
    modalText.style.whiteSpace = "pre-line";
    modalImg.style.display = "none";
  }

  modal.style.display = "flex";
}

// Fechar modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// Navegação entre meses
document.getElementById("prev-month").addEventListener("click", () => {
  if (currentYear > startYear || currentMonth > startMonth) {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  }
});

document.getElementById("next-month").addEventListener("click", () => {
  if (currentYear < endYear || currentMonth < endMonth) {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  }
});
