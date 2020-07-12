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
    this.api = options.api;
  }

  init() {
    super.init();
  }

  onClick(event) {
    const clickedElement = $$(event.target);

    if (clickedElement.hasClass('btn')) {
      if (clickedElement.data.name) {
        const pageName = clickedElement.data.name;
        this.emit('selectPage', pageName);
      }
      if (clickedElement.data.game) {
        const { game } = clickedElement.data;
        this.emit('playGame', game);
      }
    }
  }

  toHTML() {
    const data = {
      username: this.api.userName,
    };
    return createMainPageHTML(data).trim();
  }
}
