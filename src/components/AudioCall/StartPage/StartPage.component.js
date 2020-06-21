import $$ from '../../../core/domManipulation';
import createStartPage from './startPage.template';

export default class StartPage {
  constructor() {
    this.startPageWrapper = $$.create('div', 'container-fluid').$el;
    this.startPageWrapper.classList.add('audio-call-start-page');

    this.startPageWrapper.insertAdjacentHTML('afterbegin', createStartPage());
    this.app = document.getElementById('app');
  }

  onStartGameBtnClick() {
    //   this.destroy()
  }

  render() {
    this.app.append(this.startPageWrapper);

    this.startGameBtn = document.querySelector('.btn-start-game');
    this.startGameBtn.addEventListener('click', this.onStartGameBtnClick);
  }

  //   destroy() {
  //     while (this.app.firstChild) {
  //       this.app.removeChild(this.app.firstChild);
  //     }

  //     this.startPageBtn.removeEventListener('click', this.onStartGameBtnClick);
  //   }
}
