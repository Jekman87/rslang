import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainGameHTML from './MainGame.template';

export default class MainGame extends Component {
  static className = 'mainGame';

  constructor($root, options) {
    super($root, {
      name: 'MainGame',
      listeners: ['click'],
      ...options,
    });
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log('MainGame onClick', clickedElement);
  }

  toHTML() {
    return createMainGameHTML().trim();
  }
}
