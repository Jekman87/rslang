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
        this.renderPage(this.pages[pageName]);
      } else {
        console.log('Страница пока не готова: ', pageName);
      }
    });

    this.subscribe('playGame', (NewGame) => {
      this.component.destroy();
      this.emit('hideHeader');
      this.renderGame(this.pages[NewGame]);
    });

    this.subscribe('mainLogout', () => {
      this.component.destroy();
      this.emit('hideHeader');

      storage.remove('currentToken');
      storage.remove('tokenExpiresIn');

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

    this.component = new NewGame('.PageContainer', this.options);
    this.component.render();
  }

  destroy() {
    this.component.destroy();
  }
}
