import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainPageHTML from './mainPage.template';

export default class MainPage extends Component {
  static className = 'mainPage';

  constructor($root, options) {
    super($root, {
      name: 'MainPage',
      listeners: ['click'],
      ...options,
    });
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log('MainPage onClick', clickedElement);
  }

  toHTML() {
    return createMainPageHTML().trim();
  }
}
