import $$ from '../../../core/domManipulation';
import { FILE_URL } from '../../../constants/constants';
import Component from '../../../core/Component';
import createStartPage from '../StartPage/startPage.template';
import createAudioCall from './audioCall.template';
import createAudioCallStats from './stats.template';
import {
  setRoundWord,
  setAnswerAttribute,
  crossTheWord,
  onArrows,
  insertStats,
  insertLongStats,
  getTip,
} from './utils';

export default class AudioCall extends Component {
  static className = 'audiocall';

  constructor($root, options) {
    super($root, {
      name: 'Audiocall',
      ...options,
    });
    this.options = options;

    this.app = document.querySelector($root);
    this.gameSound = true;
    this.statistics = [];
    this.gameRound = 1;

    this.statistic = this.options.dataForApp.statistics;
    this.userWords = this.options.dataForApp.userWords;
    this.mainApi = this.options.api;

    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.destroy = this.destroy.bind(this);
    this.appendStats = this.appendStats.bind(this);
    this.sendStatistic = this.sendStatistic.bind(this);
    this.fillRoundWords = this.fillRoundWords.bind(this);
  }

  async fillRoundWords() {
    let roundWordsArr = [];
    const page = Math.floor(Math.random() * (30 - 0 + 1));

    if (this.userWords.length < 70 || this.gameWithNewWords) {
      roundWordsArr = await this.mainApi.getWords(page, this.gameLevel - 1, 10, 5);
    } else {
      const filter = '{"userWord":{"$ne":null}}';
      const words = await this.mainApi.getAllUserAggregatedWords(null, 60, filter);
      roundWordsArr = words[0].paginatedResults
        .sort(() => {
          return Math.random() - 0.5;
        })
        .slice(0, 5);
    }

    this.spanRoundWords = document.querySelectorAll('.round-word');
    this.spanRoundWordsNumbers = document.querySelectorAll('.round-word-number');
    this.btnsRoundWords = document.querySelectorAll('.btn-word');

    this.questionCol.classList.remove('d-none');
    this.answerCol.classList.add('d-none');

    this.roundWord = setRoundWord(roundWordsArr);
    this.btnDontKnow.classList.remove('d-none');
    this.btnNext.classList.add('d-none');
    document.querySelector('.fa-lightbulb').classList.remove('text-muted');

    for (let i = 0; i < this.spanRoundWords.length; i += 1) {
      this.spanRoundWords[i].classList.remove('text-muted', 'text-decoration');
      this.spanRoundWords[i].previousElementSibling.classList.remove('text-muted');
      this.btnsRoundWords[i].classList.remove('text-muted', 'isTipped');

      this.spanRoundWords[i].innerText = roundWordsArr[i].wordTranslate;
      this.spanRoundWordsNumbers[i].innerText = i + 1;

      if (roundWordsArr[i].isAnswer) {
        setAnswerAttribute(this.spanRoundWords[i], true);
        this.rightAnswerSpan = this.spanRoundWords[i];
        this.rightAnswerSpanNumber = this.spanRoundWordsNumbers[i];

        this.statistics.push([
          roundWordsArr[i].word,
          roundWordsArr[i].wordTranslate,
          roundWordsArr[i].audio,
        ]);

        this.answerPic.src = `${FILE_URL}/${this.roundWord.image}`;
        this.answerWord.innerText = this.roundWord.word;
      } else {
        setAnswerAttribute(this.spanRoundWords[i], false);
      }
    }
    this.progress += 1;

    this.sayRoundWord();
  }

  sayRoundWord() {
    this.btnRepeat.forEach((btn) => {
      btn.classList.add('btn-repeat-animation');
    });
    setTimeout(() => {
      this.btnRepeat.forEach((btn) => {
        btn.classList.remove('btn-repeat-animation');
      });
    }, 2500);

    const audio = new Audio();
    audio.src = `https://raw.githubusercontent.com/Jekman87/rslang-data/master/${this.roundWord.audio}`;
    audio.play().catch((err) => console.log(err));
  }

  playWinSound() {
    const audio = new Audio();
    audio.src = '/assets/audio/pew.mp3';
    audio.play().catch((err) => console.log(err));
  }

  playWrongSound() {
    const audio = new Audio();
    audio.src = '/assets/audio/wrong.mp3';
    audio.play().catch((err) => console.log(err));
  }

  onRightAnswer() {
    this.questionCol.classList.add('d-none');
    this.answerCol.classList.remove('d-none');

    this.progressBar.setAttribute('aria-valuenow', this.progress);
    this.progressBar.style.width = `${this.progress}0%`;

    this.audioCallWrapper.style.backgroundImage = `linear-gradient(90deg, rgba(111, 108, 157, 0.7) 0%, rgba(79, 138, 185, 0.7) ${this.progress}0%, rgb(164, 207, 216) 100%)`;

    this.btnDontKnow.classList.add('d-none');
    this.btnNext.classList.remove('d-none');

    this.spanRoundWords.forEach((word) => {
      word.classList.add('text-muted');
      word.previousElementSibling.classList.add('text-muted');
    });
    this.rightAnswerSpan.classList.remove('text-muted');
  }

