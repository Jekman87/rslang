import Storage from './Storage';
import Reporter from './Reporter';
import GameController from './GameController';
import Dragger from './Dragger';
import HelpersController from './HelpersController';
import DataLoader from './DataLoader';
import LevelsController from './LevelsController';

export default class App {
  constructor(api, statistics) {
    this.storage = new Storage(api, statistics);
    this.reporter = new Reporter();
    this.loader = new DataLoader(this.storage, this.reporter);
    this.gameController = new GameController(this.storage, this.reporter);
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
  }
}
