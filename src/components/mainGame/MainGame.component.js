import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainGameHTML from './mainGame.template';

import { delay } from '../../core/utils';

import { FILE_URL } from '../../constants/constants';

export default class MainGame extends Component {
  static className = 'MainGame';

  constructor($root, options) {
    super($root, {
      name: 'MainGame',
      listeners: ['click', 'keydown'],
      ...options,
    });
    console.log('MainGame this.options', options);
    this.options = options;
    this.dataForApp = options.dataForApp;
    this.settingsOptional = this.dataForApp.settings.optional;
    this.userCards = this.dataForApp.userCards;
    this.userWords = this.dataForApp.userWords;
    this.state = {
      currentCardNum: 0,
      studiedСardNum: 0,
      isChecking: false,
    };
    this.dataForApp.state = this.state;
    this.elements = null;
    this.audio = new Audio();
  }

  init() {
    super.init();
    this.getCardElements();
    this.elements.$wordInput.$el.focus();
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

  async onClick(event) {
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
        // доработать повторное нажатие
        if (this.state.currentCardNum >= this.state.studiedСardNum) {
          this.checkWord();
        } else {
          this.changeCard(1);
        }

        break;

      case 'again-btn':
        // над кнопками ставить время
        // ручное уплавление алгоритмом - again
        // пометка - слово повторить скоро - 1 мин?
        // переход на след карту
        this.changeCard(1);
        break;

      case 'hard-btn':
        // ручное уплавление алгоритмом - hard
        // пометка - слово повторить скоро - 10 мин?
        // переход на след карту
        this.changeCard(1);
        break;

      case 'good-btn':
        // ручное уплавление алгоритмом - good
        // пометка - слово повторить скоро - 1 день?
        // переход на след карту
        this.changeCard(1);
        break;

      case 'easy-btn':
        // ручное уплавление алгоритмом - easy
        // пометка - слово повторить скоро - 2 дня?
        // переход на след карту
        this.changeCard(1);
        break;

      case 'delete-btn':
        // перенос слова в удаленные
        // убираем из карточек
        // айди слова - сохраняем персональную? статистику - в удаленные
        // переход на след карту
        this.changeCard(1);
        break;

      case 'difficult-btn':
        // перенос слова в сложные
        // убираем из карточек ?
        // айди слова - сохраняем персональную? статистику - в сложные
        // переход на след карту
        this.changeCard(1);
        break;

      case 'show-answer-btn':
        // заполняем инпут? или просто показываем скрытый спан
        // открываем скрытые слова в предложениях с примером и определением
        // showWordInSentence();
        // аудио
        // переходим автоматом или пользователю нужно ввести слово?
        // переход на след карту
        this.changeCard(1);
        break;

      case 'volume-btn':
        // сделать прерывание звука
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
      if (this.state.currentCardNum >= this.state.studiedСardNum) {
        this.checkWord();
      } else {
        this.changeCard(1);
      }
    }
  }

