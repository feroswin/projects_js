const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide").length;
const circles = document.querySelectorAll(".slider-menu-item");

let slideNumber = 0

function firstSlide() {
  slideNumber = 0
  slider.style.transform = `translateX(${slideNumber}px)`
}

function lastSlide() {
  slider.style.transform = `translateX(-${(slides-1) * 800}px)`
  slideNumber = slides-1
}

function nextSlide() {
  slider.style.transform = `translateX(-${slideNumber * 800}px)`
}

function prevSlide() {
  slider.style.transform = `translateX(-${(slideNumber * 800)}px)`
}


arrowRight.addEventListener("click", () => {
  slideNumber++;
  (slideNumber >= slides) ? firstSlide() : nextSlide();
  console.log('right ',slideNumber)
})

arrowLeft.addEventListener("click", () => {
  slideNumber--;
  (slideNumber < 0) ? lastSlide() : prevSlide();
  console.log('left ',slideNumber)
})



