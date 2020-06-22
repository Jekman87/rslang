import $$ from '../../../../core/domManipulation';
import Observer from '../../../../core/Observer';

export default class SpeakIt {
  constructor(selector, options) {
    this.$el = $$(selector);
    this.components = options.components || [];
    this.observer = new Observer();
    this.dataForApp = { state: { speakMode: false, correct: 0 } };
  }

  getRoot() {
    const $root = $$.create('div', 'speakit');
    $root.addClass('container');
    const componentOptions = { observer: this.observer, dataForApp: this.dataForApp };
    this.components = this.components.map((Component) => {
      const element = $$.create('div', Component.className);
      if (['Intro', 'Results'].includes(Component.name)) {
        element.addClass('h-100');
      }
      if (Component.name !== 'Intro') {
        element.addClass('d-none');
      }
      const component = new Component(element, componentOptions);
      element.html(component.toHTML());
      $root.append(element);
      return component;
    });

    return $root;
  }

  render() {
    const $body = $$(document).find('body');
    $body.css({
      background: `radial-gradient(
      circle,
      rgba(238, 174, 202, 1) 0%,
      rgba(148, 187, 233, 1) 100%
    )`,
    });
    // $body.attr('style', ' ');
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
