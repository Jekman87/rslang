/* eslint-disable arrow-body-style */
/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable one-var-declaration-per-line */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

// exapmle of file string https://raw.githubusercontent.com/av-shell/rslang-data/master/files/01_0009.jpg
import book1 from './js/book1.js';
import createEssence from './js/createEssence';
import { setSettingsToStorage, getSettingsFromStorage } from './js/myStorage';
import { storage } from '../../core/utils';
import showTemplate from './js/template';
import './sass/style.scss';
import BASE_USER_WORD from '../../constants/user-word.constants';
import $$ from '../../core/domManipulation';
import Observer from '../../core/Observer';


const gameFailHeaderText = 'В этот раз всё великолепно';
const gameWinWithErrorHeaderText = 'В этот раз не получилось, но продолжай тренироваться!';
const gameWinHeaderText = 'В этот раз неплохо, но можно и лучше!';


export default class Savannah {
  static className = 'Savannah';

  constructor(selector, options) {
    console.log('constructor');
    if (typeof selector === 'string') {
      this.rootTag = document.querySelector(selector);
    } else {
      this.rootTag = selector;
    }
    this.options = options;
    console.log(options);

    const { statistics, settings } = this.options.dataForApp;
    const gameNameLongStats = [
      { data: 123, round: '2-18', result: '16-4' },
      // ... всего 10 раундов-объектов, если нужно больше - делаем больше
    ];
    console.log(statistics, settings);

    this.suprermegaarray = [{ 1: 'a' }, { 2: 'b' }, { 3: 'c' }];
    console.log('test1', this.suprermegaarray);
    this.suprermegaarray = [{ 1: 'A' }, { 2: 'B' }, { 3: 'C' }];
    console.log('test2', this.suprermegaarray);

    setTimeout(() => {
      this.suprermegaarray[2][3] = 'D';
      console.log('test3', this.suprermegaarray);
    }, 5000);
    // this.suprermegaarray[2][3] = 'D';
    // console.log('test3', this.suprermegaarray);
    //   const newStats = {
    //     ...stats,
    //     gameNameLong: JSON.stringify(gameNameLongStats),
    //     gameNameMain: JSON.stringify(gameNameMainStats),
    // };


    // otladka
    // window.savanna = {};
    // window.savanna.options = options;
    // window.savanna.word = BASE_USER_WORD;
    this.gameState = {};
    this.gameState.wordArrays = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    };

    if (settings.optional.savannaSettings) {
      const savannaSettings = JSON.parse(settings.optional.savannaSettings);
      console.log('savanna settings from API', savannaSettings);
      window.savannaSettings = savannaSettings;
      this.localSettings = {};
      // mod variant of this.localSettings.gameLevel = savannaSettings.gameLevel || 1;
      if ((savannaSettings.gameLevel !== null)
        && ((typeof savannaSettings.gameLevel) === 'number')
        && (savannaSettings.gameLevel >= 1)
        && (savannaSettings.gameLevel <= 6)) {
        this.localSettings.gameLevel = savannaSettings.gameLevel;
      } else {
        this.localSettings.gameLevel = 1;
      }

      // mod variant of this.localSettings.gameWithLearnedWords = savannaSettings.gameWithLearnedWords || true;
      if ((savannaSettings.gameWithLearnedWords !== null)
        && ((typeof savannaSettings.gameWithLearnedWords) === 'boolean')) {
        this.localSettings.gameWithLearnedWords = savannaSettings.gameWithLearnedWords;
      } else {
        this.localSettings.gameWithLearnedWords = true;
      }

      // mod variant of this.localSettings.gameInvert = savannaSettings.gameInvert || false;
      if ((savannaSettings.gameInvert !== null)
        && ((typeof savannaSettings.gameInvert) === 'boolean')) {
        this.localSettings.gameInvert = savannaSettings.gameInvert;
      } else {
        this.localSettings.gameInvert = true;
      }

      // mod variant of this.localSettings.gameIrregularVerbs = savannaSettings.gameIrregularVerbs || false;
      if ((savannaSettings.gameIrregularVerbs !== null)
        && ((typeof savannaSettings.gameIrregularVerbs) === 'boolean')) {
        this.localSettings.gameIrregularVerbs = false; // savannaSettings.gameIrregularVerbs;
      } else {
        this.localSettings.gameIrregularVerbs = false;
      }

      console.log('this.localSettings', this.localSettings);
      // gameLevel: 1,
      // gameWithLearnedWords: true,
      // gameInvert: false,
      // gameIrregularVerbs: false,
    } else {
      this.localSettings = {
        gameLevel: 1,
        gameWithLearnedWords: true,
        gameInvert: false,
        gameIrregularVerbs: false,
      };
      console.log('else this.localSettings', this.localSettings);
    }


