/* eslint-disable no-param-reassign */
import PuzzleDrawer from './PuzzleDrawer';
import monthNames from './calendarMap';
import paintings from './paintingsInfo';

export default class GameController {
  constructor(storage) {
    this.storage = storage;
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
    this.playBtn.addEventListener('click', this.playAudio.bind(this));
    this.resultsBlock.addEventListener('click', this.playByClick.bind(this));

    this.audioHelp.addEventListener('ended', this.removePlayEffect.bind(this));
    // this.audioHelp.addEventListener('abort', this.removePlayEffect.bind(this));
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
    console.log('state', this.storage);
    this.switchElementsVisibility(false);
    this.cleanConstructionArea();
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

    if (isEndOfRound) {
      this.playBtn.classList.add('invisible');
      this.painting.classList.remove('hidden');
      this.sentenceConstructor.classList.add('hidden');
      this.availableWords.classList.add('hidden');
      document.querySelector('div.answer-pzl-btn-group').classList.add('hidden');
      document.querySelector('div.next-round-block').classList.remove('hidden');
      document.querySelector('div.sentences-list-wrapper').classList.add('sentences-list-wrapper_cut');
    } else {
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

  removeLoadingEffect() {
    this.startBtn.classList.remove('visible');
    this.spinner.classList.remove('visible');
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

    if (this.get('pronounceHelp') === 'off') {
      this.playBtn.classList.add('disabled');
    }

    this.audioHelp.src = data[this.sentenceIndex].audio;
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
    if (e.detail === 'pronounceHelp') {
      this.playBtn.classList.toggle('disabled');
    }
    if (e.detail === 'visualHelp') {
      this.currentWords.forEach((word) => word.classList.toggle('word_colored'));
      [...this.sentenceConstructor.children].forEach((word) => word.classList.toggle('word_colored'));
      [...this.availableWords.children].forEach((word) => word.classList.toggle('word_colored'));
    }
  }

  playAudio() {
    this.playBtn.classList.add('play-pzl-btn_active');
    this.audioHelp.play();
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

    GameController.shuffle(newWords);

    newWords.forEach((word) => {
      this.availableWords.append(word);
    });
  }

  setPaintingInfo() {
    const data = this.get('paintingData');
    const info = `${data.author} - ${data.name} (${data.year})`;
    document.querySelectorAll('figcaption:not(.art-name)').forEach((el) => {
      el.textContent = info;
    });
    document.querySelector('img.painting-pic_small').src = data.link;
  }

  static shuffle(arr) {
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
    this.showCorrect();
    this.isCorrect = false;
    if (this.get('autoplayHelp') === 'off') {
      this.playAudio();
    }
    this.translateHelp.classList.add('visible');
    e.target.previousElementSibling.textContent = 'Продолжить';
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
      this.saveRound();
      this.switchElementsVisibility(true);
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
  }

  showCorrect() {
    this.cleanConstructionArea();

    this.currentWords.forEach((word) => {
      this.sentenceConstructor.append(this.puzzleDrawer.cloneCanvas(word));
    });

    this.puzzleDrawer.drawSentence(this.sentenceConstructor, this.sentenceIndex);
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
        word.classList.add('incorrect');
      } else {
        word.classList.add('correct');
      }
    });

    this.showResult();
    this.results.push(this.isCorrect);

    if (this.isCorrect) {
      this.correctCounter += 1;
      if (this.get('autoplayHelp') === 'off') {
        this.playAudio();
      }
      this.translateHelp.classList.add('visible');
      e.target.textContent = 'Продолжить';
      e.target.nextElementSibling.classList.add('disabled');
    } else {
      e.target.textContent = 'Ещё раз';
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

  saveRound() {
    this.saveRoundResult();
    this.savePassedRound();
    this.saveGallery();
    document.dispatchEvent(new CustomEvent('userDataChange'));
  }

  saveRoundResult() {
    const roundResult = `${this.get('currentLevel')}-${this.get('currentRound')},${Date.now()},${this.correctCounter}`;
    const oldStat = this.get('statistics');
    if (oldStat !== 'empty') {
      this.set('statistics', `${roundResult};${oldStat}`);
    } else {
      this.set('statistics', `${roundResult}`);
    }
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
    const isAllGuessed = this.results.filter((result) => result === true).length === 10;
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
      const sentenceItem = `<li class="answer-list__item"><button class="pzl-btn play-pzl-btn play-pzl-btn_small" data-src="${item.audio}" title="play"></button>${item.text.join(' ')}</li>`;
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
    const rows = ['<caption class="table-caption">Ваши ранее сыгранные игры:</caption><tr class="tr"><th class="th">Уровень</th><th class="th">Раунд</th><th class="th">Дата</th><th class="th">Время</th><th class="th">Счет</th></tr>'];
    let statistics = this.get('statistics');
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
        <td class="td">${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}</td>
        <td class="td">${score} / 10</td>
      </tr>`;
      rows.push(tr);
      if (rows.length > 26) rows.length = 26;
    });
    document.querySelector('table.statistics-table').innerHTML = rows.join('');
  }

  fillGallery() {
    document.querySelector('div.carousel-inner').innerHTML = '';
    const slides = ['<div class="carousel-item"><figure class="gallery-item"><div class="frame"><p class="empty-pic-message">Еще есть свободное место! Собирай паззлы на 10 из 10 и пополняй свою личную галерею!</p></div><figcaption class="art-name"></figcaption></figure></div>'];
    const artItems = this.get('gallery');

    if (artItems !== 'empty') {
      artItems.split(';').forEach((artLocation) => {
        const [level, round] = artLocation.split('-');
        const basicPath = 'https://raw.githubusercontent.com/torchik-slava/rslang_data_paintings/master/';
        const artInfo = paintings[level - 1][round - 1];
        slides.push(`<div class="carousel-item"><figure class="gallery-item"><div class="frame">
        <img class="picture" src="${basicPath}${artInfo.cutSrc}" alt="picture art"></div>
        <figcaption class="art-name">${artInfo.name}</figcaption></figure></div>`);
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

  get(prop) {
    return this.storage.getProp(prop);
  }

  set(prop, value) {
    this.storage.setProp(prop, value);
  }
}
