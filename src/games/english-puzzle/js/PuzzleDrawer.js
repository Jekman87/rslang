import puzzleSizeSettings from './puzzleSizeSettings';

export default class PuzzleDrawer {
  constructor() {
    this.basicSizes = puzzleSizeSettings;
    this.sentenceEls = document.querySelectorAll('li.sentence');
  }

  setData(data) {
    this.sentenceParams = [];
    this.textSentences = [];
    this.img = document.querySelector('img.painting-pic');
    data.forEach((sentence) => {
      this.textSentences.push(sentence.text);
    });
  }

  renderCanvases() {
    const bs = this.basicSizes;
    this.sentenceEls.forEach((sentence, i) => {
      const canvases = [];
      this.collectiveLength = 0;
      this.sentenceParams.push(PuzzleDrawer.calcSentence(this.textSentences[i], bs));
      this.textSentences[i].forEach((word, j) => {
        const length = this.defineLength(word, j, i, bs);
        this.collectiveLength += length;
        canvases.push(`<canvas class="word" width="${length}" height="${bs.containerHeight / 10}"></canvas>`);
      });
      sentence.innerHTML = '';
      sentence.innerHTML = canvases.join('');
    });
  }

  static calcSentence(sentence, bs) {
    const words = sentence.length;
    const letters = sentence.reduce((acc, word) => acc + word.length, 0);
    const letterSize = Math.round(((bs.containerWidth + bs.marginShift * (words - 1))
    - ((bs.minSpace + bs.marginShift) * (words - 1)) - 20) / letters);

    return { words, letters, letterSize };
  }

  defineLength(word, j, i, bs) {
    const lastWordIndex = this.sentenceParams[i].words - 1;
    let canvasLength;

    if (j === lastWordIndex) {
      canvasLength = bs.containerWidth + bs.marginShift * (this.sentenceParams[i].words - 1)
      - this.collectiveLength;
    } else {
      canvasLength = word.length * this.sentenceParams[i].letterSize + bs.minSpace + bs.marginShift;
    }

    return canvasLength;
  }

  drawPuzzles() {
    this.sentenceEls.forEach((sentence, i) => {
      this.drawSentence(sentence, i);
    });
  }

  drawSentence(sentence, i, withPic = true, colors = null, indexes = null) {
    const pzls = sentence.querySelectorAll('canvas');
    this.currentPosition = 0;
    pzls.forEach((pzl, j) => {
      if (colors && indexes) {
        this.drawPiece(pzl, i, indexes[j], withPic, colors[j] ? 'lightgreen' : 'coral');
      } else {
        this.drawPiece(pzl, i, j, withPic);
      }
    });
  }

  drawPiece(pzl, i, j, withPic, color) {
    const textWord = this.textSentences[i][j];
    const lastWordIndex = this.sentenceParams[i].words - 1;

    const ctx = pzl.getContext('2d');
    PuzzleDrawer.drawShape(pzl, ctx, j, lastWordIndex);

    if (withPic) {
      this.addImg(pzl, ctx, i);
    } else {
      PuzzleDrawer.addBackground(pzl, ctx);
    }

    this.addText(pzl, ctx, textWord, j, lastWordIndex, color);
  }

  static drawShape(elem, ctx, j, lastIndex) {
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, elem.width, elem.height);

    ctx.beginPath();
    ctx.lineTo(1, 1);
    if (j !== lastIndex) {
      ctx.lineTo(elem.width - 21, 1);
      ctx.lineTo(elem.width - 21, 13);
      ctx.arc(elem.width - 13.5, 22.5, 12.5, (Math.PI / 180) * (-127), (Math.PI / 180) * 127, false);
      ctx.lineTo(elem.width - 21, 44);
    } else {
      ctx.lineTo(elem.width - 1, 1);
      ctx.lineTo(elem.width - 1, 44);
    }
    ctx.lineTo(1, 44);
    if (j !== 0) {
      ctx.lineTo(1, 34);
      ctx.arc(7.5, 22.5, 12.5, (Math.PI / 180) * 127, (Math.PI / 180) * (-127), true);
    }
    ctx.lineTo(1, 0);

    ctx.stroke();
    ctx.clip();
    ctx.fillRect(0, 0, elem.width, elem.height);
  }

  addImg(elem, ctx, i) {
    const coefficient = this.img.naturalWidth / this.basicSizes.containerWidth;
    const picWidth = elem.width * coefficient;
    const left = this.currentPosition;
    this.currentPosition = this.currentPosition + picWidth - (22 * coefficient);
    const picHeight = this.img.naturalHeight / 10;
    const top = i * picHeight;

    ctx.globalAlpha = 0.5;
    ctx.drawImage(this.img, left, top, picWidth, picHeight, 0, 0, elem.width, elem.height);
  }

  static addBackground(elem, ctx) {
    ctx.fillStyle = '#b7b7b7';
    ctx.fillRect(0, 0, elem.width, elem.height);
  }

  addText(elem, ctx, text, j, lastIndex, color = 'white') {
    let horizontalPoint = elem.width / 2;
    if (j === 0) horizontalPoint = (elem.width - this.basicSizes.marginShift) / 2;
    if (j === lastIndex) horizontalPoint = (elem.width + this.basicSizes.marginShift) / 2;

    ctx.font = '16px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;

    ctx.fillText(text, horizontalPoint, 29);
  }

  static clonePuzzle(oldCanvas) {
    const newCanvas = document.createElement('canvas');
    newCanvas.classList.add('word');

    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;

    const ctx = newCanvas.getContext('2d');
    ctx.drawImage(oldCanvas, 0, 0);

    return newCanvas;
  }
}
