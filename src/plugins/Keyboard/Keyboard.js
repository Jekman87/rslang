import Button from './Button';
import buttonConfig from './buttonConfig';
import { caseConfig, specialBtn } from './constants';

export default class MyKeyboard {
  constructor(root, input, submitButton) {
    this.root = document.querySelector(root);
    this.textarea = document.querySelector(input);
    this.submitButton = document.querySelector(submitButton);
    console.log(this.submitButton);
    this.keyboard = null;
    this.container = null;
    this.lang = localStorage.getItem('lang') || 'En';
    this.case = caseConfig.lower;

    this.keydownHandler = this.keydownHandler.bind(this);
    this.keyupHandler = this.keyupHandler.bind(this);
    this.mousedownHandler = this.mousedownHandler.bind(this);
    this.mouseupHandler = this.mouseupHandler.bind(this);

    this.wordBackground = document.querySelector('#word-background');
  }

  renderKeyboard() {
    this.container = document.createElement('div');
    this.container.id = 'container';
    this.container.classList.add(this.lang);

    this.keyboard = document.createElement('div');
    this.keyboard.id = 'keyboard';
    this.keyboard.classList.add(this.case);

    this.addButtonsToKeyboard();

    this.container.append(this.keyboard);

    this.root.append(this.container);
  }

  addButtonsToKeyboard() {
    for (let buttonRow = 0; buttonRow < buttonConfig.lowerEn.length; buttonRow += 1) {
      const row = document.createElement('div');
      row.classList.add('row');

      for (let buttonCol = 0; buttonCol < buttonConfig.lowerEn[buttonRow].length; buttonCol += 1) {
        const button = new Button(buttonRow, buttonCol);

        row.append(button.createButton());
      }

      this.keyboard.append(row);
    }
  }

  addListeners() {
    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('keyup', this.keyupHandler);

    this.keyboard.addEventListener('mousedown', this.mousedownHandler);
    this.keyboard.addEventListener('mouseup', this.mouseupHandler);

    this.textarea.addEventListener('blur', this.textarea.focus);
    this.textarea.focus();
  }

  removeListeners() {
    document.removeEventListener('keydown', this.keydownHandler);
    document.removeEventListener('keyup', this.keyupHandler);

    this.keyboard.removeEventListener('mousedown', this.mousedownHandler);
    this.keyboard.removeEventListener('mouseup', this.mouseupHandler);

    this.textarea.removeEventListener('blur', this.textarea.focus);
  }

  keydownHandler(event) {
    event.preventDefault();

    const buttonCode = event.code;
    this.addAnimateToButton(buttonCode);
    this.handleClickedButton(buttonCode);
  }

  keyupHandler(event) {
    const buttonCode = event.code;

    this.removeAnimateFromButton(buttonCode);
  }

  mousedownHandler(event) {
    const button = event.target.closest('.button');

    if (button) {
      const buttonCode = button.classList[1];
      this.addAnimateToButton(buttonCode);

      button.addEventListener('mouseleave', this.mouseleaveHandler.bind(this), { once: true });

      this.handleClickedButton(buttonCode);
    }
  }

  mouseleaveHandler(event) {
    const buttonCode = event.target.classList[1];
    this.removeAnimateFromButton(buttonCode);
  }

  mouseupHandler(event) {
    const button = event.target.closest('.button');

    if (button) {
      const buttonCode = button.classList[1];
      this.removeAnimateFromButton(buttonCode);
    }
  }

  addAnimateToButton(code) {
    const button = this.keyboard.querySelector(`.${code}`);

    if (button) {
      button.classList.add('animated');
    }
  }

  removeAnimateFromButton(code) {
    if (this.case === caseConfig.caps || this.case === caseConfig.capsShift) {
      if (code === specialBtn.capsLock) {
        return;
      }
    }

    if (this.case === caseConfig.shift || this.case === caseConfig.capsShift) {
      if (code === specialBtn.shiftLeft || code === specialBtn.shiftRight) {
        return;
      }
    }

    const button = this.keyboard.querySelector(`.${code}`);

    if (button) {
      button.classList.remove('animated');
    }
  }

