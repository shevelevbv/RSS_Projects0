function closeMenu() {
  if (event.target.classList.contains('nav-item')) {
    document.querySelector(".burger").classList.remove("open");
    document.querySelector(".nav").classList.remove("open");
  }
}

document.querySelector(".burger").addEventListener("click", () => {
  document.querySelector(".burger").classList.toggle("open");
  document.querySelector(".nav").classList.toggle("open");
});

document.querySelector(".nav").addEventListener("click", () => {
  closeMenu();
});