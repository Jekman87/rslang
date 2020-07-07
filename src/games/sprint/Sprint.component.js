import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './sprint.template';
import {
  hideIntro, callRandomFunction, showWordsInThePage, writeUserAnswer,
  playWordAudio, playStatisticAudio, resetLongTimeStatistic,
  compareAnswers, rewriteStatistic, changeLevelAndPage,
  muteGameVoice, onGameVoice,
  markLeftKeys, markRightKeys, unmarkLeftKeys, unmarkRightKeys,
  switchToLongTimeStatistic, switchToRoundStatistic, restartGame,
  keyDownListener, removeKeyDownListeners,
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
  }

  init() {
    super.init();
    callRandomFunction();
    showWordsInThePage();
    keyDownListener();
  }

  onClick(event) {
    switch (event.target.dataset.button) {
      case 'start':
        hideIntro();
        restartGame();
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
        break;
      case 'long-time-statistic':
        switchToLongTimeStatistic();
        break;
      case 'round-statistic':
        switchToRoundStatistic();
        break;
      case 'return':
        restartGame();
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

  toHTML() {
    return createGameField().trim();
  }
}