  handleClickedButton(buttonCode) {
    // для приложения
    this.wordBackground.classList.add('hidden');
    this.wordBackground.classList.remove('opacity');

    const buttonText = this.findButtonText(buttonCode);

    if (buttonText === null) {
      return;
    }

    switch (buttonText) {
      case specialBtn.tab:
        this.handleTab();

        break;

      case specialBtn.capsLock:
        this.handleCapsLock();

        break;

      case specialBtn.shift:
        this.handleShift();

        break;

      case specialBtn.ctrl:

        break;

      case specialBtn.winRu:
        this.handleWin();

        break;

      case specialBtn.winEn:
      this.handleWin();

        break;

      case specialBtn.alt:

        break;

      case specialBtn.backspace:
        this.handleBackspace();

        break;
      case specialBtn.del:
        this.handleDel();

        break;
      case specialBtn.enter:
        this.handleEnter();

        break;
      case specialBtn.arrowLeft:
        this.handleArrowLeft();

        break;
      case specialBtn.arrowDown:
        this.handleArrowDown();

        break;
      case specialBtn.arrowRight:
        this.handleArrowRight();

        break;
      case specialBtn.arrowUp:
        this.handleArrowUp();

        break;

      default:
        this.handleText(buttonText);

        break;
    }
  }

  findButtonText(buttonCode) {
    for (let row = 0; row < buttonConfig.code.length; row += 1) {
      const col = buttonConfig.code[row].indexOf(buttonCode);

      if (col !== -1) {
        const propOfConfig = `${this.case}${this.lang}`;

        return buttonConfig[propOfConfig][row][col];
      }
    }

    return null;
  }

  handleTab() {
    const { selectionStart, selectionEnd, value } = this.textarea;

    if (selectionStart === selectionEnd) {
      this.textarea.value = `${value.slice(0, selectionStart)}\t${value.slice(selectionStart)}`;
    } else {
      this.textarea.value = `${value.slice(0, selectionStart)}\t${value.slice(selectionEnd)}`;
    }

    this.changeCursorPosition(selectionStart + 1);
  }

  handleCapsLock() {
    if (this.case === caseConfig.lower) {
      this.case = caseConfig.caps;
      this.keyboard.className = caseConfig.caps;
    } else if (this.case === caseConfig.shift) {
      this.case = caseConfig.capsShift;
      this.keyboard.className = caseConfig.capsShift;
    } else if (this.case === caseConfig.capsShift) {
      this.case = caseConfig.shift;
      this.keyboard.className = caseConfig.shift;
    } else {
      this.case = caseConfig.lower;
      this.keyboard.className = caseConfig.lower;
    }
  }

  handleShift() {
    if (this.case === caseConfig.lower) {
      this.case = caseConfig.shift;
      this.keyboard.className = caseConfig.shift;
    } else if (this.case === caseConfig.caps) {
      this.case = caseConfig.capsShift;
      this.keyboard.className = caseConfig.capsShift;
    } else if (this.case === caseConfig.capsShift) {
      this.case = caseConfig.caps;
      this.keyboard.className = caseConfig.caps;
    } else {
      this.case = caseConfig.lower;
      this.keyboard.className = caseConfig.lower;
    }
  }

  changeLanguage() {
    if (this.lang === 'En') {
      this.lang = 'Ru';
      localStorage.setItem('lang', this.lang);
      this.container.className = this.lang;
    } else {
      this.lang = 'En';
      localStorage.setItem('lang', this.lang);
      this.container.className = this.lang;
    }
  }

  handleBackspace() {
    const { selectionStart, selectionEnd, value } = this.textarea;

    if (selectionStart === selectionEnd) {
      this.textarea.value = value.slice(0, selectionStart - 1) + value.slice(selectionStart);
      this.changeCursorPosition(selectionStart - 1);
    } else {
      this.textarea.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
      this.changeCursorPosition(selectionStart);
    }
  }

  handleDel() {
    const { selectionStart, selectionEnd, value } = this.textarea;

    if (selectionStart === selectionEnd) {
      this.textarea.value = value.slice(0, selectionStart) + value.slice(selectionStart + 1);
    } else {
      this.textarea.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
    }

    this.changeCursorPosition(selectionStart);
  }

  handleEnter() {
    this.submitButton.click();
  }

  handleArrowLeft() {
    this.changeCursorPosition(this.textarea.selectionStart - 1);
  }

  handleArrowDown() {
    this.changeCursorPosition(this.textarea.textLength);
  }

  handleArrowRight() {
    this.changeCursorPosition(this.textarea.selectionStart + 1);
  }

  handleArrowUp() {
    this.changeCursorPosition(0);
  }

  changeCursorPosition(position) {
    this.textarea.selectionStart = position;
    this.textarea.selectionEnd = position;
  }

  handleText(text) {
    const { selectionStart, selectionEnd, value } = this.textarea;

    if (selectionStart === selectionEnd) {
      this.textarea.value = value.slice(0, selectionStart) + text + value.slice(selectionStart);
    } else {
      this.textarea.value = value.slice(0, selectionStart) + text + value.slice(selectionEnd);
    }

    this.changeCursorPosition(selectionStart + 1);
  }

  handleWin() {
    window.addEventListener('blur', () => this.removeAnimateFromButton(specialBtn.metaLeft), { once: true });
    this.changeLanguage();
  }
}
