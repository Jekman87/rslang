import $$ from '../../../core/domManipulation';
import createAudioCall from './audioCall.template';

export default class AudioCall {
  constructor() {
    this.audioCallWrapper = $$.create('div', 'container-fluid').$el;
    this.audioCallWrapper.classList.add('audio-call-wrapper');
    this.audioCallWrapper.insertAdjacentHTML('afterbegin', createAudioCall());

    this.app = document.getElementById('app');

    this.onClick = this.onClick.bind(this);
    // this.render = this.render.bind(this);
  }

  onClick(event) {
    const { target } = event;

    switch (target.dataset.event) {
      case 'close':
        this.destroy();
        break;
      case 'soundOff':
        break;
      default:
        break;
    }
  }

  render() {
    this.app.append(this.audioCallWrapper);

    this.audioCallWrapper.addEventListener('click', this.onClick);
  }

  destroy() {
    document.getElementById('app').innerHTML = '';
    this.audioCallWrapper.removeEventListener('click', this.onClick);
  }
}
