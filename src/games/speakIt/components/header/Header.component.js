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
    this.$level = this.$root.find('#gameLevel');
    this.$round = this.$root.find('#gameRound');
    this.speakBtn = this.$root.find('[data-type="speak"');
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
    this.subscribe('startSpeak', () => {
      startSpeak.call(this);
    });
    this.subscribe('stopSpeak', () => {
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
        this.emit('startSpeak', '');
      }
    }
    if (clickedElement.data.type
      && (clickedElement.data.type === 'restart'
      || $$(clickedElement.closest('.btn')).data.type === 'restart')) {
      this.dataForApp.state.speakMode = false;
      if (!(clickedElement.data.type === 'restart')) {
        clickedElement = $$(clickedElement.closest('.btn'));
      }
      this.emit('stopSpeak', '');
    }
  }

  async onChange(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.$el.id === 'gameLevel') {
      this.dataForApp.gameLevel.level = +clickedElement.text();
      changeGameRound.call(this);
    }
    if (clickedElement.$el.id === 'gameRound') {
      this.dataForApp.gameLevel.round = +clickedElement.text();
      changeGameRound.call(this);
    }
    if (clickedElement.$el.id === 'gameRoundGroup') {
      this.dataForApp.gameLevel.group = +clickedElement.text();
      changeGameRound.call(this);
    }
    console.log(this.dataForApp.gameLevel);
  }

  speechRecord(observer) {
    this.speech = new SpeechRecognition(observer);
    this.speech.startWindowSpeechRecognition();
  }

  speechRecordStop() {
    this.speech.stopWindowsSpeachRecognition();
  }

  toHTML() {
    return createHeaderHTML().trim();
  }
}

function startSpeak() {
  this.faMicrophone.addClass('fa-anim-flash');
  this.speakBtn.removeClass('btn-warning').addClass('btn-primary');
  this.speechRecord(this.observer);
  this.emit('header:speak', this.dataForApp.state.speakMode);
}

function stopSpeak() {
  this.speakBtn.removeClass('btn-primary').addClass('btn-warning');
  this.faMicrophone.removeClass('fa-anim-flash');
  if (this.speech) {
    this.speechRecordStop();
  }
  this.emit('header:restart', this.dataForApp.state.speakMode);
}

async function changeGameRound() {
  const { level: group, round: page } = this.dataForApp.gameLevel;
  console.log(group, page);
  this.dataForApp.words = await getWords({ group, page });
  this.dataForApp.state.speakMode = false;
  this.emit('header:changeGameRound', '');
  this.emit('stopSpeak', '');
}
