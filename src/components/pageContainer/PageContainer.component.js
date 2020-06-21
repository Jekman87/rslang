import Component from '../../core/Component';
import $$ from '../../core/domManipulation';

export default class PageContainer extends Component {
  static tagName = 'main';

  static className = 'page-container';

  constructor($root, options) {
    super($root, {
      name: 'PageContainer',
      ...options,
    });
    this.$root = $root;
    this.options = options;
    this.pages = options.pages;
  }

  init() {
    this.renderPage(this.pages.MainPage);

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
    // this.component = new NewGame('.page-container', this.options);
    // this.component.render();
    console.log('Игра пока не готова: ', NewGame);
  }

  destroy() {
    this.component.destroy();
  }
}
