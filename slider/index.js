const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide").length;
const circles = document.querySelectorAll(".slider-circle");

let slideNumber = 0

arrowRight.addEventListener("click", () => {
  slideNumber++
  if (slideNumber >= slides) {
    slideNumber = 0
    slider.style.transform = `translateX(${slideNumber}px)`
  }
  else {
    slider.style.transform = `translateX(-${slideNumber * 800}px)`
  }
  console.log('right ', slideNumber)
})

arrowLeft.addEventListener("click", () => {
  slideNumber--
  if (slideNumber < 0) {
    slider.style.transform = `translateX(-${(slides-1) * 800}px)`
    slideNumber = slides-1
  }
  else {
    slider.style.transform = `translateX(-${(slideNumber * 800)}px)`
  }
  console.log('left ', slideNumber)
})

