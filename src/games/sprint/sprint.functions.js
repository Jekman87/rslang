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

function hideIntro() {
  document.querySelector('.intro__sprint').style.display = 'none';
}

function hideBestIndicator() {
  document.querySelector('[data-score-place="2"]').style.display = 'flex';
  document.querySelector('[data-score-place="3"]').style.display = 'flex';
}

function hideCountdown() {
  document.querySelector('.main-sp').style.display = 'none';
}

function hideShortTimeStatistic() {
  document.querySelector('.statistic-screen').style.display = 'none';
}

function showCountdown() {
  document.querySelector('.main-sp').style.display = 'flex';
}

function showLongTimeStatistic() {
  const games = JSON.parse(localStorage.getItem('arrayWithGames'));

  document.querySelector('.games').innerHTML = '';

  games.forEach((el) => document.querySelector('.games')
    .insertAdjacentHTML('beforeend', `${prepareLongTimeStatistic(el)}`));
}

function showBestIndicator() {
  document.querySelector('[data-score-place="1"]').style.backgroundColor = '#008000ad';
  document.querySelector('[data-score-place="1"]')
    .insertAdjacentHTML('afterbegin', '<i class="fas fa-check"></i>');
  document.querySelector('[data-score-place="2"]').style.display = 'none';
  document.querySelector('[data-score-place="3"]').style.display = 'none';
}

function showShortTimeStatistic() {
  document.querySelector('.statistic-screen').style.display = 'flex';
}

function opacityOn() {
  document.querySelector('.countdown').style.opacity = '100';
}

function opacityOff() {
  document.querySelector('.countdown').style.opacity = '0';
}

function Ready() {
  document.querySelector('.countdown').innerHTML = 'На старт ...';
}

function Set() {
  document.querySelector('.countdown').innerHTML = 'Внимание ...';
}

function Go() {
  document.querySelector('.countdown').innerHTML = 'Марш!';
}

function markRightAnswer() {
  document.querySelector('.game-block').classList.toggle('correct-color');
}

function markWrongAnswer() {
  document.querySelector('.game-block').classList.toggle('wrong-color');
}

function restartTimer() {
  state.currentTime = 60;
}

function removeShortTimeStatistic() {
  state.points = 0;
  state.pointsWeigth = 10;
  document.querySelector('.score').innerHTML = 0;
  document.querySelector('.mistake-block').innerHTML = '';
  document.querySelector('.correct-block').innerHTML = '';
  document.querySelector('.points-progress').innerHTML = `+${state.pointsWeigth} очков за слово.`;
}

function restartGame() {
  restartTimer();
  removeShortTimeStatistic();
  hideBestIndicator();
  resetProgress();
  hideShortTimeStatistic();
  showCountdown();
  readySetGo();
  callRandomFunction();
  showWordsInThePage();
  keyDownListener();
}

function countdown() {
  let timer;

  if (document.querySelector('.timer') === null) {
    clearTimeout(timer);
    return false;
  }

  state.currentTime -= 1;
  document.querySelector('.timer').innerHTML = state.currentTime;

  if (state.currentTime < 1) {
    clearTimeout(timer);
    rewritePointsResult();
    rewriteCorrectAndWrongAnswers();
    rewriteLongTimeStatistic();
    showShortTimeStatistic();
    showLongTimeStatistic();
    removeKeyDownListeners();
  } else {
    timer = setTimeout(countdown, 1000);
  }
  return true;
}

function changeLevelAndPage(answerFromHandler) {
  const level = document.querySelector('.input-level');
  switch (answerFromHandler) {
    case 'minus-level':
      level.stepDown();
      break;
    case 'plus-level':
      level.stepUp();
      break;
    default:
      break;
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
  setTimeout(countdown, 5000);
}

function playTickAudio() {
  document.querySelector('.tick-voice').play();
}

function playStartAudio() {
  document.querySelector('.whistle-voice').play().catch(() => true);
}

function playBonusAudio() {
  document.querySelector('.gong-voice').play().catch(() => true);
}

function playClickAudio() {
  document.querySelector('.click-voice').play().catch(() => true);
  return true;
}

function playWordAudio() {
  document.querySelector('.word-voice').play();
}

function playWrongAudio() {
  document.querySelector('.wrong-voice').play().catch(() => true);
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
  document.querySelector('.points-result').innerHTML = `Результат раунда: ${state.points} очков.`;
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
    const currentGame = [
      getDate(),
      `результат игры - ${state.points};`,
      `правильных ответов - ${state.correctAnswers};`,
      `ошибок - ${state.wrongAnswers}.`];
    games.push(currentGame);
    localStorage.setItem('arrayWithGames', JSON.stringify(games));
  } else {
    const games = JSON.parse(localStorage.getItem('arrayWithGames'));
    const currentGame = [
      getDate(),
      `результат игры - ${state.points};`,
      `правильных ответов - ${state.correctAnswers};`,
      `ошибок - ${state.wrongAnswers}.`];
    games.push(currentGame);
    localStorage.setItem('arrayWithGames', JSON.stringify(games));
  }
}

