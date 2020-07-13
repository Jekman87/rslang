import Component from '../../core/Component';
import createSettingsHTML from './settingsPage.template';
import BASE_SETTINGS from '../../constants/settings.constants';
import './settings.scss';

const maxCardsPerDay = 500;
const minCardsPerDay = 3;
const maxWordsPerDay = 200;
const minWordsPerDay = 1;
const wordToCardRatio = 2.5;
const buttonsText = {
  applyButtonStandardText: 'Применить',
  standardSettingsButtonStandardText: 'Сбросить до стандартных настроек',
  textForErrors: 'Не получилось отправить. Попробуйте еще раз.',
  applyButtonTextforApplying: 'Настройки применены',
  standardSettingsButtonTextforApplying: 'Применены стандартные настройки',
};

export default class Settings extends Component {
  static className = 'Settings';

  constructor($root, options) {
    super($root, {
      name: 'Settings',
      listeners: ['click', 'change', 'focusout'],
      ...options,
    });
    this.options = options;
    this.settings = this.options.dataForApp.settings;
    this.optional = this.options.dataForApp.settings.optional;
    this.isClickAble = true;
  }

  getSettingsElements() {
    this.el = {
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
      $cardTranslationAfter: this.$root.find('#settingsPageCardTranslationAfterSuccess'),
      $cardExplTranslation: this.$root.find('#settingsPageCardExplanationTranslation'),
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
    this.el.$wordsPerDay.$el.value = this.settings.wordsPerDay;
    this.el.$cardsPerDay.$el.value = this.optional.cardsPerDay;
    const typeOfTraining = [
      this.el.$mixedTraining.$el,
      this.el.$onlyNewWordsTraining.$el,
      this.el.$onlyOldWordsTraining.$el,
      this.el.$onlyDifficultWordsTraining.$el];
    typeOfTraining.forEach((el) => {
      const training = el;
      training.checked = false;
    });
    typeOfTraining[this.optional.mixedCards].checked = true;
    this.el.$vocabularyExplanation.$el.checked = this.optional.vocabularyExplanation === true;
    this.el.$vocabularyExample.$el.checked = this.optional.vocabularyExample === true;
    this.el.$vocabularyTranscription.$el.checked = this.optional.vocabularyTranscription === true;
    if (this.el.$vocabularyTranscription.$el.checked === true) {
      this.el.$cardTranslationAfter.$el.disabled = true;
    }
    this.el.$vocabularyImage.$el.checked = this.optional.vocabularyImage === true;
    this.el.$cardTranslation.$el.checked = this.optional.cardTranslation === true;
    this.el.$cardExplanation.$el.checked = this.optional.cardExplanation === true;
    this.el.$cardExample.$el.checked = this.optional.cardExample === true;
    this.el.$cardTranscription.$el.checked = this.optional.cardTranscription === true;
    this.el.$cardImage.$el.checked = this.optional.cardImage === true;
    this.el.$cardTranslationAfter.$el.checked = this.optional.cardTranslationAfter === true;
    if (this.el.$cardTranslationAfter.$el.checked === true) {
      this.el.$cardTranslationAfter.$el.disabled = false;
    }
    this.el.$cardExplTranslation.$el.checked = this.optional.cardExplanationTranslation === true;
    if (this.el.$cardExplTranslation.$el.checked === true) {
      this.el.$cardExplTranslation.$el.disabled = false;
    }
    this.el.$cardExampleTranslation.$el.checked = this.optional.cardExampleTranslation === true;
    if (this.el.$cardExampleTranslation.$el.checked === true) {
      this.el.$cardExampleTranslation.$el.disabled = false;
    }
    this.el.$cardAutoSound.$el.checked = this.optional.autoSound === true;
    this.el.$cardAnswerButton.$el.checked = this.optional.answerButton === true;
    this.el.$cardDifficultWordsButton.$el.checked = this.optional.difficultWordsButton === true;
    this.el.$cardDeleteButton.$el.checked = this.optional.deleteButton === true;
    this.el.$cardFeedbackButtons.$el.checked = this.optional.feedbackButtons === true;
  }

  // собирать галочки из полей
  setObjectFields() {
    this.settings.wordsPerDay = this.el.$wordsPerDay.$el.value;
    this.optional.cardsPerDay = this.el.$cardsPerDay.$el.value;
    const typeOfTraining = [
      this.el.$mixedTraining.$el,
      this.el.$onlyNewWordsTraining.$el,
      this.el.$onlyOldWordsTraining.$el,
      this.el.$onlyDifficultWordsTraining.$el];
    this.optional.mixedCards = typeOfTraining.findIndex((item) => item.checked === true);
    this.optional.vocabularyExplanation = this.el.$vocabularyExplanation.$el.checked === true;
    this.optional.vocabularyExample = this.el.$vocabularyExample.$el.checked === true;
    this.optional.vocabularyTranscription = this.el.$vocabularyTranscription.$el.checked === true;
    this.optional.vocabularyImage = this.el.$vocabularyImage.$el.checked === true;
    this.optional.cardTranslation = this.el.$cardTranslation.$el.checked === true;
    this.optional.cardExplanation = this.el.$cardExplanation.$el.checked === true;
    this.optional.cardExample = this.el.$cardExample.$el.checked === true;
    this.optional.cardTranscription = this.el.$cardTranscription.$el.checked === true;
    this.optional.cardImage = this.el.$cardImage.$el.checked === true;
    this.optional.cardTranslationAfter = this.el.$cardTranslationAfter.$el.checked === true;
    this.optional.cardExplanationTranslation = this.el.$cardExplTranslation.$el.checked === true;
    this.optional.cardExampleTranslation = this.el.$cardExampleTranslation.$el.checked === true;
    this.optional.autoSound = this.el.$cardAutoSound.$el.checked === true;
    this.optional.answerButton = this.el.$cardAnswerButton.$el.checked === true;
    this.optional.difficultWordsButton = this.el.$cardDifficultWordsButton.$el.checked === true;
    this.optional.deleteButton = this.el.$cardDeleteButton.$el.checked === true;
    this.optional.feedbackButtons = this.el.$cardFeedbackButtons.$el.checked === true;
  }

  // отслеживать изменение 3 полей
  watchDependenceOfThreeMainCardsField() {
    if (this.el.$cardTranslation.$el.checked === true) {
      this.el.$cardTranslationAfter.$el.checked = false;
      this.el.$cardTranslationAfter.$el.disabled = true;
    } else {
      this.el.$cardTranslationAfter.$el.disabled = false;
    }
    if (this.el.$cardExplanation.$el.checked === true) {
      this.el.$cardExplTranslation.$el.disabled = false;
    } else {
      this.el.$cardExplTranslation.$el.checked = false;
      this.el.$cardExplTranslation.$el.disabled = true;
    }
    if (this.el.$cardExample.$el.checked === true) {
      this.el.$cardExampleTranslation.$el.disabled = false;
    } else {
      this.el.$cardExampleTranslation.$el.checked = false;
      this.el.$cardExampleTranslation.$el.disabled = true;
    }
  }

  watchThreeMainCardsField() {
    const applyButton = this.$root.find('#settingsPageApplyButton').$el;
    const warningHeading = this.$root.find('#warning-heading');
    if (this.el.$cardTranslation.$el.checked === false
      && this.el.$cardExplanation.$el.checked === false
      && this.el.$cardExample.$el.checked === false) {
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
    this.settings.wordsPerDay = BASE_SETTINGS.wordsPerDay;
    this.optional.cardsPerDay = BASE_SETTINGS.optional.cardsPerDay;
    this.optional.mixedCards = BASE_SETTINGS.optional.mixedCards;
    this.optional.vocabularyExplanation = BASE_SETTINGS.optional.vocabularyExplanation;
    this.optional.vocabularyExample = BASE_SETTINGS.optional.vocabularyExample;
    this.optional.vocabularyTranscription = BASE_SETTINGS.optional.vocabularyTranscription;
    this.optional.vocabularyImage = BASE_SETTINGS.optional.vocabularyImage;
    this.optional.cardTranslation = BASE_SETTINGS.optional.cardTranslation;
    this.optional.cardExplanation = BASE_SETTINGS.optional.cardExplanation;
    this.optional.cardExample = BASE_SETTINGS.optional.cardExample;
    this.optional.cardTranscription = BASE_SETTINGS.optional.cardTranscription;
    this.optional.cardImage = BASE_SETTINGS.optional.cardImage;
    this.optional.cardTranslationAfter = BASE_SETTINGS.optional.cardTranslationAfterSuccess;
    this.optional.cardExplanationTranslation = BASE_SETTINGS.optional.cardExplanationTranslation;
    this.optional.cardExampleTranslation = BASE_SETTINGS.optional.cardExampleTranslation;
    this.optional.autoSound = BASE_SETTINGS.optional.autoSound;
    this.optional.answerButton = BASE_SETTINGS.optional.answerButton;
    this.optional.difficultWordsButton = BASE_SETTINGS.optional.difficultWordsButton;
    this.optional.deleteButton = BASE_SETTINGS.optional.deleteButton;
    this.optional.feedbackButtons = BASE_SETTINGS.optional.feedbackButtons;
  }

  watchDependenceNewWordsPerDayAndCardsPerDay() {
    if (this.settings.wordsPerDay * wordToCardRatio > this.optional.cardsPerDay) {
      this.optional.cardsPerDay = Math.ceil(this.settings.wordsPerDay * wordToCardRatio);
      this.el.$cardsPerDay.$el.value = this.optional.cardsPerDay;
    }
  }

  validateWordsPerDay() {
    if (this.el.$wordsPerDay.$el.value < minWordsPerDay
      || Number.isNaN(Number(this.el.$wordsPerDay.$el.value))) {
      this.el.$wordsPerDay.$el.value = BASE_SETTINGS.wordsPerDay;
      this.el.$wordsPerDay.addClass('border-danger');
      this.el.$wordsPerDay.addClass('text-danger');
      setTimeout(() => this.el.$wordsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.el.$wordsPerDay.removeClass('text-danger'), 500);
    }
    if (this.el.$wordsPerDay.$el.value > maxWordsPerDay) {
      this.el.$wordsPerDay.$el.value = maxWordsPerDay;
      this.el.$wordsPerDay.addClass('border-danger');
      this.el.$wordsPerDay.addClass('text-danger');
      setTimeout(() => this.el.$wordsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.el.$wordsPerDay.removeClass('text-danger'), 500);
    }
    if (this.el.$wordsPerDay.$el.value * wordToCardRatio > this.el.$cardsPerDay.$el.value) {
      this.el.$cardsPerDay.$el.value = Math.ceil(this.el.$wordsPerDay.$el.value * wordToCardRatio);
      this.el.$cardsPerDay.addClass('border-danger');
      this.el.$cardsPerDay.addClass('text-danger');
      setTimeout(() => this.el.$cardsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.el.$cardsPerDay.removeClass('text-danger'), 500);
    }
  }

  validateCardsPerDay() {
    if (this.el.$cardsPerDay.$el.value <= 2
      || Number.isNaN(Number(this.el.$cardsPerDay.$el.value))) {
      this.el.$cardsPerDay.$el.value = BASE_SETTINGS.optional.cardsPerDay;
      this.el.$cardsPerDay.addClass('border-danger');
      this.el.$cardsPerDay.addClass('text-danger');
      setTimeout(() => this.el.$cardsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.el.$cardsPerDay.removeClass('text-danger'), 500);
    }
    if (this.el.$cardsPerDay.$el.value > maxCardsPerDay) {
      this.el.$cardsPerDay.$el.value = maxCardsPerDay;
      this.el.$cardsPerDay.addClass('border-danger');
      this.el.$cardsPerDay.addClass('text-danger');
      setTimeout(() => this.el.$cardsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.el.$cardsPerDay.removeClass('text-danger'), 500);
    }
    if (this.el.$wordsPerDay.$el.value * wordToCardRatio > this.el.$cardsPerDay.$el.value) {
      this.el.$wordsPerDay.$el.value = Math.floor(this.el.$cardsPerDay.$el.value / wordToCardRatio);
      this.el.$wordsPerDay.addClass('border-danger');
      this.el.$wordsPerDay.addClass('text-danger');
      setTimeout(() => this.el.$wordsPerDay.removeClass('border-danger'), 500);
      setTimeout(() => this.el.$wordsPerDay.removeClass('text-danger'), 500);
    }
  }

  validate() {
    this.setObjectFields();
    if (this.settings.wordsPerDay < minWordsPerDay
      || Number.isNaN(Number(this.settings.wordsPerDay))) {
      this.settings.wordsPerDay = BASE_SETTINGS.wordsPerDay;
    }
    this.watchDependenceNewWordsPerDayAndCardsPerDay();
    if (this.optional.cardsPerDay < minCardsPerDay
      || Number.isNaN(Number(this.optional.cardsPerDay))) {
      this.optional.cardsPerDay = BASE_SETTINGS.optional.cardsPerDay;
    }
    if (this.optional.mixedCards < 0 || this.optional.mixedCards > 3 || (typeof this.optional.mixedCards !== 'number')) {
      this.optional.mixedCards = BASE_SETTINGS.optional.mixedCards;
    }
    if (this.optional.cardTranslation === true) {
      this.optional.cardTranslationAfter = false;
    }
    if (this.optional.cardExplanation === false) {
      this.optional.cardExplanationTranslation = false;
    }
    if (this.optional.cardExample === false) {
      this.optional.cardExampleTranslation = false;
    }
    this.setCheckboxFields();
  }

  init() {
    super.init();
    this.getSettingsElements();
    this.setCheckboxFields();
    this.watchDependenceOfThreeMainCardsField();
    console.log('this.settings', this.settings);
  }

  destroy() {
  }

  onClick(event) {
    if (event.target.id === 'settingsPageApplyButton' && this.isClickAble) {
      this.validate();
      this.options.api.updateSettings(this.settings)
        .then(() => {
          this.isClickAble = false;
          this.$root.find('#settingsPageApplyButton').removeClass('btn-primary');
          this.$root.find('#settingsPageApplyButton').addClass('btn-info');
          this.$root.find('#settingsPageApplyButton').text(buttonsText.applyButtonTextforApplying);
          setTimeout(() => this.$root.find('#settingsPageApplyButton').removeClass('btn-info'), 2000);
          setTimeout(() => this.$root.find('#settingsPageApplyButton').addClass('btn-primary'), 2000);
          setTimeout(() => this.$root.find('#settingsPageApplyButton').text(buttonsText.applyButtonStandardText), 2000);
          setTimeout(() => { this.isClickAble = true; }, 2000);
          console.log('this.settings', this.settings);
        })
        .catch(() => {
          this.isClickAble = false;
          this.$root.find('#settingsPageApplyButton').removeClass('btn-primary');
          this.$root.find('#settingsPageApplyButton').addClass('btn-warning');
          this.$root.find('#settingsPageApplyButton').text(buttonsText.textForErrors);
          setTimeout(() => this.$root.find('#settingsPageApplyButton').removeClass('btn-warning'), 2000);
          setTimeout(() => this.$root.find('#settingsPageApplyButton').addClass('btn-primary'), 2000);
          setTimeout(() => this.$root.find('#settingsPageApplyButton').text(buttonsText.applyButtonStandardText), 2000);
          setTimeout(() => { this.isClickAble = true; }, 2000);
        });
    }
    if (event.target.id === 'settingsPageResetButton' && this.isClickAble) {
      this.setStandardSettings();
      this.setCheckboxFields();
      this.options.api.updateSettings(this.settings)
        .then(() => {
          this.isClickAble = false;
          this.$root.find('#settingsPageResetButton').removeClass('btn-danger');
          this.$root.find('#settingsPageResetButton').addClass('btn-info');
          this.$root.find('#settingsPageResetButton').text(buttonsText.standardSettingsButtonTextforApplying);
          setTimeout(() => this.$root.find('#settingsPageResetButton').removeClass('btn-info'), 2000);
          setTimeout(() => this.$root.find('#settingsPageResetButton').addClass('btn-danger'), 2000);
          setTimeout(() => this.$root.find('#settingsPageResetButton').text(buttonsText.standardSettingsButtonStandardText), 2000);
          setTimeout(() => { this.isClickAble = true; }, 2000);
          console.log('this.settings', this.settings);
        })
        .catch(() => {
          this.isClickAble = false;
          this.$root.find('#settingsPageResetButton').removeClass('btn-danger');
          this.$root.find('#settingsPageResetButton').addClass('btn-warning');
          this.$root.find('#settingsPageResetButton').text(buttonsText.textForErrors);
          setTimeout(() => this.$root.find('#settingsPageResetButton').removeClass('btn-warning'), 2000);
          setTimeout(() => this.$root.find('#settingsPageResetButton').addClass('btn-danger'), 2000);
          setTimeout(() => this.$root.find('#settingsPageResetButton').text(buttonsText.standardSettingsButtonStandardText), 2000);
          setTimeout(() => { this.isClickAble = true; }, 2000);
        });
    }
  }

  onChange(event) {
    if (event.target.id === 'settingsPageCardTranslation' || event.target.id === 'settingsPageCardExplanation' || event.target.id === 'settingsPageCardExample') {
      this.watchDependenceOfThreeMainCardsField();
      this.watchThreeMainCardsField();
    }
  }

  onFocusout(event) {
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
