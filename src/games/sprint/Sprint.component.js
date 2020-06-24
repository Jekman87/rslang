import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './sprint.template';
import {
  hideIntro, readySetGo, callRandomFunction, showWordsInThePage, writeUserAnswer,
  playWordAudio, playStatisticAudio, cleanLongTimeStatistic,
  compareAnswers, rewriteStatistic,
  muteGameVoice, onGameVoice,
  markLeftKeys, markRightKeys, unmarkLeftKeys, unmarkRightKeys,
  switchToLongTimeStatistic, switchToRoundStatistic,
} from './sprint.functions';

export default class Sprint extends Component {
  static className = 'sprint';

  constructor($root, options) {
    super($root, {
      name: 'Sprint',
      listeners: ['click', 'mousedown', 'mouseup', 'keyup', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();
    callRandomFunction();
    showWordsInThePage();
  }

  onClick(event) {
    switch (event.target.dataset.button) {
      case 'start':
        hideIntro(this.$root);
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
      case 'return':
        location.reload();
        break;
      case 'destroy':
        cleanLongTimeStatistic();
        break;
      case 'long-time-statistic':
        switchToLongTimeStatistic();
        break;
      case 'round-statistic':
        switchToRoundStatistic();
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

  onKeyup(event) {
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
        console.log();
    }
  }

  onKeydown(event) {
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
        console.log();
    }
  }

  toHTML() {
    return createGameField().trim();
  }
}
