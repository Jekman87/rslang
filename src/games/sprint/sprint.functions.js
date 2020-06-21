import DICTIONARY from './sprint.data';

const state = {
  currentTime: 60,
  roundStatus: '',
  userAnswer: '',
  word: '',
  translateWord: '',
  audioWord: '',
  points: 0,
  pointsWeigth: 10,
  comboAnswers: 0,
  colorCount: 0,
  wordCount: 0,
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
    rewriteCorrectAndWrongAnswers();
    document.querySelector('.statistic-screen').style.display = 'flex';
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
  document.querySelector('.click-voice').play().catch((err) => console.log(err));
  return true;
}

function playWordAudio() {
  document.querySelector('.word-voice').play();
}

function playWrongAudio() {
  document.querySelector('.wrong-voice').play().catch((err) => console.log(err));
}

function playStatisticAudio(wordNumber) {
  document.querySelector(`#statistic-audio-${wordNumber}`).play();
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
  state.correctTranslateWord = randomRusWord;
  state.audioWord = randomAudioWord;

  state.roundStatus = true;
  console.log(state.roundStatus, randomEngWord, randomRusWord);
}

function generateWrongWordCouple() {
  const keys = Object.keys(DICTIONARY);
  const randomNumber = getRandomNumber(1, 599);
  const randomValue = keys[randomNumber];
  const randomValue2 = keys[randomNumber + 1];
  const randomEngWord = DICTIONARY[randomValue].word;
  const randomAudioWord = DICTIONARY[randomValue].audio.split('/').pop();
  const translateForStatistic = DICTIONARY[randomValue].translate;
  const randomRusWord = DICTIONARY[randomValue2].translate;
  state.word = randomEngWord;
  state.translateWord = randomRusWord;
  state.correctTranslateWord = translateForStatistic;
  state.audioWord = randomAudioWord;

  state.roundStatus = false;
  console.log(state.roundStatus, randomEngWord, randomRusWord);
}

function addAnswerToStatistic(answer) {
  const url = `https://raw.githubusercontent.com/Alexandr-Voytekhovich/rslang-data/master/data/${state.audioWord}`;
  const currentAnswer = `
  <div class="statistic-block" id="statistic-block-${state.wordCount}">
    <span>
      <i class="fa fa-volume-down icon-parameters" aria-hidden="true" data-statistic="statistic-${state.wordCount}"></i>
      <audio id="statistic-audio-${state.wordCount}" src="${url}"></i>
    </span>
    <p>${state.word}</p>
    <p>[${state.word}]</p>
    <p>[${state.correctTranslateWord}]</p>
  </div>
  `;
  if (answer === 'correct') {
    document.querySelector('.correct-block').insertAdjacentHTML('beforeend', currentAnswer);
  }
  if (answer === 'wrong') {
    document.querySelector('.mistake-block').insertAdjacentHTML('beforeend', currentAnswer);
  }
}

function rewriteCorrectAndWrongAnswers() {
  const correctAnswers = document.querySelector('.correct-block').children.length;
  const wrongAnswers = document.querySelector('.mistake-block').children.length;

  document.querySelector('.mistake-answer').innerHTML = wrongAnswers;
  document.querySelector('.correct-answer').innerHTML = correctAnswers;
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
  state.wordCount += 1;
  if (state.userAnswer === state.roundStatus) {
    state.points += state.pointsWeigth;
    state.comboAnswers += 1;
    state.colorCount += 1;
    if (state.comboAnswers !== 4
    || state.comboAnswers !== 8
    || state.comboAnswers !== 12) {
      playClickAudio();
    }
    addAnswerToStatistic('correct');
  } else {
    playWrongAudio();
    state.comboAnswers = 0;
    state.colorCount = 0;
    state.pointsWeigth = 10;
    document.querySelectorAll('.progress-place div').forEach((el) => el.style.backgroundColor = 'transparent');
    document.querySelectorAll('.progress-place div').forEach((el) => el.innerHTML = '');
    document.querySelectorAll('.bird').forEach((el) => el.remove());
    addAnswerToStatistic('wrong');
  }
}

function pointsCount() {
  console.log(state.pointsWeigth);
  switch (state.comboAnswers) {
    case 4:
      console.log('work4');
      playStartAudio();
      document.querySelectorAll('.progress-place div').forEach((el) => el.style.backgroundColor = 'transparent');
      document.querySelectorAll('.progress-place div').forEach((el) => el.innerHTML = '');
      state.colorCount = 0;
      state.pointsWeigth += state.pointsWeigth;
      document.querySelector('.birds').insertAdjacentHTML('afterbegin',
        '<img class="bird bird-2" src="assets/img/bird-2.png" alt="bird" />');

      document.querySelector('.score').innerHTML = state.points;
      document.querySelector('.points-progress').innerHTML = `+${state.pointsWeigth} points for the correct answer`;
      break;
    case 8:
      console.log('work7');
      playStartAudio();
      document.querySelectorAll('.progress-place div').forEach((el) => el.style.backgroundColor = 'transparent');
      document.querySelectorAll('.progress-place div').forEach((el) => el.innerHTML = '');
      state.colorCount = 0;
      state.pointsWeigth += state.pointsWeigth;
      document.querySelector('.birds').insertAdjacentHTML('afterbegin',
        '<img class="bird bird-3" src="assets/img/bird-3.png" alt="bird" />');

      document.querySelector('.score').innerHTML = state.points;
      document.querySelector('.points-progress').innerHTML = `+${state.pointsWeigth} points for the correct answer`;
      break;
    case 12:
      console.log('work7');
      playStartAudio();
      document.querySelectorAll('.progress-place div').forEach((el) => el.style.backgroundColor = 'transparent');
      document.querySelectorAll('.progress-place div').forEach((el) => el.innerHTML = '');
      state.colorCount = 0;
      state.pointsWeigth += state.pointsWeigth;
      document.querySelector('.birds')
        .insertAdjacentHTML('afterbegin', '<img class="bird bird-4" src="assets/img/bird-4.png" alt="bird" />');

      document.querySelector('.score').innerHTML = state.points;
      document.querySelector('.points-progress').innerHTML = `+${state.pointsWeigth} points for the correct answer`;
      break;
    default:
      console.log();
      break;
  }
}

function rewriteStatistic() {
  document.querySelector('.score').innerHTML = state.points;
  document.querySelector('.points-progress').innerHTML = `+${state.pointsWeigth} points for the correct answer`;
  pointsCount();
  callRandomFunction();
  showWordsInThePage();
  if (state.colorCount > 0) {
    document.querySelector(`[data-score-place="${state.colorCount}"]`).style.backgroundColor = '#0080008f';
    document.querySelector(`[data-score-place="${state.colorCount}"]`)
      .insertAdjacentHTML('afterbegin', '<i class="fas fa-check"></i>');
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

function muteGameVoice() {
  document.querySelector('.mute').style.display = 'none';
  document.querySelector('.click-voice').src = '';
  document.querySelector('.wrong-voice').src = '';

  document.querySelector('.unmute').style.display = 'flex';
}

function onGameVoice() {
  document.querySelector('.mute').style.display = 'flex';
  document.querySelector('.click-voice').src = 'assets/voices/pew.mp3';
  document.querySelector('.wrong-voice').src = 'assets/voices/wrong.mp3';

  document.querySelector('.unmute').style.display = 'none';
}

export {
  hideIntro, readySetGo, callRandomFunction, showWordsInThePage, writeUserAnswer,
  playWordAudio, playStatisticAudio,
  compareAnswers, rewriteStatistic, pointsCount,
  muteGameVoice, onGameVoice,
};
