/* eslint-disable no-underscore-dangle */
import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import { storage } from '../../core/utils';

import { AUTH_PAGE_NAME } from '../../constants/menu.constants';
import BASE_SETTINGS from '../../constants/settings.constants';
import BASE_STATS from '../../constants/stats.constants';
import BASE_DATA_FOR_APP from '../../constants/data-for-app.constants';

const WORDS_PER_STEP = 10;
const ALL_WORDS = 3600;
const RESET_HOUR = 4;
// const WORDS_PER_PAGE = 20;
// const LAST_PAGE_NUM = 29;

export default class PageContainer extends Component {
  static tagName = 'main';

  static className = 'PageContainer';

  constructor($root, options) {
    super($root, {
      name: 'PageContainer',
      ...options,
    });

    this.$root = $root;
    this.options = options;
    this.pages = options.pages;
    this.component = options.startPage;
    this.dataForApp = null;

    this.settings = null;
    this.statistics = null;
    this.longTermStats = null;
    this.shortTermStats = null;

    this.newWords = null;
    this.wordsToRepeatToday = null;
    this.userCards = [];
  }

  init() {
    if (this.component === AUTH_PAGE_NAME) {
      this.emit('hideHeader');
    }

    this.renderPage(this.pages[this.component]);

    this.subscribe('changePage', (pageName) => {
      if (this.pages[pageName]) {
        this.component.destroy();
        storage('currentPage', pageName);
        this.renderPage(this.pages[pageName]);
      } else {
        console.log('Страница пока не готова: ', pageName);
      }
    });

    this.subscribe('playGame', (NewGame) => {
      if (this.pages[NewGame]) {
        this.component.destroy();
        storage('currentPage', NewGame);
        this.emit('hideHeader');
        this.renderGame(this.pages[NewGame]);
      } else {
        console.log('Игра пока не готова: ', NewGame);
      }
    });

    this.subscribe('mainLogout', () => {
      this.component.destroy();
      this.dataForApp = { ...BASE_DATA_FOR_APP };
      this.options.dataForApp = this.dataForApp;
      this.options.api.clearUserLog();

      this.emit('hideHeader');
      this.renderPage(this.pages[AUTH_PAGE_NAME]);
    });
  }

  async renderPage(NewPage) {
    if (NewPage.className !== AUTH_PAGE_NAME
      && (!this.settings || !this.statistics)) {
      // add loader?
      await this.initSettingsAndStats();
      await this.loadWords();
      this.createStartUserCards();
      this.dataForApp = {
        settings: this.settings,
        statistics: this.statistics,
        newWords: this.newWords,
        wordsToRepeatToday: this.wordsToRepeatToday,
        userCards: this.userCards,
        longTermStats: this.longTermStats,
        shortTermStats: this.shortTermStats,
      };
      // remove loader?
    }

    const componentOptions = { ...this.options, dataForApp: this.dataForApp };
    const element = $$.create(NewPage.tagName || 'div', NewPage.className);
    this.component = new NewPage(element, componentOptions);
    element.html(this.component.toHTML());
    this.$root.clear().append(element.$el);
    this.component.init();
  }

  renderGame(NewGame) {
    const componentOptions = { ...this.options, dataForApp: this.dataForApp };
    this.$root.clear();
    this.component = new NewGame('.PageContainer', componentOptions);
    this.component.render();
  }

  async initSettingsAndStats() {
    try {
      const data = await Promise.all([
        this.options.api.getSettings(),
        this.options.api.getStatistics(),
      ]);

      [this.settings, this.statistics] = data;

      const longStatsJson = this.statistics.optional.MainGameLong;

      if (longStatsJson) {
        this.longTermStats = JSON.parse(longStatsJson);
      }

      const shortStatsJson = this.statistics.optional.MainGameShort;

      if (shortStatsJson) {
        this.shortTermStats = JSON.parse(shortStatsJson);
      }

      console.log('this.settings', this.settings);
      console.log('this.statistics', this.statistics);
    } catch (error) {
      if (error.message === '401') {
        console.log('Логаут ', error.message);
        this.emit('mainLogout');
      } else if (error.message === '404') {
        // если настроек и статистики нету - устанавливаем стандартные
        const data = await Promise.all([
          this.options.api.updateSettings(BASE_SETTINGS),
          this.options.api.updateStatistics(BASE_STATS),
        ]);

        [this.dataForApp.settings, this.dataForApp.statistics] = data;
      } else {
        console.log('Ошибка соединения: ', error.message);
      }
    }
  }

  async loadWords() {
    try {
      // определяем время ресета - след день 4 утра
      const newWordsFilter = '{"userWord":null}';

      const time = new Date();
      const hour = time.getHours();
      if (hour >= RESET_HOUR) time.setDate(time.getDate() + 1);
      const resetDayTime = time.setHours(RESET_HOUR, 0);
      const wordsToRepeatTodayFilter = `{"$and":[
        {"userWord":{"$ne":null}},
        {"userWord.optional.status":{"$ne":"deleted"}},
        {"userWord.optional.nextRepeat":{"$lt":${resetDayTime}}}
      ]}`;

      const data = await Promise.all([
        this.options.api.getAllUserAggregatedWords(null, this.settings.wordsPerDay, newWordsFilter),
        this.options.api.getAllUserAggregatedWords(null, ALL_WORDS, wordsToRepeatTodayFilter),
      ]);

      const [newWords, wordsToRepeatToday] = data;
      this.newWords = newWords[0].paginatedResults;
      this.wordsToRepeatToday = wordsToRepeatToday[0].paginatedResults
        .sort((wordA, wordB) => wordA.optional.nextRepeat - wordB.optional.nextRepeat);

      console.log('newWords', this.newWords);
      console.log('userWords', this.wordsToRepeatToday);
    } catch (error) {
      if (error.message === '401') {
        console.log('Логаут ', error.message);
        this.emit('mainLogout');
      } else {
        console.log('Другая ошибка: ', error.message);
      }
    }
  }

  // подготовка массива карт: 10 слов на повторение и 10 новыех
  createStartUserCards() {
    if (this.wordsToRepeatToday.length) {
      if (this.wordsToRepeatToday.length > WORDS_PER_STEP) {
        this.userCards.push(...this.wordsToRepeatToday.splice(0, WORDS_PER_STEP));
        // карточки еще останутся и перейдут либо в конец либо на след тренировку
      } else {
        this.userCards.push(...this.wordsToRepeatToday);
      }
    }
    // далее добавляем новые слова
    if (this.newWords.length > WORDS_PER_STEP) {
      this.userCards.push(...this.newWords.splice(0, WORDS_PER_STEP));
    } else {
      this.userCards.push(...this.newWords);
    }
    console.log('this.userCards', this.userCards);
  }

  destroy() {
    this.component.destroy();
  }
}
