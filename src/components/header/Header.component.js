import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createHeaderHTML from './header.template';

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

  onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.$el.tagName.toLowerCase() === 'a') {
      // clickedElement.data.name берем название страницы и переходим на нее
      this.emit('header:menu', clickedElement.data.name);
      console.log('header onClick', clickedElement.data.name);
    }
    if (clickedElement.$el.id === 'logout') {
      // удаляем токен из локалсторажда и запускаем авторизацию
      // this.emit('header:logout');
      console.log('header onClick выход', clickedElement);
    }
  }

  toHTML() {
    return createHeaderHTML().trim();
  }
}
