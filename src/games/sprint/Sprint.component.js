import './scss/sprint.scss';

import Component from '../../core/Component';
import createGameField from './sprint.template';
import $$ from '../../core/domManipulation';
import { hideIntro, readySetGo, check } from './sprint.functions';
import DICTIONARY from './sprint.data';

export default class Sprint extends Component {
  static className = 'sprint';

  constructor($root, options) {
    super($root, {
      name: 'Sprint',
      listeners: ['click', 'keydown'],
      ...options,
    });
    this.time = 60;
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    const currentTarget = event.target;
    if (currentTarget.dataset.button === 'start') {
      hideIntro(this.$root);
      readySetGo();
    }
  }

  onKeydown(event) {
    const keys = ['Enter'];
    if (keys.includes(event.key)) {
      event.preventDefault();
    }
  }

  toHTML() {
    return createGameField().trim();
  }
}
