import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import { storage } from '../../core/utils';

import { AUTH_PAGE_NAME } from '../../constants/menu.constants';
import BASE_SETTINGS from '../../constants/settings.constants';
import BASE_STATS from '../../constants/stats.constants';

export default class PageContainer extends Component {
  static tagName = 'main';

  static className = 'PageContainer';

  constructor($root, options) {
    super($root, {
      name: 'PageContainer',
      ...options,
    });

    this.$root = $root;
    this.pages = options.pages;
    this.component = options.startPage;
    this.dataForApp = {
      settings: null,
      stats: null,
      userCards: null,
      state: {
        currentCardNum: 0,
        studiedСardNum: 0,
      },
    };

    this.options = {
      dataForApp: this.dataForApp,
      ...options,
    };
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
      this.emit('hideHeader');

      storage('userId', null);
      storage('currentToken', null);
      storage('tokenExpiresIn', null);
      storage('currentPage', null);

      this.renderPage(this.pages[AUTH_PAGE_NAME]);
    });
  }

  async renderPage(NewPage) {
    if (this.component !== AUTH_PAGE_NAME && (!this.options.settings || !this.options.stats)) {
      // add loader?
      await this.initSettingsAndStats();
      await this.initWords();
      // remove loader?
    }

    const element = $$.create(NewPage.tagName || 'div', NewPage.className);
    this.component = new NewPage(element, this.options);
    element.html(this.component.toHTML());
    this.$root.clear().append(element.$el);
    this.component.init();
  }

  renderGame(NewGame) {
    this.$root.clear();
    this.component = new NewGame('.PageContainer', this.options);
    this.component.render();

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
      // переделать в promise.all
      this.dataForApp.settings = await this.options.api.getSettings();
      this.dataForApp.stats = await this.options.api.getStatistics();
    } catch (error) {
      if (error.message === '401') {
        console.log('Логаут ', error.message);
        // this.observer.emit('mainLogout');
      } else if (error.message === '404') {
        // если настроек и статистики нету - устанавливаем стандартные
        // переделать в promise.all
        this.dataForApp.settings = await this.options.api.updateSettings(BASE_SETTINGS);
        this.dataForApp.stats = await this.options.api.updateStatistics(BASE_STATS);
      } else {
        console.log('Ошибка соединения: ', error.message);
      }
    }
  }

  async initWords() {
    try {
      // подгрузка слов в зависимости от статистики и алгоритма
      // преобразуем порядок слов? Составляем карточки? AggregatedWords
      const page = 0;
      const group = 0;
      this.dataForApp.userCards = await this.options.api.getWords(page, group);
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
    this.component.destroy();
  }
}
