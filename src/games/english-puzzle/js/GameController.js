import PuzzleDrawer from './PuzzleDrawer.js';
import monthNames from './calendarMap.js';

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
    this.popUp = document.querySelector('div.pop-up');
    this.resultsBlock = document.querySelector('div.results-block');
    this.statTable = document.querySelector('table.statistics-table');
  }

  init() {
    document.addEventListener('newData', this.handleNewData.bind(this));

    document.querySelector('button.check-btn').addEventListener('click', this.handlePositiveAnswer.bind(this));
    document.querySelector('button.give-up-btn').addEventListener('click', this.handleNegativeAnswer.bind(this));

    document.querySelector('button.results-btn').addEventListener('click', this.showRoundResults.bind(this));
    document.querySelector('button.statistics-btn').addEventListener('click', this.showStatistics.bind(this));
    document.querySelector('button.close-btn').addEventListener('click', this.closePopUp.bind(this));
    this.startBtn.addEventListener('click', this.startGame.bind(this));
    this.playBtn.addEventListener('click', this.playAudio.bind(this));
    this.resultsBlock.addEventListener('click', this.playByClick.bind(this));

    this.audioHelp.addEventListener('ended', this.removePlayEffect.bind(this));
    this.audioHelp.addEventListener('abort', this.removePlayEffect.bind(this));
  }

  startGame() {
    this.spinner.classList.add('visible');
    document.dispatchEvent(new CustomEvent('dataRequired', { detail: GameController.defineNextRound() }));
  }

  async handleNewData(e) {
    this.sentenceIndex = 0;
    this.correctCounter = 0;
    this.results = {};
    this.sentencesData = e.detail.data.sentencesInfo;
    this.pictureData = e.detail.data.pictureInfo;

    this.setPosition(e);
    this.switchElementsVisibility(false);
    this.cleanSentenceConstructor();
    await this.createPuzzles();
    this.fillHelpers();
    this.getAvailableWords();
    this.setPaintingInfo();
    this.removeLoadingEffect();
  }

  setPosition(e) {
    const [round, level] = e.detail.position;
    this.roundCurrent = round;
    this.levelCurrent = level;
  }

  switchElementsVisibility(isEndOfRound) {
    this.sentenceList.forEach((sentence) => {
      sentence.classList.remove('sentence_guessed');
    });
    this.translateHelp.classList.remove('visible');

    if (isEndOfRound) {
      this.playBtn.classList.add('invisible');
      this.painting.classList.remove('hidden');
      this.sentenceConstructor.classList.add('hidden');
      this.availableWords.classList.add('hidden');
      document.querySelector('div.answer-btn-group').classList.add('hidden');
      document.querySelector('div.next-round-block').classList.remove('hidden');
    } else {
      this.closePopUp();
      this.playBtn.classList.remove('invisible');
      this.painting.classList.add('hidden');
      this.sentenceConstructor.classList.remove('hidden');
      this.availableWords.classList.remove('hidden');
      document.querySelector('div.answer-btn-group').classList.remove('hidden');
      document.querySelector('div.next-round-block').classList.add('hidden');
      document.querySelector('button.check-btn').textContent = 'Check';
      document.querySelector('button.give-up-btn').classList.remove('disabled');
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
      const newWord = PuzzleDrawer.cloneCanvas(word);

      if (i === arr.length - 1) {
        newWord.classList.add('word_last');
      }

      return newWord;
    });

    const withPic = localStorage.getItem('visualHelp') === 'on';
    this.puzzleDrawer.drawSentence(newWords, this.sentenceIndex, withPic);

    GameController.shuffle(newWords);

    newWords.forEach((word) => {
      this.availableWords.append(word);
    });
  }

  setPaintingInfo() {
    const info = `${this.pictureData.author} - ${this.pictureData.name} (${this.pictureData.year})`;
    document.querySelectorAll('figcaption').forEach((el) => {
      el.textContent = info;
    });
    document.querySelector('img.painting-pic_small').src = this.pictureData.link;
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
      this.saveRoundResult();
      this.switchElementsVisibility(true);
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
      this.sentenceConstructor.append(PuzzleDrawer.cloneCanvas(word));
    });

    const withPic = localStorage.getItem('visualHelp') === 'on';
    this.puzzleDrawer.drawSentence(this.sentenceConstructor, this.sentenceIndex, withPic);

    this.availableWords.innerHTML = '';
  }

  static toggleHighLigth(list) {
    list.forEach((item) => item.classList.toggle('word_still-available'));
  }

  compare(e) {
    const answers = this.sentenceConstructor.querySelectorAll('.word');
    this.isCorrect = true;

    answers.forEach((word, i) => {
      if (Number(word.dataset.idx) !== i) {
        this.isCorrect = false;
      }
    });

    this.showResult();
    this.results[this.sentenceIndex] = this.isCorrect;

    if (this.isCorrect) {
      this.correctCounter += 1;
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

  showResult() {
    const withPic = localStorage.getItem('visualHelp') === 'on';
    this.puzzleDrawer.drawSentence(this.sentenceConstructor, this.sentenceIndex, withPic, true);
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

  saveRoundResult() {
    const roundResult = `${this.levelCurrent}-${this.roundCurrent},${Date.now()},${this.correctCounter}`;
    const oldStat = localStorage.getItem('statistics');
    if (oldStat) {
      localStorage.setItem('statistics', `${roundResult};${oldStat}`);
    } else {
      localStorage.setItem('statistics', `${roundResult}`);
    }
    document.dispatchEvent(new CustomEvent('userDataChange'));
  }

  closePopUp() {
    this.popUp.classList.add('hidden');
    this.resultsBlock.classList.add('hidden');
    this.statTable.classList.add('hidden');
  }

  showRoundResults() {
    this.fillRoundResults();
    this.resultsBlock.classList.remove('hidden');
    this.popUp.classList.remove('hidden');
  }

  showStatistics() {
    GameController.fillStatistics();
    this.statTable.classList.remove('hidden');
    this.popUp.classList.remove('hidden');
  }

  fillRoundResults() {
    const correctList = document.querySelector('ul.answers-list_correct');
    const incorrectList = document.querySelector('ul.answers-list_incorrect');
    const correctCounter = document.querySelector('span.counter_correct');
    const incorrectCounter = document.querySelector('span.counter_incorrect');
    const correctSentences = [];
    const incorrectSentences = [];

    this.sentencesData.forEach((item, i) => {
      const sentenceItem = `<li class="answer-list__item"><button class="btn play-btn play-btn_small" data-src="${item.audio}" title="play"></button>${item.text.join(' ')}</li>`;
      if (this.results[i] === true) {
        correctSentences.push(sentenceItem);
      } else {
        incorrectSentences.push(sentenceItem);
      }
    });

    correctCounter.textContent = correctSentences.length;
    incorrectCounter.textContent = incorrectSentences.length;

    correctList.innerHTML = correctSentences.join('');
    incorrectList.innerHTML = incorrectSentences.join('');
  }

  static fillStatistics() {
    document.querySelector('table.statistics-table').innerHTML = '';
    const rows = ['<caption class="table-caption">Ваши ранее сыгранные игры:</caption><tr class="tr"><th class="th">Уровень</th><th class="th">Раунд</th><th class="th">Дата</th><th class="th">Время</th><th class="th">Счет</th></tr>'];
    let statistics = localStorage.getItem('statistics');
    statistics = statistics.split(';');
    statistics = statistics.map((item) => item.split(','));
    statistics.forEach((result) => {
      const [level, round] = result[0].split('-');
      const date = new Date(Number(result[1]));
      const score = result[2];
      const tr = `
      <tr class="tr">
        <td class="td">${level}</td>
        <td class="td">${round}</td>
        <td class="td">${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}</td>
        <td class="td">${date.getHours()}:${date.getMinutes()}</td>
        <td class="td">${score} / 10</td>
      </tr>`;
      rows.push(tr);
      if (rows.length > 16) rows.length = 16;
    });
    document.querySelector('table.statistics-table').innerHTML = rows.join('');
  }

  playByClick(e) {
    if (e.target.classList.contains('play-btn_small')) {
      this.audioHelp.onplay = () => {
        document.querySelectorAll('button.play-btn_small').forEach((btn) => {
          btn.classList.remove('play-btn_active');
        });
        e.target.classList.add('play-btn_active');
      };
      this.audioHelp.src = e.target.dataset.src;
      this.audioHelp.play();
      this.audioHelp.onended = () => e.target.classList.remove('play-btn_active');
    }
  }
}
