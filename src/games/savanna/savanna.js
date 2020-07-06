/* eslint-disable max-len */
/* eslint-disable padded-blocks */
/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
/* eslint-disable one-var */
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

import $$ from '../../core/domManipulation';
import Observer from '../../core/Observer';

export default class Savannah {
  static className = 'Savannah';

  constructor(selector, options) {
    console.log('constructor');
    if (typeof selector === 'string') {
      this.rootTag = document.querySelector(selector);
    } else {
      this.rootTag = selector;
      // eslint-disable-next-line no-param-reassign
    }
    this.options = options;
    console.log(options);

    // this.$el = $$(selector);
    // this.components = [];
    // /* this.observer = new Observer(); */
    // this.observer = options.observer;
    // this.dataForApp = {};
  }

  render() {
    this.rootTag.innerHTML = showTemplate();
    document.getElementById('startSavannaGameButton').addEventListener('click', (event) => this._startGame(event));
    this.audioBip = document.getElementById('SavannaAudioBip');
    this.audioGong = document.getElementById('SavannaAudioGong');
    this.audioCorrect = document.getElementById('SavannaAudioCorrect');
    this.audioWrong = document.getElementById('SavannaAudioWrong');
    this.audioResults = document.getElementById('SavannaAudioResults');
    this.gameWordArray = [];
    this.fallingWordContainer = document.getElementById('fallingWordContainer');
    this.fallingEnergyContainer = document.getElementById('fallingEnergyContainer');
    this.animationEnd = 0;
    this.gameState = {};
    this.answbtn0 = document.getElementById('savanna-answer-btn0');
    this.answbtn1 = document.getElementById('savanna-answer-btn1');
    this.answbtn2 = document.getElementById('savanna-answer-btn2');
    this.answbtn3 = document.getElementById('savanna-answer-btn3');
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

    this.SettingNew = true;
    this.Setting2 = true;
    this.localSettings = getSettingsFromStorage('savannaGameLocalSettings') || {
      gameLevel: 1,
      gameWithLearnedWords: true,
      gameInvert: false,
      gameIrregularVerbs: false,
    };
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
    this.localSettings.gameLevel = this.settingsElemetns.level.value;
    this.localSettings.gameWithLearnedWords = this.settingsElemetns.isLearnedWords1.checked;
    this.localSettings.gameInvert = this.settingsElemetns.gameInvert.checked;
    this.localSettings.gameIrregularVerbs = this.settingsElemetns.gameIrregularVerbs.checked;
  }

  _startGame() {
    console.log('start game');
    document.getElementById('savanna-start-page').classList.add('savanna-display-none');
    document.getElementById('savanna-preloader-countdown').textContent = '';
    document.getElementById('savanna-main-spinner').classList.remove('savanna-display-none');
    setTimeout(() => {
      document.getElementById('savanna-preloader-countdown').textContent = '3';
      document.getElementById('SavannaAudioBip').play().catch(() => true);
      console.log('timeout1');
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
    this._gameDataPrepare();
  }

  _audioStopAllSound() {
    // this.audioBip.pause();
    // this.audioBip.currentTime = 0;
    // this.audioGong.pause();
    // this.audioGong.currentTime = 0;
    // this.audioCorrect.pause();
    // this.audioCorrect.currentTime = 0;
    // this.audioWrong.pause();
    // this.audioWrong.currentTime = 0;
    // this.audioResults.pause();
    // this.audioResults.currentTime = 0;
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
      // el.src = '';
    });
  }

  _audioUnmute() {
    // this.audioBip.src = './assets/savanna/voices/bip.mp3';
    // this.audioGong.src = './assets/savanna/voices/gong.mp3';
    // this.audioCorrect.src = './assets/savanna/voices/correct.mp3';
    // this.audioWrong.src = './assets/savanna/voices/wrong.mp3';
    // this.audioResults.src = './assets/savanna/voices/show_result.mp3';
    console.log('unmuted');
    this._audioStopAllSound();
    this.soundContainers.forEach((el) => {
      el.muted = false;
    });
  }


