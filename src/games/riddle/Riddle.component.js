import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './riddle.template';
import {
  hideIntroScreen, changeLevelAndPage, chooseRiddleInformation, fillGameFields, click,
  showOrHideTranslatePrompt, showOrHideOptionsPrompt,
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
      case 'remove-wrong':
        console.log(15);
        break;
      default:
        console.log();
    }
  }

  onSubmit(event) {
    event.preventDefault();
  }

  toHTML() {
    return createGameField().trim();
  }
}
