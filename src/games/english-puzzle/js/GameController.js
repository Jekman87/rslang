/* eslint-disable no-param-reassign */
import PuzzleDrawer from './PuzzleDrawer';
import { monthNames } from './variables';
import paintings from './paintingsInfo';
import { defaultSlide, tableHeader } from './templates';

export default class GameController {
  constructor(storage, reporter) {
    this.storage = storage;
    this.repoter = reporter;
    this.puzzleDrawer = new PuzzleDrawer();
    this.sentenceList = document.querySelectorAll('li.sentence');
    this.sentenceConstructor = document.querySelector('div.sentence-constructor');
    this.availableWords = document.querySelector('div.available-words');
    this.translateHelp = document.querySelector('p.sentence-translate');
    this.audioHelp = new Audio();
    this.imgHelp = document.querySelector('img.painting-pic');
    this.painting = document.querySelector('figure.painting-block');
    this.playBtn = document.querySelector('button.play-pzl-btn');
    this.startBtn = document.querySelector('button.start-button');
    this.exitBtn = document.querySelector('button.exit-pzl-btn');
    this.spinner = document.querySelector('div.spinner');
    this.popUp = document.querySelector('div.pop-up');
    this.resultsBlock = document.querySelector('div.results-block');
    this.statBlock = document.querySelector('div.statistics-block');
  }

  init() {
    window.addEventListener('resize', this.handleWindowResize.bind(this));
    document.addEventListener('newData', this.handleNewData.bind(this));
    document.addEventListener('helperStatusChange', this.handleHelperStatusChange.bind(this));

    document.querySelector('button.check-pzl-btn').addEventListener('click', this.handlePositiveAnswer.bind(this));
    document.querySelector('button.give-up-pzl-btn').addEventListener('click', this.handleNegativeAnswer.bind(this));

    document.querySelector('button.results-pzl-btn').addEventListener('click', this.showRoundResults.bind(this));
    document.querySelector('button.statistics-pzl-btn').addEventListener('click', this.showStatistics.bind(this));
    document.querySelector('button.gallery-pzl-btn').addEventListener('click', this.showGallery.bind(this));
    document.querySelector('button.close-pzl-btn').addEventListener('click', this.closePopUp.bind(this));

    this.startBtn.addEventListener('click', this.startGame.bind(this));
    this.exitBtn.addEventListener('click', this.exit.bind(this));

    this.playBtn.addEventListener('click', this.playAudio.bind(this));
    this.resultsBlock.addEventListener('click', this.playByClick.bind(this));

    this.audioHelp.addEventListener('ended', this.removePlayEffect.bind(this));
    this.audioHelp.addEventListener('abort', this.removePlayEffect.bind(this));
  }

  startGame() {
    this.spinner.classList.add('visible');
    this.defineNextRound();
    document.dispatchEvent(new CustomEvent('dataRequired'));
  }

  async handleNewData() {
    this.sentenceIndex = 0;
    this.correctCounter = 0;
    this.results = [];

    this.switchElementsVisibility(false);
    this.cleanConstructionArea();
    await this.createPuzzles();
    this.fillHelpers();
    this.getAvailableWords();
    this.setPaintingInfo();
    this.switchPage();
  }

  switchElementsVisibility(isEndOfRound) {
    this.translateHelp.classList.remove('visible');

    if (isEndOfRound) {
      if (this.correctCounter === 10) {
        this.painting.classList.remove('hidden');
        document.querySelector('div.sentences-list-wrapper').classList.add('sentences-list-wrapper_cut');
      }
      this.playBtn.classList.add('invisible');
      this.sentenceConstructor.classList.add('hidden');
      this.availableWords.classList.add('hidden');
      document.querySelector('div.answer-pzl-btn-group').classList.add('hidden');
      document.querySelector('div.next-round-block').classList.remove('hidden');
    } else {
      this.sentenceList.forEach((sentence) => sentence.classList.remove('sentence_guessed'));
      this.closePopUp();
      this.playBtn.classList.remove('invisible');
      this.painting.classList.add('hidden');
      this.sentenceConstructor.classList.remove('hidden');
      this.availableWords.classList.remove('hidden');
      document.querySelector('div.answer-pzl-btn-group').classList.remove('hidden');
      document.querySelector('div.next-round-block').classList.add('hidden');
      document.querySelector('button.check-pzl-btn').textContent = 'Проверить';
      document.querySelector('button.give-up-pzl-btn').classList.remove('disabled');
      document.querySelector('div.sentences-list-wrapper').classList.remove('sentences-list-wrapper_cut');
    }
  }

