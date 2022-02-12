function changeClassActive(event) {
  if (event.target.classList.contains('search__input')) {
    inputContainer.classList.add('active');
    if (inputField.value === "") {
      inputContainer.classList.remove('active');
    }
  }
}

function showData(data) {
  galleryContainer.innerHTML='';
  data.results.forEach(result => {
    const img = `<img class="gallery-img" src="${result.urls.regular}" alt="image">`;
    galleryContainer.insertAdjacentHTML('beforeend', img);
  });
}

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data); 
}

const inputContainer = document.querySelector('.search');
const searchButton = document.querySelector('.search__button');
const inputField = document.querySelector('.search__input');
const abortButton = document.querySelector('.search__abort');
let url = 'https://api.unsplash.com/search/photos?query=welcome&per_page=30&orientation=landscape&client_id=XQUT0q52fxns9T7AE-4ln2WikpU5lhHuUPpJQJT-F3M';
const galleryContainer = document.querySelector('.images');

window.addEventListener('load', getData());

inputField.addEventListener('input', changeClassActive);

inputField.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    searchButton.click();
  }
})

abortButton.addEventListener('click', () => {
  inputField.value="";
  inputContainer.classList.remove('active');
  inputField.focus();
});

searchButton.addEventListener('click', (e) => {
  url = `https://api.unsplash.com/search/photos?query=${inputField.value}&per_page=30&orientation=landscape&client_id=XQUT0q52fxns9T7AE-4ln2WikpU5lhHuUPpJQJT-F3M`;
  getData();
  inputField.blur(); 
});