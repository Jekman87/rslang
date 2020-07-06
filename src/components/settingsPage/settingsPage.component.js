/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createSettingsHTML from './settingsPage.template';

export default class Settings extends Component {
  static className = 'Settings';

  constructor($root, options) {
    super($root, {
      name: 'Settings',
      listeners: ['click', 'change'],
      ...options,
    });
    this.defaultSetting = {
      wordsPerDay: 20,
      optional: {
        cardsPerDay: 50,
        mixedCards: 0,
        cardTranslation: true,
        cardExplanation: true,
        cardExample: true,
        cardTranscription: true,
        cardImage: true,
        cardTranslationAfterSuccess: false,
        cardExplanationTranslation: true,
        cardExampleTranslation: true,
        autoSound: true,
        answerButton: true,
        deleteButton: true,
        difficultWordsButton: true,
        feedbackButtons: true,
        vocabularyExplanation: true,
        vocabularyExample: true,
        vocabularyTranscription: true,
        vocabularyImage: true,
      },
    };
    this.options = options;
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
    this.elements.$wordsPerDay.$el.value = this.defaultSetting.wordsPerDay;
    this.elements.$cardsPerDay.$el.value = this.defaultSetting.optional.cardsPerDay;
    const typeOfTraining = [this.elements.$mixedTraining.$el, this.elements.$onlyNewWordsTraining.$el, this.elements.$onlyOldWordsTraining.$el, this.elements.$onlyDifficultWordsTraining.$el];
    typeOfTraining.forEach((el) => {
      el.checked = false;
    });
    typeOfTraining[this.defaultSetting.optional.mixedCards].checked = true;
    this.elements.$vocabularyExplanation.$el.checked = this.defaultSetting.optional.vocabularyExplanation === true;
    this.elements.$vocabularyExample.$el.checked = this.defaultSetting.optional.vocabularyExample === true;
    this.elements.$vocabularyTranscription.$el.checked = this.defaultSetting.optional.vocabularyTranscription === true;
    this.elements.$vocabularyImage.$el.checked = this.defaultSetting.optional.vocabularyImage === true;
    this.elements.$cardTranslation.$el.checked = this.defaultSetting.optional.cardTranslation === true;
    this.elements.$cardExplanation.$el.checked = this.defaultSetting.optional.cardExplanation === true;
    this.elements.$cardExample.$el.checked = this.defaultSetting.optional.cardExample === true;
    this.elements.$cardTranscription.$el.checked = this.defaultSetting.optional.cardTranscription === true;
    this.elements.$cardImage.$el.checked = this.defaultSetting.optional.cardImage === true;
    this.elements.$cardTranslationAfterSuccess.$el.checked = this.defaultSetting.optional.cardTranslationAfterSuccess === true;
    this.elements.$cardExplanationTranslation.$el.checked = this.defaultSetting.optional.cardExplanationTranslation === true;
    this.elements.$cardExampleTranslation.$el.checked = this.defaultSetting.optional.cardExampleTranslation === true;
    this.elements.$cardAutoSound.$el.checked = this.defaultSetting.optional.autoSound === true;
    this.elements.$cardAnswerButton.$el.checked = this.defaultSetting.optional.answerButton === true;
    this.elements.$cardDifficultWordsButton.$el.checked = this.defaultSetting.optional.difficultWordsButton === true;
    this.elements.$cardDeleteButton.$el.checked = this.defaultSetting.optional.deleteButton === true;
    this.elements.$cardFeedbackButtons.$el.checked = this.defaultSetting.optional.feedbackButtons === true;
  }

  // собирать галочки из полей
  setObjectFields() {
    this.defaultSetting.wordsPerDay = this.elements.$wordsPerDay.$el.value;
    this.defaultSetting.optional.cardsPerDay = this.elements.$cardsPerDay.$el.value;
    const typeOfTraining = [this.elements.$mixedTraining.$el, this.elements.$onlyNewWordsTraining.$el, this.elements.$onlyOldWordsTraining.$el, this.elements.$onlyDifficultWordsTraining.$el];
    this.defaultSetting.optional.mixedCards = typeOfTraining.findIndex((item) => item.checked === true);
    this.defaultSetting.optional.vocabularyExplanation = this.elements.$vocabularyExplanation.$el.checked === true;
    this.defaultSetting.optional.vocabularyExample = this.elements.$vocabularyExample.$el.checked === true;
    this.defaultSetting.optional.vocabularyTranscription = this.elements.$vocabularyTranscription.$el.checked === true;
    this.defaultSetting.optional.vocabularyImage = this.elements.$vocabularyImage.$el.checked === true;
    this.defaultSetting.optional.cardTranslation = this.elements.$cardTranslation.$el.checked === true;
    this.defaultSetting.optional.cardExplanation = this.elements.$cardExplanation.$el.checked === true;
    this.defaultSetting.optional.cardExample = this.elements.$cardExample.$el.checked === true;
    this.defaultSetting.optional.cardTranscription = this.elements.$cardTranscription.$el.checked === true;
    this.defaultSetting.optional.cardImage = this.elements.$cardImage.$el.checked === true;
    this.defaultSetting.optional.cardTranslationAfterSuccess = this.elements.$cardTranslationAfterSuccess.$el.checked === true;
    this.defaultSetting.optional.cardExplanationTranslation = this.elements.$cardExplanationTranslation.$el.checked === true;
    this.defaultSetting.optional.cardExampleTranslation = this.elements.$cardExampleTranslation.$el.checked === true;
    this.defaultSetting.optional.autoSound = this.elements.$cardAutoSound.$el.checked === true;
    this.defaultSetting.optional.answerButton = this.elements.$cardAnswerButton.$el.checked === true;
    this.defaultSetting.optional.difficultWordsButton = this.elements.$cardDifficultWordsButton.$el.checked === true;
    this.defaultSetting.optional.deleteButton = this.elements.$cardDeleteButton.$el.checked === true;
    this.defaultSetting.optional.feedbackButtons = this.elements.$cardFeedbackButtons.$el.checked === true;
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

  init() {
    super.init();
    this.getSettingsElements();
    this.setCheckboxFields();
    this.watchDependenceOfThreeMainCardsField();
    console.log('myinit');
  }

  destroy() {
    console.log('destroy');
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log('Settings onClick', clickedElement);
    console.log('myconsolelog', event);
    if (event.target.id === 'settingsPageApplyButton') {
      this.setObjectFields();
      // после установки полей объекта нужно их отправить на бэкэнд?
    }
  }

  onChange(event) {
    console.log('OnChange event', event);
    if (event.target.id === 'settingsPageCardTranslation' || event.target.id === 'settingsPageCardExplanation' || event.target.id === 'settingsPageCardExample') {
      this.watchDependenceOfThreeMainCardsField();
      this.watchThreeMainCardsField();
    }
  }

  toHTML() {
    setTimeout(() => {
      this.afterRender();
    }, 2);
    return createSettingsHTML().trim();
  }

  // afterRender() {
  //   console.log('afterRender');
  //   this.wordsPerDay = document.getElementById('wordsPerDay');
  //   console.log(this.wordsPerDay);
  // }
}
