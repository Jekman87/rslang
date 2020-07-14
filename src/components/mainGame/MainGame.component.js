import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainGameHTML from './mainGame.template';

import { delay, getResetDayTime, getStartDayTime } from '../../core/utils';
import { getIntervalsOfRepeat } from './mainGame.utils';
import UserWord from '../../core/UserWord';

import {
  FILE_URL, ONE_MINUTE, ONE_DAY, RESET_HOUR, WORD_PARAM,
} from '../../constants/constants';

const AGAIN_STEP = 4;
const BASE_STATE = {
  currentCardNum: 0,
  studiedСardNum: 0,
  currentWord: null,
  newWordsCount: 0,
  cardsCount: 0,
  correctAnswers: 0,
  errorAnswers: 0,
  currentSeries: 0,
  bestSeries: 0,
};

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
    this.statistics = this.dataForApp.statistics;
    this.shortTermStats = this.dataForApp.shortTermStats;
    this.longTermStats = this.dataForApp.longTermStats;

    this.newWords = this.dataForApp.newWords;
    this.todayWordsToRepeat = this.dataForApp.todayWordsToRepeat;
    this.userWords = this.dataForApp.userWords;
    this.userCards = this.dataForApp.userCards;

    this.state = {
      isChecking: false,
      isNewWord: true,
      isCorrect: true,
      allCardsLearned: 0,
      allWordsLearned: 0,
      resetDayTime: 0,
      startDayTime: 0,
    };
    this.updateState();

    this.elements = null;
    this.audio = new Audio();
  }

  updateState() {
    this.state.resetDayTime = getResetDayTime(RESET_HOUR);
    this.state.startDayTime = getStartDayTime(RESET_HOUR);

    if (this.longTermStats) {
      const lastIndex = this.longTermStats.length - 1;
      this.state.allCardsLearned = this.longTermStats[lastIndex].learnedCards;
      this.state.allWordsLearned = this.longTermStats[lastIndex].learnedWords;
    }

    if (this.shortTermStats
      && this.shortTermStats.timeNow < this.state.resetDayTime
      && this.shortTermStats.timeNow > this.state.startDayTime) {
      this.state = {
        ...this.state,
        ...this.shortTermStats,
      };
    } else {
      this.state = {
        ...this.state,
        ...BASE_STATE,
        cardsLeft: this.userCards.length,
      };
    }

    this.dataForApp.state = this.state;
  }

  init() {
    super.init();
    this.getCardElements();
    this.elements.$wordInput.$el.focus();
  }

  getCardElements() {
    this.elements = {
      $wordProgress: this.$root.find('#word-progress'),
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
        // пофиксить перелистывание назад перед когда идет ожидание статистики
        this.changeCard(-1);
        break;

      case 'next-btn':
        this.nextBtnHandler();

        break;

      case 'again-btn':
        // над кнопками ставить время
        // ручное уплавление алгоритмом - again
        // пометка - слово повторить скоро - 1 мин?
        // переход на след карту
        this.setDifficulty(WORD_PARAM.again);
        this.changeCard();
        this.createUserStats();
        break;

      case 'hard-btn':
        // ручное уплавление алгоритмом - hard
        // пометка - слово повторить скоро - 10 мин?
        // переход на след карту
        this.setDifficulty(WORD_PARAM.hard);
        this.changeCard();
        this.createUserStats();
        break;

      case 'good-btn':
        // ручное уплавление алгоритмом - good
        // пометка - слово повторить скоро - 1 день?
        // переход на след карту
        this.setDifficulty(WORD_PARAM.good);
        this.changeCard();
        this.createUserStats();
        break;

      case 'easy-btn':
        // ручное уплавление алгоритмом - easy
        // пометка - слово повторить скоро - 3 дня?
        // переход на след карту
        this.setDifficulty(WORD_PARAM.easy);
        this.changeCard();
        this.createUserStats();
        break;

      case 'delete-btn':
        // перенос слова в удаленные
        // убираем из карточек
        // переход на след карту
        this.setDifficulty(WORD_PARAM.deleted);
        this.changeCard();
        this.createUserStats();
        break;

      case 'difficult-btn':
        // перенос слова в сложные
        // айди слова - сохраняем персональную? статистику - в сложные
        // статистика по слову меняется
        // переход на след карту
        // кнопку открывать только после угадывания!!
        this.setDifficulty(WORD_PARAM.difficult);
        this.changeCard();
        this.createUserStats();
        break;

      case 'show-answer-btn':
        // заполняем инпут? или просто показываем скрытый спан
        // открываем скрытые слова в предложениях с примером и определением
        // showWordInSentence();
        // аудио
        // переходим автоматом или пользователю нужно ввести слово?
        // переход на след карту

        // this.setDifficulty(WORD_PARAM.again, false);
        this.changeCard();
        break;

      case 'volume-btn':
        this.settingsOptional.autoSound = !this.settingsOptional.autoSound;
        this.audio.pause();
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
      this.nextBtnHandler();
    }
  }

  nextBtnHandler() {
    if (this.state.currentCardNum === this.state.studiedСardNum) {
      this.checkWord();
    } else if (this.state.currentWord
      && this.userCards[this.state.currentCardNum]._id === this.state.currentWord._id) {
      this.changeCard();
    } else {
      this.setDifficulty(WORD_PARAM.good);
      this.changeCard();
      this.createUserStats();
    }
  }

  async checkWord() {
    if (this.state.isChecking) {
      return;
    }

    this.state.isChecking = true;
    const inputText = this.elements.$wordInput.text().toLowerCase();
    const currentWordStats = this.elements.$wordEn.text().toLowerCase();

    // проверяем инпут на соответствие
    if (inputText === currentWordStats) {
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

      // статистика пользователя
      // считаем карту изученной до всех задержек
      this.state.studiedСardNum += 1;

      // воспроизведение аудио в зависимости от настроек +
      if (this.settingsOptional.autoSound) {
        await this.speakText();
      } else if (!this.settingsOptional.feedbackButtons) { // добавить '!'
        // небольшая задержка если звук отключен
        // чтобы пользователь увидел слово
        // возможно анимация правильного ответа?
        await delay(1500);
      }

      // после аудио либо автоматом на след слово
      // либо ждем реакции через кнопки фидбэка, если они включены
      if (!this.settingsOptional.feedbackButtons) {
        // переход на след карту
        // если кнопки выкючены - сами определяем алгоритм
        this.setDifficulty(WORD_PARAM.good);
        this.changeCard();
        this.createUserStats();
      }

      // через кнопки сложности переход на след слово
    } else {
      this.isCorrect = false;

      // если не соответствует - показываем ошибки
      // алгоритм показа ошибок

      // показываем ответ как по кнопке "показать ответ"?
      // или просто на время показываем слово в инпуте?

      this.setDifficulty(WORD_PARAM.again);
      this.showWordErrors(inputText);
    }

    this.state.isChecking = false;
  }

  showWordErrors(word) {
    console.log('ошибочка', word);
    // подготовить блок со словом где каждая буква разбира на спаны
  }

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

    let progress = 1;

    if (word.userWord) {
      progress = word.userWord.optional.progress;
    }

    const wordDifficult = progress;

    this.elements.$wordProgress.text(wordDifficult);
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

  setDifficulty(wordDifficulty) {
    const currentWord = this.userCards[this.state.currentCardNum];

    console.log('test do', this.state.currentWord, currentWord);

    if (this.state.currentWord && this.state.currentWord._id === currentWord._id) {
      return;
    }

    console.log('test posle');

    this.state.isNewWord = true;

    if (currentWord.userWord) {
      this.state.isNewWord = false;
    } else {
      currentWord.userWord = new UserWord();
    }

    this.state.currentWord = currentWord;

    let {
      timeAgain,
      timeHard,
      timeGood,
      timeEasy,
      lastRepeat,
      nextRepeat,
      counter,
      success,
      progress,
      status,
      gameError,
    } = this.state.currentWord.userWord.optional;

    let { difficulty } = this.state.currentWord.userWord;

    lastRepeat = Date.now();

    switch (wordDifficulty) {
      case WORD_PARAM.again:
        difficulty = WORD_PARAM.again;
        nextRepeat = lastRepeat + timeAgain;

        if (timeAgain === ONE_MINUTE) {
          const nextRepeatCardNum = this.state.currentCardNum + AGAIN_STEP;

          if (nextRepeatCardNum > this.userCards.length - 1) {
            this.userCards.push(currentWord);
          } else {
            this.userCards.splice(nextRepeatCardNum, 0, currentWord);
          }
        } else {
          this.userCards.push(currentWord);
        }

        break;

      case WORD_PARAM.hard:
        difficulty = WORD_PARAM.hard;
        nextRepeat = lastRepeat + timeHard;

        if (timeHard < ONE_DAY) {
          this.userCards.push(currentWord);
        }

        break;

      case WORD_PARAM.good:
        difficulty = WORD_PARAM.good;
        nextRepeat = lastRepeat + timeGood;

        if (timeGood < ONE_DAY) {
          this.userCards.push(currentWord);
        }

        break;

      case WORD_PARAM.easy:
        difficulty = WORD_PARAM.easy;
        nextRepeat = lastRepeat + timeEasy;
        break;

      default:
        break;
    }

    counter += 1;
    success = this.isCorrect ? (success + 1) : success;

    if (this.state.isNewWord && this.isCorrect) {
      progress = 5;
    } else {
      progress = (progress < 5) ? (progress + 1) : progress;
    }

    if (this.isCorrect) {
      gameError = false;
    }

    if (wordDifficulty === WORD_PARAM.deleted) {
      difficulty = WORD_PARAM.good;
      nextRepeat = lastRepeat + timeGood;
      status = wordDifficulty;
    } else if (wordDifficulty === WORD_PARAM.difficult) {
      difficulty = WORD_PARAM.hard;
      nextRepeat = lastRepeat + timeHard;
      status = wordDifficulty;

      if (timeHard < ONE_DAY) {
        this.userCards.push(currentWord);
      }
    } else {
      status = WORD_PARAM.active;
    }

    const intervalParams = {
      timeAgain, timeHard, timeGood, timeEasy, difficulty,
    };

    const {
      again, hard, good, easy,
    } = getIntervalsOfRepeat(intervalParams);

    timeAgain = again;
    timeHard = hard;
    timeGood = good;
    timeEasy = easy;

    currentWord.userWord = {
      difficulty,
      optional: {
        timeAgain,
        timeHard,
        timeGood,
        timeEasy,
        lastRepeat,
        nextRepeat,
        counter,
        success,
        progress,
        status,
        gameError,
      },
    };

    this.state.currentWord.userWord = currentWord.userWord;

    if (this.state.isNewWord) {
      this.userWords.push(currentWord);
      this.options.api.createUserWord(currentWord._id, currentWord.userWord);
    } else {
      this.options.api.updateUserWord(currentWord._id, currentWord.userWord);
    }

    console.log('setDifficulty this.dataForApp', this.dataForApp);
  }

  createUserStats() {
    // краткосрочная статистика
    let {
      newWordsCount,
      cardsCount,
      cardsLeft,
      allCardsLearned,
      allWordsLearned,
      correctAnswers,
      errorAnswers,
      currentSeries,
      bestSeries,
    } = this.state;

    if (this.state.isNewWord) {
      newWordsCount += 1;
      allWordsLearned += 1;
    }

    cardsCount += 1;
    allCardsLearned += 1;
    cardsLeft = this.userCards.length - (this.state.currentCardNum + 1);

    if (this.isCorrect) {
      correctAnswers += 1;
    } else {
      errorAnswers += 1;
    }

    if (this.isCorrect) {
      currentSeries += 1;

      if (bestSeries < currentSeries) {
        bestSeries = currentSeries;
      }
    } else {
      currentSeries = 0;
    }

    this.statistics.learnedWords = allWordsLearned;
    const timeNow = Date.now();

    if (timeNow < this.state.resetDayTime) {
      this.shortTermStats = {
        currentCardNum: this.state.currentCardNum,
        studiedСardNum: this.state.currentCardNum,
        currentWord: this.state.currentWord,
        newWordsCount,
        cardsCount,
        cardsLeft,
        correctAnswers,
        errorAnswers,
        currentSeries,
        bestSeries,
        timeNow,
      };

      this.state = {
        ...this.state,
        ...this.shortTermStats,
        allWordsLearned,
        allCardsLearned,
      };
    } else {
      this.state.resetDayTime = getResetDayTime(RESET_HOUR);
      this.state.startDayTime = getStartDayTime(RESET_HOUR);

      this.shortTermStats = {
        ...BASE_STATE,
        cardsLeft: this.userCards.length,
        timeNow,
      };

      this.state = {
        ...this.state,
        ...BASE_STATE,
        cardsLeft: this.userCards.length,
      };
    }

    const longStats = {
      date: timeNow,
      learnedWords: allWordsLearned,
      learnedCards: allCardsLearned,
    };

    if (this.longTermStats) {
      const lastIndex = this.longTermStats.length - 1;
      const lastDate = this.longTermStats[lastIndex].date;

      if (lastDate > this.state.startDayTime) {
        this.longTermStats[lastIndex].learnedWords = allWordsLearned;
        this.longTermStats[lastIndex].learnedCards = allCardsLearned;
      } else {
        this.longTermStats.push(longStats);
      }
    } else {
      this.longTermStats = [longStats];
    }

    this.dataForApp.shortTermStats = this.shortTermStats;
    this.dataForApp.longTermStats = this.longTermStats;
    this.dataForApp.state = this.state;

    this.settingsOptional.MainGameShort = JSON.stringify(this.shortTermStats);
    this.settingsOptional.MainGameLong = JSON.stringify(this.longTermStats);

    this.options.api.updateSettings(this.dataForApp.settings);

    this.isCorrect = true;
    console.log('createUserStats', this.shortTermStats, this.longTermStats);
  }

  destroy() {
    super.destroy();
    this.audio = null;
  }

  toHTML() {
    return createMainGameHTML(this.dataForApp).trim();
  }
}
