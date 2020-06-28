import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainGameHTML from './mainGame.template';

export default class MainGame extends Component {
  static className = 'MainGame';

  constructor($root, options) {
    super($root, {
      name: 'MainGame',
      listeners: ['click'],
      ...options,
    });

    this.options = options;
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log('MainGame onClick', clickedElement);
  }

  toHTML() {
    return createMainGameHTML(this.options.settings).trim();
  }
}
