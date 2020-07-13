import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createIntroHTML from './intro.template';
import createButtonSpinnerHTML from './button-spinner.template';
import { delay } from '../../../../core/utils';
import {
  GAME_DEFAULT_STATE,
} from '../../constants/constants';

export default class Intro extends Component {
  static className = 'intro';

  constructor($root, options) {
    super($root, {
      name: 'Intro',
      listeners: ['click'],
      ...options,
    });
    this.dataForApp.state = GAME_DEFAULT_STATE;

    this.mainObserver = this.dataForApp.mainApp.observer;
    this.mainApi = this.dataForApp.mainApp.api;
    this.mainStatistic = this.dataForApp.mainApp.dataForApp.statistics;
  }

  init() {
    super.init();
    if (this.mainStatistic.optional.SpeakItMain) {
      const { lastRound } = JSON.parse(this.mainStatistic.optional.SpeakItMain);
      this.dataForApp.state.gameLevel = { ...lastRound };
    }
  }

  async onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.data.action === 'start') {
      const startButtonHtml = clickedElement.html();
      clickedElement.html(createButtonSpinnerHTML().trim()).attr('disabled', true);
      await delay(1500);
      const { level: gr, round: pg } = this.dataForApp.state.gameLevel;
      try {
        this.dataForApp.state.words = await this.mainApi.getWords(pg, gr);
      } catch (e) {
        if (e.message === '401') {
          this.emit('alert:open', {
            type: 'danger',
            text: 'Ошибка авторизации.',
          });
          await delay(1500);
          this.mainObserver.emit('mainLogout');
          return;
        }
        clickedElement.html(startButtonHtml).removeAttr('disabled');
        this.emit('alert:open', {
          type: 'danger',
          text: 'Ошибка связи с сервером, попробуйте позже.',
        });
      }
      this.$root.addClass('none');
      this.emit('intro:start', '');
      this.emit('alert:close', '');
    }
    if (clickedElement.data.action === 'exit') {
      this.dataForApp.destroy();
      this.mainObserver.emit('selectPage', 'MainPage');
    }
  }

  toHTML() {
    return createIntroHTML().trim();
  }
}