  switchPage() {
    document.querySelector('div.start-page').classList.add('hidden');
    document.querySelector('main.main').classList.add('visible');
  }

  async createPuzzles() {
    this.imgHelp.src = this.get('paintingData').link;
    await new Promise((resolve) => {
      this.imgHelp.onload = () => {
        this.puzzleDrawer.setData(this.get('sentencesData'));
        this.puzzleDrawer.renderCanvases();
        this.puzzleDrawer.drawPuzzles();
        resolve();
      };
    });
  }

  fillHelpers() {
    const data = this.get('sentencesData');

    this.translateHelp.textContent = data[this.sentenceIndex].translate;
    if (this.get('translateHelp') === 'on') {
      this.translateHelp.classList.add('visible');
    } else {
      this.translateHelp.classList.remove('visible');
    }

    this.audioHelp.src = data[this.sentenceIndex].audio;
    if (this.get('pronounceHelp') === 'off') {
      this.playBtn.classList.add('disabled');
    }
    if (this.get('autoplayHelp') === 'on') {
      this.playAudio();
    }

    const words = [...this.sentenceList[this.sentenceIndex].children];
    const isColored = this.get('visualHelp') === 'on';
    this.currentWords = words.map((word) => {
      const newWord = this.puzzleDrawer.cloneCanvas(word);
      if (!isColored) newWord.classList.remove('word_colored');
      return newWord;
    });
  }

  handleHelperStatusChange(e) {
    const isCollectedSentence = document.querySelector('button.check-pzl-btn').textContent === 'Продолжить';
    if (isCollectedSentence) return;

    if (e.detail === 'pronounceHelp') {
      this.playBtn.classList.toggle('disabled');
    }

    if (e.detail === 'translateHelp') {
      this.translateHelp.classList.toggle('visible');
    }

    if (e.detail === 'visualHelp') {
      this.currentWords.forEach((word) => word.classList.toggle('word_colored'));
      [...this.sentenceConstructor.children].forEach((word) => word.classList.toggle('word_colored'));
      [...this.availableWords.children].forEach((word) => word.classList.toggle('word_colored'));

      this.puzzleDrawer.drawSentence(this.sentenceConstructor, this.sentenceIndex);
      this.puzzleDrawer.drawSentence(this.availableWords, this.sentenceIndex);
    }
  }

  showHelpers() {
    if (this.get('autoplayHelp') === 'off') {
      this.playAudio();
    }

    this.translateHelp.classList.add('visible');
    this.playBtn.classList.remove('disabled');
  }

  playAudio() {
    this.audioHelp.play();
    setTimeout(() => this.playBtn.classList.add('play-pzl-btn_active'), 0);
  }

  removePlayEffect() {
    this.playBtn.classList.remove('play-pzl-btn_active');
  }

  cleanConstructionArea() {
    this.sentenceConstructor.innerHTML = '';
    this.availableWords.innerHTML = '';
  }

  getAvailableWords() {
    const newWords = this.currentWords.map((word) => this.puzzleDrawer.cloneCanvas(word));

    this.puzzleDrawer.drawSentence(newWords, this.sentenceIndex);
    this.shuffle(newWords);
    newWords.forEach((word) => this.availableWords.append(word));
  }

