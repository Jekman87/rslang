import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './sprint.template';
import {
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
} from './sprint.functions';

export default class SprintGame extends Component {
  static className = 'sprint';

  constructor($root, options) {
    super($root, {
      name: 'Sprint',
      listeners: ['click', 'mousedown', 'mouseup'],
      ...options,
    });
    this.options = options;
    this.statistic = this.options.dataForApp.statistics;
    this.mainApi = this.options.api;
    this.currentTime = 60;
  }

  getResetDayTime = (resetHour) => {
    const time = new Date();
    const hour = time.getHours();
    if (hour >= resetHour) time.setDate(time.getDate() + 1);
    const resetDayTime = time.setHours(resetHour, 0);

    return resetDayTime;
  };

  init() {
    super.init();
    getWords(2, 13, 13);
  }

  onClick(event) {
    switch (event.target.dataset.button) {
      case 'start':
        rememberLevel();
        getWords(state.currentLevel);
        hideIntro();
        this.restartGame();
        getAllLevelWords();
        break;
      case 'Wrong':
        writeUserAnswer(event.target.dataset.button);
        compareAnswers();
        rewriteStatistic();
        break;
      case 'Correct':
        writeUserAnswer(event.target.dataset.button);
        compareAnswers();
        rewriteStatistic();
        break;
      default:
        break;
    }

    switch (event.target.dataset.click) {
      case 'minus-level':
        changeLevelAndPage(event.target.dataset.click);
        rememberLevel();
        break;
      case 'plus-level':
        changeLevelAndPage(event.target.dataset.click);
        rememberLevel();
        break;
      case 'mute':
        muteGameVoice();
        break;
      case 'unmute':
        onGameVoice();
        break;
      case 'audio':
        playWordAudio();
        break;
      case 'home':
        this.destroy();
        removeKeyDownListeners.call(this);
        this.options.observer.emit('selectPage', 'MainPage');
        break;
      case 'destroy':
        resetLongTimeStatistic();
        this.statistic.optional.SprintLong = JSON.stringify([]);
        break;
      case 'long-time-statistic':
        switchToLongTimeStatistic();
        break;
      case 'round-statistic':
        switchToRoundStatistic();
        break;
      case 'return':
        this.restartGame();
        break;
      default:
        break;
    }

    if (event.target.dataset.statistic) {
      playStatisticAudio(event.target.dataset.statistic.split('-')[1]);
    }
  }

  onMousedown(event) {
    switch (event.target.dataset.button) {
      case 'Wrong':
        markLeftKeys();
        break;
      case 'Correct':
        markRightKeys();
        break;
      default:
        break;
    }
  }

  onMouseup(event) {
    switch (event.target.dataset.button) {
      case 'Wrong':
        unmarkLeftKeys();
        break;
      case 'Correct':
        unmarkRightKeys();
        break;
      default:
        break;
    }
  }

  readySetGo() {
    setTimeout(ready, 500);
    setTimeout(opacityOn, 500);
    setTimeout(playTickAudio, 1000);
    setTimeout(opacityOff, 1500);
    setTimeout(set, 2000);
    setTimeout(opacityOn, 2000);
    setTimeout(playTickAudio, 2500);
    setTimeout(opacityOff, 3000);
    setTimeout(go, 3500);
    setTimeout(opacityOn, 3500);
    setTimeout(playTickAudio, 4000);
    setTimeout(opacityOff, 4500);
    setTimeout(playStartAudio, 5000);
    setTimeout(hideCountdown, 5000);
    setTimeout(this.countdown, 5000);
    setTimeout(keyDownListener.bind(this), 5000);
  }

  prepareStatisticForSend(roundResult) {
    let sprintLongStatistic = [];

    if (this.statistic.optional.SprintLong) {
      sprintLongStatistic = JSON.parse(this.statistic.optional.SprintLong);
    }

    if (sprintLongStatistic.length < 15) {
      sprintLongStatistic.push(roundResult);
    } else {
      sprintLongStatistic.shift();
      sprintLongStatistic.push(roundResult);
    }

    this.statistic.optional.SprintLong = JSON.stringify(sprintLongStatistic);
    this.mainApi.updateStatistics(this.statistic);
  }

  prepareLongTimeStatistic(objectWithStatistic) {
    return `
      <div class="sprint-statistic-block sprint-long-time">
      <span><i class="fas fa-rabbit"></i></span>
      <div class="sprint-information-block">
        <span>${convertDate(objectWithStatistic.date)}</span>
        <span>результат игры - ${objectWithStatistic.points};</span>
        <span>правильных ответов - ${objectWithStatistic.result.split('-')[0]};</span>
        <span>ошибок - ${objectWithStatistic.result.split('-')[1]}.</span>
      </div>
    </div>
    `.trim();
  }

  showLongTimeStatistic() {
    let arrayWithStatisic = [];

    if (this.statistic.optional.SprintLong) {
      arrayWithStatisic = (JSON.parse(this.statistic.optional.SprintLong)).reverse();
    }

    document.querySelector('.sprint-games').innerHTML = '';

    arrayWithStatisic.forEach((el) => document.querySelector('.sprint-games')
      .insertAdjacentHTML('beforeend', `${this.prepareLongTimeStatistic(el)}`));
  }

  countdown = () => {
    let timer;

    if (document.querySelector('.sprint-timer') === null) {
      clearTimeout(timer);
      return false;
    }

    this.currentTime -= 1;
    document.querySelector('.sprint-timer').innerHTML = this.currentTime;

    if (this.currentTime < 1) {
      clearTimeout(timer);
      rewritePointsResult();
      rewriteCorrectAndWrongAnswers();
      this.prepareStatisticForSend(rewriteLongTimeStatistic());
      showShortTimeStatistic();
      this.showLongTimeStatistic();
      removeKeyDownListeners.call(this);
    } else {
      timer = setTimeout(this.countdown, 1000);
    }
    return true;
  }

  restartTimer() {
    this.currentTime = 60;
  }

  restartGame() {
    this.restartTimer();
    removeShortTimeStatistic();
    hideBestIndicator();
    resetProgress();
    hideShortTimeStatistic();
    showCountdown();
    this.readySetGo();
    callRandomFunction();
    showWordsInThePage();
  }

  keyUp = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        writeUserAnswer(event.key);
        compareAnswers();
        this.addBonusTime();
        rewriteStatistic();
        unmarkLeftKeys();
        break;
      case 'ArrowRight':
        event.preventDefault();
        writeUserAnswer(event.key);
        compareAnswers();
        this.addBonusTime();
        rewriteStatistic();
        unmarkRightKeys();
        break;
      default:
        return true;
    }
    return true;
  }

  keyDown(event) {
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

  addBonusTime = () => {
    switch (state.comboAnswers) {
      case 4:
        this.currentTime += 3;
        break;
      case 8:
        this.currentTime += 5;
        break;
      case 12:
        this.currentTime += 10;
        break;
      default:
        break;
    }
  }

  toHTML() {
    return createGameField().trim();
  }
}

function keyDownListener() {
  document.addEventListener('keydown', this.keyDown);
  document.addEventListener('keyup', this.keyUp);
}

function removeKeyDownListeners() {
  document.removeEventListener('keydown', this.keyDown);
  document.removeEventListener('keyup', this.keyUp);
}
