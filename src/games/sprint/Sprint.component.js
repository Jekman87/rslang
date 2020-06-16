import './sprint.scss';
import Component from '../../core/Component.js';
import createHeaderHTML from './sprint.template.js';
import $$ from '../../core/domManipulation.js';
import { storage } from '../../core/utils.js';

export default class Sprint extends Component {
  static className = 'sprint';

  constructor($root, options) {
    super($root, {
      name: 'Sprint',
      listeners: ['click', 'keydown'],
      ...options,
    });
  }

  async onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.tagName === 'DIV') {
      console.log(14);
    }
  }

  onKeydown(event) {
    const keys = ['Enter'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      console.log(13);
    }
  }

  toHTML() {
    return createHeaderHTML(storage('lang')).trim();
  }
}
