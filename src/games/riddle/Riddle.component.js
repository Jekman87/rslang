import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './riddle.template';

export default class Riddle extends Component {
  static className = 'riddle';

  constructor($root, options) {
    super($root, {
      name: 'Riddle',
      listeners: ['click'],
      ...options,
    });
    this.options = options;
  }

  init() {
    super.init();
  }

  onClick() {
  }

  toHTML() {
    return createGameField().trim();
  }
}