    // TODO: remove after debugging
    window.savannaLocalSettings = this.localSettings;
    window.savannaGameState = this.gameState;
    //     this.localSettings = getSettingsFromStorage('savannaGameLocalSettings') || {
    //   gameLevel: 1,
    //   gameWithLearnedWords: true,
    //   gameInvert: false,
    //   gameIrregularVerbs: false,
    // };
    // this.$el = $$(selector);
    // this.components = [];
    // /* this.observer = new Observer(); */
    // this.observer = options.observer;
    // this.dataForApp = {};
  }

  render() {
    this.rootTag.innerHTML = showTemplate();

    this.audioBip = document.getElementById('SavannaAudioBip');
    this.audioGong = document.getElementById('SavannaAudioGong');
    this.audioCorrect = document.getElementById('SavannaAudioCorrect');
    this.audioWrong = document.getElementById('SavannaAudioWrong');
    this.audioResults = document.getElementById('SavannaAudioResults');
    this.gameWordArray = [];
    this.fallingWordContainer = document.getElementById('fallingWordContainer');
    this.fallingEnergyContainer = document.getElementById('fallingEnergyContainer');
    this.animationEnd = 0;
    this.answbtn0 = document.getElementById('savanna-answer-btn0');
    this.answbtn1 = document.getElementById('savanna-answer-btn1');
    this.answbtn2 = document.getElementById('savanna-answer-btn2');
    this.answbtn3 = document.getElementById('savanna-answer-btn3');

    this.answbtnArray = [
      document.getElementById('savanna-answer-btn0'),
      document.getElementById('savanna-answer-btn1'),
      document.getElementById('savanna-answer-btn2'),
      document.getElementById('savanna-answer-btn3'),
    ];
    this.questionWord = document.getElementById('savanna-question-word');
    this.crystall = document.getElementById('savanna-crystall');
    this.gameSettingsButton = document.getElementById('savanna-game-settings-button');
    this.gameSettingsButtonIcon = document.getElementById('savanna-game-settings-button-icon');
    this.goHomeButton = document.getElementById('savanna-go-home');
    this.gemeSettingsCard = this.rootTag.querySelector('.savanna-setting-card');
    this.soundOnIcon = document.querySelector('.savanna-soundOn');
    this.soundOffIcon = document.querySelector('.savanna-soundOff');
    this.soundOffIcon.classList.add('savanna-display-none');
    this.soundContainers = this.rootTag.querySelectorAll('.savanna-audioSource');
    this.gameLives = this.rootTag.querySelectorAll('.savanna-lives');

    this.startSavannaGameButton = document.getElementById('startSavannaGameButton');
    this.savannaMainSpinnerHeader = document.getElementById('savannaMainSpinnerHeader');

    // this.localSettings = getSettingsFromStorage('savannaGameLocalSettings') || {
    //   gameLevel: 1,
    //   gameWithLearnedWords: true,
    //   gameInvert: false,
    //   gameIrregularVerbs: false,
    // };
    this.settingsElemetns = {};
    this.settingsElemetns.level = document.getElementById('savannaGameLevel');
    this.settingsElemetns.isLearnedWords1 = document.getElementById('savannaisLearnedWords1');
    this.settingsElemetns.isLearnedWords2 = document.getElementById('savannaisLearnedWords2');
    this.settingsElemetns.gameInvert = document.getElementById('savannaSettingsGameInvert');
    this.settingsElemetns.gameIrregularVerbs = document.getElementById('savannaSettingsGameIrregularVerbs');
    this._setGameSettings();

    this.savannaStatisticHeadingElement = document.getElementById('savannaStatisticHeadingElement');
    this.savannaStatisticContent = document.getElementById('savannaStatisticContent');
    // Create Binded LISTENERS
    this.onClick = this._resolveClicks.bind(this);
    this.onAnimationEnd = this._resolveAnimationEnd.bind(this);
    this.onChange = this._resolveChange.bind(this);
    this.onKeyDown = this._resolveKeyDown.bind(this);
    // ADD LISTENERS
    this.rootTag.addEventListener('click', this.onClick);
    this.rootTag.addEventListener('animationend', this.onAnimationEnd);
    this.rootTag.addEventListener('change', this.onChange);
    document.addEventListener('keydown', this.onKeyDown);
    console.log('start application');
  }

  _setGameSettings() {
    this.settingsElemetns.level.value = this.localSettings.gameLevel;
    this.settingsElemetns.isLearnedWords1.checked = this.localSettings.gameWithLearnedWords;
    this.settingsElemetns.isLearnedWords2.checked = !(this.localSettings.gameWithLearnedWords);
    this.settingsElemetns.gameInvert.checked = this.localSettings.gameInvert;
    this.settingsElemetns.gameIrregularVerbs.checked = this.localSettings.gameIrregularVerbs;
  }

  _getGameSettings() {
    this.localSettings.gameLevel = Number(this.settingsElemetns.level.value);
    if (Number.isNaN(this.localSettings.gameLevel)
      || (this.localSettings.gameLevel < 1)
      || (this.localSettings.gameLevel > 6)) {
      this.localSettings.gameLevel = 1;
    }
    this.localSettings.gameWithLearnedWords = this.settingsElemetns.isLearnedWords1.checked;
    this.localSettings.gameInvert = this.settingsElemetns.gameInvert.checked;
    this.localSettings.gameIrregularVerbs = this.settingsElemetns.gameIrregularVerbs.checked;
  }

  _startGame() {
    this.options.dataForApp.settings.optional.savannaSettings = JSON.stringify(this.localSettings);

    try {
      this.options.api.updateSettings(this.options.dataForApp.settings).catch((err) => {
        console.log('ошибка при работе с апи', err);
      });
    } catch (err) {
      console.log('ошибка при работе с апи', err);
    }
    console.log(this.options);

    this.savannaMainSpinnerHeader.textContent = 'Ищем безопасное место';
    document.getElementById('savanna-start-page').classList.add('savanna-display-none');
    document.getElementById('savanna-preloader-countdown').textContent = '';
    document.getElementById('savanna-main-spinner').classList.remove('savanna-display-none');

    if (this.gameState.wordArrays[this.localSettings.gameLevel] === null) {
      this.options.api.getAllUserAggregatedWords(this.localSettings.gameLevel - 1, 6000, '{"$or":[{"$or":[{"userWord.optional.gameError":false}, {"userWord.optional.gameError":true}]},{"userWord":null}]}').then((e) => {
        console.log('then', e);
        this.gameState.wordArrays[this.localSettings.gameLevel] = e[0].paginatedResults;
        this.gameState.isWordsFromBackend = true;
        this._prepareWords();
      }).catch((e) => {
        console.log('catch', e);
        this.gameState.isWordsFromBackend = false;
        this._prepareWords();
      });
    } else {
      this.gameState.isWordsFromBackend = true;
      this._prepareWords();
    }
  }

  _prepareWords() {
    this.savannaMainSpinnerHeader.textContent = 'Организуем стоянку';
    this._gameDataPrepare();
    this.savannaMainSpinnerHeader.textContent = 'Усаживаемся поудобнее';
    setTimeout(() => {
      document.getElementById('savanna-preloader-countdown').textContent = '3';
      document.getElementById('SavannaAudioBip').play().catch(() => true);
    }, 500);
    setTimeout(() => {
      document.getElementById('savanna-preloader-countdown').textContent = '2';
      document.getElementById('SavannaAudioBip').play().catch(() => true);
    }, 1500);
    setTimeout(() => {
      document.getElementById('savanna-preloader-countdown').textContent = '1';
      document.getElementById('SavannaAudioBip').play().catch(() => true);
    }, 2500);
    setTimeout(() => {
      document.getElementById('savanna-preloader-countdown').textContent = 'Поехали';
      document.getElementById('SavannaAudioGong').play().catch(() => true);
    }, 3500);
    setTimeout(() => {
      // document.getElementById('savanna-main-spinner').classList.add('savanna-display-none');
      // document.getElementById('savanna-game-page').classList.remove('savanna-display-none');
    }, 4500);
    setTimeout(() => {
      document.getElementById('SavannaAudioGong').pause();
      document.getElementById('SavannaAudioGong').currentTime = 0;
      document.getElementById('savanna-main-spinner').classList.add('savanna-display-none');
      document.getElementById('savanna-game-page').classList.remove('savanna-display-none');
    }, 5500);
  }

  _audioStopAllSound() {
    this.soundContainers.forEach((el) => {
      el.pause();
      el.currentTime = 0;
    });
  }

  _audioMute() {
    console.log('muted');
    this._audioStopAllSound();
    this.soundContainers.forEach((el) => {
      el.muted = true;
    });
  }

  _audioUnmute() {
    console.log('unmuted');
    this._audioStopAllSound();
    this.soundContainers.forEach((el) => {
      el.muted = false;
    });
  }


  _gameDataPrepare() {
    // this.gameState.wordArrays[this.localSettings.gameLevel] = e[0].paginatedResults;
    // this.gameState.isWordsFromBackend = true;
    let tmpArray = [];
    if (this.localSettings.gameWithLearnedWords) {
      if (this.gameState.isWordsFromBackend) {
        tmpArray = this.gameState.wordArrays[this.localSettings.gameLevel].filter((el) => {
          if (el.userWord) {
            return true;
          }
          return false;
        }).sort((a, b) => {
          if (a.userWord.optional.gameError === b.userWord.optional.gameError) {
            return 0;
          }
          if (a.userWord.optional.gameError) {
            return -1;
          }
          return 1;
        });
        if (tmpArray.length < 30) {
          let tmpArray2 = this.gameState.wordArrays[this.localSettings.gameLevel].filter((el) => !(el.userWord));
          this.shuffle(tmpArray2);
          console.log('learned words sorting', tmpArray);
          tmpArray = tmpArray.concat(tmpArray2.slice(0, 30 - tmpArray.length));
          console.log('learned words sorting', tmpArray.slice(0, 30));
          // console.log('tmpArray2:', tmpArray2);
        } else {
          // TODO: сделать шафл  части без ошибок.
          tmpArray = tmpArray.slice(0, 30);
        }
        console.log('learned words sorting', tmpArray);
        this.shuffle(tmpArray);
      } else {
        tmpArray = book1.filter((el) => true);
        this.shuffle(tmpArray);
        tmpArray = tmpArray.slice(0, 30);
      }
    } else {
      if (this.gameState.isWordsFromBackend) {
        tmpArray = this.gameState.wordArrays[this.localSettings.gameLevel].filter((el) => !(el.userWord));
        if (tmpArray.length < 30) {
          let tmpArray2 = this.gameState.wordArrays[this.localSettings.gameLevel]
            .filter((el) => !!(el.userWord))
            .sort((a, b) => {
              if (a.userWord.optional.gameError === b.userWord.optional.gameError) {
                return 0;
              }
              if (a.userWord.optional.gameError) {
                return -1;
              }
              return 1;
            });
          tmpArray = tmpArray.concat(tmpArray2.slice(0, 30 - tmpArray.length));
        } else {
          this.shuffle(tmpArray);
          tmpArray = tmpArray.slice(0, 30);
        }
      } else {
        tmpArray = book1.filter((el) => true);
        this.shuffle(tmpArray);
        tmpArray = tmpArray.slice(0, 30);
      }
    }
    console.log('tmpArray:', tmpArray);

    this.gameWordArray = tmpArray;
    // let shift = Math.floor(Math.random() * 4);
    // this.gameWordArray = [];
    // for (let i = 0; i < 120; i++) {
    //   this.gameWordArray[i] = book1[i * 5 + shift];
    // }
    // this.shuffle(this.gameWordArray);
    console.log(this.gameWordArray);
    setTimeout(() => {
      this.gameState.currentState = 'gameStart';
      this._gameResolve();
    }, 5500);
  }

  _resolveClicks(event) {
    console.log('click event', event);
    if (event.target.classList.contains('savanna-answer-btn')) {
      console.log(event.target.dataset.savannaanswerbtn);
      this.gameState.answerButton = event.target.dataset.savannaanswerbtn;
      this.fallingWordContainer.classList.remove('word-container-piupiu');
      setTimeout(this._gameResolve.bind(this, 'gameTakeAnswer'), 0);
    } else if (event.target.id === 'savanna-to-game-start-page') {
      console.log('na glavnuyu');
      this._returnStartGamePage();
    } else if (event.target.classList.contains('soundOnOff')) {
      // document.querySelectorAll('soundOnOff').forEach((element))
    } else if (event.target === this.soundOnIcon) {
      // this.soundOnIcon.classList.add('savanna-display-none');
      this.soundOffIcon.classList.remove('savanna-display-none');
      this._audioMute();
    } else if (event.target === this.soundOffIcon) {
      this.soundOnIcon.classList.remove('savanna-display-none');
      this.soundOffIcon.classList.add('savanna-display-none');
      this._audioUnmute();
    } else if ((event.target === this.gameSettingsButton)
      || (event.target === this.gameSettingsButtonIcon)) {
      this.gemeSettingsCard.classList.toggle('setting-card-opened');
    } else if (event.target === this.goHomeButton) {
      console.log('goHomeButton');
      this.options.observer.emit('selectPage', 'MainPage');
    } else if (event.target === this.startSavannaGameButton) {
      this._startGame();
    }
  }

  _resolveAnimationEnd(event) {
    console.log('animationEnd root', event);
    switch (event.target) {
      case this.fallingWordContainer:
        console.log('fallingWordContainer Animation End');
        this.gameState.answerButton = null;
        this.fallingWordContainer.classList.remove('word-container-piupiu');
        this.animationEnd = 1;
        // this.gameState.currentState = 'incorrectAnswer';
        this._gameResolve('gameAnimationEnd');
        break;
      case this.fallingEnergyContainer:
        console.log('this.fallingEnergyContainer animatinon end');
        this.fallingEnergyContainer.classList.remove('energy-container-piupiupiu');
        this._gameResolve('fallingEnergyAnimationEnd');
        break;
      default:
        break;
    }
  }

  _resolveChange(event) {
    const et = event.target;
    if ((et === this.settingsElemetns.level)
      || (et === this.settingsElemetns.isLearnedWords1)
      || (et === this.settingsElemetns.isLearnedWords2)
      || (this.settingsElemetns.gameInvert)
      || (this.settingsElemetns.gameIrregularVerbs)) {
      this._getGameSettings();
      console.log('else this.localSettings', this.localSettings);
      this.options.dataForApp.settings.optional.savannaSettings = JSON.stringify(this.localSettings);
      // setSettingsToStorage('savannaGameLocalSettings', this.localSettings);
    }
  }

  _resolveKeyDown(event) {
    if ((event.repeat === false)
      && ((event.code === ('Digit1'))
        || (event.code === ('Digit2'))
        || (event.code === ('Digit3'))
        || (event.code === ('Digit4'))
      )) {
      console.log(Number(event.code.slice(-1)) - 1);
      if (this.gameState.currentState === 'waitAnswer') {
        this.gameState.answerButton = `btn${Number(event.code.slice(-1)) - 1}`;
        this.fallingWordContainer.classList.remove('word-container-piupiu');
        setTimeout(this._gameResolve.bind(this, 'gameTakeAnswer'), 0);
      }
    }
  }

  _gameResolve(event = '') {
    console.log('resolve state', 'event = ', event);
    switch (this.gameState.currentState) {
      case 'gameStart':
        console.log('gameStart');
        this.gameState.step = 0;
        this.gameState.statisticCorrectAnswers = [];
        this.gameState.statisticWrongAnswers = [];
        if (this.localSettings.gameInvert) {
          this.gameState.mainWord = 'wordTranslate';
          this.gameState.answersWord = 'word';
        } else {
          this.gameState.mainWord = 'word';
          this.gameState.answersWord = 'wordTranslate';
        }

        this.gameState.wrAnsArr = this.gameWordArray.filter((el) => {
          return (this.gameWordArray[this.gameState.step] !== el);
        });
        this.shuffle(this.gameState.wrAnsArr);
        // debugger;
        // this.answbtn0.textContent = `1) ${this.gameWordArray[this.gameState.step * 4 + 0][this.gameState.answersWord]}`;
        // this.answbtn1.textContent = `2) ${this.gameWordArray[this.gameState.step * 4 + 1][this.gameState.answersWord]}`;
        // this.answbtn2.textContent = `3) ${this.gameWordArray[this.gameState.step * 4 + 2][this.gameState.answersWord]}`;
        // this.answbtn3.textContent = `4) ${this.gameWordArray[this.gameState.step * 4 + 3][this.gameState.answersWord]}`;
        // this.gameState.questionWordBias = Math.floor(Math.random() * 4);
        // this.gameState.questionWordLink = this.gameWordArray[this.gameState.step * 4 + this.gameState.questionWordBias];
        // this.questionWord.textContent = `${this.gameState.questionWordLink[this.gameState.mainWord]}`;

        this.gameState.questionWordLink = this.gameWordArray[this.gameState.step];
        this.gameState.questionWordBias = Math.floor(Math.random() * 4);

        this.answbtnArray.forEach((el, i) => {
          el.textContent = `${i + 1}) ${this.gameState.wrAnsArr[i][this.gameState.answersWord]}`;
        });
        this.answbtnArray[this.gameState.questionWordBias].textContent = `${this.gameState.questionWordBias + 1}) ${this.gameWordArray[this.gameState.step][this.gameState.answersWord]}`;
        this.questionWord.textContent = `${this.gameWordArray[this.gameState.step][this.gameState.mainWord]}`;

        this.savannaStatisticHeadingElement.textContent = '';
        this.savannaStatisticContent.textContent = '';
        this.gameState.answerButton = null;
        this.gameState.answerCorrectButton = `btn${this.gameState.questionWordBias}`;
        this.gameState.currentState = 'waitAnswer';
        this.gameState.lives = 5;
        this.gameLives.forEach((el) => el.classList.remove('savanna-lives-broken'));
        this.fallingWordContainer.classList.add('word-container-piupiu');
        this.gameState.rightAnswersCounter = 0;
        this.crystall.classList.remove('crystall-stage1', 'crystall-stage2',
          'crystall-stage3', 'crystall-stage4', 'crystall-stage5', 'crystall-stage6');

        // for (let i = 0; i < 4; i++) {
        //   this[`answbtn${i}`].classList.remove('savannaWrongAnswerBtn', 'savannaCorrectAnswerBtn');
        // }
        this.answbtnArray.forEach((el) => {
          el.classList.remove('savannaWrongAnswerBtn', 'savannaCorrectAnswerBtn');
        });
        setTimeout(this._gameResolve.bind(this), 0);
        break;

      case 'waitAnswer':
        console.log('waitAnswer');
        // console.log('startAnimation');
        if (event === 'gameAnimationEnd') {
          // this.gameState.currentState = 'incorrectAnswer';
          this.gameState.currentState = 'takeAnswer';
          setTimeout(this._gameResolve.bind(this, 'gameAnimationEnd'), 0);
        } else if (event === 'gameTakeAnswer') {
          this.gameState.currentState = 'takeAnswer';
          setTimeout(this._gameResolve.bind(this), 0);
        }
        break;

      case 'takeAnswer':
        console.log('takeAnswer');
        this.fallingWordContainer.classList.remove('word-container-piupiu');
        if ((this.gameState.answerButton) === (this.gameState.answerCorrectButton)) {
          this.gameState.currentState = 'correctAnswer';
          setTimeout(this._gameResolve.bind(this), 0);
        } else {
          this.gameState.currentState = 'incorrectAnswer';
          if (this.gameState.answerButton) {
            // this[`answ${this.gameState.answerButton}`].classList.add('savannaWrongAnswerBtn');
            this.answbtnArray[Number(this.gameState.answerButton.slice(-1))].classList.add('savannaWrongAnswerBtn');
          } else {
            // for (let i = 0; i < 4; i++) {
            //   this[`answbtn${i}`].classList.add('savannaWrongAnswerBtn');
            // }
            this.answbtnArray.forEach((el, i) => {
              el.classList.add('savannaWrongAnswerBtn');
            });
          }
          setTimeout(this._gameResolve.bind(this), 0);
        }
        // this[`answ${this.gameState.answerCorrectButton}`].classList.add('savannaCorrectAnswerBtn');
        this.answbtnArray[this.gameState.questionWordBias].classList.add('savannaCorrectAnswerBtn');
        break;
      case 'correctAnswer':
        console.log('correct Answer');
        this.gameState.statisticCorrectAnswers.push(this.gameState.questionWordLink);
        this.gameState.currentState = 'correctPause';
        setTimeout(this._gameResolve.bind(this), 0);
        this.gamePauseState = true;
        this._audioStopAllSound();
        this.audioCorrect.play().catch(() => true);
        break;
      case 'correctPause':
        console.log('correct Pause');
        if (this.gamePauseState) {
          this.gamePauseState = false;
          // setTimeout(() => {
          //   this.gameState.currentState = 'nextQuestion';
          //   this._gameResolve();
          // }, 2500);
          this.fallingEnergyContainer.classList.add('energy-container-piupiupiu');
          this.gameState.rightAnswersCounter++;
        }
        if (event === 'fallingEnergyAnimationEnd') {
          if ((this.gameState.rightAnswersCounter % 5) === 0) {
            this.crystall.classList.add(`crystall-stage${Math.round(this.gameState.rightAnswersCounter / 5)}`);
          }
          setTimeout(() => {
            this.gameState.currentState = 'nextQuestion';
            this._gameResolve();
          }, 2500);
        }
        break;
      case 'incorrectAnswer':
        console.log('incorrect Answer');
        this.gameState.statisticWrongAnswers.push(this.gameState.questionWordLink);
        this.gameState.lives--;
        this.gameLives.forEach((el, i) => {
          if ((i + this.gameState.lives) < 5) {
            el.classList.add('savanna-lives-broken');
          }
        });
        this.gameState.currentState = 'incorrectPause';
        setTimeout(this._gameResolve.bind(this), 0);
        this.gamePauseState = true;
        this._audioStopAllSound();
        this.audioWrong.play().catch(() => true);
        break;

      case 'incorrectPause':
        console.log('incorrect Pause');
        if (this.gamePauseState) {
          this.gamePauseState = false;

          if (this.gameState.lives > 0) {
            setTimeout(() => {
              this.gameState.currentState = 'nextQuestion';
              this._gameResolve();
            }, 2500);
          } else {
            setTimeout(() => {
              this.gameState.currentState = 'gameLose';
              this._gameResolve();
            }, 2500);
          }
        }
        break;
      case 'nextQuestion':
        console.log('nextQuestion');
        this.gameState.step++;
        // for (let i = 0; i < 4; i++) {
        //   this[`answbtn${i}`].classList.remove('savannaWrongAnswerBtn', 'savannaCorrectAnswerBtn');
        // }
        this.answbtnArray.forEach((el) => {
          el.classList.remove('savannaWrongAnswerBtn', 'savannaCorrectAnswerBtn');
        });
        // if (this.gameState.step < Math.floor(this.gameWordArray.length / 4)) {
        if (this.gameState.step < 30) {
          this.gameState.wrAnsArr = this.gameWordArray.filter((el) => {
            return (this.gameWordArray[this.gameState.step] !== el);
          });
          this.shuffle(this.gameState.wrAnsArr);

          // this.answbtn0.textContent = `1) ${this.gameWordArray[this.gameState.step * 4 + 0][this.gameState.answersWord]}`;
          // this.answbtn1.textContent = `2) ${this.gameWordArray[this.gameState.step * 4 + 1][this.gameState.answersWord]}`;
          // this.answbtn2.textContent = `3) ${this.gameWordArray[this.gameState.step * 4 + 2][this.gameState.answersWord]}`;
          // this.answbtn3.textContent = `4) ${this.gameWordArray[this.gameState.step * 4 + 3][this.gameState.answersWord]}`;
          // this.gameState.questionWordBias = Math.floor(Math.random() * 4);
          // this.gameState.questionWordLink = this.gameWordArray[this.gameState.step * 4 + this.gameState.questionWordBias];
          // this.questionWord.textContent = `${this.gameState.questionWordLink[this.gameState.mainWord]}`;
          this.gameState.questionWordLink = this.gameWordArray[this.gameState.step];
          this.gameState.questionWordBias = Math.floor(Math.random() * 4);
          this.answbtnArray.forEach((el, i) => {
            el.textContent = `${i + 1}) ${this.gameState.wrAnsArr[i][this.gameState.answersWord]}`;
          });
          this.answbtnArray[this.gameState.questionWordBias].textContent = `${this.gameState.questionWordBias + 1}) ${this.gameWordArray[this.gameState.step][this.gameState.answersWord]}`;
          this.questionWord.textContent = `${this.gameWordArray[this.gameState.step][this.gameState.mainWord]}`;
          this.gameState.answerButton = null;
          this.gameState.answerCorrectButton = `btn${this.gameState.questionWordBias}`;
          this.gameState.currentState = 'waitAnswer';
          this.fallingWordContainer.classList.add('word-container-piupiu');
          setTimeout(this._gameResolve.bind(this), 0);
        } else {
          this.gameState.currentState = 'endGame';
          setTimeout(this._gameResolve.bind(this), 0);
        }
        break;
      case 'endGame':
        console.log('endGame');
        this._showStatistic();
        break;
      case 'gameLose':
        console.log('gameLose');
        this._showStatistic();

        break;
      default:
        break;
    }
  }

  _showStatistic() {
    document.getElementById('savanna-game-page').classList.add('savanna-display-none');
    document.getElementById('savanna-game-statistic').classList.remove('savanna-display-none');
    console.log('correct', this.gameState.statisticCorrectAnswers);
    console.log('Wrong', this.gameState.statisticWrongAnswers);
    this.gameState.statisticObj = {};
    const tp = this.gameState.statisticObj;

    if (this.gameState.isWordsFromBackend) {
      this.gameState.statisticCorrectAnswers.forEach((el) => {
        if (el.userWord) {
          el.userWord.optional.gameError = false;
          // todo Send word to backand;
          this.options.api.updateUserWord(el._id, el.userWord).catch((err) => {
            console.log('ошибка при работе с апи', err);
            console.log('Update UserWord', el);
          });
        }
      });
      this.gameState.statisticWrongAnswers.forEach((el) => {
        if (el.userWord) {
          el.userWord.optional.gameError = true;
          console.log('Update UserWord', el);
          // todo Send word to backand;
          this.options.api.updateUserWord(el._id, el.userWord).catch((err) => {
            console.log('ошибка при работе с апи', err);
          });
        }
      });
    }



    if (this.gameState.statisticWrongAnswers.length === 0) {
      this.savannaStatisticHeadingElement.textContent = gameFailHeaderText;
    } else if (this.gameState.statisticWrongAnswers.length === 5) {
      this.savannaStatisticHeadingElement.textContent = gameWinWithErrorHeaderText;
    } else {
      this.savannaStatisticHeadingElement.textContent = gameWinHeaderText;
    }

    this.savannaStatisticContent.innerHTML = '';
    if (this.gameState.statisticWrongAnswers.length > 0) {
      tp.WUl = createEssence('ul', 'word-list', null, null);
      tp.WPSpan2 = createEssence('span', 'badge badge-danger ml-2', `${this.gameState.statisticWrongAnswers.length}`, null);
      tp.WPSpan1 = createEssence('span', null, 'Неверно:', null);
      tp.WP = createEssence('p', 'h5 mb-3', [tp.WPSpan1, tp.WPSpan2], tp.WUl);
      tp.WLi = [];
      for (let i = 0; i < this.gameState.statisticWrongAnswers.length; i++) {
        tp.WLi[i] = {};
        tp.WLi[i].span1 = createEssence('span', 'word h5 text-info', `${this.gameState.statisticWrongAnswers[i].word}`, null);
        tp.WLi[i].span2 = createEssence('span', 'px-1', '—', null);
        tp.WLi[i].span3 = createEssence('span', null, `${this.gameState.statisticWrongAnswers[i].wordTranslate}`, null);
        tp.WLi[i].div2 = createEssence('div', null, [tp.WLi[i].span1, tp.WLi[i].span2, tp.WLi[i].span3], null);
        tp.WLi[i].div1 = createEssence('div', 'text-secondary fas fa-volume-up sound-button h5 mr-2', null, null);
        tp.WLi[i].li = createEssence('li', 'statistics-word', [tp.WLi[i].div1, tp.WLi[i].div2], tp.WUl);
      }
      this.savannaStatisticContent.append(tp.WUl);
    }

    if ((this.gameState.statisticWrongAnswers.length > 0) && (this.gameState.statisticCorrectAnswers.length > 0)) {
      tp.HR = createEssence('hr', null, null, null);
      this.savannaStatisticContent.append(tp.HR);
    }

    // correct statistics
    if (this.gameState.statisticCorrectAnswers.length > 0) {
      tp.CUl = createEssence('ul', 'word-list', null, null);
      tp.CPSpan2 = createEssence('span', 'badge badge-success ml-2', `${this.gameState.statisticCorrectAnswers.length}`, null);
      tp.CPSpan1 = createEssence('span', null, 'Верно:', null);
      tp.CP = createEssence('p', 'h5 mb-3', [tp.CPSpan1, tp.CPSpan2], tp.CUl);
      tp.CLi = [];
      for (let i = 0; i < this.gameState.statisticCorrectAnswers.length; i++) {
        tp.CLi[i] = {};
        tp.CLi[i].span1 = createEssence('span', 'word h5 text-info', `${this.gameState.statisticCorrectAnswers[i].word}`, null);
        tp.CLi[i].span2 = createEssence('span', 'px-1', '—', null);
        tp.CLi[i].span3 = createEssence('span', null, `${this.gameState.statisticCorrectAnswers[i].wordTranslate}`, null);
        tp.CLi[i].div2 = createEssence('div', null, [tp.CLi[i].span1, tp.CLi[i].span2, tp.CLi[i].span3], null);
        tp.CLi[i].div1 = createEssence('div', 'text-secondary fas fa-volume-up sound-button h5 mr-2', null, null);
        tp.CLi[i].li = createEssence('li', 'statistics-word', [tp.CLi[i].div1, tp.CLi[i].div2], tp.CUl);
      }
      this.savannaStatisticContent.append(tp.CUl);
    }
  }

  _returnStartGamePage() {
    document.getElementById('savanna-game-statistic').classList.add('savanna-display-none');
    document.getElementById('savanna-start-page').classList.remove('savanna-display-none');
  }

  shuffle(arr) {
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  destroy() {
    // REMOVE LISTENERS
    this.rootTag.removeEventListener('click', this.onClick);
    this.rootTag.removeEventListener('animationend', this.onAnimationEnd);
    this.rootTag.removeEventListener('change', this.onChange);
    document.removeEventListener('keydown', this.onKeyDown);
  }
}
