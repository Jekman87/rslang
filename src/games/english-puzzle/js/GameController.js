import PuzzleDrawer from './PuzzleDrawer';
import { monthNames } from './variables';
import paintings from './paintingsInfo';
import { defaultSlide, tableHeader } from './templates';

export default class GameController {
  constructor(storage, reporter, observer) {
    this.storage = storage;
    this.repoter = reporter;
    this.puzzleDrawer = new PuzzleDrawer();
    this.audioHelp = new Audio();
    this.externalObserver = observer;
  }

  init() {
    this.defineElems();
    this.bindMethods();
    this.addListeners();
  }

  defineElems() {
    this.elems = {
      sentenceList: document.querySelectorAll('li.sentence'),
      sentenceConstructor: document.querySelector('div.sentence-constructor'),
      availableWords: document.querySelector('div.available-words'),
      translateHelp: document.querySelector('p.sentence-translate'),
      imgHelp: document.querySelector('img.painting-pic'),
      painting: document.querySelector('figure.painting-block'),
      playBtn: document.querySelector('button.play-pzl-btn'),
      startBtn: document.querySelector('button.start-button'),
      exitBtn: document.querySelector('button.exit-pzl-btn'),
      popUp: document.querySelector('div.pop-up'),
      resultsBlock: document.querySelector('div.results-block'),
      statBlock: document.querySelector('div.statistics-block'),
      positiveBtn: document.querySelector('button.check-pzl-btn'),
      negativeBtn: document.querySelector('button.give-up-pzl-btn'),
      resultsBtn: document.querySelector('button.results-pzl-btn'),
      statisticsBtn: document.querySelector('button.statistics-pzl-btn'),
      galleryBtn: document.querySelector('button.gallery-pzl-btn'),
      closeBtn: document.querySelector('button.close-pzl-btn'),
      answerBlock: document.querySelector('div.answer-pzl-btn-group'),
      nextRoundBlock: document.querySelector('div.next-round-block'),
      sentenceListWrapper: document.querySelector('div.sentences-list-wrapper'),
      startPage: document.querySelector('div.start-page'),
      mainPage: document.querySelector('main.main'),
      statTable: document.querySelector('table.statistics-table'),
      slidesContainer: document.querySelector('div.carousel-inner'),
    };
  }

  bindMethods() {
    this.bindedMethods = {
      handleWindowResize: this.handleWindowResize.bind(this),
      handleNewData: this.handleNewData.bind(this),
      handleHelperStatusChange: this.handleHelperStatusChange.bind(this),
      handleAnswer: this.handleAnswer.bind(this),
      handleUserAction: this.handleUserAction.bind(this),
      closePopUp: this.closePopUp.bind(this),
      handleStartBtnClick: this.handleStartBtnClick.bind(this),
      exit: this.exit.bind(this),
      playAudio: this.playAudio.bind(this),
      playByClick: this.playByClick.bind(this),
      removePlayEffect: this.removePlayEffect.bind(this),
    };
  }

  addListeners() {
    window.addEventListener('resize', this.bindedMethods.handleWindowResize);
    document.addEventListener('newData', this.bindedMethods.handleNewData);
    document.addEventListener('helperStatusChange', this.bindedMethods.handleHelperStatusChange);

    this.elems.answerBlock.addEventListener('click', this.bindedMethods.handleAnswer);
    this.elems.nextRoundBlock.addEventListener('click', this.bindedMethods.handleUserAction);

    this.elems.closeBtn.addEventListener('click', this.bindedMethods.closePopUp);

    this.elems.startBtn.addEventListener('click', this.bindedMethods.handleStartBtnClick);
    this.elems.exitBtn.addEventListener('click', this.bindedMethods.exit);

    this.elems.playBtn.addEventListener('click', this.bindedMethods.playAudio);
    this.elems.resultsBlock.addEventListener('click', this.bindedMethods.playByClick);
    this.audioHelp.addEventListener('ended', this.bindedMethods.removePlayEffect);
    this.audioHelp.addEventListener('abort', this.bindedMethods.removePlayEffect);
  }

