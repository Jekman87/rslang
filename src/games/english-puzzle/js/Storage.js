import { userBasicSettings } from './variables';

export default class Storage {
  constructor(api, statistics) {
    this.api = api;
    this.sharedStatObj = statistics;

    this.currentLevel = null;
    this.currentRound = null;

    this.pronounceHelp = null;
    this.autoplayHelp = null;
    this.translateHelp = null;
    this.visualHelp = null;

    this.statistics = null;
    this.passedRounds = null;
    this.lastRound = null;
    this.gallery = null;

    this.sentencesData = null;
    this.paintingData = null;
  }

  init() {
    this.bindMethods();
    this.addListeners();

    this.checkUserData();
    this.setUserData();
  }

  bindMethods() {
    this.bindedMethods = {
      updateUserData: this.updateUserData.bind(this),
    };
  }

  addListeners() {
    document.addEventListener('userDataChange', this.bindedMethods.updateUserData);
  }

  destroy() {
    document.removeEventListener('userDataChange', this.bindedMethods.updateUserData);
  }

  setProp(propName, value) {
    this[propName] = value;
  }

  getProp(propName) {
    return this[propName];
  }

  checkUserData() {
    if (!this.sharedStatObj.optional.PuzzleLong) {
      this.sharedStatObj.optional.PuzzleLong = JSON.stringify([]);
    }
    if (!this.sharedStatObj.optional.PuzzleMain) {
      this.sharedStatObj.optional.PuzzleMain = JSON.stringify(userBasicSettings);
    }
  }

  setUserData() {
    this.mainData = JSON.parse(this.sharedStatObj.optional.PuzzleMain);
    this.statistics = JSON.parse(this.sharedStatObj.optional.PuzzleLong);

    const helpers = this.mainData.pzlHelpers;
    [this.autoplayHelp, this.pronounceHelp, this.translateHelp, this.visualHelp] = helpers.split('-');

    this.lastRound = this.mainData.pzlLastRound;
    this.passedRounds = this.mainData.pzlPassedRounds;
    this.gallery = this.mainData.pzlGallery;
  }

  collectUserData() {
    this.mainData.pzlHelpers = [
      this.autoplayHelp,
      this.pronounceHelp,
      this.translateHelp,
      this.visualHelp,
    ].join('-');

    this.mainData.pzlLastRound = this.lastRound;
    this.mainData.pzlPassedRounds = this.passedRounds;
    this.mainData.pzlGallery = this.gallery;

    this.sharedStatObj.optional.PuzzleMain = JSON.stringify(this.mainData);
    this.sharedStatObj.optional.PuzzleLong = JSON.stringify(this.statistics);
  }

  updateUserData() {
    this.collectUserData();
    this.api.updateStatistics(this.sharedStatObj);
  }
}
