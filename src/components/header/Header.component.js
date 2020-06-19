import Component from '../../core/Component';
import createHeaderHTML from './header.template';
import $$ from '../../core/domManipulation';

export default class Header extends Component {
  static tagName = 'header';

  static className = 'header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log('header onClick', clickedElement);
  }

  toHTML() {
    return createHeaderHTML().trim();
  }
}
