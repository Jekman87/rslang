import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import { storage } from '../../core/utils';

import { AUTH_PAGE_NAME } from '../../constants/menu.constants';
import BASE_SETTINGS from '../../constants/settings.constants';
import BASE_STATS from '../../constants/stats.constants';
import BASE_DATA_FOR_APP from '../../constants/data-for-app.constants';

export default class PageContainer extends Component {
  static tagName = 'main';

  static className = 'PageContainer';

  constructor($root, options) {
    super($root, {
      name: 'PageContainer',
      ...options,
    });

    this.$root = $root;
    this.options = options;
    this.pages = options.pages;
    this.component = options.startPage;
    this.dataForApp = { ...BASE_DATA_FOR_APP };
  }

  init() {
    if (this.component === AUTH_PAGE_NAME) {
      this.emit('hideHeader');
    }

    this.renderPage(this.pages[this.component]);

    this.subscribe('changePage', (pageName) => {
      if (this.pages[pageName]) {
        this.component.destroy();
        storage('currentPage', pageName);
        this.renderPage(this.pages[pageName]);
      } else {
        console.log('Страница пока не готова: ', pageName);
      }
    });

    this.subscribe('playGame', (NewGame) => {
      if (this.pages[NewGame]) {
        this.component.destroy();
        storage('currentPage', NewGame);
        this.emit('hideHeader');
        this.renderGame(this.pages[NewGame]);
      } else {
        console.log('Игра пока не готова: ', NewGame);
      }
    });

    this.subscribe('mainLogout', () => {
      this.component.destroy();
      this.dataForApp = { ...BASE_DATA_FOR_APP };
      this.options.dataForApp = this.dataForApp;
      this.options.api.clearUserLog();

      this.emit('hideHeader');
      this.renderPage(this.pages[AUTH_PAGE_NAME]);
    });
  }

  async renderPage(NewPage) {
    if (NewPage.className !== AUTH_PAGE_NAME
      && (!this.dataForApp.settings || !this.dataForApp.statistics)) {
      // add loader?
      await this.initSettingsAndStats();
      await this.initWords();
      // remove loader?
    }

    const componentOptions = { ...this.options, dataForApp: this.dataForApp };
    const element = $$.create(NewPage.tagName || 'div', NewPage.className);
    this.component = new NewPage(element, componentOptions);
    element.html(this.component.toHTML());
    this.$root.clear().append(element.$el);
    this.component.init();
  }

  renderGame(NewGame) {
    const componentOptions = { ...this.options, dataForApp: this.dataForApp };
    this.$root.clear();
    this.component = new NewGame('.PageContainer', componentOptions);
    this.component.render();
    console.log('renderGame', componentOptions);

    // одинаковый интерфейс для всех игр
    // this.component = new NewGame('.PageContainer', this.options);
    // this.component.render();
    // .PageContainer - в этот контейнер рендерится ваша игра
    // в this.options содержатся observer и api
    // чтобы вернуться в главное приложение вы можете вызвать событие
    // this.options.observer.emit('selectPage', 'MainPage');
    // чтобы выйти на страницу авторизации используйте
    // this.options.observer.emit('mainLogout');
    // в this.options.api уже содержатся token and userId
    // также в этом объекте есть все необходимые методы
    // чтобы раборало меню, поправьте название вашего класса в
    // /constants/menu.constants
  }

  async initSettingsAndStats() {
    try {
      const data = await Promise.all([
        this.options.api.getSettings(),
        this.options.api.getStatistics(),
      ]);

      [this.dataForApp.settings, this.dataForApp.statistics] = data;
    } catch (error) {
      if (error.message === '401') {
        console.log('Логаут ', error.message);
        this.emit('mainLogout');
      } else if (error.message === '404') {
        // если настроек и статистики нету - устанавливаем стандартные
        const data = await Promise.all([
          this.options.api.updateSettings(BASE_SETTINGS),
          this.options.api.updateStatistics(BASE_STATS),
        ]);

        [this.dataForApp.settings, this.dataForApp.statistics] = data;
      } else {
        console.log('Ошибка соединения: ', error.message);
      }
    }
  }

  async initWords() {
    try {
      // загружать все слова пользователя?
      // по ним смотреть что нужно повторить
      // 10-20 повторений, затем новых 20, затем повторения новых

      // подгрузка слов в зависимости от статистики и алгоритма
      // первым делом идут карты на повторение, затем новые слова
      // нет на повторении - начинаем с новых
      // преобразуем порядок слов? Составляем карточки? AggregatedWords
      const page = 0;
      const group = 0;
      const data = await Promise.all([
        this.options.api.getWords(page, group),
        this.options.api.getAllUserWords(),
      ]);

      [this.dataForApp.userCards, this.dataForApp.userWords] = data;
      console.log('userCards', this.dataForApp.userCards);
      console.log('userWords', this.dataForApp.userWords);
    } catch (error) {
      if (error.message === '401') {
        console.log('Логаут ', error.message);
        this.emit('mainLogout');
      } else {
        console.log('Другая ошибка: ', error.message);
      }
    }
  }

  destroy() {
    this.component.destroy();
  }
}
