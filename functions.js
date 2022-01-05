//dom references
const slideContainer = document.querySelector(".slidecontainer");
let slides = Array.from(slideContainer.children);
let slideHeight = slides[0].getBoundingClientRect().height;
let floater = document.querySelector(".floater");
let indicator = document.querySelector(".indicator");
let dots = Array.from(indicator.children);

let initialTouchPositionX = null;
let initialTouchPositionY = null;

//function to set initial touch on screen
const setInitialTouch = (e) => {
  initialTouchPositionX = e.touches[0].clientX;
  initialTouchPositionY = e.touches[0].clientY;
};

const touchMoveHandler = (e) => {
  if (initialTouchPositionX === null || initialTouchPositionY === null) {
    return;
  }
  const currentTouchPositionX = e.touches[0].clientX;
  const currentTouchPositionY = e.touches[0].clientY;
  const distanceX = initialTouchPositionX - currentTouchPositionX;
  const distanceY = initialTouchPositionY - currentTouchPositionY;
  if (Math.abs(distanceX) > Math.abs(distanceY)) {
    //horizontal
    return;
  } else {
    //vertical
    if (distanceY < 0) {
      slideScreenUp();
    } else {
      slideScreenDown();
    }
  }
  initialTouchPositionX = null;
  initialTouchPositionY = null;
  e.preventDefault();
};

//set slide positions
slides.forEach((element, index) => {
  element.addEventListener("touchstart", setInitialTouch);
  element.addEventListener("touchmove", touchMoveHandler);
  element.style.top = "" + slideHeight * index + "px";
});

//screen changing function
slideScreenDown = (e) => {
  //get references
  const currentSlide = slideContainer.querySelector(".active");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = indicator.querySelector(".active-dot");
  const nextDot = currentDot.nextElementSibling;
  const futureDot = nextDot.nextElementSibling;
  floaterVisibility(futureDot, nextSlide);
  //slide current slide away
  slideScreen(slideContainer, currentSlide, nextSlide, currentDot, nextDot);
};

//slide screen up
slideScreenUp = (e) => {
  const currentSlide = slideContainer.querySelector(".active");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = indicator.querySelector(".active-dot");
  const prevDot = currentDot.previousElementSibling;
  const pastDot = prevDot.previousElementSibling;
  floaterVisibility(pastDot, prevSlide);
  slideScreen(slideContainer, currentSlide, prevSlide, currentDot, prevDot);
};

//slide function
slideScreen = (
  slideContainer,
  currentSlide,
  nextDirection,
  currentDot,
  nextDot
) => {
  slideContainer.style.transform =
    "translateY(-" + nextDirection.style.top + ")";
  currentSlide.classList.remove("active");
  nextDirection.classList.add("active");
  currentDot.classList.remove("active-dot");
  nextDot.classList.add("active-dot");
};

//floater Visibility function
floaterVisibility = (fortune, next) => {
  if (fortune === null && next.style.top !== "0px") {
    floater.style.display = "none";
  } else {
    floater.style.display = "block";
  }
};

//handlekeypress
handleArrowKeys = (e) => {
  if (e.keyCode == "40") {
    slideScreenDown();
  }
  if (e.keyCode == "38") {
    slideScreenUp();
  }
};

//add event listener
floater.addEventListener("click", slideScreenDown);
document.onkeydown = handleArrowKeys;