/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import Component from '../../core/Component';
import createSettingsHTML from './settingsPage.template';
import BASE_SETTINGS from '../../constants/settings.constants';

export default class Settings extends Component {
  static className = 'Settings';

  constructor($root, options) {
    super($root, {
      name: 'Settings',
      listeners: ['click', 'change', 'focusout'],
      ...options,
    });
    this.options = options;
    console.log(this.options);
  }

  getSettingsElements() {
    this.elements = {
      $wordsPerDay: this.$root.find('#settingsPageWordsPerDay'),
      $cardsPerDay: this.$root.find('#settingsPageCardsPerDay'),
      $mixedTraining: this.$root.find('#settingsPageMixedTraining'),
      $onlyNewWordsTraining: this.$root.find('#settingsPageOnlyNewWordsTraining'),
      $onlyOldWordsTraining: this.$root.find('#settingsPageOnlyOldWordsTraining'),
      $onlyDifficultWordsTraining: this.$root.find('#settingsPageOnlyDifficultWordsTraining'),
      $vocabularyExplanation: this.$root.find('#settingsPageVocabularyExplanation'),
      $vocabularyExample: this.$root.find('#settingsPageVocabularyExample'),
      $vocabularyTranscription: this.$root.find('#settingsPageVocabularyTranscription'),
      $vocabularyImage: this.$root.find('#settingsPageVocabularyImage'),
      $cardTranslation: this.$root.find('#settingsPageCardTranslation'),
      $cardExplanation: this.$root.find('#settingsPageCardExplanation'),
      $cardExample: this.$root.find('#settingsPageCardExample'),
      $cardTranscription: this.$root.find('#settingsPageCardTranscription'),
      $cardImage: this.$root.find('#settingsPageCardImage'),
      $cardTranslationAfterSuccess: this.$root.find('#settingsPageCardTranslationAfterSuccess'),
      $cardExplanationTranslation: this.$root.find('#settingsPageCardExplanationTranslation'),
      $cardExampleTranslation: this.$root.find('#settingsPageCardExampleTranslation'),
      $cardAutoSound: this.$root.find('#settingsPageCardAutoSound'),
      $cardAnswerButton: this.$root.find('#settingsPageCardAnswerButton'),
      $cardDifficultWordsButton: this.$root.find('#settingsPageCardDifficultWordsButton'),
      $cardDeleteButton: this.$root.find('#settingsPageCardDeleteButton'),
      $cardFeedbackButtons: this.$root.find('#settingsPageCardFeedbackButtons'),
    };
  }

  // расставляет галочки от полей объекта
  setCheckboxFields() {
    this.elements.$wordsPerDay.$el.value = this.options.dataForApp.settings.wordsPerDay;
    this.elements.$cardsPerDay.$el.value = this.options.dataForApp.settings.optional.cardsPerDay;
    const typeOfTraining = [this.elements.$mixedTraining.$el, this.elements.$onlyNewWordsTraining.$el, this.elements.$onlyOldWordsTraining.$el, this.elements.$onlyDifficultWordsTraining.$el];
    typeOfTraining.forEach((el) => {
      el.checked = false;
    });
    typeOfTraining[this.options.dataForApp.settings.optional.mixedCards].checked = true;
    this.elements.$vocabularyExplanation.$el.checked = this.options.dataForApp.settings.optional.vocabularyExplanation === true;
    this.elements.$vocabularyExample.$el.checked = this.options.dataForApp.settings.optional.vocabularyExample === true;
    this.elements.$vocabularyTranscription.$el.checked = this.options.dataForApp.settings.optional.vocabularyTranscription === true;
    this.elements.$vocabularyImage.$el.checked = this.options.dataForApp.settings.optional.vocabularyImage === true;
    this.elements.$cardTranslation.$el.checked = this.options.dataForApp.settings.optional.cardTranslation === true;
    this.elements.$cardExplanation.$el.checked = this.options.dataForApp.settings.optional.cardExplanation === true;
    this.elements.$cardExample.$el.checked = this.options.dataForApp.settings.optional.cardExample === true;
    this.elements.$cardTranscription.$el.checked = this.options.dataForApp.settings.optional.cardTranscription === true;
    this.elements.$cardImage.$el.checked = this.options.dataForApp.settings.optional.cardImage === true;
    this.elements.$cardTranslationAfterSuccess.$el.checked = this.options.dataForApp.settings.optional.cardTranslationAfterSuccess === true;
    this.elements.$cardExplanationTranslation.$el.checked = this.options.dataForApp.settings.optional.cardExplanationTranslation === true;
    this.elements.$cardExampleTranslation.$el.checked = this.options.dataForApp.settings.optional.cardExampleTranslation === true;
    this.elements.$cardAutoSound.$el.checked = this.options.dataForApp.settings.optional.autoSound === true;
    this.elements.$cardAnswerButton.$el.checked = this.options.dataForApp.settings.optional.answerButton === true;
    this.elements.$cardDifficultWordsButton.$el.checked = this.options.dataForApp.settings.optional.difficultWordsButton === true;
    this.elements.$cardDeleteButton.$el.checked = this.options.dataForApp.settings.optional.deleteButton === true;
    this.elements.$cardFeedbackButtons.$el.checked = this.options.dataForApp.settings.optional.feedbackButtons === true;
  }

