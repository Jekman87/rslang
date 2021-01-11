/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import book1 from './js/book1';
import createEssence from './js/createEssence';
import showTemplate from './js/template';
import { FILE_URL } from '../../constants/constants';
import './sass/style.scss';

const gameWinHeaderText = 'В этот раз всё великолепно';
const gameFailHeaderText = 'В этот раз не получилось, но продолжай тренироваться!';
const gameWinWithErrorHeaderText = 'В этот раз неплохо, но можно и лучше!';
const showConsoleLog = false;

export default class Savannah {
  static className = 'Savannah';

  constructor(selector, options) {
    if (showConsoleLog) console.log('constructor');
    if (typeof selector === 'string') {
      this.rootTag = document.querySelector(selector);
    } else {
      this.rootTag = selector;
    }
    this.options = options;
    if (showConsoleLog) console.log(options);
    const { statistics, settings } = this.options.dataForApp;

    if (showConsoleLog) console.log(statistics, settings);

    this.gameState = {};
    this.gameState.wordArrays = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    };
    this.gameState.timers = {};
    if (settings.optional.savannaSettings) {
      const savannaSettings = JSON.parse(settings.optional.savannaSettings);
      if (showConsoleLog) console.log('savanna settings from API', savannaSettings);
      window.savannaSettings = savannaSettings;
      this.localSettings = {};

      if ((savannaSettings.gameLevel !== null)
        && ((typeof savannaSettings.gameLevel) === 'number')
        && (savannaSettings.gameLevel >= 1)
        && (savannaSettings.gameLevel <= 6)) {
        this.localSettings.gameLevel = savannaSettings.gameLevel;
      } else {
        this.localSettings.gameLevel = 1;
      }

      if ((savannaSettings.gameWithLearnedWords !== null)
        && ((typeof savannaSettings.gameWithLearnedWords) === 'boolean')) {
        this.localSettings.gameWithLearnedWords = savannaSettings.gameWithLearnedWords;
      } else {
        this.localSettings.gameWithLearnedWords = true;
      }

      if ((savannaSettings.gameInvert !== null)
        && ((typeof savannaSettings.gameInvert) === 'boolean')) {
        this.localSettings.gameInvert = savannaSettings.gameInvert;
      } else {
        this.localSettings.gameInvert = true;
      }

      if ((savannaSettings.gameIrregularVerbs !== null)
        && ((typeof savannaSettings.gameIrregularVerbs) === 'boolean')) {
        this.localSettings.gameIrregularVerbs = false;
      } else {
        this.localSettings.gameIrregularVerbs = false;
      }

      if (showConsoleLog) console.log('this.localSettings', this.localSettings);
    } else {
      this.localSettings = {
        gameLevel: 1,
        gameWithLearnedWords: true,
        gameInvert: false,
        gameIrregularVerbs: false,
      };
      if (showConsoleLog) console.log('else this.localSettings', this.localSettings);
    }

