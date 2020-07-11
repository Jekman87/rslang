import $$ from '../../core/domManipulation';

import SprintGame from './Sprint.component';

export default class Sprint {
  constructor(selector, options) {
    this.$el = $$(selector);
    this.components = [SprintGame];
    this.observer = options.observer;
    this.options = options;
  }

  getRoot() {
    const $root = $$.create('div', 'sprint-container');

    this.components = this.components.map((Component) => {
      const element = $$.create('div', Component.className);
      const component = new Component(element, this.options);

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
