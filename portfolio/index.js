function closeMenu() {
  if (event.target.classList.contains('nav-item')) {
    document.querySelector(".burger").classList.remove("open");
    document.querySelector(".nav").classList.remove("open");
    document.querySelector(".page-mask").classList.remove("open");
  }
}

document.querySelector(".burger").addEventListener("click", () => {
  document.querySelector(".burger").classList.toggle("open");
  document.querySelector(".nav").classList.toggle("open");
  document.querySelector(".page-mask").classList.toggle("open");
});

document.querySelector(".nav").addEventListener("click", () => {
  closeMenu();
});

console.log("Самооценка: 75 баллов\n" + 
            "Верстка соответствует макету при ширине 768px: 48 баллов\n" +
            "Горизонтальная полоса прокрутки отсутствует на расширениях 320-1440px: 15 баллов\n" +
            "Адаптивное меню при ширине экрана <= 768px : 22 балла\n");