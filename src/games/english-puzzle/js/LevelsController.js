export default class LevelsController {
  constructor() {
    this.levels = document.querySelector('ul.levels');
    this.rounds = document.querySelector('ul.rounds');
    this.availableWords = document.querySelector('p.available-words');
    this.roundsNumber = [null, 45, 40, 40, 25, 25, 25];
  }

  init() {
    document.addEventListener('newData', this.renderNavigation.bind(this));

    document.querySelector('button.round-btn').addEventListener('click', this.toggleRoundBtn.bind(this));
    document.querySelector('button.level-btn').addEventListener('click', (e) => e.target.classList.toggle('nav-btn_closed'));

    document.querySelector('button.next-round__btn').addEventListener('click', this.moveToNextRound.bind(this));
    document.querySelector('div.selection-group').addEventListener('click', this.handleSelect.bind(this));
  }

  renderNavigation(e) {
    this.collectRoundsData();
    this.setPosition(e);

    this.renderLevels(6);
    document.querySelector('button.level-btn').textContent = this.levelCurrent;

    this.renderRounds(this.roundsNumber[this.levelCurrent]);
    document.querySelector('button.round-btn').textContent = this.roundCurrent;
  }

  collectRoundsData() {
    const data = localStorage.getItem('rounds');
    this.roundsData = data.split('-').map((level) => level.split(''));
  }

  setPosition(e) {
    const [round, level] = e.detail.position;
    this.roundCurrent = round;
    this.levelCurrent = level;
  }

  renderLevels(times) {
    const options = [];
    for (let i = 1; i <= times; i += 1) {
      options.push(`<li class="option level-option">${i}</li>`);
    }
    options[this.levelCurrent - 1] = `<li class="option level-option option_current">${this.levelCurrent}</li>`;
    this.levels.innerHTML = options.join('');
  }

  renderRounds(times) {
    const options = [];
    for (let i = 1; i <= times; i += 1) {
      options.push(`<li class="option round-option ${this.roundsData[this.levelCurrent][i] === '1' ? 'option_passed' : ''}">${i}</li>`);
    }
    options[this.roundCurrent - 1] = `<li class="option round-option option_current">${this.roundCurrent}</li>`;
    this.rounds.innerHTML = options.join('');
  }

  toggleRoundBtn(e) {
    this.setRoundsBlockHeight();
    e.target.classList.toggle('nav-btn_closed');
  }

  setRoundsBlockHeight() {
    let { height } = this.rounds.style;
    if (height) {
      height = '';
    } else {
      height = `${38 * (this.roundsNumber[this.levelCurrent] / 5) + 2}px`;
    }
    this.rounds.style.height = height;
  }

  moveToNextRound() {
    this.savePassedRound();

    if (this.roundCurrent === this.roundsNumber[this.levelCurrent]) {
      this.roundCurrent = 1;
      this.levelCurrent += 1;
    } else {
      this.roundCurrent += 1;
    }
    document.dispatchEvent(new CustomEvent('dataRequired', { detail: [this.roundCurrent, this.levelCurrent] }));
    document.querySelector('div.next-round-block').classList.add('hidden');
  }

  savePassedRound() {
    this.roundsData[this.levelCurrent][this.roundCurrent] = '1';
    const formattedData = this.roundsData.map((level) => level.join('')).join('-');
    localStorage.setItem('rounds', formattedData);
    localStorage.setItem('lastRound', `${this.levelCurrent}-${this.roundCurrent}`);
    document.dispatchEvent(new CustomEvent('userDataChange'));
  }

  handleSelect(e) {
    if (!e.target.classList.contains('option')) return;

    const logicalContainer = e.target.closest('div');
    const relativeBtn = logicalContainer.querySelector('button.nav-btn');

    relativeBtn.dispatchEvent(new Event('click'));

    if (logicalContainer.classList.contains('levels-block')) {
      this.roundCurrent = 1;
      this.levelCurrent = e.target.textContent;
    } else {
      this.roundCurrent = e.target.textContent;
    }

    this.availableWords.innerHTML = '';
    document.dispatchEvent(new CustomEvent('dataRequired', { detail: [this.roundCurrent, this.levelCurrent] }));
  }
}
