import './style.scss';
import template from './js/englishPuzzle.template';
import App from './js/App';

export default class EnglishPuzzle {
  constructor(container, options) {
    this.container = document.body.querySelector(container);
    this.options = options;
  }

  render() {
    this.container.innerHTML = template;
    const app = new App(this.options.api);
    app.init();
  }
}
