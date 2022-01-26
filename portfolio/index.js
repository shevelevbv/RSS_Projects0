function closeMenu(event) {
  if (event.target.classList.contains('nav-item')) {
    document.querySelector(".burger").classList.remove("open");
    document.querySelector(".nav").classList.remove("open");
    document.querySelector(".page-mask").classList.remove("open");
  }
}

function changeImage(event) {
  if(event.target.classList.contains("button")) {
    images.forEach((img, index) => img.src = `./img/jpg/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}

document.querySelector(".burger").addEventListener("click", () => {
  document.querySelector(".burger").classList.toggle("open");
  document.querySelector(".nav").classList.toggle("open");
  document.querySelector(".page-mask").classList.toggle("open");
});

document.querySelector(".nav").addEventListener("click", closeMenu);

const images = document.querySelectorAll(".portfolio-image");

document.querySelector(".button-container").addEventListener("click", changeImage);

console.log("Самооценка: 75 баллов\n" + 
            "Верстка соответствует макету при ширине 768px: 48 баллов\n" +
            "Горизонтальная полоса прокрутки отсутствует на расширениях 320-1440px: 15 баллов\n" +
            "Адаптивное меню при ширине экрана <= 768px : 22 балла\n");