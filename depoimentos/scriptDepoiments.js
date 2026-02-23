const cards = document.querySelectorAll('.card');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalNome = document.getElementById('modal-nome');
const modalTexto = document.getElementById('modal-texto');
const closeBtn = document.querySelector('.close');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const nome = card.getAttribute('data-nome');
    const texto = card.getAttribute('data-texto');
    const img = card.querySelector('img').src;

    modalNome.textContent = nome;
    modalTexto.textContent = texto;
    modalImg.src = img;

    modal.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});
