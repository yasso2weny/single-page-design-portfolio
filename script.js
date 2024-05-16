const carouselContainer = document.querySelector('.carousel-imgs-container');
const carouselImages = document.querySelectorAll('.carouselImages');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

let currentIndex = 1;
const totalImages = carouselImages.length;

// Clone the first and last images for infinite scroll effect
const firstClone = carouselImages[0].cloneNode(true);
const lastClone = carouselImages[totalImages - 1].cloneNode(true);

carouselContainer.appendChild(firstClone);
carouselContainer.insertBefore(lastClone, carouselImages[0]);

// Set the initial position to the first image (offset by one due to the clone)
carouselContainer.style.transform = `translateX(${-100 / (totalImages + 2)}%)`;

function updateCarousel() {
    carouselContainer.style.transform = `translateX(${-100 * currentIndex / (totalImages + 2)}%)`;
    carouselContainer.style.transition = 'transform 0.5s ease-in-out';

    // Handle the transition end to create the infinite effect
    carouselContainer.addEventListener('transitionend', () => {
        if (carouselImages[currentIndex - 1].classList.contains('lastClone')) {
            carouselContainer.style.transition = 'none';
            currentIndex = totalImages;
            carouselContainer.style.transform = `translateX(${-100 * currentIndex / (totalImages + 2)}%)`;
        } else if (carouselImages[currentIndex - 1].classList.contains('firstClone')) {
            carouselContainer.style.transition = 'none';
            currentIndex = 1;
            carouselContainer.style.transform = `translateX(${-100 * currentIndex / (totalImages + 2)}%)`;
        }
    });
}

rightBtn.addEventListener('click', () => {
    if (currentIndex < totalImages + 1) {
        currentIndex++;
        updateCarousel();
    }
});

leftBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

updateCarousel();
