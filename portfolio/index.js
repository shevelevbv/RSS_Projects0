function changeClassActive (event) {
  if(event.target.classList.contains("portfolio__button")) {
    imageBtns.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
  }
}

function changeImage(event) {
  if(event.target.classList.contains("portfolio__button")) {
    images.forEach((img, index) => img.src = `./img/jpg/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}

function closeMenu(event) {
  if (event.target.classList.contains('nav__link')) {
    document.querySelector(".burger").classList.remove("open");
    document.querySelector(".nav").classList.remove("open");
    document.querySelector(".page-mask").classList.remove("open");
  }
}

function preloadImages(seasons) {
  seasons.forEach(season => {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./img/jpg/${season}/${i}.jpg`;
    }
  });
}

document.querySelector(".burger").addEventListener("click", () => {
  document.querySelector(".burger").classList.toggle("open");
  document.querySelector(".nav").classList.toggle("open");
  document.querySelector(".page-mask").classList.toggle("open");
});

document.querySelector(".nav").addEventListener("click", closeMenu);

const seasons = ["winter", "spring", "summer", "autumn"];
preloadImages(seasons);

const images = document.querySelectorAll(".portfolio__image");
const imageBtns = document.querySelectorAll(".portfolio__button");

document.querySelector(".portfolio__buttons").addEventListener("click", changeClassActive);

document.querySelector(".portfolio__buttons").addEventListener("click", changeImage);

console.log("Самооценка: 75 баллов\n" + 
            "Верстка соответствует макету при ширине 768px: 48 баллов\n" +
            "Горизонтальная полоса прокрутки отсутствует на расширениях 320-1440px: 15 баллов\n" +
            "Адаптивное меню при ширине экрана <= 768px : 22 балла\n");