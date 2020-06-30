import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import { storage } from '../../../../core/utils';
import createHeaderHTML from './header.template';
import SpeechRecognition from '../../api/SpeechRecognition.api';
// import { getWords } from '../../api/words.api';

export default class Header extends Component {
  static className = 'header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['click', 'change'],
      ...options,
    });
  }

  init() {
    super.init();
    window.aa_1 = this.dataForApp;
    this.$level = this.$root.find('#gameLevel');
    this.$round = this.$root.find('#gameRound');
    this.$group = this.$root.find('#gameRoundGroup');
    this.speakBtn = this.$root.find('[data-type="speak"');
    this.resultsBtn = this.$root.find('[data-type="results"');
    this.finishBtn = this.$root.find('[data-type="finish"');
    this.faMicrophone = this.$root.find('.fa-microphone');

    this.subscribe('intro:start', () => {
      this.$root.removeClass('d-none');
      changeSelector.call(this, 'level');
      changeSelector.call(this, 'round');
      changeSelector.call(this, 'group');
    });
    this.subscribe('results:continue', async () => {
      if (this.dataForApp.state.gameLevel.group === 0) {
        this.dataForApp.state.gameLevel.group += 1;
        this.$group.$el.options.value = this.dataForApp.state.gameLevel.group;
        changeSelector.call(this, 'group');
      } else if (this.dataForApp.state.gameLevel.group === 1
        && this.dataForApp.state.gameLevel.round < 29) {
        this.dataForApp.state.gameLevel.group = 0;
        this.$group.$el.options.value = this.dataForApp.state.gameLevel.group;
        changeSelector.call(this, 'group');
        this.dataForApp.state.gameLevel.round += 1;
        this.$group.$el.options.value = this.dataForApp.state.gameLevel.round;
        changeSelector.call(this, 'round');
        await changeGameRound.call(this);
      } else if (this.dataForApp.state.gameLevel.group === 1
        && this.dataForApp.state.gameLevel.round === 29) {
        this.dataForApp.state.gameLevel.group = 0;
        this.$group.$el.options.value = this.dataForApp.state.gameLevel.group;
        changeSelector.call(this, 'group');
        this.dataForApp.state.gameLevel.round = 0;
        this.$group.$el.options.value = this.dataForApp.state.gameLevel.round;
        changeSelector.call(this, 'round');
        if (this.dataForApp.state.gameLevel.level < 5) {
          this.dataForApp.state.gameLevel.level += 1;
        } else {
          this.dataForApp.state.gameLevel.level = 0;
        }
        this.$level.$el.options.value = this.dataForApp.state.gameLevel.level;
        changeSelector.call(this, 'level');
        await changeGameRound.call(this);
      }
      if (this.dataForApp.state.speakMode) {
        saveGameHistory.call(this);
      }
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('header:changeGameRound', '');
    });
    this.subscribe('score:finishGame', () => {
      this.finishBtn.addClass('d-none');
      saveGameHistory.call(this);
      restart.call(this);
      stopSpeak.call(this);
    });
  }

  async onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.data.type === 'speak') {
      if (!this.dataForApp.state.speakMode) {
        this.dataForApp.state.speakMode = true;
      } else {
        this.dataForApp.state.speakMode = false;
      }
      if (this.dataForApp.state.speakMode) {
        this.finishBtn.removeClass('d-none');
        startSpeak.call(this);
        this.emit('header:speak', this.dataForApp.state.speakMode);
      }
    }
    if (clickedElement.data.type === 'restart') {
      this.finishBtn.addClass('d-none');
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('stopSpeak', '');
    }
    if (clickedElement.data.type === 'results') {
      this.emit('header:results', '');
    }
    if (clickedElement.data.type === 'exit') {
      this.dataForApp.destroy();
      this.dataForApp.mainApp.observer.emit('selectPage', 'MainPage');
    }
    if (clickedElement.data.type === 'history') {
      this.emit('header:history', '');
    }
    if (clickedElement.data.type === 'finish') {
      this.finishBtn.addClass('d-none');
      restart.call(this);
      stopSpeak.call(this);
      saveGameHistory.call(this);
      this.emit('header:finishRound', '');
    }
  }

  async onChange(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.$el.id === 'gameLevel') {
      this.dataForApp.state.gameLevel.level = +clickedElement.text();
      await changeGameRound.call(this);
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('header:changeGameRound', '');
    }
    if (clickedElement.$el.id === 'gameRound') {
      this.dataForApp.state.gameLevel.round = +clickedElement.text();
      await changeGameRound.call(this);
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('header:changeGameRound', '');
    }
    if (clickedElement.$el.id === 'gameRoundGroup') {
      this.dataForApp.state.gameLevel.group = +clickedElement.text();
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('header:changeGameRound', '');
    }
  }

  toHTML() {
    return createHeaderHTML().trim();
  }
}

function startSpeak() {
  this.faMicrophone.addClass('fa-anim-flash');
  this.speakBtn.removeClass('btn-warning').addClass('btn-primary');
  if (!(this.speech instanceof SpeechRecognition)) {
    this.speech = new SpeechRecognition(this.observer);
  }
  this.speech.startWindowSpeechRecognition();
}

function stopSpeak() {
  this.speakBtn.removeClass('btn-primary').addClass('btn-warning');
  this.faMicrophone.removeClass('fa-anim-flash');
  if (this.speech instanceof SpeechRecognition) {
    this.speech.stopWindowsSpeachRecognition();
  }
}

async function changeGameRound() {
  const { level: gr, round: pg } = this.dataForApp.state.gameLevel;
  // this.dataForApp.state.words = await getWords({ group, page });
  try {
    this.dataForApp.state.words = await this.dataForApp.mainApp.api.getWords(gr, pg);
  } catch (e) {
    if (e.message === '401') {
      console.log(e.message);
      // logout
    } else {
      console.log(`${e.message}: something went wrong`);
    }
  }
}

function restart() {
  this.dataForApp.state.speakMode = false;
  this.dataForApp.state.correct = 0;
}

function saveGameHistory() {
  const correct = this.dataForApp.state.successWords.length;
  const { level, round, group } = this.dataForApp.state.gameLevel;
  const date = Date.now();
  const history = {
    d: date,
    c: correct,
    r: `${level + 1}-${round + 1}-${group + 1}`,
  };
  let histories = [];
  if (storage('speakit-history')) {
    histories = storage('speakit-history');
    if (histories.length > 10) {
      histories = histories.slice(1);
    }
    histories.push(history);
    storage('speakit-history', histories);
  } else {
    histories.push(history);
    storage('speakit-history', histories);
  }
}

function changeSelector(key) {
  Array.from(this[`$${key}`].$el.options).forEach((option, i) => {
    if (option.value === `${this.dataForApp.state.gameLevel[key]}`) {
      this[`$${key}`].$el.selectedIndex = i;
    }
  });
}
