import $$ from '../../core/domManipulation';
import Observer from '../../core/Observer';

export default class MainApp {
  constructor(selector, options) {
    this.$el = $$(selector);
    this.components = options.components || [];
    this.observer = new Observer();
    this.options = options;
    this.settings = null;
    this.stats = null;
  }

  getRoot() {
    const $root = $$.create('div', 'main-app');

    const componentOptions = {
      observer: this.observer, settings: this.settings, stats: this.stats, ...this.options
    };
    this.components = this.components.map((Component) => {
      const element = $$.create(Component.tagName || 'div', Component.className);
      const component = new Component(element, componentOptions);

      element.html(component.toHTML());
      $root.append(element);
      return component;
    });

    return $root;
  }

  async render() {
    await this.initStatsAndSettings();
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  async initStatsAndSettings() {
    // пробуем забрать с бекенда
    // если не получилось - стандартные настройки
    try {
      // переделать в promise.all
      this.settings = await this.options.api.getSettings();
      this.stats = await this.options.api.getStatistics();
      console.log('settings', this.settings);
      console.log('stats', this.stats);
    } catch (error) {
      if (error.message === '401') {
        console.log('Логаут ', error.message);
        // this.observer.emit('mainLogout');
        this.observer.emit('mainLogout');
      } else {
        console.log('Другая ошибка: ', error.message);
      }
    }

    // шаблон настроек
    const settingsAll = {
      wordsPerDay: 20,
      optional: {
        CardsPerDay: 50,
        mixedCards: 0,
        isCardTranslation: true,
        isCardExplanation: true,
        isCardExample: true,
        isCardTranscription: true,
        isCardImage: true,
        isCardTranslationAfterSuccess: true,
        cardExplanationTranslation: true,
        cardExampleTranslation: true,
        isAutoSound: true,
        isAnswerButton: true,
        isDeleteButton: true,
        isDifficultWordsButton: true,
        areFeedbackButtons: true,
        isVocabularyExplanation: true,
        isVocabularyExample: true,
        isVocabularyTranscription: true,
        isVocabularyImage: true,
      },
    };
    // const newStats = await this.options.api.updateSettings(settingsAll);

    // шаблон статистики
    const stats = {
      learnedWords: 18,
      optional: {
        lastAppearance: 123,
        counter: 12,
        success: 5,
        isGameSuccess: true,
        status: 'goodStatus',
        progress: 33,
        difficulty: 'veryGood',
      },
    };
    // const newStats = await this.options.api.updateStatistics(stats);
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
