import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainGameHTML from './mainGame.template';

import { delay } from '../../core/utils';

import { FILE_URL } from '../../constants/constants';
import UserWord from '../../core/UserWord';
// import BASE_USER_WORD from '../../constants/user-word.constants';
const DIFFICULTY = {
  again: 'again', hard: 'hard', good: 'good', easy: 'easy',
};
const AGAIN_STEP = 4;

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
    this.newWords = this.dataForApp.newWords;
    this.todayWordsToRepeat = this.dataForApp.todayWordsToRepeat;
    this.userCards = this.dataForApp.userCards;
    this.state = {
      currentCardNum: 0,
      studiedСardNum: 0,
      isChecking: false,
      currentWord: null,
      seriesOfCorrectAnswers: 0,
      longestSeriesOfCorrectAnswers: 0,
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
      $maxStudiedCards: this.$root.find('#max-studied-cards'),
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
        if (this.state.currentCardNum === this.state.studiedСardNum) {
          this.checkWord();
        } else {
          this.changeCard();
        }

        break;

      case 'again-btn':
        // над кнопками ставить время
        // ручное уплавление алгоритмом - again
        // пометка - слово повторить скоро - 1 мин?
        // переход на след карту
        this.setDifficulty(DIFFICULTY.again);
        this.changeCard();
        break;

      case 'hard-btn':
        // ручное уплавление алгоритмом - hard
        // пометка - слово повторить скоро - 10 мин?
        // переход на след карту
        this.setDifficulty(DIFFICULTY.hard);
        this.changeCard();
        break;

      case 'good-btn':
        // ручное уплавление алгоритмом - good
        // пометка - слово повторить скоро - 1 день?
        // переход на след карту
        this.setDifficulty(DIFFICULTY.good);
        this.changeCard();
        break;

      case 'easy-btn':
        // ручное уплавление алгоритмом - easy
        // пометка - слово повторить скоро - 3 дня?
        // переход на след карту
        this.setDifficulty(DIFFICULTY.easy);
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
        // айди слова - сохраняем персональную? статистику - в сложные
        // статистика по слову меняется
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
      if (this.state.currentCardNum === this.state.studiedСardNum) {
        this.checkWord();
      } else {
        this.changeCard();
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
      // отметка ок в статистике слова
      // статистика пользователя дневная и долгосрочная
      // учесть окончание карточек

      // перенести в функцию? showWordInSentence()
      this.elements.$wordExample.addClass('show-word');
      this.elements.$wordMeaning.addClass('show-word');

      // повялвение кнопок сложности (если настроены) +
      if (this.settingsOptional.feedbackButtons) {
        this.elements.$cardFooter.removeClass('invisible');
      }

      // статистика слова
      // статистика пользователя
      // считаем карту изученной до всех задержек
      this.state.studiedСardNum += 1;

      // воспроизведение аудио в зависимости от настроек +
      if (this.settingsOptional.autoSound) {
        await this.speakText();
      } else if (this.settingsOptional.feedbackButtons) { // добавить '!'
        // небольшая задержка если звук отключен
        // чтобы пользователь увидел слово
        // возможно анимация правильного ответа?
        await delay(1500);
      }

      // после аудио либо автоматом на след слово
      // либо ждем реакции через кнопки фидбэка, если они включены
      if (!this.settingsOptional.feedbackButtons) { // добавить '!'
        // переход на след карту
        // если кнопки выкючены - сами определяем алгоритм
        this.setDifficulty(DIFFICULTY.good);
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

    this.state.isChecking = false;
  }

  // проблемы при переключении далее между вызовами
  async speakText() {
    const currentCard = this.userCards[this.state.currentCardNum];

    await this.playAudio(currentCard.audio);

    if (this.settingsOptional.cardExample && this.state.isChecking) {
      await this.playAudio(currentCard.audioExample);
    }

    if (this.settingsOptional.cardExplanation && this.state.isChecking) {
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
    const nextCandNum = this.state.currentCardNum + step;

    if (nextCandNum < 0 || nextCandNum + 1 < this.state.studiedСardNum
      || nextCandNum + 1 > this.settingsOptional.cardsPerDay) {
      return;
    }

    this.state.isChecking = false;
    this.audio.pause();

    if (nextCandNum === 0 || nextCandNum < this.state.studiedСardNum) {
      this.elements.$prevBtn.addClass('arrow-disabled');
    } else if (nextCandNum + 1 === this.userCards.length) {
      this.elements.$nextBtn.addClass('arrow-disabled');
    } else {
      this.elements.$prevBtn.removeClass('arrow-disabled');
      this.elements.$nextBtn.removeClass('arrow-disabled');
    }

    this.elements.$cardFooter.addClass('invisible');

    this.elements.$studiedСardNum.text(this.state.studiedСardNum);
    this.elements.$maxStudiedCards.text(this.userCards.length);
    const percent = (this.state.studiedСardNum / this.userCards.length) * 100;
    this.elements.$progressBar.css({ width: `${percent}%` });

    const word = this.userCards[nextCandNum];
    // из статистики берем иначе 0?
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

  setDifficulty(wordDifficulty, success = true) {
    const word = this.userCards[this.state.currentCardNum];
    console.log('setDifficulty word', word);

    // проверяем есть ли для слова статистика, если нету - создаем
    if (word.userWord) {
      this.state.currentWord = word.userWord;
    } else {
      this.state.currentWord = new UserWord();
    }

    let difficulty;
    let lastRepeat;
    // let nextRepeat;
    // let counter;
    // let success;
    // let progress;
    // let status;
    // let gameError;

    // изменить и сохранить слово
    /*
    this.difficulty = 'new';
    this.optional = {
      lastRepeat: Date.now(),
      nextRepeat: 0, посчитать в зависимости от сложности
      counter: 0, показы? +1
      success: 0, угадано-неугадано - если угадано +1 success?
      progress: 0, если угадано сразу - 5? иначе 1
      status: 'active', или др (active -- для изучаемых слов, difficult -- для сложных, deleted -- для удаленных)
      gameError: false, если ошибка - не трогаем, если ок - меняем на false
    };
    */

    // определяем сложность для слова
    // сохраняем само слово
    // сохраняем статистику пользователя за день
    // долгосрочная статистика
    // если нужно добавляем в массив карточек
    // либо через одно либо в конец
    lastRepeat = Date.now();

    if (wordDifficulty === DIFFICULTY.again) {
      difficulty = DIFFICULTY.again;
      nextRepeat = lastRepeat + (60 * 1000);
      // пометка статистики
      // в конец user card если меньше 50ти (настройки)
      // иначе в начало массива повторений
      const nextRepeatCardNum = this.state.currentCardNum + AGAIN_STEP;

      if (nextRepeatCardNum > this.userCards.length) {
        this.userCards.push(word);
      } else {
        this.userCards.splice(nextRepeatCardNum, 0, word);
      }
    }

    if (wordDifficulty === DIFFICULTY.hard) {
      difficulty = DIFFICULTY.hard;
      nextRepeat = lastRepeat + (10 * 60 * 1000);
      // пометка статистики
      this.userCards.push(word);
    }

    if (wordDifficulty === DIFFICULTY.good) {
      difficulty = DIFFICULTY.good;
      nextRepeat = lastRepeat + (10 * 60 * 1000);
      // пометка статистики
      // если в первый раз - на повторение тоже
      if (this.state.currentWord.difficulty === 'new') {
        this.userCards.push(word);
      }
    }

    if (wordDifficulty === DIFFICULTY.easy) {
      // пометка статистики
    }

    console.log('setDif', this.userCards);
  }

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

  // если есть слова для повторения на сегодня
  // если на сегодня нет - берем с бекенда следующие
  // в зависимости от последней карты, на которой остановились
  // если есть карты на сегодня - в любом случае добираем
  // новыми словами с последней карты
  // если нет, значит пользователь играет в первый раз
  // либо на сегодня нет слов для повторения
  // берем с бекенда с самого начала или с последней точки

  destroy() {
    super.destroy();
    this.audio = null;
  }

  toHTML() {
    return createMainGameHTML(this.dataForApp).trim();
  }
}

// возможность запустить след партию слов
