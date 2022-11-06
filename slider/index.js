const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide").length;
const slidesItem = document.querySelectorAll(".slider-menu-item");

let slideNumber = 0
slidesItem[0].style.background = "#000000"

slidesItem.forEach((el, i) => {
  el.addEventListener("click", () => {
    resetBg()
    slider.style.transform = `translateX(-${i * 800}px)`
    el.style.background = "#000000"
    slideNumber = i
  })
})

function resetBg() {
  slidesItem.forEach(el => {
    el.style.backgroundColor = "transparent"
  })
}

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
  resetBg()
  slidesItem[slideNumber].style.backgroundColor = "#000000"
})

arrowLeft.addEventListener("click", () => {
  slideNumber--;
  (slideNumber < 0) ? lastSlide() : prevSlide();
  resetBg()
  slidesItem[slideNumber].style.backgroundColor = "#000000"
})



