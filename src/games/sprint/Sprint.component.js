import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './sprint.template';
import {
  hideIntro, callRandomFunction, showWordsInThePage,
  playWordAudio, playStatisticAudio, changeLevelAndPage,
  compareAnswers, rewriteStatistic, resetLongTimeStatistic,
  muteGameVoice, onGameVoice, rewriteCorrectAndWrongAnswers,
  markLeftKeys, markRightKeys, unmarkLeftKeys, unmarkRightKeys,
  switchToLongTimeStatistic, switchToRoundStatistic,
  removeKeyDownListeners, convertDate, showCountdown,
  ready, set, go, hideCountdown, keyDownListener, resetProgress,
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

  init() {
    super.init();
    callRandomFunction();
    showWordsInThePage();
  }

  onClick(event) {
    switch (event.target.dataset.button) {
      case 'start':
        hideIntro();
        this.restartGame();
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
        break;
      case 'plus-level':
        changeLevelAndPage(event.target.dataset.click);
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
        removeKeyDownListeners();
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
    setTimeout(keyDownListener, 5000);
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
      <div class="sprint-statistic-block long-time">
      <span><i class="fas fa-rabbit"></i></span>
      <div class="sprint-information-block">
        <span>${convertDate(objectWithStatistic.date)}</span>
        <span>результат игры - ${objectWithStatistic.result};</span>
        <span>правильных ответов - ${objectWithStatistic.correctAnswers};</span>
        <span>ошибок - ${objectWithStatistic.wrongAnswers}.</span>
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

    if (document.querySelector('.timer') === null) {
      clearTimeout(timer);
      return false;
    }

    this.currentTime -= 1;
    document.querySelector('.timer').innerHTML = this.currentTime;

    if (this.currentTime < 1) {
      clearTimeout(timer);
      rewritePointsResult();
      rewriteCorrectAndWrongAnswers();
      this.prepareStatisticForSend(rewriteLongTimeStatistic());
      showShortTimeStatistic();
      this.showLongTimeStatistic();
      removeKeyDownListeners();
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

  toHTML() {
    return createGameField().trim();
  }
}
