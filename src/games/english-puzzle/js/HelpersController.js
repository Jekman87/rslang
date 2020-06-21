export default class HelpersController {
  constructor() {
    this.helpersBlock = document.querySelector('div.help-btn-group');
    this.helpers = [...this.helpersBlock.children];
    this.playBtn = document.querySelector('button.play-btn');
  }

  init() {
    this.helpersBlock.addEventListener('click', this.changeHelperStatus.bind(this));
    document.addEventListener('newData', this.showHelpersStatus.bind(this));
  }

  changeHelperStatus(e) {
    if (!e.target.classList.contains('btn')) return;

    e.target.classList.toggle('btn_off');

    if (localStorage[e.target.dataset.type] === 'on') {
      localStorage.setItem(`${e.target.dataset.type}`, 'off');
    } else {
      localStorage.setItem(`${e.target.dataset.type}`, 'on');
    }

    this.changePlayBtnStatus(e);
    document.dispatchEvent(new CustomEvent('userDataChange'));
  }

  showHelpersStatus() {
    this.displayHelpersStatus();
    this.dislayPlayBtnStatus();
  }

  displayHelpersStatus() {
    this.helpers.forEach((el) => {
      if (localStorage[el.dataset.type] === 'off') el.classList.add('btn_off');
    });
  }

  dislayPlayBtnStatus() {
    if (localStorage.pronounceHelp === 'off') {
      this.playBtn.classList.add('disabled');
    }
  }

  changePlayBtnStatus(e) {
    if (e.target.dataset.type !== 'pronounceHelp') return;
    this.playBtn.classList.toggle('disabled');
  }
}
