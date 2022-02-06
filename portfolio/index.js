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
  localStorage.setItem('shevelevbvVolume', currentVolume);
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
  
  if (event.target.classList.contains('video__screen') ||
      event.target.classList.contains('video__play-logo') ||
      event.target.classList.contains('video__controls-play-icon')) {
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
  if (event.target.classList.contains('video__controls-volume')) {
    if (video.volume === 0) {
      volumeButton.classList.add('mute');
    } else {
      volumeButton.classList.remove('mute');
    }
  }
}

function changeVolume() {
  if (volumeButton.classList.contains('mute')) {
      video.volume = 0;
  } else {
      video.volume = currentVolume;
  }
  volume.value = video.volume;
  volume.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${volume.value * 100}%, #C8C8C8 ${volume.value * 100}%, #C8C8C8 100%)`;
}

function playPauseVideo() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function scrub(event) {
  video.currentTime = (event.offsetX / progressBar.offsetWidth) * video.duration;
  progressBar.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${event.offsetX / progressBar.offsetWidth * 100}%, #C8C8C8 ${event.offsetX / progressBar.offsetWidth * 100}%, #C8C8C8 100%)`;
}

const thumbnail = document.querySelector('.video__thumbnail');
const video = thumbnail.querySelector('.video__screen');
const controls = thumbnail.querySelector('.video__controls');
const playIcon = thumbnail.querySelector('.video__play-button');
const playButton = thumbnail.querySelector('.video__controls-play');
const progressBar = thumbnail.querySelector('.video__controls-progress');
const volumeButton = thumbnail.querySelector('.video__controls-speaker');
const volume = thumbnail.querySelector('.video__controls-volume');
const currentTimeElement = thumbnail.querySelector('.video__controls-time-current');
const durationTimeElement = thumbnail.querySelector('.video__controls-time-duration');
let currentVolume = 0.5;
let mousedown = false;

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

video.addEventListener('click', (event) => {
  if (!controls.classList.contains('unused')) {
    changeClassPaused(event);
    playPauseVideo();
  }
})

video.addEventListener('timeupdate', () => {
  progressBar.value = video.currentTime / video.duration;
  const value = progressBar.value * 100;
  progressBar.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${value}%, #C8C8C8 ${value}%, #C8C8C8 100%)`;
});

video.addEventListener('ended', () => {
  thumbnail.classList.add('paused');
});

video.addEventListener('play', () => {
  thumbnail.classList.remove('paused');
});

progressBar.addEventListener('change', (event) => {
    video.currentTime = event.target.value * video.duration;
});

progressBar.addEventListener('mousedown', () => {
  mousedown = true;
  video.pause();
});

progressBar.addEventListener('mouseup', () => {
  mousedown = false;
  video.play();
});

progressBar.addEventListener('mousemove', (event) => {
  mousedown && scrub(event);
});

volumeButton.addEventListener('click', (event) => {
  changeClassMute(event);
});

volume.addEventListener('mousemove', (event) => {
  video.volume = event.target.value;
  currentVolume = video.volume;
  volume.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${currentVolume * 100}%, #C8C8C8 ${currentVolume * 100}%, #C8C8C8 100%)`;
  changeClassMute(event);
});

volume.addEventListener('change', (event) => {
  video.volume = event.target.value;
  currentVolume = video.volume;
  volume.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${currentVolume * 100}%, #C8C8C8 ${currentVolume * 100}%, #C8C8C8 100%)`;
  changeClassMute(event);
});

const currentTime = () => {
  let currentMinutes = Math.floor(video.currentTime / 60);
  let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(video.duration / 60);
  let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

  currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
}

video.addEventListener('timeupdate', currentTime);