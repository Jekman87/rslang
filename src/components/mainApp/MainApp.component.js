import $$ from '../../core/domManipulation';
import Observer from '../../core/Observer';

import BASE_SETTINGS from '../../constants/settings.constants';
import BASE_STATS from '../../constants/stats.constants';

export default class MainApp {
  constructor(selector, options) {
    this.$el = $$(selector);
    this.components = options.components || [];
    this.observer = new Observer();
    this.options = options;
    this.settings = null;
    this.stats = null;
    this.dataForApp = {
      userWords: null,
    };
  }

  getRoot() {
    const $root = $$.create('div', 'main-app');

    const componentOptions = {
      observer: this.observer,
      settings: this.settings,
      stats: this.stats,
      dataForApp: this.dataForApp,
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
    await this.initSettingsAndStats();
    await this.initWords();
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  async initSettingsAndStats() {
    try {
      // переделать в promise.all
      this.settings = await this.options.api.getSettings();
      this.stats = await this.options.api.getStatistics();
      // пробуем забрать с бекенда
      // если не получилось - стандартные настройки
      // const newStats = await this.options.api.updateSettings(BASE_SETTINGS);
      // const newStats = await this.options.api.updateStatistics(BASE_STATS);
      // console.log('settings', this.settings);
      // console.log('stats', this.stats);
    } catch (error) {
      if (error.message === '401') {
        console.log('Логаут ', error.message);
        // this.observer.emit('mainLogout');
      } else {
        console.log('Другая ошибка: ', error.message);
      }
    }

    // подгрузка слов в зависимости от статистики
    // загружаем партию слов с бекенда в зависимости от алгоритма
  }

  async initWords() {
    try {
      // подгрузка слов в зависимости от статистики и алгоритма
      // преобразуем порядок слов? Составляем карточки? AggregatedWords

      const page = 0;
      const group = 0;
      this.dataForApp.userWords = await this.options.api.getWords(page, group);

      console.log('words', this.dataForApp.userWords);
    } catch (error) {
      if (error.message === '401') {
        console.log('Логаут ', error.message);
        // this.observer.emit('mainLogout');
      } else {
        console.log('Другая ошибка: ', error.message);
      }
    }
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
