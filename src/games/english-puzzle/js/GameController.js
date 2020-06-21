export default class GameController {
  constructor() {
    this.sentenceList = document.querySelectorAll('li.sentence');
    this.sentenceConstructor = document.querySelector('p.sentence-constructor');
    this.availableWords = document.querySelector('p.available-words');
    this.translateHelp = document.querySelector('p.sentence-translate');
    this.audioHelp = new Audio();
    this.playBtn = document.querySelector('button.play-btn');
    this.startBtn = document.querySelector('button.start-button');
    this.spinner = document.querySelector('div.spinner');
  }

  init() {
    document.addEventListener('newData', this.handleNewData.bind(this));

    document.querySelector('button.check-btn').addEventListener('click', this.handlePositiveAnswer.bind(this));
    document.querySelector('button.give-up-btn').addEventListener('click', this.handleNegativeAnswer.bind(this));
    this.startBtn.addEventListener('click', this.startGame.bind(this));
    this.playBtn.addEventListener('click', this.playAudio.bind(this));

    this.audioHelp.addEventListener('ended', this.removePlayEffect.bind(this));
    this.audioHelp.addEventListener('abort', this.removePlayEffect.bind(this));
  }

  startGame() {
    this.spinner.classList.add('visible');
    document.dispatchEvent(new CustomEvent('dataRequired', { detail: GameController.defineNextRound() }));
  }

  removeLoadingEffect() {
    this.startBtn.classList.remove('visible');
    this.spinner.classList.remove('visible');
    document.querySelector('div.start-page').classList.add('hidden');
    document.querySelector('main.main').classList.add('visible');
  }

  handleNewData(e) {
    this.sentenceIndex = 0;
    this.data = e.detail.data;
    this.data.forEach((item, index) => {
      const sentence = GameController.createSentence(item.text);
      this.sentenceList[index].innerHTML = sentence;
      this.sentenceList[index].classList.remove('sentence_guessed');
    });
    this.fillHelpers();
    this.cleanSentenceConstructor();
    this.getAvailableWords();
    this.removeLoadingEffect();
  }

  static createSentence(words) {
    const markUpArr = words.map((word) => `<span class="word">${word}</span>`);
    return markUpArr.join('');
  }

  fillHelpers() {
    this.translateHelp.textContent = this.data[this.sentenceIndex].translate;
    if (localStorage.translateHelp === 'off') {
      this.translateHelp.classList.remove('visible');
    }

    this.audioHelp.src = this.data[this.sentenceIndex].audio;
    if (localStorage.autoplayHelp === 'on') {
      this.playAudio();
    }
  }

  playAudio() {
    this.playBtn.classList.add('play-btn_active');
    this.audioHelp.play();
  }

  removePlayEffect() {
    this.playBtn.classList.remove('play-btn_active');
  }

  cleanSentenceConstructor() {
    this.sentenceConstructor.innerHTML = '';
  }

  getAvailableWords() {
    const words = [...this.sentenceList[this.sentenceIndex].children];
    GameController.shuffle(words);
    words.forEach((word) => {
      this.availableWords.append(word.cloneNode(true));
    });
  }

  static shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  handlePositiveAnswer(e) {
    if (e.target.textContent === 'Check') {
      this.check(e);
    } else if (e.target.textContent === 'Continue') {
      this.goNext(e);
    } else if (e.target.textContent === 'Try again') {
      this.goToStart(e);
    }
  }

  handleNegativeAnswer(e) {
    this.showCorrect();
    this.isCorrect = false;
    if (localStorage.autoplayHelp === 'off') {
      this.playAudio();
    }
    this.translateHelp.classList.add('visible');
    e.target.previousElementSibling.textContent = 'Continue';
    e.target.classList.add('disabled');
  }

  check(e) {
    const unusedWords = this.availableWords.querySelectorAll('.word');
    if (unusedWords.length) {
      GameController.toggleHighLigth(unusedWords);
      setTimeout(() => GameController.toggleHighLigth(unusedWords), 2000);
    } else {
      this.compare(e);
    }
  }

  goNext(e) {
    this.markSentence();
    this.sentenceList[this.sentenceIndex].classList.add('sentence_guessed');
    e.target.nextElementSibling.classList.remove('disabled');

    if (this.sentenceIndex === 9) {
      document.querySelector('div.answer-btn-group').classList.toggle('hidden');
      document.querySelector('div.next-round-block').classList.toggle('hidden');
      e.target.textContent = 'Check';
    } else {
      this.sentenceIndex += 1;
      this.goToStart(e);
    }
  }

  goToStart(e) {
    this.fillHelpers();
    this.cleanSentenceConstructor();
    this.getAvailableWords();
    e.target.textContent = 'Check';
  }

  showCorrect() {
    this.cleanSentenceConstructor();
    const words = [...this.sentenceList[this.sentenceIndex].children];

    words.forEach((word) => {
      this.sentenceConstructor.append(word.cloneNode(true));
    });
    this.availableWords.innerHTML = '';
  }

  static toggleHighLigth(list) {
    list.forEach((item) => item.classList.toggle('word_still-available'));
  }

  compare(e) {
    const answers = this.sentenceConstructor.querySelectorAll('span.word');
    this.isCorrect = true;

    [...this.sentenceList[this.sentenceIndex].children].forEach((word, index) => {
      if (word.textContent === answers[index].textContent) {
        answers[index].classList.add('word_correct');
      } else {
        answers[index].classList.add('word_incorrect');
        this.isCorrect = false;
      }
    });

    if (this.isCorrect) {
      if (localStorage.autoplayHelp === 'off') {
        this.playAudio();
      }
      this.translateHelp.classList.add('visible');
      e.target.textContent = 'Continue';
      e.target.nextElementSibling.classList.add('disabled');
    } else {
      e.target.textContent = 'Try again';
    }
  }

  markSentence() {
    const num = document.createElement('span');
    num.classList.add('sentence__num');
    if (this.isCorrect) num.classList.add('sentence__num_correct');
    num.textContent = this.sentenceIndex + 1;
    this.sentenceList[this.sentenceIndex].prepend(num);
  }

  static defineNextRound() {
    const roundsAmount = [null, '45', '40', '40', '25', '25', '25'];
    let [level, round] = localStorage.getItem('lastRound').split('-');

    if (round === roundsAmount[level]) {
      round = 1;
      level = Number(level) + 1;
    } else {
      round = Number(round) + 1;
    }

    return [round, level];
  }
}
