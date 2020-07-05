import $$ from '../../core/domManipulation';
import Observer from '../../core/Observer';
import Api from '../../api';

import { AUTH_PAGE_NAME, MAIN_MENU_TITLES } from '../../constants/menu.constants';

export default class MainApp {
  constructor(selector, options) {
    this.$el = $$(selector);
    this.components = options.components || [];
    this.observer = null;
    this.api = null;
    this.refreshAuthTimer = null;
    this.options = options;
    this.pages = this.options.pages;
    this.startPage = this.pages[AUTH_PAGE_NAME].className;
  }

  init() {
    this.observer = new Observer();

    const userLog = this.pages[AUTH_PAGE_NAME].checkTokenValidity();
    // let time = new Date().getTime();

    if (userLog) {
      const {
        userId, userName, currentToken, refreshToken,
      } = userLog;

      this.api = new Api(userId, userName, currentToken, refreshToken);
      // переделать на currentPage из LS?
      // this.startPage = this.pages[currentPage];
      this.startPage = this.pages[MAIN_MENU_TITLES[0].data].className;
      // time = tokenExpiresIn;
    } else {
      this.api = new Api();
    }

    // this.startPage = 'MainGame';
    // console.log('time', time);

    // если время истечения tokenExpiresIn менее 20 мин - обновить токены и займер
    // если более - засекаем таймен на за 20 мин до окончания

    // this.authRefreshTimer = setTimeout(() => {
    //   // очистить прошлый таймер
    //   clearTimeout(this.refreshAuthTimer);
    //   console.log('timer');
    // }, 2000);
  }

  getRoot() {
    const $root = $$.create('div', 'main-app');
    const componentOptions = {
      observer: this.observer,
      api: this.api,
      startPage: this.startPage,
      ...this.options,
    };

    this.components = this.components.map((Component) => {
      const element = $$.create(Component.tagName || 'div', Component.className);
      const component = new Component(element, componentOptions);

      element.html(component.toHTML());
      $root.append(element);
      return component;
    });

    return $root;
  }

  async render() {
    this.init();
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