  // собирать галочки из полей
  setObjectFields() {
    this.options.dataForApp.settings.wordsPerDay = this.elements.$wordsPerDay.$el.value;
    this.options.dataForApp.settings.optional.cardsPerDay = this.elements.$cardsPerDay.$el.value;
    const typeOfTraining = [this.elements.$mixedTraining.$el, this.elements.$onlyNewWordsTraining.$el, this.elements.$onlyOldWordsTraining.$el, this.elements.$onlyDifficultWordsTraining.$el];
    this.options.dataForApp.settings.optional.mixedCards = typeOfTraining.findIndex((item) => item.checked === true);
    this.options.dataForApp.settings.optional.vocabularyExplanation = this.elements.$vocabularyExplanation.$el.checked === true;
    this.options.dataForApp.settings.optional.vocabularyExample = this.elements.$vocabularyExample.$el.checked === true;
    this.options.dataForApp.settings.optional.vocabularyTranscription = this.elements.$vocabularyTranscription.$el.checked === true;
    this.options.dataForApp.settings.optional.vocabularyImage = this.elements.$vocabularyImage.$el.checked === true;
    this.options.dataForApp.settings.optional.cardTranslation = this.elements.$cardTranslation.$el.checked === true;
    this.options.dataForApp.settings.optional.cardExplanation = this.elements.$cardExplanation.$el.checked === true;
    this.options.dataForApp.settings.optional.cardExample = this.elements.$cardExample.$el.checked === true;
    this.options.dataForApp.settings.optional.cardTranscription = this.elements.$cardTranscription.$el.checked === true;
    this.options.dataForApp.settings.optional.cardImage = this.elements.$cardImage.$el.checked === true;
    this.options.dataForApp.settings.optional.cardTranslationAfterSuccess = this.elements.$cardTranslationAfterSuccess.$el.checked === true;
    this.options.dataForApp.settings.optional.cardExplanationTranslation = this.elements.$cardExplanationTranslation.$el.checked === true;
    this.options.dataForApp.settings.optional.cardExampleTranslation = this.elements.$cardExampleTranslation.$el.checked === true;
    this.options.dataForApp.settings.optional.autoSound = this.elements.$cardAutoSound.$el.checked === true;
    this.options.dataForApp.settings.optional.answerButton = this.elements.$cardAnswerButton.$el.checked === true;
    this.options.dataForApp.settings.optional.difficultWordsButton = this.elements.$cardDifficultWordsButton.$el.checked === true;
    this.options.dataForApp.settings.optional.deleteButton = this.elements.$cardDeleteButton.$el.checked === true;
    this.options.dataForApp.settings.optional.feedbackButtons = this.elements.$cardFeedbackButtons.$el.checked === true;
  }

  // отслеживать изменение 3 полей
  watchDependenceOfThreeMainCardsField() {
    if (this.elements.$cardTranslation.$el.checked === true) {
      this.elements.$cardTranslationAfterSuccess.$el.checked = false;
      this.elements.$cardTranslationAfterSuccess.$el.disabled = true;
    } else {
      this.elements.$cardTranslationAfterSuccess.$el.disabled = false;
    }
    if (this.elements.$cardExplanation.$el.checked === true) {
      this.elements.$cardExplanationTranslation.$el.disabled = false;
    } else {
      this.elements.$cardExplanationTranslation.$el.checked = false;
      this.elements.$cardExplanationTranslation.$el.disabled = true;
    }
    if (this.elements.$cardExample.$el.checked === true) {
      this.elements.$cardExampleTranslation.$el.disabled = false;
    } else {
      this.elements.$cardExampleTranslation.$el.checked = false;
      this.elements.$cardExampleTranslation.$el.disabled = true;
    }
  }

