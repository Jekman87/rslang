import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createHeaderHTML from './header.template';
import { MAIN_MENU_TITLES, GAME_MENU_TITLES } from '../../constants/menu.constants';

export default class Header extends Component {
  static tagName = 'header';

  static className = 'Header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
    const header = $$('header');

    this.subscribe('selectPage', (pageName) => {
      header.removeClass('d-none');
      this.changeMenuItem(pageName);
      this.emit('changePage', pageName);
    });

    this.subscribe('hideHeader', () => {
      header.addClass('d-none');
    });

    this.subscribe('mainAppSpinner', (isShow) => {
      const spinner = this.$root.find('.main-app-sp');
      if (isShow) {
        spinner.removeClass('d-none');
      } else {
        spinner.addClass('d-none');
      }
    });
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    const clickedTag = clickedElement.$el.tagName.toLowerCase();

    if (clickedTag === 'a') {
      const pageName = clickedElement.data.name;
      const isMainMenuEl = MAIN_MENU_TITLES.some((title) => title.data === pageName);

      if (isMainMenuEl && pageName !== 'games') {
        this.emit('selectPage', pageName);
      } else {
        const isGameMenuEl = GAME_MENU_TITLES.some((title) => title.data === pageName);

        if (isGameMenuEl) {
          this.emit('playGame', pageName);
        }
      }
    } else if (clickedElement.$el.id === 'logout') {
      this.emit('mainLogout');
    }
  }

  changeMenuItem(pageName) {
    const menu = $$('.navbar-nav');
    const menuItems = menu.findAll('li');
    menuItems.forEach((item) => $$(item).removeClass('active'));

    const menuLink = menu.find(`[data-name=${pageName}]`);
    const menuItem = $$(menuLink.$el.closest('li'));
    menuItem.addClass('active');
  }

  toHTML() {
    return createHeaderHTML().trim();
  }
}
