import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import { storage } from '../../../../core/utils';
import createHeaderHTML from './header.template';
import SpeechRecognition from '../../api/SpeechRecognition.api';
import { getWords } from '../../api/words.api';

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
      Array.from(this.$level.$el.options).forEach((option, i) => {
        if (option.value === `${this.dataForApp.gameLevel.level}`) {
          this.$level.$el.selectedIndex = i;
        }
      });
      Array.from(this.$round.$el.options).forEach((option, i) => {
        if (option.value === `${this.dataForApp.gameLevel.round}`) {
          this.$round.$el.selectedIndex = i;
        }
      });
      Array.from(this.$group.$el.options).forEach((option, i) => {
        if (option.value === `${this.dataForApp.gameLevel.group}`) {
          this.$group.$el.selectedIndex = i;
        }
      });
    });
    this.subscribe('results:continue', async () => {
      if (this.dataForApp.gameLevel.group === 0) {
        this.dataForApp.gameLevel.group += 1;
        this.$group.$el.options.value = this.dataForApp.gameLevel.group;
        Array.from(this.$group.$el.options).forEach((option, i) => {
          if (option.value === `${this.dataForApp.gameLevel.group}`) {
            this.$group.$el.selectedIndex = i;
          }
        });
      } else if (this.dataForApp.gameLevel.group === 1
        // && this.dataForApp.gameLevel.level < 6
        && this.dataForApp.gameLevel.round < 29) {
        this.dataForApp.gameLevel.group = 0;
        this.$group.$el.options.value = this.dataForApp.gameLevel.group;
        Array.from(this.$group.$el.options).forEach((option, i) => {
          if (option.value === `${this.dataForApp.gameLevel.group}`) {
            this.$group.$el.selectedIndex = i;
          }
        });
        this.dataForApp.gameLevel.round += 1;
        this.$group.$el.options.value = this.dataForApp.gameLevel.round;
        Array.from(this.$round.$el.options).forEach((option, i) => {
          if (option.value === `${this.dataForApp.gameLevel.round}`) {
            this.$round.$el.selectedIndex = i;
          }
        });
        await changeGameRound.call(this);
      } else if (this.dataForApp.gameLevel.group === 1
        // && this.dataForApp.gameLevel.level < 6
        && this.dataForApp.gameLevel.round === 29) {
        this.dataForApp.gameLevel.group = 0;
        this.$group.$el.options.value = this.dataForApp.gameLevel.group;
        Array.from(this.$group.$el.options).forEach((option, i) => {
          if (option.value === `${this.dataForApp.gameLevel.group}`) {
            this.$group.$el.selectedIndex = i;
          }
        });
        this.dataForApp.gameLevel.round = 0;
        this.$group.$el.options.value = this.dataForApp.gameLevel.round;
        Array.from(this.$round.$el.options).forEach((option, i) => {
          if (option.value === `${this.dataForApp.gameLevel.round}`) {
            this.$round.$el.selectedIndex = i;
          }
        });
        if (this.dataForApp.gameLevel.level < 5) {
          this.dataForApp.gameLevel.level += 1;
        } else {
          this.dataForApp.gameLevel.level = 0;
        }
        this.$level.$el.options.value = this.dataForApp.gameLevel.level;
        Array.from(this.$level.$el.options).forEach((option, i) => {
          if (option.value === `${this.dataForApp.gameLevel.level}`) {
            this.$level.$el.selectedIndex = i;
          }
        });
        await changeGameRound.call(this);
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
      this.dataForApp.gameLevel.level = +clickedElement.text();
      await changeGameRound.call(this);
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('header:changeGameRound', '');
    }
    if (clickedElement.$el.id === 'gameRound') {
      this.dataForApp.gameLevel.round = +clickedElement.text();
      await changeGameRound.call(this);
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('header:changeGameRound', '');
    }
    if (clickedElement.$el.id === 'gameRoundGroup') {
      this.dataForApp.gameLevel.group = +clickedElement.text();
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
  const { level: group, round: page } = this.dataForApp.gameLevel;
  this.dataForApp.words = await getWords({ group, page });
}

function restart() {
  this.dataForApp.state.speakMode = false;
  this.dataForApp.state.correct = 0;
}

function saveGameHistory() {
  const correct = this.dataForApp.state.successWords.length;
  const { level, round, group } = this.dataForApp.gameLevel;
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
