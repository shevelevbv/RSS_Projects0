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
const endGameTopContainer = document.querySelector('.end-game__top');
const endGameTopInput = document.querySelector('.end-game__top-name');
const recordsContainer = document.querySelector('.records');
const classicTable = document.querySelector('.records__classic-table');
const challengeTable = document.querySelector('.records__challenge-table');
const recordsButton = document.querySelector('.records-button');
let classic = true;
let hasFlippedCard = false;
let lockButton = false;
let lockOkButton = false;
let firstCard, secondCard;
let lockBoard = false;
let topScore = false;
let matchCounter = 0;
let tryCounter = 0;
let userScore = 4;
let points = 0;
let playerName = '';
/*
let classicHiScores = [
                    {player: '', moves: 0},
                    {player: 'Ben', moves: 29},
                    {player: 'Charlie', moves: 30},
                    {player: 'David', moves: 30},
                    {player:'Evan', moves: 31},
                    {player:'Frank', moves: 31},
                    {player: 'George', moves: 31},
                    {player: 'Henry', moves: 32}, 
                    {player:'Ida', moves: 34},
                    {player: 'John', moves: 36}
];
let challengeHiScores = [
                    {player: 'Anna', score: 6},
                    {player: 'Ben', score: 5},
                    {player: 'Charlie', score: 5},
                    {player: 'David', score: 5},
                    {player:'Evan', score: 3},
                    {player:'Frank', score: 3},
                    {player: 'George', score: 3},
                    {player: 'Henry', score: 3}, 
                    {player:'Ida', score: 2},
                    {player: 'John', score: 1}
];
*/
let classicHiScores = [];
let challengeHiScores = [];

window.addEventListener('load', getLocalStorage);

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
    endGameMessage.textContent = 'Congratulations!';
    if (classic) {
      endGameResult.textContent = `Total moves: ${tryCounter}`;
      if (classicHiScores.length === 10 && tryCounter < classicHiScores[classicHiScores.length - 1].moves) {
        classicHiScores.pop();
      }
      if (classicHiScores.length < 10) {
        lockOkButton = true;
        topScore = true;
        endGameTopContainer.classList.add('show');
      }
    } else {
      endGameResult.textContent = `Total score: ${userScore}`;
      if (challengeHiScores.length === 10 && userScore > challengeHiScores[challengeHiScores.length - 1].score) {
        challengeHiScores.pop();
      }
      if (challengeHiScores.length < 10) {
        lockOkButton = true;
        topScore = true;
        endGameTopContainer.classList.add('show');
      }
    } 
  }
  mask.classList.add('show');
  endGameContainer.classList.add('show');
}

function populateTable() {
  classicTable.innerHTML = '';
  classicTable.innerHTML = '<tr><td>#</td><td>Player</td><td>Moves</td></tr>' + 
  classicHiScores.map((row, index) => {
    return `<tr><td>${index + 1}</td><td>${row.player}</td><td>${row.moves}</td></tr>`;
  }).join('');

  challengeTable.innerHTML = '';
  challengeTable.innerHTML = '<tr><td>#</td><td>Player</td><td>Score</td></tr>' + 
  challengeHiScores.map((row, index) => {
    return `<tr><td>${index + 1}</td><td>${row.player}</td><td>${row.score}</td></tr>`;
  }).join('');
}

function resetBoard() {
  [hasFlippedCard, lockBoard, lockButton] = [false, false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
  tryCounter = 0;
  matchCounter = 0;
  userScore = 4;

  if (classic) {
    lockBoard = false;
    scoreTitle.textContent = 'Moves:';
    scoreScreen.textContent = tryCounter;
  } else {
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

function setLocalStorage() {
  localStorage.setItem('classicHiScores', JSON.stringify(classicHiScores));
  localStorage.setItem('challengeHiScores', JSON.stringify(challengeHiScores));
}

function getLocalStorage() {
  if (localStorage.getItem('classicHiScores')) {
    classicHiScores = JSON.parse(localStorage.getItem('classicHiScores'));
  }
  if (localStorage.getItem('challengeHiScores')) {
    challengeHiScores = JSON.parse(localStorage.getItem('challengeHiScores'));
  }
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

function updateScores() {
  let object = {};
  if (playerName.length > 8) {
    playerName = playerName.substring(0, 8);
  }
  object.player = playerName;
  if (classic) {
    object.moves = tryCounter;
    classicHiScores.push(object);
    classicHiScores.sort((a, b) => a.moves - b.moves);
  } else {
    object.score = userScore;
    challengeHiScores.push(object);
    classicHiScores.sort((a, b) => b.moves - a.moves);
  }
}

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

endGameOk.addEventListener('click', () => {
  if (lockOkButton) return;
  endGameContainer.classList.remove('show');
  mask.classList.remove('show');
  endGameOk.classList.remove('active');
  endGameResult.textContent = '';
  score.classList.remove('hide');
  endGameTopContainer.classList.remove('show');
  if (topScore) {
    playerName = endGameTopInput.value;
    topScore = false;
    updateScores();
  }
  classicGame.click();
});

recordsButton.addEventListener('click', () => {
  if (!recordsContainer.classList.contains('show')) {
    populateTable();
  }
  recordsContainer.classList.toggle('show');
});

endGameTopInput.addEventListener('input', () => {
  if (endGameTopInput.value.length !== 0) {
    lockOkButton = false;
    endGameOk.classList.add('active');
  } else {
    lockOkButton = true;
    endGameOk.classList.remove('active');
  }
});

window.addEventListener('beforeunload', setLocalStorage);
