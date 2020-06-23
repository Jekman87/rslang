import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './sprint.template';
/* import $$ from '../../core/domManipulation'; */
import {
  hideIntro, readySetGo, callRandomFunction, showWordsInThePage, writeUserAnswer,
  playWordAudio, playStatisticAudio, cleanLongTimeStatistic,
  compareAnswers, rewriteStatistic,
  muteGameVoice, onGameVoice,
  markLeftKeys, markRightKeys, unmarkLeftKeys, unmarkRightKeys,
  switchToLongTimeStatistic, switchToRoundStatistic,
} from './sprint.functions';
/* import DICTIONARY from './sprint.data'; */

export default class Sprint extends Component {
  static className = 'sprint';

  constructor($root, options) {
    super($root, {
      name: 'Sprint',
      listeners: ['click', 'mousedown', 'mouseup', 'keyup', 'keydown'],
      ...options,
    });
    this.time = 60;
  }

  init() {
    super.init();
    callRandomFunction();
    showWordsInThePage();
  }

  onClick(event) {
    /* const clickedElement = $$(event.target); */
    const currentTarget = event.target;

    if (currentTarget.dataset.button === 'start') {
      hideIntro(this.$root);
      readySetGo();
    }

    /* if (clickedElement.$el) {
      console.log(event.target.dataset.click);
    } */

    if (event.target.dataset.click === 'mute') {
      muteGameVoice();
    }

    if (event.target.dataset.click === 'unmute') {
      onGameVoice();
    }

    if (event.target.dataset.click === 'audio') {
      playWordAudio();
    }

    if (event.target.dataset.statistic) {
      playStatisticAudio(event.target.dataset.statistic.split('-')[1]);
    }

    if (currentTarget.dataset.button === 'Wrong') {
      writeUserAnswer(currentTarget.dataset.button);
      compareAnswers();
      rewriteStatistic();
    }

    if (currentTarget.dataset.button === 'Correct') {
      writeUserAnswer(currentTarget.dataset.button);
      compareAnswers();
      rewriteStatistic();
    }

    if (event.target.dataset.click === 'return') {
      location.reload();
    }

    if (event.target.dataset.click === 'destroy') {
      cleanLongTimeStatistic();
    }
    if (event.target.dataset.click === 'long-time-statistic') {
      switchToLongTimeStatistic();
    }

    if (event.target.dataset.click === 'round-statistic') {
      switchToRoundStatistic();
    }
  }

  onMousedown(event) {
    if (event.target.dataset.button === 'Wrong') {
      markLeftKeys();
    }

    if (event.target.dataset.button === 'Correct') {
      markRightKeys();
    }
  }

  onMouseup(event) {
    if (event.target.dataset.button === 'Wrong') {
      unmarkLeftKeys();
    }

    if (event.target.dataset.button === 'Correct') {
      unmarkRightKeys();
    }
  }

  onKeyup(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      writeUserAnswer(event.key);
      compareAnswers();
      rewriteStatistic();
      unmarkLeftKeys();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      writeUserAnswer(event.key);
      compareAnswers();
      rewriteStatistic();
      unmarkRightKeys();
    }
  }

  onKeydown(event) {
    if (event.key === 'ArrowLeft') {
      markLeftKeys();
    }
    if (event.key === 'ArrowRight') {
      markRightKeys();
    }
  }

  toHTML() {
    return createGameField().trim();
  }
}
