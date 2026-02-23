const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const totalSlides = slideElements.length;

function updateCarousel() {
  const slideWidth = carousel.clientWidth;

  // Move exatamente 1 frame por vez (em pixels)
  slides.style.transform = `translateX(-${index * slideWidth}px)`;

  // Ajusta altura dinamicamente
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