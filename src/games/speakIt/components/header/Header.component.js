import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
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
    this.faMicrophone = this.$root.find('.fa-microphone');
    // const locModal = document.getElementById('results');
    // const btnclose = document.getElementById('w-change-close');
    // const btnShow = this.resultsBtn.$el;
    // // show the modal
    // btnShow.addEventListener('click', () => {
    //   locModal.style.display = 'block';
    //   locModal.style.paddingRight = '17px';
    //   locModal.className = 'modal fade show';
    // });
    // // hide the modal
    // btnclose.addEventListener('click', () => {
    //   locModal.style.display = 'none';
    //   locModal.className = 'modal fade';
    // });

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
    // this.subscribe('score:finishGame', () => {
    //   restart.call(this);
    //   stopSpeak.call(this);
    // });
    this.subscribe('cardsDesk:finishGame', () => {
      // this.resultsBtn.$el.click();
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
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('stopSpeak', '');
    }
  }

  async onChange(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.$el.id === 'gameLevel') {
      this.dataForApp.gameLevel.level = +clickedElement.text();
      changeGameRound.call(this);
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('header:changeGameRound', '');
    }
    if (clickedElement.$el.id === 'gameRound') {
      this.dataForApp.gameLevel.round = +clickedElement.text();
      changeGameRound.call(this);
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
