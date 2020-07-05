/* eslint-disable no-param-reassign */
import { puzzleSizeSettings } from './variables';

export default class PuzzleDrawer {
  constructor() {
    this.containerWidth = document.querySelector('ul.sentences-list').offsetWidth;
    this.containerHeight = this.containerWidth / 1.78;
    this.sizes = puzzleSizeSettings[this.containerWidth];
    this.sentenceEls = document.querySelectorAll('li.sentence');
  }

  setData(data) {
    this.textSentences = [];
    this.img = document.querySelector('img.painting-pic');
    data.forEach((sentence) => {
      this.textSentences.push(sentence.text);
    });
    this.calculateParams();
  }

  calculateParams() {
    this.sentenceParams = [];
    this.textSentences.forEach((el, i) => {
      this.collectiveLength = 0;
      this.sentenceParams.push(this.calcSentence(el));
      el.forEach((word, j) => {
        const length = this.defineLength(word, j, i);
        this.collectiveLength += length;
      });
    });
  }

  renderCanvases() {
    this.sentenceParams.forEach((sentence, i) => {
      const canvases = [];
      sentence.lengths.forEach((length, j) => {
        const className = j + 1 === sentence.words ? 'word word_colored word_last' : 'word word_colored';
        canvases.push(`<canvas class="${className}" data-idx="${j}" width="${length}" height="${this.containerHeight / 10}"></canvas>`);
      });
      this.sentenceEls[i].innerHTML = '';
      this.sentenceEls[i].innerHTML = canvases.join('');
    });
  }

  calcSentence(sentence) {
    const words = sentence.length;
    const letters = sentence.reduce((acc, word) => acc + word.length, 0);
    const letterSize = Math.round(((this.containerWidth + this.sizes.marginShift * (words - 1))
    - ((this.sizes.minSpace + this.sizes.marginShift) * (words - 1)) - this.sizes.minSpace)
    / letters);

    return {
      words, letters, letterSize, lengths: [],
    };
  }

  defineLength(word, j, i) {
    const lastWordIndex = this.sentenceParams[i].words - 1;
    let canvasLength;

    if (j === lastWordIndex) {
      canvasLength = this.containerWidth + this.sizes.marginShift
      * (this.sentenceParams[i].words - 1) - this.collectiveLength;
    } else {
      canvasLength = word.length * this.sentenceParams[i].letterSize
      + this.sizes.minSpace + this.sizes.marginShift;
    }

    this.sentenceParams[i].lengths.push(canvasLength);
    return canvasLength;
  }

  drawPuzzles() {
    this.sentenceEls.forEach((sentence, i) => {
      this.drawSentence(sentence, i);
    });
  }

  drawSentence(sentence, i) {
    let pzls = sentence;
    if (!Array.isArray(sentence)) {
      pzls = sentence.querySelectorAll('canvas');
    }

    pzls.forEach((pzl) => {
      const idx = Number(pzl.dataset.idx);
      this.drawPiece(pzl, i, idx);
    });
  }

  drawPiece(pzl, i, j) {
    const textWord = this.textSentences[i][j];
    const lastWordIndex = this.sentenceParams[i].words - 1;

    const ctx = pzl.getContext('2d');
    this.drawShape(pzl, ctx, j, lastWordIndex);

    if (pzl.classList.contains('word_colored')) {
      this.addImg(pzl, ctx, i, j);
    } else {
      PuzzleDrawer.addBackground(pzl, ctx);
    }

    this.addText(pzl, ctx, textWord, j, lastWordIndex);
  }

  drawShape(elem, ctx, j, lastIndex) {
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, elem.width, elem.height);

