export default class LevelsController {
  constructor(storage) {
    this.storage = storage;
    this.roundsNumber = [null, 45, 40, 40, 25, 25, 25];
  }

  init() {
    this.defineElems();
    this.addListeners();
  }

  defineElems() {
    this.elems = {
      selectionGroup: document.querySelector('div.selection-group'),
      levels: document.querySelector('ul.levels'),
      rounds: document.querySelector('ul.rounds'),
      levelSelectEl: document.querySelector('span.level-select'),
      roundSelectEl: document.querySelector('span.round-select'),
      nextRoundBtn: document.querySelector('button.next-round__pzl-btn'),
      goToRoundBtn: document.querySelector('button.level-pzl-btn'),
      levelDownControl: document.querySelector('div.levels-block span.select__control_down'),
      roundDownControl: document.querySelector('div.rounds-block span.select__control_down'),
      levelUpControl: document.querySelector('div.levels-block span.select__control_up'),
      roundUpControl: document.querySelector('div.rounds-block span.select__control_up'),
    };
  }

  addListeners() {
    document.addEventListener('newData', this.renderNavigation.bind(this));
    this.elems.selectionGroup.addEventListener('click', this.handleClick.bind(this));
    this.elems.roundSelectEl.addEventListener('click', this.toggleRoundBtn.bind(this));
    this.elems.levelSelectEl.addEventListener('click', this.toggleRoundBtn.bind(this));
    this.elems.nextRoundBtn.addEventListener('click', this.moveToNextRound.bind(this));
  }

  renderNavigation() {
    this.collectRoundsData();

    this.renderLevels(6);
    this.elems.levelSelectEl.textContent = this.get('currentLevel');

    this.renderRounds(this.roundsNumber[this.get('currentLevel')]);
    this.elems.roundSelectEl.textContent = this.get('currentRound');

    this.setControlsStatus();
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
    this.elems.levels.innerHTML = options.join('');
  }

  renderRounds(times) {
    const options = [];
    for (let i = 1; i <= times; i += 1) {
      options.push(`<li class="option round-option ${this.roundsData[this.get('currentLevel')][i] === '1' ? 'option_passed' : ''}">${i}</li>`);
    }
    options[this.get('currentRound') - 1] = `<li class="option round-option option_current">${this.get('currentRound')}</li>`;
    this.elems.rounds.innerHTML = options.join('');
  }

  setControlsStatus() {
    const level = this.get('currentLevel');
    const round = this.get('currentRound');

    if (Number(level) === 1) {
      this.elems.levelDownControl.classList.add('disabled');
    } else {
      this.elems.levelDownControl.classList.remove('disabled');
    }

    if (Number(round) === 1) {
      this.elems.roundDownControl.classList.add('disabled');
    } else {
      this.elems.roundDownControl.classList.remove('disabled');
    }

    if (Number(level) === 6) {
      this.elems.levelUpControl.classList.add('disabled');
    } else {
      this.elems.levelUpControl.classList.remove('disabled');
    }

    if (Number(round) === this.roundsNumber[level]) {
      this.elems.roundUpControl.classList.add('disabled');
    } else {
      this.elems.roundUpControl.classList.remove('disabled');
    }
  }

  handleClick(e) {
    if (e.target.classList.contains('option')) this.handleSelect(e);
    if (e.target.classList.contains('select__control')) this.handleSelectControlClick(e);
    if (e.target === this.elems.goToRoundBtn) this.moveToRound();
  }

  handleSelect(e) {
    const logicalContainer = e.target.closest('div');
    const relativeBtn = logicalContainer.querySelector('span.select');

    relativeBtn.dispatchEvent(new Event('click'));

    if (logicalContainer.classList.contains('levels-block')) {
      this.set('currentRound', 1);
      this.set('currentLevel', Number(e.target.textContent));
    } else {
      this.set('currentRound', Number(e.target.textContent));
    }

    document.dispatchEvent(new CustomEvent('dataRequired'));
    this.setControlsStatus();
  }

  handleSelectControlClick(e) {
    const select = e.target.closest('div').querySelector('span.select');
    const value = Number(select.textContent);

    if (e.target.classList.contains('select__control_up')) {
      if ((value + 1 === 6 && e.target.closest('div').classList.contains('levels-block'))
       || value + 1 === this.roundsNumber[this.get('currentLevel')]) {
        e.target.classList.add('disabled');
      }
      select.textContent = value + 1;
      e.target.previousElementSibling.classList.remove('disabled');
    } else {
      if (value - 1 === 1) {
        e.target.classList.add('disabled');
      }
      select.textContent = value - 1;
      e.target.nextElementSibling.classList.remove('disabled');
    }
  }

  moveToRound() {
    this.set('currentLevel', Number(this.elems.levelSelectEl.textContent));
    this.set('currentRound', Number(this.elems.roundSelectEl.textContent));
    document.dispatchEvent(new CustomEvent('dataRequired'));
  }

  toggleRoundBtn(e) {
    if (e.target === this.elems.levelSelectEl) {
      if (!this.elems.roundSelectEl.classList.contains('select_closed')) {
        this.setRoundsBlockHeight();
      }
      this.elems.levelSelectEl.classList.toggle('select_closed');
      this.elems.roundSelectEl.classList.add('select_closed');
    } else {
      this.setRoundsBlockHeight();
      this.elems.roundSelectEl.classList.toggle('select_closed');
      this.elems.levelSelectEl.classList.add('select_closed');
    }
  }

  setRoundsBlockHeight() {
    let { height } = this.elems.rounds.style;
    if (height) {
      height = '';
    } else {
      height = `${38 * (this.roundsNumber[this.get('currentLevel')] / 5) + 2}px`;
    }
    this.elems.rounds.style.height = height;
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
    this.setControlsStatus();
  }

  get(prop) {
    return this.storage.getProp(prop);
  }

  set(prop, value) {
    this.storage.setProp(prop, value);
  }
}
