import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createMainGameHTML from './mainGame.template';
import MyKeyboard from '../../plugins/Keyboard';

import { delay, getResetDayTime, getStartDayTime } from '../../core/utils';
import { getIntervalsOfRepeat, findCommonSubstring, getWordSpans } from './mainGame.utils';
import UserWord from '../../core/UserWord';

import {
  FILE_URL, ONE_MINUTE, ONE_DAY, RESET_HOUR, WORD_PARAM,
} from '../../constants/constants';
import progressConfig from '../../constants/progress-config.constants';

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
      commonProgress: 0,
    };
    this.updateState();

    this.elements = null;
    this.audio = new Audio();
    this.myKeyboard = null;
  }

  updateState() {
    this.state.resetDayTime = getResetDayTime(RESET_HOUR);
    this.state.startDayTime = getStartDayTime(RESET_HOUR);
    this.state.commonProgress = this.settingsOptional.commonProgress;

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
        ...BASE_STATE,
        ...this.state,
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
      $settingWordsTop: this.$root.find('#setting-words-top'),
      $difficultBtn: this.$root.find('#difficult-btn'),
      $wordProgressbar: this.$root.find('#word-progressbar'),
      $wordProgressText: this.$root.find('#word-progresText'),
      $wordImage: this.$root.find('#word-image'),
      $wordBackground: this.$root.find('#word-background'),
      $wordSpans: this.$root.findAll('#word-background span'),
      $wordInput: this.$root.find('#word-input'),
      $wordTranslate: this.$root.find('#word-translate'),
      $wordTranscription: this.$root.find('#word-transcription'),
      $wordExample: this.$root.find('#word-example'),
      $wordExampleTranslate: this.$root.find('#word-example-translate'),
      $wordMeaning: this.$root.find('#word-meaning'),
      $wordMeaningTranslate: this.$root.find('#word-meaning-translate'),
      $feedbackButtons: this.$root.find('#feedback-buttons'),
      $answerButton: this.$root.find('#answer-button'),
      $volumeUp: this.$root.find('.fa-volume-up'),
      $volumeMute: this.$root.find('.fa-volume-mute'),
      $keyboardBtn: this.$root.find('#keyboard-btn'),
      $prevBtn: this.$root.find('.navigate-button.prev i'),
      $nextBtn: this.$root.find('.navigate-button.next i'),
      $studiedСardNum: this.$root.find('#studied-card-num'),
      $maxStudiedCards: this.$root.find('#max-studied-cards'),
      $cardsProgressbar: this.$root.find('#cards-progressbar'),
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
        this.nextBtnHandler();

        break;

      case 'again-btn':
        this.settingWordBtnHandler(WORD_PARAM.again);
        break;

      case 'hard-btn':
        this.settingWordBtnHandler(WORD_PARAM.hard);
        break;

      case 'good-btn':
        this.settingWordBtnHandler(WORD_PARAM.good);
        break;

      case 'easy-btn':
        this.settingWordBtnHandler(WORD_PARAM.easy);
        break;

      case 'delete-btn':
        this.settingWordBtnHandler(WORD_PARAM.deleted);
        break;

      case 'difficult-btn':
        this.settingWordBtnHandler(WORD_PARAM.difficult);
        break;

      case 'show-answer-btn':
        this.nextBtnHandler();
        this.elements.$wordExample.addClass('show-word');
        this.elements.$wordMeaning.addClass('show-word');
        break;

      case 'volume-btn':
        this.settingsOptional.autoSound = !this.settingsOptional.autoSound;
        this.audio.pause();
        this.elements.$volumeUp.toggle('d-none');
        this.elements.$volumeMute.toggle('d-none');
        break;

      case 'keyboard-btn':
        this.keyboardButtonHandler();
        break;

      default:
        break;
    }
  }

  onKeydown(event) {
    const keyEnter = 'Enter';

    if (event.key === keyEnter) {
      this.nextBtnHandler();
    } else if (event.target.tagName === 'INPUT') {
      this.elements.$wordBackground.addClass('hidden');
      this.elements.$wordBackground.removeClass('opacity');
    }
  }

  nextBtnHandler() {
    if (this.state.currentCardNum === this.state.studiedСardNum) {
      this.checkWord();
    } else {
      this.settingWordBtnHandler(WORD_PARAM.good);
    }
  }

  settingWordBtnHandler(wordParam) {
    this.setDifficulty(wordParam);
    this.changeCard();
    this.createUserStats();
  }

  keyboardButtonHandler() {
    if (!this.myKeyboard) {
      this.myKeyboard = new MyKeyboard(
        '#keyboard-wrapper',
        '#word-input',
        '#next-btn',
      );
      this.myKeyboard.renderKeyboard();
    }

    const keyboardWrapper = document.querySelector('#keyboard-wrapper');

    if (keyboardWrapper.classList.contains('keyboard-wrapper_show')) {
      keyboardWrapper.classList.remove('keyboard-wrapper_show');
      this.elements.$keyboardBtn.removeClass('active');
      this.elements.$keyboardBtn.removeClass('focus');
      this.elements.$keyboardBtn.attr('aria-pressed', null);

      this.myKeyboard.removeListeners();
    } else {
      keyboardWrapper.classList.add('keyboard-wrapper_show');
      this.elements.$keyboardBtn.addClass('focus');
      this.elements.$keyboardBtn.addClass('active');
      this.elements.$keyboardBtn.attr('aria-pressed', 'true');
      this.myKeyboard.addListeners();
    }
  }

  async checkWord() {
    if (this.state.isChecking) {
      return;
    }

    this.state.isChecking = true;
    const currentWord = this.userCards[this.state.currentCardNum];
    const currentWordText = currentWord.word.trim().toLowerCase();
    const inputWordText = this.elements.$wordInput.text().trim().toLowerCase();

    if (inputWordText === currentWordText) {
      // учесть окончание карточек
      this.elements.$wordInput.addClass('underline');

      if (this.settingsOptional.cardTranslationAfterSuccess) {
        this.elements.$wordTranslate.removeClass('d-none');
      }

      this.elements.$prevBtn.addClass('arrow-disabled');
      this.elements.$settingWordsTop.removeClass('d-none');
      this.elements.$wordExample.addClass('show-word');
      this.elements.$wordMeaning.addClass('show-word');
      // зеленый цвет если с первого раза

      if (this.state.isCorrect) {
        let newWordProgress = 1;

        if (currentWord.userWord) {
          const wordProgress = currentWord.userWord.optional.progress;
          newWordProgress = (wordProgress < 5) ? (wordProgress + 1) : wordProgress;
        } else {
          newWordProgress = 5;
        }

        this.setWordProgressElements(newWordProgress);
      }

      if (this.settingsOptional.feedbackButtons) {
        this.elements.$answerButton.addClass('invisible');
        this.elements.$feedbackButtons.removeClass('invisible');
      }

      const maxСards = this.userCards.length > this.settingsOptional.cardsPerDay
        ? this.settingsOptional.cardsPerDay : this.userCards.length;

      if (this.state.studiedСardNum !== maxСards) {
        this.state.studiedСardNum += 1;
      }

      if (this.settingsOptional.autoSound) {
        await this.speakText();
      } else if (!this.settingsOptional.feedbackButtons) {
        await delay(1500);
      }

      if (!this.settingsOptional.feedbackButtons) {
        this.setDifficulty(WORD_PARAM.good);
        this.changeCard();
        this.createUserStats();
      }
    } else {
      this.state.isCorrect = false;
      this.showWordErrors(inputWordText, currentWordText);
    }

    this.state.isChecking = false;
  }

  async showWordErrors(inputWordText, currentWordText) {
    const commonSubstring = findCommonSubstring(inputWordText, currentWordText);

    this.elements.$wordInput.text('');

    const substrlength = commonSubstring.length;
    const wordlength = currentWordText.length;
    const errorClass = ((substrlength / wordlength) * 100) > 50 ? 'orange' : 'red';
    const startIndex = currentWordText.indexOf(commonSubstring);
    const endIndex = startIndex + substrlength - 1;

    this.elements.$wordSpans.forEach((element, idx) => {
      const span = element;
      span.className = '';

      if (idx < startIndex || idx > endIndex) {
        span.classList.add(errorClass);
      }
    });

    this.elements.$wordBackground.removeClass('hidden');

    await delay(1500);
    this.elements.$wordBackground.addClass('opacity');
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

    const maxСards = this.userCards.length > this.settingsOptional.cardsPerDay
      ? this.settingsOptional.cardsPerDay : this.userCards.length;

    if (nextCandNum < 0 || nextCandNum + 1 < this.state.studiedСardNum
      || nextCandNum + 1 > maxСards) {
      return;
    }

    this.elements.$wordInput.removeClass('underline');
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

    this.elements.$settingWordsTop.addClass('d-none');
    this.elements.$difficultBtn.attr('disabled', null);
    this.elements.$feedbackButtons.addClass('invisible');
    this.elements.$answerButton.removeClass('invisible');
    this.elements.$studiedСardNum.text(this.state.studiedСardNum);
    this.elements.$maxStudiedCards.text(maxСards);
    const percentCardsProgressbar = (this.state.studiedСardNum / maxСards) * 100;
    this.elements.$cardsProgressbar.css({ width: `${percentCardsProgressbar}%` });

    const word = this.userCards[nextCandNum];

    if (word.userWord && word.userWord.optional.status === 'difficult') {
      this.elements.$difficultBtn.attr('disabled', 'true');
    }

    let progress = 1;

    if (word.userWord) {
      progress = word.userWord.optional.progress;
    }

    this.setWordProgressElements(progress);

    this.elements.$wordImage.$el.src = `${FILE_URL}/${word.image}`;
    // предзагрузка картинки следующей карты?
    console.log('Подсказка для проверяющих: ', word.word);

    const wordSpans = getWordSpans(word.word);
    this.elements.$wordBackground.html(wordSpans);
    this.elements.$wordSpans = this.$root.findAll('#word-background span');

    if (this.settingsOptional.cardTranslationAfterSuccess) {
      this.elements.$wordTranslate.add('d-none');
    }

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
    this.elements.$wordInput.$el.focus();
  }

  setWordProgressElements(wordProgress) {
    const wordProgressbarBgColor = progressConfig.bgColor[wordProgress - 1];
    const wordProgressbarBarWidth = progressConfig.barWidth[wordProgress - 1];
    const wordProgressText = progressConfig.text[wordProgress - 1];

    this.elements.$wordProgressbar.$el.className = `progress-bar progress-bar-striped ${wordProgressbarBgColor}`;
    this.elements.$wordProgressbar.css({ width: `${wordProgressbarBarWidth}%` });
    this.elements.$wordProgressText.html(wordProgressText);
  }

  setDifficulty(wordDifficulty) {
    const currentWord = this.userCards[this.state.currentCardNum];

    if (this.state.currentWord && this.state.currentWord._id === currentWord._id) {
      return;
    }

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

    if (this.state.isCorrect) {
      success += 1;
      this.state.commonProgress += 1;
      gameError = false;
    }

    if (this.state.isCorrect && this.state.isNewWord) {
      progress = 5;
    } else {
      progress = (progress < 5) ? (progress + 1) : progress;
    }

    if (wordDifficulty === WORD_PARAM.deleted) {
      difficulty = WORD_PARAM.easy;
      nextRepeat = lastRepeat + timeEasy;
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
    cardsLeft = this.userCards.length - this.state.currentCardNum;

    if (this.state.isCorrect) {
      correctAnswers += 1;
    } else {
      errorAnswers += 1;
    }

    if (this.state.isCorrect) {
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

      // cardsLeft считать по-другому
      this.shortTermStats = {
        ...BASE_STATE,
        cardsLeft: this.userCards.length,
        timeNow,
      };

      this.state = {
        ...this.state,
        ...this.shortTermStats,
        allWordsLearned,
        allCardsLearned,
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
    this.settingsOptional.commonProgress = this.state.commonProgress;

    this.options.api.updateSettings(this.dataForApp.settings);

    this.state.isCorrect = true;
    console.log('createUserStats state', this.state);
  }

  destroy() {
    super.destroy();
    this.audio.pause();
    this.audio = null;
    this.myKeyboard = null;
  }

  toHTML() {
    return createMainGameHTML(this.dataForApp).trim();
  }
}