  setPaintingInfo() {
    const data = this.get('paintingData');
    const info = `${data.author} - ${data.name} (${data.year})`;

    document.querySelector('img.painting-pic_small').src = data.link;
    document.querySelectorAll('figcaption:not(.art-name)').forEach((el) => {
      el.textContent = info;
    });
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  handlePositiveAnswer(e) {
    if (e.target.textContent === 'Проверить') {
      this.check(e);
    } else if (e.target.textContent === 'Продолжить') {
      this.goNext(e);
    } else if (e.target.textContent === 'Ещё раз') {
      this.goToStart(e);
    }
  }

  handleNegativeAnswer(e) {
    this.isCorrect = false;

    this.showHelpers();
    this.showCorrect();

    this.sentenceConstructor.classList.add('sentence-constructor_disabled');
    e.target.previousElementSibling.textContent = 'Продолжить';
    e.target.classList.add('disabled');
  }

  check(e) {
    const unusedWords = this.availableWords.querySelectorAll('.word');

    if (unusedWords.length) {
      this.toggleHighLigth(unusedWords);
      setTimeout(() => this.toggleHighLigth(unusedWords), 2000);
    } else {
      this.compare(e);
    }
  }

  goNext(e) {
    this.markSentence();
    this.sentenceList[this.sentenceIndex].classList.add('sentence_guessed');
    e.target.nextElementSibling.classList.remove('disabled');

    if (this.sentenceIndex === 9) {
      this.saveRound();
      this.switchElementsVisibility(true);
      this.reportResult();
    } else {
      this.sentenceIndex += 1;
      this.goToStart(e);
    }
  }

  goToStart(e) {
    this.fillHelpers();
    this.cleanConstructionArea();
    this.getAvailableWords();
    e.target.textContent = 'Проверить';
    this.sentenceConstructor.classList.remove('sentence-constructor_disabled');
  }

  showCorrect() {
    this.cleanConstructionArea();

    this.currentWords.forEach((word) => {
      word.classList.add('word_colored');
      this.sentenceConstructor.append(this.puzzleDrawer.cloneCanvas(word));
    });

    this.puzzleDrawer.drawSentence(this.sentenceConstructor, this.sentenceIndex);
  }

  toggleHighLigth(list) {
    list.forEach((item) => item.classList.toggle('word_still-available'));
  }

  compare(e) {
    const answers = this.sentenceConstructor.querySelectorAll('.word');
    this.isCorrect = true;

    answers.forEach((word, i) => {
      if (Number(word.dataset.idx) !== i) {
        this.isCorrect = false;
        word.classList.add('incorrect');
      } else {
        word.classList.add('correct');
      }
    });

    this.results[this.sentenceIndex] = this.isCorrect;
    this.showResult(this.isCorrect);

    if (this.isCorrect) {
      this.correctCounter += 1;
      this.showHelpers();
      e.target.textContent = 'Продолжить';
      e.target.nextElementSibling.classList.add('disabled');
    } else {
      e.target.textContent = 'Ещё раз';
    }
    this.sentenceConstructor.classList.add('sentence-constructor_disabled');
  }

  markSentence() {
    const mark = `<span class="sentence__num ${this.isCorrect ? 'sentence__num_correct' : ''}">${this.sentenceIndex + 1}</span>`;
    this.sentenceList[this.sentenceIndex].insertAdjacentHTML('afterbegin', mark);
  }

  showResult(isCollectedCorectly) {
    if (isCollectedCorectly) {
      [...this.sentenceConstructor.children].forEach((word) => word.classList.add('word_colored'));
    }
    this.puzzleDrawer.drawSentence(this.sentenceConstructor, this.sentenceIndex);
  }

  defineNextRound() {
    const roundsAmount = [null, '45', '40', '40', '25', '25', '25'];
    const [level, round] = this.get('lastRound').split('-');

    if (round === roundsAmount[level]) {
      this.set('currentRound', 1);
      this.set('currentLevel', Number(level) + 1);
    } else {
      this.set('currentRound', Number(round) + 1);
      this.set('currentLevel', level);
    }
  }

  reportResult() {
    if (this.correctCounter === 10) {
      this.repoter.report('Поздравляем, картина Ваша! Её всегда можно найти в Вашей галерее.', true);
    } else {
      this.repoter.report(`Ваш результат ${this.correctCounter} из 10. К сожалению Вам не удалось заполучить картину.`, false);
    }
  }

  saveRound() {
    this.saveRoundResult();
    this.savePassedRound();
    this.saveGallery();
    document.dispatchEvent(new CustomEvent('userDataChange'));
  }

  saveRoundResult() {
    const roundResult = {
      date: Date.now(),
      round: `${this.get('currentLevel')}-${this.get('currentRound')}`,
      result: `${this.correctCounter} / 10`,
    };
    const statistics = this.get('statistics');

    statistics.unshift(roundResult);
    if (statistics.length > 25) {
      statistics.length = 25;
    }

    this.set('statistics', statistics);
  }

  savePassedRound() {
    const data = this.get('passedRounds');
    const roundsData = data.split('-').map((level) => level.split(''));
    roundsData[this.get('currentLevel')][this.get('currentRound')] = '1';
    const formattedData = roundsData.map((level) => level.join('')).join('-');

    this.set('passedRounds', formattedData);
    this.set('lastRound', `${this.get('currentLevel')}-${this.get('currentRound')}`);
  }

  saveGallery() {
    const allGallery = this.get('gallery');
    const currentArt = this.get('lastRound');
    const isAllGuessed = this.correctCounter === 10;
    const alreadyInGallery = allGallery.includes(currentArt);

    if (isAllGuessed && !alreadyInGallery) {
      if (allGallery !== 'empty') {
        this.set('gallery', `${allGallery};${currentArt}`);
      } else {
        this.set('gallery', `${currentArt}`);
      }
    }
  }

  closePopUp() {
    this.popUp.classList.add('hidden');
    this.resultsBlock.classList.add('hidden');
    this.statBlock.classList.add('hidden');
  }

  showRoundResults() {
    this.fillRoundResults();
    this.resultsBlock.classList.remove('hidden');
    this.popUp.classList.remove('hidden');
  }

  showStatistics() {
    this.fillStatistics();
    this.statBlock.classList.remove('hidden');
    this.popUp.classList.remove('hidden');
  }

  showGallery() {
    this.fillGallery();
    document.querySelector('div.pzl-slider').classList.remove('hidden');
    this.addCloseListener('div.pzl-slider');
  }

  addCloseListener(selector) {
    setTimeout(() => {
      this.bindedFn = this.handleOutsideClick.bind(this, selector);
      document.addEventListener('click', this.bindedFn);
    }, 0);
  }

  handleOutsideClick(selector, e) {
    if (!e.target.closest(selector)) {
      document.querySelector(selector).classList.add('hidden');
      document.removeEventListener('click', this.bindedFn);
    }
  }

  fillRoundResults() {
    const correctList = document.querySelector('ul.answers-list_correct');
    const incorrectList = document.querySelector('ul.answers-list_incorrect');
    const correctCounter = document.querySelector('span.counter_correct');
    const incorrectCounter = document.querySelector('span.counter_incorrect');
    const correctSentences = [];
    const incorrectSentences = [];
    const data = this.get('sentencesData');

    data.forEach((item, i) => {
      const sentenceItem = `
      <li class="answer-list__item">
        <button class="pzl-btn play-pzl-btn play-pzl-btn_small" data-src="${item.audio}" title="play"></button>${item.text.join(' ')}
      </li>`;

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

  fillStatistics() {
    document.querySelector('table.statistics-table').innerHTML = '';
    const rows = [tableHeader];
    const statistics = this.get('statistics');
    statistics.forEach((mark) => {
      const [level, round] = mark.round.split('-');
      const date = new Date(mark.date);
      const score = mark.result;
      const tr = `
      <tr class="tr">
        <td class="td">${level}</td>
        <td class="td">${round}</td>
        <td class="td">${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}</td>
        <td class="td">${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}</td>
        <td class="td">${score}</td>
      </tr>`;
      rows.push(tr);
    });
    document.querySelector('table.statistics-table').innerHTML = rows.join('');
  }

  fillGallery() {
    document.querySelector('div.carousel-inner').innerHTML = '';
    const slides = [defaultSlide];
    const artItems = this.get('gallery');

    if (artItems !== 'empty') {
      artItems.split(';').forEach((artLocation) => {
        const [level, round] = artLocation.split('-');
        const basicPath = 'https://raw.githubusercontent.com/torchik-slava/rslang_data_paintings/master/';
        const artInfo = paintings[level - 1][round - 1];
        const slide = `
        <div class="carousel-item">
          <figure class="gallery-item">
            <div class="frame">
              <img class="picture" src="${basicPath}${artInfo.cutSrc}" alt="picture art">
            </div>
            <figcaption class="art-name">${artInfo.name}</figcaption>
          </figure>
        </div>`;
        slides.push(slide);
      });
    }

    slides[slides.length - 1] = slides[slides.length - 1].replace('carousel-item', 'carousel-item active');

    document.querySelector('div.carousel-inner').innerHTML = slides.reverse().join('');
  }

  playByClick(e) {
    if (e.target.classList.contains('play-pzl-btn_small')) {
      this.audioHelp.onplay = () => {
        document.querySelectorAll('button.play-pzl-btn_small').forEach((btn) => {
          btn.classList.remove('play-pzl-btn_active');
        });
        e.target.classList.add('play-pzl-btn_active');
      };
      this.audioHelp.src = e.target.dataset.src;
      this.audioHelp.play();
      this.audioHelp.onended = () => e.target.classList.remove('play-pzl-btn_active');
    }
  }

  handleWindowResize() {
    const restPuzzles = [this.sentenceConstructor, this.availableWords];
    this.puzzleDrawer.resizePuzzles(this.sentenceIndex, this.currentWords, restPuzzles);
  }

  exit() {
    document.location.reload(true);
  }

  get(prop) {
    return this.storage.getProp(prop);
  }

  set(prop, value) {
    this.storage.setProp(prop, value);
  }
}
