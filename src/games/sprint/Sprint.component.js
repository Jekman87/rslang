import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './sprint.template';
import {
  hideIntro, readySetGo, callRandomFunction, showWordsInThePage, writeUserAnswer,
  playWordAudio, playStatisticAudio, resetLongTimeStatistic,
  compareAnswers, rewriteStatistic,
  muteGameVoice, onGameVoice,
  markLeftKeys, markRightKeys, unmarkLeftKeys, unmarkRightKeys,
  switchToLongTimeStatistic, switchToRoundStatistic, keyDownListener, restartGame,
} from './sprint.functions';

export default class Sprint extends Component {
  static className = 'sprint';

  constructor($root, options) {
    super($root, {
      name: 'Sprint',
      listeners: ['click', 'mousedown', 'mouseup'],
      ...options,
    });
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
        readySetGo();
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
        console.log();
    }

    switch (event.target.dataset.click) {
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
        location.reload(true);
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
        console.log();
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
        console.log();
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
        console.log();
    }
  }

  toHTML() {
    return createGameField().trim();
  }
}
