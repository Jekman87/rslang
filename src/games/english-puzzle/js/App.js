import Storage from './Storage';
import GameController from './GameController';
import Dragger from './Dragger';
import HelpersController from './HelpersController';
import DataLoader from './DataLoader';
import Logger from './Logger';
import LevelsController from './LevelsController';

export default class App {
  constructor(api) {
    this.storage = new Storage();
    this.loader = new DataLoader(this.storage);
    this.gameController = new GameController(this.storage);
    this.dragger = new Dragger();
    this.helpController = new HelpersController(this.storage);
    this.logger = new Logger(this.storage, api);
    this.lvlController = new LevelsController(this.storage);
  }

  init() {
    this.logger.init();
    this.loader.init();
    this.dragger.init();
    this.helpController.init();
    this.lvlController.init();
    this.gameController.init();
  }
}
