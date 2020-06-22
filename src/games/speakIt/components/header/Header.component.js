import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createHeaderHTML from './header.template';
import SpeechRecognition from '../../api/SpeechRecognition.api';

export default class Header extends Component {
  static className = 'header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
    this.subscribe('intro:start', () => {
      this.$root.removeClass('d-none');
    });
  }

  async onClick(event) {
    let clickedElement = $$(event.target);
    if (clickedElement.data.type === 'speak' || $$(clickedElement.closest('.btn')).data.type === 'speak') {
      if (!this.dataForApp.state.speakMode) {
        this.dataForApp.state.speakMode = true;
      } else {
        this.dataForApp.state.speakMode = false;
      }

      if (this.dataForApp.state.speakMode) {
        if (!(clickedElement.data.type === 'speak')) {
          clickedElement = $$(clickedElement.closest('.btn'));
        }
        const faMicrophone = this.$root.find('.fa-microphone');
        faMicrophone.addClass('fa-anim-flash');
        clickedElement.removeClass('btn-warning').addClass('btn-primary');
        const saidValue = await this.speechRecord();
        console.log(saidValue);
        this.emit('header:speak', this.dataForApp.state.speakMode);
      }
    }
    if (clickedElement.data.type === 'restart' || $$(clickedElement.closest('.btn')).data.type === 'restart') {
      this.dataForApp.state.speakMode = false;
      if (!(clickedElement.data.type === 'restart')) {
        clickedElement = $$(clickedElement.closest('.btn'));
      }
      const speakBtn = this.$root.find('[data-type="speak"');
      speakBtn.removeClass('btn-primary').addClass('btn-warning');
      const faMicrophone = this.$root.find('.fa-microphone');
      faMicrophone.removeClass('fa-anim-flash');
      this.emit('header:restart', this.dataForApp.state.speakMode);
    }
  }

  async speechRecord() {
    this.speech = new SpeechRecognition();
    const response = await this.speech.startWindowSpeechRecognition();
    return response;
  }

  speechRecordStop() {
    this.speech.stopWindowsSpeachRecognition();
  }

  toHTML() {
    return createHeaderHTML().trim();
  }
}
