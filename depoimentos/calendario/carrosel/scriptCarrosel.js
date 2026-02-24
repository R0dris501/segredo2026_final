const slides = document.querySelector('.slides');
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

/* 🔀 FUNÇÃO PARA EMBARALHAR (Algoritmo Fisher-Yates) */
function shuffleSlides() {
  const slideArray = Array.from(document.querySelectorAll('.slide'));

  for (let i = slideArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slideArray[i], slideArray[j]] = [slideArray[j], slideArray[i]];
  }

  // Reinsere na ordem embaralhada
  slideArray.forEach(slide => slides.appendChild(slide));
}

/* 🔥 Executa o shuffle antes de tudo */
shuffleSlides();

const slideElements = document.querySelectorAll('.slide');
const totalSlides = slideElements.length;

function updateCarousel() {
  const slideWidth = carousel.clientWidth;

  slides.style.transform = `translateX(-${index * slideWidth}px)`;

  const currentImg = slideElements[index].querySelector('img');

  if (currentImg.complete) {
    carousel.style.height = currentImg.offsetHeight + "px";
  } else {
    currentImg.onload = () => {
      carousel.style.height = currentImg.offsetHeight + "px";
    };
  }
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % totalSlides;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

window.addEventListener('load', updateCarousel);
window.addEventListener('resize', updateCarousel);