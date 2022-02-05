import i18Obj from './translate.js';

function addAnimate(event) {
  if (event.target.classList.contains('theme__icon')) {
    document.querySelectorAll('.theme__icon').forEach(btn => {
    btn.classList.add('animate');
    document.querySelector('.theme').addEventListener('animationend', () => {
      document.querySelectorAll('.theme__icon').forEach(icon => icon.classList.remove('animate'));
    });
  });
}
  if (event.target.classList.contains('portfolio__button')) {
    document.querySelector('.portfolio__images').classList.add('animate');
    document.querySelector('.portfolio__images').addEventListener('animationend', () => {
    document.querySelector('.portfolio__images').classList.remove('animate');
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
  localStorage.setItem('shevelevbvLang', language);
  localStorage.setItem('shevelevbvTheme', theme);
}

function getLocalStorage() {
  if (localStorage.getItem('shevelevbvLang')) {
    language = localStorage.getItem('shevelevbvLang');
    if (language === 'ru') {
      document.querySelector('.language__ru').click();
    }
  }
  if (localStorage.getItem('shevelevbvTheme')) {
    theme = localStorage.getItem('shevelevbvTheme');
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

document.querySelector('.portfolio__buttons').addEventListener('click', (event) => {
  changeClassActive(event);
  changeImage(event);
  addAnimate(event);
});

window.addEventListener('beforeunload', setLocalStorage);

// Videoplayer

function changeClassPaused(event) {
  if (event.target.classList.contains('video__controls-play-icon') ||
      event.target.classList.contains('video__play-logo')) {
    thumbnail.classList.toggle('paused');
  }
}

function changeClassMute(event) {
  if (event.target.classList.contains('video__controls-speaker-icon')) {
    if (currentVolume != 0) {
      volumeButton.classList.toggle('mute');
      changeVolume();
    }
}

function changeVolume() {
  if (volumeButton.classList.contains('mute')) {
      video.volume = 0;
    } else {
      video.volume = currentVolume;
    }
    volume.value = video.volume;
  }
}

function playPauseVideo() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

const thumbnail = document.querySelector('.video__thumbnail');
const video = thumbnail.querySelector('.video__screen');
const controls = thumbnail.querySelector('.video__controls');
const playIcon = thumbnail.querySelector('.video__play-button');
const playButton = thumbnail.querySelector('.video__controls-play');
const volumeButton = thumbnail.querySelector('.video__controls-speaker');
const volume = thumbnail.querySelector('.video__controls-volume');
let currentVolume = 0.5;

thumbnail.addEventListener('mouseover', () => {
  controls.classList.add('hovered');
});

thumbnail.addEventListener('mouseout', () => {
  controls.classList.remove('hovered');
});

playButton.addEventListener('click', (event) => {
  changeClassPaused(event);
  playPauseVideo();
});

playIcon.addEventListener('click', (event) => {
  if (controls.classList.contains('unused')) {
    controls.classList.remove('unused');
  }
  changeClassPaused(event);
  playPauseVideo();
});

volumeButton.addEventListener('click', (event) => {
  changeClassMute(event);
});

volume.addEventListener('mousemove', (event) => {
  video.volume = event.target.value;
  currentVolume = video.volume;
  if (video.volume === 0) {
    volumeButton.classList.add('mute');
  } else {
    volumeButton.classList.remove('mute');
  }
});
