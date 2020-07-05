import { roundsStructure } from './variables';

export default class Storage {
  constructor() {
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

  setProp(propName, value) {
    this[propName] = value;
  }

  getProp(propName) {
    return this[propName];
  }

  setUserData(data) {
    this.userData = data;
    delete this.userData.id;
    const { optional } = data;

    const helpers = optional.pzlHelpers || 'on-on-on-on';
    [this.autoplayHelp, this.pronounceHelp, this.translateHelp, this.visualHelp] = helpers.split('-');

    this.lastRound = optional.pzlLastRound || '1-0';
    this.passedRounds = optional.pzlPassedRounds || roundsStructure;
    this.statistics = optional.pzlStatistics || 'empty';
    this.gallery = optional.pzlGallery || 'empty';
  }

  collectUserData() {
    this.userData.optional.pzlHelpers = [
      this.autoplayHelp,
      this.pronounceHelp,
      this.translateHelp,
      this.visualHelp,
    ].join('-');

    this.userData.optional.pzlLastRound = this.lastRound;
    this.userData.optional.pzlPassedRounds = this.passedRounds;
    this.userData.optional.pzlStatistics = this.statistics;
    this.userData.optional.pzlGallery = this.gallery;

    return this.userData;
  }
}
