import i18Obj from './translate.js';

function addAnimate(event) {
  if (event.target.classList.contains('theme__icon')) {
    document.querySelectorAll('.theme__icon').forEach(btn => {
      btn.classList.remove('animate');
      btn.classList.add('animate');
    });
  }
}

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
    document.querySelector('.hero__description').classList.add('ru');
  } else if (event.target.classList.contains('language__en')) {
    titles.forEach(title => title.classList.remove('ru'));
    document.querySelector('.hero__description').classList.remove('ru');
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

function changeTheme() {
  lightThemeElements.forEach(element => element.classList.toggle('light'));
  theme = (themeIcon.classList.contains('light')) ? 'light' : 'dark';
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

function setLocalStorage() {
  localStorage.setItem('lang', language);
  console.log(theme);
  localStorage.setItem('theme', theme);
}

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    language = localStorage.getItem('lang');
    if (language === 'ru') {
      document.querySelector('.language__ru').click();
    }
  }
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.querySelector('.theme').click();
    }
  }
}

let language = 'en';
let theme = 'dark';

window.addEventListener('load', getLocalStorage);

const langSwitches = document.querySelectorAll('.lang');
const titles = document.querySelectorAll('.title');

document.querySelector('.language').addEventListener('click', (event) => { 
  changeClassActive(event);
  changeLanguage(event);
  getTranslate(language);
  changeClassRu(event);
});

const lightThemeElements = document.querySelectorAll('.change');
const themeIcon = document.querySelector('.theme__icon');

document.querySelector('.theme').addEventListener('click', (event) => {
  changeTheme(event),
  addAnimate(event); 
});

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

window.addEventListener('beforeunload', setLocalStorage);

console.log('Самооценка: 75 баллов\n' + 
            'Реализована смена картинок из соответствующих папок: 25 баллов\n' +
            'Добавлена функция перевода страницы: 25 баллов\n' +
            'Добавлена функция смена темы: 25 баллов\n' + 
            'Реализовано запоминание пользовательских темы и языка: 5 баллов\n' +
            'Добавлена функция подъема кнопки при наведении: 5 баллов\n');