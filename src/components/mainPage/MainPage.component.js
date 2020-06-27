import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainPageHTML from './mainPage.template';

export default class MainPage extends Component {
  static className = 'MainPage';

  constructor($root, options) {
    super($root, {
      name: 'MainPage',
      listeners: ['click'],
      ...options,
    });

    this.pages = options.pages;
  }

  init() {
    super.init();
    // подписка на события внутри компонента
  }

  onClick(event) {
    const clickedElement = $$(event.target);

    if (clickedElement.hasClass('btn')) {
      const pageName = clickedElement.data.name;
      this.emit('selectPage', pageName);
    }
  }

  toHTML() {
    return createMainPageHTML().trim();
  }
}