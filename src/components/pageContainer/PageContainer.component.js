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
    this.pages = options.pages || {};
  }

  init() {
    this.renderPage(this.pages.MainPage);
    this.subscribe('header:menu', (NewPage) => {
      if (this.pages[NewPage]) {
        this.component.destroy();
        this.renderPage(this.pages[NewPage]);
      } else {
        console.log('Страница пока не готова: ', NewPage);
      }
    });
  }

  renderPage(NewPage) {
    const element = $$.create(NewPage.tagName || 'div', NewPage.className);
    this.component = new NewPage(element, this.options);
    element.html(this.component.toHTML());
    this.$root.clear().append(element.$el);
    this.component.init();
  }
}
