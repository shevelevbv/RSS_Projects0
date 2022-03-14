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
  if (data.results.length === 0) {
    const emptyAlert = `<p class="empty-alert">Nothing found. Please try another search.</p>`;
    galleryContainer.insertAdjacentHTML('beforeend', emptyAlert);
    return;
  }
  data.results.forEach(result => {
   const imgDiv = `<div class="gallery-img-container"><div class="gallery-img" style="background-image: url('${result.urls.regular}');"></div><a class="image-link" href="${result.links.html}" target="_blank"><div class="description-container"><div class="user-container"><img class="image-user" src="${result.user.profile_image.medium}" alt="user image"/><p class="image-description">${result.user.name}</p></div><div class="likes-container"><img class="heart-icon" src="./assets/svg/heart.svg"><p class="likes-count">${result.likes}</p></div></div></a></div>`;
   galleryContainer.insertAdjacentHTML('beforeend', imgDiv);
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
const clearButton = document.querySelector('.search__clear');
let url = 'https://api.unsplash.com/search/photos?query=hello&per_page=30&orientation=landscape&client_id=XQUT0q52fxns9T7AE-4ln2WikpU5lhHuUPpJQJT-F3M';
const galleryContainer = document.querySelector('.images');

window.addEventListener('load', getData());

inputField.addEventListener('input', changeClassActive);

inputField.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    searchButton.click();
  }
});

clearButton.addEventListener('click', () => {
  inputField.value="";
  inputContainer.classList.remove('active');
  inputField.focus();
});

searchButton.addEventListener('click', (e) => {
  if (inputField.value.trim() !== '') {
      url = `https://api.unsplash.com/search/photos?query=${inputField.value}&per_page=30&orientation=landscape&client_id=XQUT0q52fxns9T7AE-4ln2WikpU5lhHuUPpJQJT-F3M`;
  } else {
    url = 'https://api.unsplash.com/search/photos?query=question&&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
  }
  getData();
  inputField.blur(); 
});
