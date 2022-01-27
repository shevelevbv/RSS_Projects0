import i18Obj from './translate.js';

function changeClassActive (event) {
  if (event.target.classList.contains('portfolio__button')) {
    imageBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
  }
  if (event.target.classList.contains('lang')) {
    langSwitches.forEach(lang => lang.classList.remove('active'));
    event.target.classList.add('active');
  }
}

function changeClassRu (event) {
  if (event.target.classList.contains('language__ru')) {
    titles.forEach(title => title.classList.add('ru'));
  } else if (event.target.classList.contains('language__en')) {
    titles.forEach(title => title.classList.remove('ru'));
  }
}

function changeImage(event) {
  if (event.target.classList.contains('portfolio__button')) {
    images.forEach((img, index) => img.src = `./img/jpg/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}

function changeLanguage(event) {
  if (event.target.classList.contains('lang')) {
    language = event.target.classList.contains('language__ru') ? 'ru' : 'en'; 
  }
}

function closeMenu(event) {
  if (event.target.classList.contains('nav__link')) {
    document.querySelector('.burger').classList.remove('open');
    document.querySelector('.nav').classList.remove('open');
    document.querySelector('.page-mask').classList.remove('open');
  }
}

function getTranslate(language) {
  const objWithDataAttr = document.querySelectorAll('[data-i18n]');
  objWithDataAttr.forEach(obj => {
    if (i18Obj[language].hasOwnProperty(obj.dataset.i18n)) {
      obj.textContent = i18Obj[language][obj.dataset.i18n];
      if (obj.placeholder) {
        obj.placeholder = i18Obj[language][obj.dataset.i18n];
        obj.textContent = '';
      }
    }
  });
}

function preloadImages(seasons) {
  seasons.forEach(season => {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./img/jpg/${season}/${i}.jpg`;
    }
  });
}

const langSwitches = document.querySelectorAll('.lang');
const titles = document.querySelectorAll('.title');
let language = 'en';

document.querySelector('.language').addEventListener('click', changeClassActive);
document.querySelector('.language').addEventListener('click', changeLanguage);
document.querySelector('.language').addEventListener('click', () => { 
  getTranslate(language);
});
document.querySelector('.language').addEventListener('click', changeClassRu);

document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.burger').classList.toggle('open');
  document.querySelector('.nav').classList.toggle('open');
  document.querySelector('.page-mask').classList.toggle('open');
});

document.querySelector('.nav').addEventListener('click', closeMenu);

const seasons = ['winter', 'spring', 'summer', 'autumn'];
preloadImages(seasons);

const images = document.querySelectorAll('.portfolio__image');
const imageBtns = document.querySelectorAll('.portfolio__button');

document.querySelector('.portfolio__buttons').addEventListener('click', changeClassActive);

document.querySelector('.portfolio__buttons').addEventListener('click', changeImage);

console.log('Самооценка: 75 баллов\n' + 
            'Верстка соответствует макету при ширине 768px: 48 баллов\n' +
            'Горизонтальная полоса прокрутки отсутствует на расширениях 320-1440px: 15 баллов\n' +
            'Адаптивное меню при ширине экрана <= 768px : 22 балла\n');