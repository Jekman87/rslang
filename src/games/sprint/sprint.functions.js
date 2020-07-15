import './scss/sprint.scss';

const state = {
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
  dictionary: {},
  correctAnswers: 0,
  wrongAnswers: 0,
};

async function getWords(level, page = 0, count = 60) {
  const currentLevel = +level - 1;
  let url = 'https://afternoon-falls-25894.herokuapp.com/words?';
  url += `group=${currentLevel}&page=${page}&wordsPerExampleSentenceLTE=20&wordsPerPage=${count}`;

  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (rawResponse.status !== 200) {
    throw new Error(rawResponse.status);
  }

  const content = await rawResponse.json();
  const dataLength = Object.keys(content).length;

  for (let i = 0; i < dataLength; i += 1) {
    state.dictionary[`${content[i].word}`] = {
      word: content[i].word,
      translate: content[i].wordTranslate,
      transcription: content[i].transcription,
      audio: content[i].audio,
      id: content[i].id,
    };
  }
  return content;
}

function getAllLevelWords() {
  for (let page = 0; page < 10; page += 1) {
    getWords(state.currentLevel, page);
  }
}

function hideIntro() {
  document.querySelector('.intro__sprint').style.display = 'none';
}

function rememberLevel() {
  state.currentLevel = document.querySelector('.input-level').value;
}

function hideBestIndicator() {
  document.querySelector('[data-score-place="2"]').style.display = 'flex';
  document.querySelector('[data-score-place="3"]').style.display = 'flex';
}

function hideCountdown() {
  document.querySelector('.sprint-spinner').style.display = 'none';
}

function hideShortTimeStatistic() {
  document.querySelector('.sprint-statistic-screen').style.display = 'none';
}

function showCountdown() {
  document.querySelector('.sprint-spinner').style.display = 'flex';
}

function rewriteLongTimeStatistic() {
  const currentDate = Date.now();
  const currentGameResults = {
    date: '',
    round: '',
    result: '',
    points: '',
  };

  currentGameResults.date = currentDate;
  currentGameResults.round = `${state.currentLevel}-0`;
  currentGameResults.result = `${state.correctAnswers}-${state.wrongAnswers}`;
  currentGameResults.points = state.points;

  return currentGameResults;
}

function resetLongTimeStatistic() {
  localStorage.removeItem('arrayWithGames');
  document.querySelector('.sprint-games').innerHTML = '';
}

function showBestIndicator() {
  document.querySelector('[data-score-place="1"]').style.backgroundColor = '#008000ad';
  document.querySelector('[data-score-place="1"]')
    .insertAdjacentHTML('afterbegin', '<i class="fas fa-check"></i>');
  document.querySelector('[data-score-place="2"]').style.display = 'none';
  document.querySelector('[data-score-place="3"]').style.display = 'none';
}

function showShortTimeStatistic() {
  document.querySelector('.sprint-statistic-screen').style.display = 'flex';
}

function opacityOn() {
  document.querySelector('.sprint-countdown').style.opacity = '100';
}

function opacityOff() {
  document.querySelector('.sprint-countdown').style.opacity = '0';
}

function ready() {
  document.querySelector('.sprint-countdown').innerHTML = 'На старт ...';
}

function set() {
  document.querySelector('.sprint-countdown').innerHTML = 'Внимание ...';
}

function go() {
  document.querySelector('.sprint-countdown').innerHTML = 'Марш!';
}

function markRightAnswer() {
  document.querySelector('.sprint-game-block').classList.toggle('sprint-correct-color');
}

function markWrongAnswer() {
  document.querySelector('.sprint-game-block').classList.toggle('sprint-wrong-color');
}

function markBonusTimer() {
  document.querySelector('.sprint-timer').classList.toggle('sprint-bonus-timer');
}

function showBonusTime(bonusTime) {
  document.querySelector('.sprint-timer').textContent = `+${bonusTime}`;
}

