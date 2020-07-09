/* eslint-disable no-underscore-dangle */
import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import { storage } from '../../core/utils';

import { AUTH_PAGE_NAME } from '../../constants/menu.constants';
import BASE_SETTINGS from '../../constants/settings.constants';
import BASE_STATS from '../../constants/stats.constants';
import BASE_DATA_FOR_APP from '../../constants/data-for-app.constants';

const WORDS_PER_STEP = 10;
const WORDS_PER_PAGE = 20;
const LAST_PAGE_NUM = 29;

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

    this.userWords = null;
    this.todayWordsToRepeat = null;
    this.newWords = null;
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
        userWords: this.userWords,
        todayWordsToRepeat: this.todayWordsToRepeat,
        newWords: this.newWords,
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
      // загружать все слова пользователя?
      // по ним смотреть что нужно повторить
      // 10-20 повторений, затем новых 20, затем повторения новых

      // подгрузка слов в зависимости от статистики и алгоритма
      // первым делом идут карты на повторение, затем новые слова
      // нет на повторении - начинаем с новых
      // преобразуем порядок слов? Составляем карточки? AggregatedWords

      // подгружаем нужное количество карточек в зависимости от настроек
      // this.dataForApp.settings.wordsPerDay;

      // проверить на удаленные
      // фильтр для userWords

      // в статистике будет сохранено последнее слово
      // берем его айди и определяем где оно находится
      let userAggregatedWords;
      let group = 0;
      let page = 0;

      if (this.longTermStats) {
        const { lastWordId } = this.longTermStats;
        const lastWord = await this.options.api.getUserAggregatedWordById(lastWordId);
        group = lastWord[0].group;
        page = lastWord[0].page;
      }

      const filter = this.createUserWordsFilter(group, page);
      // const filter = '{"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}';
      // const filter = '{"$or":[{"page":0},{"page":1}]}';
      // const filter = `{"$and":[{"group":${group},"page":${page}}]}`;
      // const filter = '{"userWord":{"$exists":false}}';
      // {"$and":[{"userWord":{"$ne":null}, "group":3}]}
      // {"$and":[{"userWord":{"$exists": true}},{"userWord.difficulty":{"$ne": "easy"}}]}

      const data = await Promise.all([
        this.options.api.getAllUserAggregatedWords(null, 90, filter),
        this.options.api.getAllUserWords(),
      ]);

      [userAggregatedWords, this.userWords] = data;
      userAggregatedWords = userAggregatedWords[0].paginatedResults;

      if (this.longTermStats) {
        const { lastWordId } = this.longTermStats;
        const lastWordIndex = userAggregatedWords.findIndex((word) => word._id === lastWordId);
        this.newWords = userAggregatedWords.splice(lastWordIndex + 1, this.settings.wordsPerDay);
      } else {
        this.newWords = userAggregatedWords;
      }

      console.log('newWords', this.newWords);
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

  createUserWordsFilter(group, page) {
    const additionalPages = Math.ceil((this.settings.wordsPerDay) / WORDS_PER_PAGE);
    const pageOffset = this.longTermStats ? 1 : 0;
    let filter = '';

    if (page + additionalPages > LAST_PAGE_NUM) {
      const pageFilterArrA = [];
      const pageFilterArrB = [];

      [...Array(additionalPages + pageOffset)].forEach((_, index) => {
        let pageNum = page + index;

        if (pageNum > LAST_PAGE_NUM) {
          pageNum -= LAST_PAGE_NUM + 1;
          pageFilterArrB.push(`{"page":${pageNum}}`);
        } else {
          pageFilterArrA.push(`{"page":${pageNum}}`);
        }
      });

      const pageFilterA = pageFilterArrA.join(',');
      const pageFilterB = pageFilterArrB.join(',');

      filter = `{"$or":[
        {"$and":[{"group":${group}},{"$or":[${pageFilterA}]}]},
        {"$and":[{"group":${group + 1}},{"$or":[${pageFilterB}]}]}
      ]}`;
    } else {
      const pageFilterArr = [...Array(additionalPages + pageOffset)]
        .map((_, index) => `{"page":${page + index}}`);

      const pageFilter = pageFilterArr.join(',');
      filter = `{"$and":[{"$or":[{"group":${group}}]},{"$or":[${pageFilter}]}]}`;
    }

    return filter;
  }

  // подготовка массива карт
  createStartUserCards() {
    this.todayWordsToRepeat = this.getTodayWordsToRepeat();

    if (this.todayWordsToRepeat.length) {
      if (this.todayWordsToRepeat.length > WORDS_PER_STEP) {
        this.userCards.push(...this.todayWordsToRepeat.splice(0, WORDS_PER_STEP));
        // карточки еще останутся и перейдут либо в конец либо на след тренировку
      } else {
        this.userCards.push(...this.todayWordsToRepeat);
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

  getTodayWordsToRepeat() {
    let todayWordsToRepeat = [];

    if (this.userWords.length) {
      // определяем время ресета - след день 4 утра
      const time = new Date();
      const hour = time.getHours();
      if (hour >= 4) time.setDate(time.getDate() + 1);
      const resetDayTime = time.setHours(4, 0);

      // берем слова на сегодня и сортируем по возрастанию
      // чтобы повторять сначала самые старые

      // проверить на удаленные или фильтр?
      // чекать время в фильтре?
      todayWordsToRepeat = this.userWords
        .filter((word) => word.optional.nextRepeat < resetDayTime)
        .sort((wordA, wordB) => wordA.optional.nextRepeat - wordB.optional.nextRepeat);
    }

    // todayWordsToRepeat.length - столько слов на повторении на сегодня?
    return todayWordsToRepeat;
  }

  destroy() {
    this.component.destroy();
  }
}
