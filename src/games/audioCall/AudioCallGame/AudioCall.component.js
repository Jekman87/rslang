/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import $$ from '../../../core/domManipulation';
import createAudioCall from './audioCall.template';
import getRoundWords from './asyncGetRoundWords';
import { setRoundWord, setAnswerAttribute, crossTheWord, onArrows } from './utils';

export default class AudioCall {
  constructor() {
    this.audioCallWrapper = $$.create('div', 'container-fluid').$el;
    this.audioCallWrapper.classList.add('audio-call-wrapper');

    document.body.setAttribute('tabindex', '0');

    this.audioCallWrapper.insertAdjacentHTML('afterbegin', createAudioCall());

    this.app = document.getElementById('app');
    this.progress = 0;
    this.gameSound = true;

    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    // this.render = this.render.bind(this);
  }

  async fillRoundWords() {
    const roundWordsArr = await getRoundWords();
    this.spanRoundWords = document.querySelectorAll('.round-word');
    this.spanRoundWordsNumbers = document.querySelectorAll('.round-word-number');
    this.btnsRoundWords = document.querySelectorAll('.btn-word');

    this.questionCol.classList.remove('d-none');
    this.answerCol.classList.add('d-none');

    this.roundWord = setRoundWord(roundWordsArr);
    this.btnDontKnow.classList.remove('d-none');
    this.btnNext.classList.add('d-none');

    for (let i = 0; i < this.spanRoundWords.length; i += 1) {
      this.spanRoundWords[i].classList.remove('text-muted');
      this.spanRoundWords[i].classList.remove('text-decoration');
      this.spanRoundWords[i].innerText = roundWordsArr[i].wordTranslate;
      this.spanRoundWordsNumbers[i].innerText = i + 1;

      if (roundWordsArr[i].isAnswer) {
        setAnswerAttribute(this.spanRoundWords[i], true);
        this.rightAnswerSpan = this.spanRoundWords[i];
        this.rightAnswerSpanNumber = this.spanRoundWordsNumbers[i];

        this.answerPic.src = `https://raw.githubusercontent.com/Jekman87/rslang-data/master/${this.roundWord.image}`;
        this.answerWord.innerText = this.roundWord.word;
      } else {
        setAnswerAttribute(this.spanRoundWords[i], false);
      }
    }
    this.progress += 1;
    this.sayRoundWord();
  }

  sayRoundWord() {
    const audio = new Audio();
    audio.src = `https://raw.githubusercontent.com/Jekman87/rslang-data/master/${this.roundWord.audio}`;
    audio.play().catch((err) => console.log(err));
  }

  playWinSound() {
    // const audio = new Audio();
    // audio.src = 'https://raw.githubusercontent.com/Jekman87/rslang-data/master/voices/pew.mp3';
    // audio.play().catch((err) => console.log(err));
  }

  playWrongSound() {
    // const audio = new Audio();
    // audio.src = 'https://raw.githubusercontent.com/Jekman87/rslang-data/master/voices/wrong.mp3';
    // audio.play().catch((err) => console.log(err));
  }

  onRightAnswer() {
    this.questionCol.classList.add('d-none');
    this.answerCol.classList.remove('d-none');

    this.progressBar.setAttribute('aria-valuenow', this.progress);
    this.progressBar.style.width = `${this.progress}0%`;

    this.audioCallWrapper.style.backgroundImage = `linear-gradient(90deg, rgba(111, 108, 157, 0.7) 0%, rgba(79, 138, 185, 0.7) ${this.progress}0%, rgb(164, 207, 216) 100%)`;

    this.btnDontKnow.classList.add('d-none');
    this.btnNext.classList.remove('d-none');

    this.spanRoundWords.forEach((word) => word.classList.add('text-muted'));
    this.rightAnswerSpan.classList.remove('text-muted');
  }

  onClick(event) {
    const { target } = event;

    switch (target.dataset.event) {
      case 'close':
        this.destroy();
        break;
      case 'soundOff':
        document.querySelector('.fa-slash').classList.toggle('d-none');
        if (this.gameSound) {
          this.gameSound = false;
        } else this.gameSound = true;
        break;
      case 'repeat':
        this.btnRepeat.forEach((btn) => {
          btn.classList.add('btn-repeat-animation');
        });
        setTimeout(() => {
          this.btnRepeat.forEach((btn) => {
            btn.classList.remove('btn-repeat-animation');
          });
        }, 2500);
        this.sayRoundWord();
        break;
      case 'next':
        if (this.progress < 10) {
          this.fillRoundWords();
        } else alert('the end');
        break;
      case 'dontKnow':
        if (this.gameSound) {
          this.playWrongSound();
        }
        this.onRightAnswer();
        break;
      default:
        break;
    }

    switch (target.dataset.answer) {
      case 'true':
        if (this.gameSound) {
          this.playWinSound();
        }
        this.rightAnswerSpanNumber.innerHTML = '<i class="fas fa-check-circle"></i>';
        this.onRightAnswer();
        break;
      case 'false':
        if (this.gameSound) {
          this.playWrongSound();
        }
        crossTheWord(target);
        this.onRightAnswer();
        break;
      default:
        break;
    }
  }

  onKeyUp(event) {
    const { code } = event;

    switch (code) {
      case 'Enter':
        if (document.activeElement.getAttribute('data-answer') === 'false') {
          if (this.gameSound) {
            this.playWrongSound();
          }
          console.log(document.activeElement);
          crossTheWord(document.activeElement);
          this.onRightAnswer();
          document.activeElement.blur();
        } else if (document.activeElement.getAttribute('data-answer') === 'true') {
          if (this.gameSound) {
            this.playWinSound();
          }
          this.rightAnswerSpanNumber.innerHTML = '<i class="fas fa-check-circle"></i>';
          this.onRightAnswer();
          document.activeElement.blur();
        } else if (!this.btnNext.classList.contains('d-none')) {
          if (this.progress < 10) {
            this.fillRoundWords();
          } else alert('the end');
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        this.btnsRoundWords[0].focus();
        break;
      case 'ArrowLeft':
        if (document.activeElement.tagName === 'BODY') {
          this.btnsRoundWords[0].focus();
        } else onArrows('left');
        break;
      case 'ArrowRight':
        if (document.activeElement.tagName === 'BODY') {
          this.btnsRoundWords[0].focus();
        } else onArrows('right');
        break;
      default:
        break;
    }
  }

  render() {
    this.app.append(this.audioCallWrapper);
    this.audioCallWrapper.addEventListener('click', this.onClick);
    document.body.addEventListener('keyup', this.onKeyUp);

    this.progressBar = document.querySelector('.progress-bar');
    this.btnRepeat = document.querySelectorAll('.btn-repeat');
    this.btnDontKnow = document.querySelector('.btn-dont-know');
    this.btnNext = document.querySelector('.btn-next');
    this.questionCol = document.querySelector('.question-col');
    this.answerCol = document.querySelector('.answer-col');
    this.answerPic = document.querySelector('.answer-pic');
    this.answerWord = document.querySelector('.answer-word');

    this.fillRoundWords();
  }

  destroy() {
    document.getElementById('app').innerHTML = '';
    this.audioCallWrapper.removeEventListener('click', this.onClick);
    document.body.removeEventListener('keyup', this.onKeyUp);
  }
}
