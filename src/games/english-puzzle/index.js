import './style.scss';
import template from './js/englishPuzzle.template';
import App from './js/App';

export default class Puzzle {
  constructor(container, options) {
    this.container = document.body.querySelector(container);
    this.options = options;
  }

  render() {
    this.container.innerHTML = template;
    const app = new App(this.options.api, this.options.dataForApp.statistics);
    app.init();
  }
}
