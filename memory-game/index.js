const cards = document.querySelectorAll('.card');
const scoreTitle = document.querySelector('.score__title');
const scoreScreen = document.querySelector('.score__number');
const challengeGame = document.querySelector('.challenge-game');
const classicGame = document.querySelector('.classic-game');
let classic = true;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchCounter = 0;
let tryCounter = 0;
let userScore = 4;
let points = 0;

function flipCard(e) {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  tryCounter++;
  if (firstCard.dataset.language === secondCard.dataset.language) {
    disableCards();
    matchCounter++;
    updateScore('+');
    if (matchCounter === 10) {
      endGame();
    }
    return;
  }
  
  updateScore('-');
  unflipCards();  
  if (!classic) {
    if (userScore <= 0) {
    setTimeout(() => {
      endGame();
    }, 1000);
  }  
  }                                                     
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function endGame() {
  if (userScore <= 0) {
    console.log('lost');
    cards.forEach(card => card.classList.add('flip'))
    lockBoard = true;
  } else {
    console.log('won');
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function updateScore(sign) {
  if (sign === '+') {
    if (points < 0) {
      points = 0;
    }
      points++;
    } else if (sign === '-') {
      if (points > 0) {
        points = 0;
      }
      points--;
    } 
  userScore += points;
  if (userScore < 0) {
    userScore = 0;
  }
  scoreScreen.textContent = classic ? tryCounter : userScore;
}

function shuffle() {
  cards.forEach(card => {
    let randomNum = Math.floor(Math.random() * 20);
    card.style.order = randomNum;
  });
};

function showAll() {
  lockBoard = true;
  cards.forEach(card => card.removeEventListener('click', flipCard));
  cards.forEach(card => {
    setTimeout(() => {
      card.classList.add('flip');
    }, 1000);
  });
  cards.forEach(card => {
    setTimeout(() => {
      card.classList.remove('flip');
      resetBoard();
    }, 4000);
  });
};

classicGame.addEventListener('click', () => {
  tryCounter = 0;
  matchCounter = 0;
  classic = true;
  lockBoard = false;
  scoreTitle.textContent = 'Moves:';
  scoreScreen.textContent = tryCounter;
  cards.forEach(card => card.classList.remove('flip'));
  setTimeout(shuffle, 1000);
  cards.forEach(card => card.addEventListener('click', flipCard));
});

challengeGame.addEventListener('click', () => {
  matchCounter = 0;
  tryCounter = 0;
  userScore = 4;
  points = 0;
  classic = false;
  scoreTitle.textContent = 'Score:';
  scoreScreen.textContent = userScore;
  cards.forEach(card => card.classList.remove('flip'));
  setTimeout(shuffle, 1000);
  showAll();
  cards.forEach(card => card.addEventListener('click', flipCard));
});
