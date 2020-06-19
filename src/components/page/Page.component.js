import Component from '../../core/Component';
import createPageHTML from './page.template';
import $$ from '../../core/domManipulation';

export default class Header extends Component {
  static tagName = 'main';

  static className = 'page';

  constructor($root, options) {
    super($root, {
      name: 'Page',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log('page onClick', clickedElement);
  }

  toHTML() {
    return createPageHTML().trim();
  }
}
