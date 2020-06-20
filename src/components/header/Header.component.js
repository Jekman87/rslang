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
      const itemName = clickedElement.data.name;
      // clickedElement.data.name берем название страницы и переходим на нее
      // переключение меню
      this.changeMenuItem(itemName);

      this.emit('header:menu', itemName);
      console.log('header onClick', itemName);
    }
    if (clickedElement.$el.id === 'logout') {
      // удаляем токен из локалсторажда и запускаем авторизацию
      // this.emit('header:logout');
      console.log('header onClick выход', clickedElement);
    }
  }

  changeMenuItem(itemName) {
    const menu = $$('.navbar-nav');
    console.log('changeMenuItem', itemName);
    console.log('menu', menu);
  }

  toHTML() {
    return createHeaderHTML().trim();
  }
}