    ctx.beginPath();
    ctx.lineTo(1, 1);
    if (j !== lastIndex) {
      ctx.lineTo(elem.width - this.sizes.circleShiftX1 - this.sizes.circleShiftX2, 1);
      ctx.arc(elem.width - this.sizes.circleShiftX1, elem.height / 2, this.sizes.circleRadius,
        (Math.PI / 180) * (-127), (Math.PI / 180) * 127, false);
      ctx.lineTo(elem.width - this.sizes.circleShiftX1 - this.sizes.circleShiftX2, elem.height - 1);
    } else {
      ctx.lineTo(elem.width - 1, 1);
      ctx.lineTo(elem.width - 1, elem.height - 1);
    }
    ctx.lineTo(1, elem.height - 1);
    if (j !== 0) {
      ctx.arc(this.sizes.circleShiftX2, elem.height / 2, this.sizes.circleRadius,
        (Math.PI / 180) * 127, (Math.PI / 180) * (-127), true);
    }
    ctx.lineTo(1, 0);
    ctx.stroke();
    ctx.clip();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, elem.width, elem.height);
  }

  addImg(elem, ctx, i, j) {
    const coefficient = this.img.naturalWidth / this.containerWidth;
    const picWidth = elem.width * coefficient;
    const lengths = this.sentenceParams[i].lengths.slice(0, j);
    const left = lengths.reduce((acc, length) => acc + (length - 22) * coefficient, 0);
    const picHeight = this.img.naturalHeight / 10;
    const top = i * picHeight;

    ctx.globalAlpha = 0.5;
    ctx.drawImage(this.img, left, top, picWidth, picHeight, 0, 0, elem.width, elem.height);
  }

  static addBackground(elem, ctx) {
    ctx.fillStyle = '#b7b7b7';
    ctx.fillRect(0, 0, elem.width, elem.height);
  }

  addText(elem, ctx, text, j, lastIndex) {
    let textColor = 'white';
    if (elem.classList.contains('correct')) textColor = 'lightgreen';
    if (elem.classList.contains('incorrect')) textColor = 'coral';

    let horizontalPoint = elem.width / 2;
    if (j === 0) horizontalPoint = (elem.width - this.sizes.marginShift) / 2;
    if (j === lastIndex) horizontalPoint = (elem.width + this.sizes.marginShift) / 2;

    ctx.font = `${this.sizes.fontSize}px Montserrat`;
    ctx.textAlign = 'center';
    ctx.fillStyle = textColor;
    ctx.globalAlpha = 1;

    ctx.fillText(text, horizontalPoint, this.sizes.textShiftY);
  }

  cloneCanvas(oldCanvas, width) {
    const newCanvas = document.createElement('canvas');
    newCanvas.className = oldCanvas.className;
    newCanvas.dataset.idx = oldCanvas.dataset.idx;

    newCanvas.width = width || oldCanvas.width;
    newCanvas.height = this.containerHeight / 10;

    return newCanvas;
  }

  resizePuzzles(sentenceIdx, currentWords, restContainers) {
    if (document.querySelector('ul.sentences-list').offsetWidth === this.containerWidth) return;

    this.resetParams();

    this.sentenceEls.forEach((sentence, i) => {
      sentence.querySelectorAll('canvas').forEach((canvas, j) => {
        const newCanvas = this.cloneCanvas(canvas, this.sentenceParams[i].lengths[j]);
        this.drawPiece(newCanvas, i, j);
        sentence.replaceChild(newCanvas, canvas);
      });
    });

    currentWords = currentWords.map((word) => {
      const wordIdx = Number(word.dataset.idx);
      const newWord = this.cloneCanvas(word, this.sentenceParams[sentenceIdx].lengths[wordIdx]);
      return newWord;
    });

    restContainers.forEach((container) => {
      const containerEls = [...container.children];
      containerEls.forEach((word) => {
        const wordIdx = Number(word.dataset.idx);
        const newWord = this.cloneCanvas(word, this.sentenceParams[sentenceIdx].lengths[wordIdx]);
        this.drawPiece(newWord, sentenceIdx, wordIdx);
        container.replaceChild(newWord, word);
      });
    });
  }

  resetParams() {
    this.containerWidth = document.querySelector('ul.sentences-list').offsetWidth;
    this.containerHeight = this.containerWidth / 1.78;
    this.sizes = puzzleSizeSettings[this.containerWidth];
    this.calculateParams();
  }
}
