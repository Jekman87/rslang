import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createHeaderHTML from './header.template';
import { mainMenuTitles, gameMenuTitles } from '../../constants/menu.constants';

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
    const clickedTag = clickedElement.$el.tagName.toLowerCase();
    const tagData = clickedElement.data;

    if (clickedTag === 'a') {
      const isMainMenuEl = mainMenuTitles.some((title) => title.data === tagData.name);

      if (isMainMenuEl && tagData.name !== 'games') {
        this.changeMenuItem(clickedElement);
        this.emit('header:menu', tagData.name);
      } else {
        const isGameMenuEl = gameMenuTitles.some((title) => title.data === tagData.name);

        if (isGameMenuEl) {
          console.log('GameMenu', tagData.name);
          // запускаем игру
          // this.emit('header:menu', tagData.name);
        }
      }
    } else if (clickedElement.$el.id === 'logout') {
      // удаляем токен из локалсторажда и запускаем авторизацию
      // this.emit('header:logout');
      console.log('header onClick выход', clickedElement);
    }
  }

  changeMenuItem(clickedElement) {
    const menu = $$('.navbar-nav');
    const menuItems = menu.findAll('li');
    menuItems.forEach((item) => $$(item).removeClass('active'));
    const parentClickedElement = $$(clickedElement.$el.closest('li'));
    parentClickedElement.addClass('active');
  }

  toHTML() {
    return createHeaderHTML().trim();
  }
}
