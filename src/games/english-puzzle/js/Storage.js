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
    this.pronounceHelp = data.pzlPronounceHelp;
    this.autoplayHelp = data.pzlAutoplayHelp;
    this.translateHelp = data.pzlTranslateHelp;
    this.visualHelp = data.pzlVisualHelp;
    this.lastRound = data.pzlLastRound;
    this.passedRounds = data.pzlPassedRounds;
    this.statistics = data.pzlStatistics;
  }

  collectUserData() {
    const data = {
      learnedWords: 0,
      optional: {
        pzlAutoplayHelp: this.autoplayHelp,
        pzlPronounceHelp: this.pronounceHelp,
        pzlTranslateHelp: this.translateHelp,
        pzlVisualHelp: this.visualHelp,
        pzlLastRound: this.lastRound,
        pzlPassedRounds: this.passedRounds,
        pzlStatistics: this.statistics,
      },
    };

    return data;
  }
}