  watchThreeMainCardsField() {
    const applyButton = this.$root.find('#settingsPageApplyButton').$el;
    const warningHeading = this.$root.find('#warning-heading');
    if (this.elements.$cardTranslation.$el.checked === false && this.elements.$cardExplanation.$el.checked === false && this.elements.$cardExample.$el.checked === false) {
      applyButton.disabled = true;
      warningHeading.addClass('text-danger');
      warningHeading.removeClass('text-muted');
    } else {
      applyButton.disabled = false;
      warningHeading.removeClass('text-danger');
      warningHeading.addClass('text-muted');
    }
  }

  setStandardSettings() {
    this.options.dataForApp.settings.wordsPerDay = BASE_SETTINGS.wordsPerDay;
    this.options.dataForApp.settings.optional.cardsPerDay = BASE_SETTINGS.optional.cardsPerDay;
    this.options.dataForApp.settings.optional.mixedCards = BASE_SETTINGS.optional.mixedCards;
    this.options.dataForApp.settings.optional.vocabularyExplanation = BASE_SETTINGS.optional.vocabularyExplanation;
    this.options.dataForApp.settings.optional.vocabularyExample = BASE_SETTINGS.optional.vocabularyExample;
    this.options.dataForApp.settings.optional.vocabularyTranscription = BASE_SETTINGS.optional.vocabularyTranscription;
    this.options.dataForApp.settings.optional.vocabularyImage = BASE_SETTINGS.optional.vocabularyImage;
    this.options.dataForApp.settings.optional.cardTranslation = BASE_SETTINGS.optional.cardTranslation;
    this.options.dataForApp.settings.optional.cardExplanation = BASE_SETTINGS.optional.cardExplanation;
    this.options.dataForApp.settings.optional.cardExample = BASE_SETTINGS.optional.cardExample;
    this.options.dataForApp.settings.optional.cardTranscription = BASE_SETTINGS.optional.cardTranscription;
    this.options.dataForApp.settings.optional.cardImage = BASE_SETTINGS.optional.cardImage;
    this.options.dataForApp.settings.optional.cardTranslationAfterSuccess = BASE_SETTINGS.optional.cardTranslationAfterSuccess;
    this.options.dataForApp.settings.optional.cardExplanationTranslation = BASE_SETTINGS.optional.cardExplanationTranslation;
    this.options.dataForApp.settings.optional.cardExampleTranslation = BASE_SETTINGS.optional.cardExampleTranslation;
    this.options.dataForApp.settings.optional.autoSound = BASE_SETTINGS.optional.autoSound;
    this.options.dataForApp.settings.optional.answerButton = BASE_SETTINGS.optional.answerButton;
    this.options.dataForApp.settings.optional.difficultWordsButton = BASE_SETTINGS.optional.difficultWordsButton;
    this.options.dataForApp.settings.optional.deleteButton = BASE_SETTINGS.optional.deleteButton;
    this.options.dataForApp.settings.optional.feedbackButtons = BASE_SETTINGS.optional.feedbackButtons;
  }

  watchDependenceNewWordsPerDayAndCardsPerDay() {
    const settingsObj = this.options.dataForApp.settings;
    if (settingsObj.wordsPerDay * 2.5 > settingsObj.optional.cardsPerDay) {
      settingsObj.optional.cardsPerDay = Math.ceil(settingsObj.wordsPerDay * 2.5);
      this.elements.$cardsPerDay.$el.value = settingsObj.optional.cardsPerDay;
    }
  }

  validateWordsPerDay() {
    if (this.elements.$wordsPerDay.$el.value <= 0 || Number.isNaN(Number(this.elements.$wordsPerDay.$el.value))) {
      this.elements.$wordsPerDay.$el.value = BASE_SETTINGS.wordsPerDay;
      this.elements.$wordsPerDay.addClass('border-danger');
      this.elements.$wordsPerDay.addClass('text-danger');
      setTimeout(() => this.elements.$wordsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.elements.$wordsPerDay.removeClass('text-danger'), 500);
    }
    if (this.elements.$wordsPerDay.$el.value > 200) {
      this.elements.$wordsPerDay.$el.value = 200;
      this.elements.$wordsPerDay.addClass('border-danger');
      this.elements.$wordsPerDay.addClass('text-danger');
      setTimeout(() => this.elements.$wordsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.elements.$wordsPerDay.removeClass('text-danger'), 500);
    }
    if (this.elements.$wordsPerDay.$el.value * 2.5 > this.elements.$cardsPerDay.$el.value) {
      this.elements.$cardsPerDay.$el.value = Math.ceil(this.elements.$wordsPerDay.$el.value * 2.5);
      this.elements.$cardsPerDay.addClass('border-danger');
      this.elements.$cardsPerDay.addClass('text-danger');
      setTimeout(() => this.elements.$cardsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.elements.$cardsPerDay.removeClass('text-danger'), 500);
    }
  }

