import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './riddle.template';
import {
  hideIntroScreen, hideTwoWrongAnswers,
  changeLevelAndPage, chooseRiddleInformation, fillGameFields, click,
  showOrHideTranslatePrompt, showOrHideOptionsPrompt,
  compareAnswers, moveAnswerIntoInput, passHandler,
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
    click();
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
        document.querySelector('.statistic-screen').style.display = 'flex';
        break;
      case 'return':
        document.querySelector('.statistic-screen').style.display = 'none';
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
