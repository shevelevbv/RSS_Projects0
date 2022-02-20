const cards = document.querySelectorAll('.card');
const score = document.querySelector('.score');
const scoreTitle = document.querySelector('.score__title');
const scoreScreen = document.querySelector('.score__number');
const challengeGame = document.querySelector('.challenge-game');
const classicGame = document.querySelector('.classic-game');
const popNumber = document.querySelector('.pop');
const mask = document.querySelector('.mask');
const endGameContainer = document.querySelector('.end-game');
const endGameOk = document.querySelector('.end-game__ok');
const endGameMessage = document.querySelector('.end-game__message');
const endGameResult = document.querySelector('.end-game__result');
let classic = true;
let hasFlippedCard = false;
let lockButton = false;
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
  score.classList.add('hide');
  if (userScore <= 0) {
    cards.forEach(card => card.classList.add('flip'));
    endGameMessage.textContent = 'Sorry, you lost :(';
    lockBoard = true;
    endGameOk.classList.add('active');
  } else {
    if (classic) {
      endGameMessage.textContent = 'Congratulations!';
      endGameResult.textContent = `Total moves: ${tryCounter}`;
      endGameOk.classList.add('active');
    }
  }
  mask.classList.add('show');
  endGameContainer.classList.add('show');
}

function resetBoard() {
  [hasFlippedCard, lockBoard, lockButton] = [false, false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
  tryCounter = 0;
  matchCounter = 0;

  if (classic) {
    lockBoard = false;
    scoreTitle.textContent = 'Moves:';
    scoreScreen.textContent = tryCounter;
  } else {
    userScore = 4;
    points = 0;
    scoreTitle.textContent = 'Score:';
    scoreScreen.textContent = userScore;
  }
  
  cards.forEach(card => card.classList.remove('flip'));
  setTimeout(shuffle, 500);

  if (classic) {
    resetBoard();
  } else {
    lockButton = true;
    showAll();
  }
  
  cards.forEach(card => card.addEventListener('click', flipCard));
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

  if (!classic) {
    popNumber.textContent = points > 0 ? '+' + points : points;
    popNumber.style.color = points > 0 ? '#32f90e' : '#f92e0e';
    setTimeout(() => {
      popNumber.classList.add('animate');
    }, 100);
    setTimeout(() => {
      popNumber.classList.remove('animate');
    }, 500);
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

scoreScreen.textContent = tryCounter;
shuffle();
cards.forEach(card => card.addEventListener('click', flipCard));

classicGame.addEventListener('click', () => {
  if (lockButton) return;
  classic = true;
  resetGame();
});

challengeGame.addEventListener('click', () => {
  classic = false;
  resetGame();
});

popNumber.addEventListener('animationend', () => {
  popNumber.classList.remove('animate');
});

endGameOk.addEventListener('click', () => {
  endGameContainer.classList.remove('show');
  mask.classList.remove('show');
  endGameOk.classList.remove('active');
  endGameResult.textContent = '';
  score.classList.remove('hide');
  classicGame.click();
});