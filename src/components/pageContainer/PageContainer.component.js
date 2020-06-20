import Component from '../../core/Component';
import $$ from '../../core/domManipulation';

// остальные страницы приложения (кроме игр?)

export default class PageContainer extends Component {
  static tagName = 'main';

  static className = 'page-container';

  constructor($root, options) {
    super($root, {
      name: 'PageContainer',
      ...options,
    });
    this.pages = options.pages || {};
    this.$root = $root;
    this.options = options;
  }

  init() {
    this.renderPage(this.pages.MainPage);
    this.subscribe('header:menu', (NewPage) => {
      console.log('subscribe', NewPage);
      this.renderPage(this.pages[NewPage]);
    });
  }

  renderPage(NewPage) {
    const element = $$.create(NewPage.tagName || 'div', NewPage.className);
    const component = new NewPage(element, this.options);
    element.html(component.toHTML());
    this.$root.clear().append(element.$el);
    component.init();
  }
}
