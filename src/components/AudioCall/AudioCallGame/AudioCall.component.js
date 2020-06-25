import $$ from '../../../core/domManipulation';
import createAudioCall from './audioCall.template';
import getRoundWords from './asyncGetRoundWords';
import { setRoundWord, setAnswerAttribute, crossTheWord } from './utils';

// ПЕРЕНЕСТИ В ПАПКУ ИГРЫ

export default class AudioCall {
  constructor() {
    this.audioCallWrapper = $$.create('div', 'container-fluid').$el;
    this.audioCallWrapper.classList.add('audio-call-wrapper');
    this.audioCallWrapper.insertAdjacentHTML('afterbegin', createAudioCall());

    this.app = document.getElementById('app');
    this.progress = 0;
    this.gameSound = true;

    this.onClick = this.onClick.bind(this);
    // this.render = this.render.bind(this);
  }

  async fillRoundWords() {
    const roundWordsArr = await getRoundWords();
    this.spanRoundWords = document.querySelectorAll('.round-word');
    this.spanRoundWordsNumbers = document.querySelectorAll('.round-word-number');

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
    const audio = new Audio();
    audio.src = 'https://raw.githubusercontent.com/Jekman87/rslang-data/master/voices/pew.mp3';
    audio.play().catch((err) => console.log(err));
  }

  playWrongSound() {
    const audio = new Audio();
    audio.src = 'https://raw.githubusercontent.com/Jekman87/rslang-data/master/voices/wrong.mp3';
    audio.play().catch((err) => console.log(err));
  }

  onRightAnswer() {
    // ИЗМЕНЕНИЕ ФОНА
    this.questionCol.classList.add('d-none');
    this.answerCol.classList.remove('d-none');

    this.progressBar.setAttribute('aria-valuenow', this.progress);
    this.progressBar.style.width = `${this.progress}0%`;
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

  render() {
    this.app.append(this.audioCallWrapper);
    this.audioCallWrapper.addEventListener('click', this.onClick);

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
  }
}
