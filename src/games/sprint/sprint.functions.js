import DICTIONARY from './sprint.data';

const state = {
  currentTime: 60,
  roundStatus: '',
  userAnswer: '',
  word: '',
  translateWord: '',
  audioWord: '',
  points: 0,
  comboAnswers: 0,
};

function hideIntro(el) {
  el.find('.intro').css({ display: 'none' });
}

function opacityOn() {
  document.querySelector('.countdown').style.opacity = '100';
}

function opacityOff() {
  document.querySelector('.countdown').style.opacity = '0';
}

function Ready() {
  document.querySelector('.countdown').innerHTML = 'Ready...';
}

function Set() {
  document.querySelector('.countdown').innerHTML = 'Set...';
}

function Go() {
  document.querySelector('.countdown').innerHTML = 'Go!';
}

function hideCountdown() {
  document.querySelector('.main-sp').style.display = 'none';
}

function countdown() {
  let timer;

  state.currentTime -= 1;
  document.querySelector('.timer').innerHTML = state.currentTime;

  if (state.currentTime < 1) {
    clearTimeout(timer);
    location.reload();
  } else {
    timer = setTimeout(countdown, 1000);
  }
}

function readySetGo() {
  setTimeout(Ready, 500);
  setTimeout(opacityOn, 500);
  setTimeout(playTickAudio, 1000);
  setTimeout(opacityOff, 1500);
  setTimeout(Set, 2000);
  setTimeout(opacityOn, 2000);
  setTimeout(playTickAudio, 2500);
  setTimeout(opacityOff, 3000);
  setTimeout(Go, 3500);
  setTimeout(opacityOn, 3500);
  setTimeout(playTickAudio, 4000);
  setTimeout(opacityOff, 4500);
  setTimeout(playStartAudio, 5000);
  setTimeout(hideCountdown, 5000);
  setTimeout(countdown, 5400);
}

function playTickAudio() {
  document.querySelector('.tick-voice').play();
}

function playStartAudio() {
  document.querySelector('.start-voice').play();
}

function playClickAudio() {
  document.querySelector('.click-voice').play();
}

function playWordAudio() {
  document.querySelector('.word-voice').play();
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCorrectWordCouple() {
  const keys = Object.keys(DICTIONARY);
  const randomValue = keys[getRandomNumber(1, 50)];
  const randomEngWord = DICTIONARY[randomValue].word;
  const randomAudioWord = DICTIONARY[randomValue].audio.split('/').pop();
  const randomRusWord = DICTIONARY[randomValue].translate;
  state.word = randomEngWord;
  state.translateWord = randomRusWord;
  state.audioWord = randomAudioWord;

  state.roundStatus = true;
  console.log(state.roundStatus, randomEngWord, randomRusWord);
}

function generateWrongWordCouple() {
  const keys = Object.keys(DICTIONARY);
  const randomNumber = getRandomNumber(1, 50);
  const randomValue = keys[randomNumber];
  const randomValue2 = keys[randomNumber + 1];
  const randomEngWord = DICTIONARY[randomValue].word;
  const randomAudioWord = DICTIONARY[randomValue].audio.split('/').pop();
  const randomRusWord = DICTIONARY[randomValue2].translate;
  state.word = randomEngWord;
  state.translateWord = randomRusWord;
  state.audioWord = randomAudioWord;

  state.roundStatus = false;
  console.log(state.roundStatus, randomEngWord, randomRusWord);
}

function writeUserAnswer(answer) {
  if (answer === 'Wrong' || answer === 'ArrowLeft') {
    state.userAnswer = false;
  }
  if (answer === 'Correct' || answer === 'ArrowRight') {
    state.userAnswer = true;
  }
}

function compareAnswers() {
  if (state.userAnswer === state.roundStatus) {
    state.points += 10;
    state.comboAnswers += 1;
  }
}

function rewriteStatistic() {
  document.querySelector('.score').innerHTML = state.points;
  callRandomFunction();
  showWordsInThePage();
  if (state.comboAnswers > 3) {
    state.comboAnswers = 0;
    document.querySelectorAll('.progress-place div').forEach((el) => el.style.backgroundColor = 'transparent');
    document.querySelectorAll('.birds img').forEach((el) => el.remove());
  } else {
    document.querySelector(`[data-score-place="${state.comboAnswers}"]`).style.backgroundColor = '#0080008f';
    document.querySelector('.birds').insertAdjacentHTML('afterbegin', '<img src="assets/img/bird.png" alt="bird" />');
  }
}

function callRandomFunction() {
  return (Math.floor(Math.random() * 2) === 0)
    ? generateCorrectWordCouple()
    : generateWrongWordCouple();
}

function showWordsInThePage() {
  const url = `https://raw.githubusercontent.com/Alexandr-Voytekhovich/rslang-data/master/data/${state.audioWord}`;
  document.querySelector('.language-eng').innerHTML = state.word;
  document.querySelector('.language-rus').innerHTML = state.translateWord;
  document.querySelector('.word-voice').src = url;
}

export {
  hideIntro, readySetGo, callRandomFunction, showWordsInThePage, writeUserAnswer,
  playClickAudio, playWordAudio,
  compareAnswers, rewriteStatistic,
};
