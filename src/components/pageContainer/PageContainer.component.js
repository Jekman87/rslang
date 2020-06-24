import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import { storage } from '../../core/utils';
import { authPageName } from '../../constants/menu.constants';

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
  }

  init() {
    if (this.component === authPageName) {
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
      this.component.destroy();
      storage('currentPage', NewGame);
      this.emit('hideHeader');
      this.renderGame(this.pages[NewGame]);
    });

    this.subscribe('mainLogout', () => {
      this.component.destroy();
      this.emit('hideHeader');

      storage.remove('userId');
      storage.remove('currentToken');
      storage.remove('tokenExpiresIn');
      storage.remove('currentPage');

      this.renderPage(this.pages[authPageName]);
    });
  }

  renderPage(NewPage) {
    const element = $$.create(NewPage.tagName || 'div', NewPage.className);
    this.component = new NewPage(element, this.options);
    element.html(this.component.toHTML());
    this.$root.clear().append(element.$el);
    this.component.init();
  }

  renderGame(NewGame) {
    this.$root.clear();
    // одинаковый интерфейс для всех игр
    // this.component = new NewGame('.PageСontainer', this.options);
    // this.component.render();

    // .PageСontainer - в этот контейнер рендерится ваша игра
    // в this.options содержатся observer и api
    // чтобы вернуться в главное приложение вы можете вызвать событие
    // this.options.observer.emit('selectPage', 'MainPage');
    // чтобы выйти на страницу авторизации используйте
    // this.options.observer.emit('mainLogout');
    // в this.options.api уже содержатся token and userId
    // также в этом объекте есть все необходимые методы
    // чтобы раборало меню, поправьте название вашего класса в
    // /constants/menu.constants
    console.log('Игра пока не готова: ', NewGame);
  }

  destroy() {
    this.component.destroy();
  }
}
