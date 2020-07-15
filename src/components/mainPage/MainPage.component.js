import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainPageHTML from './mainPage.template';

import { ALL_WORDS } from '../../constants/constants';
import team from '../teamPage/team';

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
    preloadMedia.call(this);
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
    let learnedWords = 0;
    let learnedCards = 0;
    let wordsToday = 0;
    let cardsToday = 0;
    let cardsPerDay = 0;

    if (this.dataForApp.longTermStats) {
      const lastIndex = this.dataForApp.longTermStats.length - 1;
      learnedWords = this.dataForApp.longTermStats[lastIndex].learnedWords;
      learnedCards = this.dataForApp.longTermStats[lastIndex].learnedCards;
    }

    if (this.dataForApp.shortTermStats) {
      wordsToday = this.dataForApp.shortTermStats.newWordsCount;
      cardsToday = this.dataForApp.shortTermStats.cardsCount;
      cardsPerDay = this.dataForApp.settings.optional.cardsPerDay;
    }

    cardsPerDay = this.dataForApp.userCards.length > cardsPerDay
      ? cardsPerDay
      : this.dataForApp.userCards.length;

    const data = {
      wordsPerDay: this.dataForApp.settings ? this.dataForApp.settings.wordsPerDay : 0,
      username: this.api.userName,
      allWords: ALL_WORDS,
      wordsToday,
      cardsToday,
      cardsPerDay,
      learnedWords,
      learnedCards,
      commonProgress: this.dataForApp.settings.optional.commonProgress,
    };

    return createMainPageHTML(data).trim();
  }
}

function preloadMedia() {
  const images = team.map((member, i) => {
    const image = `
    <img src="${member.avatar}" width="1" height="1" alt="Image ${i}" />
    `;
    return image;
  });
  const $preload = $$.create('div', 'preload');
  $preload.addClass('d-none');
  $preload.html(images.join(''));
  this.$root.append($preload);
}
