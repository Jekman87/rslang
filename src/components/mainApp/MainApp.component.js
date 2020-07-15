import $$ from '../../core/domManipulation';
import Observer from '../../core/Observer';
import Api from '../../api';

import { AUTH_PAGE_NAME, MAIN_MENU_TITLES } from '../../constants/menu.constants';

const timeToRefresh = 20 * 60 * 1000;
const tokenLifeTime = 4 * 60 * 60 * 1000;

export default class MainApp {
  constructor(selector, options) {
    this.$el = $$(selector);
    this.options = options;
    this.components = options.components || [];
    this.pages = options.pages;
    this.startPage = null;
    this.observer = null;
    this.api = null;
    this.refreshAuthTimer = null;
  }

  async init() {
    this.observer = new Observer();
    this.api = new Api();

    const isAuthorized = this.api.checkTokenValidity();
    let expTime;

    if (isAuthorized) {
      // переделать на currentPage из LS?
      // this.startPage = this.pages[currentPage];
      this.startPage = this.pages[MAIN_MENU_TITLES[0].data].className;
      // this.startPage = 'MainGame';
      expTime = this.api.tokenExpiresIn;
    } else {
      this.startPage = this.pages[AUTH_PAGE_NAME].className;
      expTime = new Date().getTime() + tokenLifeTime;
    }

    if (expTime - new Date().getTime() < timeToRefresh) {
      // обработка ошибок
      await this.api.getNewTokens();
      this.createRefreshTokenTimer(this.api.tokenExpiresIn);
    } else {
      this.createRefreshTokenTimer(expTime);
    }
  }

  createRefreshTokenTimer(expTime) {
    const refreshTime = expTime - new Date().getTime() - timeToRefresh;

    this.authRefreshTimer = setTimeout(async () => {
      clearTimeout(this.refreshAuthTimer);
      // обработка ошибок
      await this.api.getNewTokens();
      this.createRefreshTokenTimer(this.api.tokenExpiresIn);
    }, refreshTime);
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
    clearTimeout(this.refreshAuthTimer);
    this.components.forEach((component) => component.destroy());
  }
}
