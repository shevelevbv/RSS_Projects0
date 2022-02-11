function changeClassActive(event) {
  if (event.target.classList.contains('search__input')) {
    inputContainer.classList.add('active');
    if (inputField.value.trim() === "") {
      inputContainer.classList.remove('active');
    }
  }
}

const inputContainer = document.querySelector('.search');
const inputField = document.querySelector('.search__input');
const abortButton = document.querySelector('.search__abort');

inputField.addEventListener('input', changeClassActive);

abortButton.addEventListener('click', () => {
  inputField.value="";
  inputContainer.classList.remove('active');
  inputField.focus();
});