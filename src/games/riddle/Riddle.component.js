import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './riddle.template';
import {
  hideIntroScreen, hideTwoWrongAnswers,
  changeLevelAndPage, chooseRiddleInformation, fillGameFields,
  showOrHideTranslatePrompt, showOrHideOptionsPrompt,
  compareAnswers, moveAnswerIntoInput, passHandler,
  showStatistic, recountStatistic, removeStatistic,
  showCorrectPartOfStatistic, showWrongPartOfStatistic,
  backToStatisticScreen, backToGameFromStatistic,
} from './riddle.functions';

export default class Riddle extends Component {
  static className = 'riddle';

  constructor($root, options) {
    super($root, {
      name: 'Riddle',
      listeners: ['click', 'submit'],
      ...options,
    });
    this.options = options;
  }

  init() {
    super.init();
  }

  onClick() {
    switch (event.target.dataset.click) {
      case 'start':
        hideIntroScreen();
        break;
      case 'minus-level':
        changeLevelAndPage(event.target.dataset.click);
        break;
      case 'plus-level':
        changeLevelAndPage(event.target.dataset.click);
        break;
      case 'minus-page':
        changeLevelAndPage(event.target.dataset.click);
        break;
      case 'plus-page':
        changeLevelAndPage(event.target.dataset.click);
        break;
      case 'start-game':
        chooseRiddleInformation();
        fillGameFields();
        break;
      case 'show-options':
        showOrHideOptionsPrompt();
        break;
      case 'show-translate':
        showOrHideTranslatePrompt();
        break;
      case 'check':
        compareAnswers();
        break;
      case 'pass':
        passHandler();
        break;
      case 'remove-wrong':
        hideTwoWrongAnswers();
        break;
      case 'statistic':
        recountStatistic();
        showStatistic();
        break;
      case 'correct-answers':
        showCorrectPartOfStatistic();
        break;
      case 'wrong-answers':
        showWrongPartOfStatistic();
        break;
      case 'return-statistic':
        backToStatisticScreen();
        break;
      case 'remove-statistic':
        removeStatistic();
        recountStatistic();
        break;
      case 'return':
        backToGameFromStatistic();
        break;
      case 'home':
        location.reload(true);
        break;
      default:
        console.log();
    }

    if (event.target.classList.contains('answer-block')) {
      moveAnswerIntoInput(event.target, event.target.textContent);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    compareAnswers();
  }

  toHTML() {
    return createGameField().trim();
  }
}
