import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainGameHTML from './mainGame.template';

import { FILE_URL } from '../../constants/constants';

export default class MainGame extends Component {
  static className = 'MainGame';

  constructor($root, options) {
    super($root, {
      name: 'MainGame',
      listeners: ['click', 'keydown'],
      ...options,
    });

    this.options = options;
    this.settingsOptional = options.settings.optional;
    this.userCards = options.dataForApp.userCards;
    this.elements = null;
    this.state = {
      currentCard: 0,
    };
    console.log('MainGame this.options', this.options);
  }

  init() {
    super.init();
    this.getWordElements();
    // subscribes
  }

  getWordElements() {
    this.elements = {
      $wordDifficult: this.$root.find('#word-difficult'),
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
  //     $wordDifficult: this.$root.find('#word-difficult'),
  //     $wordImage: this.options.dataForApp.userCards[1],
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

    switch (buttonName) {
      case 'prev-btn':
        console.log(buttonName);
        // загрузка предыдушего слова cangeWordElements(word)
        break;

      case 'next-btn':
        console.log(buttonName);
        this.checkWord();
        break;

      case 'again-btn':
        console.log(buttonName);
        // ручное уплавление алгоритмом - again
        break;

      case 'hard-btn':
        console.log(buttonName);
        // ручное уплавление алгоритмом - hard
        break;

      case 'good-btn':
        console.log(buttonName);
        // ручное уплавление алгоритмом - good
        break;

      case 'easy-btn':
        console.log(buttonName);
        // ручное уплавление алгоритмом - easy
        break;

      case 'delete-btn':
        console.log(buttonName);
        // перенос слова в удаленные
        // переход на след слово nextWord()
        // айди слова - сохраняем персональную статистику
        break;

      case 'difficult-btn':
        console.log(buttonName);
        // перенос слова в сложные
        // переход на след слово nextWord()
        break;

      case 'show-answer-btn':
        console.log(buttonName);
        // заполняем инпут? или просто показываем
        // открываем скрытые слова в предложениях с примером и определением
        // showWordInSentence();
        // аудио
        break;

      case 'volume-btn':
        console.log(buttonName);
        this.settingsOptional.autoSound = !this.settingsOptional.autoSound;
        this.$root.find('.fa-volume-up').toggle('d-none');
        this.$root.find('.fa-volume-mute').toggle('d-none');
        break;

      default:
        console.log('default', buttonName);
        break;
    }
  }

  onKeydown(event) {
    const keyEnter = 'Enter';

    if (event.key === keyEnter) {
      console.log('Enter');
      this.checkWord();
    }
  }

  async checkWord() {
    const inputText = this.elements.$wordInput.text();
    const currentWord = this.elements.$wordEn.text();

    // проверяем инпут на соответствие
    if (inputText === currentWord) {
      // если все ок - переход к след слову?
      // открываем скрытые слова в предложениях с примером и определением
      // showWordInSentence();
      // воспроизведение аудио в зависимости от настроек
      if (this.settingsOptional.autoSound) {
        await this.speakText();
      }

      // после аудио либо автоматом на след слово
      // либо повялвение кнопок сложности (если настроены)
      if (this.settingsOptional.feedbackButtons) {
        this.$root.find('.card-footer').removeClass('none');
      } else {
        // переход на след карту
      }
      // через кнопки сложности переход на след слово
    } else {
      // если не соответствует - показываем ошибки
      // алгоритм показа ошибок
      console.log('не верно');
    }
  }

  async speakText() {
    const currentCard = this.userCards[this.state.currentCard];

    await this.playAudio(currentCard.audio);

    if (this.settingsOptional.cardExample) {
      await this.playAudio(currentCard.audioExample);
    }

    if (this.settingsOptional.cardExplanation) {
      await this.playAudio(currentCard.audioMeaning);
    }
  }

  async playAudio(audioSrc) {
    return new Promise((resolve) => {
      const url = `${FILE_URL}/${audioSrc}`;
      const audioElement = new Audio(url);

      audioElement.addEventListener('loadeddata', () => {
        audioElement.play();
      }, { once: true });

      audioElement.addEventListener('ended', () => {
        resolve();
      }, { once: true });
    });
  }

  toHTML() {
    return createMainGameHTML(this.options).trim();
  }
}