  sendStatistic(roundResult) {
    let AudioCallLong = [];
    try {
      if (JSON.parse(this.statistic.optional.AudioCallLong)) {
        AudioCallLong = JSON.parse(this.statistic.optional.AudioCallLong);
      }
    } catch {
      console.log('Запись в пустой объект статистики');
    }

    if (AudioCallLong.length < 20) {
      AudioCallLong.push(roundResult);
    } else {
      AudioCallLong.shift();
      AudioCallLong.push(roundResult);
    }

    this.statistic.optional.AudioCallLong = JSON.stringify(AudioCallLong);
    this.mainApi.updateStatistics(this.statistic);

    const [correct] = roundResult.result.split('-');
    const gameValue = (correct / this.maxProgress) * 10;

    this.options.observer.emit('saveCommonProgress', gameValue);
  }

  onClick(event) {
    const { target } = event;
    const isTipped =
      target.classList.contains('isTipped') || target.parentNode.classList.contains('isTipped');

    switch (target.dataset.event) {
      case 'close':
        this.options.observer.emit('selectPage', 'MainPage');
        break;
      case 'settings':
        document.querySelector('.audiocall-setting-card').classList.toggle('setting-card-opened');
        break;
      case 'startGame':
        this.gameLevel = document.getElementById('audiocallGameLevel').value;
        this.gameWithNewWords = document.getElementById('audiocallisLearnedWords2').checked;
        this.app.innerHTML = '';
        this.renderGame();
        break;
      case 'soundOff':
        document.querySelector('.fa-slash').classList.toggle('d-none');
        if (this.gameSound) {
          this.gameSound = false;
        } else this.gameSound = true;
        break;
      case 'repeat':
        this.sayRoundWord();
        break;
      case 'next':
        if (this.progress < this.maxProgress) {
          this.fillRoundWords();
        } else {
          const gameResult = {
            date: Date.now(),
            round: `${this.gameLevel}-${this.gameRound}`,
            result: `${this.maxProgress - this.mistakesCounter}-${this.mistakesCounter}`,
          };

          this.sendStatistic(gameResult);
          this.gameRound += 1;
          this.appendStats();
        }
        break;
      case 'dontKnow':
        if (this.gameSound) {
          this.playWrongSound();
        }
        this.statistics[this.progress - 1].push('failure');
        this.mistakesCounter += 1;
        this.onRightAnswer();
        this.mistakeContainer.insertAdjacentHTML(
          'beforeend',
          insertStats(this.roundWord.word, this.roundWord.wordTranslate, this.roundWord.audio)
        );
        break;
      case 'new-game':
        this.app.innerHTML = '';
        this.renderGame();
        break;
      case 'stat-sound':
        target.parentNode.children[1].play();
        break;
      case 'long-time-statistic':
        this.statContainer.classList.add('d-none');
        this.longStatContainer.classList.remove('d-none');
        break;
      case 'back-to-short-stat':
        this.longStatContainer.classList.add('d-none');
        this.statContainer.classList.remove('d-none');
        break;
      case 'tip':
        getTip();
        break;
      default:
        break;
    }

    switch (target.dataset.answer) {
      case 'true':
        if (this.btnNext.classList.contains('d-none')) {
          if (this.gameSound) {
            this.playWinSound();
          }
          this.rightAnswerSpanNumber.innerHTML = '<i class="fas fa-check-circle"></i>';
          this.onRightAnswer();
          this.statistics[this.progress - 1].push('success');
          this.correctContainer.insertAdjacentHTML(
            'beforeend',
            insertStats(this.roundWord.word, this.roundWord.wordTranslate, this.roundWord.audio)
          );
        } else {
          event.preventDefault();
        }
        break;
      case 'false':
        if (this.btnNext.classList.contains('d-none') && !isTipped) {
          if (this.gameSound) {
            this.playWrongSound();
          }
          crossTheWord(target);
          this.onRightAnswer();
          this.statistics[this.progress - 1].push('failure');
          this.mistakesCounter += 1;
          this.mistakeContainer.insertAdjacentHTML(
            'beforeend',
            insertStats(this.roundWord.word, this.roundWord.wordTranslate, this.roundWord.audio)
          );
        } else {
          event.preventDefault();
        }
        break;
      default:
        break;
    }
  }

