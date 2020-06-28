export default class LevelsController {
  constructor(storage) {
    this.storage = storage;
    this.levels = document.querySelector('ul.levels');
    this.rounds = document.querySelector('ul.rounds');
    this.availableWords = document.querySelector('div.available-words');
    this.roundsNumber = [null, 45, 40, 40, 25, 25, 25];
  }

  init() {
    document.addEventListener('newData', this.renderNavigation.bind(this));

    document.querySelector('span.round-select').addEventListener('click', this.toggleRoundBtn.bind(this));
    document.querySelector('span.level-select').addEventListener('click', (e) => e.target.classList.toggle('select_closed'));

    document.querySelector('button.next-round__pzl-btn').addEventListener('click', this.moveToNextRound.bind(this));
    document.querySelector('div.selection-group').addEventListener('click', this.handleSelect.bind(this));
  }

  renderNavigation() {
    this.collectRoundsData();

    this.renderLevels(6);
    document.querySelector('span.level-select').textContent = this.get('currentLevel');

    this.renderRounds(this.roundsNumber[this.get('currentLevel')]);
    document.querySelector('span.round-select').textContent = this.get('currentRound');
  }

  collectRoundsData() {
    const data = this.get('passedRounds');
    this.roundsData = data.split('-').map((level) => level.split(''));
  }

  renderLevels(times) {
    const options = [];
    for (let i = 1; i <= times; i += 1) {
      options.push(`<li class="option level-option">${i}</li>`);
    }
    options[this.get('currentLevel') - 1] = `<li class="option level-option option_current">${this.get('currentLevel')}</li>`;
    this.levels.innerHTML = options.join('');
  }

  renderRounds(times) {
    const options = [];
    for (let i = 1; i <= times; i += 1) {
      options.push(`<li class="option round-option ${this.roundsData[this.get('currentLevel')][i] === '1' ? 'option_passed' : ''}">${i}</li>`);
    }
    options[this.get('currentRound') - 1] = `<li class="option round-option option_current">${this.get('currentRound')}</li>`;
    this.rounds.innerHTML = options.join('');
  }

  toggleRoundBtn(e) {
    this.setRoundsBlockHeight();
    e.target.classList.toggle('select_closed');
  }

  setRoundsBlockHeight() {
    let { height } = this.rounds.style;
    if (height) {
      height = '';
    } else {
      height = `${38 * (this.roundsNumber[this.get('currentLevel')] / 5) + 2}px`;
    }
    this.rounds.style.height = height;
  }

  moveToNextRound() {
    if (this.get('currentRound') === this.roundsNumber[this.get('currentLevel')]) {
      this.set('currentRound', 1);
      this.set('currentLevel', this.get('currentLevel') + 1);
    } else {
      this.set('currentRound', this.get('currentRound') + 1);
    }

    document.dispatchEvent(new CustomEvent('dataRequired'));
    document.querySelector('div.next-round-block').classList.add('hidden');
  }

  handleSelect(e) {
    if (!e.target.classList.contains('option')) return;

    const logicalContainer = e.target.closest('div');
    const relativeBtn = logicalContainer.querySelector('span.select');

    relativeBtn.dispatchEvent(new Event('click'));

    if (logicalContainer.classList.contains('levels-block')) {
      this.set('currentRound', 1);
      this.set('currentLevel', e.target.textContent);
    } else {
      this.set('currentRound', e.target.textContent);
    }

    this.availableWords.innerHTML = '';
    document.dispatchEvent(new CustomEvent('dataRequired'));
  }

  get(prop) {
    return this.storage.getProp(prop);
  }

  set(prop, value) {
    this.storage.setProp(prop, value);
  }
}
