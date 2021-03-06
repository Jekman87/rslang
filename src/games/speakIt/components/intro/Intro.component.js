import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createIntroHTML from './intro.template';
import { delay } from '../../../../core/utils';
import {
  GAME_DEFAULT_STATE, PER_GAME_WORDS,
} from '../../constants/constants';

export default class Intro extends Component {
  static className = 'intro';

  constructor($root, options) {
    super($root, {
      name: 'Intro',
      listeners: ['click', 'change'],
      ...options,
    });
    this.dataForApp.state = { ...GAME_DEFAULT_STATE };

    this.mainObserver = this.dataForApp.mainApp.observer;
    this.mainApi = this.dataForApp.mainApp.api;
    this.mainStatistic = this.dataForApp.mainApp.dataForApp.statistics;
    this.mainUserWords = this.dataForApp.mainApp.dataForApp.userWords
      .filter((word) => word.userWord.optional.status !== 'deleted');
  }

  init() {
    super.init();
    if (this.mainUserWords.length <= PER_GAME_WORDS) {
      this.dataForApp.state.mode = 'rounds';
    }
    if (this.dataForApp.state.mode === 'rounds') {
      if (this.mainStatistic.optional.SpeakItMain) {
        const { lastRound } = JSON.parse(this.mainStatistic.optional.SpeakItMain);
        this.dataForApp.state.gameLevel = { ...lastRound };
      }
    }
  }

  async onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.data.action === 'start') {
      this.mainObserver.emit('mainAppSpinner', true);
      this.$root.addClass('d-none');
      await delay(1500);
      const { level: gr, round: pg } = this.dataForApp.state.gameLevel;
      if (this.dataForApp.state.mode === 'rounds') {
        try {
          this.dataForApp.state.words = await this.mainApi.getWords(pg, gr);
          this.emit('intro:start', '');
          this.emit('alert:close', '');
        } catch (e) {
          this.emit('alert:open', {
            type: 'danger',
            text: 'Ошибка связи с сервером, попробуйте позже.',
          });
          this.$root.removeClass('d-none');
          this.mainObserver.emit('mainAppSpinner', false);
        }
      }
      if (this.dataForApp.state.mode === 'dictionary') {
        this.dataForApp.state.words = this.mainUserWords;
        try {
          this.dataForApp.testConnect = await this.mainApi.getWords(pg, gr);
          this.emit('intro:start', '');
          this.emit('alert:close', '');
        } catch (e) {
          this.emit('alert:open', {
            type: 'danger',
            text: 'Ошибка связи с сервером, попробуйте позже.',
          });
          this.$root.removeClass('d-none');
          this.mainObserver.emit('mainAppSpinner', false);
        }
      }
    }
    if (clickedElement.data.action === 'exit') {
      this.dataForApp.destroy();
      this.dataForApp = null;
      this.mainObserver.emit('selectPage', 'MainPage');
    }
  }

  onChange(event) {
    const clickedElement = $$(event.target);
    this.dataForApp.state.mode = clickedElement.text();
  }

  toHTML() {
    const data = { userWords: this.mainUserWords };
    return createIntroHTML(data).trim();
  }
}
