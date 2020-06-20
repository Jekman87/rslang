import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './sprint.template';
/* import $$ from '../../core/domManipulation'; */
import {
  hideIntro, readySetGo, callRandomFunction, showWordsInThePage, writeUserAnswer,
  playClickAudio, playWordAudio,
  compareAnswers, rewriteStatistic,
} from './sprint.functions';
/* import DICTIONARY from './sprint.data'; */

export default class Sprint extends Component {
  static className = 'sprint';

  constructor($root, options) {
    super($root, {
      name: 'Sprint',
      listeners: ['click', 'keyup'],
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

    if (event.target.dataset.click === 'audio') {
      playWordAudio();
    }

    if (currentTarget.dataset.button === 'Wrong') {
      playClickAudio();
      writeUserAnswer(currentTarget.dataset.button);
      compareAnswers();
      rewriteStatistic();
    }

    if (currentTarget.dataset.button === 'Correct') {
      playClickAudio();
      writeUserAnswer(currentTarget.dataset.button);
      compareAnswers();
      rewriteStatistic();
    }
  }

  onKeyup(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      playClickAudio();
      writeUserAnswer(event.key);
      compareAnswers();
      rewriteStatistic();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      playClickAudio();
      writeUserAnswer(event.key);
      compareAnswers();
      rewriteStatistic();
    }
  }

  toHTML() {
    return createGameField().trim();
  }
}
