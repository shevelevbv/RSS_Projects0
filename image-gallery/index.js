function changeClassActive(event) {
  if (event.target.classList.contains('search__input')) {
    inputContainer.classList.add('active');
  }
}

const inputContainer = document.querySelector('.search');
const inputField = document.querySelector('.search__input');

inputField.addEventListener('input', changeClassActive);