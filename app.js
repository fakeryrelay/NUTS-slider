const sliderElement = document.querySelector(".slider");
const leftButtonElement = sliderElement.querySelector(".left");
const rightButtonElement = sliderElement.querySelector(".right");

const sliderLineElement = sliderElement.querySelector(".slider__line");
const sliderLineActiveElement = sliderLineElement.querySelector("div");

const appContentElement = document.querySelector(".app__content-inner");
const appItemElements = appContentElement.querySelectorAll(".app__item");

let activeItem = 0;

let appContentWidth = appContentElement.clientWidth;
let appItemWidth = appItemElements[0].clientWidth + 2;
let gap = appContentWidth % appItemWidth;
let amountOfShownItems = Math.round(appContentWidth / appItemWidth);

let interval;

window.addEventListener("resize", (e) => {
  appContentWidth = appContentElement.clientWidth;
  appItemWidth = appItemElements[0].clientWidth + 2;
  gap = appContentWidth % appItemWidth;
  amountOfShownItems = Math.round(appContentWidth / appItemWidth);
});

const moveSlider = () => {
  if (amountOfShownItems === 1) {
    const transformValue =
      (activeItem + 1 - amountOfShownItems) * (appItemWidth + 30);
    appContentElement.style.transform = `translateX(-${transformValue}px)`;
    return;
  }

  if (activeItem >= amountOfShownItems) {
    const transformValue =
      (activeItem + 1 - amountOfShownItems) *
      (appItemWidth + gap / (amountOfShownItems - 1));
    appContentElement.style.transform = `translateX(-${transformValue}px)`;
  } else {
    appContentElement.style.transform = `translateX(0px)`;
  }
};

const setSliderActiveWidthAndPosition = () => {
  const parentWidth = sliderLineElement.clientWidth;
  const width = parentWidth / appItemElements.length;
  sliderLineActiveElement.style.width = width + "px";
  sliderLineActiveElement.style.left = activeItem * width + "px";
};

const setSliderInterval = () => {
  interval = setInterval(() => {
    activeItem += 1;
    setActiveAppItem();
  }, 4000);
};

const clearSliderInterval = () => {
  if (interval) {
    clearInterval(interval);
  }
};

const setActiveAppItem = () => {
  if (activeItem >= appItemElements.length) {
    activeItem = 0;
  }

  appItemElements.forEach((el) => {
    if (el.classList.contains("active")) {
      el.classList.remove("active");
    }
  });

  appItemElements[activeItem].classList.add("active");
  setSliderActiveWidthAndPosition();
  moveSlider();
};

// Handlers

const onClickHandleDecrease = () => {
  if (activeItem === 0) {
    activeItem = appItemElements.length - 1;
    setActiveAppItem();
    return;
  }

  activeItem -= 1;
  setActiveAppItem();
  clearSliderInterval();
  setSliderInterval();
};

const onClickHandleIncrease = () => {
  if (activeItem === appItemElements.length - 1) {
    activeItem = 0;
    setActiveAppItem();
    return;
  }

  activeItem += 1;
  setActiveAppItem();
  clearSliderInterval();
  setSliderInterval();
};

let touchStartX;

appContentElement.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
appContentElement.addEventListener("touchend", (e) => {
  let touchEndX = e.changedTouches[0].screenX;

  if (Math.abs(touchStartX - touchEndX) < 50) {
    return
  }

  if (touchStartX > touchEndX) {
    onClickHandleIncrease()
  } else {
    onClickHandleDecrease()
  }
});

leftButtonElement.addEventListener("click", onClickHandleDecrease);
rightButtonElement.addEventListener("click", onClickHandleIncrease);

// ProjectInit
setSliderActiveWidthAndPosition();
setActiveAppItem();
setSliderInterval();
