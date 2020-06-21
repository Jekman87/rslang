import PuzzleDrawer from './PuzzleDrawer';

export default class GameController {
  constructor() {
    this.puzzleDrawer = new PuzzleDrawer();
    this.sentenceList = document.querySelectorAll('li.sentence');
    this.sentenceConstructor = document.querySelector('p.sentence-constructor');
    this.availableWords = document.querySelector('p.available-words');
    this.translateHelp = document.querySelector('p.sentence-translate');
    this.audioHelp = new Audio();
    this.imgHelp = document.querySelector('img.painting-pic');
    this.painting = document.querySelector('figure.painting-block');
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

  async handleNewData(e) {
    this.sentenceIndex = 0;
    this.sentencesData = e.detail.data.sentencesInfo;
    this.pictureData = e.detail.data.pictureInfo;

    this.switchElementsVisibility(false);
    this.cleanSentenceConstructor();
    await this.createPuzzles();
    this.fillHelpers();
    this.getAvailableWords();
    this.setPaintingInfo();
    this.removeLoadingEffect();
  }

  switchElementsVisibility(isEndOfRound) {
    this.sentenceList.forEach((sentence) => {
      sentence.classList.remove('sentence_guessed');
    });

    this.translateHelp.classList.remove('visible');
    this.painting.classList.toggle('hidden');
    this.sentenceConstructor.classList.toggle('hidden');
    this.availableWords.classList.toggle('hidden');
    document.querySelector('div.answer-btn-group').classList.toggle('hidden');

    if (isEndOfRound) {
      document.querySelector('div.next-round-block').classList.remove('hidden');
    }
  }

  removeLoadingEffect() {
    this.startBtn.classList.remove('visible');
    this.spinner.classList.remove('visible');
    document.querySelector('div.start-page').classList.add('hidden');
    document.querySelector('main.main').classList.add('visible');
  }

  async createPuzzles() {
    this.imgHelp.src = this.pictureData.link;
    await new Promise((resolve) => {
      this.imgHelp.onload = () => {
        this.puzzleDrawer.setData(this.sentencesData);
        this.puzzleDrawer.renderCanvases();
        this.puzzleDrawer.drawPuzzles();
        resolve();
      };
    });
  }

  fillHelpers() {
    this.translateHelp.textContent = this.sentencesData[this.sentenceIndex].translate;
    if (localStorage.translateHelp === 'on') {
      this.translateHelp.classList.add('visible');
    } else {
      this.translateHelp.classList.remove('visible');
    }

    this.audioHelp.src = this.sentencesData[this.sentenceIndex].audio;
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
    const newWords = words.map((word, i, arr) => {
      const newWord = PuzzleDrawer.clonePuzzle(word, true);

      if (i === arr.length - 1) newWord.classList.add('word_last');
      newWord.dataset.content = this.sentencesData[this.sentenceIndex].text[i];

      return newWord;
    });
    GameController.shuffle(newWords);
    newWords.forEach((word) => {
      this.availableWords.append(word);
    });
  }

  setPaintingInfo() {
    const info = `${this.pictureData.author} - ${this.pictureData.name} (${this.pictureData.year})`;
    this.painting.querySelector('figcaption').textContent = info;
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
      this.switchElementsVisibility(true);
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
      this.sentenceConstructor.append(PuzzleDrawer.clonePuzzle(word, true));
    });
    this.availableWords.innerHTML = '';
  }

  static toggleHighLigth(list) {
    list.forEach((item) => item.classList.toggle('word_still-available'));
  }

  compare(e) {
    const answers = this.sentenceConstructor.querySelectorAll('.word');
    this.isCorrect = true;
    const result = [];
    const answerIdx = [];

    this.sentencesData[this.sentenceIndex].text.forEach((word, i) => {
      if (word === answers[i].dataset.content) {
        result.push(true);
        answerIdx.push(i);
      } else {
        result.push(false);
        this.isCorrect = false;
        answerIdx.push(this.sentencesData[this.sentenceIndex].text.indexOf(answers[i].dataset.content));
      }
    });

    this.showResult(result, answerIdx);

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

  showResult(result, answerIdx) {
    this.puzzleDrawer.drawSentence(this.sentenceConstructor, this.sentenceIndex, result, answerIdx);
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
