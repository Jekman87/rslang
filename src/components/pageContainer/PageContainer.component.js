/* eslint-disable no-underscore-dangle */
import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import { storage, getResetDayTime } from '../../core/utils';

import { AUTH_PAGE_NAME } from '../../constants/menu.constants';
import BASE_SETTINGS from '../../constants/settings.constants';
import BASE_STATS from '../../constants/stats.constants';
import { RESET_HOUR } from '../../constants/constants';

const WORDS_PER_STEP = 10;
const ALL_WORDS = 3600;

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
    this.shortTermStats = null;
    this.longTermStats = null;

    this.newWords = [];
    this.wordsToRepeatToday = [];
    this.userWords = [];
    this.userCards = [];
  }

  init() {
    if (this.component === AUTH_PAGE_NAME) {
      this.emit('hideHeader');
    }

    this.renderPage(this.pages[this.component]);

    this.subscribe('changePage', (pageName) => {
      if (this.pages[pageName]) {
        console.log('this.component.', this.component);
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

      this.dataForApp = null;
      this.settings = null;
      this.statistics = null;
      this.shortTermStats = null;
      this.longTermStats = null;
      this.newWords = [];
      this.wordsToRepeatToday = [];
      this.userWords = [];
      this.userCards = [];
      this.options.dataForApp = null;
      this.options.api.clearUserLog();

      this.emit('hideHeader');
      this.renderPage(this.pages[AUTH_PAGE_NAME]);
    });
  }

  async renderPage(NewPage) {
    if (NewPage.className !== AUTH_PAGE_NAME
      && (!this.settings || !this.statistics)) {
      this.emit('mainAppSpinner', true);

      await this.initSettingsAndStats();
      await this.loadWords();
      this.createUserCards();
      this.dataForApp = {
        settings: this.settings,
        statistics: this.statistics,
        newWords: this.newWords,
        wordsToRepeatToday: this.wordsToRepeatToday,
        userWords: this.userWords,
        userCards: this.userCards,
        shortTermStats: this.shortTermStats,
        longTermStats: this.longTermStats,
      };
    }

    const componentOptions = { ...this.options, dataForApp: this.dataForApp };
    const element = $$.create(NewPage.tagName || 'div', NewPage.className);
    this.component = new NewPage(element, componentOptions);
    element.html(this.component.toHTML());
    this.$root.clear().append(element.$el);
    this.component.init();
    this.emit('mainAppSpinner', false);
  }

  renderGame(NewGame) {
    const componentOptions = { ...this.options, dataForApp: this.dataForApp };
    this.$root.clear();
    this.component = new NewGame('.PageContainer', componentOptions);

    this.component.render();
    this.emit('mainAppSpinner', false);
  }

  async initSettingsAndStats() {
    try {
      const data = await Promise.all([
        this.options.api.getSettings(),
        this.options.api.getStatistics(),
      ]);

      [this.settings, this.statistics] = data;

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

        [this.settings, this.statistics] = data;
      } else {
        console.log('Ошибка соединения: ', error.message);
      }
    }

    const shortStatsJson = this.statistics.optional.MainGameShort;

    if (shortStatsJson) {
      this.shortTermStats = JSON.parse(shortStatsJson);
    }

    const longStatsJson = this.statistics.optional.MainGameLong;

    if (longStatsJson) {
      this.longTermStats = JSON.parse(longStatsJson);
    }
  }

  async loadWords() {
    try {
      const newWordsFilter = '{"userWord":null}';

      const resetDayTime = getResetDayTime(RESET_HOUR);
      const wordsToRepeatTodayFilter = `{"$and":[
        {"userWord":{"$ne":null}},
        {"userWord.optional.status":{"$ne":"deleted"}},
        {"userWord.optional.nextRepeat":{"$lt":${resetDayTime}}}
      ]}`;

      const userWordsFilter = '{"userWord":{"$ne":null}}';

      const data = await Promise.all([
        this.options.api.getAllUserAggregatedWords(null, this.settings.wordsPerDay, newWordsFilter),
        this.options.api.getAllUserAggregatedWords(null, ALL_WORDS, wordsToRepeatTodayFilter),
        this.options.api.getAllUserAggregatedWords(null, ALL_WORDS, userWordsFilter),
      ]);

      const [newWords, wordsToRepeatToday, userWords] = data;

      this.newWords = newWords[0].paginatedResults;
      this.wordsToRepeatToday = wordsToRepeatToday[0].paginatedResults.sort((wordA, wordB) => {
        const result = wordA.userWord.optional.nextRepeat - wordB.userWord.optional.nextRepeat;
        return result;
      });
      this.userWords = userWords[0].paginatedResults;

      console.log('newWords', this.newWords);
      console.log('wordsToRepeatToday', this.wordsToRepeatToday);
      console.log('userWords', this.userWords);
    } catch (error) {
      if (error.message === '401') {
        console.log('Логаут ', error.message);
        this.emit('mainLogout');
      } else {
        console.log('Другая ошибка: ', error.message);
      }
    }
  }

  // подготовка массива карт: 10 слов на повторение, 10 новых и т.д.
  createUserCards() {
    let index = 0;

    while (this.wordsToRepeatToday.length > index || this.newWords.length > index) {
      if (this.wordsToRepeatToday.length > index) {
        this.userCards.push(...this.wordsToRepeatToday.slice(index, index + WORDS_PER_STEP));
      }

      if (this.newWords.length > index) {
        this.userCards.push(...this.newWords.slice(index, index + WORDS_PER_STEP));
      }

      index += WORDS_PER_STEP;
    }

    console.log('this.userCards', this.userCards);
  }

  destroy() {
    this.component.destroy();
  }
}