  destroy() {
    window.removeEventListener('resize', this.bindedMethods.handleWindowResize);
    document.removeEventListener('newData', this.bindedMethods.handleNewData);
    document.removeEventListener('helperStatusChange', this.bindedMethods.handleHelperStatusChange);
    this.elems.answerBlock.removeEventListener('click', this.bindedMethods.handleAnswer);
    this.elems.nextRoundBlock.removeEventListener('click', this.bindedMethods.handleUserAction);
    this.elems.closeBtn.removeEventListener('click', this.bindedMethods.closePopUp);
    this.elems.startBtn.removeEventListener('click', this.bindedMethods.startGame);
    this.elems.exitBtn.removeEventListener('click', this.bindedMethods.exit);
    this.elems.playBtn.removeEventListener('click', this.bindedMethods.playAudio);
    this.elems.resultsBlock.removeEventListener('click', this.bindedMethods.playByClick);
    this.audioHelp.removeEventListener('ended', this.bindedMethods.removePlayEffect);
    this.audioHelp.removeEventListener('abort', this.bindedMethods.removePlayEffect);

    this.elems.imgHelp.onload = '';
    this.audioHelp.pause();
    this.audioHelp.onplay = '';
    this.audioHelp.onended = '';
    document.removeEventListener('click', this.bindedFn);
  }

  handleStartBtnClick(e) {
    if (e.target.textContent === 'Старт') {
      this.startGame();
    } else {
      this.exit();
    }
  }

  startGame() {
    this.defineNextRound();
    document.dispatchEvent(new CustomEvent('dataRequired'));
  }

  handleNewData(e) {
    if (e.detail === 'success') {
      this.runRound();
    } else {
      this.suggestExit();
    }
  }