function removeShortTimeStatistic() {
  state.points = 0;
  state.pointsWeigth = 10;
  document.querySelector('.sprint-score-table').innerHTML = 0;
  document.querySelector('.mistake-block').innerHTML = '';
  document.querySelector('.correct-block').innerHTML = '';
  document.querySelector('.points-progress').innerHTML = `+${state.pointsWeigth} очков за слово.`;
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

function playTickAudio() {
  document.querySelector('.tick-voice').play().catch(() => true);
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
  document.querySelector('.word-voice').play().catch(() => true);
}

function playWrongAudio() {
  document.querySelector('.wrong-voice').play().catch(() => true);
}

function playStatisticAudio(wordNumber) {
  document.querySelector(`#statistic-audio-${wordNumber}`).play().catch(() => true);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCorrectWordCouple() {
  const keys = Object.keys(state.dictionary);
  const randomValue = keys[getRandomNumber(2, keys.length - 2)];
  const randomEngWord = state.dictionary[randomValue].word;
  const randomAudioWord = state.dictionary[randomValue].audio.split('/').pop();
  const randomRusWord = state.dictionary[randomValue].translate;
  const randomTranscription = state.dictionary[randomValue].transcription;
  state.word = randomEngWord;
  state.transcription = randomTranscription;
  state.translateWord = randomRusWord;
  state.correctTranslateWord = randomRusWord;
  state.audioWord = randomAudioWord;

  state.roundStatus = true;
}

function generateWrongWordCouple() {
  const keys = Object.keys(state.dictionary);
  const randomNumber = getRandomNumber(2, keys.length - 2);
  const randomValue = keys[randomNumber];
  const randomValue2 = keys[randomNumber + 1];
  const randomEngWord = state.dictionary[randomValue].word;
  const randomAudioWord = state.dictionary[randomValue].audio.split('/').pop();
  const translateForStatistic = state.dictionary[randomValue].translate;
  const randomTranscription = state.dictionary[randomValue].transcription;
  const randomRusWord = state.dictionary[randomValue2].translate;
  state.word = randomEngWord;
  state.transcription = randomTranscription;
  state.translateWord = randomRusWord;
  state.correctTranslateWord = translateForStatistic;
  state.audioWord = randomAudioWord;

  state.roundStatus = false;
}

function addAnswerToStatistic(answer) {
  const url = `https://raw.githubusercontent.com/Alexandr-Voytekhovich/rslang-data/master/data/${state.audioWord}`;
  const dataAtribute = `data-statistic="statistic-${state.wordCount}"`;

  const currentAnswer = `
  <div class="sprint-statistic-block" id="statistic-block-${state.wordCount}" ${dataAtribute}>
    <span ${dataAtribute}>
      <i class="fa fa-volume-down icon-parameters" aria-hidden="true" ${dataAtribute}></i>
      <audio id="statistic-audio-${state.wordCount}" src="${url}"></i>
    </span>
    <p ${dataAtribute}>${state.word}</p>
    <p ${dataAtribute}>${state.transcription}</p>
    <p ${dataAtribute}>${state.correctTranslateWord}</p>
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
  document.querySelector('.sprint-points-result').innerHTML = `Результат раунда: ${state.points} очков.`;
}

function rewriteCorrectAndWrongAnswers() {
  const correctAnswers = document.querySelector('.correct-block').children.length;
  const wrongAnswers = document.querySelector('.mistake-block').children.length;

  state.correctAnswers = correctAnswers;
  state.wrongAnswers = wrongAnswers;

  document.querySelector('.sprint-mistake-answer').innerHTML = wrongAnswers;
  document.querySelector('.sprint-correct-answer').innerHTML = correctAnswers;
}

function convertDate(time) {
  const currentDate = new Date(time);
  const Year = currentDate.getFullYear();
  const Month = currentDate.getMonth() + 1 < 10
    ? `0${currentDate.getMonth() + 1}`
    : currentDate.getMonth();
  const Day = currentDate.getDate() < 10
    ? `0${currentDate.getDate()}`
    : currentDate.getDate();
  const Hours = currentDate.getHours();
  const Minutes = currentDate.getMinutes() < 10
    ? `0${currentDate.getMinutes()}`
    : currentDate.getMinutes();
  const Seconds = currentDate.getSeconds() < 10
    ? `0${currentDate.getSeconds()}`
    : currentDate.getSeconds();

  return `${Day}/${Month}/${Year} - ${Hours}:${Minutes}:${Seconds} (UTC +3:00);`;
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
  document.querySelectorAll('.sprint-progress-place div').forEach((el) => {
    const element = el;
    element.style.backgroundColor = 'transparent';
  });
  document.querySelectorAll('.sprint-progress-place div').forEach((el) => {
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
  document.querySelectorAll('.sprint-progress-place div').forEach((el) => {
    const element = el;
    element.style.backgroundColor = 'transparent';
  });
  document.querySelectorAll('.sprint-progress-place div').forEach((el) => {
    const element = el;
    element.innerHTML = '';
  });
  state.colorCount = 0;
  state.pointsWeigth += state.pointsWeigth;
}

function addBirdsPicture(birdNumber) {
  document.querySelector('.birds').insertAdjacentHTML('afterbegin',
    `<img class="bird bird-${birdNumber}" src="assets/sprint/bird-${birdNumber}.png" alt="bird" />`);
}

function resetPointsPlaces() {
  document.querySelector('.sprint-score-table').innerHTML = state.points;
  document.querySelector('.points-progress').innerHTML = `+${state.pointsWeigth} очков за слово.`;
}

function pointsCount() {
  switch (state.comboAnswers) {
    case 4:
      playBonusAudio();
      resetBonusPlaces();
      addBirdsPicture(2);
      resetPointsPlaces();
      showBonusTime(1);
      setTimeout(markBonusTimer, 0);
      setTimeout(markBonusTimer, 200);
      break;
    case 8:
      playBonusAudio();
      resetBonusPlaces();
      addBirdsPicture(3);
      resetPointsPlaces();
      showBonusTime(3);
      setTimeout(markBonusTimer, 0);
      setTimeout(markBonusTimer, 200);
      break;
    case 12:
      playBonusAudio();
      resetBonusPlaces();
      addBirdsPicture(4);
      showBestIndicator();
      resetPointsPlaces();
      showBonusTime(5);
      setTimeout(markBonusTimer, 0);
      setTimeout(markBonusTimer, 200);
      break;
    default:
      break;
  }
}

function rewriteStatistic() {
  document.querySelector('.sprint-score-table').innerHTML = state.points;
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
  document.querySelector('.sprint-mute').style.display = 'none';
  document.querySelector('.click-voice').src = '';
  document.querySelector('.wrong-voice').src = '';
  document.querySelector('.gong-voice').src = '';

  document.querySelector('.sprint-unmute').style.display = 'flex';
}

function onGameVoice() {
  document.querySelector('.sprint-mute').style.display = 'flex';
  document.querySelector('.click-voice').src = 'assets/voices/pew.mp3';
  document.querySelector('.wrong-voice').src = 'assets/voices/wrong.mp3';
  document.querySelector('.gong-voice').src = 'assets/voices/gong.mp3';

  document.querySelector('.sprint-unmute').style.display = 'none';
}

function markLeftKeys() {
  document.querySelector('.sprint-wrong').style.opacity = 0.3;
  document.querySelector('.sprint-left-arrow').style.opacity = 0.3;
}

function unmarkLeftKeys() {
  document.querySelector('.sprint-wrong').style.opacity = 1.0;
  document.querySelector('.sprint-left-arrow').style.opacity = 1.0;
}

function markRightKeys() {
  document.querySelector('.sprint-correct').style.opacity = 0.5;
  document.querySelector('.sprint-right-arrow').style.opacity = 0.5;
}

function unmarkRightKeys() {
  document.querySelector('.sprint-correct').style.opacity = 1.0;
  document.querySelector('.sprint-right-arrow').style.opacity = 1.0;
}

function switchToLongTimeStatistic() {
  document.querySelector('.sprint-statistic-blocks').style.display = 'none';
  document.querySelector('.sprint-game-history').style.display = 'inline';
}

function switchToRoundStatistic() {
  document.querySelector('.sprint-statistic-blocks').style.display = 'inline';
  document.querySelector('.sprint-game-history').style.display = 'none';
}

export {
  hideIntro, callRandomFunction, showWordsInThePage,
  playWordAudio, playStatisticAudio, changeLevelAndPage,
  compareAnswers, rewriteStatistic, resetLongTimeStatistic,
  muteGameVoice, onGameVoice, rewriteCorrectAndWrongAnswers,
  markLeftKeys, markRightKeys, unmarkLeftKeys, unmarkRightKeys,
  switchToLongTimeStatistic, switchToRoundStatistic, state,
  convertDate, showCountdown, rememberLevel, getWords,
  ready, set, go, hideCountdown, resetProgress, getAllLevelWords,
  opacityOn, opacityOff, playTickAudio, playStartAudio, writeUserAnswer,
  removeShortTimeStatistic, hideBestIndicator, hideShortTimeStatistic,
  rewritePointsResult, rewriteLongTimeStatistic, showShortTimeStatistic,
};