function prepareLongTimeStatistic(arrayWithStatistic) {
  return `
    <div class="statistic-block long-time">
    <span><i class="fas fa-rabbit"></i></span>
    <div class="information-block">
      <span>
        ${arrayWithStatistic[0]}
      </span>
      <span>${arrayWithStatistic[1]}</span>
      <span>${arrayWithStatistic[2]}</span>
      <span>${arrayWithStatistic[3]}</span>
    </div>
  </div>
  `.trim();
}

function resetLongTimeStatistic() {
  localStorage.removeItem('arrayWithGames');
  document.querySelector('.games').innerHTML = '';
}

function writeUserAnswer(answer) {
  if (answer === 'Wrong' || answer === 'ArrowLeft') {
    state.userAnswer = false;
  }
  if (answer === 'Correct' || answer === 'ArrowRight') {
    state.userAnswer = true;
  }
}

function resetProgress() {
  state.comboAnswers = 0;
  state.colorCount = 0;
  state.pointsWeigth = 10;
  document.querySelectorAll('.progress-place div').forEach((el) => {
    const element = el;
    element.style.backgroundColor = 'transparent';
  });
  document.querySelectorAll('.progress-place div').forEach((el) => {
    const element = el;
    element.innerHTML = '';
  });
  document.querySelectorAll('.bird').forEach((el) => el.remove());
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

    resetProgress();

    hideBestIndicator();

    addAnswerToStatistic('wrong');
  }
}

function resetBonusPlaces() {
  document.querySelectorAll('.progress-place div').forEach((el) => {
    const element = el;
    element.style.backgroundColor = 'transparent';
  });
  document.querySelectorAll('.progress-place div').forEach((el) => {
    const element = el;
    element.innerHTML = '';
  });
  state.colorCount = 0;
  state.pointsWeigth += state.pointsWeigth;
}

function addBirdsPicture(birdNumber) {
  document.querySelector('.birds').insertAdjacentHTML('afterbegin',
    `<img class="bird bird-${birdNumber}" src="assets/img/bird-${birdNumber}.png" alt="bird" />`);
}

function resetPointsPlaces() {
  document.querySelector('.score').innerHTML = state.points;
  document.querySelector('.points-progress').innerHTML = `+${state.pointsWeigth} очков за слово.`;
}

function pointsCount() {
  switch (state.comboAnswers) {
    case 4:
      playBonusAudio();
      resetBonusPlaces();
      addBirdsPicture(2);
      resetPointsPlaces();

      break;
    case 8:
      playBonusAudio();
      resetBonusPlaces();
      addBirdsPicture(3);
      resetPointsPlaces();
      break;
    case 12:
      playBonusAudio();
      resetBonusPlaces();
      addBirdsPicture(4);
      showBestIndicator();
      resetPointsPlaces();
      break;
    default:
      return true;
  }
  return true;
}

function rewriteStatistic() {
  document.querySelector('.score').innerHTML = state.points;
  document.querySelector('.points-progress').innerHTML = `+${state.pointsWeigth} очков за слово.`;
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
  document.querySelector('.gong-voice').src = '';

  document.querySelector('.unmute').style.display = 'flex';
}

function onGameVoice() {
  document.querySelector('.mute').style.display = 'flex';
  document.querySelector('.click-voice').src = 'assets/voices/pew.mp3';
  document.querySelector('.wrong-voice').src = 'assets/voices/wrong.mp3';
  document.querySelector('.gong-voice').src = 'assets/voices/gong.mp3';

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

function keyUp(event) {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      writeUserAnswer(event.key);
      compareAnswers();
      rewriteStatistic();
      unmarkLeftKeys();
      break;
    case 'ArrowRight':
      event.preventDefault();
      writeUserAnswer(event.key);
      compareAnswers();
      rewriteStatistic();
      unmarkRightKeys();
      break;
    default:
      return true;
  }
  return true;
}

function keyDown(event) {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      markLeftKeys();
      break;
    case 'ArrowRight':
      event.preventDefault();
      markRightKeys();
      break;
    default:
      return true;
  }
  return true;
}

function keyDownListener() {
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);
}

function removeKeyDownListeners() {
  document.removeEventListener('keydown', keyDown);
  document.removeEventListener('keyup', keyUp);
}

export {
  hideIntro, readySetGo, callRandomFunction, showWordsInThePage, writeUserAnswer,
  playWordAudio, playStatisticAudio, changeLevelAndPage,
  compareAnswers, rewriteStatistic, resetLongTimeStatistic,
  muteGameVoice, onGameVoice,
  markLeftKeys, markRightKeys, unmarkLeftKeys, unmarkRightKeys,
  switchToLongTimeStatistic, switchToRoundStatistic, restartGame,
  keyDownListener, removeKeyDownListeners,
};