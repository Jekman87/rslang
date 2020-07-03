export default class HelpersController {
  constructor(storage) {
    this.storage = storage;
    this.helpersBlock = document.querySelector('div.help-pzl-btn-group');
    this.helpers = [...this.helpersBlock.children];
  }

  init() {
    this.helpersBlock.addEventListener('click', this.changeHelperStatus.bind(this));
    document.addEventListener('newData', this.displayHelpersStatus.bind(this));
  }

  changeHelperStatus(e) {
    if (!e.target.classList.contains('pzl-btn')) return;

    e.target.classList.toggle('pzl-btn_off');

    if (this.get(e.target.dataset.type) === 'on') {
      this.set(`${e.target.dataset.type}`, 'off');
    } else {
      this.set(`${e.target.dataset.type}`, 'on');
    }

    document.dispatchEvent(new CustomEvent('userDataChange'));
    document.dispatchEvent(new CustomEvent('helperStatusChange', { detail: e.target.dataset.type }));
  }

  displayHelpersStatus() {
    this.helpers.forEach((el) => {
      if (this.get(el.dataset.type) === 'off') el.classList.add('pzl-btn_off');
    });
  }

  get(prop) {
    return this.storage.getProp(prop);
  }

  set(prop, value) {
    this.storage.setProp(prop, value);
  }
}