  validateCardsPerDay() {
    if (this.elements.$cardsPerDay.$el.value <= 2 || Number.isNaN(Number(this.elements.$cardsPerDay.$el.value))) {
      this.elements.$cardsPerDay.$el.value = BASE_SETTINGS.optional.cardsPerDay;
      this.elements.$cardsPerDay.addClass('border-danger');
      this.elements.$cardsPerDay.addClass('text-danger');
      setTimeout(() => this.elements.$cardsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.elements.$cardsPerDay.removeClass('text-danger'), 500);
    }
    if (this.elements.$cardsPerDay.$el.value > 500) {
      this.elements.$cardsPerDay.$el.value = 500;
      this.elements.$cardsPerDay.addClass('border-danger');
      this.elements.$cardsPerDay.addClass('text-danger');
      setTimeout(() => this.elements.$cardsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.elements.$cardsPerDay.removeClass('text-danger'), 500);
    }
    if (this.elements.$wordsPerDay.$el.value * 2.5 > this.elements.$cardsPerDay.$el.value) {
      this.elements.$wordsPerDay.$el.value = Math.floor(this.elements.$cardsPerDay.$el.value / 2.5);
      this.elements.$wordsPerDay.addClass('border-danger');
      this.elements.$wordsPerDay.addClass('text-danger');
      setTimeout(() => this.elements.$wordsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.elements.$wordsPerDay.removeClass('text-danger'), 500);
    }
  }

  validate() {
    this.setObjectFields();
    const settingsObj = this.options.dataForApp.settings;
    if (settingsObj.wordsPerDay <= 0 || Number.isNaN(Number(settingsObj.wordsPerDay))) {
      settingsObj.wordsPerDay = BASE_SETTINGS.wordsPerDay;
    }
    this.watchDependenceNewWordsPerDayAndCardsPerDay();
    if (settingsObj.optional.cardsPerDay <= 2 || Number.isNaN(Number(settingsObj.optional.cardsPerDay))) {
      settingsObj.optional.cardsPerDay = BASE_SETTINGS.optional.cardsPerDay;
    }
    if (settingsObj.optional.mixedCards < 0 || settingsObj.optional.mixedCards > 3 || (typeof settingsObj.optional.mixedCards !== 'number')) {
      settingsObj.optional.mixedCards = BASE_SETTINGS.optional.mixedCards;
    }
    if (settingsObj.optional.cardTranslation === true) {
      settingsObj.optional.cardTranslationAfterSuccess = false;
    }
    if (settingsObj.optional.cardExplanation === false) {
      settingsObj.optional.cardExplanationTranslation = false;
    }
    if (settingsObj.optional.cardExample === false) {
      settingsObj.optional.cardExampleTranslation.$el.disabled = false;
    }
    this.setCheckboxFields();
  }

  init() {
    super.init();
    this.getSettingsElements();
    this.setCheckboxFields();
    this.watchDependenceOfThreeMainCardsField();
  }

  destroy() {
  }

  onClick(event) {
    console.log(event);
    if (event.target.id === 'settingsPageApplyButton') {
      this.validate();
      this.options.api.updateSettings(this.options.dataForApp.settings);
    }
    if (event.target.id === 'settingsPageResetButton') {
      this.setStandardSettings();
      this.setCheckboxFields();
      this.options.api.updateSettings(this.options.dataForApp.settings);
    }
  }

  onChange(event) {
    if (event.target.id === 'settingsPageCardTranslation' || event.target.id === 'settingsPageCardExplanation' || event.target.id === 'settingsPageCardExample') {
      this.watchDependenceOfThreeMainCardsField();
      this.watchThreeMainCardsField();
    }
  }

  onFocusout(event) {
    console.log(event);
    if (event.target.id === 'settingsPageWordsPerDay') {
      this.validateWordsPerDay();
    }
    if (event.target.id === 'settingsPageCardsPerDay') {
      this.validateCardsPerDay();
    }
  }

  toHTML() {
    return createSettingsHTML().trim();
  }
}