    const longStatsJson = statistics.optional.SavannahLong;
    if (longStatsJson) {
      this.statsSavannahLong = JSON.parse(longStatsJson);
    } else {
      this.statsSavannahLong = [];
    }
    const mainStatsJson = statistics.optional.SavannaMain;
    if (mainStatsJson) {
      this.statsSavannaMain = JSON.parse(mainStatsJson);
    } else {
      this.statsSavannaMain = {
        totalGame: 0,
        totalWords: 0,
        totalWordsTrue: 0,
        totalWordsFalse: 0,
        totalWins: 0,
        totalWinsWithErr: 0,
        totalLose: 0,
        roundsForTeamLead: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
        },
      };
    }
  }

  render() {
    this.rootTag.innerHTML = showTemplate();

    this.audioBip = document.getElementById('SavannaAudioBip');
    this.audioGong = document.getElementById('SavannaAudioGong');
    this.audioCorrect = document.getElementById('SavannaAudioCorrect');
    this.audioWrong = document.getElementById('SavannaAudioWrong');
    this.audioResults = document.getElementById('SavannaAudioResults');
    this.audioUp = document.getElementById('SavannaAudioCrystallUp');
    this.audioLoss = document.getElementById('SavannaAudioLoss');
    this.audioWin = document.getElementById('SavannaAudioWin');

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
    this.savannaMainContainer = this.rootTag.querySelector('.savanna-main-container');
    this.startSavannaGameButton = document.getElementById('startSavannaGameButton');
    this.savannaMainSpinnerHeader = document.getElementById('savannaMainSpinnerHeader');

    this.settingsElemetns = {};
    this.settingsElemetns.level = document.getElementById('savannaGameLevel');
    this.settingsElemetns.isLearnedWords1 = document.getElementById('savannaisLearnedWords1');
    this.settingsElemetns.isLearnedWords2 = document.getElementById('savannaisLearnedWords2');
    this.settingsElemetns.gameInvert = document.getElementById('savannaSettingsGameInvert');
    this.savannaStepWordCounter = document.getElementById('savannaStepWordCounter');
    this.settingsElemetns.gameIrregularVerbs = document.getElementById(
      'savannaSettingsGameIrregularVerbs',
    );
    this._setGameSettings();

    this.savannaStatisticHeadingElement = document.getElementById(
      'savannaStatisticHeadingElement',
    );
    this.savannaStatisticContent = document.getElementById('savannaStatisticContent');

    this.savannaLastGameStatistics = document.getElementById(
      'savannaLastGameStatistics',
    );
    this.savannaLastGameStatisticsNavLink = document.getElementById(
      'savannaLastGameStatisticsNavLink',
    );
    this.savannaLongtermStatistics = document.getElementById(
      'savannaLongtermStatistics',
    );
    this.savannaLongtermStatisticsNavLink = document.getElementById(
      'savannaLongtermStatisticsNavLink',
    );
    this.savannaGameAbortYes = document.getElementById(
      'savannaGameAbortYes',
    );
    this.savannaGameAbortNo = document.getElementById(
      'savannaGameAbortNo',
    );
    this.savannaGameModal = document.getElementById(
      'savannaGameModal',
    );
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
    if (showConsoleLog) console.log('start application');
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
        if (showConsoleLog) console.log('ошибка при работе с апи', err);
      });
    } catch (err) {
      if (showConsoleLog) console.log('ошибка при работе с апи', err);
    }
    if (showConsoleLog) console.log(this.options);

    this.savannaMainSpinnerHeader.textContent = 'Ищем безопасное место';
    document.getElementById('savanna-start-page').classList.add('savanna-display-none');
    document.getElementById('savanna-preloader-countdown').textContent = '';
    document.getElementById('savanna-main-spinner').classList.remove('savanna-display-none');

    if (this.gameState.wordArrays[this.localSettings.gameLevel] === null) {
      this.options.api.getAllUserAggregatedWords(
        this.localSettings.gameLevel - 1,
        6000,
        '{"$or":[{"$or":[{"userWord.optional.gameError":false}, {"userWord.optional.gameError":true}]},{"userWord":null}]}',
      ).then((e) => {
        if (showConsoleLog) console.log('then', e);
        this.gameState.wordArrays[this.localSettings.gameLevel] = e[0].paginatedResults;
        this.gameState.isWordsFromBackend = true;
        this._prepareWords();
      }).catch((e) => {
        if (showConsoleLog) console.log('catch', e);
        this.gameState.isWordsFromBackend = false;
        this._prepareWords();
      });
    } else {
      this.gameState.isWordsFromBackend = true;
      this._prepareWords();
    }
  }

  _prepareWords() {
    const timer = this.gameState.timers;
    this.savannaMainSpinnerHeader.textContent = 'Организуем стоянку';
    this._gameDataPrepare();
    this.savannaMainSpinnerHeader.textContent = 'Усаживаемся поудобнее';
    timer.startGameTimer = setTimeout(() => {
      document.getElementById('savanna-preloader-countdown').textContent = '3';
      document.getElementById('SavannaAudioBip').play().catch(() => true);
      timer.startGameTimer = setTimeout(() => {
        document.getElementById('savanna-preloader-countdown').textContent = '2';
        document.getElementById('SavannaAudioBip').play().catch(() => true);
        timer.startGameTimer = setTimeout(() => {
          document.getElementById('savanna-preloader-countdown').textContent = '1';
          document.getElementById('SavannaAudioBip').play().catch(() => true);
          timer.startGameTimer = setTimeout(() => {
            document.getElementById('savanna-preloader-countdown').textContent = 'Поехали';
            document.getElementById('SavannaAudioGong').play().catch(() => true);
            timer.startGameTimer = setTimeout(() => {
              document.getElementById('SavannaAudioGong').pause();
              document.getElementById('SavannaAudioGong').currentTime = 0;
              document.getElementById('savanna-main-spinner').classList.add('savanna-display-none');
              document.getElementById('savanna-game-page').classList.remove('savanna-display-none');
            }, 2000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  _audioStopAllSound() {
    this.soundContainers.forEach((e) => {
      const el = e;
      el.pause();
      el.currentTime = 0;
    });
  }

  _audioMute() {
    if (showConsoleLog) console.log('muted');
    this._audioStopAllSound();
    this.soundContainers.forEach((e) => {
      const el = e;
      el.muted = true;
    });
  }

  _audioUnmute() {
    if (showConsoleLog) console.log('unmuted');
    this._audioStopAllSound();
    this.soundContainers.forEach((e) => {
      const el = e;
      el.muted = false;
    });
  }

  _gameDataPrepare() {
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
          const tmpArray2 = this.gameState.wordArrays[this.localSettings.gameLevel].filter(
            (el) => !(el.userWord),
          );
          this.shuffle(tmpArray2);
          if (showConsoleLog) console.log('learned words sorting', tmpArray);
          tmpArray = tmpArray.concat(tmpArray2.slice(0, 30 - tmpArray.length));
          if (showConsoleLog) console.log('learned words sorting', tmpArray.slice(0, 30));
        } else {
          tmpArray = tmpArray.slice(0, 30);
        }
        if (showConsoleLog) console.log('learned words sorting', tmpArray);
        this.shuffle(tmpArray);
      } else {
        tmpArray = book1.filter(() => true);
        this.shuffle(tmpArray);
        tmpArray = tmpArray.slice(0, 30);
      }
    } else if (this.gameState.isWordsFromBackend) {
      tmpArray = this.gameState.wordArrays[this.localSettings.gameLevel].filter(
        (el) => !(el.userWord),
      );
      if (tmpArray.length < 30) {
        const tmpArray2 = this.gameState.wordArrays[this.localSettings.gameLevel]
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
      tmpArray = book1.filter(() => true);
      this.shuffle(tmpArray);
      tmpArray = tmpArray.slice(0, 30);
    }

    if (showConsoleLog) console.log('tmpArray:', tmpArray);

    this.gameWordArray = tmpArray;
    if (showConsoleLog) console.log(this.gameWordArray);
    this.gameState.timers.prepareDataTimer = setTimeout(() => {
      this.gameState.currentState = 'gameStart';
      this._gameResolve();
    }, 6000);
  }

  _resolveClicks(event) {
    if (showConsoleLog) console.log('click event', event);
    if (event.target.classList.contains('savanna-answer-btn')) {
      if (showConsoleLog) console.log(event.target.dataset.savannaanswerbtn);
      this.gameState.answerButton = event.target.dataset.savannaanswerbtn;
      this.fallingWordContainer.classList.remove('word-container-piupiu');
      this.gameState.timers.resolveClicks = setTimeout(this._gameResolve.bind(this, 'gameTakeAnswer'), 0);
    } else if (event.target.id === 'savanna-to-game-start-page') {
      if (showConsoleLog) console.log('na glavnuyu');
      this._returnStartGamePage();
    } else if (event.target === this.soundOnIcon) {
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
      if (showConsoleLog) console.log('goHomeButton');
      this.options.observer.emit('selectPage', 'MainPage');
    } else if (event.target === this.startSavannaGameButton) {
      this._startGame();

      this.savannaLastGameStatistics.classList.add('active', 'show');
      this.savannaLastGameStatisticsNavLink.classList.add('active');

      this.savannaLongtermStatistics.classList.remove('active', 'show');
      this.savannaLongtermStatisticsNavLink.classList.remove('active');

      this.gemeSettingsCard.classList.remove('setting-card-opened');
    } else if (event.target.classList.contains('savanna-statistic-sound-button')) {
      const savannaStatSoundID = event.target.dataset.soundID;
      document.getElementById(savannaStatSoundID).play().catch(() => true);
    } else if (event.target.closest('.savanna-abort-game-button')) {
      this._gamePause('yes');
      this.savannaGameModal.classList.remove('savanna-display-none');
    } else if (event.target === this.savannaGameAbortYes) {
      this._gameAbort();
      this.savannaGameModal.classList.add('savanna-display-none');
    } else if (event.target === this.savannaGameAbortNo) {
      this._gamePause('no');
      this.savannaGameModal.classList.add('savanna-display-none');
    }
  }

  _resolveAnimationEnd(event) {
    if (showConsoleLog) console.log('animationEnd root', event);
    switch (event.target) {
      case this.fallingWordContainer:
        if (showConsoleLog) console.log('fallingWordContainer Animation End');
        this.gameState.answerButton = null;
        this.fallingWordContainer.classList.remove('word-container-piupiu');
        this.animationEnd = 1;
        this._gameResolve('gameAnimationEnd');
        break;
      case this.fallingEnergyContainer:
        if (showConsoleLog) console.log('this.fallingEnergyContainer animatinon end');
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
      if (showConsoleLog) console.log('else this.localSettings', this.localSettings);
      this.options.dataForApp.settings.optional.savannaSettings = JSON.stringify(
        this.localSettings,
      );
    }
  }

  _resolveKeyDown(event) {
    if ((event.repeat === false)
      && ((event.code === ('Digit1'))
        || (event.code === ('Digit2'))
        || (event.code === ('Digit3'))
        || (event.code === ('Digit4'))
      )) {
      if (showConsoleLog) console.log(Number(event.code.slice(-1)) - 1);
      if (this.gameState.currentState === 'waitAnswer') {
        this.gameState.answerButton = `btn${Number(event.code.slice(-1)) - 1}`;
        this.fallingWordContainer.classList.remove('word-container-piupiu');
        this.gameState.timers.resolveKeyDown = setTimeout(this._gameResolve.bind(this, 'gameTakeAnswer'), 0);
      }
    }
  }

  _gamePause(status) {
    if (status === 'yes') {
      this.fallingWordContainer.classList.add('savanna-animation-pause');
      this.fallingEnergyContainer.classList.add('savanna-animation-pause');
    } else {
      this.fallingWordContainer.classList.remove('savanna-animation-pause');
      this.fallingEnergyContainer.classList.remove('savanna-animation-pause');
    }
    if (showConsoleLog) console.log('pause');
  }

  _gameAbort() {
    if (showConsoleLog) console.log('abort');

    this._clearSavannaTimeouts();
    document.getElementById('savanna-start-page').classList.remove('savanna-display-none');
    document.getElementById('savanna-game-page').classList.add('savanna-display-none');
    this.savannaGameModal.classList.add('savanna-display-none');
    this.gameState.currentState = '';
    this.fallingWordContainer.classList.remove('word-container-piupiu');
    this.fallingEnergyContainer.classList.remove('energy-container-piupiupiu');
    this.fallingWordContainer.classList.remove('savanna-animation-pause');
    this.fallingEnergyContainer.classList.remove('savanna-animation-pause');
    this.savannaMainContainer.style.backgroundPositionY = 'calc(((4272px - 100vh)/30) * -30)';
  }

  _gameResolve(event = '') {
    if (showConsoleLog) console.log('resolve state', 'event = ', event);
    switch (this.gameState.currentState) {
      case 'gameStart':
        if (showConsoleLog) console.log('gameStart');
        this.gameState.step = 0;
        this.savannaStepWordCounter.innerHTML = '1';
        this.gameState.statisticCorrectAnswers = [];
        this.gameState.statisticWrongAnswers = [];
        if (this.localSettings.gameInvert) {
          this.gameState.mainWord = 'wordTranslate';
          this.gameState.answersWord = 'word';
        } else {
          this.gameState.mainWord = 'word';
          this.gameState.answersWord = 'wordTranslate';
        }

        this.gameState.wrAnsArr = this.gameWordArray.filter(
          (el) => (this.gameWordArray[this.gameState.step] !== el),
        );
        this.shuffle(this.gameState.wrAnsArr);

        this.gameState.questionWordLink = this.gameWordArray[this.gameState.step];
        this.gameState.questionWordBias = Math.floor(Math.random() * 4);

        this.answbtnArray.forEach((e, i) => {
          const el = e;
          el.textContent = `${i + 1}) ${this.gameState.wrAnsArr[i][this.gameState.answersWord]}`;
        });
        this.answbtnArray[this.gameState.questionWordBias].textContent = `
        ${this.gameState.questionWordBias + 1}) ${this.gameWordArray[this.gameState.step][this.gameState.answersWord]}
        `;
        this.questionWord.textContent = `
        ${this.gameWordArray[this.gameState.step][this.gameState.mainWord]}
        `;

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

        this.answbtnArray.forEach((el) => {
          el.classList.remove('savannaWrongAnswerBtn', 'savannaCorrectAnswerBtn');
        });
        this.gameState.timers.gameResolve = setTimeout(this._gameResolve.bind(this), 0);
        break;

      case 'waitAnswer':
        if (showConsoleLog) console.log('waitAnswer');
        if (event === 'gameAnimationEnd') {
          this.gameState.currentState = 'takeAnswer';
          this.gameState.timers.gameResolve = setTimeout(this._gameResolve.bind(this, 'gameAnimationEnd'), 0);
        } else if (event === 'gameTakeAnswer') {
          this.gameState.currentState = 'takeAnswer';
          this.gameState.timers.gameResolve = setTimeout(this._gameResolve.bind(this), 0);
        }
        break;

      case 'takeAnswer':
        if (showConsoleLog) console.log('takeAnswer');
        this.fallingWordContainer.classList.remove('word-container-piupiu');
        if ((this.gameState.answerButton) === (this.gameState.answerCorrectButton)) {
          this.gameState.currentState = 'correctAnswer';
          this.gameState.timers.gameResolve = setTimeout(this._gameResolve.bind(this), 0);
        } else {
          this.gameState.currentState = 'incorrectAnswer';
          if (this.gameState.answerButton) {
            this.answbtnArray[Number(this.gameState.answerButton.slice(-1))].classList.add(
              'savannaWrongAnswerBtn',
            );
          } else {
            this.answbtnArray.forEach((el) => {
              el.classList.add('savannaWrongAnswerBtn');
            });
          }
          this.gameState.timers.gameResolve = setTimeout(this._gameResolve.bind(this), 0);
        }
        this.answbtnArray[this.gameState.questionWordBias].classList.add(
          'savannaCorrectAnswerBtn',
        );
        break;
      case 'correctAnswer':
        if (showConsoleLog) console.log('correct Answer');
        this.gameState.statisticCorrectAnswers.push(this.gameState.questionWordLink);
        this.gameState.currentState = 'correctPause';
        this.gameState.timers.gameResolve = setTimeout(this._gameResolve.bind(this), 0);
        this.gamePauseState = true;
        this._audioStopAllSound();
        this.audioCorrect.play().catch(() => true);
        break;
      case 'correctPause':
        if (showConsoleLog) console.log('correct Pause');
        if (this.gamePauseState) {
          this.gamePauseState = false;
          this.fallingEnergyContainer.classList.add('energy-container-piupiupiu');
          this.gameState.rightAnswersCounter += 1;
          const postion = `calc(((4272px - 100vh)/30) * ${this.gameState.rightAnswersCounter - 30})`;
          this.savannaMainContainer.style.backgroundPositionY = postion;
        }
        if (event === 'fallingEnergyAnimationEnd') {
          if ((this.gameState.rightAnswersCounter % 5) === 0) {
            this.crystall.classList.add(
              `crystall-stage${Math.round(this.gameState.rightAnswersCounter / 5)}`,
            );
            this._audioStopAllSound();
            this.audioUp.play().catch(() => true);
          }
          this.gameState.timers.gameResolve = setTimeout(() => {
            this.gameState.currentState = 'nextQuestion';
            this._gameResolve();
          }, 2500);
        }
        break;
      case 'incorrectAnswer':
        if (showConsoleLog) console.log('incorrect Answer');
        this.gameState.statisticWrongAnswers.push(this.gameState.questionWordLink);
        this.gameState.lives -= 1;
        this.gameLives.forEach((el, i) => {
          if ((i + this.gameState.lives) < 5) {
            el.classList.add('savanna-lives-broken');
          }
        });
        this.gameState.currentState = 'incorrectPause';
        this.gameState.timers.gameResolve = setTimeout(this._gameResolve.bind(this), 0);
        this.gamePauseState = true;
        this._audioStopAllSound();
        this.audioWrong.play().catch(() => true);
        break;

      case 'incorrectPause':
        if (showConsoleLog) console.log('incorrect Pause');
        if (this.gamePauseState) {
          this.gamePauseState = false;

          if (this.gameState.lives > 0) {
            this.gameState.timers.gameResolve = setTimeout(() => {
              this.gameState.currentState = 'nextQuestion';
              this._gameResolve();
            }, 2500);
          } else {
            this.gameState.timers.gameResolve = setTimeout(() => {
              this.gameState.currentState = 'gameLose';
              this._gameResolve();
            }, 2500);
          }
        }
        break;
      case 'nextQuestion':
        if (showConsoleLog) console.log('nextQuestion');
        this.gameState.step += 1;
        this.answbtnArray.forEach((el) => {
          el.classList.remove('savannaWrongAnswerBtn', 'savannaCorrectAnswerBtn');
        });
        if (this.gameState.step < 30) {
          this.savannaStepWordCounter.innerHTML = `${this.gameState.step + 1}`;
          this.gameState.wrAnsArr = this.gameWordArray.filter(
            (el) => (this.gameWordArray[this.gameState.step] !== el),
          );
          this.shuffle(this.gameState.wrAnsArr);
          this.gameState.questionWordLink = this.gameWordArray[this.gameState.step];
          this.gameState.questionWordBias = Math.floor(Math.random() * 4);
          this.answbtnArray.forEach((e, i) => {
            const el = e;
            el.textContent = `${i + 1}) ${this.gameState.wrAnsArr[i][this.gameState.answersWord]}`;
          });
          this.answbtnArray[this.gameState.questionWordBias].textContent = `
          ${this.gameState.questionWordBias + 1}) ${this.gameWordArray[this.gameState.step][this.gameState.answersWord]}
          `;
          this.questionWord.textContent = `
          ${this.gameWordArray[this.gameState.step][this.gameState.mainWord]}
          `;
          this.gameState.answerButton = null;
          this.gameState.answerCorrectButton = `btn${this.gameState.questionWordBias}`;
          this.gameState.currentState = 'waitAnswer';
          this.fallingWordContainer.classList.add('word-container-piupiu');
          this.gameState.timers.gameResolve = setTimeout(this._gameResolve.bind(this), 0);
        } else {
          this.gameState.currentState = 'endGame';
          this.gameState.timers.gameResolve = setTimeout(this._gameResolve.bind(this), 0);
        }
        break;
      case 'endGame':
        if (showConsoleLog) console.log('endGame');
        this._audioStopAllSound();
        this.audioResults.play().catch(() => true);
        this._showStatistic();
        break;
      case 'gameLose':
        if (showConsoleLog) console.log('gameLose');
        this._audioStopAllSound();
        this.audioLoss.play().catch(() => true);
        this._showStatistic();

        break;
      default:
        break;
    }
  }

  _showStatistic() {
    document.getElementById('savanna-game-page').classList.add('savanna-display-none');
    document.getElementById('savanna-game-statistic').classList.remove('savanna-display-none');
    if (showConsoleLog) console.log('correct', this.gameState.statisticCorrectAnswers);
    if (showConsoleLog) console.log('Wrong', this.gameState.statisticWrongAnswers);
    this.gameState.statisticObj = {};
    const statObj = this.gameState.statisticObj;

    if (this.gameState.isWordsFromBackend) {
      this.gameState.statisticWrongAnswers.forEach((e) => {
        const el = e;
        if (el.userWord) {
          el.userWord.optional.gameError = true;
          if (showConsoleLog) console.log('Update UserWord', el);
          // todo Send word to backand;
          this.options.api.updateUserWord(el._id, el.userWord).catch((err) => {
            if (showConsoleLog) console.log('ошибка при работе с апи', err);
          });
          const index = this.options.dataForApp.userWords.findIndex((element) => {
            if (element._id === el._id) {
              return true;
            }
            return false;
          });
          if (index >= 0) {
            this.options.dataForApp.userWords[index].userWord.optional.gameError = true;
            if (showConsoleLog) console.log('поменял в статистике юзера !!', index, this.options.dataForApp.userWords[index].word);
          }
        }
      });
    }

    const correctCount = this.gameState.statisticCorrectAnswers.length;
    const wrongCount = this.gameState.statisticWrongAnswers.length;
    const roundMain = this.localSettings.gameLevel;
    this.statsSavannaMain.totalGame += 1;
    this.statsSavannaMain.totalWordsTrue += correctCount;
    this.statsSavannaMain.totalWordsFalse += wrongCount;
    this.statsSavannaMain.roundsForTeamLead[`${roundMain}`] += 1;
    const roundSecond = this.statsSavannaMain.roundsForTeamLead[`${roundMain}`];
    this._upUserLevel((wrongCount === 5), correctCount, 30);
    const toBackend = {};
    toBackend.date = Date.now();
    toBackend.round = `${roundMain}-${roundSecond}`;
    toBackend.result = `${correctCount}-${wrongCount}`;
    if (wrongCount === 0) {
      this.savannaStatisticHeadingElement.textContent = gameWinHeaderText;
      this.statsSavannaMain.totalWins += 1;
    } else if (wrongCount === 5) {
      this.savannaStatisticHeadingElement.textContent = gameFailHeaderText;
      this.statsSavannaMain.totalLose += 1;
    } else {
      this.savannaStatisticHeadingElement.textContent = gameWinWithErrorHeaderText;
      this.statsSavannaMain.totalWinsWithErr += 1;
    }
    this.statsSavannahLong.push(toBackend);
    if (this.statsSavannahLong.length > 20) {
      this.statsSavannahLong = this.statsSavannahLong.splice(-20, 20);
    }
    const stat = this.options.dataForApp.statistics;
    stat.optional.SavannahLong = JSON.stringify(this.statsSavannahLong);
    stat.optional.SavannaMain = JSON.stringify(this.statsSavannaMain);
    this.options.api.updateStatistics(stat).then((e) => {
      if (showConsoleLog) console.log('updateStatistics', e);
    }).catch((e) => {
      if (showConsoleLog) console.log('catch', e);
    });

    this.savannaStatisticContent.innerHTML = '';
    if (this.gameState.statisticWrongAnswers.length > 0) {
      statObj.WUl = createEssence('ul', 'word-list', null, null);
      statObj.WPSpan2 = createEssence(
        'span',
        'badge badge-danger ml-2',
        `${this.gameState.statisticWrongAnswers.length}`,
        null,
      );
      statObj.WPSpan1 = createEssence('span', null, 'Неверно:', null);
      statObj.WP = createEssence(
        'p', 'h5 mb-3', [statObj.WPSpan1, statObj.WPSpan2], statObj.WUl,
      );
      statObj.WLi = [];
      for (let i = 0; i < this.gameState.statisticWrongAnswers.length; i += 1) {
        statObj.WLi[i] = {};
        statObj.WLi[i].span1 = createEssence(
          'span', 'word h5 text-info', `${this.gameState.statisticWrongAnswers[i].word}`, null,
        );
        statObj.WLi[i].span2 = createEssence('span', 'px-1', '—', null);
        statObj.WLi[i].span3 = createEssence(
          'span', null, `${this.gameState.statisticWrongAnswers[i].wordTranslate}`, null,
        );
        statObj.WLi[i].div2 = createEssence(
          'div', null,
          [statObj.WLi[i].span1, statObj.WLi[i].span2, statObj.WLi[i].span3], null,
        );
        statObj.WLi[i].div1 = createEssence(
          'div', 'text-secondary fas fa-volume-up savanna-statistic-sound-button h5 mr-2',
          null, null, ['soundID', `savannaAudioWrongStatistic${i}`],
        );
        statObj.WLi[i].audio = createEssence(
          'audio', 'savanna-audio-source-statistic', null, statObj.WLi[i].div1,
          ['id', `savannaAudioWrongStatistic${i}`],
          ['src', `${FILE_URL}/${this.gameState.statisticWrongAnswers[i].audio}`],
        );
        statObj.WLi[i].li = createEssence(
          'li', 'statistics-word',
          [statObj.WLi[i].div1, statObj.WLi[i].div2], statObj.WUl,
        );
      }
      this.savannaStatisticContent.append(statObj.WUl);
    }

    if ((this.gameState.statisticWrongAnswers.length > 0)
      && (this.gameState.statisticCorrectAnswers.length > 0)) {
      statObj.HR = createEssence('hr', null, null, null);
      this.savannaStatisticContent.append(statObj.HR);
    }

    // correct statistics
    if (this.gameState.statisticCorrectAnswers.length > 0) {
      statObj.CUl = createEssence('ul', 'word-list', null, null);
      statObj.CPSpan2 = createEssence(
        'span', 'badge badge-success ml-2',
        `${this.gameState.statisticCorrectAnswers.length}`, null,
      );
      statObj.CPSpan1 = createEssence('span', null, 'Верно:', null);
      statObj.CP = createEssence(
        'p', 'h5 mb-3', [statObj.CPSpan1, statObj.CPSpan2], statObj.CUl,
      );
      statObj.CLi = [];
      for (let i = 0; i < this.gameState.statisticCorrectAnswers.length; i += 1) {
        statObj.CLi[i] = {};
        statObj.CLi[i].span1 = createEssence(
          'span', 'word h5 text-info', `${this.gameState.statisticCorrectAnswers[i].word}`, null,
        );
        statObj.CLi[i].span2 = createEssence('span', 'px-1', '—', null);
        statObj.CLi[i].span3 = createEssence(
          'span', null, `${this.gameState.statisticCorrectAnswers[i].wordTranslate}`, null,
        );
        statObj.CLi[i].div2 = createEssence(
          'div', null,
          [statObj.CLi[i].span1, statObj.CLi[i].span2, statObj.CLi[i].span3], null,
        );
        statObj.CLi[i].div1 = createEssence(
          'div', 'text-secondary fas fa-volume-up savanna-statistic-sound-button h5 mr-2',
          null, null, ['soundID', `savannaAudioCorrectStatistic${i}`],
        );
        statObj.CLi[i].audio = createEssence(
          'audio', 'savanna-audio-source-statistic', null, statObj.CLi[i].div1,
          ['id', `savannaAudioCorrectStatistic${i}`],
          ['src', `${FILE_URL}/${this.gameState.statisticCorrectAnswers[i].audio}`],
        );
        statObj.CLi[i].li = createEssence(
          'li', 'statistics-word',
          [statObj.CLi[i].div1, statObj.CLi[i].div2], statObj.CUl,
        );
      }
      this.savannaStatisticContent.append(statObj.CUl);
    }

    statObj.LTDiv = createEssence('div', 'statistics-content', null, null);
    statObj.LTUl = createEssence('ul', 'word-list', null, statObj.LTDiv);
    statObj.LTLi = [];
    for (let i = this.statsSavannahLong.length - 1; i >= 0; i -= 1) {
      const tmpData = new Date(this.statsSavannahLong[i].date);
      statObj.LTLi[i] = {};
      statObj.LTLi[i].li = createEssence(
        'li', 'd-flex justify-content-around align-items-center flex-wrap mb-3',
        null, statObj.LTUl,
      );
      statObj.LTLi[i].div1 = createEssence('div', 'statistics-icon mb-2',
        null, statObj.LTLi[i].li);
      statObj.LTLi[i].ul = createEssence('ul', 'statistics-info col-12 col-sm-8',
        null, statObj.LTLi[i].li);
      statObj.LTLi[i].li1 = createEssence('li', 'statistics-info-item',
        `${tmpData.toLocaleString()}`,
        statObj.LTLi[i].ul);
      let gameResult = 'Победа!';
      const mySweetLittleTemporaryConstant = this.statsSavannahLong[i].result.split('-');
      const gameCorrectAnswers = mySweetLittleTemporaryConstant[0];
      const gameWrongAnswers = mySweetLittleTemporaryConstant[1];
      if (gameWrongAnswers === '0') {
        gameResult = 'Победа';
      } else if (gameWrongAnswers === '5') {
        gameResult = 'Поражение';
      } else {
        gameResult = 'Победа со штрафом';
      }
      statObj.LTLi[i].li2 = createEssence('li', 'statistics-info-item',
        `Результат игры - ${gameResult}`,
        statObj.LTLi[i].ul);
      statObj.LTLi[i].li3 = createEssence('li', 'statistics-info-item',
        `Правильных ответов - ${gameCorrectAnswers}`,
        statObj.LTLi[i].ul);
      statObj.LTLi[i].li3 = createEssence('li', 'statistics-info-item',
        `Ошибок -  ${gameWrongAnswers}`,
        statObj.LTLi[i].ul);
    }
    this.savannaLongtermStatistics.innerHTML = '';
    this.savannaLongtermStatistics.append(statObj.LTDiv);
  }

  _upUserLevel(isLose, correctAnswers, maxAnswers) {
    let value = 10;
    if (isLose === true) {
      value = 5;
    }
    value *= correctAnswers / maxAnswers;
    if (typeof this.options.dataForApp.settings.optional.commonProgress !== 'number') {
      this.options.dataForApp.settings.optional.commonProgress = 0;
    }
    this.options.observer.emit('saveCommonProgress', value);
  }

  _returnStartGamePage() {
    document.getElementById('savanna-game-statistic').classList.add('savanna-display-none');
    document.getElementById('savanna-start-page').classList.remove('savanna-display-none');
    this.savannaMainContainer.style.backgroundPositionY = 'calc(((4272px - 100vh)/30) * -30)';
  }

  shuffle(marr) {
    const arr = marr;
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  _clearSavannaTimeouts() {
    const keys = Object.keys(this.gameState.timers);
    keys.forEach((el) => {
      clearTimeout(this.gameState.timers[el]);
    });
  }

  destroy() {
    // REMOVE LISTENERS
    this.rootTag.removeEventListener('click', this.onClick);
    this.rootTag.removeEventListener('animationend', this.onAnimationEnd);
    this.rootTag.removeEventListener('change', this.onChange);
    document.removeEventListener('keydown', this.onKeyDown);

    // REMOVE TIMEOUTS
    this._clearSavannaTimeouts();
  }
}