  onKeyUp(event) {
    const { code } = event;
    const wordIndex = code.substring(5);
    const dataAnswer = document.activeElement.getAttribute('data-answer');
    const isButtonWord = document.activeElement.classList.contains('btn-word');
    const isTipped =
      document.activeElement.classList.contains('isTipped') ||
      document.activeElement.parentNode.classList.contains('isTipped');

    switch (code) {
      case 'Enter':
        if (dataAnswer === 'false' && !isTipped) {
          if (this.gameSound) {
            this.playWrongSound();
          }
          crossTheWord(document.activeElement);
          this.onRightAnswer();
          this.statistics[this.progress - 1].push('failure');
          document.activeElement.blur();
        } else if (dataAnswer === 'true') {
          this.rightAnswerSpanNumber.innerHTML = '<i class="fas fa-check-circle"></i>';
          this.onRightAnswer();
          this.statistics[this.progress - 1].push('success');
          document.activeElement.blur();
        } else if (!this.btnNext.classList.contains('d-none')) {
          if (this.progress < this.maxProgress) {
            this.fillRoundWords();
          } else {
            const gameResult = {
              date: Date.now(),
              round: `${this.gameLevel}-${this.gameRound}`,
              result: `${this.maxProgress - this.mistakesCounter}-${this.mistakesCounter}`,
            };

            this.sendStatistic(gameResult);
            this.gameRound += 1;
            this.appendStats();
          }
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        this.btnsRoundWords[0].focus();
        break;
      case 'ArrowLeft':
        if (!isButtonWord) {
          this.btnsRoundWords[0].focus();
        } else onArrows('left');
        break;
      case 'ArrowRight':
        if (!isButtonWord) {
          this.btnsRoundWords[0].focus();
        } else onArrows('right');
        break;
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
      case 'Digit4':
      case 'Digit5':
        if (this.btnNext.classList.contains('d-none')) {
          if (this.btnsRoundWords[wordIndex - 1].dataset.answer === 'true') {
            if (this.gameSound) {
              this.playWinSound();
            }
            this.rightAnswerSpanNumber.innerHTML = '<i class="fas fa-check-circle"></i>';
            this.onRightAnswer();
            this.statistics[this.progress - 1].push('success');
            this.correctContainer.insertAdjacentHTML(
              'beforeend',
              insertStats(this.roundWord.word, this.roundWord.wordTranslate, this.roundWord.audio)
            );
          } else {
            if (this.gameSound) {
              this.playWrongSound();
            }
            crossTheWord(this.btnsRoundWords[wordIndex - 1]);
            this.onRightAnswer();
            this.statistics[this.progress - 1].push('failure');
            this.mistakesCounter += 1;
            this.mistakeContainer.insertAdjacentHTML(
              'beforeend',
              insertStats(this.roundWord.word, this.roundWord.wordTranslate, this.roundWord.audio)
            );
          }
        } else {
          event.preventDefault();
        }

        break;
      default:
        break;
    }
  }

  render() {
    this.startPageWrapper = $$.create('div', 'container-fluid').$el;
    this.startPageWrapper.classList.add('audio-call-start-page');

    this.startPageWrapper.insertAdjacentHTML('afterbegin', createStartPage());

    this.app.append(this.startPageWrapper);
    this.startPageWrapper.addEventListener('click', this.onClick);
  }

  renderGame() {
    this.audioCallWrapper = $$.create('div', 'container-fluid').$el;
    this.audioCallWrapper.classList.add('audio-call-wrapper');
    this.audioCallWrapper.setAttribute('tabindex', '0');
    this.audioCallWrapper.insertAdjacentHTML('afterbegin', createAudioCall());

    this.statsWrapper = $$.create('div', 'container-fluid').$el;
    this.statsWrapper.classList.add('audio-call-stats-wrapper', 'd-none');
    this.statsWrapper.insertAdjacentHTML('afterbegin', createAudioCallStats());

    this.app.append(this.audioCallWrapper);
    this.app.append(this.statsWrapper);
    this.audioCallWrapper.addEventListener('click', this.onClick);
    this.statsWrapper.addEventListener('click', this.onClick);
    document.body.addEventListener('keyup', this.onKeyUp);

    this.progressBar = document.querySelector('.progress-bar');
    this.btnRepeat = document.querySelectorAll('.btn-repeat');
    this.btnDontKnow = document.querySelector('.btn-dont-know');
    this.btnNext = document.querySelector('.btn-next');
    this.questionCol = document.querySelector('.question-col');
    this.answerCol = document.querySelector('.answer-col');
    this.answerPic = document.querySelector('.answer-pic');
    this.answerWord = document.querySelector('.answer-word');

    this.statContainer = document.querySelector('.stat-container');
    this.longStatContainer = document.querySelector('.long-stat-container');
    this.mistakeContainer = document.querySelector('.mistake-container');
    this.correctContainer = document.querySelector('.correct-container');
    this.longStatResults = document.querySelector('.long-stat-results');

    this.progress = 0;
    this.maxProgress = 10;
    this.mistakesCounter = 0;
    this.fillRoundWords();
  }

  appendStats() {
    const AudioCallLong = JSON.parse(this.statistic.optional.AudioCallLong);
    AudioCallLong.forEach((stat) => {
      this.longStatResults.insertAdjacentHTML(
        'afterbegin',
        insertLongStats(stat.date, stat.result)
      );
    });

    this.app.removeChild(this.app.firstChild);
    document.querySelector('.span-mistakes').innerText = this.mistakesCounter;
    document.querySelector('.span-correct').innerText = this.maxProgress - this.mistakesCounter;
    this.statsWrapper.classList.remove('d-none');
  }

  destroy() {
    if (this.audioCallWrapper) {
      this.audioCallWrapper.removeEventListener('click', this.onClick);
      this.statsWrapper.removeEventListener('click', this.onClick);
    }
    document.body.removeEventListener('keyup', this.onKeyUp);
  }
}
