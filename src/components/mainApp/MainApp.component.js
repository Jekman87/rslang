import $$ from '../../core/domManipulation';
import Observer from '../../core/Observer';

export default class MainApp {
  constructor(selector, options) {
    this.$el = $$(selector);
    this.components = options.components || [];
    this.observer = new Observer();
    this.dataForApp = {};
  }

  getRoot() {
    const $root = $$.create('div', 'main-app');

    const componentOptions = { observer: this.observer, dataForApp: this.dataForApp };
    this.components = this.components.map((Component) => {
      const element = $$.create(Component.tagName, Component.className);
      const component = new Component(element, componentOptions);

      element.html(component.toHTML());
      $root.append(element);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
