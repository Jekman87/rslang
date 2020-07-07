import './style.scss';
import { puzzleGame } from './js/templates';
import App from './js/App';

export default class Puzzle {
  constructor(container, options) {
    this.container = document.body.querySelector(container);
    this.options = options;
  }

  render() {
    this.container.innerHTML = puzzleGame;
    const app = new App(this.options.api, this.options.dataForApp.statistics);
    app.init();
  }
}
