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
    this.speakBtn = this.$root.find('[data-type="speak"');
    this.resultsBtn = this.$root.find('[data-type="results"');
    this.finishBtn = this.$root.find('[data-type="finish"');
    this.faMicrophone = this.$root.find('.fa-microphone');

    this.subscribe('intro:start', () => {
      this.$root.removeClass('d-none');
      Array.from(this.$level.$el.options).forEach((option) => {
        if (option.value === `${this.dataForApp.gameLevel.level}`) {
          $$(option).attr('selected', true);
        }
      });
      Array.from(this.$round.$el.options).forEach((option) => {
        if (option.value === `${this.dataForApp.gameLevel.round}`) {
          $$(option).attr('selected', true);
        }
      });
    });
    this.subscribe('cardsDesk:finishGame', () => {
      this.finishBtn.addClass('d-none');
      restart.call(this);
      stopSpeak.call(this);
    });
  }

  async onClick(event) {
    let clickedElement = $$(event.target);
    if (clickedElement.data.type && (clickedElement.data.type === 'speak'
      || $$(clickedElement.closest('.btn')).data.type === 'speak')) {
      if (!this.dataForApp.state.speakMode) {
        this.dataForApp.state.speakMode = true;
      } else {
        this.dataForApp.state.speakMode = false;
      }

      if (this.dataForApp.state.speakMode) {
        if (!(clickedElement.data.type === 'speak')) {
          clickedElement = $$(clickedElement.closest('.btn'));
        }
        this.finishBtn.removeClass('d-none');
        startSpeak.call(this);
        this.emit('header:speak', this.dataForApp.state.speakMode);
      }
    }
    if (clickedElement.data.type
      && (clickedElement.data.type === 'restart'
      || $$(clickedElement.closest('.btn')).data.type === 'restart')) {
      if (!(clickedElement.data.type === 'restart')) {
        clickedElement = $$(clickedElement.closest('.btn'));
      }
      this.finishBtn.addClass('d-none');
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('stopSpeak', '');
    }
    if (clickedElement.data.type
      && (clickedElement.data.type === 'results'
      || $$(clickedElement.closest('.btn')).data.type === 'results')) {
      if (!(clickedElement.data.type === 'results')) {
        clickedElement = $$(clickedElement.closest('.btn'));
      }
      this.emit('header:results', '');
    }
    if (clickedElement.data.type
      && (clickedElement.data.type === 'history'
      || $$(clickedElement.closest('.btn')).data.type === 'history')) {
      if (!(clickedElement.data.type === 'history')) {
        clickedElement = $$(clickedElement.closest('.btn'));
      }
      this.emit('header:history', '');
    }
    if (clickedElement.data.type
      && (clickedElement.data.type === 'finish'
      || $$(clickedElement.closest('.btn')).data.type === 'finish')) {
      if (!(clickedElement.data.type === 'finish')) {
        clickedElement = $$(clickedElement.closest('.btn'));
      }
      this.dataForApp.state.speakMode = false;
      this.finishBtn.addClass('d-none');
      stopSpeak.call(this);
      // get statistic, set long statistic, post statistic to back
      const right = this.dataForApp.state.successWords.length;
      const date = Date.now();
      const history = {
        d: date, r: right,
      };
      let histories = [];
      if (storage('speakit-history')) {
        histories = storage('speakit-history');
        histories.push(history);
        storage('speakit-history', histories);
      } else {
        histories.push(history);
        storage('speakit-history', histories);
      }
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