  async checkWord() {
    if (this.state.isChecking) {
      return;
    }

    this.state.isChecking = true;
    const inputText = this.elements.$wordInput.text();
    const currentWord = this.elements.$wordEn.text();

    // проверяем инпут на соответствие
    // проверка на текущее изучаемое слово для листания
    if (inputText === currentWord) {
      // отметка ок в статистике
      // учесть окончание карточек
      // перенести в функцию? showWordInSentence()
      this.elements.$wordExample.addClass('show-word');
      this.elements.$wordMeaning.addClass('show-word');

      // повялвение кнопок сложности (если настроены) +
      if (this.settingsOptional.feedbackButtons) {
        this.elements.$cardFooter.removeClass('invisible');
      }
      // воспроизведение аудио в зависимости от настроек +
      if (this.settingsOptional.autoSound) {
        await this.speakText();
      } else if (this.settingsOptional.feedbackButtons) { // добавить '!'
        // небольшая задержка если звук отключен
        // чтобы пользователь увидел слово
        // возможно анимация правильного ответа?
        await delay(1500);
      }

      // статистика слова
      // статистика пользователя

      this.state.studiedСardNum += 1;
      this.elements.$studiedСardNum.text(this.state.studiedСardNum);
      const percent = (this.state.studiedСardNum / this.settingsOptional.cardsPerDay) * 100;
      this.elements.$progressBar.css({ width: `${percent}%` });

      // после аудио либо автоматом на след слово
      // либо ждем реакции через кнопки фидбэка, если они включены
      if (this.settingsOptional.feedbackButtons) { // добавить '!'
        // переход на след карту
        this.changeCard(1);
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

    this.state.isChecking = false;
  }

  // проблемы при переключении далее между вызовами
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
      this.audio.src = url;

      this.audio.onloadeddata = this.audio.play;
      this.audio.onended = resolve;
    });
  }

  changeCard(step = 1) {
    console.log('change card');
    const nextCandNum = this.state.currentCardNum + step;

    if (nextCandNum < 0 || nextCandNum + 1 < this.state.studiedСardNum
      || nextCandNum + 1 > this.settingsOptional.cardsPerDay) {
      return;
    }

    this.state.isChecking = false;
    this.audio.pause();

    if (nextCandNum === 0 || nextCandNum < this.state.studiedСardNum) {
      this.elements.$prevBtn.addClass('arrow-disabled');
    } else if (nextCandNum + 1 === this.settingsOptional.cardsPerDay) {
      this.elements.$nextBtn.addClass('arrow-disabled');
    } else {
      this.elements.$prevBtn.removeClass('arrow-disabled');
      this.elements.$nextBtn.removeClass('arrow-disabled');
    }

    this.elements.$cardFooter.addClass('invisible');

    const word = this.userCards[nextCandNum];
    // из статистики берем
    const wordDifficult = 0;

    this.elements.$wordDifficult.text(wordDifficult);
    this.elements.$wordImage.$el.src = `${FILE_URL}/${word.image}`;
    // предзагрузка картинки следующей карты?
    this.elements.$wordEn.text(word.word);
    this.elements.$wordTranslate.html(word.wordTranslate);
    this.elements.$wordTranscription.html(word.transcription);
    this.elements.$wordExample.html(word.textExample);
    this.elements.$wordExampleTranslate.html(word.textExampleTranslate);
    this.elements.$wordMeaning.html(word.textMeaning);
    this.elements.$wordMeaningTranslate.html(word.textMeaningTranslate);

    if (nextCandNum === this.state.studiedСardNum) {
      this.elements.$wordExample.removeClass('show-word');
      this.elements.$wordMeaning.removeClass('show-word');
      this.elements.$wordInput.text('');
    } else {
      this.elements.$wordExample.addClass('show-word');
      this.elements.$wordMeaning.addClass('show-word');
      this.elements.$wordInput.text(word.word);
    }

    this.state.currentCardNum = nextCandNum;
  }

  intervalRepetitionAlgorithm() {
    /*
    первым делом идут карты на повторение, затем новые слова
    нет на повторении - начинаем с новых
    сейчас 20 карточек, нужно добить до 50
    изначальные 20 - новые слова - лучше увеличивать при  хорошем прогрессе
    при угадывании/неугадывании - идет пометка в статистику слова

    вначале 10 новых слов - 10 повторений
    10 новых, 10 повторений - итого 40
    еще 10 заполнить теми, где были ошибки/нажата кнопка "снова", из 1й партии
    или сделать меньше карт? На сегодня карт больше нет...
    динамическая смена количества карт??!
    несколько прогрессбаров
    новые слова, изучаемые на повторении

    далее (след день) начать с повтора 20 карт? или части из них, которые сложные

    */
  }

  destroy() {
    super.destroy();
    this.audio = null;
  }

  toHTML() {
    return createMainGameHTML(this.dataForApp).trim();
  }
}

// возможность запустить след партию слов
