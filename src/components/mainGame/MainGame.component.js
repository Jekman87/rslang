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

    this.dataForApp = options.dataForApp;
    this.settingsOptional = this.dataForApp.settings.optional;
    this.userCards = this.dataForApp.userCards;
    this.state = this.dataForApp.state;
    this.elements = null;
    console.log('MainGame this.options', options);
  }

  init() {
    super.init();
    this.getCardElements();
    // subscribes
  }

  getCardElements() {
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
      $cardFooter: this.$root.find('.card-footer'),
      $volumeUp: this.$root.find('.fa-volume-up'),
      $volumeMute: this.$root.find('.fa-volume-mute'),
      $prevBtn: this.$root.find('.navigate-button.prev i'),
      $nextBtn: this.$root.find('.navigate-button.next i'),
      $studiedСardNum: this.$root.find('#studied-card-num'),
      $progressBar: this.$root.find('.progress-bar'),
    };
  }

  onClick(event) {
    const buttonName = $$(event.target).data.name;

    if (!buttonName) {
      return;
    }
    console.log(buttonName);

    switch (buttonName) {
      case 'prev-btn':
        this.changeCard(-1);
        break;

      case 'next-btn':
        this.checkWord();
        break;

      case 'again-btn':
        // ручное уплавление алгоритмом - again
        // пометка - слово повторить скоро - 1 мин?
        // переход на след карту
        this.changeCard();
        break;

      case 'hard-btn':
        // ручное уплавление алгоритмом - hard
        // пометка - слово повторить скоро - 10 мин?
        // переход на след карту
        this.changeCard();
        break;

      case 'good-btn':
        // ручное уплавление алгоритмом - good
        // пометка - слово повторить скоро - 1 день?
        // переход на след карту
        this.changeCard();
        break;

      case 'easy-btn':
        // ручное уплавление алгоритмом - easy
        // пометка - слово повторить скоро - 2 дня?
        // переход на след карту
        this.changeCard();
        break;

      case 'delete-btn':
        // перенос слова в удаленные
        // убираем из карточек
        // айди слова - сохраняем персональную? статистику - в удаленные
        // переход на след карту
        this.changeCard();
        break;

      case 'difficult-btn':
        // перенос слова в сложные
        // убираем из карточек ?
        // айди слова - сохраняем персональную? статистику - в сложные
        // переход на след карту
        this.changeCard();
        break;

      case 'show-answer-btn':
        // заполняем инпут? или просто показываем скрытый спан
        // открываем скрытые слова в предложениях с примером и определением
        // showWordInSentence();
        // аудио
        // переходим автоматом или пользователю нужно ввести слово?
        // переход на след карту
        this.changeCard();
        break;

      case 'volume-btn':
        this.settingsOptional.autoSound = !this.settingsOptional.autoSound;
        this.elements.$volumeUp.toggle('d-none');
        this.elements.$volumeMute.toggle('d-none');
        break;

      default:
        break;
    }
  }

  onKeydown(event) {
    const keyEnter = 'Enter';

    if (event.key === keyEnter) {
      this.checkWord();
    }
  }

  async checkWord() {
    const inputText = this.elements.$wordInput.text();
    const currentWord = this.elements.$wordEn.text();

    // проверяем инпут на соответствие
    // проверка на текущее изучаемое слово для листания
    if (inputText === currentWord) {
      // отметка ок в статистике

      // открываем скрытые слова в предложениях с примером и определением +
      // showWordInSentence();
      this.elements.$wordExample.addClass('show-word');
      this.elements.$wordMeaning.addClass('show-word');

      // повялвение кнопок сложности (если настроены) +
      if (this.settingsOptional.feedbackButtons) {
        this.elements.$cardFooter.removeClass('invisible');
      }
      // воспроизведение аудио в зависимости от настроек +
      if (this.settingsOptional.autoSound) {
        await this.speakText();
      }

      // после аудио либо автоматом на след слово
      // либо ждем реакции через кнопки фидбэка, если они включены
      if (this.settingsOptional.feedbackButtons) { // добавить !
        // переход на след карту
        this.changeCard();
      }

      // через кнопки сложности переход на след слово
    } else {
      // отметка не ок в статистике
      // если не соответствует - показываем ошибки
      // алгоритм показа ошибок
      // показываем ответ как по кнопке "показать ответ"?
      // или просто на время показываем слово в инпуте?
      console.log('не верно');
    }
  }

  async speakText() {
    const currentCard = this.userCards[this.state.currentCardNum];

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

  changeCard(step = 1) {
    console.log('change card');
    const nextCandNum = this.state.currentCardNum + step;

    if (nextCandNum < 0 || nextCandNum + 1 > this.settingsOptional.cardsPerDay) {
      return;
    }

    if (nextCandNum === 0) {
      this.elements.$prevBtn.addClass('arrow-disabled');
    } else if (nextCandNum + 1 === this.settingsOptional.cardsPerDay) {
      this.elements.$nextBtn.addClass('arrow-disabled');
    } else {
      this.elements.$prevBtn.removeClass('arrow-disabled');
      this.elements.$nextBtn.removeClass('arrow-disabled');
    }

    this.elements.$wordExample.removeClass('show-word');
    this.elements.$wordMeaning.removeClass('show-word');
    this.elements.$cardFooter.addClass('invisible');

    this.state.currentCardNum = nextCandNum;

    if (nextCandNum > this.state.studiedСardNum) {
      this.state.studiedСardNum = nextCandNum;
      this.elements.$studiedСardNum.text(nextCandNum + 1);
      const progressPercent = ((nextCandNum + 1) / this.settingsOptional.cardsPerDay) * 100;
      this.elements.$progressBar.css({ width: `${progressPercent}%` });
      // статистика?
    }

    const word = this.userCards[nextCandNum];
    // из статистики берем
    const wordDifficult = 0;

    this.elements.$wordDifficult.text(wordDifficult);
    this.elements.$wordImage.$el.src = `${FILE_URL}/${word.image}`;
    // предзагрузка картинки следующей карты?
    this.elements.$wordEn.text(word.word);
    this.elements.$wordInput.text((nextCandNum === this.state.studiedСardNum ? '' : word.word));
    this.elements.$wordTranslate.html(word.wordTranslate);
    this.elements.$wordTranscription.html(word.transcription);
    this.elements.$wordExample.html(word.textExample);
    this.elements.$wordExampleTranslate.html(word.textExampleTranslate);
    this.elements.$wordMeaning.html(word.textMeaning);
    this.elements.$wordMeaningTranslate.html(word.textMeaningTranslate);
  }

  toHTML() {
    return createMainGameHTML(this.dataForApp).trim();
  }
}
