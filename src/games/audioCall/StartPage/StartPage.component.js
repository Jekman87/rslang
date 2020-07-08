import $$ from '../../../core/domManipulation';
import createStartPage from './startPage.template';
import AudioCall from '../AudioCallGame/AudioCall.component';

export default class StartPage {
  constructor($root, options) {
    this.options = options;
    console.log(options);
    this.startPageWrapper = $$.create('div', 'container-fluid').$el;
    this.startPageWrapper.classList.add('audio-call-start-page');

    this.startPageWrapper.insertAdjacentHTML('afterbegin', createStartPage());
    this.app = document.getElementById('app');

    this.render = this.render.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const { target } = event;

    switch (target.dataset.event) {
      case 'close':
        this.destroy();
        break;
      case 'startGame':
        this.destroy();
        new AudioCall().render();
        break;
      default:
        break;
    }
  }

  render() {
    this.app.append(this.startPageWrapper);
    this.startPageWrapper.addEventListener('click', this.onClick);
  }

  destroy() {
    document.querySelector('.audio-call-start-page').removeEventListener('click', this.onClick);
    document.getElementById('app').innerHTML = '';
  }
}
