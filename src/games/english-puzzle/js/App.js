import Storage from './Storage';
import Reporter from './Reporter';
import GameController from './GameController';
import Dragger from './Dragger';
import HelpersController from './HelpersController';
import DataLoader from './DataLoader';
import LevelsController from './LevelsController';

export default class App {
  constructor(api, statistics, settings, observer) {
    this.storage = new Storage(api, statistics, settings);
    this.reporter = new Reporter();
    this.loader = new DataLoader(this.storage, this.reporter, observer);
    this.gameController = new GameController(this.storage, this.reporter, observer);
    this.dragger = new Dragger();
    this.helpController = new HelpersController(this.storage);
    this.lvlController = new LevelsController(this.storage);
  }

  init() {
    this.storage.init();
    this.loader.init();
    this.dragger.init();
    this.helpController.init();
    this.lvlController.init();
    this.gameController.init();
    this.start();
  }

  start() {
    this.startPageBg = new Image();
    this.startPageBg.onload = () => document.querySelector('div.start-page').classList.remove('invisible');
    this.startPageBg.src = '/assets/puzzle/img/start-page.jpg';
    document.body.style.background = 'none';
  }

  destoy() {
    this.storage.destroy();
    this.loader.destroy();
    this.dragger.destroy();
    this.helpController.destroy();
    this.lvlController.destroy();
    this.gameController.destroy();
    this.startPageBg.onload = '';
    document.body.style.background = '';
  }
}
