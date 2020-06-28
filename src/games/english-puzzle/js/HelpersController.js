export default class HelpersController {
  constructor(storage) {
    this.storage = storage;
    this.helpersBlock = document.querySelector('div.help-pzl-btn-group');
    this.helpers = [...this.helpersBlock.children];
    this.playBtn = document.querySelector('button.play-pzl-btn');
  }

  init() {
    this.helpersBlock.addEventListener('click', this.changeHelperStatus.bind(this));
    document.addEventListener('newData', this.showHelpersStatus.bind(this));
  }

  changeHelperStatus(e) {
    if (!e.target.classList.contains('pzl-btn')) return;

    e.target.classList.toggle('pzl-btn_off');

    if (this.get(e.target.dataset.type) === 'on') {
      this.set(`${e.target.dataset.type}`, 'off');
    } else {
      this.set(`${e.target.dataset.type}`, 'on');
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
      if (this.get(el.dataset.type) === 'off') el.classList.add('pzl-btn_off');
    });
  }

  dislayPlayBtnStatus() {
    if (this.get('pronounceHelp') === 'off') {
      this.playBtn.classList.add('disabled');
    }
  }

  changePlayBtnStatus(e) {
    if (e.target.dataset.type !== 'pronounceHelp') return;
    this.playBtn.classList.toggle('disabled');
  }

  get(prop) {
    return this.storage.getProp(prop);
  }

  set(prop, value) {
    this.storage.setProp(prop, value);
  }
}
