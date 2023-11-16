function mudarImagens(regiao) {

    imagens = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg', 'foto6.jpg', 'foto7.jpg'];

    // Adicione mais condições para outras regiões, se necessário.

    // Mude o atributo src das imagens
    for (var i = 0; i < imagens.length; i++) {
        var imagem = document.getElementById('imagem' + (i + 1));
        if (imagem) {
            imagem.src = 'assets/image/regioes/' + regiao + '/' + imagens[i];
        }
    }
}

// JavaScript para a roleta de imagens
let isDragging = false;
let startPosX = 0;
let currentPosX = 0;

let currentIndex = 0;
const items = document.querySelectorAll('.image-roulette-item');
const indicators = document.querySelector('.image-indicators');

function updateIndicators() {
  indicators.innerHTML = '';
  items.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    if (index === currentIndex) {
      indicator.classList.add('active');
    }
    indicator.addEventListener('click', () => goToImage(index));
    indicators.appendChild(indicator);
  });
}

function goToImage(index) {
  currentIndex = index;
  const offset = -currentIndex * 100;
  document.querySelector('.image-roulette-track').style.transform = `translateX(${offset}%)`;
  updateIndicators();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % items.length;
  goToImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  goToImage(currentIndex);
}

updateIndicators();

const rouletteTrack = document.querySelector('.image-roulette-track');

rouletteTrack.addEventListener('mousedown', (event) => {
  isDragging = true;
  startPosX = event.clientX || event.touches[0].clientX;
  currentPosX = startPosX;
});

rouletteTrack.addEventListener('touchstart', (event) => {
  isDragging = true;
  startPosX = event.touches[0].clientX;
  currentPosX = startPosX;
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    currentPosX = event.clientX || event.touches[0].clientX;
  }
});

document.addEventListener('touchmove', (event) => {
  if (isDragging) {
    currentPosX = event.touches[0].clientX;
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    const diffX = currentPosX - startPosX;
    const threshold = 50; // Defina um limite para determinar se deve mudar de imagem ou não

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }

    isDragging = false;
  }
});

document.addEventListener('touchend', () => {
  if (isDragging) {
    const diffX = currentPosX - startPosX;
    const threshold = 50; // Defina um limite para determinar se deve mudar de imagem ou não

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }

    isDragging = false;
  }
});
