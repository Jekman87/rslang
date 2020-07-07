import $$ from '../../../../core/domManipulation';
import Observer from '../../../../core/Observer';

export default class SpeakIt {
  constructor(selector, options) {
    // console.log(selector, typeof selector, $$(selector));
    this.$el = $$(selector);
    this.components = options.components || [];
    this.observer = new Observer();
    this.dataForApp = {
      state: {
        gameLevel: null,
        speakMode: false,
        correct: 0,
        gameWords: null,
        successWords: null,
        words: null,
      },
      mainApp: options.options,
      destroy: this.destroy.bind(this),
    };
  }

  getRoot() {
    const $root = $$.create('div', 'speakit');
    $root.addClass('container');
    const componentOptions = {
      observer: this.observer,
      dataForApp: this.dataForApp,
    };
    this.components = this.components.map((Component) => {
      const element = $$.create('div', Component.className);
      if (['intro'].includes(Component.className)) {
        element.addClass('h-100');
      }
      if (['header', 'card-container', 'score', 'cards-desk'].includes(Component.className)) {
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
      background: `linear-gradient(rgba(0,0,0,.67) 0%, rgba(0,0,0,.67) 100%), 
      url("/assets/speakit/img/bg.jpg") no-repeat center center / cover`,
    });

    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    const $body = $$(document).find('body');
    $body.attr('style', ' ');
    this.components.forEach((component) => component.destroy());
  }
}