  async runRound() {
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

  suggestExit() {
    this.externalObserver.emit('mainAppSpinner', false);
    this.elems.startBtn.textContent = 'Вернуться';
  }

  switchElementsVisibility(isEndOfRound) {
    this.elems.translateHelp.classList.remove('visible');

    if (isEndOfRound) {
      if (this.correctCounter === 10) {
        this.elems.painting.classList.remove('hidden');
        this.elems.sentenceListWrapper.classList.add('sentences-list-wrapper_cut');
      }
      this.elems.playBtn.classList.add('invisible');
      this.elems.sentenceConstructor.classList.add('hidden');
      this.elems.availableWords.classList.add('hidden');
      this.elems.answerBlock.classList.add('hidden');
      this.elems.nextRoundBlock.classList.remove('hidden');
    } else {
      this.elems.sentenceList.forEach((sentence) => sentence.classList.remove('sentence_guessed'));
      this.closePopUp();
      this.elems.playBtn.classList.remove('invisible');
      this.elems.painting.classList.add('hidden');
      this.elems.sentenceConstructor.classList.remove('hidden');
      this.elems.availableWords.classList.remove('hidden');
      this.elems.answerBlock.classList.remove('hidden');
      this.elems.nextRoundBlock.classList.add('hidden');
      this.elems.positiveBtn.textContent = 'Проверить';
      this.elems.negativeBtn.classList.remove('disabled');
      this.elems.sentenceListWrapper.classList.remove('sentences-list-wrapper_cut');
    }
  }

  switchPage() {
    this.externalObserver.emit('mainAppSpinner', false);
    this.elems.startPage.classList.add('hidden');
    this.elems.mainPage.classList.add('visible');
  }

  async createPuzzles() {
    this.elems.imgHelp.src = this.get('paintingData').link;
    await new Promise((resolve) => {
      this.elems.imgHelp.onload = () => {
        this.puzzleDrawer.setData(this.get('sentencesData'));
        this.puzzleDrawer.renderCanvases();
        this.puzzleDrawer.drawPuzzles();
        resolve();
      };
    });
  }

  fillHelpers() {
    const data = this.get('sentencesData');

    this.elems.translateHelp.textContent = data[this.sentenceIndex].translate;
    if (this.get('translateHelp') === 'on') {
      this.elems.translateHelp.classList.add('visible');
    } else {
      this.elems.translateHelp.classList.remove('visible');
    }

    this.audioHelp.src = data[this.sentenceIndex].audio;
    if (this.get('pronounceHelp') === 'off') {
      this.elems.playBtn.classList.add('disabled');
    }
    if (this.get('autoplayHelp') === 'on') {
      this.playAudio();
    }

    const words = [...this.elems.sentenceList[this.sentenceIndex].children];
    const isColored = this.get('visualHelp') === 'on';
    this.currentWords = words.map((word) => {
      const newWord = this.puzzleDrawer.cloneCanvas(word);
      if (!isColored) newWord.classList.remove('word_colored');
      return newWord;
    });
  }

  handleHelperStatusChange(e) {
    const isCollectedSentence = this.elems.positiveBtn.textContent === 'Продолжить';
    if (isCollectedSentence) return;

    if (e.detail === 'pronounceHelp') {
      this.elems.playBtn.classList.toggle('disabled');
    }

    if (e.detail === 'translateHelp') {
      this.elems.translateHelp.classList.toggle('visible');
    }

    if (e.detail === 'visualHelp') {
      this.currentWords.forEach((word) => word.classList.toggle('word_colored'));
      [...this.elems.sentenceConstructor.children].forEach((word) => word.classList.toggle('word_colored'));
      [...this.elems.availableWords.children].forEach((word) => word.classList.toggle('word_colored'));

      this.puzzleDrawer.drawSentence(this.elems.sentenceConstructor, this.sentenceIndex);
      this.puzzleDrawer.drawSentence(this.elems.availableWords, this.sentenceIndex);
    }
  }

  showHelpers() {
    if (this.get('autoplayHelp') === 'off') {
      this.playAudio();
    }

    this.elems.translateHelp.classList.add('visible');
    this.elems.playBtn.classList.remove('disabled');
  }

  playAudio() {
    this.audioHelp.play();
    setTimeout(() => this.elems.playBtn.classList.add('play-pzl-btn_active'), 0);
  }

  removePlayEffect() {
    this.elems.playBtn.classList.remove('play-pzl-btn_active');
  }

  cleanConstructionArea() {
    this.elems.sentenceConstructor.innerHTML = '';
    this.elems.availableWords.innerHTML = '';
  }

  getAvailableWords() {
    const newWords = this.currentWords.map((word) => this.puzzleDrawer.cloneCanvas(word));

    this.puzzleDrawer.drawSentence(newWords, this.sentenceIndex);
    this.shuffle(newWords);
    newWords.forEach((word) => this.elems.availableWords.append(word));
  }

  setPaintingInfo() {
    const data = this.get('paintingData');
    const info = `${data.author} - ${data.name} (${data.year})`;

    document.querySelector('img.painting-pic_small').src = data.link;
    document.querySelectorAll('figcaption:not(.art-name)').forEach((el) => {
      const caption = el;
      caption.textContent = info;
    });
  }

  shuffle(array) {
    const arr = array;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  handleAnswer(e) {
    if (!e.target.classList.contains('answer-pzl-btn')) return;

    if (e.target === this.elems.positiveBtn) {
      this.handlePositiveAnswer(e);
    } else {
      this.handleNegativeAnswer(e);
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

    this.elems.sentenceConstructor.classList.add('sentence-constructor_disabled');
    e.target.previousElementSibling.textContent = 'Продолжить';
    e.target.classList.add('disabled');
  }

  check(e) {
    const unusedWords = this.elems.availableWords.querySelectorAll('.word');

    if (unusedWords.length) {
      this.toggleHighLigth(unusedWords);
      setTimeout(() => this.toggleHighLigth(unusedWords), 2000);
    } else {
      this.compare(e);
    }
  }

  goNext(e) {
    this.markSentence();
    this.elems.sentenceList[this.sentenceIndex].classList.add('sentence_guessed');
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
    this.elems.sentenceConstructor.classList.remove('sentence-constructor_disabled');
  }

  showCorrect() {
    this.cleanConstructionArea();

    this.currentWords.forEach((word) => {
      word.classList.add('word_colored');
      this.elems.sentenceConstructor.append(this.puzzleDrawer.cloneCanvas(word));
    });

    this.puzzleDrawer.drawSentence(this.elems.sentenceConstructor, this.sentenceIndex);
  }

  toggleHighLigth(list) {
    list.forEach((item) => item.classList.toggle('word_still-available'));
  }

  compare(e) {
    const correctAnswers = this.get('sentencesData')[this.sentenceIndex].text;
    const answers = this.elems.sentenceConstructor.querySelectorAll('.word');
    this.isCorrect = true;

    answers.forEach((answer, i) => {
      const word = answer;
      if (word.dataset.content !== correctAnswers[i]) {
        this.isCorrect = false;
        word.classList.add('incorrect');
      } else {
        word.classList.add('correct');
        if (Number(word.dataset.idx) !== i) {
          word.dataset.idx = i;
        }
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
    this.elems.sentenceConstructor.classList.add('sentence-constructor_disabled');
  }

  markSentence() {
    const mark = `<span class="sentence__num ${this.isCorrect ? 'sentence__num_correct' : ''}">${this.sentenceIndex + 1}</span>`;
    this.elems.sentenceList[this.sentenceIndex].insertAdjacentHTML('afterbegin', mark);
  }

  showResult(isCollectedCorectly) {
    if (isCollectedCorectly) {
      [...this.elems.sentenceConstructor.children].forEach((word) => word.classList.add('word_colored'));
    }
    this.puzzleDrawer.drawSentence(this.elems.sentenceConstructor, this.sentenceIndex);
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
    this.saveCommonProgress();
    document.dispatchEvent(new CustomEvent('userDataChange', { detail: 'statistics' }));
  }

  saveRoundResult() {
    const roundResult = {
      date: Date.now(),
      round: `${this.get('currentLevel')}-${this.get('currentRound')}`,
      result: `${this.correctCounter}-${10 - this.correctCounter}`,
    };
    const statistics = this.get('statistics');

    if (statistics.length === 20) statistics.shift();
    statistics.push(roundResult);

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

  saveCommonProgress() {
    const value = this.correctCounter;
    this.externalObserver.emit('saveCommonProgress', value);
  }

  closePopUp() {
    this.elems.popUp.classList.add('hidden');
    this.elems.resultsBlock.classList.add('hidden');
    this.elems.statBlock.classList.add('hidden');
  }

  handleUserAction(e) {
    switch (e.target) {
      case this.elems.resultsBtn:
        this.showRoundResults();
        break;
      case this.elems.statisticsBtn:
        this.showStatistics();
        break;
      case this.elems.galleryBtn:
        this.showGallery();
        break;
      default:
    }
  }

  showRoundResults() {
    this.fillRoundResults();
    this.elems.resultsBlock.classList.remove('hidden');
    this.elems.popUp.classList.remove('hidden');
  }

  showStatistics() {
    this.fillStatistics();
    this.elems.statBlock.classList.remove('hidden');
    this.elems.popUp.classList.remove('hidden');
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
    this.elems.statTable.innerHTML = '';
    const rows = [];
    const statistics = this.get('statistics');

    statistics.forEach((mark) => {
      const [level, round] = mark.round.split('-');
      const date = new Date(mark.date);
      const [score] = mark.result.split('-');
      const tr = `
      <tr class="tr">
        <td class="td">${level}</td>
        <td class="td">${round}</td>
        <td class="td">${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}</td>
        <td class="td">${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}</td>
        <td class="td">${score} из 10</td>
      </tr>`;
      rows.push(tr);
    });

    rows.push(tableHeader);
    rows.reverse();
    this.elems.statTable.innerHTML = rows.join('');
  }

  fillGallery() {
    this.elems.slidesContainer.innerHTML = '';
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

    this.elems.slidesContainer.innerHTML = slides.reverse().join('');
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
    const restPuzzles = [this.elems.sentenceConstructor, this.elems.availableWords];
    this.puzzleDrawer.resizePuzzles(this.sentenceIndex, this.currentWords, restPuzzles);
  }

  exit() {
    this.externalObserver.emit('selectPage', 'MainPage');
  }

  get(prop) {
    return this.storage.getProp(prop);
  }

  set(prop, value) {
    this.storage.setProp(prop, value);
  }
}