  _gameDataPrepare() {
    // this.getWords
    let shift = Math.floor(Math.random() * 4);
    this.gameWordArray = [];
    for (let i = 0; i < 120; i++) {
      this.gameWordArray[i] = book1[i * 5 + shift];
    }
    this.shuffle(this.gameWordArray);
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
      setSettingsToStorage('savannaGameLocalSettings', this.localSettings);
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
        this.answbtn0.textContent = `1) ${this.gameWordArray[this.gameState.step * 4 + 0][this.gameState.answersWord]}`;
        this.answbtn1.textContent = `2) ${this.gameWordArray[this.gameState.step * 4 + 1][this.gameState.answersWord]}`;
        this.answbtn2.textContent = `3) ${this.gameWordArray[this.gameState.step * 4 + 2][this.gameState.answersWord]}`;
        this.answbtn3.textContent = `4) ${this.gameWordArray[this.gameState.step * 4 + 3][this.gameState.answersWord]}`;
        this.gameState.questionWordBias = Math.floor(Math.random() * 4);
        this.gameState.questionWordLink = this.gameWordArray[this.gameState.step * 4 + this.gameState.questionWordBias];
        this.questionWord.textContent = `${this.gameState.questionWordLink[this.gameState.mainWord]}`;
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

        for (let i = 0; i < 4; i++) {
          this[`answbtn${i}`].classList.remove('savannaWrongAnswerBtn', 'savannaCorrectAnswerBtn');
        }
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
            this[`answ${this.gameState.answerButton}`].classList.add('savannaWrongAnswerBtn');
          } else {
            for (let i = 0; i < 4; i++) {
              this[`answbtn${i}`].classList.add('savannaWrongAnswerBtn');
            }
          }
          setTimeout(this._gameResolve.bind(this), 0);
        }
        this[`answ${this.gameState.answerCorrectButton}`].classList.add('savannaCorrectAnswerBtn');
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
        for (let i = 0; i < 4; i++) {
          this[`answbtn${i}`].classList.remove('savannaWrongAnswerBtn', 'savannaCorrectAnswerBtn');
        }
        if (this.gameState.step < Math.floor(this.gameWordArray.length / 4)) {
          this.answbtn0.textContent = `1) ${this.gameWordArray[this.gameState.step * 4 + 0][this.gameState.answersWord]}`;
          this.answbtn1.textContent = `2) ${this.gameWordArray[this.gameState.step * 4 + 1][this.gameState.answersWord]}`;
          this.answbtn2.textContent = `3) ${this.gameWordArray[this.gameState.step * 4 + 2][this.gameState.answersWord]}`;
          this.answbtn3.textContent = `4) ${this.gameWordArray[this.gameState.step * 4 + 3][this.gameState.answersWord]}`;
          this.gameState.questionWordBias = Math.floor(Math.random() * 4);
          this.gameState.questionWordLink = this.gameWordArray[this.gameState.step * 4 + this.gameState.questionWordBias];
          this.questionWord.textContent = `${this.gameState.questionWordLink[this.gameState.mainWord]}`;
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
    // <p class="h5 mb-3"><span>Верно:</span><span class="badge badge-success  ml-2">10</span></p>
    // <li class="statistics-word">
    //   <div class="text-secondary fas fa-volume-up sound-button h5 mr-2"></div>
    //   <div>
    //     <span class="word h5 text-info">agree</span>
    //     <span>—</span>
    //     <span>согласна</span>
    //   </div>
    // </li>
    if (this.gameState.statisticWrongAnswers.length === 0) {
      this.savannaStatisticHeadingElement.textContent = 'В этот раз всё великолепно';
    } else if (this.gameState.statisticWrongAnswers.length === 5) {
      this.savannaStatisticHeadingElement.textContent = 'В этот раз не получилось, но продолжай тренироваться!';
    } else {
      this.savannaStatisticHeadingElement.textContent = 'В этот раз неплохо, но можно и лучше!';
    }

    // this.savannaStatisticContent.innerHTML = '';
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
    let j, temp;
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
