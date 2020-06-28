export default class Dragger {
  constructor() {
    this.sentenceConstructor = document.querySelector('div.sentence-constructor');
    this.availableWords = document.querySelector('div.available-words');
    this.currentDroppable = null;
  }

  init() {
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  handleMouseDown(e) {
    if (!e.target.classList.contains('word')) return;
    this.target = e.target;

    this.savePositionParams(e);
    // this.raiseUpTarget();
    // this.moveAt(e.pageX, e.pageY);

    const handleMouseMoveBinded = this.handleMouseMove.bind(this);
    document.addEventListener('mousemove', handleMouseMoveBinded);
    this.target.onmouseup = this.handleMouseUp.bind(this, handleMouseMoveBinded,
      e.clientX, e.clientY);
  }

  handleMouseMove(e) {
    this.raiseUpTarget();
    this.moveAt(e.pageX, e.pageY);

    const elemBelow = this.detectBelowEl(e);
    if (elemBelow) {
      this.detectDroppable(elemBelow);
    }
  }

  handleMouseUp(bindedMouseMoveHandler, mouseDownX, mouseDownY, e) {
    const elemBelow = this.detectBelowEl(e);

    this.pullDownTarget();

    if (this.currentDroppable) {
      this.dropTarget(elemBelow);
      this.removeHighligthDroppable();
    } else {
      this.returnTarget();
      this.handleClick(mouseDownX, mouseDownY, e);
    }

    this.currentDroppable = null;
    document.removeEventListener('mousemove', bindedMouseMoveHandler);
    this.target.onmouseup = null;
  }

  savePositionParams(e) {
    this.prevEl = e.target.previousElementSibling;
    this.parentEl = e.target.parentElement;

    this.shiftX = e.clientX - this.target.getBoundingClientRect().left - 22;
    this.shiftY = e.clientY - this.target.getBoundingClientRect().top;
  }

  raiseUpTarget() {
    this.target.classList.add('word_transported');
    this.target.style.position = 'absolute';
    this.target.style.zIndex = 1000;
    document.body.append(this.target);
  }

  pullDownTarget() {
    this.target.classList.remove('word_transported');
    this.target.style.position = '';
    this.target.style.zIndex = '';
  }

  moveAt(pageX, pageY) {
    this.target.style.left = `${pageX - this.shiftX}px`;
    this.target.style.top = `${pageY - this.shiftY}px`;
  }

  detectBelowEl(e) {
    this.target.hidden = true;
    const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    this.target.hidden = false;

    return elemBelow;
  }

  detectDroppable(elemBelow) {
    const droppableBelow = elemBelow.closest('div.sentence-constructor');

    if (this.currentDroppable !== droppableBelow) {
      if (this.currentDroppable) {
        this.removeHighligthDroppable();
      }
      this.currentDroppable = droppableBelow;
      if (this.currentDroppable) {
        this.addHighligthDroppable();
      }
    }
  }

  addHighligthDroppable() {
    this.currentDroppable.style.boxShadow = '0px 0px 15px 5px green';
  }

  removeHighligthDroppable() {
    this.currentDroppable.style.boxShadow = '';
  }

  dropTarget(elemBelow) {
    if (elemBelow.classList.contains('word')) {
      const centers = this.calcCenters(elemBelow);
      if (centers.target < centers.elemBelow) {
        elemBelow.before(this.target);
      } else {
        elemBelow.after(this.target);
      }
    } else {
      this.currentDroppable.append(this.target);
    }
  }

  returnTarget() {
    if (this.prevEl) {
      this.prevEl.after(this.target);
    } else {
      this.parentEl.prepend(this.target);
    }
  }

  handleClick(mouseDownX, mouseDownY, e) {
    if (e.clientX === mouseDownX && e.clientY === mouseDownY) {
      if (this.parentEl === this.availableWords) {
        this.sentenceConstructor.append(this.target);
      } else {
        this.availableWords.append(this.target);
      }
    }
  }

  calcCenters(elemBelow) {
    const targetLeftCorner = +this.target.style.left.replace('px', '');
    const elemBelowLeftCorner = elemBelow.getBoundingClientRect().left;

    const targetCenter = targetLeftCorner + this.target.offsetWidth / 2;
    const elemBelowCenter = elemBelowLeftCorner + elemBelow.offsetWidth / 2;

    return { target: targetCenter, elemBelow: elemBelowCenter };
  }
}
