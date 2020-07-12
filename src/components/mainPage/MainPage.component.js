import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainPageHTML from './mainPage.template';

export default class MainPage extends Component {
  static className = 'MainPage';

  constructor($root, options) {
    super($root, {
      name: 'MainPage',
      listeners: ['click'],
      ...options,
    });

    this.pages = options.pages;
    this.api = options.api;
  }

  init() {
    super.init();
  }

  onClick(event) {
    const clickedElement = $$(event.target);

    if (clickedElement.hasClass('btn')) {
      if (clickedElement.data.name) {
        const pageName = clickedElement.data.name;
        this.emit('selectPage', pageName);
      }
      if (clickedElement.data.game) {
        const { game } = clickedElement.data;
        this.emit('playGame', game);
      }
    }
  }

  toHTML() {
    const data = {
      username: this.api.userName,
      wordsToday: this.dataForApp.shortTermStats ? this.dataForApp.shortTermStats.wordsToday : 0,
      wordsPerDay: this.dataForApp.settings ? this.dataForApp.settings.wordsPerDay : 0,
      cardsToday: this.dataForApp.shortTermStats ? this.dataForApp.shortTermStats.cardsToday : 0,
      cardsPerDay: this.dataForApp.shortTermStats ? this.dataForApp.settings.optional.cardsPerDay : 0,
      learnedWords: this.dataForApp.statistics ? this.dataForApp.statistics.learnedWords : 0,
      allWords: 3600,
      cardsLearned: this.dataForApp.longTermStats ? this.dataForApp.longTermStats.cardsLearned : 0,
    };
    return createMainPageHTML(data).trim();
  }
}
