import $$ from '../../core/domManipulation';
import MainPage from '../mainPage';
// остальные страницы приложения (кроме игр?)

export default class PageContainer {
  static tagName = 'main';

  static className = 'page-container';

  constructor($root, options) {
    this.$root = $root;
    this.options = options;
  }

  init() {
    this.renderPage(MainPage);
  }

  renderPage(NewPage) {
    const element = $$.create(NewPage.tagName || 'div', NewPage.className);
    const component = new NewPage(element, this.options);
    element.html(component.toHTML());
    this.$root.clear().append(element.$el);
    component.init();
  }

  toHTML() {
    return '';
  }
}
