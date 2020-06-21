import GameController from './GameController';
import Dragger from './Dragger';
import HelpersController from './HelpersController';
import DataLoader from './DataLoader';
import Logger from './Logger';
import LevelsController from './LevelsController';

export default class App {
  constructor() {
    this.loader = new DataLoader();
    this.gameController = new GameController();
    this.dragger = new Dragger();
    this.helpController = new HelpersController();
    this.logger = new Logger();
    this.lvlController = new LevelsController();
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
