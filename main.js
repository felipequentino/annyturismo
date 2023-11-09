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

