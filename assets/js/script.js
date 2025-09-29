const slidesPerView = 3;
const carouselSlide = document.querySelector(".carousel-slide");
const totalSlides = document.querySelectorAll(".carousel-slide a").length; 
let currentSlide = 0;

function updateCarousel() {
  const slideWidth = carouselSlide.offsetWidth / slidesPerView;
  carouselSlide.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function prevSlide() {
  currentSlide -= slidesPerView;
  if (currentSlide < 0) {
    currentSlide = totalSlides - slidesPerView;
  }
  updateCarousel();
}

function nextSlide() {
  currentSlide += slidesPerView;
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }
  updateCarousel();
}

window.addEventListener("load", updateCarousel);
window.addEventListener("resize", updateCarousel);


const mapImg = document.getElementById("location-map");
let intervalId;
let currentFrame = 1;
const totalFrames = 20;

function startAnimation() {
    intervalId = setInterval(() => {
      mapImg.src = `../../src/images/location${currentFrame}.png`;
      currentFrame++;
      if (currentFrame > totalFrames) currentFrame = 1;
    }, 100);
}

function stopAnimation() {
    clearInterval(intervalId);
    mapImg.src = "../../src/images/indonesia-map.png";
    currentFrame = 1;
}

mapImg.addEventListener("mouseenter", startAnimation);
mapImg.addEventListener("mouseleave", stopAnimation);

