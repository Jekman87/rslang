import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainGameHTML from './mainGame.template';

export default class MainGame extends Component {
  static className = 'MainGame';

  constructor($root, options) {
    super($root, {
      name: 'MainGame',
      listeners: ['click'],
      ...options,
    });

    this.options = options;
    this.elements = null;
  }

  init() {
    super.init();
    this.getWordElements();
    // subscribes
  }

  getWordElements() {
    this.elements = {
      $wordImage: this.$root.find('#word-image'),
      $wordEn: this.$root.find('#word-en'),
      $wordInput: this.$root.find('#word-input'),
      $wordTranslate: this.$root.find('#word-translate'),
      $wordTranscription: this.$root.find('#word-transcription'),
      $wordExample: this.$root.find('#word-example'),
      $wordExampleTranslate: this.$root.find('#word-example-translate'),
      $wordMeaning: this.$root.find('#word-meaning'),
      $wordMeaningTranslate: this.$root.find('#word-meaning-translate'),
    };
    // + buttons ?
  }

  // cangeWordElements() {
  //   передаем след слово
  //   this.elements = {
  //     $wordImage: this.options.dataForApp.userWords[1],
  //     $wordEn: this.$root.find('#word-en'),
  //     $wordInput: this.$root.find('#word-input'),
  //     $wordTranslate: this.$root.find('#word-translate'),
  //     $wordTranscription: this.$root.find('#word-transcription'),
  //     $wordExample: this.$root.find('#word-example'),
  //     $wordExampleTranslate: this.$root.find('#word-example-translate'),
  //     $wordMeaning: this.$root.find('#word-meaning'),
  //     $wordMeaningTranslate: this.$root.find('#word-meaning-translate'),
  //   };
  // }

  onClick(event) {
    const buttonName = $$(event.target).data.name;

    if (!buttonName) {
      return false;
    }
    console.log('buttonName', buttonName);

    switch (buttonName) {
      case 'prev-btn':
        console.log(buttonName);
        break;

      case 'next-btn':
        console.log(buttonName);
        break;

      case 'again-btn':
        console.log(buttonName);
        break;

      case 'hard-btn':
        console.log(buttonName);
        break;

      case 'good-btn':
        console.log(buttonName);
        break;

      case 'easy-btn':
        console.log(buttonName);
        break;

      case 'delete-btn':
        console.log(buttonName);
        break;

      case 'difficult-btn':
        console.log(buttonName);
        break;

      case 'show-answer-btn':
        console.log(buttonName);
        break;

      case 'volume-btn':
        console.log(buttonName);
        break;

      default:
        console.log('default', buttonName);
        break;
    }
  }

  toHTML() {
    return createMainGameHTML(this.options).trim();
  }
}
