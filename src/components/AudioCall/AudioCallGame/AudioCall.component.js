import $$ from '../../../core/domManipulation';
import createAudioCall from './audioCall.template';

export default class AudioCall {
  constructor() {
    this.audioCallWrapper = $$.create('div', 'container-fluid').$el;
    this.audioCallWrapper.insertAdjacentHTML('afterbegin', createAudioCall());

    this.app = document.getElementById('app');

    this.render = this.render.bind(this);
  }

  render() {
    this.app.append(this.audioCallWrapper);
  }
}
