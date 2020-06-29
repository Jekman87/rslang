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



export default class Savanna {
  static className = 'savanna';

  constructor(rootTag) {
    console.log('constructor');
    if (typeof rootTag === 'string') {
      this.rootTag = document.querySelector(rootTag);
    } else {
      this.rootTag = rootTag;
      // eslint-disable-next-line no-param-reassign
    }
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
    this.animationEnd = 0;
    this.rootTag.addEventListener('click', (event) => this._resolveClicks(event));
    this.rootTag.addEventListener('animationend', (event) => this._resolveAnimationEnd(event));
    this.gameState = {};
    this.answ1 = document.getElementById('savanna-answer-btn1');
    this.answ2 = document.getElementById('savanna-answer-btn2');
    this.answ3 = document.getElementById('savanna-answer-btn3');
    this.answ4 = document.getElementById('savanna-answer-btn4');
    this.questionWord = document.getElementById('savanna-question-word');
    console.log('start application');
  }

  _startGame() {
    console.log('start game');
    document.getElementById('savanna-start-page').classList.add('savanna-display-none');
    document.getElementById('savanna-preloader-countdown').textContent = '';
    document.getElementById('savanna-main-spinner').classList.remove('savanna-display-none');
    setTimeout(() => {
      document.getElementById('savanna-preloader-countdown').textContent = '3';
      document.getElementById('SavannaAudioBip').play();
      console.log('timeout1');
    }, 500);

    setTimeout(() => {
      document.getElementById('savanna-preloader-countdown').textContent = '2';
      document.getElementById('SavannaAudioBip').play();
    }, 1500);
    setTimeout(() => {
      document.getElementById('savanna-preloader-countdown').textContent = '1';
      document.getElementById('SavannaAudioBip').play();
    }, 2500);
    setTimeout(() => {
      document.getElementById('savanna-preloader-countdown').textContent = 'Поехали';
      document.getElementById('SavannaAudioGong').play();
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
    this.audioBip.pause();
    this.audioBip.currentTime = 0;
    this.audioGong.pause();
    this.audioGong.currentTime = 0;
    this.audioCorrect.pause();
    this.audioCorrect.currentTime = 0;
    this.audioWrong.pause();
    this.audioWrong.currentTime = 0;
    this.audioResults.pause();
    this.audioResults.currentTime = 0;
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
      // debugger;
      console.log(event.target.dataset.savannaanswerbtn);
      this.gameState.answerButton = event.target.dataset.savannaanswerbtn;
      this.gameState.currentState = 'takeAnswer';
      // this._gameResolve();
      this.fallingWordContainer.classList.remove('word-container-piupiu');
      setTimeout(this._gameResolve.bind(this), 10);
    }
    if (event.target.id === 'savanna-to-game-start-page') {
      console.log('na glavnuyu');
      this._returnStartGamePage();
    }
    if (event.target.classList.contains('soundOnOff')) {
      // document.querySelectorAll('soundOnOff').forEach((element))
    }
  }

  _resolveAnimationEnd(event) {
    console.log('animationEnd root', event);
    switch (event.target) {
      case this.fallingWordContainer:
        console.log('fallingWordContainer');
        this.gameState.answerButton = null;
        this.fallingWordContainer.classList.remove('word-container-piupiu');
        this.animationEnd = 1;
        this.gameState.currentState = 'incorrectAnswer';
        this._gameResolve();
        break;
      default:
        break;
    }
  }

  _gameResolve() {
    console.log('resolve state');

    switch (this.gameState.currentState) {
      case 'gameStart':
        this.gameState.step = 0;
        this.answ1.textContent = `1) ${this.gameWordArray[this.gameState.step * 4 + 0].wordTranslate}`;
        this.answ2.textContent = `2) ${this.gameWordArray[this.gameState.step * 4 + 1].wordTranslate}`;
        this.answ3.textContent = `3) ${this.gameWordArray[this.gameState.step * 4 + 2].wordTranslate}`;
        this.answ4.textContent = `4) ${this.gameWordArray[this.gameState.step * 4 + 3].wordTranslate}`;
        this.gameState.questionWordBias = Math.floor(Math.random() * 4);
        this.questionWord.textContent = `${this.gameWordArray[this.gameState.step * 4 + this.gameState.questionWordBias].word}`;
        this.gameState.answerButton = null;
        this.gameState.answerCorrectButton = `btn${this.gameState.questionWordBias}`;
        this.gameState.currentState = 'waitAnswer';
        setTimeout(this._gameResolve.bind(this), 0);
        this.fallingWordContainer.classList.add('word-container-piupiu');
        break;
      case 'waitAnswer':
        console.log('waitAnswer');
        console.log('startAnimation');
        break;
      case 'takeAnswer':
        this.fallingWordContainer.classList.remove('word-container-piupiu');
        if ((this.gameState.answerButton) === (this.gameState.answerCorrectButton)) {
          this.gameState.currentState = 'correctAnswer';
          setTimeout(this._gameResolve.bind(this), 0);
        } else {
          this.gameState.currentState = 'incorrectAnswer';
          setTimeout(this._gameResolve.bind(this), 0);
        }
        break;
      case 'correctAnswer':
        console.log('correct Answer');
        this.gameState.currentState = 'nextQuestion';
        setTimeout(this._gameResolve.bind(this), 0);
        this._audioStopAllSound();
        this.audioCorrect.play();
        break;
      case 'incorrectAnswer':
        console.log('incorrect Answer');
        this.gameState.currentState = 'nextQuestion';
        setTimeout(this._gameResolve.bind(this), 0);
        this._audioStopAllSound();
        this.audioWrong.play();
        break;
      case 'nextQuestion':
        this.gameState.step++;
        if (this.gameState.step < Math.floor(this.gameWordArray.length / 4)) {
          this.answ1.textContent = `1) ${this.gameWordArray[this.gameState.step * 4 + 0].wordTranslate}`;
          this.answ2.textContent = `2) ${this.gameWordArray[this.gameState.step * 4 + 1].wordTranslate}`;
          this.answ3.textContent = `3) ${this.gameWordArray[this.gameState.step * 4 + 2].wordTranslate}`;
          this.answ4.textContent = `4) ${this.gameWordArray[this.gameState.step * 4 + 3].wordTranslate}`;
          this.gameState.questionWordBias = Math.floor(Math.random() * 4);
          this.questionWord.textContent = `${this.gameWordArray[this.gameState.step * 4 + this.gameState.questionWordBias].word}`;
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
    console.log('destroy');
  }
}
