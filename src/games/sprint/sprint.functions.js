import DICTIONARY from './sprint.data';

const state = {
  currentTime: 3,
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

function markRightAnswer() {
  document.querySelector('.game-block').classList.toggle('correct-color');
}

function markWrongAnswer() {
  document.querySelector('.game-block').classList.toggle('wrong-color');
}

function countdown() {
  let timer;

  state.currentTime -= 1;
  document.querySelector('.timer').innerHTML = state.currentTime;

  if (state.currentTime < 1) {
    clearTimeout(timer);
    rewritePointsResult();
    rewriteCorrectAndWrongAnswers();
    rewriteLongTimeStatistic();
    showLongTimeStatistic();
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

function rewritePointsResult() {
  document.querySelector('.points-result').innerHTML = `Round result: ${state.points} points.`;
}

function rewriteCorrectAndWrongAnswers() {
  const correctAnswers = document.querySelector('.correct-block').children.length;
  const wrongAnswers = document.querySelector('.mistake-block').children.length;

  state.correctAnswers = correctAnswers;
  state.wrongAnswers = wrongAnswers;

  document.querySelector('.mistake-answer').innerHTML = wrongAnswers;
  document.querySelector('.correct-answer').innerHTML = correctAnswers;
}

function getDate() {
  const Data = new Date();
  const Year = Data.getFullYear();
  const Month = Data.getMonth() + 1 < 10 ? `0${Data.getMonth() + 1}` : Data.getMonth();
  const Day = Data.getDate() < 10 ? `0${Data.getDate()}` : Data.getDate();
  const Hours = Data.getHours();
  const Minutes = Data.getMinutes() < 10 ? `0${Data.getMinutes()}` : Data.getMinutes();
  const Seconds = Data.getSeconds();
  return `${Day}/${Month}/${Year} - ${Hours}:${Minutes}:${Seconds} (UTC +3:00);`;
}

function rewriteLongTimeStatistic() {
  if (localStorage.getItem('arrayWithGames') === null) {
    const games = [];
    const currentGame = [getDate(), `correct - ${state.correctAnswers};`, `mistakes - ${state.wrongAnswers}.`];
    games.push(currentGame);
    localStorage.setItem('arrayWithGames', JSON.stringify(games));
  } else {
    const games = JSON.parse(localStorage.getItem('arrayWithGames'));
    const currentGame = [getDate(), `correct - ${state.correctAnswers};`, `mistakes - ${state.wrongAnswers}.`];
    games.push(currentGame);
    localStorage.setItem('arrayWithGames', JSON.stringify(games));
  }
}

function prepareLongTimeStatistic(arrayWithStatistic) {
  return `
    <div class="statistic-block long-time">
    <span><i class="fas fa-rabbit"></i></span>
    <span>
      ${arrayWithStatistic[0]}
    </span>
    <span>${arrayWithStatistic[1]}</span>
    <span>${arrayWithStatistic[2]}</span>
  </div>
  `.trim();
}

function cleanLongTimeStatistic() {
  localStorage.removeItem('arrayWithGames');
  document.querySelector('.games').innerHTML = '';
}

function showLongTimeStatistic() {
  const games = JSON.parse(localStorage.getItem('arrayWithGames'));
  console.log(games);
  games.forEach((el) => document.querySelector('.games').insertAdjacentHTML('beforeend', `${prepareLongTimeStatistic(el)}`));
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
    playClickAudio();
    setTimeout(markRightAnswer, 0);
    setTimeout(markRightAnswer, 200);

    state.points += state.pointsWeigth;
    state.comboAnswers += 1;
    state.colorCount += 1;

    addAnswerToStatistic('correct');
  } else {
    playWrongAudio();
    setTimeout(markWrongAnswer, 0);
    setTimeout(markWrongAnswer, 200);

    state.comboAnswers = 0;
    state.colorCount = 0;
    state.pointsWeigth = 10;
    document.querySelectorAll('.progress-place div').forEach((el) => el.style.backgroundColor = 'transparent');
    document.querySelectorAll('.progress-place div').forEach((el) => el.innerHTML = '');
    document.querySelectorAll('.bird').forEach((el) => el.remove());

    hideBestIndicator();

    addAnswerToStatistic('wrong');
  }
}

function showBestIndicator() {
  document.querySelector('[data-score-place="1"]').style.backgroundColor = '#008000ad';
  document.querySelector('[data-score-place="1"]')
    .insertAdjacentHTML('afterbegin', '<i class="fas fa-check"></i>');
  document.querySelector('[data-score-place="2"]').style.display = 'none';
  document.querySelector('[data-score-place="3"]').style.display = 'none';
}

function hideBestIndicator() {
  document.querySelector('[data-score-place="2"]').style.display = 'flex';
  document.querySelector('[data-score-place="3"]').style.display = 'flex';
}

function pointsCount() {
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

      showBestIndicator();

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
  if (state.colorCount > 0
    && state.colorCount < 4
    && state.comboAnswers < 12) {
    document.querySelector(`[data-score-place="${state.colorCount}"]`).style.backgroundColor = '#008000ad';
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

function markLeftKeys() {
  document.querySelector('.wrong').style.opacity = 0.3;
  document.querySelector('.left-arrow').style.opacity = 0.3;
}

function unmarkLeftKeys() {
  document.querySelector('.wrong').style.opacity = 1.0;
  document.querySelector('.left-arrow').style.opacity = 1.0;
}

function markRightKeys() {
  document.querySelector('.correct').style.opacity = 0.5;
  document.querySelector('.right-arrow').style.opacity = 0.5;
}

function unmarkRightKeys() {
  document.querySelector('.correct').style.opacity = 1.0;
  document.querySelector('.right-arrow').style.opacity = 1.0;
}

function switchToLongTimeStatistic() {
  document.querySelector('.statistic-blocks').style.display = 'none';
  document.querySelector('.game-history').style.display = 'inline';
}

function switchToRoundStatistic() {
  document.querySelector('.statistic-blocks').style.display = 'inline';
  document.querySelector('.game-history').style.display = 'none';
}

export {
  hideIntro, readySetGo, callRandomFunction, showWordsInThePage, writeUserAnswer,
  playWordAudio, playStatisticAudio,
  compareAnswers, rewriteStatistic, cleanLongTimeStatistic, pointsCount,
  muteGameVoice, onGameVoice,
  markLeftKeys, markRightKeys, unmarkLeftKeys, unmarkRightKeys,
  switchToLongTimeStatistic, switchToRoundStatistic,
};
